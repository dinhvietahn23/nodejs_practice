import express from "express";
import User from "../models/userModel.js"

const router = express.Router()


// update user
router.put("/:id", async(req, res)=>{
    if(req.body.userID === req.params.id || req.body.isAmin){
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            })
            res.status(200).json("Update account success")
        } catch (error) {
            res.status(400).json("Update account failed")
        }
    } else {
        res.status(400).json("You can update only yout account")
    }
})

//delete user
router.delete("/:id", async(req, res)=>{
    if(req.body.userID === req.params.id || req.body.isAmin){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete account success")
        } catch (error) {
            res.status(400).json("Update account failed")
        }
    } else {
        res.status(400).json("You can delete only yout account")
    }
})

// get user
router.get("/:id", async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("Not exist user")
    }
})
//get user by query
router.get("/", async(req, res)=>{
    try {
        const userId = req.query.userId
        console.log(userId)
        const username = req.query.username
        const user = userId?await User.findById(userId): await User.findOne({username:username})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("Not exist user")
    }
})

//get friends
router.get("/friends/:userId", async(req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId)
            })
        )
        
        let friendlist = []
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend
            friendlist.push({_id, username, profilePicture})
        })
        res.status(200).json(friendlist)

    } catch (error) {
        res.status(400).json(error)
    }
})

// follow user
router.put("/:id/follow", async(req, res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push:{
                        followers: req.body.userId
                    }
                })

                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id
                    }
                })
                res.status(200).json("Follow success")
            } else{
                res.status(403).json("you allready follow this user")
            }
        } catch (error) {
            
        }
    } else {
        res.status(403).json("you cannot follow yourself")
    }
})

// unfollow user
router.put("/:id/unfollow", async(req, res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull:{
                        followers: req.body.userId
                    }
                })

                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id
                    }
                })
                res.status(200).json("Unfollow success")
            } else{
                res.status(403).json("you dont follow this user")
            }
        } catch (error) {
            
        }
    } else {
        res.status(403).json("you cannot unfollow yourself")
    }
})

export default router