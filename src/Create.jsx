import React, { useState } from 'react'
import axios from 'axios'

function Create({ onTaskAdded }) {
  const [task, setTask] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!task.trim()) {
      setMessage('Please enter a task')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('/api/todos', { task: task })
      setTask('') // Clear input
      setMessage('Task added successfully!')
      if (onTaskAdded) onTaskAdded()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error(err)
      setMessage('Failed to add task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Add a new task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <button type="button" onClick={handleAdd} disabled={loading}>
        {loading ? <span className="spinner small" /> : 'Add'}
      </button>
      {message && (
        <div
          className={
            message.includes('success')
              ? 'success-message'
              : 'error-message'
          }
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default Create
