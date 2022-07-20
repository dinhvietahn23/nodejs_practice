import express from 'express'
import User from '../models/userModel.js'
const router = express.Router()

router.post("/register" , async (req, res)=>{
    try {
        const newUser = req.body
        console.log(newUser)
        const user = new User(newUser)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error})
    }
})

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(400).json("Not found user")
        const password  = req.body.password === user.password
        !password && res.status(400).json("Wrong password")

        res.status(200).json({loginSuccess:user})
    } catch (error) {
        res.status(400).json({error:error})
    }
})

export default router