import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
    itemsToLoad,
  } = useLocalStorage("TODOS_V1", []);

  const [toggleModal, setToggleModal] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [warning, setWarning] = React.useState(false);
  const totalTodos = todos.length;

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    if (!newTodos[todoIndex].completed) {
      newTodos[todoIndex].completed = true;
    } else {
      newTodos[todoIndex].completed = false;
    }
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const onOpenModal = () => {
    setToggleModal((prevState) => !prevState);
  };

  const createTodo = (text) => {
    const newTodo = [{ text: text, completed: false }];
    const newTodos = [...newTodo,...todos];
    saveTodos(newTodos);
    onOpenModal();
    setValue("");
  };

  return {
    todos,
    warning,
    setWarning,
    completeTodo,
    deleteTodo,
    createTodo,
    setValue,
    value,
    onOpenModal,
    toggleModal,
    loading,
    error,
    itemsToLoad,
    totalTodos
  };
}

export { useTodos };
