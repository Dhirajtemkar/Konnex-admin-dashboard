import React, {useState, useEffect} from 'react'
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './components/auth/auth';
import Dashboard from './components/Dashboard';

function Main() {
    const [user, setUser] = useState({email:"dhiraj", password: "dhiraj"});
    
    const handleUser = (val) => {
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
                        render={() => <Dashboard handleUser={handleUser} user={user} />}     
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
