import React, { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import CycleLengthSelector from './CycleLengthSelector.jsx'
import moment from 'moment';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


const OvulationCycleCalculator = () => {
 const [firstDayOfLastPeriod, setFirstDayOfLastPeriod] = useState('');
 const [averageLengthOfCycles, setAverageLengthOfCycles] = useState('28');
 const [nextPeriodDate, setNextPeriodDate] = useState(null);
 const [ovulationDate, setOvulationDate] = useState(null);
 const [showThreeMonths, setShowThreeMonths] = useState(false);
 const printAreaRef = useRef(null);

 const createDateFromInput = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
 };

 const addDays = (date, days) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate;
 };
 
 const calculateFertileWindow = () => {
  const fertileWindowStart = addDays(ovulationDate, -3);
  const fertileWindowEnd = addDays(ovulationDate, 1);
  return { start: fertileWindowStart, end: fertileWindowEnd };
};

 const calculateCyclePrediction = (cycleIndex) => {
    const cycleLength = parseInt(averageLengthOfCycles);
    const lastPeriodDate = createDateFromInput(firstDayOfLastPeriod);
    const nextPeriod = addDays(lastPeriodDate, cycleLength * (cycleIndex + 1));
    const ovulation = addDays(nextPeriod, -14);

    return {
      nextPeriod,
      ovulation,
      fertileWindow: {
        start: addDays(ovulation, -3),
        end: addDays(ovulation, 1),
      },
    };
 };

 const getCalendarMonths = () => {
    if (!ovulationDate) {
      return [];
    }

    const monthCount = showThreeMonths ? 3 : 1;
    return Array.from({ length: monthCount }, (_, index) => (
      new Date(ovulationDate.getFullYear(), ovulationDate.getMonth() + index, 1)
    ));
 };

 const getVisiblePredictions = () => {
    if (!ovulationDate) {
      return [];
    }

    return Array.from({ length: showThreeMonths ? 5 : 1 }, (_, index) => calculateCyclePrediction(index));
 };

 const isInFertileWindow = (date) => {
    return getVisiblePredictions().some(({ fertileWindow }) => (
      moment(date).isBetween(fertileWindow.start, fertileWindow.end, 'day', '[]')
    ));
 };

 const handleDownloadPdf = async () => {
    if (!printAreaRef.current) {
      return;
    }

    printAreaRef.current.classList.add('pdf-exporting');

    let canvas;
    try {
      canvas = await html2canvas(printAreaRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
    } finally {
      printAreaRef.current.classList.remove('pdf-exporting');
    }

    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 12;
    const imageWidth = pageWidth - margin * 2;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;
    let heightLeft = imageHeight;
    let position = margin;

    pdf.addImage(imageData, 'PNG', margin, position, imageWidth, imageHeight);
    heightLeft -= pageHeight - margin * 2;

    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft - imageHeight + margin;
      pdf.addImage(imageData, 'PNG', margin, position, imageWidth, imageHeight);
      heightLeft -= pageHeight - margin * 2;
    }

    pdf.save('cycle-snapshot.pdf');
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstDayOfLastPeriod) {
      return;
    }

    const cycleLength = parseInt(averageLengthOfCycles);
    const lastPeriodDate = createDateFromInput(firstDayOfLastPeriod);
    const nextPeriod = new Date(lastPeriodDate);
    nextPeriod.setDate(lastPeriodDate.getDate() + cycleLength);
    const ovulation = new Date(nextPeriod);
    ovulation.setDate(nextPeriod.getDate() - 14);

    setNextPeriodDate(nextPeriod);
    setOvulationDate(ovulation);
    setShowThreeMonths(false);
 };



 return (
    <main id="calculator" className="sparkle-field flex min-h-screen flex-col items-center justify-center px-4 pb-10 pt-28">
      <section className="w-full max-w-5xl">
        <div className="app-intro mb-8 max-w-2xl text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">A softer way to map your month</p>
          <h1 className="mt-2 text-4xl font-bold text-pink-950 sm:text-5xl">Window Planner</h1>
          <p className="mt-3 text-base leading-7 text-gray-700">Pick the first day of your last period and your usual cycle length. We will sketch the next period, ovulation day, and fertile window into one calm little calendar.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px),1fr] lg:items-start">
      <form onSubmit={handleSubmit} className="no-print rounded-lg border border-pink-100 bg-white/95 p-6 text-left shadow-xl shadow-pink-900/10">
        <h2 className="mb-5 text-xl font-bold text-pink-950">Your monthly clues</h2>
        <div className="mb-5">
          <label htmlFor="firstDayOfLastPeriod" className="block text-sm font-semibold text-gray-800">First day of your last period</label>
          <input
            type="date"
            id="firstDayOfLastPeriod"
            value={firstDayOfLastPeriod}
            onChange={(e) => setFirstDayOfLastPeriod(e.target.value)}
            required
            className="mt-2 block h-12 w-full rounded-md border border-pink-200 bg-white px-3 text-base text-gray-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="averageLengthOfCycles" className="block text-sm font-semibold text-gray-800">Average cycle length</label>
          <CycleLengthSelector
            id="averageLengthOfCycles"
            value={averageLengthOfCycles}
            onChange={(value) => setAverageLengthOfCycles(value)}
            className="mt-2 block h-12 w-full rounded-md border border-pink-200 bg-white px-3 text-base text-gray-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100"
          />
        </div>
        <p className="mb-5 rounded-md border border-teal-100 bg-teal-50 px-3 py-2 text-sm leading-5 text-teal-900">
          Dates are calculated in your browser and are not saved.
        </p>
        <button type="submit" className="w-full rounded-md bg-pink-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-pink-900/10 transition hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-200">Reveal my window</button>
      </form>
      {nextPeriodDate && ovulationDate && (
        <div ref={printAreaRef} className={`print-area rounded-lg border border-pink-100 bg-white/95 p-6 shadow-xl shadow-pink-900/10 ${showThreeMonths ? 'lg:col-span-2' : ''}`}>
          <div className="pdf-header mb-6 border-b border-pink-100 pb-4 text-left">
            <h1 className="text-2xl font-bold text-pink-950">Here are your cycles</h1>
            <p className="mt-1 text-sm font-semibold text-pink-700">Your cycle snapshot, mapped with care.</p>
            <p className="mt-1 text-sm text-gray-700">Your calendar did the math, so you can save your brain cells for snacks.</p>
            <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <p><span className="font-semibold text-gray-900">Generated:</span> <Moment format="Do MMMM YYYY">{new Date()}</Moment></p>
              <p><span className="font-semibold text-gray-900">Cycle length:</span> {averageLengthOfCycles} days</p>
            </div>
          </div>
          <div className="mb-4 rounded-md border border-pink-100 bg-pink-50 p-4 text-left">
            <p className="text-sm font-semibold text-pink-700">Your likely fertile window is</p>
            <p className="mt-1 text-lg font-bold text-pink-950"><Moment format="Do MMMM YYYY">{calculateFertileWindow().start}</Moment> to <Moment format="Do MMMM YYYY">{calculateFertileWindow().end}</Moment>.</p>
          </div>
          <div className="grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-md border border-pink-100 bg-pink-50 p-4">
              <p className="text-sm font-semibold text-pink-700">Next period</p>
              <h3 className="mt-1 text-lg font-bold text-pink-950"><Moment format="Do MMMM YYYY">{nextPeriodDate}</Moment></h3>
            </div>
            <div className="rounded-md border border-teal-100 bg-teal-50 p-4">
              <p className="text-sm font-semibold text-pink-700">Ovulation day</p>
              <h3 className="mt-1 text-lg font-bold text-pink-950"><Moment format="Do MMMM YYYY">{ovulationDate}</Moment></h3>
            </div>
            <div className="rounded-md border border-violet-100 bg-violet-50 p-4 sm:col-span-2">
              <p className="text-sm font-semibold text-gray-700">Fertile window</p>
              <p className="mt-1 font-bold text-gray-950"><Moment format="Do MMMM YYYY">{calculateFertileWindow().start}</Moment> to <Moment format="Do MMMM YYYY">{calculateFertileWindow().end}</Moment></p>
            </div>
          </div>
          <div className="mt-5 grid gap-4">
            {getCalendarMonths().map((monthDate) => (
              <div key={monthDate.toISOString()} className="rounded-lg border border-pink-100 bg-white p-4 shadow-sm shadow-pink-900/5">
                <Calendar
                  activeStartDate={monthDate}
                  className="font-semibold"
                  value={ovulationDate}
                  showNeighboringMonth={false}
                  tileClassName={({ date, view }) => {
                    if (view !== 'month') {
                      return null;
                    }
                    if (isInFertileWindow(date)) {
                      return 'highlight';
                    }
                    return null;
                  }}
                />
              </div>
            ))}
          </div>
          <div className="pdf-actions mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowThreeMonths(!showThreeMonths)}
              className="text-sm font-bold text-pink-700 underline decoration-pink-300 underline-offset-4 transition hover:text-pink-900"
            >
              {showThreeMonths ? 'Show one month' : 'Show next 3 months'}
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-800 transition hover:bg-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100"
            >
              Download PDF
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-gray-700">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-pink-200"></span>
              Fertile window
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-pink-700"></span>
              Ovulation date
            </span>
          </div>
          <p className="mt-4 text-left text-xs leading-5 text-gray-600">Estimates can vary from cycle to cycle. Use this as a guide, not medical advice.</p>
        </div>
      )}
      {!nextPeriodDate && (
        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-pink-200 bg-white/75 p-6 text-center text-gray-700 shadow-lg shadow-pink-900/5">
          <p className="max-w-sm">Your dates will bloom here after you reveal your window.</p>
        </div>
      )}
        </div>
      </section>
    </main>
 );
};

export default OvulationCycleCalculator;
