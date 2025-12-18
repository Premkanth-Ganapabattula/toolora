'use client';

import { useEffect, useRef, useState } from 'react';
import { saveHistory, loadHistory } from '../../lib/history';

type AgeData = {
  years: number;
  months: number;
  days: number;
};

function calculateDifference(from: Date, to: Date): AgeData {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export default function AgeCalculator() {
  const [resultHTML, setResultHTML] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Default To Date = Today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const toInput = document.getElementById('toDate') as HTMLInputElement;
    if (toInput) toInput.value = today;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const compareAge = () => {
    const p1Input = document.getElementById('p1') as HTMLInputElement;
    const p2Input = document.getElementById('p2') as HTMLInputElement;
    const toInput = document.getElementById('toDate') as HTMLInputElement;

    if (!p1Input.value || !p2Input.value) {
      alert('Please select both birth dates');
      return;
    }

    const p1 = new Date(p1Input.value);
    const p2 = new Date(p2Input.value);
    const toDateValue = toInput.value;
    const isLive =
      toDateValue === new Date().toISOString().split('T')[0];

    if (intervalRef.current) clearInterval(intervalRef.current);

    const update = () => {
      const now = isLive ? new Date() : new Date(toDateValue);

      const age1 = calculateDifference(p1, now);
      const age2 = calculateDifference(p2, now);

      let older = '';
      let diffYears = 0;
      let diffMonths = 0;
      let diffDays = 0;

      if (p1 < p2) {
        older = 'Person 1 is older';
        const diff = calculateDifference(p1, p2);
        diffYears = diff.years;
        diffMonths = diff.months;
        diffDays = diff.days;
      } else {
        older = 'Person 2 is older';
        const diff = calculateDifference(p2, p1);
        diffYears = diff.years;
        diffMonths = diff.months;
        diffDays = diff.days;
      }

      setResultHTML(`
        <h3>Age Comparison ${isLive ? '(Live)' : ''}</h3>

        <h4>Person 1</h4>
        ${age1.years} Years, ${age1.months} Months, ${age1.days} Days

        <h4>Person 2</h4>
        ${age2.years} Years, ${age2.months} Months, ${age2.days} Days

        <h4>${older}</h4>
        Difference: ${diffYears} Years, ${diffMonths} Months, ${diffDays} Days
      `);
    };

    update();
    if (isLive) intervalRef.current = setInterval(update, 1000);

    saveHistory('age-compare', {
      person1: p1Input.value,
      person2: p2Input.value,
      to: isLive ? 'Today (Live)' : toDateValue
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 760, margin: 'auto' }}>
      <h2>Age Comparison Tool</h2>

      <label>Person 1 Date of Birth</label>
      <input id="p1" type="date" />

      <label>Person 2 Date of Birth</label>
      <input id="p2" type="date" />

      <label>Compare Till Date</label>
      <input id="toDate" type="date" />

      <button onClick={compareAge}>Compare Age</button>

      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: resultHTML }}
      />

      <div className="ad">Google Ad Space</div>

      <h4>Comparison History</h4>
      {loadHistory('age-compare').map((h: any, i: number) => (
        <div key={i}>
          {h.person1} vs {h.person2} → {h.to}
        </div>
      ))}
    </div>
  );
}
