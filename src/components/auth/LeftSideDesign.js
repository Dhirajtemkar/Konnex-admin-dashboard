import React from 'react';
import "../../styles/Auth.css";
import DirectionsIcon from '@material-ui/icons/Directions';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import FastForwardOutlinedIcon from '@material-ui/icons/FastForwardOutlined';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import HowToRegRoundedIcon from '@material-ui/icons/HowToRegRounded';
import PhoneCallbackRoundedIcon from '@material-ui/icons/PhoneCallbackRounded';
import dots from "../../assets/dots.png";
export default function LeftSideDesign() {
    return (
        <div className="leftSide"> 
                <div className="topRightBallS"/>
                <div className="topRightBallB"/>
                <div className="bottomLeftBallS"/>
                <img src={dots} className="dotsTop" />
                <img src={dots} className="dotsBottom" />
                <div className="centerTextLeft">
                    <div className="centerMainText">Forward</div> 
                    <div className="centerMainText">Real Time ITSM</div>
                </div>
                <div className="centerTextBelow">
                    <div className="bulletText">
                        <div className="bulletIcon">
                            <DirectionsIcon />
                        </div>
                        Automatic Routing
                    </div>
                    <div className="bulletText">
                        <div className="bulletIcon">
                            <AssessmentOutlinedIcon />
                        </div>
                        Data Analysis
                    </div>
                    <div className="bulletText">
                        <div className="bulletIcon">
                            <FastForwardOutlinedIcon />
                        </div>
                        Faster Resolution
                    </div>
                    <div className="bulletText">
                        <div className="bulletIcon">
                            <StarRoundedIcon />
                        </div>
                        Quality Of Service
                    </div>
                    <div className="bulletText">
                        <div className="bulletIcon">
                            <HowToRegRoundedIcon />    
                        </div>
                        Customer Satisfaction
                    </div>
                    <div className="bulletText">
                        <div className="bulletIcon">
                            <PhoneCallbackRoundedIcon />
                        </div>
                        Invoicing
                    </div>
                </div>
            </div>
    )
}