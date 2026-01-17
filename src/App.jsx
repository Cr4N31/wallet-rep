import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"
import Bulk from "./pages/Bulk"
import AOS from 'aos';
import{ useEffect } from 'react'
import 'aos/dist/aos.css';
function App() {
    useEffect(() => {
      AOS.init({
        duration: 1200, // animation duration in ms
        once: false,     // whether animation should happen only once
      });
    }, []);

  return (
    <Router>
          <Header />
          <div className="min-h-screen bg-gradient-to-b from-black via-[#050b18] to-black p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bulk" element={<Bulk />} />
            </Routes>
          </div>
    </Router>
  )
}

export default App
