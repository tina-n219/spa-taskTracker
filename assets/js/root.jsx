import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import store from './store';
import Header from './header';
import Login from './login';
import UserList from './user_list';
import TaskList from './task_list';
import api from './api';

export default function root_init(node) {
  let ConnectedRoot = connect(stateToProps)(Root);
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRoot tasks={window.tasks} />
    </Provider>, node);
  }

class Root extends React.Component {
    constructor(props) {
        super(props);
        // this.props = {
        //     tasks: props.tasks,
        //     users: [],
        //     session: null,
        // };

    api.fetch_tasks();
    api.fetch_users();
    }

render() {
  // Map of users that exists in database
  let displayUsers = (user) => {
    return <option key={user.id} value={user.id}>{user.email}</option>
  }

  // If the session is null, aka no one is logged in, show login page
  if(this.props.session == null) {
    return <div>
      <Router>
        <Login session={this.props.session}/>
      </Router>
    </div>;
  }

  // Otherwise, show the tasks homepage
  else { 
    return <div>
    <Router>
      <div>
        <Header />
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
                {this.props.users.map(displayUsers)}
              </select>
            </div>
            
          </form>
          <button className="btn btn-primary" onClick={() => api.create_task()}>It's your problem now</button>
        </div>
        <p></p>
      </div>

        {/* Displays tasks existing in database */}
        <Route path="/" exact={true} render={() =>
          <TaskList tasks={this.props.tasks} users={this.props.users} />
        } />

        {/* Displays the existing users in the databse, under the route /users */}
        <Route path="/users" exact={true} render={() =>
          <UserList users={this.props.users} />
        } />
      </div>
    </Router>
  </div>;
    }
  }
} 

// this state is the state in redux, which will be used as props in react components
function stateToProps(state) {
  return state;
}
  

  