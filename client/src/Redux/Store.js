import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Videoreducer from './VideoSlice';
import userreducer from './userSlice';
import Commentreducer from './CommentSlice';

const rootReducer = combineReducers({
  Videoreducer,
  userreducer,
  Commentreducer,
});
const persistConfig = {
   key: 'root',
   storage, // Use the storage mechanism you want
   // You can also configure blacklist or whitelist here
 };
 
 const persistedReducer = persistReducer(persistConfig, rootReducer);
 
 export const Store = configureStore({
   reducer: persistedReducer, // Use the persisted reducer
 });
 
 export const Persistor = persistStore(Store);