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


router.param('userId', userCtrl.userByID)

export default router
