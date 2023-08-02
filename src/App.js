import React, { useState, useEffect } from 'react';
import { addWeeks, subWeeks, format } from 'date-fns';
import TopBar from './TopBar';
import WeekCalendar from './WeekCalendar';
import TimezoneSelect from './TimezoneSelect';

import CheckboxDay from './CheckboxDay';
import './styles.css';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const ParentComponent = () => {
    const [checkboxData, setCheckboxData] = useState({});
  
    useEffect(() => {
   
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
  }

  


  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  return (
    <div className="App">
      <TopBar
        currentDate={format(currentDate, 'dd/MM/yyyy')}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
      />
      <TimezoneSelect/>
      <WeekCalendar currentDate={currentDate} />
    </div>
  );
};

export default App;
