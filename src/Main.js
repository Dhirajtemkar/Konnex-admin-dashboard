import React, {useState, useEffect} from 'react'
import {Link, Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Auth from './components/auth/auth';
import Dashboard from './components/Dashboard';
import Fire from "./Fire";

function Main() {
    const history = useHistory();

    const [user, setUser] = useState({email:"dhiraj", password: "dhiraj"});
    const [newUser, setNewUser] = useState();
    
    const handleUser = (val) => {
        Fire.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user)
            setNewUser(user)
            // User is signed in.
            history.push({
                pathname: '/dashboard/home',
                state: {
                    name: "dhiraj",
                }
            })
        } else {
            console.log("not signed in!")
            // No user is signed in.
        }
        });
        setUser(val)
    }
    return (
        <div>
            <Switch>
                <Route 
                path="/auth" 
                render={() => <Auth handleUser={handleUser} />} 
                // component={Auth}
                />
                {
                    user && (
                        <Route 
                        path="/dashboard" 
                        // component={Dashboard} 
                        render={() => <Dashboard handleUser={handleUser} user={newUser} />}     
                        />
                        )
                }
                
                {/*<Route exact to="/" component={() => <Auth />} />*/}
                <Redirect from="/" to="/auth" />
            </Switch>
        </div>
    )
}

export default Main
