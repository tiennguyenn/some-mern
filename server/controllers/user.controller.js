import { extend } from "lodash"
import User from "../models/user.model"

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created updated')
    res.json(users)
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
}

const create = async (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  console.log(user)
  try {
    await user.save()
    return res.json(user)
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
}

const read = async (req, res) => {
  return res.json(req.profile)
}

const userByID = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId).select('_id name email')
    if (!user) {
      return res.status(401).json({error: "User not found"})
    }
    req.profile = user
    next()
  } catch (error) {
    console.log(error)
  }
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    await user.save()
    return res.json(user)
  } catch (error) {
    console.error(err);
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