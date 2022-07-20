import express from 'express'
import { updateUser,deleteUser, getUser, subcribe, unsubcribe, likeVideo, dislikeVideo } from '../controllers/User.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()


// update user
router.put("/:id", verifyToken, updateUser)

// delete usere
router.put("/:id", verifyToken,deleteUser)

//get user
router.get("/find/:id", getUser)

//subcribe
router.put("/subcribe/:id", verifyToken,subcribe)

// unsubcribe
router.put("/unsubcribe/:id", verifyToken,unsubcribe)

// like video
router.put("/like/:videoId", verifyToken,likeVideo)

// dislike video
router.put("/dislike/:videoId", verifyToken,dislikeVideo)

export default router