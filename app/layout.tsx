
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://toolora.net'),
  title: {
    default: 'Toolora – Free Online Calculators & Utility Tools',
    template: '%s | Toolora'
  },
  description:
    'Toolora offers free online calculators including Age Calculator, BMI Calculator, EMI Calculator and more. Fast, accurate and privacy-friendly.',
  keywords: [
    'online calculator',
    'age calculator',
    'bmi calculator',
    'emi calculator',
    'free utility tools'
  ],
  openGraph: {
    title: 'Toolora – Free Online Calculators',
    description:
      'Calculate age, BMI, EMI and more using free, fast and accurate online tools.',
    url: 'https://toolora.net',
    siteName: 'Toolora',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
          crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
