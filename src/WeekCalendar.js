import React from 'react';
import CheckboxDay from './CheckboxDay';
import { format, addDays, startOfWeek } from 'date-fns';

const WeekCalendar = ({ currentDate }) => {
  const days = [];
  const weekStart = startOfWeek(currentDate);

  // Add Sunday and Monday at the beginning of the days array
  for (let i = 0; i < 2; i++) {
    const date = addDays(weekStart, i);
    days.push({ date: format(date, 'MM/dd'), dayOfWeek: format(date, 'EEE') });
  }

  // Add the rest of the days (Tuesday to Saturday)
  for (let i = 2; i < 7; i++) {
    const date = addDays(weekStart, i);
    days.push({ date: format(date, 'MM/dd'), dayOfWeek: format(date, 'EEE') });
  }

  return (
    <div className="week-calendar">
      {days.map((day) => (
        <CheckboxDay key={day.date} date={day.date} dayOfWeek={day.dayOfWeek} />
      ))}
    </div>
  );
};

export default WeekCalendar;
