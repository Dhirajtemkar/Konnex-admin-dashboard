import React from 'react'
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

export default function Auth(props) {
    return (
        <div>
            <Switch>
                <Route path="/auth/login" render={() => <Login handleUser={props.handleUser} />} />
                <Route 
                path="/auth/signup" 
                // render={() => <SignUp handleUser={props.handleUser} />} 
                component={SignUp}
                />
                <Redirect from="/auth/" to="/auth/login" />
            </Switch>
        </div>
    )
}
