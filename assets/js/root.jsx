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

      remove_task(id) {
        $.ajax("/api/v1/tasks/" + id, {
          method: "delete",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: "",
          success: (_resp) => {
            let tasks1 = _.filter(this.state.tasks, (item) => item.id != id);
            let state1 = _.assign({}, this.state, { tasks: tasks1 });
            this.setState(state1);
          }
        });
      }

      create_task() {
        console.log("create Task");
        let title = $('#taskTitle').val();
        let desc = $('#taskDesc').val();

        $.ajax("/api/v1/tasks", {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({task: {title: title, description: desc}}),
          success: (resp) => {
            let task1 = _.concat(this.state.tasks, [resp.data]);
            let state1 = _.assign({}, this.state, { tasks: task1 });
            this.setState(state1);
          },
        });
      }

      save_task(taskId) {
        let editTime = $('#editTimeSpent' + taskId).val();
        let editUser = $('#editTaskUser' + taskId).val();
        let editStatus = $('#editTaskStatus' + taskId).val();
        let editTitle = $('#editTitle' + taskId).val();
        let editDesc = $('#editDesc' + taskId).val();

        console.log(editStatus);

        $.ajax("/api/v1/tasks/" + taskId, {
          method: "put",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({task: {title: editTitle, description: editDesc, 
                completed: editStatus, duration: editTime, user_id: editUser}}),
          success: (resp) => {
            let task1 = _.concat(this.state.tasks, [resp.data]);
            let state1 = _.assign({}, this.state, { tasks: task1 });
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

      create_session() {
        let email = $('#userEmail').val();
        let password = $('#userPassword').val();

        $.ajax("/api/v1/sessions", {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({email: email, password: password}),
          success: (resp) => {
            console.log("login");
            let state1 = _.assign({}, this.state, { session: resp.data });
            this.setState(state1);
          }
        });
      }

      logout_user() {
        console.log("logout")
        let state1 = _.assign({}, this.state, { session: null });
        this.setState(state1);
      }

      registerAccount() {
        let email = $('#regUser').val();
        let pass = $('#regPassword').val();

        let newuser = {email: email, password_hash: pass};

        $.ajax("/api/v1/users", {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({user: newuser}),
          success: (resp) => {
            console.log("succussful registration");
            let state1 = _.assign({}, this.state, { session: resp.data });
            this.setState(state1);
          }
        });
      }




render() {
  let displayUsers = (user) => {
    return <option key={user.id} value={user.id}>{user.email}</option>
  }

  if(this.state.session == null) {
    return <div>
      <Router>
        <Login session={this.state.session} root={this} />
      </Router>
  </div>;
  }
  else { 
    return <div>
    <Router>
      <div>
        <Header root={this} />
        <div>
          <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#newTask" aria-expanded="false" aria-controls="collapseExample">
          Add New Task Yo - Mo Problems
        </button>  
        <p></p>
      </div>

      <div className="collapse" id="newTask">
        <div className="card card-body">
          <h2>Create a New Problem</h2>
          <form>
            <div>
              <input type="text" className="form-control" id="taskTitle" placeholder="Title" aria-label="Task Title" aria-describedby="basic-addon2"></input>
              <p></p>
            </div>

            <div>
              <textarea className="form-control" id="taskDesc" placeholder="Description" aria-label="With textarea"></textarea>
              <p></p>
            </div>  

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Assign To</label>
              </div>
              <select className="custom-select" id="assignedTo">
                {this.state.users.map(displayUsers)}
              </select>
            </div>
            
          </form>
          <button className="btn btn-primary" onClick={() => this.create_task()}>It's your problem now</button>
        </div>
        <p></p>
      </div>

        <Route path="/" exact={true} render={() =>
          <TaskList tasks={this.state.tasks} users={this.state.users} root={this} />
        } />
        <Route path="/users" exact={true} render={() =>
          <UserList users={this.state.users} />
        } />
      </div>
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
      <p><Link to={"/users"} className="btn btn-primary" onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-4">
     <button className="btn btn-dark" onClick={root.logout_user.bind(root)}>Logout</button>
    </div>
  </div>;

  }

  function Login(props) {
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

  function TaskList(props) {
    let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} users={props.users} root={props.root} />);
    return <div className="row">
      {tasks}
    </div>;
  }

  function Task(props) {
    let {root, task, users} = props;
    let displayUsers = (user) => {
      return <option key={user.id} value={user.id}>{user.email}</option>
    }

    return <div className="card col-4">
      <div className="card-body">

        <h4 className="card-title" id="editTitle">{task.title}</h4>
        <p className="card-text" id="editDesc">{task.description}</p>

        Time Spent: <input type="number" id={"editTimeSpent" + task.id} defaultValue={task.duration} step='15'></input>

        <select className="custom-select" id={"editTaskUser" + task.id}>
          {users.map(displayUsers)}
        </select>


        <div className="form-check form-check-inline">
          <label className="form-check-label">Completed?</label>
          <input className="form-check-input" type="checkbox" id={"editTaskStatus" + task.id} defaultValue={task.completed}></input>
        </div>

        <button className="btn btn-warning"
             onClick={() => root.remove_task(task.id)}>Make your problems disappear</button>
             <p></p>

        <button id="taskSaveBtn"  className="btn btn-outline-success" 
              onClick={() => root.save_task(task.id)}>Save your problems</button>        
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
  