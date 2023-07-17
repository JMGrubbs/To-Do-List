import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

const Todo = ({ todo, deleteTodo }) => {
  return (
    <ListItem alignItems="center">
      <ListItemText primary={todo} />
      <ListItemSecondaryAction>
        <Button edge="end" aria-label="delete" onClick={deleteTodo} sx={{ backgroundColor: '#1565c0', color: '#fff' }}>
          Delete
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
