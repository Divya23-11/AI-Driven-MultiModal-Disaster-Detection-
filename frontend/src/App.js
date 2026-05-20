import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ImagePage from "./pages/ImagePage";
import TextPage from "./pages/TextPage";
import SensorPage from "./pages/SensorPage";
import FusionPage from "./pages/FusionPage";
import About from "./pages/About";
import WeatherPage from "./pages/WeatherPage";
import ResponsePage from "./pages/ResponsePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/response" element={<ResponsePage />} />
        <Route path="/image" element={<ImagePage />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/sensor" element={<SensorPage />} />
        <Route path="/fusion" element={<FusionPage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
