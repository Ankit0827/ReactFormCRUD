import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Userdata from '../UserData/Userdata'



const Login = () => {
    const [loginData, setLoginData] = useState([]);
    const [emailCheck, setEmailCheck] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [registeredUser, setRegisteredUser] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [emailerror, setEmailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false);
    const [userMatchedData, setUserMatchedData] = useState({});
    const [showLoader,setShowLoader] = useState(false);
    const [showlogin,setLogin]=useState(true);


    
    const login = () => {
        setShowLoader(!showLoader);
        setLogin(!showlogin);
        setTimeout(()=>{
            fetchUsers();
        },4000)
        
    }
    const fetchUsers = () => {
        axios.get(`http://localhost:3000/Users`).then((res) => {
            setLoginData([...res.data]);
            setShowLoginForm(!showLoginForm);

            for (let data of res.data) {
                if (data.email === emailCheck && data.password === passwordCheck) {
                    setRegisteredUser(!registeredUser)
                    setUserMatchedData(data);
                    setShowLoader(false)
                }
                else {
                    setNotFound(!notFound)
                }
            }
        })
    }

    const showloginform = () => {
        setShowLoginForm(true)
        setNotFound(!notFound)
    }

    const checkOnFocusError = (inputField) => {
        switch (inputField) {

            case "emailerror":
                !!emailCheck ? setEmailerror(false) : setEmailerror(true);
                break;

            case "passworderror":
                !!passworderror ? setPassworderror(false) : setPassworderror(true);
        }
    };



    const setEmail = (e) => {
        setEmailCheck(e.target.value);
        if (e.target.value) {
            setEmailerror(false);

        } else {
            setEmailerror(true);
        }
    };

    const setPassword = (e) => {
        setPasswordCheck(e.target.value);
        if (e.target.value) {
            setPassworderror(false);

        } else {
            setPassworderror(true);
        }
    };

    const getLoaderClass = () =>{
        return showLoader ? 'show-parent-loader' : 'hide-parent-loader';
    }

    const getLoginClass=()=>{
        return showlogin?'login_parent_div':'hide-parent-div'
    }

    const showtoaster = () => {
        {
            if (showLoginForm) {
                return (
                    <div className={getLoginClass()}>
                        <div className="login_subparent_div">
                            <div className="login_heading_div">
                                <h1 className="login_heading">Login</h1>
                            </div>
                            <div className="login_div">
                                <form action="">
                                    <input type="text" value={emailCheck} onChange={setEmail} onFocus={() => checkOnFocusError("emailerror")} className="input_field" />
                                    {emailerror ? (
                                        <span
                                            style={{
                                                color: "red"
                                            }}
                                        >*please enter valid email</span>
                                    ) : ("")

                                    }
                                    <input type="password" value={passwordCheck} onChange={setPassword} onFocus={() => checkOnFocusError("passworderror")} className="input_field" />
                                    {passworderror ? (
                                        <span
                                            style={{
                                                color: "red"
                                            }}
                                        >*Invalid Password</span>
                                    ) : ("")

                                    }
                                </form>

                                <div className="btn_div">
                                    <button onClick={login}>Login</button>
                                </div>
                                <div className="create_an_account">
                                    <span>Don't have an account
                                        <Link to="/AddUser">Create an Account</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else if (!showLoginForm && registeredUser) {
                return (
                    <>
                    
                        <Userdata data={userMatchedData} />
                    </>
                )
            }
            else if (!showLoginForm && notFound) {
                return (
                    <div className="login_error">
                        <h1 style={{ textAlign: 'center' }}>No User Found!!!</h1>
                        <button onClick={showloginform}>Go back</button>
                    </div>
                )
            }
        }
    }

    return (
        <>
            {
                showtoaster()
            }
            <div className= {getLoaderClass()}>
            <div className="loader"></div>
            </div>
        </>

    )
}

export default Login
