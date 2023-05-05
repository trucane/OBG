
import { DashboardRoute } from './components/RouteComponents/DashboardRoute';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
      <div className="app">
          <Routes>
              <Route path="/" element={<DashboardRoute />} />
              {/* <Route path="/about" element={<AboutRoute />} />
              <Route path="/contact" element={<ContactRoute />} />
              <Route path="*" element={<PageNotFoundRoute />} /> */}
          </Routes>
      </div>
  );
}

export default App;