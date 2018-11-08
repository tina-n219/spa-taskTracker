import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function Header(props) {
    let {root} = props;
  
    return <div className="row my-2">
      <div className="col-4">
        <h1><Link to={"/"}>Task Tracker !</Link></h1>
      </div>
      <div className="col-2">
        <p><Link to={"/users"} className="btn btn-primary" onClick={root.fetch_users.bind(root)}>Users</Link></p>
      </div>
      <div className="col-4">
       <button className="btn btn-dark" onClick={root.logout_user.bind(root)}>Logout</button>
      </div>
    </div>;
  
    }