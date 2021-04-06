import Post from './../models/post.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const listByUser = async (req, res) => {
  const user = req.profile
  try {
    const posts = await Post.find({postedBy: user._id})
    res.json(posts)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listNewsFeed = async (req, res) => {
  const {following} = req.profile.user

  try {
    const posts = await Post.find({postedBy: {$in: following}})
    res.json(posts)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res) => {
  const {photo} = req.post
  res.set('Content-Type', photo.contentType)
  res.send(photo.data)
}

const create = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo cannot upload"
      })
    }

    const post = new Post(fields)
    post.postedBy = req.profile
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }
    try {
      await post.save()
      res.json(post)
    } catch (err) {
      res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try {
    const post = await req.post.remove()
    res.json(post)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const like = async (req, res) => {
  const {postId, userId} = req.body

  try {
    const post = await Post.findByIdAndUpdate(postId, {$push: {likes: userId}}, {new: true})
    res.json(post)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unlike = (req, res) => {
  const {postId, userId} = req.body

  try {
    const post = Post.findByIdAndUpdate(postId, {$pull: {likes: userId}}, {new: true})
    res.json(post)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const comment = async (req, res) => {
  const {postId, userId, comment} = req.body
  comment.postedBy = userId
  try {
    const post = await Post.findByIdAndUpdate(postId, {$push: {comments: comment}}, {new: true})
    res.json(post)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const uncomment = async (req, res) => {
  const {postId, commentId} =  req.body
  try {
    const post = await Post.findByIdAndUpdate(postId, {$pull: {comment: {_id: commentId}}}, {new:true})
    res.json(post)
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const postByID = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id).populate('postedBy', '_id name')
    if (!post) {
      return res.status(400).json({
        error: "Post not found"
      })
    }
    req.post = post
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  listNewsFeed,
  remove,
  photo,
  unlike, uncomment, listByUser,
  create, like, comment,
  postByID
}