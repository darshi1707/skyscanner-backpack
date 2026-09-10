import React, { useState } from 'react';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkCalendar, { BpkCalendarDate } from '@skyscanner/backpack-web/bpk-component-calendar';
import BpkSelect from '@skyscanner/backpack-web/bpk-component-select';
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './App.scss';

const getClassName = cssModules(STYLES);

const DAYS_OF_WEEK = [
  { name: 'Monday', nameAbbr: 'Mon', index: 1 },
  { name: 'Tuesday', nameAbbr: 'Tue', index: 2 },
  { name: 'Wednesday', nameAbbr: 'Wed', index: 3 },
  { name: 'Thursday', nameAbbr: 'Thu', index: 4 },
  { name: 'Friday', nameAbbr: 'Fri', index: 5 },
  { name: 'Saturday', nameAbbr: 'Sat', index: 6 },
  { name: 'Sunday', nameAbbr: 'Sun', index: 0 },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const START_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => START_YEAR + i);

const formatDateFull = (date) =>
  date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatMonth = (date) =>
  date.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

const App = () => {
  const today = new Date();
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const [depDate, setDepDate] = useState(today);
  const [depMonth, setDepMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const [retDate, setRetDate] = useState(nextWeek);
  const [retMonth, setRetMonth] = useState(new Date(nextWeek.getFullYear(), nextWeek.getMonth(), 1));

  const handleDepMonthChange = (e) => {
    const newMonth = new Date(depMonth.getFullYear(), parseInt(e.target.value, 10), 1);
    setDepMonth(newMonth);
  };

  const handleDepYearChange = (e) => {
    const newMonth = new Date(parseInt(e.target.value, 10), depMonth.getMonth(), 1);
    setDepMonth(newMonth);
  };

  const handleRetMonthChange = (e) => {
    const newMonth = new Date(retMonth.getFullYear(), parseInt(e.target.value, 10), 1);
    setRetMonth(newMonth);
  };

  const handleRetYearChange = (e) => {
    const newMonth = new Date(parseInt(e.target.value, 10), retMonth.getMonth(), 1);
    setRetMonth(newMonth);
  };

  const handleDepartureSelect = (date) => {
    setDepDate(date);
    if (retDate < date) {
      setRetDate(date);
    }
  };

  const handleReturnSelect = (date) => {
    if (date < depDate) {
      alert('Return date cannot be earlier than departure date.');
      return;
    }
    setRetDate(date);
  };

  return (
    <div className={getClassName('App')}>
      <header className={getClassName('App__header')}>
        <BpkText tagName="h1" textStyle="xxl" className={getClassName('App__heading')}>
          Flight Schedule
        </BpkText>
      </header>

      <main className={getClassName('App__main')}>
        <div className={getClassName('App__split-container')}>
          {/* DEPARTURE */}
          <section className={getClassName('App__section')}>
            <div className={getClassName('App__section-header')}>
              <BpkText tagName="h2" textStyle="heading-4">Departure</BpkText>
              <BpkText tagName="span" textStyle="caption" className={getClassName('App__badge')}>
                {formatDateFull(depDate)}
              </BpkText>
            </div>

            <div className={getClassName('App__controls')}>
              <div className={getClassName('App__select-group')}>
                <label htmlFor="dep-month-select">Month</label>
                <BpkSelect
                  id="dep-month-select"
                  name="dep-month-select"
                  value={depMonth.getMonth()}
                  onChange={handleDepMonthChange}
                >
                  {MONTHS.map((month, idx) => (
                    <option key={month} value={idx}>{month}</option>
                  ))}
                </BpkSelect>
              </div>

              <div className={getClassName('App__select-group')}>
                <label htmlFor="dep-year-select">Year</label>
                <BpkSelect
                  id="dep-year-select"
                  name="dep-year-select"
                  value={depMonth.getFullYear()}
                  onChange={handleDepYearChange}
                >
                  {YEARS.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </BpkSelect>
              </div>
            </div>

            <div className={getClassName('App__calendar-wrapper')}>
              <BpkCalendar
                id="departure-calendar"
                daysOfWeek={DAYS_OF_WEEK}
                weekStartsOn={1}
                formatDateFull={formatDateFull}
                formatMonth={formatMonth}
                DateComponent={BpkCalendarDate}
                changeMonthLabel="Change month"
                nextMonthLabel="Next month"
                previousMonthLabel="Previous month"
                month={depMonth}
                onMonthChange={(e, { month }) => setDepMonth(month)}
                onDateSelect={handleDepartureSelect}
                date={depDate}
              />
            </div>
          </section>

          {/* RETURN */}
          <section className={getClassName('App__section')}>
            <div className={getClassName('App__section-header')}>
              <BpkText tagName="h2" textStyle="heading-4">Return</BpkText>
              <BpkText tagName="span" textStyle="caption" className={getClassName('App__badge')}>
                {formatDateFull(retDate)}
              </BpkText>
            </div>

            <div className={getClassName('App__controls')}>
              <div className={getClassName('App__select-group')}>
                <label htmlFor="ret-month-select">Month</label>
                <BpkSelect
                  id="ret-month-select"
                  name="ret-month-select"
                  value={retMonth.getMonth()}
                  onChange={handleRetMonthChange}
                >
                  {MONTHS.map((month, idx) => (
                    <option key={month} value={idx}>{month}</option>
                  ))}
                </BpkSelect>
              </div>

              <div className={getClassName('App__select-group')}>
                <label htmlFor="ret-year-select">Year</label>
                <BpkSelect
                  id="ret-year-select"
                  name="ret-year-select"
                  value={retMonth.getFullYear()}
                  onChange={handleRetYearChange}
                >
                  {YEARS.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </BpkSelect>
              </div>
            </div>

            <div className={getClassName('App__calendar-wrapper')}>
              <BpkCalendar
                id="return-calendar"
                daysOfWeek={DAYS_OF_WEEK}
                weekStartsOn={1}
                formatDateFull={formatDateFull}
                formatMonth={formatMonth}
                DateComponent={BpkCalendarDate}
                changeMonthLabel="Change month"
                nextMonthLabel="Next month"
                previousMonthLabel="Previous month"
                month={retMonth}
                onMonthChange={(e, { month }) => setRetMonth(month)}
                onDateSelect={handleReturnSelect}
                date={retDate}
              />
            </div>
          </section>
        </div>

        <div className={getClassName('App__bottom-bar')}>
          <BpkButton
            large
            onClick={() => alert(`Departure: ${formatDateFull(depDate)}\nReturn: ${formatDateFull(retDate)}`)}
          >
            Continue
          </BpkButton>
        </div>
      </main>
    </div>
  );
};

export default App;