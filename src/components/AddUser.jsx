import React, { useState } from "react";
import axios from "axios";
import '../CSS/adduser.css'
import Login from './Pages/Login/Login'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const AddUser = () => {
    const [showTable, setShowTable] = useState(false);
    const [passwordType, setPasswordType] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [editUserClick, setEditUserClicked] = useState(false);
    const [editUserId, setEditUserId] = useState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const getInputType = () => {
        return !passwordType ? "password" : "text";
    };
    const toggleInputType = () => {
        let toggle = !passwordType;
        setPasswordType(toggle);
    };

    const postUser = () => {
        formData.name.length ? setErrorName(false) : setErrorName(true);
        formData.email.length ? setErrorEmail(false) : setErrorEmail(true);
        formData.password.length ? setErrorPassword(false) : setErrorPassword(true);
        let arr = Object.values(formData);
        if (!!arr[0]) {
            axios.post(`http://localhost:3000/Users`, formData).then((res) => {
                if (res) {
                    setShowTable(!showTable);
                    setFormData({});
                    getUser();
                }
            });
        }
    };

    const getUser = () => {
        axios.get(`http://localhost:3000/Users`).then((res) => {
            let user = res.data;
            setTableData([...user]);
        });
    };

    const setName = (e) => {
        if (e.target.value.length) {
            setErrorName(false);
            setFormData({ ...formData, name: e.target.value });
        } else {
            setErrorName(true);
        }
    };
    const checkOnFocusError = (inputField) => {
        switch (inputField) {
            case "nameError":
                !!formData.name ? setErrorName(false) : setErrorName(true);
                break;

            case "emailError":
                !!formData.email ? setErrorEmail(false) : setErrorEmail(true);
                break;

            case "passwordError":
                !!formData.password ? setErrorPassword(false) : setErrorPassword(true);
        }
    };
    const setEmail = (e) => {
        if (e.target.value.length) {
            setErrorEmail(false);
            setFormData({ ...formData, email: e.target.value });
        } else {
            setErrorEmail(true);
        }
    };
    const setPassword = (e) => {
        if (e.target.value.length) {
            setErrorPassword(false);
            setFormData({ ...formData, password: e.target.value });
        } else {
            setErrorPassword(true);
        }
    };

    const editUser = (index) => {
        let toggle = !showTable;
        setShowTable(toggle);
        setEditUserClicked(!editUserClick);
        setEditUserId(tableData[index].id);
        setFormData({
            ...formData,
            name: tableData[index].name,
            email: tableData[index].email,
            password: tableData[index].password,
        });
    };

    const deleteUser = (index) => {
        axios.delete(`http://localhost:3000/Users/${tableData[index].id}`).then((res) => {
            toast.success("User deleted Successfully", { position: toast.POSITION.TOP_RIGHT })
            getUser();
        })
    };

    const editUserApi = () => {
        axios
            .patch(`http://localhost:3000/Users/${editUserId}`, formData)
            .then((res) => {
                getUser();
                setEditUserClicked(!editUserClick);
                setShowTable(!showTable);
            });
    };

    const goBack = () => {
        setFormData({});
        setShowTable(!showTable);
        if (editUserClick) setEditUserClicked(!editUserClick);
    }

    const Table = () => {
        getUser();
        setShowTable(true);
    }


    const showForm = () => {
        if (!showTable) {
            return (
                <div className="main-div">
                    <div className="form-div">
                        <div className="tilte-div">
                            <h1>Add User</h1>
                        </div>

                        <form>
                            <label>Name</label>
                            <input
                                defaultValue={formData.name}
                                onChange={setName}
                                onFocus={() => checkOnFocusError("nameError")}
                                type={"text"}
                            ></input>
                            {errorName ? (
                                <span className="error">*Please Enter Your Name</span>
                            ) : (
                                ""
                            )}

                            <label>Email</label>
                            <input
                                defaultValue={formData.email}
                                onChange={setEmail}
                                onFocus={() => checkOnFocusError("emailError")}
                                type={"email"}
                            ></input>
                            {errorEmail ? (
                                <span className="error">*Please Enter Your EmailAddress</span>
                            ) : (
                                ""
                            )}
                            <label>Password</label>
                            <input
                                defaultValue={formData.password}
                                onChange={setPassword}
                                onFocus={() => checkOnFocusError("passwordError")}
                                type={getInputType()}
                            ></input>
                            {errorPassword ? (
                                <span className="error">*Please Enter Your Password</span>
                            ) : (
                                ""
                            )}
                            <span onClick={() => toggleInputType()} className="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-eye"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </span>
                        </form>
                        {!editUserClick ? (
                            <>
                                <div className="btn-div">
                                    <button onClick={() => postUser()}>Add User</button>
                                    <span
                                        style={{
                                            fontWeight: "700",
                                            color: "white",
                                            padding: "5px",
                                        }}
                                    >or</span>
                                    <button onClick={() => Table()}>Show Table</button>

                                </div>

                                <div className="route_div">
                                    <span>Allready have an account</span>
                                    <Link to="/">Login</Link>
                                </div>

                            </>

                        ) : (
                            <div className="btn-div">
                                <button onClick={() => editUserApi()}>Edit User</button>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="table_main-div">
                    <div className="table-div">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((val, index) => (
                                    <tr key={index}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <div
                                            className="btn_edit_delete"
                                            style={{
                                                display: "flex",
                                                padding: "10px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "5px",
                                            }}
                                        >
                                            <button
                                                className="delete_btn"
                                                style={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    border: "none",
                                                    outline: "none",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    fontWeight: "600",
                                                }}
                                                onClick={() => deleteUser(index)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => editUser(index)}
                                                className="Edit_btn"
                                                style={{
                                                    backgroundColor: "#267871",
                                                    color: "white",
                                                    border: "none",
                                                    outline: "none",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="btn-div" style={{ marginTop: "5%" }}>
                            <button
                                className="back-btn"
                                onClick={goBack}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>

                </div>
            );
        }
    };
    return (
        <>
            {
                showForm()
            }
            <ToastContainer />
        </>
    );
};

export default AddUser;
