import React, { useState } from 'react';
import '../App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import CycleLengthSelector from './CycleLengthSelector.jsx'
import moment from 'moment'; // Import moment


const OvulationCycleCalculator = () => {
 const [firstDayOfLastPeriod, setFirstDayOfLastPeriod] = useState('');
 const [averageLengthOfCycles, setAverageLengthOfCycles] = useState('28');
 const [nextPeriodDate, setNextPeriodDate] = useState(null);
 const [ovulationDate, setOvulationDate] = useState(null);

 
 const calculateFertileWindow = () => {
    
  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 3);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);
  return { start: fertileWindowStart, end: fertileWindowEnd };
};

 const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to calculate the ovulation cycle
    const cycleLength = parseInt(averageLengthOfCycles);
    const lastPeriodDate = new Date(firstDayOfLastPeriod);
    const nextPeriod = new Date(lastPeriodDate);
    nextPeriod.setDate(lastPeriodDate.getDate() + cycleLength);
    const ovulation = new Date(nextPeriod);
    ovulation.setDate(nextPeriod.getDate() - 14);

    setNextPeriodDate(nextPeriod);
    setOvulationDate(ovulation);

    console.log('First Day of Last Period:', firstDayOfLastPeriod);
    console.log('Average Length of Cycles:', averageLengthOfCycles);
    console.log("Ovulation Date",ovulation);
    console.log("Next Period Date",nextPeriod);
 };



 return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white bg-opacity-40 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Ovulation Cycle Calculator</h2>
        <div className="mb-4">
          <label htmlFor="firstDayOfLastPeriod" className="block text-sm font-medium text-gray-700">First Day of Your Last Period</label>
          <input
            type="date"
            id="firstDayOfLastPeriod"
            value={firstDayOfLastPeriod}
            onChange={(e) => setFirstDayOfLastPeriod(e.target.value)}
            className="mt-1 block px-3 py-2 w-full rounded-md bg-opacity-40 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="averageLengthOfCycles" className="block text-sm font-medium text-gray-700">Average Length of Cycles</label>
          <CycleLengthSelector
            id="averageLengthOfCycles"
            value={averageLengthOfCycles}
            onChange={(value) => setAverageLengthOfCycles(value)}
            className="mt-1 block w-full px-2 py-2 rounded-md bg-opacity-40 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-pink-700 bg-gradient-to-b">Calculate</button>
      </form>
      {nextPeriodDate && ovulationDate && (
        <div className="mt-4">
          <h3  className="font-bold text-pink-900">Next Period: <Moment format="Do MMMM YYYY">{nextPeriodDate}</Moment></h3>
          <h3 className="font-bold text-pink-900">Ovulation Day: <Moment format="Do MMMM YYYY">{ovulationDate}</Moment></h3>
          <br/>
          <h3 className="text-1xl font-bold text-pink-950">Ovulation Windows: </h3>
          <p className='font-bold text-pink-900'>Start: <Moment format="Do MMMM YYYY">{calculateFertileWindow().start}</Moment></p>
          <p className='font-bold text-pink-900'>End: <Moment format="Do MMMM YYYY">{calculateFertileWindow().end}</Moment></p>
          <Calendar
              className="text-pink-800 font-semibold hover:text-pink-60 mt-4"
              value={new Date()}
              tileClassName={({ date, view }) => {
                  // Convert both dates to strings in a consistent format for comparison
                  const fertileWindow = calculateFertileWindow();
                  const formattedDate = moment(date).format("DD-MM-YYYY");
                  const formattedStartDate = moment(fertileWindow.start).format("DD-MM-YYYY");
                  const formattedEndDate = moment(fertileWindow.end).format("DD-MM-YYYY");
                  // No need to use .includes() here, directly compare dates
  
                  if (formattedDate >= formattedStartDate && formattedDate <= formattedEndDate) {
                    return 'highlight'; // Apply the highlight class
                  }
              }}
              />
        </div>
      )}
    </div>
 );
};

export default OvulationCycleCalculator;
