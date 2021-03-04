import React, {useState} from 'react'
import {Link, Route, Switch} from 'react-router-dom';
import Auth from './auth/auth';
import Home from './views/home';
import Issues from './views/issues';
import Settings from './views/settings';

import "../styles/App.css";
import HomeSVG from '../assets/HomeSVG.svg';
import IssueSVG from '../assets/discuss-issue.svg';
import checkSVG from '../assets/clipboard.svg';
import userSVG from '../assets/user.svg';
import settingsSVG from '../assets/settings.svg';
import MyTask from './views/MyTask';

function EachNavSection({name, ele, liName, handleLinkClick}) {
    // <EachNavSection name={} ele={} handleLinkClick={handleLinkClick}/>
    return(
        <div className="navBlock">
            <ul className="toolNav">
                <p>{name}</p>
                {
                    ele.map((e) => (
                        <Link className={`link ${liName===e.linkName ? "activeLink" : ""}`} to={e.location}>
                            <li 
                            onClick={() => handleLinkClick(e.linkName)} 
                            className={`eachLink ${liName===e.linkName ? "active" : ""}`}
                            >
                                <img height="18" src={e.icon} alt="login"/> {e.linkName}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export function DashboardNavBar() {

    let [liName, setLiName] = useState("Home");
    
    const handleLinkClick = (p) => {
        setLiName(p)
    }
    const navItems = [
        {name: "General", access:1, elements: [
            {linkName:"Home", location:"/home", description:"to home,(Dashboard)", icon: HomeSVG},
            {linkName:"Issues", location:"/issues", description:"to Issues(list of issues)", icon:IssueSVG},
            {linkName:"My Task", location:"/mytask", description:"to My Task,(your tasks assigned)", icon:checkSVG},
            {linkName:"Auth", location:"/auth", description:"to Authentication", icon: userSVG},
        ]},
        {name: "Tools", access:2, elements: [
            {linkName:"Settings", location:"/settings", description:"to settings,(control panal, toggles)", icon:settingsSVG}
        ]}
    ]
    return (
        <div className="mainNav">
            {
                navItems.map((e) => {
                    return(
                        <EachNavSection 
                        name={e.name} 
                        ele={e.elements} 
                        handleLinkClick={handleLinkClick} 
                        liName={liName}
                        />
                    )
                })
            }
        </div>
    )
}

export function DashboardNavTree() {
    return (
        <div className="mainRoute">
            <div className="blockedSpace"></div>
            <div className="view">
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/issues" component={Issues} />
                <Route path="/mytask" component={MyTask} />
                <Route path="/settings" component={Settings} />
                <Route path="/auth" component={Auth} />
                <Route exact path="/" component={Auth} />
            </Switch>
            </div>
        </div>
    )
}