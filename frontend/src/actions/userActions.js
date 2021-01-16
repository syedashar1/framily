import Axios from 'axios';

import {  USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT,  USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS} from "../types/familyTypes";

import { USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAIL, LIST_USERS_BY_ID_REQUEST, LIST_USERS_BY_ID_SUCCUESS, LIST_USERS_BY_ID_FAIL, LIKE_RESET , REMOVER_FAIL , REMOVER_SUCCESS , REMOVER_REQUEST, REMOVER_RESET } from "../types/familyTypes";

export const signin = (email, password) => async (dispatch) => {

  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        } 

  catch (error) {
        dispatch({
                type: USER_SIGNIN_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });

  }


};


export const listUsersByID = (list) => async (dispatch, getState) => {

  console.log('getting the matched list');
  
    dispatch({ type: LIST_USERS_BY_ID_REQUEST });
    
    const userInfo = getState().userSignin.userInfo
  
    try {
      
      const { data } = await Axios.post(`/api/users/listofusersMatched/${userInfo._id}` , {list} );
      
      dispatch({ type: LIST_USERS_BY_ID_SUCCUESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LIST_USERS_BY_ID_FAIL, payload: message });
    }
  };
  



export const register = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { } });
  console.log(user);
  try {
    const { data } = await Axios.post('/api/users/register', user );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {

    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message,);

    
  }
};


export const userDetails = (_id) => async (dispatch , getState) => {

      

      dispatch({ type: USER_DETAILS_REQUEST });
      dispatch({ type: REMOVER_RESET });

      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch({ type: USER_UPDATE_RESET });
      const userInfo = getState().userSignin.userInfo

      try {

        if (_id) {

          console.log(_id);
          const { data } = await Axios.post('/api/users/profileAdmin', {_id} , {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
          dispatch({ type: USER_DETAILS_SUCCESS , payload: data });
          
        }

        else{
            const { data } = await Axios.get(`/api/users/${userInfo._id}`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              
            },
          });
            dispatch({ type: USER_DETAILS_SUCCESS , payload: data });
            console.log('id is not present');

        }




    
      } 
      
      catch (error) {

          const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};





export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  dispatch({ type: LIKE_RESET });
  dispatch({ type: REMOVER_RESET });
  
  const userInfo = getState().userSignin.userInfo

  try {
    
    const { data } = await Axios.get('/api/users');
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};



export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    



    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }

};



export const updateUserProfileReset = () => (dispatch) => {
  dispatch({ type : USER_UPDATE_PROFILE_RESET })
}



export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
};


export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  dispatch({ type: USER_DELETE_RESET });
  const userInfo = getState().userSignin.userInfo
  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload : {userId , data } });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};


//for admin
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};



export const like = ( liker , family ) => async (dispatch) => {

  dispatch({ type: LIKE_REQUEST , payload : family });


  try {
    const { data } = await Axios.put('/api/users/liked' , { liker , family });
    dispatch({ type: LIKE_SUCCESS, payload: family });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: LIKE_FAIL, payload: message });
  }
};


export const notificationremover = () => async (dispatch , getState) => {
  
  const userInfo = getState().userSignin.userInfo

  dispatch({ type: REMOVER_REQUEST });


  try {
    const { data } = await Axios.put(`/api/users/notificationremover/${userInfo._id}`);
    dispatch({ type: REMOVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: REMOVER_FAIL, payload: message });
  }
};