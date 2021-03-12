import React, { Component , useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { listUsersByID , notificationremover , userDetails , accept , reject} from '../actions/userActions';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Tada from 'react-reveal/Tada';
import Fade from 'react-reveal/Fade'


class matchScreen extends Component {
 


        constructor(){
                super()
                this.state = {
                        decidedFor : []
                }
        }

 
        componentDidMount(){
                this.props.listUsersByID()
                this.props.notificationremover()


        }


        acceptHandler =(a) => {

                var joined = this.state.decidedFor.concat(a)
                this.setState({ decidedFor : joined })



                this.props.accept(a)
        }
        rejectHandler =(a) => {

                var joined = this.state.decidedFor.concat(a)
                this.setState({ decidedFor : joined })

                this.props.reject(a)
        }
        
        
        render() {
                if (!this.props.userInfo) { this.props.history.push('/') }

                const {users , userInfo} = this.props
                return (
                        <div>
                        
                          
                          <Container>
                        <Col>
                        {!users ? (<div className='row center upgap' > <div className='cm-spinner' ></div> </div>) : <div>
                        
                        {users.length !== 0 ? 
                        <div className='text-center' >
                        <Tada>
                        <h1><b>You Got New Hearts !</b></h1>
                        </Tada>
                        </div> :
                        <div className='text-center'><h1><b>No new Hearts (yet) </b></h1></div>        
                        }

                        {users.filter(x =>  (this.state.decidedFor.indexOf(x._id) === -1)   ).map((x) => (
                        
                        <div key={x._id}  className="form" >
                                
                                
                                <div >
                                
                                <h1><Link to={`/families/${x._id}`} >{x.parent1.name}'s Family </Link> gave Your Family a Heart !</h1>
                                

                                </div>
                                
                                

                                <Container className="text-center" >
                                <Row >
                                
                                <Col></Col>
                                <Col></Col>
                                <Col sm>
                                <Button variant="success" size='lg' onClick={()=>this.acceptHandler(x._id)}> <h3>Accept  <CheckIcon/> </h3> </Button>{' '}
                                </Col>
                                <Col sm>
                                <Button variant="danger" size='lg' onClick={()=>this.rejectHandler(x._id)} > <h3>Reject <CloseIcon/> </h3> </Button>{' '}
                                </Col>
                                </Row>
                                </Container>
                                          
                                
                                
                        </div>
                        
                        
                        
                        ))}
                        </div> }
                        </Col>

                </Container>
                        
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
                listUsersByID , notificationremover , userDetails , accept , reject
        } 
      
)(matchScreen);




