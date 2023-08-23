import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Rowadduser = () => {


    const adduser=()=>{
        axios.get(`http://localhost:3000/Users`).then((res)=>{
            console.log(res)
        })
    }
    
  return (
    <div className='aduser_input_div'>
        <button onClick={()=>adduser()}>Add User</button>
        <div className="table_div">
           
        </div>
    </div>
  )
}

export default Rowadduser