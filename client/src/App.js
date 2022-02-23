import "./App.css";
import Community from "./pages/Community";
import SignUp from "./pages/Signup";
import Exchange from "./pages/Exchange";
import Nav from "./components/Nav";
import Write from "./pages/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App;
