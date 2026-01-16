import React from 'react';
import styled from 'styled-components';

const StyledCircle = styled.div`
  border: 0.1rem solid grey;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background: var(--border-color);
`;

const StyledText = styled.div`
  border: 0.1rem solid grey;
  width: 80%;
  height: 1rem;
  border-radius: 0.5rem;
  background: var(--border-color);
`;

const StyledContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;

function TodoLoading({ itemsToLoad }) {
  if (!itemsToLoad) {
    return null;
  } else {
    return (
      <>
        {itemsToLoad.map((todo) => (
          <StyledContainer key={todo.text}>
            <StyledCircle />
            <StyledText />
            <StyledCircle />
          </StyledContainer>
        ))}
      </>
    );
  }
}

export { TodoLoading };
