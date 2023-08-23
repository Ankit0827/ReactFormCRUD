import React from 'react'
import '../../../CSS/userData.css'
import Fileupload from '../../fileupload/Fileupload'

const Userdata = (props) => {
  console.log(props.data)
  return (
    <div className="parent_userdata_div">
      <h1>Welcome back {props.data.name}!</h1>
      <div className="tabel">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.data.id}</td>
              <td>{props.data.name}</td>
              <td>{props.data.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="profile_div">
           <div className="profile_header_div1">gg</div>
           <div className="user_profileData_div">mehdguygf</div>
           <Fileupload/>
      </div>
    </div>

  )
}

export default Userdata
