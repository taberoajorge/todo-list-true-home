import React from 'react';
import { ListComponent } from '../ListComponent/index';
import styled from 'styled-components';
import { TodoMaker } from '../TodoMaker';
import { Modal } from '../Modal/index';
import { TodoForm } from '../TodoForm/index';
import { TodoLoading } from '../TodoLoading';

const StyledSection = styled.section`
  list-style: none;
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  height: 50vh;
`;
const StyledUl = styled.ul`
  height: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
  & > h1 {
    padding: 3rem;
    font-size: 3rem;
    text-align: center;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.1rem;
  }
`;
const StyledWarningText = styled.p`
  width: 15rem;
  font-size: 1.5rem;
  background-color: red;
  position: relative;
  top: -0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const StyledNotification = styled.h1``;

function ListContainer() {
  function useLocalStorage(itemName, initialValue) {
    const [item, setItem] = React.useState(initialValue);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [itemsToLoad] = React.useState(
      JSON.parse(localStorage.getItem(itemName))
    );

    React.useEffect(() => {
      setTimeout(() => {
        try {
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
          if (!localStorageItem) {
            localStorage.setItem('TODO_V1', JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageItem);
          }
          setLoading(false);

          setItem(parsedItem);
        } catch (error) {
          setError(error);
        }
      }, 3000);
    }, []);

    const saveItem = (newItem) => {
      try {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
      } catch (error) {
        setError(error);
      }
    };
    return {
      item,
      saveItem,
      loading,
      error,
      itemsToLoad,
    };
  }

  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
    itemsToLoad,
  } = useLocalStorage('TODOS_V1', []);

  const [toggleModal, setToggleModal] = React.useState(false);
  const [value, setValue] = React.useState('');
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
    const newTodos = [...newTodo, ...todos];
    saveTodos(newTodos);
    onOpenModal();
    setValue('');
  };


  return (
    <>
      {warning && <StyledWarningText>Establece un valor</StyledWarningText>}
      <TodoMaker
        setWarning={setWarning}
        value={value}
        setValue={setValue}
        onOpenModal={onOpenModal}
        createTodo={createTodo}
      />
      <StyledSection>
        <StyledUl>
          {error && (
            <StyledNotification>
              Hubo un error en la carga de Todos
            </StyledNotification>
          )}

          {loading && <TodoLoading itemsToLoad={itemsToLoad} />}

          {!loading && !totalTodos && (
            <StyledNotification>
              Bienvenidx #TrueHomer <br /> Crea tu primera tarea
            </StyledNotification>
          )}

          {todos.map((todo) => (
            <ListComponent
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
            />
          ))}
        </StyledUl>
      </StyledSection>

      {toggleModal && (
        <Modal>
          <TodoForm
            setValue={setValue}
            value={value}
            createTodo={createTodo}
            onOpenModal={onOpenModal}
          />
        </Modal>
      )}
    </>
  );
}

export { ListContainer };
