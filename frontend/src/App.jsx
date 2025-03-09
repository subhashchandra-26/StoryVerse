import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthorDashboard from './pages/AuthorDashboard';
// import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author-dashboard" element={<AuthorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;