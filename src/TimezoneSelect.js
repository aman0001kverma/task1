import React, { useState } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';

const TimezoneSelect = () => {
  const [timezone, setTimezone] = useState('UTC'); // Default timezone is UTC

  const handleChange = (event) => {
    setTimezone(event.target.value);
  };

  const getFormattedTime = (timeString) => {
    const utcTime = new Date(timeString);
    const zonedTime = utcToZonedTime(utcTime, timezone);
    return format(zonedTime, 'HH:mm a', { timeZone: timezone });
  };

  // Sample times in UTC and a different timezone
  const timeUTC = '2023-08-02T12:00:00Z'; // UTC time
  const timeOtherZone = '2023-08-02T12:00:00-07:00'; // A different timezone (e.g., UTC-7)

  return (
    <div className='timezone-box'>
      <label htmlFor="timezone-select">Select Timezone: </label>
      <select className="timezone-dropdown" id="timezone-select" value={timezone} onChange={handleChange}>
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New_York</option>
        {/* Add more timezones as needed */}
      </select>
      <div className='timezone-box'>
        <p>Time in UTC: {getFormattedTime(timeUTC)}</p>
        <p>Time in {timezone}: {getFormattedTime(timeOtherZone)}</p>
      </div>
    </div>
  );
};

export default TimezoneSelect;
