import React, { useState } from 'react';

import Navbar from './Navbar'; 
import Intro from './Intro';
import Left from './Left';
import Right from './Right'; 

function App() {

  const [text, setText] = useState('');

  return (
    <div className="antialiased bg-gray-100 min-h-screen">

      <Navbar/> 

      <main className="container mx-auto mt-8 p-4">

        <Intro/>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Left text={text} setText={setText} />
          <Right text={text}/>
        </div>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white mt-8">
        <p>&#169; {new Date().getFullYear()} Academy Labs</p>
      </footer>
    </div>
  );
}

export default App;