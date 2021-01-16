import React, { Component } from 'react'
import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { listUsers , deleteUser } from '../actions/userActions'
class userLists extends Component {

        

        componentDidMount = () => {
                this.props.listUsers()
        }


        // handleDelete = (x) => {
        //         if (window.confirm('Are you sure to delete?')) {
        //                 this.props.deleteUser(x);
        
        //                 }
        // }
        handleDelete = (x) => {
                        this.props.deleteUser(x);
        
                        
        }



        render() {


                const { deleteLoading , deleteSuccess , users , loading , error , id } = this.props


                return (

                        




        <div>
                <button onClick={()=>{console.log(this.props.order);}}></button>

                

                        <h1>Users</h1>
      {loading ? (
         <div>Loading...</div>
      ) : error ?  (<div>error</div>) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                <button onClick={() => this.props.history.push(`/user/${user._id}/edit`)} >Edit</button>
                <button onClick={()=>this.handleDelete(user._id)} >Delete</button>
                { user._id === id && deleteLoading && <div>Wait a while ...</div> }
                { user._id === id && deleteSuccess && <div>Successfully Deleted user</div> }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}



                

                        
                </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
       
                users : state.userList.users , 
                loading : state.userList.loading , 
                error : state.userList.error , 

                userInfo : state.userSignin.userInfo ,

                deleteLoading : state.userDelete.loading , 
                deleteSuccess : state.userDelete.success , 
                id : state.userDelete.id , 


        
        
        }),
        {
                listUsers , deleteUser
        }
      
)(userLists);