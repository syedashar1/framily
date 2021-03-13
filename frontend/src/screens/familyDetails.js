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
import { Col, Container , Row , Image } from 'react-bootstrap';
import dad1 from '../avatars/dad.png';
import dad2 from '../avatars/dad2.png';
import mom from '../avatars/mom.png';
import boy1 from '../avatars/boy.png';
import boy2 from '../avatars/boy2.png';
import boy3 from '../avatars/boy3.png';
import boy4 from '../avatars/boy4.png';
import girl1 from '../avatars/girl.png';
import girl2 from '../avatars/girl2.png';
import girl3 from '../avatars/girl3.png';
import girl4 from '../avatars/girl4.png';
import colon from '../avatars/colon.png';
import RubberBand from 'react-reveal/RubberBand';
import Bounce from 'react-reveal/Bounce';

class familyDetails extends Component {



        componentDidMount(){
                this.props.userDetails(this.props.match.params.id)

        }


        likeHandler = (x) =>{
                this.props.like(this.props.userInfo._id , x)
        }




        render() {

                const {user , userInfo , likeSuccess , } = this.props
                if (!this.props.userInfo) { this.props.history.push('/') }

                return (
                        <div>
                                {!user ? 
                                <div className='row center upgap' > <div className='cm-spinner' ></div> </div>
                                :
                                <div>
                                <div>
                          
                          <div className=" center">
                        {!user && (<div className='cm-spinner' ></div>) } <div>

                                
                        {user && user.parent1 && 
                        
                        <Bounce left>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.parent1.name}'s Family</p>
                        </Bounce>
                        
                        }

                        <Container style={{textAlign:'center'}} >
                        <Row>
                               
                        { user && user.parent1 &&                       
                        <Col lg={!user.parent2.name ? null : '6' }>
                        <div className="form upgap" >
                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={user.parent1.gender === 'male' || user.parent1.gender === 'Male' || user.parent1.gender === 'MALE' ? dad1 :
                        user.parent1.gender === 'female' || user.parent1.gender === 'Female' || user.parent1.gender === 'FEMALE' ? mom : null } fluid></Image>
                        </RubberBand>
                        </div></div>
                                
                                <div className="card-body" >
                                <h1><b>{user.parent1.name}</b></h1>
                                <h1>{user.parent1.age}</h1>
                                <h1>{user.parent1.gender}</h1>
                                <h1>{user.parent1.ethnicity}</h1>
                                <h1>{user.parent1.interests}</h1>
                                <div>

                                </div>
                                
                                
                                </div>
                                
                        </div> </Col>}
                        

                              
                        {user &&  user.parent2.name && (user.parent2.name !== '') && 
                        <Col lg='6'>  
                        <div className="form upgap" >
                                
                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={user.parent2.gender === 'male' || user.parent2.gender === 'Male' || user.parent2.gender === 'MALE' ? dad2 :
                        user.parent2.gender === 'female' || user.parent2.gender === 'Female' || user.parent2.gender === 'FEMALE' ? mom : null } fluid></Image>
                        </RubberBand>
                        </div></div>
                                
                                <div className="card-body">
                                <h1><b>{user.parent2.name}</b></h1>
                                <h1>{user.parent2.age}</h1>
                                <h1>{user.parent2.gender}</h1>
                                <h1>{user.parent2.ethnicity}</h1>
                                <h1>{user.parent2.interests}</h1>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div></Col>}
                         

                        {user &&  user.child1.name && (user.child1.name !== '') && 
                        <Col md='6'> 
                        <div className="form upgap" >

                                
                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={user.child1.gender === 'male' || user.child1.gender === 'Male' || user.child1.gender === 'MALE' ? boy1 :
                        user.child1.gender === 'female' || user.child1.gender === 'Female' || user.child1.gender === 'FEMALE' ? girl1 : null } fluid></Image>
                        </RubberBand>
                        </div></div>
                                
                                <div className="card-body">
                                <h1><b>{user.child1.name}</b></h1>
                                <h1>{user.child1.age}</h1>
                                <h1>{user.child1.gender}</h1>
                                <h1>{user.child1.ethnicity}</h1>
                                <h1>{user.child1.interests}</h1>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div></Col>}


                        {user &&  user.child2.name && (user.child2.name !== '') && 
                        <Col md='6'> 
                        <div className="form upgap" >
                                

                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={user.child2.gender === 'male' || user.child2.gender === 'Male' || user.child2.gender === 'MALE' ? boy2 :
                        user.child2.gender === 'female' || user.child2.gender === 'Female' || user.child2.gender === 'FEMALE' ? girl2 : null } fluid></Image>
                        </RubberBand></div></div>



                                <div className="card-body">
                                <h1><b>{user.child2.name}</b></h1>
                                <h1>{user.child2.age}</h1>
                                <h1>{user.child2.gender}</h1>
                                <h1>{user.child2.ethnicity}</h1>
                                <h1>{user.child2.interests}</h1>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div></Col>}

                        {user &&  user.child3.name && (user.child3.name !== '') && 
                        <Col md='6'> 
                        <div className="form upgap" >
                                
                        
                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={user.child3.gender === 'male' || user.child3.gender === 'Male' || user.child3.gender === 'MALE' ? boy3 :
                        user.child3.gender === 'female' || user.child3.gender === 'Female' || user.child3.gender === 'FEMALE' ? girl3 : null } fluid></Image>
                        </RubberBand>
                        </div></div>


                        
                                <div className="card-body">
                                <h1><b>{user.child3.name}</b></h1>
                                <h1>{user.child3.age}</h1>
                                <h1>{user.child3.gender}</h1>
                                <h1>{user.child3.ethnicity}</h1>
                                <h1>{user.child3.interests}</h1>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div></Col>}



                        {user &&  user.child4.name && (user.child4.name !== '') && 
                        <Col md='6'> 
                        <div className="form upgap" >

                        
                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={user.child4.gender === 'male' || user.child4.gender === 'Male' || user.child4.gender === 'MALE' ? boy4 :
                        user.child4.gender === 'female' || user.child4.gender === 'Female' || user.child4.gender === 'FEMALE' ? girl4 : null } fluid></Image>
                        
                        </RubberBand>
                        </div></div>
                                
                                <div className="card-body">
                                <h1><b>{user.child4.name}</b></h1>
                                <h1>{user.child4.age}</h1>
                                <h1>{user.child4.gender}</h1>
                                <h1>{user.child4.ethnicity}</h1>
                                <h1>{user.child4.interests}</h1>
                                <div>

                                </div>
                                
                                
                                </div>
                        </div></Col>}
                        </Row>
                        </Container>


                        {user && user.descriptions && 
                        <div className="form upgap" >
                        <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={colon}
                        fluid></Image>
                        
                        </RubberBand>
                        </div></div>
                        <div className="card-body text-center">
                        <h1><i>{user.descriptions}</i></h1>

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
                                         
                                        <Bounce>
                                        <FavoriteIcon style={{color : "red" , fontSize : '150px'}} />
                                        </Bounce>
                                                
                                         </> :
                                         <>
                                         
                                        <FavoriteBorderIcon className='uibutton' style={{color : "red" , fontSize : '150px'}} />
                                        
                                         </>  }
                                </p>
                                
                                }
                                

                                </div>
                        


                        <Fade>
                        {user.image1 && <div className="card" >
                        <Carousel style={{minHeight:'650px'}} >
                        {user.image1 && <Carousel.Item>
                        <img src={user.image1}style={{  minHeight:'650px'  , maxHeight:'90vh'}} className="d-block  w-100" alt=' img 1'  ></img> 
                        </Carousel.Item>}
                        {user.image2 && <Carousel.Item>
                        <img src={user.image2}style={{  minHeight:'650px'  , maxHeight:'90vh'}} className="d-block w-100 " alt=' img 2' ></img> 
                        </Carousel.Item>}
                        {user.image3 && <Carousel.Item>
                        <img src={user.image3}style={{  minHeight:'650px'  , maxHeight:'90vh'}} className="d-block  w-100" alt=' img 3'  ></img> 
                        </Carousel.Item>}
                        {user.image4 && <Carousel.Item>
                        <img src={user.image4}style={{  minHeight:'650px'  , maxHeight:'90vh'}} className="d-block w-100" alt=' img 4'  ></img> 
                        </Carousel.Item>}
                        {user.image5 && <Carousel.Item>
                        <img src={user.image5}style={{  minHeight:'650px'  , maxHeight:'90vh'}} className="d-block  w-100" alt=' img 5'  ></img> 
                        </Carousel.Item>}
                        {user.image6 && <Carousel.Item>
                        <img src={user.image6} style={{  minHeight:'650px'  , maxHeight:'90vh'}} className="d-block w-100 " alt=' img 6'  ></img> 
                        </Carousel.Item>}
                        </Carousel>
                        </div> }
                        </Fade>

        
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
