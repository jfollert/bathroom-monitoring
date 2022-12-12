
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BathroomDashboard from './pages/BathroomDashboard';
import SensorsDashboard from './pages/SensorsDashboard';

function App() {
  return (
    <BrowserRouter>
          <Routes>
			<Route path="/bathrooms" element={<BathroomDashboard /> } />
			<Route path="/sensors" element={<SensorsDashboard /> } />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
