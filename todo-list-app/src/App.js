import React, { useState, useEffect } from 'react';
import { Container, Typography, List } from '@mui/material';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      let temp = []
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].title)
        temp.push(response.data[i].title)
      }
      setTodos(temp);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = (todo) => {
    // let tempTodos = fetchTodos()
    console.log("tempTodos")
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
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
          <Todo key={index} todo={todo} deleteTodo={() => deleteTodo(index)} />
        ))}
      </List>
    </Container>
  );
}

export default App;
