// import './css/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBathroom from './pages/AddBathroom';
// import Layout from './components/Layout';
// import Home from './components/Home';
// import Event from './components/Event';
import BathroomDashboard from './pages/BathroomDashboard';
import SensorsDashboard from './pages/SensorsDashboard';

function App() {
  return (
	// <BathroomDashboard />
    <BrowserRouter>
          <Routes>
			<Route path="/bathrooms" element={<BathroomDashboard /> } />
			<Route path="/bathrooms/add" element={<AddBathroom /> } />
			<Route path="/sensors" element={<SensorsDashboard /> } />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
