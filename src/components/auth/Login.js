import React, {useState, useEffect} from 'react'
import "../../styles/Auth.css";
import testLogo from '../../assets/testLogo.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LeftSideDesign from './LeftSideDesign';
import {Link, useHistory} from 'react-router-dom';
import Fire from "../../Fire";
import ReactLoading from 'react-loading';

function Login(props) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [errorType, setErrorType] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailText = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordText = (event) => {
        setPassword(event.target.value)
    }
    const handleLogin = () => {
        if(email === ""){
            setErrorType("email")
            setError("please enter an email!")
        } else if (password === "") {
            setErrorType("password")
            setError("please enter a password!")
        } else if (email !== "" && password !== ""){
            setErrorType("")
            setError("")
        } else {
            setErrorType("common")
            setError("something dosen't seem right!")
        }

        if(errorType === "" && error === "") {
            // handle login process
            setIsLoading(true)
            
            Fire.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                props.handleUser(user);
                setIsLoading(false)

                // console.log(email, password)
                // history.push({
                //     pathname: '/dashboard',
                //     state: {
                //         name: "dhiraj",
                //     }
                // })
                // ...
            })
            .catch((error) => {
                setIsLoading(false)
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setErrorType(errorCode)
                setError(errorMessage)
            });
        }
    }
    return (
        <div>
            {
                isLoading ? (
                    <div style={{marginLeft:"50%", marginTop: "20%"}}>
                        <ReactLoading type={"spin"} color={"#0000af"} />
                    </div>
                ) : (
                    <div className="mainLogin">
                        {/*this is the design left side*/}
                        <LeftSideDesign />

                        {/*this is the form right side*/}
                        <div className="rightSide">
                            <div className="AuthNav">
                                <div className="logo">
                                    <p>Forward</p>
                                    <img src={testLogo} height="35" alt="test Logo" />
                                </div>
                                <div className="navBtn">
                                    <Link to="/auth/signup" style={{textDecoration:"none"}}>
                                    <Button variant="outlined" color="primary" size="large">
                                        <div className="textInBtn">SignUp</div>
                                    </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mainAuthForm">
                                <div className="authFormTitle">Login to your Account</div>

                                <div className="authForm">
                                        <TextField
                                            id="outlined-textarea"
                                            label="Enter Email"
                                            placeholder="xoy@acb.com"
                                            multiline
                                            variant="outlined"
                                            onChange={handleEmailText}
                                        />
                                        <div className="errorText">{errorType === "email" ? error : null}</div>
                                        <div className="errorText">{errorType === "auth/invalid-email" ? error : null}</div>
                                        <div className="spaceDiv" />
                                        <TextField
                                            id="outlined-password-input"
                                            label="Enter Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            onChange={handlePasswordText}
                                        />
                                        <div className="errorText">{errorType === "password" ? error : null}</div>
                                        <div className="spaceDiv" />
                                        <Button variant="contained" size="large" color="primary" onClick={handleLogin} >
                                            <div className="textInBtn">Login</div>
                                        </Button>
                                        <div className="errorText">{errorType === "common" ? error : null}</div>
                                        <div className="errorText">{errorType === "auth/user-not-found" || errorType === "auth/wrong-password" ? "Incorrect Email or Password! Please try again." : null}</div>
                                        <div className="spaceDiv" />
                                        <div className="formNote">
                                            <div className="footNote1">Do not have an account ?</div>
                                            <Link to="/auth/signup" style={{textDecoration:"none"}}><div className="footNote2">SignUp</div></Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Login
