import { UserModel } from "../models/User.js";
import { VideoModel } from "../models/Video.js";

export const addVideo = async(req, res, next) => {
    const newVideo = new VideoModel({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async(req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        (!video) && res.status(400).json("Video not found!")
        if (req.user.id === video.userId) {
            const updatedVideo = await VideoModel.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            res.status(400).json("You can update only your video!")
        }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async(req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        (!video) && res.status(400).json("Video not found!")
        if (req.user.id === video.userId) {
            await VideoModel.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted.");
        } else {
            res.status(400).json("You can update only your video!")
        }
    } catch (err) {
        next(err);
    }
}
export const getVideo = async(req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}

export const addView = async (req, res, next) => {
    try {
    await VideoModel.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};

export const random = async (req, res, next) => {
    try {
        const videos = await VideoModel.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const trend = async (req, res, next) => {
    try {
        const videos = await VideoModel.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const sub = async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await VideoModel.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    // res.status(200).json(list.flat());
    } catch (err) {
      next(err);
    }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    console.log(tags)
    try {
        const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
  
export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await VideoModel.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};