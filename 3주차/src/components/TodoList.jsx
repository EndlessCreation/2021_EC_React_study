import React, { useRef, useState } from "react";
import styles from "./TodoList.module.css";
import { useHistory } from "react-router-dom";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      content: "테스트1",
      done: true,
    },
    {
      id: 2,
      content: "테스트2",
      done: false,
    },
    {
      id: 3,
      content: "테스트3",
      done: false,
    },
  ]);
  const inputRef = useRef();
  const history = useHistory();

  const createTodo = (content) => {
    if (content === "") return;
    setTodoList(
      todoList.concat({ id: Date.now(), content: content, done: false })
    );
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const toggledTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const editTodo = (id, content) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createTodo(inputRef.current.value);
    }
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoForm}>
        <button
          className={styles.logoutButton}
          onClick={() => {
            history.push("/");
          }}
        >
          로그아웃
        </button>
        <div className={styles.todoList}>
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggledTodo={toggledTodo}
              editTodo={editTodo}
            />
          ))}
        </div>

        <div className={styles.createTodoForm}>
          <input type="text" ref={inputRef} onKeyPress={handleKeyPress} />
          <button
            onClick={() => {
              createTodo(inputRef.current.value);
            }}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
