import CategoriesBar from "./CategoriesBar";
import React, { useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import '../css/Video.css'
import { Recomendationbytag,getvideobyid } from "../Redux/VideoSlice";
import {format} from "timeago.js";

import { Link } from "react-router-dom";


import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

const drawerWidth = 380;


const Recommendation = ({tags }) => {


 const  videos =useSelector((state) => state.Videoreducer.videos)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Recomendationbytag([tags]))
    
  }, [tags, dispatch]);



  const handleVideoClick = (videoId) => {
    dispatch(getvideobyid(videoId));
  };



  
  return (
    <div className="recom" >
        <Drawer

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            margin:'20px'
          },
        }}
        variant="permanent"
        anchor="right"
      >

        <Toolbar />
        <div style={{ marginTop: '65px', display: 'flex'}}>
          <CategoriesBar />
        </div>

     
        <List >
          {videos.map((item) => (
            <div
              key={item._id}
              className="videocontainer"
              onClick={() => handleVideoClick(item._id)} // Dispatch action on click
            >
              <Link to={`/videos/find/${item._id}`} style={{ textDecoration: 'none' }}>
              <div className="videocontainer">
        <div className="video_thumbnail">
          <video src={item.videoUrl} controls muted />
        </div>
        <div className="video_details">
        
          <h3 className="video_title">{item.title}</h3>
          <div className="video_owner">
            <a href="">{item.owner.name}</a>
            <span>
              {item.views} vus • {format(item.createdAt)}
            </span>
          </div>
        </div>
      </div>
              </Link>
            </div>
          ))}
        </List>
       
      </Drawer>
















    </div>
  );
};

export default Recommendation;