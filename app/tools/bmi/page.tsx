'use client';

import { useState } from 'react';
import { saveHistory, getHistory } from '../../lib/history';

export default function BMICalculator() {
  const [resultHTML, setResultHTML] = useState('');

  const calculateBMI = () => {
    const weightInput = document.getElementById('weight') as HTMLInputElement;
    const heightInput = document.getElementById('height') as HTMLInputElement;

    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    if (!weight || !heightCm) {
      alert('Please enter valid height and weight');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(2);

    let category = '';
    let condition = '';
    let risks = '';
    let advice = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      condition = 'Low body weight';
      risks = 'Weak immunity, nutrient deficiencies, fatigue';
      advice = 'Increase calorie intake with balanced nutrition and consult a dietitian.';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      condition = 'Healthy body weight';
      risks = 'Low health risk';
      advice = 'Maintain a balanced diet and regular physical activity.';
    } else if (bmi < 30) {
      category = 'Overweight';
      condition = 'Excess body weight';
      risks = 'Increased risk of heart disease, diabetes, joint pain';
      advice = 'Consider weight management through diet control and exercise.';
    } else {
      category = 'Obese';
      condition = 'High body fat';
      risks = 'High risk of heart disease, diabetes, hypertension';
      advice = 'Consult a healthcare professional for a structured weight loss plan.';
    }

    const minWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxWeight = (24.9 * heightM * heightM).toFixed(1);

    setResultHTML(`
      <h3>BMI Result</h3>
      <p><b>BMI Value:</b> ${bmi}</p>
      <p><b>Category:</b> ${category}</p>
      <p><b>Condition:</b> ${condition}</p>

      <h4>Health Implications</h4>
      <p>${risks}</p>

      <h4>Recommendations</h4>
      <p>${advice}</p>

      <h4>Ideal Weight Range</h4>
      <p>${minWeight} kg – ${maxWeight} kg (for your height)</p>
    `);

    saveHistory('bmi', {
      bmi,
      category,
      date: new Date().toISOString()
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: 'auto' }}>
      <h2>BMI Calculator</h2>

      <label>Weight (kg)</label>
      <input id="weight" type="number" placeholder="e.g. 70" />

      <label>Height (cm)</label>
      <input id="height" type="number" placeholder="e.g. 170" />

      <button onClick={calculateBMI}>Calculate BMI</button>

      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: resultHTML }}
      />

      <div className="ad">Google Ad Space</div>

      <h4>Calculation History</h4>
      {getHistory('bmi').map((h: any, i: number) => (
        <div key={i}>
          BMI: {h.bmi} ({h.category})
        </div>
      ))}
      <section style={{ marginTop: 40, lineHeight: 1.7 }}>
  <h3>About This BMI Calculator</h3>

  <p>
    The Toolora BMI Calculator helps you understand your body mass index (BMI)
    based on your height and weight. BMI is a widely used health indicator that
    helps assess whether a person has a healthy body weight for their height.
    This tool not only calculates your BMI value but also explains what it means
    for your overall health.
  </p>

  <p>
    Unlike basic BMI tools that only display a number, this calculator provides
    detailed insights such as BMI category, health condition, potential risks,
    and practical recommendations. This makes it easier to understand your body
    status and take informed health decisions.
  </p>

  <h4>How the BMI Calculator Works</h4>

  <p>
    The BMI calculator works by dividing your weight in kilograms by the square
    of your height in meters. Based on the calculated BMI value, the result is
    classified according to internationally recognized health guidelines.
  </p>

  <ul>
    <li>✔ Enter your height and weight</li>
    <li>✔ Get your exact BMI value instantly</li>
    <li>✔ See your BMI category (Underweight, Normal, Overweight, Obese)</li>
    <li>✔ Understand health risks and recommendations</li>
  </ul>

  <h4>Why Use Toolora BMI Calculator?</h4>

  <ul>
    <li>✔ Easy and accurate BMI calculation</li>
    <li>✔ Clear explanation of BMI categories</li>
    <li>✔ Health risk and lifestyle guidance</li>
    <li>✔ Ideal weight range for your height</li>
    <li>✔ Free, fast, and privacy-focused</li>
  </ul>

  <p>
    This BMI calculator is useful for individuals monitoring their health,
    fitness goals, weight management plans, and general wellness. All
    calculations are done locally in your browser without storing or sharing
    personal data.
  </p>

  <p>
    Toolora follows standard BMI calculation formulas and trusted health
    classifications to provide reliable and consistent results across all
    devices and regions.
  </p>
</section>

    </div>
  );
}
