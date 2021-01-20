import React, { Component } from 'react'
import { connect } from "react-redux";
import FireGram from '../components/FireGram'
import {  listUsers , like , userDetails} from '../actions/userActions';
import Fade from 'react-reveal/Fade'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';


class familyDetails extends Component {



        componentDidMount(){
                this.props.userDetails(this.props.match.params.id)

        }


        likeHandler = (x) =>{
                this.props.like(this.props.userInfo._id , x)
        }




        render() {

                const {user , userInfo , likeSuccess , } = this.props


                return (
                        <div>
                                {!user ? <div>Loading...</div> :
                                <div>
                                <div>
                          <h1>this is profile screen</h1>
                          <button onClick={()=>{console.log(user)}} ></button>
                          <div className="row center">
                        {!user && (<div>loading...</div>) } <div>

                                
                        { user && user.parent1 &&                       
                        <div className="card" style={{background:"lightGrey" , minWidth:300 }} >
                                
                                <div className="card-body">
                                <h2>{user.parent1.name}</h2>
                                <h2>{user.parent1.age}</h2>
                                <h2>{user.parent1.gender}</h2>
                                <h2>{user.parent1.ethnicity}</h2>
                                <h2>{user.parent1.interests}</h2>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div>}


                        {user && (user.parent2.name !== '') && 
                        <div className="card" style={{background:"lightGrey" , minWidth:300 }} >
                                
                                <div className="card-body">
                                <h2>{user.parent2.name}</h2>
                                <h2>{user.parent2.age}</h2>
                                <h2>{user.parent2.gender}</h2>
                                <h2>{user.parent2.ethnicity}</h2>
                                <h2>{user.parent2.interests}</h2>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div>}

                        {user && user.descriptions && 
                        <div className="card" style={{background:"lightGrey" , minWidth:300 }} >
                                
                        <div className="card-body">
                        <h2>{user.descriptions}</h2>

                        <div>

                        </div>
                        
                        
                        </div>
                </div>
                         }
                                
                       
                        </div> 



                </div>


                <div>           
                                <h1  style={{textAlign:'center' , marginTop:'100px' }} >Give this Family a Like !</h1>        

                                {userInfo && 
                                <p style={{textAlign:'center'}} onClick ={() => this.likeHandler( user._id) } className="primary" >
                                        {
                                        ((user.othersLiked.indexOf(userInfo._id) !== -1) ||  (likeSuccess && (likeSuccess === user._id)) )
                                         ? <>
                                         <IconButton edge={false} >
                                        <FavoriteIcon  style={{color : "red" , fontSize : '150px'}} />
                                        </IconButton>
                                         </> :
                                         <>
                                         <IconButton edge={false} >
                                        <FavoriteBorderIcon  style={{color : "red" , fontSize : '150px'}} />
                                        </IconButton>
                                         </>  }
                                </p>
                                
                                }
                                

                                </div>
                        


                        {user.image1 && <div className="card" >
                        <Carousel style={{minHeight:'650px'}} >
                        {user.image1 && <Carousel.Item>
                        <img src={user.image1}style={{  minHeight:'650px'  , maxHeight:'95vh'}} className="d-block  w-100" alt=' img 1'  ></img> 
                        </Carousel.Item>}
                        {user.image2 && <Carousel.Item>
                        <img src={user.image2}style={{  minHeight:'650px'  , maxHeight:'95vh'}} className="d-block w-100 " alt=' img 2' ></img> 
                        </Carousel.Item>}
                        {user.image3 && <Carousel.Item>
                        <img src={user.image3}style={{  minHeight:'650px'  , maxHeight:'95vh'}} className="d-block  w-100" alt=' img 3'  ></img> 
                        </Carousel.Item>}
                        {user.image4 && <Carousel.Item>
                        <img src={user.image4}style={{  minHeight:'650px'  , maxHeight:'95vh'}} className="d-block w-100" alt=' img 4'  ></img> 
                        </Carousel.Item>}
                        {user.image5 && <Carousel.Item>
                        <img src={user.image5}style={{  minHeight:'650px'  , maxHeight:'95vh'}} className="d-block  w-100" alt=' img 5'  ></img> 
                        </Carousel.Item>}
                        {user.image6 && <Carousel.Item>
                        <img src={user.image6} style={{  minHeight:'650px'  , maxHeight:'95vh'}} className="d-block w-100 " alt=' img 6'  ></img> 
                        </Carousel.Item>}
                        </Carousel>
                        </div> }

        
        </div>
                                </div>
                                }
                        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                user : state.getDetails.user,


                likeLoading : state.like.loading , 
                likeLoadingID : state.like.id , 
                likeSuccess : state.like.success , 
                likeError : state.like.error , 

        }),
        {
                listUsers , like , userDetails,
          
        } 
      
)(familyDetails);
