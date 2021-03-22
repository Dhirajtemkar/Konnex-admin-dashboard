import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import "../styles/App.css";
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import UserInfoMenuToggle from './UserInfoMenuToggle';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

function CommonNavBar(props) {
    const location = useLocation();
    // console.log(location)
    const [arr, setArr] = useState();
    useEffect(() => {
        const string = location.pathname;
        const words = string.split("/");

        // for (let i = 0; i < words.length; i++) {
        //     words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        // }
        words.shift()
        console.log(words)
        setArr(words)
    })
    return (
        <div className="commonNavBar">
            <div className="navIndication">
                {
                    arr ? arr.map((e, i) => {
                        if(i+1 === arr.length){
                            return(
                                <div className="eachNavIndi">{e}</div>
                            )
                        } else {
                            return(
                                <div className="eachNavIndi">{e} <ChevronRightRoundedIcon /></div>
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
