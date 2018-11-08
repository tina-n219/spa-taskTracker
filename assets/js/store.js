import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import _ from 'lodash';

/*
  Application state layout
  {
    tasks: props.tasks, // List of Tasks
    users: [], // List of User
    session: null, // { token, user_id }
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
    switch(action.type) {
        case 'FETCH_TASKS':
            return action.data;

        // case 'CREATE_TASK':
            
        case 'REMOVE_TASK':
            return _.filter(state, (item) => item.id != action.taskId);
        // case 'SAVE_TASK':

        default:
            return state;    
        }
}
  
  function users(state = [], action) {
    switch (action.type) {
        case 'FETCH_USERS':
          return action.data;

        case 'REGISTER_ACCOUNT':
            return action.data;

        default:
          return state;
        }
  }
  
  function session(state = null, action) {
      switch(action.type) {
          case 'CREATE_SESSION':
            return action.data;
          case 'LOGOUT':
            state = null;
            return state;
          default:
            return state;
      }
  }

  function root_reducer(state0, action) {
    console.log("reducer", state0, action);
  
    let reducer = combineReducers({tasks, users, session});
    let state1 = reducer(state0, action);
  
    console.log("reducer1", state1);
  
    return deepFreeze(state1);
  }
  
  let store = createStore(root_reducer);
  export default store;


