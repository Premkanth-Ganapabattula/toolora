
import ThemeToggle from './components/ThemeToggle';

export default function Home(){
  return (
    <main className='page' style={{padding:20,maxWidth:1100,margin:'auto'}}>
      <h1>Toolora</h1>
      <p>Advanced utility calculators with history, charts and SEO.</p>
      <ThemeToggle />
      <div className="ad">Google Ad Space</div>
      <div className="grid">
        <a className="card" href="/tools/age">Age Calculator</a>
        <a className="card" href="/tools/bmi">BMI Calculator</a>
        <a className="card" href="/tools/emi">EMI Calculator</a>
        <a className="card" href="/tools/ageCompare">Compare Two Age's</a>
      </div>
      <section style={{ marginTop: 50, lineHeight: 1.7 }}>
  <h2>About Toolora</h2>

  <p>
    Toolora is a modern online utility platform designed to make everyday
    calculations simple, fast, and accurate. Our website provides a collection
    of smart calculators and converters that help users solve real-world
    problems related to age, health, finance, and daily measurements.
  </p>

  <p>
    Unlike basic tools that show only limited results, Toolora focuses on
    delivering detailed insights and meaningful explanations. Each calculator
    is carefully designed to provide accurate outputs along with helpful
    information so users can understand their results clearly and make better
    decisions.
  </p>

  <h3>What You Can Do with Toolora</h3>

  <ul>
    <li>✔ Calculate exact age from one date to another with live updates</li>
    <li>✔ Understand your health status using advanced BMI calculations</li>
    <li>✔ Plan loans and finances with accurate EMI calculations</li>
    <li>✔ Convert units and time zones easily</li>
    <li>✔ Compare results and track calculation history</li>
  </ul>

  <h3>Why Choose Toolora?</h3>

  <ul>
    <li>✔ Accurate and reliable calculations</li>
    <li>✔ Simple and user-friendly interface</li>
    <li>✔ Fast performance on all devices</li>
    <li>✔ No registration or login required</li>
    <li>✔ Privacy-friendly — no personal data stored</li>
  </ul>

  <p>
    Toolora is built using modern web technologies to ensure speed, accuracy,
    and accessibility across all devices. All calculations are performed
    directly in your browser, ensuring complete privacy and a seamless user
    experience.
  </p>

  <p>
    Whether you are a student, professional, health-conscious individual, or
    someone managing finances, Toolora provides reliable tools you can trust
    anytime, anywhere.
  </p>
</section>

    </main>
  );
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Age Calculator',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    })
  }}
/>

