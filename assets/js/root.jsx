import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './header';
import Login from './login';
import UserList from './user_list';
import TaskList from './task_list';

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

    this.fetch_tasks();
    this.fetch_users();
    }

  // Gets the tasks in the database via ajax
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

    // Remove a task from the database
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

    // Create a new task and add it to the database
    // Title is only required
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

    // Triggered when a user presses save button
    // Save any edits made to a task
    save_task(taskId) {
      let editTime = $('#editTimeSpent' + taskId).val();
      let editUser = $('#editTaskUser' + taskId).val();
      let editStatus = $('#editTaskStatus' + taskId).val() === "on";
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
          let copy = this.state.tasks.slice(0);
          let taskIndex = this.state.tasks.findIndex((task) => task.id == taskId);
          copy[taskIndex] = resp.data;
          let state1 = _.assign({}, this.state, { tasks: copy });
          this.setState(state1);
        },
      });
    }

    // Gets the users from the database via ajax
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

    // Create a session when a user puts in login info
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

    // Triggered when users presses logout button
    // Sets session to null, which will then take you back to login page. 
    logout_user() {
      console.log("logout")
      let state1 = _.assign({}, this.state, { session: null });
      this.setState(state1);
    }

    // Triggeres when a user presses register button
    // Adds a user to database
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
  // Map of users that exists in database
  let displayUsers = (user) => {
    return <option key={user.id} value={user.id}>{user.email}</option>
  }

  // If the session is null, aka no one is logged in, show login page
  if(this.state.session == null) {
    return <div>
      <Router>
        <Login session={this.state.session} root={this} />
      </Router>
    </div>;
  }

  // Otherwise, show the tasks homepage
  else { 
    return <div>
    <Router>
      <div>
        <Header root={this} />
        <div>
          <button className="btn btn-primary" type="button" data-toggle="collapse" 
                  data-target="#newTask" aria-expanded="false" aria-controls="collapseExample">
          Add New Task Yo - Mo Problems
        </button>  
        <p></p>
      </div>

      {/* Drop down for creating a new task */}
      <div className="collapse" id="newTask">
        <div className="card card-body">
          <h2>Create a New Problem</h2>
          <form>
            <div>
              <input type="text" className="form-control" id="taskTitle" 
                    placeholder="Title" aria-label="Task Title" aria-describedby="basic-addon2"></input>
              <p></p>
            </div>

            <div>
              <textarea className="form-control" id="taskDesc" 
                        placeholder="Description" aria-label="With textarea"></textarea>
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

        {/* Displays tasks existing in database */}
        <Route path="/" exact={true} render={() =>
          <TaskList tasks={this.state.tasks} users={this.state.users} root={this} />
        } />

        {/* Displays the existing users in the databse, under the route /users */}
        <Route path="/users" exact={true} render={() =>
          <UserList users={this.state.users} />
        } />
      </div>
    </Router>
  </div>;
    }
  }
} 

  

  