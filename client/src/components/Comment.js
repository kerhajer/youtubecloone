import React ,{ useState } from "react";
import { useDispatch } from 'react-redux';

import '../css/comment.css';
import { format } from "timeago.js";
import Avatar from 'react-avatar';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment  } from "../Redux/CommentSlice";
import Updatecomm from "./Updatecomm";
const Comment = ({comment}) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment._id));
    handleMenuClose();
  };
  


  return (
    <div className="container">

{comment.owner.img ? (
               <img  style= {{width:'25px',height:'25px',borderRadius:'100%'}}
                  alt={comment.owner.name}
                  src={comment.owner.img}

                />
              ) : (
                <Avatar className="Avatar"
                name={comment.owner.name}
                size="25"
                round={true}
                textSizeRatio={2}
                color="#000"
                fgColor="#fff"
                style={{ backgroundColor: 'grey' ,color:'blue'}}

              />
              )}








      <div className="Details">
        <span className="Name">
         {comment.owner.name} <span className="Date">{format(comment.createdAt)}     </span>
         <span className="edit">  <IconButton
          aria-controls="comment-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="comment-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ marginRight: 1 }} />
            Delete
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
           <Updatecomm  comment={comment} />   Update 
          </MenuItem>
        </Menu></span>
        </span>
        <span className="Text">{comment.desc}</span>
      
      
      </div>
    </div>
  );
};

export default Comment;










