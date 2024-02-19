import "./App.css";
import { CategoriesProvider } from "./CategoriesContext";
import { RoomProvider } from "./RoomContext";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";
import HomeMobile from "./components/HomeMobile";
import NavbarDesktop from "./components/NavbarDesktop";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/automations" element={<Automations />} />
        <Route path="/automations/new" element={<AutomationForm />} />
        <Route path="/automations/edit/:id" element={<AutomationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
