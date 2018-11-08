import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './api';

export default function Header() {
  
    return <div className="row my-2">
      <div className="col-4">
        <h1><Link to={"/"}>Task Tracker !</Link></h1>
      </div>
      <div className="col-2">
        <p><Link to={"/users"} className="btn btn-primary" onClick={api.fetch_users}>Users</Link></p>
      </div>
      <div className="col-4">
       <button className="btn btn-dark" onClick={api.logout_user}>Logout</button>
      </div>
    </div>;
  
    }