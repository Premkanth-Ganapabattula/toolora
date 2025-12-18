'use client';

import { useEffect, useRef, useState } from 'react';
import { saveHistory, loadHistory } from '../../lib/history';

export const dynamic = 'force-dynamic';

export default function AgeCalculator() {
  const [mounted, setMounted] = useState(false);
  const [resultHTML, setResultHTML] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setHistory(loadHistory('age'));
  }, []);

  // ✅ set default To Date = Today (client only)
  useEffect(() => {
    if (!mounted) return;

    const today = new Date().toISOString().split('T')[0];
    const toInput = document.getElementById('toDate') as HTMLInputElement;
    if (toInput) toInput.value = today;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mounted]);

  if (!mounted) return null; // 🔑 VERY IMPORTANT

  const calculateAge = () => {
    const fromInput = document.getElementById('fromDate') as HTMLInputElement;
    const toInput = document.getElementById('toDate') as HTMLInputElement;

    if (!fromInput.value) {
      alert('Please select From Date');
      return;
    }

    const from = new Date(fromInput.value);
    const toDateValue = toInput.value;
    const todayStr = new Date().toISOString().split('T')[0];
    const isLive = toDateValue === todayStr;

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
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
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
    if (isLive) intervalRef.current = setInterval(update, 1000);

    saveHistory('age', {
      from: fromInput.value,
      to: isLive ? 'Today (Live)' : toDateValue
    });

    setHistory(loadHistory('age')); // ✅ SAFE UPDATE
  };

  return (
    <div className="page">
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
      {history.length === 0 && <p>No history yet</p>}
      {history.map((h, i) => (
        <div key={i}>
          {h.from} → {h.to}
        </div>
      ))}

      {/* SEO CONTENT */}
      <section style={{ marginTop: 40, lineHeight: 1.7 }}>
        <h3>About This Age Calculator</h3>
        <p>
          The Toolora Age Calculator helps you calculate your exact age between
          two dates with high precision. It provides a detailed breakdown
          including years, months, weeks, days, hours, minutes, and seconds.
        </p>
        <p>
          When today is selected as the end date, the calculator updates the
          result live every second, making it ideal for real-time age tracking.
        </p>
      </section>
    </div>
  );
}
