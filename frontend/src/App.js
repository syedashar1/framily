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

                

            </main>
            <footer style={{background:'white',color:'grey'}} className="row center">All right reserved</footer>
        </div>
        </BrowserRouter>


                
    
    
          )

    }


}


export default App;
 