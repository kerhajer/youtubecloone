import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'timeago.js';
import Avatar from 'react-avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { UpdateComment } from '../Redux/CommentSlice';
import EditIcon from '@mui/icons-material/Edit';

const Updatecomm = ({ comment }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [updatedcomm, setUpdatedcomm] = useState({
    _id: comment._id,
    desc: comment.desc,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedcomm((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    dispatch(UpdateComment(updatedcomm));
    handleClose();
  };

  const renderAvatar = () => {
    const { img, name } = comment.owner;
    if (img) {
      return <img style={{ width: '25px', height: '25px', borderRadius: '100%' }} alt={name} src={img} />;
    } else {
      return (
        <Avatar
          className="Avatar"
          name={name}
          size="25"
          round={true}
          textSizeRatio={2}
          color="#000"
          fgColor="#fff"
          style={{ backgroundColor: 'grey', color: 'blue' }}
        />
      );
    }
  };

  return (
    <div>
        <EditIcon onClick={handleOpen} style={{ marginLeft: 'auto' }} />

      <Modal  open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 900, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          {renderAvatar()}
          <div className="Details">
            <span className="Name">
              {comment.owner.name}
              <span className="Date">{format(comment.createdAt)}</span>
              <input
                onChange={handleChange}
                required
                fullWidth
                id="desc"
                name="desc"
                className="Input"
                placeholder="Add a comment..."
                value={updatedcomm.desc}
              />
            </span>
          </div>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Updatecomm;