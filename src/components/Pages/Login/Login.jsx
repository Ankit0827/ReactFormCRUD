import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Userdata from '../UserData/Userdata';

const Login = () => {
    const [emailCheck, setEmailCheck] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [registeredUser, setRegisteredUser] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userMatchedData, setUserMatchedData] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/Users');
            const users = response.data;
            const foundUser = users.find(user => user.email === emailCheck && user.password === passwordCheck);

            if (foundUser) {
                setRegisteredUser(true);
                setUserMatchedData(foundUser);
                setNotFound(false);
                setShowLoader(false);
            } else {
                setNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const checkOnFocusError = (inputField) => {
        switch (inputField) {
            case 'email':
                setEmailError(!emailCheck);
                break;
            case 'password':
                setPasswordError(!passwordCheck);
                break;
            default:
                break;
        }
    };

    const login = () => {
        setShowLoader(!showLoader);
        setShowLogin(!showLogin);
        setTimeout(fetchUsers, 4000);
    };

    //  showLoginForm = () => {
    //     setShowLoginForm(true);
    //     setNotFound(false);
    // };

    const setEmail = (e) => {
        setEmailCheck(e.target.value);
        setEmailError(!e.target.value);
    };

    const setPassword = (e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(!e.target.value);
    };

    const showToaster = () => {
        if (showLoginForm) {
            return (
                <div className={showLogin ? 'login_parent_div' : 'hide-parent-div'}>
                    <div className="login_subparent_div">
                        <div className="login_heading_div">
                            <h1 className="login_heading">Login</h1>
                        </div>
                        <div className="login_div">
                            <form action="">
                                <input
                                    type="text"
                                    value={emailCheck}
                                    onChange={setEmail}
                                    onFocus={() => checkOnFocusError('email')}
                                    className="input_field"
                                />
                                {emailError && <span style={{ color: 'red' }}>*please enter a valid email</span>}
                                <input
                                    type="password"
                                    value={passwordCheck}
                                    onChange={setPassword}
                                    onFocus={() => checkOnFocusError('password')}
                                    className="input_field"
                                />
                                {passwordError && <span style={{ color: 'red' }}>*Invalid Password</span>}
                            </form>
                            <div className="btn_div">
                                <button onClick={login}>Login</button>
                            </div>
                            <div className="create_an_account">
                                <span>
                                    Don't have an account
                                    <Link to="/AddUser">Create an Account</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (!showLoginForm && registeredUser) {
            return <Userdata data={userMatchedData} />;
        } else if (!showLoginForm && notFound) {
            return (
                <div className="login_error">
                    <h1 style={{ textAlign: 'center' }}>No User Found!!!</h1>
                    <button onClick={showLoginForm}>Go back</button>
                </div>
            );
        }
    };

    return (
        <>
            {showToaster()}
            <div className={showLoader ? 'show-parent-loader' : 'hide-parent-loader'}>
                <div className="loader"></div>
            </div>
        </>
    );
};

export default Login;
