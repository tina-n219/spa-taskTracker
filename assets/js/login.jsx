import React from 'react';

import api from './api'

export default function Login () {
// Login page
    return <div>
<form>
    <h1>Task Tracker !</h1>

    <div className="form-group">
    <label>Email address</label>
    <input type="email" className="form-control" id="userEmail" 
            aria-describedby="emailHelp" placeholder="Enter email"></input>
    </div>
    
    <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" 
            id="userPassword" placeholder="Password"></input>
    </div>
</form>

<button  className="btn btn-primary" onClick={api.create_session}>Submit</button>

<p>Not Registered?</p> 
<button className="btn btn-primary" type="button" data-toggle="collapse" 
        data-target="#registerUser" aria-expanded="false" aria-controls="collapseExample">
    Register
</button>

{/* Drop down for registering as a new user */}
<div className="collapse" id="registerUser">
    <div className="card card-body">
    <label>Email</label>
    <form>
    <input type="email" className="form-control" id="regUser" 
            placeholder="Email" aria-label="Task Title" aria-describedby="basic-addon2"></input>
        <p></p>
    <label>Password</label>
    <input type="password" className="form-control" id="regPassword" placeholder="Password"></input>
        <p></p>
    </form>  
    <button className="btn btn-primary" onClick={api.registerAccount}>Create Account</button>
    </div> 
</div>
</div>;    
  

}