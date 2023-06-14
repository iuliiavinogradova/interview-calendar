const DayCell = ({ time, offset, formattedDate }) => {
    const eventTimes = events[formattedDate] || [];
    let classNameCell = "weekday-cell";
    if (eventTimes.includes(time)) {
        classNameCell = "weekday-cell event";
    } else if (selectedTimeSlot === time && selectedEventDate === formattedDate) {
        classNameCell = "weekday-cell selected";
    }

    return (
        <WeekdayCell
            className={classNameCell}
            onClick={() => handleTimeSlotClick(time, formattedDate)}
        />
    );
};