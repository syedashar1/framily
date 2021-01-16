import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import './Home.css';
import introVideo from '../videos/framily.mp4';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";






class Home extends Component {
        render() {

 
        if (this.props.userInfo) {
                
                this.props.history.push('/explore');
        }



                return (
                        <div  >
                             <div className="home__container">
      {/* Uncomment for animation */}
      {/* <video playsInline autoPlay muted loop id="bgvid1">
        <source src={introVideo} type="video/mp4" />
      </video> */}
      <video playsInline autoPlay muted loop id="bgvid2">
        <source src={introVideo} type="video/mp4" />
      </video>
      
    </div>   
    <div className="home__buttons__container" id="buttons__cont">
        <Link to="/register">
          <Button
            size="large"
            className="header__button"
            variant="outlined"
            color="primary"
          >
            Join Now
          </Button>
        </Link>
        <Link to="/">
          <Button
            size="large"
            className="header__button"
            variant="outlined"
            color="secondary"
          >
            Learn More
          </Button>
        </Link>
      </div>
                        </div>
                )
        }
}




export default connect(
        
        (state) => ({ 

                userInfo : state.userSignin.userInfo ,


        }),
        {
        } 
      
)(Home);
