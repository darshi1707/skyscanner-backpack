import React, { useState } from 'react';

import { BpkCode } from '@skyscanner/backpack-web/bpk-component-code';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkCalendar from '@skyscanner/backpack-web/bpk-component-calendar';

import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './App.scss';

const getClassName = cssModules(STYLES);

// Days of the week configuration
const daysOfWeek = [
  { name: 'Monday', nameAbbr: 'Mon' },
  { name: 'Tuesday', nameAbbr: 'Tue' },
  { name: 'Wednesday', nameAbbr: 'Wed' },
  { name: 'Thursday', nameAbbr: 'Thu' },
  { name: 'Friday', nameAbbr: 'Fri' },
  { name: 'Saturday', nameAbbr: 'Sat' },
  { name: 'Sunday', nameAbbr: 'Sun' },
];

// Function to format the full date
const formatDateFull = (date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// Function to format the month
const formatMonth = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

const App = () => {
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State for currently displayed month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className={getClassName('App')}>
      <header className={getClassName('App__header')}>
        <div className={getClassName('App__header-inner')}>
          <BpkText
            tagName="h1"
            textStyle="xxl"
            className={getClassName('App__heading')}
          >
            Flight Schedule
          </BpkText>
        </div>
      </header>

      <main className={getClassName('App__main')}>
        <BpkCalendar
          id="flight-schedule-calendar"
          daysOfWeek={daysOfWeek}
          weekStartsOn={1}
          formatDateFull={formatDateFull}
          formatMonth={formatMonth}
          changeMonthLabel="Change month"
          nextMonthLabel="Next month"
          previousMonthLabel="Previous month"
          month={currentMonth}
          onMonthChange={(event, { month }) => setCurrentMonth(month)}
          onDateSelect={setSelectedDate}
          date={selectedDate}
        />

        <BpkText tagName="p" className={getClassName('App__text')}>
          To get started, edit <BpkCode>src/App.jsx</BpkCode> and save to reload.
        </BpkText>

        <BpkButton onClick={() => alert('It works!')}>
          Continue
        </BpkButton>
      </main>
    </div>
  );
};

export default App;
