import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Interest from './components/pages/Interest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/interest" element={<Interest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
