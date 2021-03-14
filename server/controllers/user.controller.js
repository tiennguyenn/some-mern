import User from "../models/user.model"

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created updated')
    return res.json(users)
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
}

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.json(user)
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
}

export default {list, create}