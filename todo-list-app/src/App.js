import React, { useState, useEffect } from 'react';
import { Container, Typography, List } from '@mui/material';
import TodoForm from './components/ToDo/TodoForm';
import Todo from './components/ToDo/Todo';
import {fetchTodos, deleteTodoAPI, createTodoAPI} from './components/ToDo/TodoAPI';
import config from './config.json';

function App() {
  const [todos, setTodos] = useState([]);
  const [configAPI, setConfigAPI] = useState(null);
  
  useEffect(() => {
    setConfigAPI(config);
    fetchTodos(config).then(retTodos => {
      let convertedList = []
      Object.keys(retTodos).map(key => {
        let todoObject = retTodos[key]
        convertedList.push([todoObject["id"], todoObject["title"]]);
        return null; // return null to remove warning
      });
      setTodos(convertedList)
    })
  }, []);

  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodoAPI(todo, configAPI);
      setTodos((prevTodos) => [...prevTodos, [newTodo.id, todo]]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };
  const deleteTodo = (stateIndex, todoId) => {
    deleteTodoAPI(todoId, configAPI)
    const updatedTodos = todos.filter((_, i) => i !== stateIndex);
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>
      <TodoForm addTodo={addTodo} />
      <List>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo[1]} deleteTodo={() => deleteTodo(index, todo[0])} />
        ))}
      </List>
    </Container>
  );
}

export default App;
