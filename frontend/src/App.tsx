import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertiesContainer from "./pages/PropertiesContainer.tsx";
import PageNotFoundPage from "./pages/PageNotFoundPage.tsx";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PropertiesContainer />} />
        <Route path='*' element={<PageNotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;