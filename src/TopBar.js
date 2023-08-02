import React from 'react';
import { format, parse } from 'date-fns';

const TopBar = ({ currentDate, handlePreviousWeek, handleNextWeek }) => {
  // Parse the current date string to a Date object using the DD/MM/YYYY format
  const parsedDate = parse(currentDate, 'dd/MM/yyyy', new Date());

  // Format the date to "MMM DD YYYY" format
  const formattedDate = format(parsedDate, 'MMM, dd yyyy');

  return (
    <div className="top-bar">
      <button className="nav-button" onClick={handlePreviousWeek}>⯇Previous Week </button>
      <h1 className='top-date'>{formattedDate}</h1>
      <button className="nav-button" onClick={handleNextWeek}>Next Week⯈</button>
    </div>
  );
};

export default TopBar;
