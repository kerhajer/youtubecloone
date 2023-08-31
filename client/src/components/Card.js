import React , { useRef }from "react";
import '../css/card.css'
import CloseIcon from '@mui/icons-material/Close';

import {format} from "timeago.js";
import { useDispatch } from 'react-redux';

import { Link } from "react-router-dom";
import Avatar from 'react-avatar';


export default function Card({ item }) {
  const videoRef = useRef(null);


    const videoElement = videoRef.current;



  const handleVideoEnded = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0; // Rewind the video to the beginning
      videoElement.play(); // Play the video again
    }
  };


  return (



    <Link to={`/videos/find/${item._id}`} style={{ textDecoration: "none" }}>

   <div className="video-container">
    <div className="video">
    <div className="video__thumbnail">
            <video src={item.videoUrl}
  controls
  muted
  ref={videoRef}
  onEnded={handleVideoEnded}
  onMouseEnter={() => videoRef.current.play()} // Play video on hover
  onMouseLeave={() => videoRef.current.pause()}
  
  />
     <source src={item.videoUrlHD} type="video/mp4" /> {/* Always HD */}
        </div>
        <div className="video__details">
        <div className="author">

        <a  href="#">

        {item.owner.img ? (
               <img 
                  alt={item.owner.name}
                  src={item.owner.img}

                />
              ) : (
                <Avatar
                name={item.owner.name}
                size="30"
                round={true}
                textSizeRatio={2}
                color="#000"
                fgColor="#fff"
                style={{    objectFit: 'cover',
                  borderRadius: '100%',
                  height:' 40px',
                  width: '40px',
                  marginRight: '10px',
                  marginTop: '15px'}}


               

                  
              />
              )}
          </a>
          </div>
          <div className="title">

            <h3>
            <a href="#" >
              {item.title}
            </a>
          </h3>
                <a href=""> {item.owner.name}</a>
                <span>{item.views} • {format(item.createdAt)}</span>
              </div>
    </div>
  </div>      

</div>
</Link>

  )   }










