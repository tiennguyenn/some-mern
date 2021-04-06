import express from 'express'

import userCtrl from './../controllers/user.controller'
import postCtrl from './../controllers/post.controller'
import authCtrl from './../controllers/auth.controller'

const router = express.Router()

router.route('/api/posts/new/:userId')
  .post(authCtrl.requireSignIn, postCtrl.create)

router.route('/api/posts/like')
  .put(authCtrl.requireSignIn, postCtrl.like)
router.route('/api/posts/unlike')
  .put(authCtrl.requireSignIn, postCtrl.unlike)

router.route('/api/posts/comment')
  .put(authCtrl.requireSignIn, postCtrl.comment)
router.route('/api/posts/uncomment')
  .put(authCtrl.requireSignIn, postCtrl.uncomment)

router.route('/api/posts/photo/:postId')
  .get(postCtrl.photo)

router.route('/api/posts/remove/:postId')
  .delete(authCtrl.requireSignIn, postCtrl.remove)

router.route('/api/posts/feed/:userId')
  .get(authCtrl.requireSignIn, postCtrl.listNewsFeed)

router.route('/api/posts/by/:userId')
  .get(authCtrl.requireSignIn, postCtrl.listByUser)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

export default router