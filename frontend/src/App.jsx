import Accueil from "./pages/accueil.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Accueil />} />
      </Routes>
    </Router>
  );
}

export default App;
