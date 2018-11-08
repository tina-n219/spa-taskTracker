import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

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
    return state;
  }
  
  function users(state = [], action) {
    return state;
  }
  
  function session(state = null, action) {
    return state;
  }

  
  