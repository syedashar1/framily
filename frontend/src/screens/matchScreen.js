import React, { Component , useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-bootstrap';
import { listUsersByID , notificationremover , userDetails} from '../actions/userActions';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

class matchScreen extends Component {


        componentDidMount(){
                this.props.listUsersByID()
                this.props.notificationremover()


        }
        
        render() {
                if (!this.props.userInfo) { this.props.history.push('/') }

                const {users , userInfo} = this.props
                return (
                        <div>
                          <h1><b>ITS A MATCH !</b></h1>
                          <h1>These Families also LOVE you... !</h1>
                          <div className="row center">
                        {!users ? (<div>loading...</div>) : <div>

                                {users.map((x) => (
                        <div key={x._id} className="card" style={{background:"lightGrey" , minWidth:300 , maxWidth:'600px' }} >
                                
                                <div className="card-body">
                                <div className='row' >
                                <h1>Parent 1</h1>
                                <h3>{x.parent1.name}</h3>
                                <h3>{x.parent1.age}</h3>
                                <h3>{x.parent1.gender}</h3>
                                <h3>{x.parent1.ethnicity}</h3>
                                <h3>{x.parent1.interests}</h3>

                                </div>
                                
                                {x.parent2 && x.parent2.name && <div className='row' >
                                <h1>Parent 2</h1>
                                <h3>{x.parent2.name}</h3>
                                <h3>{x.parent2.age}</h3>
                                <h3>{x.parent2.gender}</h3>
                                <h3>{x.parent2.ethnicity}</h3>
                                <h3>{x.parent2.interests}</h3>
                                </div>
                                }

                                {x.descriptions && <div className='row' >
                                <h1>{x.descriptions}</h1>
                                </div>
                                }

                                
                        {x.image1 && <div style={{height: '50%' , textAlign:'center'}}>
                        <Carousel >
                        {x.image1 && <Carousel.Item>
                        <img src={x.image1} className="d-block  w-100" alt=' img 1'  ></img> 
                        </Carousel.Item>}
                        {x.image2 && <Carousel.Item>
                        <img src={x.image2} className="d-block w-100 " alt=' img 2' ></img> 
                        </Carousel.Item>}
                        {x.image3 && <Carousel.Item>
                        <img src={x.image3} className="d-block  w-100" alt=' img 3'  ></img> 
                        </Carousel.Item>}
                        {x.image4 && <Carousel.Item>
                        <img src={x.image4} className="d-block w-100" alt=' img 4'  ></img> 
                        </Carousel.Item>}
                        {x.image5 && <Carousel.Item>
                        <img src={x.image5} className="d-block  w-100" alt=' img 5'  ></img> 
                        </Carousel.Item>}
                        {x.image6 && <Carousel.Item>
                        <img src={x.image6} className="d-block w-100 " alt=' img 6'  ></img> 
                        </Carousel.Item>}
                        </Carousel>
                        </div> }

                                

                                
                                

                                
                                
                                </div>
                        </div>
                        
                        ))}
                        </div> }

                </div>
                        
                        </div>
                )
        }
}



export default connect(
        
        (state) => ({ 
                users : state.listUsersByID.users , 
                loading : state.listUsersByID.loading , 
                error : state.listUsersByID.error , 

                userInfo : state.userSignin.userInfo ,


                removeLoading : state.notificationRemover.loading , 
                removeSuccess : state.notificationRemover.success , 
                removeError : state.notificationRemover.error , 

        
        }),
        {
                listUsersByID , notificationremover , userDetails
        } 
      
)(matchScreen);




