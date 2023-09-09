import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  
  // console.log(req.token,"token in video page");
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  // console.log(newVideo,"newvideoss");
  try {
    const savedVideo = await newVideo.save();
    // console.log(savedVideo,"saved videos");
    res.status(200).json(savedVideo);
  } catch (err) {
    // res.json("fill the empty fileds")
    next(err)
  }

};



export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
    
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  console.log(req.body, req.params,"body");

  const id = req.body.userId
  const videoId = req.params.id;
  console.log(id,videoId);
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{views:id}
    })
         console.log("successs");
      res.status(200).json("The view has been increased.");
   

  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};





export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  console.log(query,"query");
  try {
    const videos = await Video.find({
      $or: [
        {
          title: { $regex: `.*${query}.*`, $options: "i" },
        },
        {
          tags: { $in: [new RegExp(`.*${query}.*`, "i")] },
        },
      ],
    }).limit(40);
    
    console.log(videos,"search results");
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

