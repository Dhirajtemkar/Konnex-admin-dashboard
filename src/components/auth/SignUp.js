import React, {useState, useEffect} from 'react'
import "../../styles/Auth.css";
import testLogo from '../../assets/testLogo.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LeftSideDesign from './LeftSideDesign';
import {Link, useHistory} from 'react-router-dom';
import Fire from "../../Fire";
import ReactLoading from 'react-loading';

function SignUp(props) {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPass, setConPass] = useState("");
    const [error, setError] = useState();
    const [errorType, setErrorType] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const handleNameText = (event) => {
        setName(event.target.value)
    }
    const handleEmailText = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordText = (event) => {
        setPassword(event.target.value)
    }
    const handleConPassText = (event) => {
        setConPass(event.target.value)
    }
    const handleSignUp = () => {
        if (name === "") {
            setErrorType("name")
            setError("please enter a name!")
        } else if(email === ""){
            setErrorType("email")
            setError("please enter an email!")
        } else if (password === "") {
            setErrorType("password")
            setError("please enter a password!")
        } else if (conPass === "") {
            setErrorType("conPass")
            setError("please enter a password!")
        } else if (password !== conPass) {
            setErrorType("conPass")
            setError("passwords dont match!")
        } else if (name !== "" && email !== "" && password !== "" && conPass !== "" && password === conPass){
            setErrorType("")
            setError("")
        } else {
            setErrorType("common")
            setError("something dosen't seem right!")
        }

        if(errorType === "" && error === "") {
            // handle login process
            setIsLoading(true)
            Fire.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                Fire.auth().currentUser.updateProfile({
                    displayName: name,
                    // photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(function() {
                    // Update successful.
                    var user = userCredential.user;
                    props.handleUser(user);
                    setIsLoading(false)
                    // history.push({
                    //     pathname: '/auth/login',
                    //     state: {
                    //         name: name,
                    //         email: email,
                    //     }
                    // })
                  }).catch(function(error) {
                    // An error happened.
                    console.log(error);
                  });

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setErrorType(errorCode)
                setError(errorMessage)
            });

            
            // console.log(email, password)
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
                                    <Link to="/auth/login" style={{textDecoration:"none"}}>
                                    <Button variant="outlined" color="primary" size="large">
                                        <div className="textInBtn">Login</div>
                                    </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mainAuthForm">
                                <div className="authFormTitle1">Sign-Up for an Account</div>

                                <div className="authForm">
                                        <TextField
                                            id="outlined-textarea"
                                            label="Enter Name"
                                            placeholder="Name"
                                            multiline
                                            variant="outlined"
                                            onChange={handleNameText}
                                        />
                                        <div className="errorText">{errorType === "name" ? error : null}</div>
                                        <div className="spaceDiv" />
                                        <TextField
                                            id="outlined-textarea"
                                            label="Enter Email"
                                            placeholder="xoy@acb.com"
                                            multiline
                                            variant="outlined"
                                            onChange={handleEmailText}
                                        />
                                        <div className="errorText">{errorType === "email" ? error : null}</div>
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
                                        <TextField
                                            id="outlined-password-input"
                                            label="Confirm Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            onChange={handleConPassText}
                                        />
                                        <div className="errorText">{errorType === "conPass" ? error : null}</div>
                                        <div className="spaceDiv" />
                                        <Button variant="contained" size="large" color="primary" onClick={handleSignUp} >
                                            <div className="textInBtn">Sign Up</div>
                                        </Button>
                                        <div className="errorText">{errorType === "common" ? error : null}</div>
                                        <div className="spaceDiv" />
                                        <div className="formNote">
                                            <div className="footNote1">Do you have an account ?</div>
                                            <Link to="/auth/login" style={{textDecoration:"none"}}><div className="footNote2">Login</div></Link>
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

export default SignUp
