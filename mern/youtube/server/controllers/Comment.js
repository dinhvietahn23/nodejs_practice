import { CommentModel } from "../models/Comment.js";
import {VideoModel} from "../models/Video.js"

export const addComment = async (req, res, next) => {
    const newComment = new CommentModel({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err);
    }

}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(res.params.id);
        const video = await VideoModel.findById(res.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await CommentModel.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");
        } else {
            res.status(400).json("You can delete ony your comment!");
        }
    } catch (err) {
        next(err);
    }

}

export const getComments = async (req, res, next) => {
    try {
        const comments = await CommCommentModelent.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }

}