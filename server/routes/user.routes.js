import express from 'express'
import userCtrl from './../controllers/user.controller'
import authCtrl from './../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignIn, userCtrl.read)
  .put(authCtrl.requireSignIn, userCtrl.update)
  .delete(authCtrl.requireSignIn, userCtrl.remove)

router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/photo/defaultPhoto')
  .get(userCtrl.defaultPhoto)

router.route('/api/users/follow')
  .put(authCtrl.requireSignIn, userCtrl.addFollowing, userCtrl.addFollower)

router.route('/api/users/unfollow')
  .put(authCtrl.requireSignIn, userCtrl.removeFollowing, userCtrl.removeFollower)

router.param('userId', userCtrl.userByID)

export default router
