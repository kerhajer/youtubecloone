import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { useParams } from 'react-router-dom';
import { getvideobyid, likeVideo,like ,dislikeVideo,dislike,addview,subscription,handleSubscription,unsubscription,handleunSubscription} from "../Redux/VideoSlice";
import '../css/Video.css';
import CloseIcon from '@mui/icons-material/Close';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';

import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import { logout} from '../Redux/userSlice'
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from 'react-avatar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HomeIcon from '@mui/icons-material/Home';
import { Videossearch} from '../Redux/VideoSlice';
import '../css/card.css'
import { useLocation } from "react-router-dom";
import Comments from "../components/Comments";
import Recommendation from "../components/Recomendation";

import {
  MdSubscriptions,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,

} from 'react-icons/md'
import { getComments } from "../Redux/CommentSlice";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '2.5rem',
  borderRadius: '1.625rem',
  padding: '0.5',
  fontSize: '1rem',
  color: 'black',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(30),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
      '&:focus': {
        width: '50ch',
      },
      borderColor: '#f5f5f5',
      marginLeft: '20px',
    },
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Video = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [ischeked, setIscheked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [q, setQ] =useState("");
  const query = useLocation().search;

  const currentUser= useSelector(state => state.userreducer.currentUser)
const videos=useSelector(state=>state.Videoreducer.videos)
const currentVideo=useSelector(state=>state.Videoreducer.currentVideo)
const user=useSelector(state=>state.userreducer.user)
  const isAuth = useSelector(state => state.userreducer.isAuth)
  const token= useSelector(state => state.userreducer.token)
const        currentUserSubscribed=useSelector(state=>state.Videoreducer.currentUserSubscribed)

  const {id} = useParams()
 
  useEffect(() => {
    dispatch(getvideobyid(id));
    dispatch(getComments(id))
  }, []);
  
  useEffect(() => {
    dispatch(addview(id));
  }, []);

  const handleInputChange = (e) => {
    setQ(e.target.value);
  };
  const searching= (e)=>{
    e.preventDefault()
    dispatch(Videossearch(q))
    navigate('/search')
 };




  const handleChange = (event) => {
    setIscheked(event.target.checked);
    if (!ischeked) {
      dispatch(logout())
     navigate('/')
    }

    
  };

  const handleSubscribe = () => {
    if (currentUser) {
      const isSubscribed = currentVideo.owner.subscribedUsers.some(
        subscribedUser => subscribedUser._id === currentUser._id
      );
  
      if (isSubscribed ) {
        dispatch(unsubscription(currentUser));
        dispatch(handleunSubscription({ channelId: currentVideo.owner._id, token }));
        dispatch(getvideobyid(id));
      } else {
        dispatch(subscription(currentUser));
        dispatch(handleSubscription({ channelId: currentVideo.owner._id, token }));
        dispatch(getvideobyid(id));

      }
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);

  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden'}}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: 'white', padding: '150', marginTop: '0' }}>
      <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
    <IconButton
      position="fixed"
      size="large"
      edge="start"
      color="black"
      aria-label="toggle drawer"
      onClick={open ? handleDrawerClose : handleDrawerOpen} // Toggle between open and close
      sx={{
        marginRight: 5,
      }}
    >
      {open ? <CloseIcon /> : <MenuIcon />} {/* Show CloseIcon when drawer is open, MenuIcon when it's closed */}
    </IconButton>
          <Link to='/'>
            <img
              style={{ width: '70px', height: '50px' }}
              className='header__logo'
              src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg'
              alt=''
            />
          </Link>
          <Search style={{ border: '1px solid lightgray', display: 'flex', alignItems: 'center' }}>
  <StyledInputBase
    onChange={handleInputChange}
    value={q}
    placeholder="Rechercher"
    inputProps={{ 'aria-label': 'Rechercher' }}
    style={{ flex: 1, marginRight: '8px' }} // Adjust the spacing as needed
  />
  <button
    onClick={searching}
    style={{
      borderColor: '#f5f5f5',
      borderTopRightRadius: '1.625rem',
      borderBottomRightRadius: '1.625rem',
      cursor: 'pointer',
      color: 'black',
      width: '90px',
      height: '39px',
    }}
  >
    <SearchIcon />
  </button>
</Search>
          <MicIcon style={{ color: 'black' }} className='header__icon' />

          {isAuth ? <>

            <>
             <div  style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: '20px',
              }}>
              <FormGroup style={{ color: '#747474' }}>
                <FormControlLabel

                  control={
                    <Switch
                      checked={ischeked}
                      onChange={handleChange}
                      aria-label="login switch"
                      style={{ color: '#747474' }}
                    />
                  }
                  label={'Logout'}

                />
              </FormGroup>
              <VideoCallIcon style={{ color: 'black' }} />
              <NotificationsNoneIcon style={{ color: 'black' }} />

              {user.img ? (
               <img style= {{width:'25px',height:'25px',borderRadius:'100%'}} 
                  alt={user.name}
                  src={user.img}

                />
              ) : (
                <Avatar
                name={user.name}
                size="25"
                round={true}
                textSizeRatio={2}
                color="#000"
                fgColor="#fff"
                style={{ backgroundColor: 'grey' ,color:'blue'}}
              />
              )}
           </div> 
            </>

          </> :

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: '20px',
              }}
            >
              <MoreIcon style={{ color: 'black', marginRight: '0' }} />
              <Link to="/signin">

                <Search
                  style={{
                    border: '1px solid lightgray',
                    borderRadius: '1.6rem',
                    borderColor: '#f5f5f5',
                    backgroundColor: 'none',
                    cursor: 'pointer',
                    color: 'black',
                    width: '150px',
                    height: '37px',
                    margin: '0',
                  }}
                >
                  <AccountCircleIcon
                    alt='Nouman Ahmed'
                    src='https://avatars1.githubusercontent.com/u/35970677?s=60&v=4'
                    style={{ color: 'black', marginRight: '0' }}
                  />
                  se connecter
                </Search>
              </Link>

            </div>

          }



        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <List style={{ marginTop: '60px' }}>
          {['Acceuil', 'Shorts', 'Abonnements'].map((text, index) => {
            let iconComponent = null;

            switch (index) {
              case 0:
                iconComponent = (
                  <Link to='/' style={{textDecoration:' none',
                    color:' gray'}}>
                    <HomeIcon />
                  </Link>
                );
                break;
              case 1:
                iconComponent = <MdSubscriptions size={23} />;
                break;

              default:
                iconComponent = <MdSubscriptions size={23} />;
                break;
            }

            return (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ minHeight: 50, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {iconComponent}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider style={{ margin: '0 50px 0 50px', width: '150px' }} />
        <List>
          {['Bibliothéque', 'Historique', 'A regarder plus tard', 'Videos"jaime"'].map((text, index) => {
            let iconComponent = null;

            switch (index) {
              case 0:
                iconComponent = <MdLibraryBooks />;
                break;
              case 1:
                iconComponent = <MdHistory size={23} />;
                break;
              case 2:
                iconComponent = <MdHistory size={23} />;
                break;

              default:
                iconComponent = <MdThumbUp size={23} />;
                break;
            }

            return (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ minHeight: 50, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {iconComponent}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography>
          
{!currentVideo && videos.length ? (

          <div
            dataLength={videos.length}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={300}
          >
            <div className='videos' >
              {videos.map((item) => {
                
                 return <Card key={item._id} item={item} />;
                
              })}
            </div>
          </div>
        ) : (


          <div className="container">
          < div className="content">
            <div>
              < video className="VideoFrame" src={currentVideo.videoUrl} 
             controls autoPlay   />
                  <source src={currentVideo.videoUrlHD} type="video/mp4" /> {/* Always HD */}

            </div>
            <h1 className="title">     {currentVideo.title}           </h1>
            < div className="details">
              <span className="info">
              {currentVideo.views} views • {format(currentVideo.createdAt)}
    
              </span>
  
              <div className="Buttons">
          
              <button className="Button"   onClick={() => {


if (user && Object.keys(user).length > 0) {
  dispatch( likeVideo({ videoId: currentVideo._id, token }  )) 
  dispatch( like(user));

}
 
  
}}>
                {currentVideo.likes?.includes(user?._id) ? (
                    <ThumbUpIcon />
                  ) : (

                    <ThumbUpOutlinedIcon />
                  )}{" "}
                  {currentVideo.likes?.length}
                </button>
                <button className="Button"  onClick={() => {



if (user && Object.keys(user).length > 0) {
  dispatch( dislikeVideo({ videoId: currentVideo._id, token } )) 
  dispatch(dislike(user) );

}
 


  
}}>       
                {currentVideo.dislikes?.includes(user?._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}{" "}
                  Dislike
                </button>
                <div className="Button">
                  <ReplyOutlinedIcon /> Share
                </div>
                
              </div>
            </div>
            <hr />
            <div className="channel">
              <div className="channelinfo">
              
                
               
                {currentVideo.owner.img ? (
                  <img style= {{width:'25px',height:'25px',borderRadius:'100%'}} 
                     alt={currentVideo.owner.name}
                     src={currentVideo.owner.img}
   
                   />
                 ) : (
                   <Avatar
                   name={currentVideo.owner.name}
                   size="25"
                   round={true}
                   textSizeRatio={2}
                   color="#000"
                   fgColor="#fff"
                   style={{ backgroundColor: 'grey' ,color:'blue'}}
                 />
                 )}
                
                
                
                <div className='ChannelDetail'>
                  <p className="ChannelName">{currentVideo.owner.name}</p>
                  <p className="ChannelCounter">{currentVideo.owner.subscribedUsers.length}</p>
                  <p className='Description'>{currentVideo.desc}</p>
                </div>
              </div>

              <button
      className="Subscribe"
      onClick={handleSubscribe}
    >
{currentUser === {}   ?  (
  'Subscribe'
) : (
  Object.keys(currentUser).length !== 0 && currentVideo.owner.subscribedUsers.some(subscribedUser => subscribedUser._id === currentUser._id) ? 'Unsubscribe' : 'Subscribe')}

    </button>
            </div>
            <hr />

            <Comments videoId={currentVideo._id} />

      </div>
 <div  style={{width:'300px'}} >
 <Recommendation tags={currentVideo.tags} />
 </div>
    
   
</div>

)}









        </Typography>
      </Box>
    </Box>
  );
};

export default Video;




