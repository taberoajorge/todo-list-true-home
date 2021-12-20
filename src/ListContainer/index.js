import React from "react";
import { ListComponent } from "../ListComponent/index";
import styled from "styled-components";
import { TodoMaker } from "../TodoMaker";
import { Modal } from "../Modal/index";
import { TodoForm } from "../TodoForm/index";
import { TodoLoading } from "../TodoLoading";

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

function ListContainer() {
  const onError = (error) => {
    dispatch({ type: actionTypes.error, payload: error });
  };
  const onSuccess = (item) => {
    dispatch({ type: actionTypes.success, payload: item });
  };
  const onSave = (item) => {
    dispatch({ type: actionTypes.save, payload: item });
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { todos, error, loading } = state;

  const [toggleModal, setToggleModal] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [warning, setWarning] = React.useState(false);
  const localStorageItem = localStorage.getItem("TODOS_V1");
  const totalTodos = todos.length;

  React.useEffect(() => {
    setTimeout(() => {
      try {
        let parsedItem;
        if (!localStorageItem) {
          localStorage.setItem("TODOS_V1", JSON.stringify([]));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 3000);
  }, []);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem("TODOS_V1", stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    if (!newTodos[todoIndex].completed) {
      newTodos[todoIndex].completed = true;
    } else {
      newTodos[todoIndex].completed = false;
    }
    saveItem(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveItem(newTodos);
  };

  const onOpenModal = () => {
    setToggleModal((prevState) => !prevState);
  };

  const createTodo = (text) => {
    const newTodo = [{ text: text, completed: false }];
    const newTodos = [...newTodo, ...todos];
    saveItem(newTodos);
    onOpenModal();
    setValue("");
  };

  return (
    <React.Fragment>
      {warning && <StyledWarningText>Establece un valor</StyledWarningText>}
      <TodoMaker
        setWarning={setWarning}
        value={value}
        setValue={setValue}
        onOpenModal={onOpenModal}
      />
      <StyledSection>
        <StyledUl>

          {error && <h1>Hubo un error en la carga de Todos</h1>}
          {loading && !error && (<TodoLoading itemsToLoad={JSON.parse(localStorageItem)} />)}
          {!loading && !totalTodos && (<h1>Bienvenidx #TrueHomer <br /> Crea tu primera tarea</h1>)}

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
            value={value}
            createTodo={createTodo}
            onOpenModal={onOpenModal}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.error:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.success:
      return {
        ...state,
        loading: false,
        error: false,
        todos: payload,
      };
    case actionTypes.save:
      return {
        ...state,
        error: false,
        loading: false,
        todos: payload,
      };

    default:
      return state;
  }
};

const initialState = {
  todos: [],
  error: false,
  loading: true,
};

export { ListContainer };
