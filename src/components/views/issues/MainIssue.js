import React from 'react'
import {Link, Route, Switch, useLocation} from 'react-router-dom';
import IssueInfo from '../IssueInfo/IssueInfo';
import Issues from './issues';

function MainIssue() {
    return (
        <div>
            <Switch>
                <Route exact path="/dashboard/issues/" component={Issues} />
                <Route path="/dashboard/issues/moreInfo" component={IssueInfo} />

                <Route exact path="/dashboard/issues" component={Issues} />
            </Switch>
        </div>
    )
}

export default MainIssue
