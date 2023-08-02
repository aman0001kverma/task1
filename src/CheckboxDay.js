import React, { useState, useEffect } from 'react';
import { isSameDay, format, parse } from 'date-fns';

const CheckboxDay = ({ date, dayOfWeek }) => {
  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '7:00 PM', '7:30 PM','8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM',
  ];

  // Check if the day is Sunday or Saturday to exclude checkboxes
   const isSundayOrSaturday = dayOfWeek === 'Sun' || dayOfWeek === 'Sat';
   const currentDate = new Date();
   const parsedDate = parse(date, 'MM/dd', new Date());


   // Check if the current date is the same as the displayed date
   const isCurrentDate = isSameDay(currentDate, parsedDate);

   const [checkboxData, setCheckboxData] = useState({});
   useEffect(() => {
    // Function to read JSON data from the file
    const readCheckboxData = async () => {
      try {
        const response = await fetch('/checkboxesData.json');
        const data = await response.json();
        setCheckboxData(data);
      } catch (error) {
        console.error('Error reading JSON data:', error);
      }
    };

    readCheckboxData();
  }, []);

  // Function to handle checkbox click
  const handleCheckboxClick = (event) => {
    const { id, checked } = event.target;
    setCheckboxData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };

  // Function to save checkbox data to JSON file
  const saveCheckboxData = async () => {
    try {
      const response = await fetch('/checkboxesData.json', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkboxData),
      });
      // Handle response if needed
    } catch (error) {
      console.error('Error saving JSON data:', error);
    }
  };

  // Save the checkbox data on component update
  useEffect(() => {
    saveCheckboxData();
  }, [checkboxData]);

  return (
    <div className="checkbox-day" style={{ backgroundColor: isCurrentDate ? '#b873b8' : '#7252c3' }} >
      <div className="day-info" style={{ backgroundColor: isCurrentDate ? '#b873b8' : '#7252c3' }}>
        <h3 className="colord">{dayOfWeek}</h3>
        <h3 className='datecolor'>{date}</h3>
        
      </div>
      <div className="checkboxes">
        {!isSundayOrSaturday &&
          <>
            <div className="checkbox-row">
              {timeSlots.slice(0, 8).map((timeSlot) => (
                <div key={timeSlot}>
                  <input type="checkbox" id={`${date}-${timeSlot}`} checked={checkboxData[`${date}-${timeSlot}`] || false}
                    onChange={handleCheckboxClick}/>
                  <label htmlFor={`${date}-${timeSlot}`}>{timeSlot}</label>
                </div>
              ))}
            </div>
            <div className="checkbox-row">
              {timeSlots.slice(8, 19).map((timeSlot) => (
                <div key={timeSlot}>
                  <input type="checkbox" id={`${date}-${timeSlot}`} checked={checkboxData[`${date}-${timeSlot}`] || false}
                    onChange={handleCheckboxClick} /> 
                  <label htmlFor={`${date}-${timeSlot}`}>{timeSlot}</label>
                </div>
              ))}
            </div>
            <div className="checkbox-row">
              {timeSlots.slice(19, 28).map((timeSlot) => (
                <div key={timeSlot}>
                  <input type="checkbox" id={`${date}-${timeSlot}`} checked={checkboxData[`${date}-${timeSlot}`] || false}
                    onChange={handleCheckboxClick} />
                  <label htmlFor={`${date}-${timeSlot}`}>{timeSlot}</label>
                </div>
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default CheckboxDay;





































