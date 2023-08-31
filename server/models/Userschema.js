
const  mongoose  = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      email: {type:String,
        required:true,
        unique:true,
        match : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'please type a valid email']
    },
      
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: 
      [{type:ObjectId,ref:"User"}],
    

    imgchannel: {
      type: String,
    },
    namechannel: {
      type: String,
    },
    
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema )
