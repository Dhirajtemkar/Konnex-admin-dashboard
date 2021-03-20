import React, {useState, useEffect} from 'react'
import {Link, Route, Switch, useLocation} from 'react-router-dom';
import Auth from './auth/auth';
import Home from './views/home';
import Issues from './views/issues/issues';
import Settings from './views/settings';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import "../styles/App.css";
import HomeSVG from '../assets/HomeSVG.svg';
import IssueSVG from '../assets/discuss-issue.svg';
import checkSVG from '../assets/clipboard.svg';
import userSVG from '../assets/user.svg';
import settingsSVG from '../assets/settings.svg';
import MyTask from './views/MyTask';
import testLogo from '../assets/testLogo.svg';
import MiniDrawer from './NewNavBar';
import { Button, IconButton} from '@material-ui/core'
import MainIssue from './views/issues/MainIssue';

function EachNavSection({name, ele, liName, handleLinkClick}) {
    // <EachNavSection name={} ele={} handleLinkClick={handleLinkClick}/>
    return(
        <div className="navBlock">
            <ul className="toolNav">
                <p>{name}</p>
                {
                    ele.map((e) => (
                        <Link className={`link ${liName===e.linkName ? "activeLink" : ""}`} to={e.location} key={e.linkName}>
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
    const location = useLocation();
    // console.log(location)


    let [liName, setLiName] = useState("");
    
    useEffect(() => {
        if(location.pathname == "/home"){
            setLiName("Home")
        } else if(location.pathname == "/issues"){
            setLiName("Issues")
        } else if(location.pathname == "/mytask"){
            setLiName("My Task")
        } else if(location.pathname == "/auth"){
            setLiName("Auth")
        }
    }, [])
    
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
            {linkName:"Settings", location:"/settings", description:"to settings,(control panal, toggles)", icon:settingsSVG},
            {linkName:"Drawer", location:"/drawer", description:"to MiniDrawer", icon: userSVG},
        ]}
    ]
    let [toggleNav, setToggleNav] = useState(true);
    const handleToggleNav = () => {
        setToggleNav(!toggleNav);
    }
    useEffect(() => {
        localStorage.setItem("toggleNav", toggleNav);
    }, [toggleNav])
    return (
        <div className={`${toggleNav ? "mainNav" : "toggleNav"}`}>
            <div className="logo">
                {
                    toggleNav ? (<p>Forward</p>) : (<div/>)
                }
                
                <img src={testLogo} height="35" alt="test Logo" />
            </div>
            {
                // toggleNav ? (
                //     <Button onClick={handleToggleNav}>
                //     <MenuRoundedIcon /> Menu    
                //     </Button>) : (
                //         <IconButton
                //             aria-label="more"
                //             aria-controls="long-menu"
                //             aria-haspopup="true"
                //             onClick={handleToggleNav}
                //             // className="toggleNavBtn"
                //         >
                //             <MenuRoundedIcon />
                //         </IconButton>
                //     )
            }
            
            {
                navItems.map((e) => {
                    return(
                        <EachNavSection 
                        name={e.name} 
                        ele={e.elements} 
                        handleLinkClick={handleLinkClick} 
                        liName={liName}
                        key={e.name}
                        />
                    )
                })
            }
        </div>
    )
}

export function DashboardNavTree(props) {
    // console.log(props.location)
    let [navOption, setNavOption] = useState(localStorage.getItem("toggleNav"));
    useEffect(() => {
        // const toggleNav = localStorage.getItem("toggleNav");
        setNavOption(localStorage.getItem("toggleNav"));
        console.log(navOption + " inside the useEffect");
    }, [localStorage.getItem("toggleNav")])
    console.log(navOption)
    return (
        <div className="mainRoute">
            {
                // navOption === "true" ? () : (<div/>)
            }
            <div className="blockedSpace"></div>
            <div className="view">
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/issues" component={MainIssue} />
                <Route path="/mytask" component={MyTask} />
                <Route path="/settings" component={Settings} />
                <Route path="/auth" component={Auth} />
                <Route path="/drawer" component={MiniDrawer} />

                <Route exact path="/" component={Auth} />
            </Switch>
            </div>
        </div>
    )
}