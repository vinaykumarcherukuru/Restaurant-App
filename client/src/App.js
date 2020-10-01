import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 

import './App.css'; 

import Header from './components/header/Header'
import Routes from './routes/route'
import { DataProvider } from './GlobalState'; 

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes /> 
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
