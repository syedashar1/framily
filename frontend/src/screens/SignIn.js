import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { signin , signout } from '../actions/userActions' ;
 
class SignIn extends Component {

        constructor(){
                super();
                this.state = {
                        email : "" , 
                        password : "" ,
                }
        }





         submitHandler  = async (e)  => {
                e.preventDefault()
                console.log(this.state);
                
                this.props.signin(this.state.email , this.state.password)

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

                <button onClick={()=>{console.log(this.props.signinError)} }>click</button>

                <form className="form" onSubmit={this.submitHandler}>
                <div>
                        <h1>Sign In</h1>
                </div>
                <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" placeholder="Enter email" required onChange={(e) => this.setState({ email : e.target.value})}></input>
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" required onChange={(e) => this.setState({ password : e.target.value})}></input>
                { this.props.signinError && (<>incorrect email or password</>)}
                </div>
                <div>
                <label />
                        <button className="primary" type="submit"> Sign In </button>
                        
                </div>
                <div>
                        <label />
                        <div>New customer?{' '}
                                <Link to={`/register?redirect=${redirect}`}>
                                Create your account
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
                signinError : state.userSignin.error
        
        
        }),
        {
                signin , signout
        }

)(SignIn);

