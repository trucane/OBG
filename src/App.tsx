import * as React from 'react';
import { MainApp } from './MainApp';

import { Routes, Route } from 'react-router-dom';



function App() {
  return (
      <div className="app">
          <Routes>
              <Route path="/" element={<MainApp />} />
              {/* <Route path="/about" element={<AboutRoute />} />
              <Route path="/contact" element={<ContactRoute />} />
              <Route path="*" element={<PageNotFoundRoute />} /> */}
          </Routes>
      </div>
  );
}

export default App;