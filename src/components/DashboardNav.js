import React, {useState, useEffect} from 'react'
import {Link, Route, Switch, useLocation, Redirect} from 'react-router-dom';
import Home from './views/home/home';
import Settings from './views/settings';
import "../styles/App.css";
import HomeSVG from '../assets/HomeSVG.svg';
import IssueSVG from '../assets/discuss-issue.svg';
import checkSVG from '../assets/clipboard.svg';
import settingsSVG from '../assets/settings.svg';
import MyTask from './views/mytask/MyTask';
import testLogo from '../assets/testLogo.svg';
import MainIssue from './views/issues/MainIssue';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CommonNavBar from './CommonNavBar';
import Profile from './views/profile/Profile';

function EachNavSection({name, ele, liName, handleLinkClick}) {
    const [iconSet, setIconSet] = useState();
    useEffect(() => {
        if(liName === "Home"){
            setIconSet(<HomeOutlinedIcon />)
        } else if(liName === "Issues"){
            setIconSet(<ForumOutlinedIcon />)
        } else if(liName === "My Task"){
            setIconSet(<AssignmentTurnedInOutlinedIcon />)
        } else if(liName === "Settings"){
            setIconSet(<SettingsOutlinedIcon />)
        }
        
    }, [liName])
    return(
        <div className="navBlock">
            <ul className="toolNav">
                <p style={{color: "#fff", fontSize:"1em"}}>{name}</p>
                {
                    ele.map((e) => (
                        <Link className={`link ${liName===e.linkName ? "activeLink" : ""}`} to={{pathname:e.location, state: {issueInfo: null}, query:{issueInfo:null}}} key={e.linkName}>
                            <li 
                            onClick={() => handleLinkClick(e.linkName)} 
                            className={`eachLink ${liName===e.linkName ? "active" : ""}`}
                            >
                                {
                                    e.linkName === "Home" ? (<HomeOutlinedIcon />) : e.linkName === "Issues" ? (<ForumOutlinedIcon />) : e.linkName === "My Task" ? (<AssignmentTurnedInOutlinedIcon />) : (<SettingsOutlinedIcon />)
                                    
                                } <span style={{marginLeft:"0.5vh"}}>{e.linkName}</span>
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
    let [liName, setLiName] = useState("Home");
    
    useEffect(() => {
        if(location.pathname == "/dashboard/home"){
            setLiName("Home")
        } else if(location.pathname == "/dashboard/issues" || location.pathname === "/dashboard/issues/moreInfo"){
            setLiName("Issues")
        } else if(location.pathname == "/dashboard/mytask"){
            setLiName("My Task")
        } else if(location.pathname == "/dashboard/auth"){
            setLiName("Auth")
        } else if(location.pathname === "/dashboard/mytask/moreInfo"){
            setLiName("My Task")
        } else {
            setLiName("")
        }
    })
    
    const handleLinkClick = (p) => {
        setLiName(p)
    }
    const navItems = [
        {name: "General", access:1, elements: [
            {linkName:"Home", location:"/dashboard/home", description:"to home,(Dashboard)", icon: HomeSVG},
            {linkName:"Issues", location:"/dashboard/issues", description:"to Issues(list of issues)", icon:IssueSVG},
            {linkName:"My Task", location:"/dashboard/mytask", description:"to My Task,(your tasks assigned)", icon:checkSVG},
            // {linkName:"Auth", location:"/dashboard/auth", description:"to Authentication", icon: userSVG},
        ]},
        {name: "Tools", access:2, elements: [
            {linkName:"Settings", location:"/dashboard/settings", description:"to settings,(control panal, toggles)", icon:settingsSVG},
            // {linkName:"Drawer", location:"/drawer", description:"to MiniDrawer", icon: userSVG},
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
            <div className="logo1">
                {
                    toggleNav ? (<p>Forward</p>) : (<div/>)
                }
                
                <img src={testLogo} height="35" alt="test Logo" />
            </div>
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
    const location = useLocation();
    console.log(location);

    let [navOption, setNavOption] = useState(localStorage.getItem("toggleNav"));
    useEffect(() => {
        // const toggleNav = localStorage.getItem("toggleNav");
        setNavOption(localStorage.getItem("toggleNav"));
        // console.log(navOption + " inside the useEffect");
    }, [localStorage.getItem("toggleNav")])
    // console.log(navOption)
    return (
        <div className="mainRoute">
            <div className="blockedSpace"></div>
            <div className="view">
            <CommonNavBar handleUser={props.handleUser} user={props.user} location={location} />
            <Switch>
                <Route 
                    path="/dashboard/home" 
                    component={Home}
                    // render={() => <Home handleUser={props.handleUser} user={props.user} />} 
                />
                <Route 
                    path="/dashboard/issues" 
                    // component={MainIssue}
                    render={() => <MainIssue handleUser={props.handleUser} user={props.user} />} 
                />
                <Route 
                    path="/dashboard/mytask" 
                    // component={MyTask}
                    render={() => <MyTask handleUser={props.handleUser} user={props.user} />} 
                />
                <Route 
                    path="/dashboard/settings" 
                    component={Settings}
                    // render={() => <Settings handleUser={props.handleUser} user={props.user} />} 
                />
                <Route 
                    path="/dashboard/profile" 
                    // component={Settings}
                    render={() => <Profile handleUser={props.handleUser} user={props.user} />} 
                />
                <Route exact path="/dashboard" render={() => <Home handleUser={props.handleUser} user={props.user} />} />
            </Switch>
            </div>
        </div>
    )
}