import React from 'react'
import {Link, Route, Switch} from 'react-router-dom';
import Auth from './auth/auth';
import Home from './views/home';
import Issues from './views/issues';
import Settings from './views/settings';

export function DashboardNavBar() {
    return (
        <div>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/issues">Issues</Link></li>
            </ul>
        </div>
    )
}

export function DashboardNavTree() {
    return (
        <div>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/issues" component={Issues} />
                <Route exact path="/" component={Auth} />
            </Switch>
        </div>
    )
}