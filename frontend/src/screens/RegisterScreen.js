import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signin , signout , register } from '../actions/userActions' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container , Row , Col } from 'react-bootstrap';
import "./input.css"
import RubberBand from 'react-reveal/RubberBand';
import { Image } from 'react-bootstrap';
import pen from '../avatars/pen.png';
class RegisterScreen extends Component {

        constructor(){
                super();
                this.state = {
                        email : "" , 
                        password : "" ,
                        confirmPassword : "" ,

                        latitude : null , 
                        longitude : null , 

                        P1name :"",
                        P1age  : 0 ,
                        P1interest :"",
                        P1ethinicity :"",
                        P1gender:"",


                        P2name :"",
                        P2age  : 0 ,
                        P2interest :"",
                        P2ethinicity :"",
                        P2gender:"",


                        C1name :"",
                        C1age  : 0 ,
                        C1interest :"",
                        C1ethinicity :"",
                        C1gender:"",

                        C2name :"",
                        C2age  : 0 ,
                        C2interest :"",
                        C2ethinicity :"",
                        C2gender:"",

                        C3name :"",
                        C3age  : 0 ,
                        C3interest :"",
                        C3ethinicity :"",
                        C3gender:"",

                        C4name :"",
                        C4age  : 0 ,
                        C4interest :"",
                        C4ethinicity :"",
                        C4gender:"",



                        familyDescription : null , 

                        passwordNotMatched : false
                }





                this.getLocation = this.getLocation.bind(this)
                this.getCoordinates = this.getCoordinates.bind(this)



        }




        

        componentDidMount(){
                

                this.getLocation()


        }





        getLocation(){
                if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(this.getCoordinates , this.showError)
                }
                else {
                        alert('Geolocation is not supported by the browser')
                }
        }

        getCoordinates(position){
                this.setState({
                        latitude : position.coords.latitude , 
                        longitude : position.coords.longitude
                })
        }
        showError(error) {
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.")
                    break;
                  case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.")
                    break;
                  case error.TIMEOUT:
                        alert("The request to get user location timed out.")
                    break;
                  default:
                        alert("An unknown error occurred.")
                    
                }
        }





         submitHandler  = async (e)  => {
                e.preventDefault()



                if( this.state.password !== this.state.confirmPassword ){
                        this.setState({ passwordNotMatched : true })
                        return
                }

                if(this.state.longitude === null){
                        alert('you need to provide your current location to register an account')
                        return
                }

                

                else {
                        this.setState({ passwordNotMatched : false })

                        const user = {
                                email : this.state.email,
                                password : this.state.password,


                                parent1:{
                                        name:this.state.P1name,
                                        age : this.state.P1age,
                                        ethnicity : this.state.P1ethinicity,
                                        gender : this.state.P1gender,
                                        interests : this.state.P1interest,
                                },
                                parent2:{
                                        name:this.state.P2name,
                                        age : this.state.P2age,
                                        ethnicity : this.state.P2ethinicity,
                                        gender : this.state.P2gender,
                                        interests : this.state.P2interest,
                                },




                                child1:{
                                        name  :this.state.C1name ,
                                        age  : this.state.C1age ,
                                        interests  : this.state.C1interest ,
                                        ethnicity : this.state.C1ethinicity  ,
                                        gender : this.state.C1gender 
                                },

                                child2:{
                                        name  :this.state.C2name ,
                                        age  : this.state.C2age ,
                                        interests  : this.state.C2interest ,
                                        ethnicity : this.state.C2ethinicity  ,
                                        gender : this.state.C2gender 
                                },

                                child3:{
                                        name  :this.state.C3name ,
                                        age  : this.state.C3age ,
                                        interests  : this.state.C3interest ,
                                        ethnicity : this.state.C3ethinicity  ,
                                        gender : this.state.C3gender 
                                },

                                child4:{
                                        name  :this.state.C4name ,
                                        age  : this.state.C4age ,
                                        interests  : this.state.C4interest ,
                                        ethnicity : this.state.C4ethinicity  ,
                                        gender : this.state.C4gender 
                                },



                                location : {
                                        latitude : this.state.latitude , 
                                        longitude : this.state.longitude
                                        
                                } ,


                                descriptions : this.state.familyDescription
                        }
                
                console.log(user);
                this.props.register( user )

                }


        }

