import { UserModel } from "../models/User.js"
import { VideoModel } from "../models/Video.js"

export const updateUser = async(req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updateUser = await UserModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).json(updateUser)
        } catch (error) {
            next(error)
        }
    } else{
        res.status(400).json("You can only update only your account")
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await UserModel.findByIdAndDelete(
                req.params.id,
            )
            res.status(200).json("User has been deleted")
        } catch (error) {
            next(error)
        }
    } else{
        res.status(400).json("You can only delete only your account")
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err); 
    }
}

export const subcribe = async(req, res, next) => {
    try {
        await UserModel.findByIdAndUpdate(req.user.id, {
          $push: { subscribedUsers: req.params.id },
        });
        await UserModel.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull.")
    } catch (err) {
        next(err);
    }
}

export const unsubcribe = async(req, res) => {
    try {
        try {
          await UserModel.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
          });
          await UserModel.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
          });
          res.status(200).json("Unsubscription successfull.")
        } catch (err) {
          next(err);
        }
    } catch (err) {
        next(err);
    }
}

export const likeVideo = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await VideoModel.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("The video has been liked.")
    } catch (err) {
        next(err);
    }
}

export const dislikeVideo = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await VideoModel.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
        next(err);
    }
}