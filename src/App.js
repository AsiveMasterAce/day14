import React, { useEffect } from 'react';
import Favicon from 'react-favicon';
import logo from './Day14_logo.png';
import './App.css';
import Navbar from './components/Navbar'
import Calculator from './components/OvulationFormCalculator'

function App() {

  useEffect(() => {
    document.title = "Day 14";
 }, []);
  return (
     <div className="App">
       <Favicon url={logo} />
       <Navbar />
      <Calculator/>
     </div>
  );
 }
 
 export default App;
