import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 30rem;
  background-color: var(--secondary-color);
  border: none;
  height: 13rem;
  margin-left: 5rem;
  margin-right: 5rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;

`;
const StyledLabel = styled.label`
  color: var(--text-color);
  font-size: 1.8rem;
  display:flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  color: var(--text-color);
  border-radius: 0.5rem;
  background: none;
  border: 1px solid var(--border-color);
  margin: 1rem auto;
  padding: 1rem;

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--border-color);
  }
`;
const StyledButton = styled.button`
  margin-left: 1rem;
  width: 7rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--border-color);
  color: var(--text-color);
  background-color: var(--border-color);
`;



function TodoForm({ onOpenModal, createTodo, value}) {

    const onCreateTodo = (event) => {
    event.preventDefault()
    createTodo(event.currentTarget.elements.todo.value)
  };

  return (
    <StyledForm onSubmit={onCreateTodo}>
      <StyledLabel htmlFor='todo'>
        <span>Estas seguro de crear esta tarea?</span>
        <StyledInput
          type='text'
          id='todo'
          defaultValue={value}
        />
        
        <div>
        <StyledButton onClick={() => onOpenModal()} type='button'>
          Cancelar
        </StyledButton>
        <StyledButton type='submit' >Crear</StyledButton>
        </div>
        
      </StyledLabel>
    </StyledForm>
  );
}

export { TodoForm };
