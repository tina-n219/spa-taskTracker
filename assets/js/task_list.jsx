import React from 'react';

export default function TaskList(props) {
    let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} users={props.users} root={props.root} />);
    return <div className="row">
      {tasks}
    </div>;
  }

  // Makes cards for tasks
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

        <select className="custom-select" defaultValue={task.user_id} id={"editTaskUser" + task.id}>
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