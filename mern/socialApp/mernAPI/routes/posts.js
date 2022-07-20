import express from 'express'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
const router = express.Router()

// create post
router.post("/", async (req, res)=>{
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        res.status(200).json("Success create new post")
    } catch (error) {
        res.status(400).json({error:error})
    }
})

//update post
router.put("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("Success update post")
        } else {
            res.status(403).json("you can update only your post")
        }
    } catch (error){
        res.status(400).json({error:error})
    }
})

//delete
router.delete("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("Success delete post")
        } else {
            res.status(403).json("you can delete only your post")
        }
    } catch (error){
        res.status(400).json({error:error})
    }
})

//like/dislike post
router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes:req.body.userId}})
            res.status(200).json("the post has been liked")
        } else {
            await post.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
    } catch(error){
        res.status(500).json(error)
    }
})

router.get("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch(error){
        res.status(400).json(error)
    }
})

router.get("/timeline/:userId", async(req, res)=>{
    try{
        const currentUser = await User.findById(req.params.userId)
        console.log(currentUser)

        const userPosts = await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch(error){
        res.status(400).json(error)
    }
})

router.get("/profile/:username", async(req, res)=>{
    try{
        const currentUser = await User.findOne({username: req.params.username})
        const userPosts = await Post.find({userId:currentUser._id})
        res.status(200).json(userPosts)
    } catch(error){
        res.status(400).json(error)
    }
})

export default router