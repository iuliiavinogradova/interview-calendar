import React from "react";
import styled from 'styled-components';

const EventWrapper = styled.div`
  background-color: #f6f6f6;
  color: #ff3131;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 740px;
  overflow: auto;
  margin: 0 auto;

@media (max-width: 740px) {
    width: 100%;
  }
`

const EventButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  color: #ff3131;
  cursor: pointer;
  border: none;
  background-color: #f6f6f6;
`;


const EventContainer = ({
  events,
  selectedTimeSlot,
  selectedEventDate,
  handleDeleteEvent,
  handleTodayClick
}) => {
  const isTimeslotHasEvent = selectedTimeSlot && selectedEventDate && events[selectedEventDate]?.includes(selectedTimeSlot);

  return (
    <EventWrapper>
      <EventButton onClick={handleTodayClick}>Today</EventButton>
      {isTimeslotHasEvent && (
        <EventButton onClick={handleDeleteEvent}>
          Delete
        </EventButton>
      )}
    </EventWrapper>
  );
};

export default EventContainer;
