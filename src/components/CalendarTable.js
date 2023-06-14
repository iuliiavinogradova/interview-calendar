import React from "react";
import styled from 'styled-components';
import CalendarNavigation from "./CalendarNavigation";

const TableContainer = styled.div`
  overflow: auto;
  max-height: calc(100vh - 100px);
  width: 740px;
  margin: 0 auto;

@media (max-width: 740px) {
    width: 100%;
  }
`

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
`

const TableHeader = styled.thead``;

const TableRow = styled.tr`
  position: sticky;
  top: 0px;
  background-color: #f6f6f6;
  z-index: 0;
  border: none;
`

const Row = styled.tr`
`
const Weekday = styled.div`
  font-size: x-small;
  padding: 15px;
`

const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: center;
  background-color: #f6f6f6;
  border: none;
  position: sticky;

  &.sticky {
    position: sticky;
    top: 0;
    background-color: #f6f6f6;
    z-index: 1;
  }

  &.weekday {
    position: relative;
  }

  &.weekday::before {
    content: '';
    position: absolute;
    top: 0;
    left: -5000px;
    height: 100%;
    width: 10000px;
    z-index: -1;
  }
`;


const TimeCell = styled.td`
  color: #cecece;
  padding: 8px;
  text-align: center;
`

const TableBody = styled.tbody``;

const WeekdayCell = styled.td`
  /* Styles for default weekday cell */
  min-height: 40px; 
  min-width: 40px;
  cursor: pointer;
  border: 1px solid #cecece;
  padding: 8px;
  text-align: center;

    &.event {
    /* Styles for event weekday cell */
    background-color: #ebecff;
    cursor: pointer;
  }

  &.selected {
    /* Styles for selected weekday cell */
    background-color: #b3b7ff;
    cursor: pointer;
  }
`;

const DateHighlight = styled.div`
  /* CSS styles for .table-container .date.highlighted */
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 30px;
    margin: 0 auto; 
  &.highlighted {
    color: white;
    background-color: #ff3131;

  }

`;

const CalendarTable = ({
  daysOfWeek,
  timeSlots,
  events,
  currentDate,
  selectedTimeSlot,
  selectedEventDate,
  handlePreviousWeek,
  handleNextWeek,
  handleTimeSlotClick,
}) => {



  const weekDay = currentDate.getDay();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth();

  const DayHeaderCell = ({ day, dayOfMonth }) => (
    <TableHeaderCell className="weekday sticky">
      <Weekday>{day}</Weekday>
      <DateHighlight className={isCurrentMonth && dayOfMonth === new Date().getDate() ? "highlighted" : ""}>
        {dayOfMonth}
      </DateHighlight>
    </TableHeaderCell>
  );

  const DayCell = ({ time, offset, formattedDate }) => {
    const eventTimes = events[formattedDate] || [];
    let classNameCell = "weekday-cell";
    if (selectedTimeSlot === time && selectedEventDate === formattedDate) {
      classNameCell = "weekday-cell selected";
    } else if (eventTimes.includes(time)) {
      classNameCell = "weekday-cell event";
    }

    return (
      <WeekdayCell
        className={classNameCell}
        onClick={() => handleTimeSlotClick(time, formattedDate)}
      />
    );
  };

  const dayItems = daysOfWeek.map((day, index) => {
    const offset = (index + 1) - weekDay;
    const date = new Date(year, month, currentDate.getDate() + offset);
    const dayOfMonth = date.getDate();

    return <DayHeaderCell key={index} day={day} dayOfMonth={dayOfMonth} />;
  });

  const tableRows = timeSlots.map((time, index) => {
    const timeSlotCells = daysOfWeek.map((day, index) => {
      const offset = (index + 2) - weekDay;
      const date = new Date(year, month, currentDate.getDate() + offset);
      const formattedDate = date.toISOString().split("T")[0];

      return <DayCell key={index} time={time} offset={offset} formattedDate={formattedDate} />;
    });

    return (
      <Row key={index}>
        <TimeCell>{time}</TimeCell>
        {timeSlotCells}
      </Row>
    );
  });

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className="sticky" />
            {dayItems}
          </TableRow>
          <CalendarNavigation
            currentDate={currentDate}
            handlePreviousWeek={handlePreviousWeek}
            handleNextWeek={handleNextWeek}
          />
        </TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CalendarTable;
