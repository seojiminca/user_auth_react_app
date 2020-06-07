import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
import {Provider} from 'react-redux'
import store from './store';
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import PrivateRoute from "./components/common/PrivateRoute";

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime= Date.now() / 1000;

    if(decoded.exp < currentTime) {
        //Logout
        store.dispatch(logoutUser());

        //redirect to login
        window.location.href = '/login';
    }
}




function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Switch>
                            <PrivateRoute
                                exact path="/dashboard"
                                component={Dashboard}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact path="/create-profile"
                                component={CreateProfile}
                            />
                        </Switch>
                        {/*<Switch>*/}
                        {/*    <PrivateRoute*/}
                        {/*        exact path="/post"*/}
                        {/*        component={Post}*/}
                        {/*    />*/}
                        {/*</Switch>*/}
                    </div>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
