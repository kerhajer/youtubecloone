const { createError } =require("../error.js");
const Video =require ("../models/Videoschema.js");
const User=require ("../models/Userschema.js");

 const update = async (req, res) => {
  try {
    //1 find() //2 Edit() // 3 save()
    //findByIdAndUpdte 
    const updateduser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json({msg:' account user has been updated successfully!',updateduser})

} catch (error) {
    console.log(error);
}
};

 const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

 const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


const subscribe = async (req, res, next) => {
  try {
    // Update the current user's document by adding the subscribed channel ID
    const currentUser = await User.findByIdAndUpdate(req.userId, {
      $push: { subscribedUsers: req.params.id },
    });

    // Increment the subscriber count for the channel user
    const subscribedUser = await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
      $push: { subscribedUsers: currentUser }, // Adding the current user object

    });

    // Send the success response
    res.status(200).json({ currentUser, subscribedUser });
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const currentUser = await User.findByIdAndUpdate(req.userId, {
      $pull: { subscribedUsers: req.params.id },
    });

    const subscribedUser = await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
      $pull: { subscribedUsers: req.userId }, // Use req.userId here
    });

    // Send the success response
    res.status(200).json({ currentUser, subscribedUser });
  } catch (err) {
    next(err);
  }
}

const like = async (req, res, next) => {
  const userId = req.userId;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findByIdAndUpdate(
      videoId,
      { $addToSet: { likes: userId },
      $pull: { dislikes: userId } 
    },
      { new: true }
    ).populate({
      path: 'likes',
      select: '-password -__v' // Exclude password and __v fields from the user documents
    }).populate({
      path: 'owner',
      select: '-password -__v' // Exclude password and __v fields from the user documents
    })
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};
const dislike = async (req, res, next) => {
  const userId = req.userId;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: userId }, // Add the user ID to the dislikes array
        $pull: { likes: userId } 
      },
      { new: true }
    ).populate({
      path: 'dislikes',
      select: '-password -__v' // Exclude password and __v fields from the user documents
    }).populate({
      path: 'owner',
      select: '-password -__v' // Exclude password and __v fields from the user documents
    })
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};
module.exports={
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
}