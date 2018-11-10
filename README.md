#Design
The Task Tracker, an app to track tasks....

Don't have an account? You can register as a new user with an email and password and then gain access to this ground breaking application. We are all about that security, so we store your password as a hash(it isn't your password, but is like a unique key pointing to you) in our database and refer back to that for user authentication. 

As a user, you can create, view, delete, and mark tasks as complete. You may only write the time it takes to complete a task if you are the user the given task has been assigned to.

Design choices:

When logged in, you immediately see all the current tasks. The information presented is the task title, description, status, and assigned user.

When creating a task, I chose to only make the task title, description, and assigned user inputs available at this time.

When editing, if you are the same user that the task is assigned to will you, and only you, be able to see and fill out the time it took to complete that task.

When choosing to assign a user to a task, I put in a drop down select menu which shows only the registered users because I want the task to only be assigned to an exisiting user.

#New Features
This version of the task tracker has been built as a single page application, with only one full page load. I used Redux to manage client-side application/UI state.

We have HTTPS because security!

To start your Phoenix server:

Install dependencies with mix deps.get
Create and migrate your database with mix ecto.create && mix ecto.migrate
Install Node.js dependencies with cd assets && npm install
Start Phoenix endpoint with mix phx.server
Now you can visit localhost:4000 from your browser.