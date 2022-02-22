import './App.css';
import Community from './pages/Community';
import SignUp from './pages/Signup';
import Exchange from './pages/Exchange';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exchange" element={<Exchange />} />
      </Routes>
    </Router >
  );
}

export default App;