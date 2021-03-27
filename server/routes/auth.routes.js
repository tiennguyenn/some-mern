import express from 'express'
import authCtrl from './../controllers/auth.controller'

const router = express.Router()

router.route('/api/signIn')
  .post(authCtrl.signIn)

export default router