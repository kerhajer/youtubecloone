import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, provider } from "../firebase";
import axios from 'axios';
import { signInWithPopup } from '@firebase/auth';

export const signingUp = createAsyncThunk('user/signingUp', async (newUser, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:5000/api/auth/signup', newUser);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message ? error.response.data.message : error.response.data.errors);
  }
});

export const signingIn = createAsyncThunk('user/signingIn', async (user, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.post('http://localhost:5000/api/auth/signin', user);

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message ? error.response.data.message : error.response.data.errors);
  }
});

export const signInWithGoogle = createAsyncThunk('user/signInWithGoogle', async (_, { dispatch, rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = result.user;

    const { data } = await axios.post('http://localhost:5000/api/auth/google', {
      name: displayName,
      email,
      img: photoURL
    });

    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data.message ? error.response.data.message : error.response.data.errors);
  }
});

export const fetchChannel = createAsyncThunk('user/fetchChannel', async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/users/find/${userId}`);
    return data;
  } catch (error) {
    return rejectWithValue(
      error.response.data.message ? error.response.data.message : error.response.data.errors
    );
  }
});


export const Allusers= createAsyncThunk('user/Allusers', async (_,{rejectWithValue})=>{
  try {
      const {data} = await axios.get('http://localhost:5000/api/users/')
      return data
  } catch (error) {
     return rejectWithValue(error.response.data.message? error.response.data.message : error.response.data.errors )
  }

})







const initialState = {
  currentUser: localStorage.getItem('ytc-user') ? JSON.parse(localStorage.getItem('ytc-user')) : {},

  isLoading: false,
  isAuth: Boolean(localStorage.getItem('isAuth')),
  token: localStorage.getItem('ytc-access-token') ? localStorage.getItem('ytc-access-token') : {},
  user: localStorage.getItem('ytc-user') ? JSON.parse(localStorage.getItem('ytc-user')) : {},
  registerErrors: null,
  loginErrors: null,
  msg: null,
  users: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser={};
      state.user={}
      state.isAuth = false;
      state.token = null;
      localStorage.clear();

    },
    clearErrors: (state) => {
      state.loginErrors = null;
      state.registerErrors = null;
    },


    


  },
  extraReducers: (builder) => {
    builder
      .addCase(signingUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signingUp.fulfilled, (state, { type, payload }) => {
        state.isLoading = false;
        state.msg = payload.msg;
        state.user = payload;
      })
      .addCase(signingUp.rejected, (state, { type, payload }) => {
        state.registerErrors = payload;
      })
      .addCase(signingIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signingIn.fulfilled, (state, { type, payload }) => {
        state.isLoading = false;
        state.currentUser = payload.isfound;
        state.isAuth = true;
        state.user = payload.isfound
        state.token= payload.token
        localStorage.setItem('token', payload.token )
        localStorage.setItem('user', JSON.stringify(payload.isfound) )
        localStorage.setItem('currentUser', JSON.stringify(payload.isfound) )

        localStorage.setItem('isAuth', true)

      })
      .addCase(signingIn.rejected, (state, { type, payload }) => {
        state.loginErrors = payload;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, { type, payload }) => {
        state.isLoading = false;
        state.user = payload.isfound;
        state.token = payload.token;
        state.currentUser=payload.isfound;
        state.isAuth = true;
        localStorage.setItem('isAuth', true);
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload.isfound));
        localStorage.setItem('currentUser', JSON.stringify(payload.isfound) )


      })
      .addCase(signInWithGoogle.rejected, (state, { type, payload }) => {
        state.loginErrors = payload;
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.user = action.payload;
        state.currentUser=action.payload
      })
      .addCase(Allusers.fulfilled, (state, action) => {
        state.users = action.payload;

      })

      
  }
});

export const { logout, clearErrors } = userSlice.actions;

export default userSlice.reducer;