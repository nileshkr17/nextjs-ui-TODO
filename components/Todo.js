import { Checkbox, Input, Spacer } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Todo.module.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  useEffect(() => {
    // Load todos from local storage on component mount
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === '') {
      toast.error('Please enter a todo');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');

    toast.success('Todo added successfully');
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    toast.error('Todo deleted successfully');
  };

  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleUpdateTodo = (id) => {
    if (editingTodoText.trim() === '') {
      toast.error('Please enter a todo');
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingTodoText } : todo
    );

    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText('');

    toast.success('Todo updated successfully');
  };

  console.log(todos);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo App</h2>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a todo"
        className={styles.input}
      />
      <Spacer y={0.5} />
      <button onClick={handleAddTodo} className={styles.addButton}>
        Add Todo
      </button>
      <Spacer y={1} />
      <div className={styles.todoGrid}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className={styles.todoCard}>
              {editingTodoId === todo.id ? (
                <>
                  <Input
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                    className={styles.editInput}
                  />
                  <button
                    onClick={() => handleUpdateTodo(todo.id)}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.todoItem}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className={styles.checkbox}
                    >
                      <span className={styles.todoText}>{todo.text}</span>
                    </Checkbox>
                    <div className={styles.todoButtons}>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className={styles.deleteButton}
                      >
                        <AiOutlineDelete />
                      </button>
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                        className={styles.editButton}
                      >
                        <AiOutlineEdit />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className={styles.emptyTodoCard}>
            <p>
              "No tasks yet. Start adding todos and stay productive!" - Unknown
            </p>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" /> {/* Set position to 'bottom-right' */}
    </div>
  );
};

export default Todo;
