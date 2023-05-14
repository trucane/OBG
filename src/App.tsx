
import { DashboardRoute } from './components/RouteComponents/DashboardRoute';
import { HomeRoute } from './components/RouteComponents/HomeRoute';
import { GettingStartedRoute } from './components/RouteComponents/GettingStartedRoute';
import { GlossaryRoute } from './components/RouteComponents/GlossaryRoute';
import { InformationRoute } from './components/RouteComponents/InformationRoute';
import { ErrorPage } from './components/pages/ErrorPage';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
      <div className="app">
          <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/dashboard" element={<DashboardRoute />} />
              <Route path="/getting-started" element={<GettingStartedRoute />} />
              <Route path="/glossary/:name?" element={<GlossaryRoute />} />
              <Route path="/info/:section?" element={<InformationRoute />} />
              <Route path="*" element={<ErrorPage />} />
          </Routes>
      </div>
  );
}

export default App;