import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <TextField
        label="Add a new todo"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: '10px' }}
      />
      <Button variant="contained" onClick={handleAddTodo} sx={{ backgroundColor: '#1565c0', color: '#fff' }}>
        Add
      </Button>
    </div>
  );
};

export default TodoForm;
