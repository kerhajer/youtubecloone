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

export const addComment= createAsyncThunk('Comment/addComment', async ( newComment,{rejectWithValue})=>{
  try {
    const config = createConfig();
      const {data} = await axios.post('http://localhost:5000/api/comments/',newComment,config)
      
      return data
  } catch (error) {
     return rejectWithValue(error.response.data.message )
  }

})








export const getComments = createAsyncThunk('Comment/getComments', async (videoId,{rejectWithValue}) => {
  try {
    const {data} = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response.data.message )
  }

})



export const deleteComment = createAsyncThunk('Comment/deleteComment', async(id,{rejectWithValue,dispatch})=>{
  try {
    const config = createConfig();

      const {data} = await axios.delete(`http://localhost:5000/api/comments/${id}`,config)
      return data
  } catch (error) {
      return rejectWithValue(error.response.data.message)
  }
})

export const UpdateComment = createAsyncThunk('Comment/UpdateComment', async(id,{rejectWithValue,dispatch})=>{
  try {
    const config = createConfig();

      const {data} = await axios.put(`http://localhost:5000/api/comments/update/${id}`,config)
      return data
  } catch (error) {
      return rejectWithValue(error.response.data.message)
  }
})








const CommentSlice = createSlice({
  name: 'Comment',
  initialState: {
    Comments: [],
    Commentaded: {},
    loading: false,
    error: false,
  },



  extraReducers: (builder) => {
    builder
    .addCase(addComment.pending, (state) => {
      state.loading = true;
    })
    .addCase(addComment.fulfilled, (state,  {type,payload}) => {
      state.loading = false;
      state.Commentaded = payload;
      state.Comments.push(payload)
       })
    .addCase(addComment.rejected, (state, {type,payload}) => {
      state.error =  payload;
    })
    .addCase(getComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getComments.fulfilled, (state, {type,payload}) => {
      state.loading = false;
      state.Comments= payload;
    })
    .addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(deleteComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      state.Comments = state.Comments.filter(com => com._id !== action.payload.deletedcomm._id);

    })
    .addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(UpdateComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(UpdateComment.fulfilled, (state, action) => {
      state.loading = false;
      state.Comments = state.Comments.map(comm=> (comm._id == action.payload._id)? {...comm,...action.payload} : comm )

    })
    .addCase(UpdateComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
},
});




export default CommentSlice.reducer;
