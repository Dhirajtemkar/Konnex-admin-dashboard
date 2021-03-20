import React from 'react'
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Auth from '../auth/auth';
import Issues from './issues/issues';

export default function Settings(props) {
    const {url, path} = useRouteMatch();
    console.log(url , path);
    console.log(props)
    return (
        <div>
            <h2>
                this is the settings component.
            </h2>
            Go to: <Link to={`/settings/issues`}>Issues</Link><br />
            Go to: <Link to={`${url}/auth`}>Auth</Link>
            
        </div>
    )
}
