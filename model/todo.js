const pool = require('./database');

/** The application will have the ability to create a task,
 * display the list of tasks, and delete tasks.
 * Each of these functionalities correlates with the following
 * CRUD REST API functions: create, read, and delete.
 * We’ll create a model for the todo list that will contain
 * To keep our connection to the database open in our Node.js
 * application we’ll need to create a connection pool.
 * In model/todo.js, create a const variable called pool to connect the SQL database.
 * */

// Path: model/todo.js
// Create a task
// The first thing we’ll do is create a function to add a task to the database.
// This function will take in a task name and a callback function.
// The callback function will be called with an error if there is one,
// or with the result of the query.

/**
Let’s create a function that will insert a description into the todo table.

Define a function called create that takes in description as its argument
and creates an entry in the todo database table.
Inside the function, use the .query() method on
pool to pass in the below SQL query:
*/

const create = (description, callback) => {
  const query = {
    text: 'INSERT INTO todo (description) VALUES ($1)',
    values: [description],
  };
  pool.query(query, callback);
};

/**
Next, we’ll create a function called get that will read all the tasks in the todo table.
Similar to how we created the create() function, use the .query() method on the pool object.
Inside the .query() method, pass in the below SQL code to select all items in the todo table:
*/
const get = (callback) => {
  const query = {
    text: 'SELECT * FROM todo',
  };
  pool.query(query, callback);
};

/** Finally, create a function called remove that takes id as its
 * argument to search for a to-do item to remove from the todo table.
 * We will use the .query() method here as well. Inside the argument of the .query() method,
 * pass in the below SQL code to find an item where todo_id of the todo table is equal to id:
 * */
const remove = (id, callback) => {
  const query = {
    text: 'DELETE FROM todo WHERE todo_id = $1',
    values: [id],
  };
  pool.query(query, callback);
};

module.exports = {
  create,
  get,
  remove,
};
