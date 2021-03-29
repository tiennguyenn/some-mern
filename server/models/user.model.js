import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: "Email is required"
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now()
  },
  updated: Date
})

UserSchema
  .virtual('password')
  .get(function() { return this._password })
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })

UserSchema.path('hashed_password').validate(function() {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', "Password is required")
  }
}, null)

UserSchema.methods = {
  authenticate: function(password) {
    return this.encryptPassword(password) === this.hashed_password
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
  encryptPassword: function(password) {
    if (!password) {
      return ''
    }

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (error) {
      return ''
    }
  }
}

export default mongoose.model('User', UserSchema)