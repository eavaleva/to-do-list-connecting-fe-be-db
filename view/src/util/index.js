/**
 * Now that we have connected our application’s model and controller components,
 * we can move on to the view directory.
 * Inside view/src, create a util directory and create an index.js file where
 * we will create three exported functions that will perform the API calls to the Controller.
 *
 * To start, create and export a function called createTodo that performs
 * a POST method to the route that we created for task creation.
 * The function should take todo as its argument which
 * will contain the contents of the new form.
 */

export const createTodo = async (todo) => {
  try {
    const response = await fetch('api/todo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

/**
 * Next, create and export another function called getTodos that also
 * performs a GET request to get all the existing entries in the todo database.
 */

export const getTodos = async () => {
  try {
    const res = await fetch('api/todos');
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

/**
 * Finally, let’s create and export a function called removeTodo that
 * performs a DELETE request.
 * The function should take id as its argument to delete the row that
 * matches the received id from the todo table.
 */
export const removeTodo = async (id) => {
  try {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });
    return 'deleted';
  } catch (error) {
    return { error };
  }
};
