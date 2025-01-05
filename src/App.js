import { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Intro from './Intro';
import Left from './Left';
import Right from './Right';

function App() {

  useEffect(() => {
    if (process.env.REACT_APP_ENV === "production") {
      // Dynamically load the Google Analytics script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", process.env.REACT_APP_GA_ID);
    }
  }, []);

  const [text, setText] = useState('');

  return (
    <div className="antialiased bg-gray-100 min-h-screen">

      <Navbar />

      <main className="container mx-auto mt-8 p-4">

        <Intro />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Left text={text} setText={setText} />
          <Right text={text} />
        </div>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white mt-8">
        <p>&#169; {new Date().getFullYear()} <a href="https://www.academylabs.nl">Academy Labs</a></p>
      </footer>
    </div>
  );
}

export default App;