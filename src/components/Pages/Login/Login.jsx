import React from 'react'
import '../../../CSS/login.css'

const Login = () => {
    return (
        <div className='login_parent_div'>
            <div className="login_subparent_div">
            <div className="login_heading_div">
                <h1 className="login_heading">Login</h1>
            </div>
            <div className="login_div">
                <form action="">
                    <input type="text" className="input_field" />
                    <input type="password" className="input_field" />
                    <div className="btn_div">
                         <button >Login</button>
                    </div>
                </form>
            </div>
            </div>
        
        </div>
    )
}

export default Login
