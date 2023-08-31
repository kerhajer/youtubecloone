import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Box from "@mui/material/Box";
import { addVideo, getvideo } from "../Redux/VideoSlice";

const Upload = () => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()
 
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => ({
            ...prev,
            [urlType]: downloadURL,
          }));
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(addVideo({inputs, tags}))
    dispatch(getvideo())
    setOpen(false);
  
      navigate('/');
    
  };

 







  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <PublishedWithChangesIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <p>Upload a New Video</p>
            {videoPerc > 0 ? (
              `Uploading: ${videoPerc}%`
            ) : (
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  VIDEO:
                </InputLabel>
                <Input
                name="videoUrl"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            )}

            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Title
              </InputLabel>
              <Input
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Description
              </InputLabel>
              <Input
                type="text"
                placeholder="description"
                name="desc"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Tags
              </InputLabel>
              <Input
                type="text"
                placeholder="Separate the tags with commas."
                name="tags"
                onChange={handleTags}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Image
              </InputLabel>
              {imgPerc > 0 ? (
              `Uploading: ${imgPerc}%`
            ) : (
              <Input
              name="imgUrl"
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
              )}
            </FormControl>

         
          
         

            <Button onClick={handleUpload} variant="danger">
              Add video
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Upload;