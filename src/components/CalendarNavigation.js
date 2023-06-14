import React from "react";
import styled from 'styled-components';

const NavigationRow = styled.tr`
  position: sticky;
  top: 82px;
  background-color: #f6f6f6;
  z-index: 1;
  border: none;
`
const NavigationData = styled.td`
border: none;
`
const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavigationButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #ff3131;
`

const NavigationDate = styled.div`
  flex: 1;
  text-align: center;
`
const NavigationCell = styled.td`
  position: relative;

    &::before,
  {
    content: '';
    position: absolute;
    top: 0;
    left: -5000px;
    height: 100%;
    width: 10000px;
    z-index: -1;
  }
`

const NavigationButtonContainer = styled.div`
flex: 1;
text-align: ${({ isLastChild }) => (isLastChild ? 'right' : 'left')};;`

const CalendarNavigation = ({ currentDate, handlePreviousWeek, handleNextWeek }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <NavigationRow>
      <NavigationData></NavigationData>
      <NavigationCell colSpan={7}>
        <Navigation>
          <NavigationButtonContainer>
            <NavigationButton onClick={handlePreviousWeek}>
              &lt;
            </NavigationButton>
          </NavigationButtonContainer>
          <NavigationDate>
            {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          </NavigationDate>
          <NavigationButtonContainer isLastChild>
            <NavigationButton onClick={handleNextWeek}>
              &gt;
            </NavigationButton>
          </NavigationButtonContainer>
        </Navigation>
      </NavigationCell>
    </NavigationRow>
  );
};

export default CalendarNavigation;
