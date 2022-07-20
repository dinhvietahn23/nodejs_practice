import express from 'express'
import { googleAuth, signin, signup } from '../controllers/Auth.js'

const router = express.Router()

// cretae a user
router.post("/signup", signup)

//sign in 
router.post("/signin", signin)

//google auth
router.post("/google", googleAuth)

export default router