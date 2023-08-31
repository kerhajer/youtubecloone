const { createError } =require("../error.js");

const Comment=require ("../models/Commentschema.js");

const addComment= async (req, res) => {
  try {
    const {userId,videoId,desc} = req.body;

    const newComment = await  Comment.create({
      owner: req.userId,
      userId,
      videoId,
      desc,

    });

    res.json(newComment);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};




const updatecomm = async (req, res) => {
  try {
 
    const updatedcomm= await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('owner', '-password -__v')
    res.json({msg:' comment has been updated successfully!',updatedcomm})

} catch (error) {
    console.log(error);
}
};



const deleteComment = async (req, res) => {
  try {
            
    const deletedcomm= await Comment.findByIdAndDelete(req.params.id)
    res.json({msg:'comment has been deleted successfully!',deletedcomm})
} catch (error) {
    console.log(error)
}
}


const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate('owner', '-password -__v')
      .sort({ createdAt: -1 }); // Sorting in descending order based on creation date
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

module.exports= {addComment, deleteComment, getComments,updatecomm } 
