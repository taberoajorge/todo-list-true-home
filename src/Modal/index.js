import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
    background-color: rgba(32,35,41,.8);
    position: fixed;
    top: -1rem;
    left: -1rem;
    right: -1rem;
    bottom: -1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
`;


function Modal({ children }) {
  return ReactDOM.createPortal(
      <StyledModal>
        {children}
      </StyledModal>, 
      document.getElementById("modal")
);}

export { Modal };
