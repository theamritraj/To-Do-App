import React, { Dispatch, SetStateAction, useState } from 'react';
import TodoService from '../TodoService';
import TodoTypes from '../todo';

import "../css/TodoForm.css";
import "../css/TodoList.css";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>('');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (newTodoText.trim() !== '') {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText('');
    }
  };

  return (
    <form className="inputForm" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a Task"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;