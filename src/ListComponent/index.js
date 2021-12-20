import React from 'react';
import styled from 'styled-components';
import {Check} from 'styled-icons/bootstrap/';
import {Delete} from 'styled-icons/fluentui-system-filled/';

const StyleTodoItem = styled.li`
  height: var(--bar-size);
  padding: 1.2rem;
  display: flex;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: var(--text-weigth);
  color: var(--text-color);
`;

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.completed ? 'var(--check)' : 'transparent'};
  border: 0.2rem solid var(--border-color);
  min-width: 2rem;
  width: 2rem;
  height: 2rem;
  position: relative;
  border-radius: 50%;
  & > svg {
    display: ${(props) => (props.completed ? 'block' : 'none')};
    margin: -0.2rem;
  }
`;

const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
`;
const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  & > p {
    text-overflow: ellipsis;
    width: 40rem;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 1rem;
    text-decoration: ${(props) => (props.completed ? 'line-through' : '')};
    color: ${(props) =>
      props.completed ? 'var(--border-color)' : 'var(--text-color)'};
  }
`;

function ListComponent({ text, completed, onComplete, onDelete }) {
  return (
    <StyleTodoItem>
      <StyledCheckBox completed={completed} onClick={onComplete}>
        <StyledButton completed={completed}>
        <Check size={20} color='white'/>
        </StyledButton>
        <p>{text}</p>
      </StyledCheckBox>

      <StyledDeleteButton  onClick={onDelete}>
      <Delete size={20} color='white'/>
      </StyledDeleteButton>
    </StyleTodoItem>
  );
}

export { ListComponent };
