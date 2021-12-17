import React from "react";
import { useTodos } from "./useTodos";
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

const StyledNotification = styled.h1`



`;

function ListContainer() {
  const {
    completeTodo,
    deleteTodo,
    setValue,
    toggleModal,
    todos,
    createTodo,
    onOpenModal,
    value,
    warning,
    setWarning,
    error,
    loading,
    itemsToLoad,
    totalTodos
  } = useTodos();
  console.log(itemsToLoad);
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
          
          {error && <StyledNotification>Hubo un error en la carga de Todos</StyledNotification>}

          {loading && <TodoLoading itemsToLoad={itemsToLoad}/>}

          {!loading && !totalTodos && <StyledNotification>Bienvenidx #TrueHomer <br/> Crea tu primera tarea</StyledNotification>}

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
