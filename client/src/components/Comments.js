import React, { useEffect, useState } from "react";
import { useSelector ,useDispatch } from "react-redux";
import '../css/comment.css';
import SmsIcon from '@mui/icons-material/Sms';
import { addComment, getComments } from "../Redux/CommentSlice";
import Comment from './Comment'
import Avatar from 'react-avatar';



const Comments = ({videoId}) => {

  const currentUser  = useSelector(state=> state.userreducer.currentUser);
  const Comments = useSelector(state=> state.Commentreducer.Comments);


  const dispatch = useDispatch();


  
  useEffect(() => {
    dispatch(getComments(videoId));

  },[dispatch, videoId]);



  const [newComment, setNewComment] = useState({
    userId:currentUser._id,
    videoId:videoId,
    desc:'',
  })
  
  const HandleChange = (e)=>{
    setNewComment({...newComment, [e.target.name] : e.target.value})

  }
  const adding = (e) => {
    e.preventDefault();
    if (currentUser) {
      const updatedComment = {
        ...newComment,
        videoId,
      };
  
      dispatch(addComment(updatedComment));

      setNewComment({ ...updatedComment, desc:''});

    }
  };

  return (
    <div>
      < div className="NewComment">
     
              
      {currentUser && currentUser._id ? ( // Check if currentUser and its ID exist
        <>
          {currentUser.img ? (
            <img style= {{width:'25px',height:'25px',borderRadius:'100%'}} 
              alt={currentUser.name}
              src={currentUser.img}
            />
          ) : (
            <Avatar 
              name={currentUser.name}
              size="25"
              round={true}
              textSizeRatio={2}
              color="#000"
              fgColor="#fff"
              style={{ backgroundColor: 'grey' ,color:'blue'}}
            />
          )}
          <input
            onChange={HandleChange}
            required
            fullWidth
            id="desc"
            name="desc"
            className="Input"
            placeholder="Add a comment..."
          />
          <button onClick={adding}> <SmsIcon/></button>
        </>
      ) : null}
      </div>
      {Comments.map(comment=>(
        <Comment key={comment._id} comment={comment} videoId={videoId}/>
      ))}
    </div>
  );
};

export default Comments;