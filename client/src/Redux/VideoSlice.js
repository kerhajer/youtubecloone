import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';




const createConfig = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      headers: {
        token
       }
    };
  } else {
    return {};
  }
}

export const addVideo= createAsyncThunk('Video/addVideo', async ( {inputs, tags},{rejectWithValue})=>{
  try {
    const config = createConfig();
        
      const {data} = await axios.post('http://localhost:5000/api/videos/', {...inputs, tags},config)
      
      return data
  } catch (error) {
     return rejectWithValue(error.response.data.message )
  }

})




export const getvideobyid = createAsyncThunk('Video/getvideobyid', async (id,{rejectWithValue,dispatch}) => {
  try {
    const {data} = await axios.get(`http://localhost:5000/api/videos/find/${id}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response.data.message )
  }

})
export const addview = createAsyncThunk('Video/addview', async (id,{rejectWithValue}) => {
  try {
    const {data} = await axios.put(`http://localhost:5000/api/videos/view/${id}`);
    return data
  } catch (error) {
    return rejectWithValue(error.response.data.message )
  }

})




export const getvideo = createAsyncThunk('Video/getvideo', async (_,{rejectWithValue}) => {
  try {
    const {data} = await axios.get('http://localhost:5000/api/videos/random',_);
    return data

  } catch (error) {
    return rejectWithValue(error.response.data.message )
  }

})

export const Videossearch = createAsyncThunk(
  'Video/Videossearch', 
  async (query, { rejectWithValue }) => {
    try {
      const {data}= await axios.get(`http://localhost:5000/api/videos/search?q=${query}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const Recomendationbytag = createAsyncThunk(
  'Video/Recomendationbytag ', 
  async (tags, { rejectWithValue }) => {
    try {
      const {data}= await axios.get(`http://localhost:5000/api/videos/tags?tags=${tags}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const likeVideo = createAsyncThunk(
  'Video/likeVideo',
  async ({videoId,token}, { rejectWithValue, getState }) => {
    try {
      const headers = {
        token
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/users/like/${videoId}`,
        null,
        { headers }
      );

      return data;
    } catch (error) {
      console.error('Error:', error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const dislikeVideo = createAsyncThunk(
  'Video/dislikeVideo',
  async ({videoId,token}, { rejectWithValue, getState }) => {
    try {
      const headers = {
        token
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/users/dislike/${videoId}`,
        null,
        { headers }
      );

      return data;
    } catch (error) {
      console.error('Error:', error);

      return rejectWithValue(error.response.data.message);
    }
  }
)








export const handleSubscription = createAsyncThunk(
  'Video/handleSubscription',
  async ({channelId,token}, { rejectWithValue }) => {
    try {

      const headers = {
        token
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/users/sub/${channelId}`,
        null,
        { headers }
      );

      return data;
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const handleunSubscription = createAsyncThunk(
  'Video/handleunSubscription',
  async ({channelId,token}, { rejectWithValue }) => {
    try {

      const headers = {
        token
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/users/unsub/${channelId}`,
        null,
        { headers }
      );

      return data;
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

























const VideoSlice = createSlice({
  name: 'Video',
  initialState: {
    videos: [],
    videoaaded:{},
    currentVideo: {},
    likes:[],
    currentUserSubscribed: false,
    loading: false,
    error: false,
    recom:[],
  },

  reducers: {

      fetchStart: (state) => {
        state.loading = true;
      },
      fetchSuccess: (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
      },
      fetchFailure: (state) => {
        state.loading = false;
        state.error = true;
      },
      like: (state, action) => {
        console.log('Like action dispatched:', action);
         const userId = action.payload
        
    
        if (!state.currentVideo.likes.includes(userId)) {
          state.currentVideo.likes.push(userId);
    
          const dislikeIndex = state.currentVideo.dislikes.findIndex(
            (dislikeUserId) => dislikeUserId === userId
          );
          if (dislikeIndex !== -1) {
            state.currentVideo.dislikes.splice(dislikeIndex, 1);
          }
        }
      },
        dislike: (state, action) => {
          const userId = action.payload;
    
          if (!state.currentVideo.dislikes.includes(userId)) {
            state.currentVideo.dislikes.push(userId);
    
            const likeIndex = state.currentVideo.likes.findIndex(
              (likeUserId) => likeUserId === userId
            );
            if (likeIndex !== -1) {
              state.currentVideo.likes.splice(likeIndex, 1);
            }
          }
        },

 
        subscription:(state, action) => {
          
          const userId = action.payload;

          if (!state.currentVideo.owner.subscribedUsers.includes(userId)) {
            state.currentVideo.owner.subscribedUsers.push(userId);

             const  subuser= state.currentVideo.owner.subscribedUsers.findIndex(
              (subuserId) => subuserId === userId
            );
            if (subuser !== -1) {
              state.currentVideo.owner.subscribedUsers.splice(subuser, 1);
       
            }
          }
        },
  

        unsubscription: (state, action) => {
          const userId = action.payload;
        
          const isSubscribed = state.currentVideo.owner.subscribedUsers.includes(userId);
        
          if (isSubscribed) {
            // If the user is subscribed, remove them
            const subuserIndex = state.currentVideo.owner.subscribedUsers.findIndex(
              (subuserId) => subuserId === userId
            );
        
            if (subuserIndex !== -1) {
              state.currentVideo.owner.subscribedUsers.splice(subuserIndex, 1);
            }
          }
        },











      } ,




















  extraReducers: (builder) => {
    builder
    .addCase(addVideo.pending, (state) => {
      state.loading = true;
    })
    .addCase(addVideo.fulfilled, (state,  {type,payload}) => {
      state.loading = false;
      state.videoaaded = payload;
    })
    .addCase(addVideo.rejected, (state, {type,payload}) => {
      state.error =  payload;
    })
    .addCase(getvideo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getvideo.fulfilled, (state, {type,payload}) => {
      state.loading = false;
      state.videos = payload;
    })
    .addCase(getvideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(Videossearch.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(Videossearch.fulfilled, (state, action) => {
      state.loading = false;
      state.videos= action.payload;
    })
    .addCase(Videossearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(Recomendationbytag.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(Recomendationbytag.fulfilled, (state, action) => {
      state.loading = false;
      state.videos= action.payload;
    })
    .addCase(Recomendationbytag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getvideobyid.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getvideobyid.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo= action.payload;
    })
    .addCase(getvideobyid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
 

    .addCase(likeVideo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(likeVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo= action.payload;

    })
    .addCase(likeVideo.rejected, (state,action ) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(dislikeVideo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(dislikeVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo= action.payload;

    })
    .addCase(dislikeVideo.rejected, (state,action ) => {
      state.loading = false;
      state.error = action.payload;
    })
  
    .addCase(addview.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo= action.payload;

    })

    




    .addCase(handleSubscription.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload.currentUser;
    
      const isUserSubscribed = state.currentVideo.owner.subscribedUsers.some(
        subscribedUser => subscribedUser._id === payload.currentUser._id
      );
    
      if (!isUserSubscribed) {
        state.currentVideo.owner.subscribedUsers.push(payload.currentUser);
        state.currentUserSubscribed = true;
      } else {
        state.currentUserSubscribed = true; // You might need to set it to true or false based on your logic
      }
    })

    
    
    










    .addCase(handleunSubscription.fulfilled, (state, { type, payload }) => {
      state.loading = false;
      state.currentUser = payload.currentUser;
    
      const isUserSubscribed = state.currentVideo.owner.subscribedUsers.some(
        subscribedUser => subscribedUser._id === payload.currentUser._id
      );
    
      if (isUserSubscribed) {
        // Remove the user from the subscribedUsers array
        state.currentVideo.owner.subscribedUsers = state.currentVideo.owner.subscribedUsers.filter(
          subscribedUser => subscribedUser._id !== payload.currentUser._id
        );
        state.currentUserSubscribed = true;
      } else {
        state.currentUserSubscribed = !state.currentUserSubscribed;
      }
    })
    
    
    
    
    
     
 

},
});




export default VideoSlice.reducer;
export const { fetchStart, fetchSuccess, fetchFailure, like, dislike,subscription , setCurrentVideo,unsubscription
} = VideoSlice.actions;