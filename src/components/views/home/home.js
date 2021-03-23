import React, {useEffect, useState} from 'react'
import { Link, Switch, Route, Redirect } from "react-router-dom";

import '../../../styles/home.css';
import {Popper, Typography, Button, Fade, Paper} from '@material-ui/core';

import Fire from "../../../Fire";
import firebase from 'firebase';

import { makeStyles } from '@material-ui/core/styles';
import VerticalBar from './VerticalChart';
const useStyles = makeStyles((theme) => ({
    root: {
    //   width: 500,
    },
    typography: {
      padding: theme.spacing(2),
    },
  }));

function Index(params) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    return(
        <div>
        <h2>This is the index page inside home</h2>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <div className="popperDiv">The content of the Popper.</div>
                </Fade>
            )}
        </Popper>
            <Button onClick={handleClick('bottom-end')}>Action</Button>
            <div style={{height:"100vh"}}/>
        </div>
    )
}

export default function Home() {
    let db = Fire.firestore();
    const [dataFromDb, setDataFromDb] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        let dataArr = [];
        // run only once to initialize
        db.collection("testUserData")
          .onSnapshot(snapshot => {
            let ob = {
                tId: "",
                email:"",
                name:"",
                issue:"", //issue is description in db
                priority: "",
                dateTime:"",
                group:"",
                team:"",
                status:"",
            } 
            snapshot.docs.map(doc => {
                ob = {
                    tId: doc.id,
                    email: doc.data().email,
                    name:doc.data().name,
                    issue:doc.data().description, 
                    priority: doc.data().priority,
                    dateTime:doc.data().dateTime,
                    group:doc.data().group,
                    team:doc.data().team,
                    status:"",
                };
                dataArr.push(ob);
            })
            setDataFromDb(dataArr);
            setIsLoading(false)
        })

        // setDummyData(dataArr);
        // if(prevData && !_.isEqual(prevData, data)) {
        // }
        console.log(dataArr);
    }, [dataFromDb])

    return (
        <div>
            <h2>
                this is the home component.
            </h2>
            <VerticalBar />
            <div>
                {
                    isLoading === false ? dataFromDb && dataFromDb.map((e)=>{
                        return(
                            <div>
                                {e.name}
                                {e.email}
                            </div>
                        )
                    }) : null
                }
            </div>
            {/*Go to: <Link to="/dashboard/home/index/settings">Settings</Link>
            <Switch>
                <Route exact path={'/dashboard/home'} component={() => <Index />} />
                <Route path={'/dashboard/home/index/settings'} component={() => <Settings page={"new"} />} />
                <Redirect from="*" to="/dashboard/home" />
            </Switch>*/}
            
        </div>
    )
}
