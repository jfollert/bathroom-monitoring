import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Event from './components/Event';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/events" element={<Event />} />
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
