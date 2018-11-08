import React from 'react';

export default function Login (props) {
// Login page
let {root} = props;
console.log(root);
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

<button  className="btn btn-primary" onClick={root.create_session.bind(root)}>Submit</button>

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
    <button className="btn btn-primary" onClick={root.registerAccount.bind(root)}>Create Account</button>
    </div> 
</div>
</div>;    
  

}