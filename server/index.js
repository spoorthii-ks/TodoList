// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -------------------
// MongoDB Connection
// -------------------
mongoose
  .connect('mongodb://localhost:27017/demo')
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// -------------------
// Legacy Routes (for compatibility)
// -------------------
app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;
    const doc = await TodoModel.create({ task });
    return res.status(201).json(doc);
  } catch (err) {
    console.error('Insert error:', err);
    return res.status(500).json({ error: err.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find().sort({ _id: -1 });
    return res.json(todos);
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// -------------------
// Modern RESTful API Routes
// -------------------

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { task } = req.body;
    const doc = await TodoModel.create({ task });
    return res.status(201).json(doc);
  } catch (err) {
    console.error('API insert error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find().sort({ _id: -1 });
    return res.json(todos);
  } catch (err) {
    console.error('API fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Update completion status (toggle checkbox)
app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updated = await TodoModel.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    return res.json(updated);
  } catch (err) {
    console.error('API update error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await TodoModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// -------------------
// Server Start
// -------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
