import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";

function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const [updatingIds, setUpdatingIds] = useState(new Set())
  const [deletingIds, setDeletingIds] = useState(new Set())

  const toggleCompleted = async (id, current) => {
    // optimistic UI: mark updating
    setUpdatingIds((s) => new Set(s).add(id))
    try {
      const res = await axios.patch(`/api/todos/${id}`, { completed: !current })
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)))
    } catch (err) {
      console.error('Error updating todo:', err)
    } finally {
      setUpdatingIds((s) => {
        const copy = new Set(s)
        copy.delete(id)
        return copy
      })
    }
  };

  const deleteTodo = async (id) => {
    // optimistic remove
    setDeletingIds((s) => new Set(s).add(id))
    const previous = todos
    setTodos((prev) => prev.filter((t) => t._id !== id))
    try {
      await axios.delete(`/api/todos/${id}`)
    } catch (err) {
      console.error('Error deleting todo:', err)
      // rollback
      setTodos(previous)
    } finally {
      setDeletingIds((s) => {
        const copy = new Set(s)
        copy.delete(id)
        return copy
      })
    }
  }

  return (
    <div className="home">
      <div className="card">
        <div className="todo-container">
          <h2 className="title">Todo List</h2>
          <Create onTaskAdded={fetchTodos} />
          {todos.length === 0 ? (
            <h3 className="norecord">You’re all caught up! 🎉</h3>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo._id || index}
                className={`todo_item ${todo.completed ? 'completed' : ''}`}
              >
                <label className="todo_row">
                  <input
                    type="checkbox"
                    checked={!!todo.completed}
                    onChange={() => toggleCompleted(todo._id, todo.completed)}
                    disabled={updatingIds.has(todo._id)}
                  />
                  <span className="todo_text">{todo.task}</span>
                </label>
                <div className="todo_actions">
                  {deletingIds.has(todo._id) ? (
                    <span className="spinner small" />
                  ) : (
                    <button className="trash" onClick={() => deleteTodo(todo._id)}>🗑️</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
