import React, { Component } from 'react'
import { connect } from "react-redux";
import FireGram from '../components/FireGram'
import {userDetails , updateUserProfile , updateUserProfileReset } from "../actions/userActions"
import Fade from 'react-reveal/Fade'
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
import Bounce from 'react-reveal/Bounce';
import RubberBand from 'react-reveal/RubberBand';

class userProfileScreen extends Component {


          constructor(){
                super();
                this.state = {
                        name : "purenullxxx" , 
                        email  : "purenullxxx" ,
                        sellername : "purenullxxx",
                        sellerlogo : "purenullxxx",
                        sellerdescription : "purenullxxx",


                        password : "" ,
                        confirmPassword : "" ,
                        passwordNotMatched : false, 


                }
        }


        componentDidMount(){
                this.props.userDetails()
        }

     
        
        render() {


                const {user} = this.props

return (
        <div>
                          
                          {/* <button onClick={()=>{console.log(user)}} ></button> */}
                          <div className="center">
                        {!user && (
                        <div className='row center upgap' > <div className='cm-spinner' ></div> </div>
                        ) } <div>
                        <div />

                        {user && user.parent1 && 
                        
                        <Bounce left>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.parent1.name}'s Family</p>
                        </Bounce>
                        
                        }

                        <Container style={{textAlign:'center'}} >
                          
                        <Row>
                             
                        { user && user.parent1 &&                       
                        <Col lg='6' >
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
                        </div></Col> } 
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
                {user && <FireGram></FireGram>}

        
        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                user : state.getDetails.user
        }),
        {
                userDetails
          
        } 
      
)(userProfileScreen);