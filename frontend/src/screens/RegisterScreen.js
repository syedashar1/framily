import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signin , signout , register } from '../actions/userActions' ;

class RegisterScreen extends Component {

        constructor(){
                super();
                this.state = {
                        email : "" , 
                        password : "" ,
                        confirmPassword : "" ,

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

                        familyDescription : null , 

                        passwordNotMatched : false
                }
        }




        

        // async componentDidMount(){
                
        //         const redirect = this.props.location.search
        //                 ? this.props.location.search.split('=')[1]
        //                 : '/';
                

        //                 if ( await this.props.userInfo) {
        //                         this.props.history.push(redirect);
        //                 }



        // }





         submitHandler  = async (e)  => {
                e.preventDefault()

                if( this.state.password !== this.state.confirmPassword ){
                        this.setState({ passwordNotMatched : true })
                }
                else {

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


                <form className="form" onSubmit={this.submitHandler}>
                <div>
                        <h1>Register a New User</h1>
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
                </div>
                <div>

                { this.state.passwordNotMatched && ( <div>password did not match</div> )

                }

                <br></br><br></br><br></br><br></br>

                <div>
                        <h1>For Parent 1</h1>
                
                <div>
                <label >Full Name</label>
                <input type="text" id="full name" placeholder="Enter full name" required onChange={(e) => this.setState({ P1name : e.target.value})}></input>
                </div>
                <div>
                <label>Age</label>
                <input type="number" placeholder="Enter Age" required onChange={(e) => this.setState({ P1age : e.target.value})}></input>
                </div>
                <div>
                <label>Gender</label>
                <input type="text" id="gender" placeholder="Gender" required onChange={(e) => this.setState({ P1gender : e.target.value})}></input>
                </div>
                <div>
                <label >Ethnicity</label>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity" required onChange={(e) => this.setState({ P1ethinicity : e.target.value})}></input>
                </div>
                <div>
                <label >Interest</label>
                <input type="text" id="Interest" placeholder="Enter your Interest" required onChange={(e) => this.setState({ P1interest : e.target.value})}></input>
                </div>


                </div>


                <div>
                        <h1>For Parent 2</h1>
                
                <div>
                <label >Full Name</label>
                <input type="text" id="full name" placeholder="Enter full name"  onChange={(e) => this.setState({ P2name : e.target.value})}></input>
                </div>
                <div>
                <label>Age</label>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ P2age : e.target.value})}></input>
                </div>
                <div>
                <label>Gender</label>
                <input type="text" id="gender" placeholder="Gender"  onChange={(e) => this.setState({ P2gender : e.target.value})}></input>
                </div>
                <div>
                <label >Ethnicity</label>
                <input type="text" id="Ethnicity" placeholder="Enter Ethnicity"  onChange={(e) => this.setState({ P2ethinicity : e.target.value})}></input>
                </div>
                <div>
                <label >Interest</label>
                <input type="text" id="Interest" placeholder="Enter your Interest"  onChange={(e) => this.setState({ P2interest : e.target.value})}></input>
                </div>


                </div>

                <div>
                <h1>Family Description</h1>
                <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="5" cols="50" type="text"
                placeholder="Enter family description" onChange={(e) => this.setState({ familyDescription : e.target.value})}
              ></textarea>
            </div>
                </div>








                

                <label />
                        <button className="primary" type="submit"> Sign In </button>
                        
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

