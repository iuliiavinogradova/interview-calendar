import React from "react";
import styled from 'styled-components';

const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 740px;
  margin: 0 auto;
  overflow: auto;

@media (max-width: 740px) {
  width: 100%;
  }
`
const AddEventButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  color: #ff3131;
  cursor: pointer;
  border: none;
  background-color: #fff;
`;

const AppIntro = styled.p`
  font-size: large;
`

const Header = ({ handleAddEvent }) => {
  return (
    <AppHeader>
      <AppIntro>Interview Calendar</AppIntro>
      <AddEventButton onClick={handleAddEvent}>
        +
      </AddEventButton>
    </AppHeader>
  );
};

export default Header;


