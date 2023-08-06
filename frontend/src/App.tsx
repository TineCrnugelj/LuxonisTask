import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import PropertiesContainer from "./components/PropertiesContainer.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PropertiesContainer />} />
      </Routes>
    </Router>
  );
}

export default App
