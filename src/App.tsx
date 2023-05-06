
import { DashboardRoute } from './components/RouteComponents/DashboardRoute';
import { HomeRoute } from './components/RouteComponents/HomeRoute';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
      <div className="app">
          <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/dashboard" element={<DashboardRoute />} />
          </Routes>
      </div>
  );
}

export default App;