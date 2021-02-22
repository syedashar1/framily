import React, { Component } from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import { avaliableForChat } from '../../actions/userActions';
import { useEffect } from 'react';
import { connect } from "react-redux";


// function App(props) {
//   // const [id, setId] = useLocalStorage('id')
//   const userSignin = useSelector((state) => state.userSignin);
//   const {  userInfo : userInfo } = userSignin;
//   useEffect(() => {  
//     if (!userInfo._id) {  props.history.push('/');


  
//   }}) 
//   const dashboard = (
//     <SocketProvider id={userInfo._id }>
//       <ContactsProvider>
//         <ConversationsProvider id={userInfo._id}>
//           <Dashboard id={userInfo._id} />
//         </ConversationsProvider>
//       </ContactsProvider>
//     </SocketProvider>
//   )

//   return (
//     dashboard
//   )
// }

// export default App;






class App extends Component {

  componentDidMount(){
    this.props.avaliableForChat()

  }


  render() {
    if (!this.props.userInfo) { this.props.history.push('/') }
    const {userInfo} = this.props
    const dashboard = (
      <SocketProvider id={userInfo._id }>
        <ContactsProvider>
          <ConversationsProvider id={userInfo._id}>
            <Dashboard id={userInfo._id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    )
    
    

    return (
      this.props.users ? dashboard : <div>Loading...</div>
    )
  }
}
export default connect(
        
  (state) => ({ 
          users : state.ListForChat.users , 
          loading : state.ListForChat.loading , 
          error : state.ListForChat.error , 

          userInfo : state.userSignin.userInfo ,


  
  }),
  {
          avaliableForChat
  } 

)(App);

