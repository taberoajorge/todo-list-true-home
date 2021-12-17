import React from "react";
import styled from "styled-components";

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
    props.completed ? "var(--check)" : "transparent"};
  border: 0.2rem solid var(--border-color);
  width: 2rem;
  height: 2rem;
  position: relative;
  border-radius: 50%;
  & > svg {
    display: ${(props) => (props.completed ? "block" : "none")};
    margin: auto;
  }
`;

const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
`;
const StyledCheckBox = styled.div`
  display: flex;
  & > p {
    margin-left: 1rem;
    text-decoration: ${(props) => (props.completed ? "line-through" : "")};
    color: ${(props) =>
      props.completed ? "var(--border-color)" : "var(--text-color)"};
  }
`;

function ListComponent({ text, completed, onComplete, onDelete }) {
  return (
    <StyleTodoItem>
      <StyledCheckBox completed={completed} onClick={onComplete}>
        <StyledButton completed={completed}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <path fill="transparent" stroke="#fff" d="M1 4.304L3.696 7l6-6" />
          </svg>
        </StyledButton>
        <p>{text}</p>
      </StyledCheckBox>

      <StyledDeleteButton  onClick={onDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </StyledDeleteButton>
    </StyleTodoItem>
  );
}

export { ListComponent };
