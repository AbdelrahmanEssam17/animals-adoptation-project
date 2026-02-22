import {Router} from 'express'
import * as registrationServices from './auth.controller.js'

const router=Router()

router.post('/signup',registrationServices.signup)




export default router