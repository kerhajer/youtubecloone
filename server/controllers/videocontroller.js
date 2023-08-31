const Video =require ("../models/Videoschema.js");
const User=require ("../models/Userschema.js");
const { createError } =require("../error.js");


const addVideo = async (req, res) => {
  try {
    const { userId, title, desc, imgUrl, videoUrl, views, tags, likes, dislikes } = req.body;

    const newVideo = await Video.create({
      userId  ,
      title,
      owner: req.userId,
      desc,
      imgUrl,
      videoUrl,
      views,
      tags,
      likes,
      dislikes
    });

    res.json(newVideo);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};



  const updateVideo = async (req, res) => {
    try {
      //1 find() //2 Edit() // 3 save()
      //findByIdAndUpdte 
      const updatedvideo= await Video.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.json({msg:' Video has been updated successfully!',updatedvideo})
  
  } catch (error) {
      console.log(error);
  }
  };

 const deleteVideo = async (req, res) => {
  try {
            
    const deletedvideo= await Video.findByIdAndDelete(req.params.id)
    res.json({msg:'video has been deleted successfully!',deletedvideo})
} catch (error) {
    console.log(error)
}
}




const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('owner', '-password -__v')
      .populate({
        path: 'owner.subscribedUsers',
        select: '-password -__v'
      })
      .populate('likes', '-password -__v')
      .lean();

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.owner) {
      try {
        const owner = await User.findById(video.owner, '-password -__v').populate({
          path: 'subscribedUsers',
          select: '-password -__v'
        }).lean();
        video.owner = owner || {};
      } catch (err) {
        // Handle error while populating owner
        console.error('Error populating owner:', err);
      }
    } else {
      video.owner = {};
    }

    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};








const addView = async (req, res, next) => {
  try {
    const video =await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    }) .populate({
      path: "owner",
      select: "-password -__v",
    })
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

const random = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate({
        path: "owner",
        select: "-password -__v",
      })
      .populate({
        path: "likes",
        select: "-password -__v",
      }) .populate({
        path: "dislikes",
        select: "-password -__v",
      })
     
      .exec();

    res.json(videos);
  } catch (error) {
    res.status(501).json({ message: error });
  }
};

 const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const subscribedChannels = user.subscribedUsers;

    const videos = await Video.find({ userId: { $in: subscribedChannels } })
      .populate({
        path: "owner",
        select: "-password -__v",
      })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};












const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",").map(tag => tag.trim());

  try {
    const videos = await Video.find({ tags: { $in: tags } }).populate({
      path: "owner",
      select: "-password -__v",
    }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    })   .populate({
      path: "owner",
      select: "-password -__v",
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
module.exports={ addVideo, addView, getByTag, getVideo, random, search, sub, trend ,deleteVideo,updateVideo}