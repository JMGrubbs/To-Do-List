const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@The1299the',
  database: 'todo_list',
  waitForConnections: true,
  connectionLimit: 10,
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    await pool.query('INSERT INTO todos (title) VALUES (?)', [title]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update the completion status of a todo
app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
