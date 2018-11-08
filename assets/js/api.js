
import store from './store';

class TheServer {
// Gets the tasks in the database via ajax
fetch_tasks() {
    console.log("fetch")
      $.ajax("/api/v1/tasks", {
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: (resp) => {
            console.log(resp);
            store.dispatch({
                type: 'FETCH_TASKS',
                data: resp.data,
            });
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
            this.fetch_tasks();
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
            this.fetch_tasks();
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
            this.fetch_tasks();
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
          store.dispatch({
              type: 'FETCH_USERS',
              data: resp.data,
          })
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
            store.dispatch({
                type: 'CREATE_SESSION',
                data: resp.data,
            });
        }
      });
    }

    // Triggered when users presses logout button
    // Sets session to null, which will then take you back to login page. 
    logout_user() {
        store.dispatch({
            type:'LOGOUT',
            data: null,
        })
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
            store.dispatch({
                type: 'CREATE_SESSION',
                data: resp.data,
            });
        }
      });
    }
}

export default new TheServer();