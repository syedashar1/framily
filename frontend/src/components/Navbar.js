import React, { Component } from 'react'
import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout ,userDetails , avaliableForChat } from '../actions/userActions'
import './navbar.css';
import ChatIcon from '@material-ui/icons/Chat';

import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { rgbToHex } from '@material-ui/core';


class Navbar extends Component {


        componentDidMount(){
                this.props.userDetails()
                this.props.avaliableForChat()
        }

        render() {

          
                const { userInfo , signout , user , removeSuccess , forChatUsers } = this.props

                
          
          
          
          return (
                        <div>
    <div className="header">
    <Link style={{color:'#6b6b6b'}}  to="/"><h1 className="header__brand">Framily</h1></Link>
      


       { this.props.userInfo? (
        <div className="header__right">


        
      <IconButton>
      <a style={{color:'#6b6b6b'}}  href="/chat"><ChatIcon fontSize="large" className="heart__icon" />  

                                <span className="badge">{ user && user.conversations ? user.conversations.length : '' }</span>
        </a>
        
      </IconButton>
        
      <IconButton>
      <Link style={{color:'#6b6b6b'}}  to="/matches"><FavoriteIcon fontSize="large" className="heart__icon" />  
                                {user && userInfo && user.newMatches !== 0 && !removeSuccess &&
                                <span className="badge">{user.newLikes}</span>
        }  </Link>
        
      </IconButton>


      <IconButton>




      <div className="dropdown">
        <Link style={{color:'#6b6b6b'}} to="/profile" >
                <PersonIcon fontSize="large" className="account__icon" />
        <i className="fa fa-caret-down"></i>{' '}
        </Link>
                <ul className="dropdown-content">
                        <li> <Link  style={{color:'#6b6b6b'}} to="/update"> Edit Profile </Link> </li>
                        <li> <Link  style={{color:'#6b6b6b'}} to="/likehistory"> like History </Link> </li>
                        <li> <Link  style={{color:'#6b6b6b'}} to="/" onClick={signout} > Sign Out </Link> </li>
                </ul>
        </div>
      </IconButton>



    </div>
       ) : (

        <div className="header__right">
      <Link to="/signin">
        <Button className="header__button" variant="outlined" color="primary">
        Sign In
        </Button>
      </Link>
      <Link to="/register">
        <Button className="header__button" variant="outlined" color="secondary">
        Sign Up
        </Button>
      </Link>
    </div>

       ) }



      
    </div>


                                
                        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
      

                userInfo : state.userSignin.userInfo ,

                user : state.getDetails.user , 

                removeSuccess : state.notificationRemover.success , 

                forChatUsers : state.ListForChat.users , 




        
        
        }),
        {
                
                signout , userDetails , avaliableForChat
        }
      
)(Navbar);

