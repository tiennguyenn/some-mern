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

    user.salf = undefined
    return res.status(200).json(user)
  } catch (error) {
    return res.status(401).json({error})
  }
}

export default {signIn}