import React, { Component } from 'react'
import { connect } from "react-redux";
import FireGram from '../components/FireGram'
import {userDetails , updateUserProfile , updateUserProfileReset } from "../actions/userActions"
import Fade from 'react-reveal/Fade'
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
                          <h1>this is profile screen</h1>
                          {/* <button onClick={()=>{console.log(user)}} ></button> */}
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
                <FireGram></FireGram>

        
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