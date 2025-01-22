import React, { useState } from 'react';
import TodoTypes from '../todo';
import TodoService from '../TodoService';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>('');

  // Function to handle canceling edit action
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  // Function to handle saving edited todo
  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== '') {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      setEditingTodoId(null);
      setEditedTodoText('');
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Function to toggle completed status
  const handleToggleComplete = (id: number) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (todoToToggle) {
      const updatedTodo = TodoService.updateTodo({
        ...todoToToggle,
        completed: !todoToToggle.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    }
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>

      {todos.map((todo) => (
        <div className={`items ${todo.completed ? 'completed' : ''}`} key={todo.id}>
          {editingTodoId === todo.id ? (
            <div className="editedText">
              <input
                type="text"
                value={editedTodoText}
                onChange={(e) => setEditedTodoText(e.target.value)}
                autoFocus={true}
              />

              <button onClick={() => handleEditSave(todo.id)}>
                <FaCheck />
              </button>

              <button className="cancelBtn" onClick={handleEditCancel}>
                <GiCancel />
              </button>
            </div>
          ) : (
            <div className="editBtn">
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => handleToggleComplete(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => {
                  setEditingTodoId(todo.id);
                  setEditedTodoText(todo.text);
                }}
              >
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>
                <RiDeleteBin5Fill />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
