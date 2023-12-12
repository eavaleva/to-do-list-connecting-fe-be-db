/**
Next, create a todo.js file inside the directory. Inside the file,
require express and the functions that we created in the controller/index.js
file (create, read, removeTodo). Also, declare a router variable to initialize
the router object using the .Router() method.
 */

// require express and it's router component
const express = require('express');

const router = express.Router();

// require the middlewares and callback functions from the controller directory
const { create, read, removeTodo } = require('../controller');

/**
 Next, we will create routes for POST, GET, and DELETE.
 The POST route should handle requests from '/todo/create',
 the GET route from '/todos', and the DELETE route from '/todo/:id'.
 */
// Create POST route to create an todo
router.post('/todo/create', create);
// Create GET route to read an todo
router.get('/todos', read);
// Create DELETE route to remove an todo
router.delete('/todo/:id', removeTodo);
// Lastly, make sure to export the router to make it available to the rest of our application.
module.exports = router;
