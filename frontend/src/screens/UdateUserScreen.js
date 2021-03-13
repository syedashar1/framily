import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { updateUserProfile , userDetails} from '../actions/userActions' ;
import { motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';
import DeleteImage from '../components/deleteImageGrid';



class UpdateUserScreen extends Component {



        constructor(){
                super();
                this.state = {
                        email : "purenullxxxxxxx" , 
                        password : "purenullxxxxxxx" ,
                        confirmPassword : "purenullxxxxxxx" ,

                        latitude : null , 
                        longitude : null , 

                        P1name :"purenullxxxxxxx",
                        P1age  : 10000 ,
                        P1interest :"purenullxxxxxxx",
                        P1ethinicity :"purenullxxxxxxx",
                        P1gender:"purenullxxxxxxx",


                        P2name :"purenullxxxxxxx",
                        P2age  : 10000 ,
                        P2interest :"purenullxxxxxxx",
                        P2ethinicity :"purenullxxxxxxx",
                        P2gender:"purenullxxxxxxx",


                        C1name :"purenullxxxxxxx",
                        C1age  : 10000 ,
                        C1interest :"purenullxxxxxxx",
                        C1ethinicity :"purenullxxxxxxx",
                        C1gender:"purenullxxxxxxx",

                        C2name :"purenullxxxxxxx",
                        C2age  : 10000 ,
                        C2interest :"purenullxxxxxxx",
                        C2ethinicity :"purenullxxxxxxx",
                        C2gender:"purenullxxxxxxx",

                        C3name :"purenullxxxxxxx",
                        C3age  : 10000 ,
                        C3interest :"purenullxxxxxxx",
                        C3ethinicity :"purenullxxxxxxx",
                        C3gender:"purenullxxxxxxx",

                        C4name :"purenullxxxxxxx",
                        C4age  : 10000 ,
                        C4interest :"purenullxxxxxxx",
                        C4ethinicity :"purenullxxxxxxx",
                        C4gender:"purenullxxxxxxx",



                        familyDescription : "purenullxxxxxxx" , 

                        passwordNotMatched : false
                }
        }





        componentDidMount(){
                this.props.userDetails();
        }


        handleInput = (e) =>{
  
                this.setState({[e.target.id] : e.target.value })

        }





        submitHandler  = async (e)  => {
                e.preventDefault()

                if( this.state.password !== this.state.confirmPassword ){
                        this.setState({ passwordNotMatched : true })
                }

                else {
                        this.setState({ passwordNotMatched : false })

                        const user = {
                                email : this.state.email === "purenullxxxxxxx" ? null : this.state.email ,
                                password : this.state.password === "purenullxxxxxxx" ? null : this.state.password ,


                                parent1:{
                                        name: this.state.P1name === "purenullxxxxxxx" ? null : this.state.P1name ,
                                        age : this.state.P1age === 10000 ? null : this.state.P1age   ,
                                        ethnicity : this.state.P1ethinicity === "purenullxxxxxxx" ? null : this.state.P1ethinicity ,
                                        gender : this.state.P1gender === "purenullxxxxxxx" ? null : this.state.P1gender ,
                                        interests : this.state.P1interest === "purenullxxxxxxx" ? null : this.state.P1interest ,
                                },
                                parent2:{
                                        name: this.state.P2name === "purenullxxxxxxx" ? null : this.state.P2name ,
                                        age : this.state.P2age === 10000 ? null : this.state.P2age   ,
                                        ethnicity : this.state.P2ethinicity === "purenullxxxxxxx" ? null : this.state.P2ethinicity ,
                                        gender : this.state.P2gender === "purenullxxxxxxx" ? null : this.state.P2gender ,
                                        interests : this.state.P2interest === "purenullxxxxxxx" ? null : this.state.P2interest ,
                                },




                                child1:{
                                        name: this.state.C1name === "purenullxxxxxxx" ? null : this.state.C1name ,
                                        age : this.state.C1age === 10000 ? null : this.state.C1age   ,
                                        ethnicity : this.state.C1ethinicity === "purenullxxxxxxx" ? null : this.state.C1ethinicity ,
                                        gender : this.state.C1gender === "purenullxxxxxxx" ? null : this.state.C1gender ,
                                        interests : this.state.C1interest === "purenullxxxxxxx" ? null : this.state.C1interest ,
                                },

                                child2:{
                                        name: this.state.C2name === "purenullxxxxxxx" ? null : this.state.C2name ,
                                        age : this.state.C2age === 10000 ? null : this.state.C2age   ,
                                        ethnicity : this.state.C2ethinicity === "purenullxxxxxxx" ? null : this.state.C2ethinicity ,
                                        gender : this.state.C2gender === "purenullxxxxxxx" ? null : this.state.C2gender ,
                                        interests : this.state.C2interest === "purenullxxxxxxx" ? null : this.state.C2interest , 
                                },

                                child3:{
                                        name: this.state.C3name === "purenullxxxxxxx" ? null : this.state.C3name ,
                                        age : this.state.C3age === 10000 ? null : this.state.C3age   ,
                                        ethnicity : this.state.C3ethinicity === "purenullxxxxxxx" ? null : this.state.C3ethinicity ,
                                        gender : this.state.C3gender === "purenullxxxxxxx" ? null : this.state.C3gender ,
                                        interests : this.state.C3interest === "purenullxxxxxxx" ? null : this.state.C3interest ,
                                },

                                child4:{
                                        name: this.state.C4name === "purenullxxxxxxx" ? null : this.state.C4name ,
                                        age : this.state.C4age === 10000 ? null : this.state.C4age   ,
                                        ethnicity : this.state.C4ethinicity === "purenullxxxxxxx" ? null : this.state.C4ethinicity ,
                                        gender : this.state.C4gender === "purenullxxxxxxx" ? null : this.state.C4gender ,
                                        interests : this.state.C4interest === "purenullxxxxxxx" ? null : this.state.C4interest ,
                                },


                                descriptions : this.state.familyDescription === "purenullxxxxxxx" ? null : this.state.familyDescription ,
                        }
                
                console.log(user);
                this.props.updateUserProfile( user )

                }


        }





        render() {


                const {user , userInfo} = this.props

                const {
                        P1name , P1age , P1ethinicity , P1gender , P1interest , 
                        P2name , P2age , P2ethinicity , P2gender , P2interest ,
                        C1name , C1age , C1ethinicity , C1gender , C1interest , 
                        C2name , C2age , C2ethinicity , C2gender , C2interest ,
                        C3name , C3age , C3ethinicity , C3gender , C3interest ,
                        C4name , C4age , C4ethinicity , C4gender , C4interest ,
                        familyDescription , email
                } = this.state


                



                if (this.props.success) { this.props.history.push('/profile') }
                if (!this.props.userInfo) { this.props.history.push('/') }

                return (
                        <div>
                        {!user ? <div>Loading...</div> :
                        <div>

                        <button onClick= {()=>console.log(user)}> log </button>
                        <form className="form" onSubmit={this.submitHandler}>
                        <div>
                                <h1>Update your family Profile</h1>
                                
                                
                        </div>
                        
                        <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" placeholder="Enter email"
                        value={email === "purenullxxxxxxx" ? user.email : email } 
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        {this.props.registerError && (<> {this.props.registerError } </>)}
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password"  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label htmlFor="confirmPassword">confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="Confirm password"  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
        
                        { this.state.passwordNotMatched && ( <div style={{color:'red'}} >password did not match</div> )
        
                        }
        
                        <br></br><br></br><br></br><br></br>
        
                        <div>
                                <h1>For Parent 1</h1>
                        
                        <div>
                        <label >Full Name</label>
                        <input type="text" id="P1name" placeholder="Enter full name"
                        value = { P1name === "purenullxxxxxxx" ? user.parent1.name : P1name }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Age</label>
                        <input type="number" placeholder="Enter Age" id="P1age"  
                        value = { P1age === 10000 ? user.parent1.age : P1age }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Gender</label>
                        <input type="text" id="P1gender" placeholder="Gender"  
                        value = { P1gender === "purenullxxxxxxx" ? user.parent1.gender : P1gender }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Ethnicity</label>
                        <input type="text" id="P1ethinicity" placeholder="Enter Ethnicity"  
                        value = { P1ethinicity === "purenullxxxxxxx" ? user.parent1.ethnicity : P1ethinicity }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Interest</label>
                        <input type="text" id="P1interest" placeholder="Enter your Interest"  
                        value = { P1interest === "purenullxxxxxxx" ? user.parent1.interests : P1interest }  
                        onChange={this.handleInput}></input>
                        </div>
        
        
                        </div>
        
        
                        <div>
                                <h1>For Parent 2</h1>
                        
                        <div>
                        <label >Full Name</label>
                        <input type="text" id="P2name" placeholder="Enter full name"
                        value = { P2name === "purenullxxxxxxx" ? user.parent2.name : P2name }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Age</label>
                        <input type="number" placeholder="Enter Age" id="P2age"  
                        value = { P2age === 10000 ? user.parent2.age : P2age }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Gender</label>
                        <input type="text" id="P2gender" placeholder="Gender"  
                        value = { P2gender === "purenullxxxxxxx" ? user.parent2.gender : P2gender }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Ethnicity</label>
                        <input type="text" id="P2ethinicity" placeholder="Enter Ethnicity"  
                        value = { P2ethinicity === "purenullxxxxxxx" ? user.parent2.ethnicity : P2ethinicity }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Interest</label>
                        <input type="text" id="P2interest" placeholder="Enter your Interest"  
                        value = { P2interest === "purenullxxxxxxx" ? user.parent2.interests : P2interest }  
                        onChange={this.handleInput}></input>
                        </div>
        
        
                        </div>
        
        
        
                        <div>
                                <h1>For Child 1</h1>
                        
                        <div>
                        <label >Full Name</label>
                        <input type="text" id="C1name" placeholder="Enter full name"
                        value = { C1name === "purenullxxxxxxx" ? user.child1.name : C1name }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Age</label>
                        <input type="number" placeholder="Enter Age" id="C1age"  
                        value = { C1age === 10000 ? user.child1.age : C1age }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Gender</label>
                        <input type="text" id="C1gender" placeholder="Gender"  
                        value = { C1gender === "purenullxxxxxxx" ? user.child1.gender : C1gender }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Ethnicity</label>
                        <input type="text" id="C1ethinicity" placeholder="Enter Ethnicity"  
                        value = { C1ethinicity === "purenullxxxxxxx" ? user.child1.ethnicity : C1ethinicity }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Interest</label>
                        <input type="text" id="C1interest" placeholder="Enter your Interest"  
                        value = { C1interest === "purenullxxxxxxx" ? user.child1.interests : C1interest }  
                        onChange={this.handleInput}></input>
                        </div>
        
        
                        </div>
        
        
        
        
                        <div>
                                <h1>For Child 2</h1>
                        
                        <div>
                        <label >Full Name</label>
                        <input type="text" id="C2name" placeholder="Enter full name"
                        value = { C2name === "purenullxxxxxxx" ? user.child2.name : C2name }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Age</label>
                        <input type="number" placeholder="Enter Age" id="C2age"  
                        value = { C2age === 10000 ? user.child2.age : C2age }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Gender</label>
                        <input type="text" id="C2gender" placeholder="Gender"  
                        value = { C2gender === "purenullxxxxxxx" ? user.child2.gender : C2gender }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Ethnicity</label>
                        <input type="text" id="C2ethinicity" placeholder="Enter Ethnicity"  
                        value = { C2ethinicity === "purenullxxxxxxx" ? user.child2.ethnicity : C2ethinicity }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Interest</label>
                        <input type="text" id="C2interest" placeholder="Enter your Interest"  
                        value = { C2interest === "purenullxxxxxxx" ? user.child2.interests : C2interest }  
                        onChange={this.handleInput}></input>
                        </div>
        
        
                        </div>
        
        
        
        
                        <div>
                                <h1>For Child 3</h1>
                        
                        <div>
                        <label >Full Name</label>
                        <input type="text" id="C3name" placeholder="Enter full name"
                        value = { C3name === "purenullxxxxxxx" ? user.child3.name : C3name }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Age</label>
                        <input type="number" placeholder="Enter Age" id="C3age"  
                        value = { C3age === 10000 ? user.child3.age : C3age }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Gender</label>
                        <input type="text" id="C3gender" placeholder="Gender"  
                        value = { C3gender === "purenullxxxxxxx" ? user.child3.gender : C3gender }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Ethnicity</label>
                        <input type="text" id="C3ethinicity" placeholder="Enter Ethnicity"  
                        value = { C3ethinicity === "purenullxxxxxxx" ? user.child3.ethnicity : C3ethinicity }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Interest</label>
                        <input type="text" id="C3interest" placeholder="Enter your Interest"  
                        value = { C3interest === "purenullxxxxxxx" ? user.child3.interests : C3interest }  
                        onChange={this.handleInput}></input>
                        </div>
        
        
                        </div>
        
        
        
        
        
                        <div>
                                <h1>For Child 4</h1>
                        
                        <div>
                        <label >Full Name</label>
                        <input type="text" id="C4name" placeholder="Enter full name"
                        value = { C4name === "purenullxxxxxxx" ? user.child4.name : C2name }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Age</label>
                        <input type="number" placeholder="Enter Age" id="C4age"  
                        value = { C4age === 10000 ? user.child4.age : C4age }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label>Gender</label>
                        <input type="text" id="C4gender" placeholder="Gender"  
                        value = { C4gender === "purenullxxxxxxx" ? user.child4.gender : C4gender }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Ethnicity</label>
                        <input type="text" id="C4ethinicity" placeholder="Enter Ethnicity"  
                        value = { C4ethinicity === "purenullxxxxxxx" ? user.child4.ethnicity : C4ethinicity }  
                        onChange={this.handleInput}></input>
                        </div>
                        <div>
                        <label >Interest</label>
                        <input type="text" id="C4interest" placeholder="Enter your Interest"  
                        value = { C4interest === "purenullxxxxxxx" ? user.child4.interests : C4interest }  
                        onChange={this.handleInput}></input>
                        </div>
        
        
                        </div>
        
        
        
        
        
        
        
                        <div>
                        <h1>Family Description</h1>
                        <div>
                      <label htmlFor="familyDescription">Description</label>
                      <textarea id="familyDescription" rows="5" cols="50" type="text"
                        value = { familyDescription === "purenullxxxxxxx" ? user.descriptions : familyDescription }
                        placeholder="Enter family description" 
                        onChange={this.handleInput}
                      ></textarea>
                    </div>
                        </div>
        
        
                        <div>
                        <p>Remove an image</p>
                        <DeleteImage></DeleteImage>
                        </div>
        
        
        
        
        
                        
        
                        <label />
                                <button className="primary" type="submit"> Update Family </button>
                                
                        </div>

                                </form>
        
        
                        
        
        
            </div>
                        }
                        </div>
                )
        }
}




export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                user : state.getDetails.user ,
                success : state.userUpdateProfile.success
        
        
        }),
        {
                updateUserProfile , userDetails
        }

)(UpdateUserScreen);