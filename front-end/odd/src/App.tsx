import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SelectPlayerPage from "./pages/SelectChar.tsx";
import SelectDungeon from "./pages/SelectDungeon";
import PlayPage from "./pages/PlayPage";

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
        <Route path="/char-select" element = {<SelectPlayerPage/>} />
        <Route path="/dungeon-select" element = {<SelectDungeon/>} />
        <Route path="/play" element = {<PlayPage/>} />
      </Routes>
    </div>
  );
}

export default App;