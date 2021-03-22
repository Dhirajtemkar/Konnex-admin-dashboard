import React from 'react'
import { Link, Switch, Route, Redirect } from "react-router-dom";

import '../../styles/home.css';
import {Popper, Typography, Button, Fade, Paper} from '@material-ui/core';

import Settings from './settings';
// import Typography from '@material-ui/core/Typography';
// import {Button, Popper} from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
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
    
    return (
        <div>
            <h2>
                this is the home component.
            </h2>
            Go to: <Link to="/dashboard/home/index/settings">Settings</Link>
            <Switch>
                <Route exact path={'/dashboard/home'} component={() => <Index />} />
                <Route path={'/dashboard/home/index/settings'} component={() => <Settings page={"new"} />} />
                <Redirect from="*" to="/dashboard/home" />
            </Switch>
            
        </div>
    )
}
