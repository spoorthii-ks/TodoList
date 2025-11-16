const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

// Use singular, conventional model name 'Todo' (collection will be 'todos')
const TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;