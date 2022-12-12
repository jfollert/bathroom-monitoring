
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BathroomDashboard from './pages/BathroomDashboard';
import Dashboard from './pages/Dashboard';
import SensorsDashboard from './pages/SensorsDashboard';

function App() {
  return (
    <BrowserRouter>
          <Routes>
		  <Route path="/" index element={<Dashboard /> } />
			<Route path="/bathrooms" element={<BathroomDashboard /> } />
			<Route path="/sensors" element={<SensorsDashboard /> } />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
