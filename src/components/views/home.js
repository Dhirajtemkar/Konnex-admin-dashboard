import React from 'react'
import { Link, Switch, Route, Redirect } from "react-router-dom";
import Settings from './settings';

function Index(params) {
    return(
        <div>
        <h2>This is the index page inside home</h2>
        </div>
    )
}

export default function Home() {
    return (
        <div>
            <h2>
                this is the home component.
            </h2>
            Go to: <Link to="/home/index/settings">Settings</Link>
            <Switch>
                <Route exact path={'/home/index/'} component={() => <Index />} />
                <Route path={'/home/index/settings'} component={() => <Settings page={"new"} />} />
                <Redirect from="*" to="/home/index/" />
            </Switch>
        </div>
    )
}
