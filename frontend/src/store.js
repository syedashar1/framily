import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {  userRegisterReducer, userSigninReducer , getDetailsReducer , userUpdateProfileReducer, userListReducer, userUpdateReducer, likeReducer, listUsersByIDReducer, notificationRemoverReducer, LimitCheckReducer, acceptReducer, rejectReducer, ListOthersLikeReducer, ListForChatReducer } from './reducers/userReducers';



const initialState = {};


const reducer = combineReducers({

  userSignin : userSigninReducer ,
  userRegister : userRegisterReducer ,
  getDetails : getDetailsReducer , 
  userUpdateProfile : userUpdateProfileReducer,
  userList : userListReducer ,
  userUpdate: userUpdateReducer,
  like : likeReducer ,
  listUsersByID : listUsersByIDReducer ,
  notificationRemover : notificationRemoverReducer ,
  LimitCheck : LimitCheckReducer ,
  
  accept : acceptReducer ,
  reject : rejectReducer , 
  ListOthersLike : ListOthersLikeReducer , 
  ListForChat : ListForChatReducer ,
  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;