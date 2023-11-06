import styled from "styled-components";

export const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const StyledGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  background-color: #8901a4;
  border-radius: 0.25rem;
  padding: 2rem;
  box-shadow: 0 0 20px 0 rgb(0, 0, 0);
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin: 1rem;
`;

export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 1rem;
`;

export const StyledRoundDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid black;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 20px 0 rgb(0, 0, 0);
  }
`;

export const StyledButton = styled.button`
  font-family: "Press Start 2P", cursive; /* Inherit the same font as the game */
  background-color: #d98d00;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b36200;
  }
`;
