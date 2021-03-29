import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

import config from './../../config/config'
import User from './../models/user.model'

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body
  
    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Authenticate is failed'
      })
    }

    const token = jwt.sign({id: user._id}, config.jwtSecret)

    user.salt = undefined
    user.hashed_password = undefined
    return res.status(200).json({
      token,
      user
    })
  } catch (error) {
    return res.status(401).json({error})
  }
}

const requireSignIn = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
})

export default {signIn, requireSignIn}