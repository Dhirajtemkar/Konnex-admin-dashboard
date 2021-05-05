import React, {useState, useEffect} from 'react'
import {Link, Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Auth from './components/auth/auth';
import Dashboard from './components/Dashboard';
import Fire from "./Fire";

function Main() {
    const history = useHistory();

    const [user, setUser] = useState();
    const [newUser, setNewUser] = useState();
    
    useEffect(() => {
        var user = Fire.auth().currentUser;
        console.log(user)

        if (user) {
            // setNewUser(user)
            // setUser({
            //     displayName: user.displayName,
            //     email: user.email,
            //     token: user.refreshToken,
            // })
        // User is signed in.
        } else {
            history.push({
                pathname: '/auth/login',
                state: {
                    name: "dhiraj",
                    issueInfo: null,
                }
            })
        // No user is signed in.
        }
    }, [])

    const handleUser = (val) => {
        Fire.auth().onAuthStateChanged(function(user) {
        if (user) {
            // console.log(user)
            setNewUser(user)
            setUser({
                displayName: user.displayName,
                email: user.email,
                token: user.refreshToken,
            })
            // User is signed in.
            history.push({
                pathname: '/dashboard/home',
                state: {
                    name: "dhiraj",
                    issueInfo: null,
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