render() {

        const redirect = this.props.location.search
        ? this.props.location.search.split('=')[1]
        : '/';
        if (this.props.userInfo) {
                
                this.props.history.push(redirect);
        }


        return (
        <div>


                <form className="form upgap" onSubmit={this.submitHandler}>

                <div><div className='backtotop'>
                        <RubberBand>
                        <Image 
                        src={pen} fluid></Image>
                        
                        </RubberBand>
                        </div></div>


                <div className='text-center'>
                        <h1>Register a New Family</h1>
                        
                </div>
                
                <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" placeholder="Enter email" required onChange={(e) => this.setState({ email : e.target.value})}></input>
                </div>
                <div>
                {this.props.registerError && (<> {this.props.registerError } </>)}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" required onChange={(e) => this.setState({ password : e.target.value})}></input>
                </div>
                <div>
                <label htmlFor="confirmPassword">confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm password" required onChange={(e) => this.setState({ confirmPassword : e.target.value})}></input>
                { this.state.passwordNotMatched && ( <div style={{color:'red'}} >password did not match</div> )

                }
                </div>
                
                <div style={{height:"100px"}}/>

                <Container>
                <Row>

                

                

                <Col className="text-center lineright" sm={6} >
                        <h1>Parent 1</h1>
                
                <div >
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name" required onChange={(e) => this.setState({ P1name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ P1age : e.target.value})}></input>
                </div>
                <div>
                <p>Gender</p>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ P1gender : e.target.value})}></input>
                </div>
                <div>
                <p >Ethnicity</p>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ P1ethinicity : e.target.value})}></input>
                </div>
                <div>
                <p >Interest</p>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ P1interest : e.target.value})}></input>
                </div>


                </Col>


                <Col className="text-center"  sm={6}>
                        <h1>Parent 2</h1>
                
                <div>
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name"  onChange={(e) => this.setState({ P2name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ P2age : e.target.value})}></input>
                </div>
                <div>
                <p>Gender</p>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ P2gender : e.target.value})}></input>
                </div>
                <div>
                <p >Ethnicity</p>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ P2ethinicity : e.target.value})}></input>
                </div>
                <div>
                <p >Interest</p>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ P2interest : e.target.value})}></input>
                </div>


                </Col>

                </Row>
                </Container>

                <div style={{height:"100px"}}/>

                <Container >
               <Row>
               <Col className="text-center lineright"  sm={6}>
                        <h1>Child 1</h1>
                
                <div>
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name"  onChange={(e) => this.setState({ C1name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ C1age : e.target.value})}></input>
                </div>
                <div>
                <p>Gender</p>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ C1gender : e.target.value})}></input>
                </div>
                <div>
                <p >Ethnicity</p>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ C1ethinicity : e.target.value})}></input>
                </div>
                <div>
                <p >Interest</p>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ C1interest : e.target.value})}></input>
                </div>


                </Col>




                <Col className="text-center" sm={6}>
                        <h1>Child 2</h1>
                
                <div>
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name"  onChange={(e) => this.setState({ C2name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ C2age : e.target.value})}></input>
                </div>
                <div>
                <p>Gender</p>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ C2gender : e.target.value})}></input>
                </div>
                <div>
                <p >Ethnicity</p>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ C2ethinicity : e.target.value})}></input>
                </div>
                <div>
                <p >Interest</p>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ C2interest : e.target.value})}></input>
                </div>


                </Col>
               </Row>
               </Container>


               <div style={{height:"80px"}}/>


               <Container>
               <Row>
               <Col className="text-center lineright" sm={6}>
                        <h1>Child 3</h1>
                
                <div>
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name"  onChange={(e) => this.setState({ C3name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ C3age : e.target.value})}></input>
                </div>
                <div>
                <p>Gender</p>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ C3gender : e.target.value})}></input>
                </div>
                <div>
                <p >Ethnicity</p>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ C3ethinicity : e.target.value})}></input>
                </div>
                <div>
                <p >Interest</p>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ C3interest : e.target.value})}></input>
                </div>


                </Col>




                <Col className="text-center" sm={6}>
                        <h1>Child 4</h1>
                
                <div>
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name"  onChange={(e) => this.setState({ C4name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ C4age : e.target.value})}></input>
                </div>
                <div>
                <p>Gender</p>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ C4gender : e.target.value})}></input>
                </div>
                <div>
                <p >Ethnicity</p>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ C4ethinicity : e.target.value})}></input>
                </div>
                <div>
                <p >Interest</p>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ C4interest : e.target.value})}></input>
                </div>


                </Col>
               </Row>
               </Container>


               <div style={{height:"80px"}}/>


               
                <div className="text-center">
                <h1>Family Description</h1>
                <div>
              <textarea id="description" rows="5" cols="70" type="text"
                placeholder="Enter family description" onChange={(e) => this.setState({ familyDescription : e.target.value})}
              ></textarea>
            </div>
                </div>








                

                <label />
                
                <div  className='row center'>
                        <button style={{ fontSize:'25px' ,width:'180px' , borderRadius:'20px' ,backgroundColor:'#287094' , color:'white'}} type="submit"> Sign Up </button>

                </div>
                        
                
                

                <div>
                        <label />
                        <div>Already have an account ?{' '}
                                <Link to={`/signin`}>
                                Sign In
                                </Link>     
                        </div>
                </div>
                        </form>


                


    </div>
                )
        }
}



export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                registerError : state.userRegister.error
        
        
        }),
        {
                signin , signout , register
        }

)(RegisterScreen);

