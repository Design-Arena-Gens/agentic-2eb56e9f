'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Plus, Trash2, Check, Moon, Sun, Heart } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  priority?: 'low' | 'medium' | 'high'
  aiSuggestion?: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [showAiSuggestion, setShowAiSuggestion] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const aiSuggestions = [
    "Remember to take breaks and hydrate! 💧",
    "You're doing amazing! Keep going! ✨",
    "Break this task into smaller steps for easier progress",
    "Consider setting a timer for focused work sessions",
    "Don't forget to celebrate your small wins! 🎉",
    "Maybe delegate this if you're feeling overwhelmed",
    "Schedule this for your most productive time of day",
    "You've got this! One step at a time 💪",
    "Consider pairing this with something you enjoy",
    "Remember: progress over perfection! 🌸"
  ]

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input,
        completed: false,
        priority: 'medium',
        aiSuggestion: aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
      }
      setTodos([newTodo, ...todos])
      setInput('')
      setCurrentSuggestion(newTodo.aiSuggestion || '')
      setShowAiSuggestion(true)
      setTimeout(() => setShowAiSuggestion(false), 5000)
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getAiInsight = () => {
    const insights = [
      `You have ${todos.filter(t => !t.completed).length} tasks to conquer today! 🌟`,
      `You've completed ${todos.filter(t => t.completed).length} tasks! You're unstoppable! 💫`,
      "Focus on one task at a time - you've got this! 💪",
      "Your productivity is inspiring! Keep shining! ✨",
      "Remember to take care of yourself while being productive 💖"
    ]
    return insights[Math.floor(Math.random() * insights.length)]
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="header">
          <div className="header-content">
            <div className="title-section">
              <Sparkles className="sparkle-icon" />
              <h1 className="title">Bloom</h1>
            </div>
            <p className="subtitle">Your AI-Powered Productivity Companion</p>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {showAiSuggestion && (
          <div className="ai-suggestion">
            <Sparkles size={16} />
            <span>{currentSuggestion}</span>
          </div>
        )}

        <div className="ai-insight">
          <Heart size={18} />
          <p>{getAiInsight()}</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What would you like to accomplish today?"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            <Plus size={24} />
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{todos.filter(t => !t.completed).length}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{todos.filter(t => t.completed).length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>

        <div className="todos-list">
          {todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <button
                onClick={() => toggleTodo(todo.id)}
                className="check-button"
              >
                {todo.completed && <Check size={16} />}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <Sparkles size={48} />
            <p>Start your productive day!</p>
            <p className="empty-subtitle">Add your first task above</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sparkle-icon {
          color: #ffd700;
          animation: sparkle 2s infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .title {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
        }

        .theme-toggle {
          position: absolute;
          top: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s;
        }

        .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(20deg);
        }

        .ai-suggestion {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 1rem;
          border-radius: 15px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideIn 0.5s ease-out;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ai-insight {
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem;
          border-radius: 15px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .ai-insight p {
          margin: 0;
          color: #667eea;
          font-weight: 500;
        }

        .input-section {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .todo-input {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 15px;
          font-size: 1rem;
          background: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          outline: none;
        }

        .add-button {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border: none;
          border-radius: 15px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .add-button:hover {
          transform: scale(1.05);
        }

        .stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          flex: 1;
          background: white;
          padding: 1rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.25rem;
        }

        .todos-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .todo-item {
          background: white;
          padding: 1rem;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .todo-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .todo-item.completed {
          opacity: 0.6;
        }

        .check-button {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #667eea;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .todo-item.completed .check-button {
          background: #667eea;
          color: white;
        }

        .todo-text {
          flex: 1;
          color: #333;
          font-size: 1rem;
        }

        .todo-item.completed .todo-text {
          text-decoration: line-through;
        }

        .delete-button {
          background: transparent;
          border: none;
          color: #f5576c;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 8px;
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .delete-button:hover {
          background: rgba(245, 87, 108, 0.1);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: white;
        }

        .empty-state p {
          margin: 1rem 0 0 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .empty-subtitle {
          font-size: 1rem !important;
          opacity: 0.8;
          font-weight: 400 !important;
        }

        .dark .todo-input,
        .dark .stat-card,
        .dark .todo-item,
        .dark .ai-insight {
          background: rgba(255, 255, 255, 0.95);
        }

        @media (max-width: 640px) {
          .title {
            font-size: 2.5rem;
          }

          .stats {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
