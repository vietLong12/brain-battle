import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/App.css";
import WelcomeScreen from "./page/HomePage";
import RoomSelection from "./page/RoomSelection";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/join" element={<RoomSelection />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
