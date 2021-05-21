import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom';
import "../styles/App.css";
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import UserInfoMenuToggle from './UserInfoMenuToggle';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';



function CommonNavBar(props) {
    const history = useHistory();
    const location = useLocation();
    // console.log(props.location)

    const [arr, setArr] = useState();
    useEffect(() => {
        const string = location.pathname;
        const words = string.split("/");

        // for (let i = 0; i < words.length; i++) {
        //     words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        // }
        words.shift()
        // console.log(words)
        setArr(words)
    })
    const handleNav = (loc) => {
        if(loc === "dashboard"){
            history.push({
                pathname: '/dashboard/home',
            })
        } else if(loc === "mytask"){
            history.push({
                pathname: '/dashboard/mytask',
            })
        } else if(loc === "issues"){
            history.push({
                pathname: '/dashboard/issues',
            })
        }
        console.log("pressed!");
    }
    return (
        <div className="commonNavBar">
            <div className="navIndication">
                {
                    arr ? arr.map((e, i) => {
                        if(i+1 === arr.length){
                            if (e === "moreInfo" && props.location.state.issueInfo) {
                                return(
                                    <div className="eachNavIndi">{e} <ChevronRightRoundedIcon /> #{props.location.state.issueInfo ? props.location.state.issueInfo.tId: ""}</div>
                                )
                            } else {
                                return(
                                    <div className="eachNavIndi">{e}</div>
                                )
                            }
                        } else {
                            
                            return(
                                <div className="eachNavIndi"  onclick={() => handleNav(e)}>{e} <ChevronRightRoundedIcon /></div>
                            )
                        }
                    }) : null
                } 
            </div>
            <div className="toggleBtns">
                <div className="notiBtn">
                    <IconButton color="primary" aria-label="add an alarm">
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>
                </div>
                <UserInfoMenuToggle user={props.user} handleUser={props.handleUser}/>
                {/*<div className="userInfo">
                    <AccountCircleRoundedIcon /> 
                    <div className="userName">{props.user.email}</div>
                </div>*/}
            </div>
        </div>
    )
}

export default CommonNavBar
