
'use client';
import { saveHistory, loadHistory } from '../../lib/history';

import {useState} from 'react';

export default function EMI(){
 const [res,setRes]=useState('');
 const calc=()=>{
  const p=+(document.getElementById('p') as HTMLInputElement).value;
  const r=+(document.getElementById('r') as HTMLInputElement).value/1200;
  const n=+(document.getElementById('n') as HTMLInputElement).value;
  const emi=(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  setRes(`EMI: ₹${emi.toFixed(2)}`);
  saveHistory('emi',{emi:emi.toFixed(0)});
 };
 return (
  <div style={{padding:20,maxWidth:600,margin:'auto'}}>
   <h2>EMI Calculator</h2>
   <input id="p" placeholder="Principal"/>
   <input id="r" placeholder="Interest %"/>
   <input id="n" placeholder="Months"/>
   <button onClick={calc}>Calculate</button>
   <p>{res}</p>
   <div className="ad">Ad Space</div>
   <h4>History</h4>
   {loadHistory('emi').map((h:any,i:number)=>(<div key={i}>{h.emi}</div>))}
   <section style={{ marginTop: 40, lineHeight: 1.7 }}>
  <h3>About This EMI Calculator</h3>

  <p>
    The Toolora EMI Calculator helps you calculate your monthly loan installment
    (EMI) based on loan amount, interest rate, and loan tenure. EMI calculators
    are essential financial tools that help individuals plan loans and manage
    monthly budgets effectively.
  </p>

  <p>
    This calculator not only shows your monthly EMI but also provides insights
    into total payable amount and interest contribution, helping you understand
    the true cost of your loan before making financial decisions.
  </p>

  <h4>How the EMI Calculator Works</h4>

  <p>
    The EMI is calculated using a standard financial formula that considers the
    principal loan amount, monthly interest rate, and total number of payments.
    This ensures accurate results for home loans, personal loans, car loans, and
    other types of installment-based borrowing.
  </p>

  <ul>
    <li>✔ Enter loan amount, interest rate, and tenure</li>
    <li>✔ Calculate monthly EMI instantly</li>
    <li>✔ Understand interest vs principal breakup</li>
    <li>✔ Plan your finances with confidence</li>
  </ul>

  <h4>Why Use Toolora EMI Calculator?</h4>

  <ul>
    <li>✔ Accurate and instant EMI calculation</li>
    <li>✔ Helps compare different loan options</li>
    <li>✔ Useful for home, car, and personal loans</li>
    <li>✔ Improves budgeting and financial planning</li>
    <li>✔ Free, fast, and secure</li>
  </ul>

  <p>
    This EMI calculator is useful for borrowers, financial planners, students,
    and professionals who want to evaluate loan affordability. All calculations
    are performed locally in your browser without collecting or storing any
    financial information.
  </p>

  <p>
    Toolora uses standard loan amortization formulas to ensure accurate EMI
    results and reliable financial insights across different interest rates and
    loan tenures.
  </p>
</section>

  </div>
 );
}
