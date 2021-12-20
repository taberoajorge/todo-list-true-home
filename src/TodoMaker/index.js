import React from 'react';
import styled from 'styled-components';
import {AddToQueue} from 'styled-icons/boxicons-regular/';
const StyledCreateInput = styled.input`
  width: 100%;
  background-color: var(--secondary-color);
  border: none;
  height: var(--bar-size);
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--text-color);
  font-size: 1.8rem;

  &::placeholder {
    color: var(--border-color);
  }
  &:focus-visible {
    outline: none;
  }
  &:disabled {
    opacity: 25%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  position: relative;
  top: -1rem;
  align-items: center;

  & > button {
    border: none;
    background: transparent;
    position: absolute;
    right: 1rem;
    color: var(--text-color);
  }
`;


function TodoMaker({ onOpenModal, value, setValue, setWarning }) {
  const onType = ({target: {value}}) => {
    setWarning(false);
    setValue(value);
  };
  const OnClickButton = () => {
    if (!value) {
      setWarning(true);
    } else {
      onOpenModal();
    }
  };
  
  return (
    <section>
      <StyledForm onSubmit={(event)=> event.preventDefault()}>
        <StyledCreateInput placeholder='Crea tu tarea!' value={value} onChange={onType} autoComplete='off' />
        <button onClick={OnClickButton} type='submit'>
        <AddToQueue size={20} color='white'/>
        </button>
      </StyledForm>
    </section>
  );
}

export { TodoMaker };
