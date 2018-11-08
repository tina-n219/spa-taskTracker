import React from 'react';

import api from './api';
import store from './store';
import { connect } from 'react-redux';

function TaskList(props) {


    let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} users={props.users} session={props.session} />);
    return <div className="row">
      {tasks}
    </div>;
  }

  // Makes cards for tasks
  function Task(props) {
    let {task, users, session} = props;
    let displayUsers = (user) => {
      return <option key={user.id} value={user.id}>{user.email}</option>
    }

    let timeSpent = session.user_id == task.user_id ?
        <p>Time Spent: <input type="number" id={"editTimeSpent" + task.id} defaultValue={task.duration} step='15'></input></p>
        : null;

    return <div className="card-group  p-3 mb-5 bg-white rounded">
    <div className="card">
        <h4 className="card-header" id="editTitle">{task.title}</h4>
        
        <div className="card-body">
            <p className="card-text" id="editDesc">{task.description}</p>

            <select className="custom-select" defaultValue={task.user_id} id={"editTaskUser" + task.id}>
                {users.map(displayUsers)}
            </select>

            {timeSpent}

            <div className="form-check form-check-inline">
                <label className="form-check-label">Completed?</label>
                <input className="form-check-input" type="checkbox" id={"editTaskStatus" + task.id} defaultChecked={task.completed}></input>
            </div>
            <p></p>
            <button className="btn btn-warning"
                    onClick={() => api.remove_task(task.id)}>Make your problems disappear</button>
            <p></p>

            <button id="taskSaveBtn"  className="btn btn-outline-success" 
                    onClick={() => api.save_task(task.id)}>Save your problems</button>        
        </div>
    </div>  
</div>;
}

function stateToprops(state) {
    console.log("rerender", state);
    return {
      tasks: state.tasks,
      users: state.users,
      session: state.session,
    };
  }
  
  // Export result of curried function call.
  export default connect(stateToprops)(TaskList);