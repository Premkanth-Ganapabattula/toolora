'use client';

import { useEffect, useRef, useState } from 'react';
import { saveHistory, getHistory } from '../../lib/history';



export default function AgeCalculator() {
  const [resultHTML, setResultHTML] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Set default To Date = Today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const toInput = document.getElementById('toDate') as HTMLInputElement;
    if (toInput) toInput.value = today;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const calculateAge = () => {
    const fromInput = document.getElementById('fromDate') as HTMLInputElement;
    const toInput = document.getElementById('toDate') as HTMLInputElement;

    if (!fromInput.value) {
      alert('Please select From Date');
      return;
    }

    const from = new Date(fromInput.value);
    const toDateValue = toInput.value;
    const isLive =
      toDateValue === new Date().toISOString().split('T')[0];

    if (intervalRef.current) clearInterval(intervalRef.current);

    const update = () => {
      const now = isLive ? new Date() : new Date(toDateValue);
      const diffMs = now.getTime() - from.getTime();

      const seconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      let years = now.getFullYear() - from.getFullYear();
      let months = now.getMonth() - from.getMonth();
      let remainingDays = now.getDate() - from.getDate();

      if (remainingDays < 0) {
        months--;
        const prevMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        );
        remainingDays += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setResultHTML(`
        <h3>Exact Age ${isLive ? '(Live)' : ''}</h3>
        <ul>
          <li><b>${years}</b> Years</li>
          <li><b>${months}</b> Months</li>
          <li><b>${weeks}</b> Weeks</li>
          <li><b>${days}</b> Days</li>
          <li><b>${hours}</b> Hours</li>
          <li><b>${minutes}</b> Minutes</li>
          <li><b>${seconds}</b> Seconds</li>
        </ul>
      `);
    };

    update();

    if (isLive) {
      intervalRef.current = setInterval(update, 1000);
    }

    saveHistory('age', {
      from: fromInput.value,
      to: isLive ? 'Today (Live)' : toDateValue
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: 'auto' }}>
      <h2>Age Calculator (From Date → To Date)</h2>

      <label>From Date</label>
      <input id="fromDate" type="date" />

      <label>To Date</label>
      <input id="toDate" type="date" />

      <button onClick={calculateAge}>Calculate Age</button>

      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: resultHTML }}
      />

      <div className="ad">Google Ad Space</div>

      <h4>Calculation History</h4>
      {getHistory('age').map((h: any, i: number) => (
        <div key={i}>
          {h.from} → {h.to}
        </div>
      ))}
      <section style={{ marginTop: 40, lineHeight: 1.7 }}>
  <h3>About This Age Calculator</h3>

  <p>
    The Toolora Age Calculator helps you calculate your exact age between two
    dates with high precision. Unlike basic calculators that only show age in
    years, this tool provides a detailed breakdown including years, months,
    weeks, days, hours, minutes, and even seconds.
  </p>

  <p>
    You can calculate age from a selected birth date to any specific date.
    By default, the calculator uses today’s date, and when today is selected,
    the age updates live every second. This makes it ideal for tracking real-time
    age progression accurately.
  </p>

  <h4>How the Age Calculator Works</h4>

  <p>
    The calculator works by measuring the exact time difference between the
    selected start date and end date. It then converts this difference into
    multiple time units such as total days, weeks, months, and years while
    accounting for leap years and varying month lengths.
  </p>

  <ul>
    <li>✔ Select a start date (such as date of birth)</li>
    <li>✔ Choose an end date or keep today as default</li>
    <li>✔ Get precise age details instantly</li>
    <li>✔ Live updates when comparing with today</li>
  </ul>

  <h4>Why Use Toolora Age Calculator?</h4>

  <ul>
    <li>✔ Accurate date-to-date calculation</li>
    <li>✔ Live age tracking in seconds</li>
    <li>✔ Age comparison between two people</li>
    <li>✔ Works worldwide with no registration</li>
    <li>✔ Free, fast, and privacy-friendly</li>
  </ul>

  <p>
    This age calculator is useful for students, professionals, researchers,
    legal documentation, astrology, healthcare tracking, and personal curiosity.
    All calculations are performed directly in your browser without sending
    data to any server.
  </p>

  <p>
    Toolora ensures accuracy by using standard date arithmetic and modern
    JavaScript time APIs, making it reliable across different time zones and
    devices.
  </p>
</section>

    </div>
  );
}
