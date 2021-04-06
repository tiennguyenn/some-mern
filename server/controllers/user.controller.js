import formidable from "formidable"
import { extend } from "lodash"
import fs from 'fs'

import User from "../models/user.model"
import errorHandler from './../helpers/dbErrorHandler'
import profilePic from './../../client/assets/images/profile-pic.png'

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created updated')
    res.json(users)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(200).json({
      message: "Successfully created user"
    })
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = async (req, res) => {
  res.json(req.profile)
}

const userByID = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId)
      .populate('following', '_id name')
      .populate('followers', '_id name')
    if (!user) {
      return res.status(401).json({error: "User not found"})
    }
    user.salt = undefined
    user.hashed_password = undefined
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: ""
      })
    }
    
    let user = req.profile
    if (file.photo) {
      user.photo.data = fs.readFileSync(file.photo.path)
      user.photo.contentType = file.photo.type
    }
    
    try {
      user = extend(user, req.body)
      await user.save()
      res.json(user)
    } catch (err) {
      res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try {
    const user = req.profile
    const deletedUser = await user.remove()
    res.json(deletedUser)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  const user = req.profile
  if (user.photo.data) {
    res.set('Content-Type', user.photo.contentType)
    return res.send(user.photo.data)
  }
  next()
}

const defaultPhoto = (req, res) => {
  res.sendFile(process.cwd() + profilePic)
}

const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      {$push: {following: req.body.followId}}
    )
    next()
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const addFollower = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followId,
      {$push: {followers: req.body.userId}},
      {new: true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')

    res.json(user)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      {$pull: {following: req.body.followId}}
    )
    next()
  } catch (error) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeFollower = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followId,
      {$pull: {followers: req.body.userId}},
      {new: true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')

    res.json(user)
  } catch (error) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const findPeople = async (req, res) => {
  try {
    const {following} = req.profile
    following.push(req.profile._id)
  
    const users = await User.find({_id: {$nin: following}}).select('name')
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {findPeople, list, create, read, update, remove, userByID, defaultPhoto, photo, addFollowing, addFollower, removeFollowing, removeFollower}