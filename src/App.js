import React, { Component } from "react";
import CalendarTable from "./components/CalendarTable";
import EventContainer from "./components/EventContainer";
import Header from "./components/Header";
import styled from 'styled-components';

const AppWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 740px;

@media (max-width: 740px) {
    width: 100%;
  }
`

class App extends Component {
  constructor(props) {
    super(props);
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);

    for (let i = 0; i < 24; i++) {
      const currentTime = new Date(startTime.getTime() + i * 60 * 60 * 1000);
      const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      timeSlots.push(formattedTime);
    }

    this.state = {
      daysOfWeek: daysOfWeek,
      timeSlots: timeSlots,
      events: {},
      currentDate: new Date(),
      selectedEventDate: null,
      selectedTimeSlot: null,
    };
  }

  handleAddEvent = () => {
    const eventTime = prompt("Enter event time:\nYYYY-MM-DD HH:mm:ss");
    if (eventTime) {
      const eventDateTime = new Date(eventTime);
      const formattedEventDate = eventDateTime.toISOString().split("T")[0];
      const formattedEventTime = eventDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      this.setState((prevState) => {
        const { events } = prevState;
        const updatedEvents = { ...events };
        if (updatedEvents[formattedEventDate]) {
          updatedEvents[formattedEventDate].push(formattedEventTime);
        } else {
          updatedEvents[formattedEventDate] = [formattedEventTime];
        }
        return { events: updatedEvents };
      });
    }
  };

  handleDeleteEvent = () => {
    const { selectedEventDate, selectedTimeSlot } = this.state;
    if (selectedEventDate && selectedTimeSlot) {
      this.setState((prevState) => {
        const { events } = prevState;
        const updatedEvents = { ...events };
        if (updatedEvents[selectedEventDate]) {
          updatedEvents[selectedEventDate] = updatedEvents[selectedEventDate].filter(
            (time) => time !== selectedTimeSlot
          );
          if (updatedEvents[selectedEventDate].length === 0) {
            delete updatedEvents[selectedEventDate];
          }
        }
        return { events: updatedEvents, selectedTimeSlot: null, selectedEventDate: null };
      });
    }
  };

  handlePreviousWeek = () => {
    this.setState((prevState) => {
      const currentDate = new Date(prevState.currentDate);
      currentDate.setDate(currentDate.getDate() - 7);
      return { currentDate };
    });
  };

  handleNextWeek = () => {
    this.setState((prevState) => {
      const currentDate = new Date(prevState.currentDate);
      currentDate.setDate(currentDate.getDate() + 7);
      return { currentDate };
    });
  };

  handleTimeSlotClick = (timeSlot, eventDate) => {
    this.setState({ selectedEventDate: eventDate, selectedTimeSlot: timeSlot });
  };

  handleTodayClick = () => {
    const today = new Date();

    this.setState({
      currentDate: today,
      selectedEventDate: null,
      selectedTimeSlot: null,
    });
  };

  render() {
    const { daysOfWeek, timeSlots, events, currentDate, selectedTimeSlot, selectedEventDate } = this.state;

    return (
      <AppWrapper>
        <Header
          handleAddEvent={this.handleAddEvent}
        />

        <CalendarTable
          daysOfWeek={daysOfWeek}
          timeSlots={timeSlots}
          events={events}
          currentDate={currentDate}
          selectedTimeSlot={selectedTimeSlot}
          selectedEventDate={selectedEventDate}
          handlePreviousWeek={this.handlePreviousWeek}
          handleNextWeek={this.handleNextWeek}
          handleTimeSlotClick={this.handleTimeSlotClick}
        />

        <EventContainer
          events={events}
          selectedTimeSlot={selectedTimeSlot}
          selectedEventDate={selectedEventDate}
          handleDeleteEvent={this.handleDeleteEvent}
          handleTodayClick={this.handleTodayClick}
        />
      </AppWrapper>
    );
  }
}

export default App;

