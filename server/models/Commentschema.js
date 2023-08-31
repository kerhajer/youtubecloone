const  mongoose  = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema(
  {
    owner: {      
      type: mongoose.Schema.Types.ObjectId,

      ref:'User',
    },
    
    
    userId: {
      type: String,
    },
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
