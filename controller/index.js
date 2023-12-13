const formidable = require('formidable');
const { create, get, remove } = require('../model/todo');

/**
In order to save tasks to the todo database,
we’ll need to process the data passed in with the request.

To start, create an exported middleware function called
create for adding tasks to the todo database that receives REST API
request and response data. The function should receive req and res as
its arguments and should use formidable to parse the received form data
to check to see if the description field is received. If description is received,
use the imported create function to add a new entry to the todo database.
If the description field does not exist, return an error.

Since the focus of this tutorial is on using the MVC model,
not validating forms using formidable,
take a look at the hint for an example of the create middleware function.
 */

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { description } = fields;
    // check for all fields
    if (!fields.description) {
      return res.status(400).json({
        error: 'Description is required',
      });
    }
    try {
      const newTask = await create(description);
      return res.status(201).send({ data: newTask.rows[0] });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  });
};

/**
Next, let’s add another exported async function called read for fetching
all existing items in the todo database.
The function should take req and res as its arguments and use the get()
function to return all rows of the table as a response. */

exports.read = async (req, res) => {
  try {
    const task = await get();
    return res.json({ data: task.rows });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

/**
Finally, create an exported async function called removeTodo for
deleting a task from the todo database.
The function will take req and res as its arguments and use the remove()
function that we created in model/todo.js to match and delete
the row with the received id.
*/

exports.removeTodo = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await remove(id);
    return res.status(200).send({ data: id });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
