const  mongoose  = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const VideoSchema = new mongoose.Schema(
  {
    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes:
    [{type:ObjectId,ref:"User"}],
    
    dislikes: 
    [{type:ObjectId,ref:"User"}]
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
