require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.
verifyToken = (req,res,next)=>{
  const token = req.header('token')
  if(!token){
    return res.json({message: 'token must be provided !!'})
  }
  const decoded =  jwt.verify(token, process.env.JWT);
  if(!decoded){
    return res.json({message:'You are not authorized!!'})
  }




  
 req.userId = decoded.id
 
 next()
}



