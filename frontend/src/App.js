import React from 'react';
import "./main.css"
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import Navbar from './components/Navbar';
import SignIn from './screens/SignIn';
import RegisterScreen from './screens/RegisterScreen';

import userProfileScreen from './screens/userProfileScreen';

import matchScreen from './screens/matchScreen';
import Home from './screens/Home';
import familyDetails from './screens/familyDetails';
import chatScreen from './screens/chatScreen';
import ChatApp from './chat/components/ChatApp'
import UpdateUserScreen from './screens/UdateUserScreen'
class App extends React.Component {








    render(){


        return(


        <BrowserRouter>
        <div className="grid-container">

            <Navbar/>
            
            <main>
                <Route path="/" component={Home} exact></Route>
                <Route path="/explore" component={HomeScreen} exact></Route>
                <Route path="/matches" component={matchScreen} exact></Route>
                <Route path="/profile" component={userProfileScreen} exact></Route>
                <Route path="/signin" component={SignIn} exact></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/families/:id" component={familyDetails}></Route>
                <Route path="/chat" component={ChatApp}></Route>
                <Route path="/update" component={UpdateUserScreen}></Route>
                <Route 
                path="/filter/interestsdescription/:interestsdescription/min/:min/max/:max/ethinicity/:ethinicity/order/:order"
                component={HomeScreen} exact
                ></Route>

                

            </main>
            <footer style={{backgroundColor :' #023246' ,color:'#f6f6f6'}} className="row center">All right reserved</footer>
        </div>
        </BrowserRouter>


                
    
    
          )

    }


}


export default App;
 