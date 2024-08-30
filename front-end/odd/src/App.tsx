import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <PageTrackingApp />
    </Router>
  );
}


function PageTrackingApp() {


  return (
    <div className="bg-lightbg dark:bg-darkbg dark:text-gray-100">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element ={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;