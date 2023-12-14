import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import styled from 'styled-components';
import { getTodos, createTodo, removeTodo } from './util';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #87CEFA;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const TodoList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const TodoItem = styled.li`
  background-color: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState();

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodoList(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoId = uuidv4();
      const newTodo = {
        todo_id: todoId,
        description: todo.description,
        created_at: new Date().toISOString(),
      };
      await createTodo(newTodo);
      setTodo({ description: '' });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <AppContainer>
      <Title>To-Do List</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={todo.description}
          onChange={(event) => setTodo({ ...todo, description: event.target.value })}
        />
        <Button type="submit">Add Task</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TodoList>
        {todoList.map((todoItem) => (
          <TodoItem key={todoItem.todo_id} onClick={() => handleDelete(todoItem.todo_id)}>
            {todoItem.description}
          </TodoItem>
        ))}
      </TodoList>
    </AppContainer>
  );
};

export default App;
