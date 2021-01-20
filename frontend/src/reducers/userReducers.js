import { ACCEPT_FAIL, ACCEPT_REQUEST, ACCEPT_SUCCESS, LIKE_FAIL, LIKE_REQUEST, LIKE_RESET, LIKE_SUCCESS, LIST_FORCHAT_FAIL, LIST_FORCHAT_REQUEST, LIST_FORCHAT_SUCCESS, LIST_OTHERSLIKE_FAIL, LIST_OTHERSLIKE_REQUEST, LIST_OTHERSLIKE_SUCCESS, LIST_USERS_BY_ID_FAIL, LIST_USERS_BY_ID_REQUEST, LIST_USERS_BY_ID_SUCCUESS, MAX_LIMIT_NOT_REACHED, MAX_LIMIT_REACHED, REJECT_FAIL, REJECT_REQUEST, REJECT_SUCCESS, REMOVER_FAIL, REMOVER_REQUEST, REMOVER_RESET, REMOVER_SUCCESS } from "../types/familyTypes";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT 
        , USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET,} from "../types/familyTypes";

      
export const userSigninReducer = (
        
        state = { userInfo : localStorage.getItem('userInfo') ? 
                JSON.parse(localStorage.getItem('userInfo'))
                : null }

                , action ) => 
        
        {switch (action.type) {

                case USER_SIGNIN_REQUEST:
                        return { loading: true };

                case USER_SIGNIN_SUCCESS:
                        console.log('signing');
                        return { loading: false, userInfo: action.payload };

                case USER_SIGNIN_FAIL:
                        return { loading: false, error: action.payload };

                case USER_SIGNOUT:
                        return {};

                default:
                return state;
        }
};





export const userRegisterReducer = (state = {}, action) => {
        switch (action.type) {
          case USER_REGISTER_REQUEST:
            return { loading: true };
          case USER_REGISTER_SUCCESS:
            console.log('USER_REGISTER_SUCCESS');
            return { loading: false, userInfo: action.payload };
          case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
};



export const getDetailsReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case USER_DETAILS_REQUEST :
                        return {loading : true}
                
                case USER_DETAILS_SUCCESS :
                        return { loading : false , user : action.payload }
                case USER_DETAILS_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}



export const userUpdateProfileReducer = (state = {}, action) => {

        switch (action.type) {
          case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
            
          case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true };

          case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };

          case USER_UPDATE_PROFILE_RESET:
            return {};

          default:
            return state;
        }
      };



export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//for admin
export const userUpdateReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};




export const likeReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
      return { loading: true , id : action.payload };
    case LIKE_SUCCESS:
      console.log(action.payload);
      return { loading: false, success : action.payload };
    case LIKE_FAIL:
      return { loading: false, error: action.payload };
    case LIKE_RESET : 
      return { }
    default:
      return state;
  }
};





export const listUsersByIDReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LIST_USERS_BY_ID_REQUEST:
      return { loading: true };
    case LIST_USERS_BY_ID_SUCCUESS:
      return { loading: false, users : action.payload };
    case LIST_USERS_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const notificationRemoverReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case REMOVER_REQUEST:
      return { loading: true };
    case REMOVER_SUCCESS:
      return { loading: false, success : action.payload };
    case REMOVER_FAIL:
      return { loading: false, error: action.payload };
    case REMOVER_RESET:
      return { };
    default:
      return state;
  }
};


export const LimitCheckReducer = (state = { limit: false }, action) => {
  switch (action.type) {
    
    case MAX_LIMIT_REACHED:
      return { limit : true };
    case MAX_LIMIT_NOT_REACHED:
      console.log('limit not reached yet');
      return { limit: false };
    
    default:
      return state;
  }
};


export const acceptReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ACCEPT_REQUEST:
      return { loading: true };
    case ACCEPT_SUCCESS:
      return { loading: false, success : action.payload };
    case ACCEPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rejectReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case REJECT_REQUEST:
      return { loading: true };
    case REJECT_SUCCESS:
      return { loading: false, success : action.payload };
    case REJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ListOthersLikeReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LIST_OTHERSLIKE_REQUEST:
      return { loading: true };
    case LIST_OTHERSLIKE_SUCCESS:
      return { loading: false, users : action.payload };
    case LIST_OTHERSLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const ListForChatReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LIST_FORCHAT_REQUEST:
      return { loading: true };
    case LIST_FORCHAT_SUCCESS:
      console.log(action.payload);
      return { loading: false, users : action.payload };
    case LIST_FORCHAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



