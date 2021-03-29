import { extend } from "lodash"
import User from "../models/user.model"
import errorHandler from './../helpers/dbErrorHandler'

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
    const user = await User.findById(userId).select('_id name email')
    if (!user) {
      return res.status(401).json({error: "User not found"})
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    await user.save()
    res.json(user)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    deletedUser = await user.remove()

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default {list, create, read, update, remove, userByID}