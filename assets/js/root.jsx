import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
    let tasks = window.tasks;
    ReactDOM.render(<Root tasks={tasks} />, node);
  }

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
            users: [],
            session: null,
        };

    console.log("constructor");

    this.fetch_tasks();
    this.fetch_users();
    //this.create_session("tina@example.com", "tinapass415");
    console.log(this.state.session);
    }

    fetch_tasks() {
      console.log("fetch")
        $.ajax("/api/v1/tasks", {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: "",
          success: (resp) => {
            let state1 = _.assign({}, this.state, { tasks: resp.data });
            this.setState(state1);
          },
        });
      }

      fetch_users() {
        $.ajax("/api/v1/users", {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: "",
          success: (resp) => {
            let state1 = _.assign({}, this.state, { users: resp.data });
            this.setState(state1);
          },
        });
      }
      
      create_session(email, password) {
        $.ajax("/api/v1/sessions", {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({email, password}),
          success: (resp) => {
            let state1 = _.assign({}, this.state, { session: resp.data });
            this.setState(state1);
          }
        });
      }

render() {
  if(this.state.session == null) {
    return <div>
      <Router>
        <Login session={this.state.session} />
      </Router>
  </div>;
  }
  else { 
    return <div>
      <Router>   
          <div>
            <Header root={this} />
          </div> 
          <Route path="/" exact={true} render={() =>
            <TaskList tasks={this.state.tasks} />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
      </Router>
    </div>;
    }
  }
} 

function Header(props) {
  let {root} = props;
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"}>Task Tracker !</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-6">
      <p> User: {this.session.user_id}</p>
      {/* <Login session={props.session} />  SHOULD BE LOGOUT*/}
    </div>
  </div>;

  }

  function Login(props) {
      return <form>
      <h1>Task Tracker !</h1>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
      </div>
      
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
      </div>
        
      <button type="submit" class="btn btn-primary">Submit</button>

      <p>Not Registered? <Link to={"/"}>Register</Link></p>

    </form>;
    
  }

  function TaskList(props) {
    let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
    return <div className="row">
      {tasks}
    </div>;
  }

  function Task(props) {
    let {task} = props;
    return <div className="card col-4">
      <div className="card-body">
        <h4 className="card-title">{task.title}</h4>
        <p className="card-text">{task.description}</p>
        <p className="card-text">Time Spent: {task.duration}</p>
        <p className="card-text">Completed: {task.completed ? "yes" : "no"}</p>

      </div>
    </div>;
  }

  function UserList(props) {
    let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
    return <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>;
  }

   function User(props) {
    let {user} = props;
    return <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
    </tr>;
  }
  