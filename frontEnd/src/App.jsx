import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import SlideBar from "./components/SlideBar/SlideBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Employee from "./components/Employee/Employee";
import Calender from "./components/Calender/Calender";
import Messages from "./components/Messages/Messages";
import EmpForm from "./components/EmpForm/EmpForm";
import EmpEditForm from "./components/EmpEditForm/EmpEditForm";
import ViewEmployee from "./components/ViewEmployee/ViewEmployee";

import "./App.css";

const App = () => {
  return (
    <div className="app-grid">
      <aside className="sidebar">
        <SlideBar />
      </aside>

      <header className="navbar">
        <NavBar />
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/empform" element={<EmpForm />} />
          <Route path="/empform/edit" element={<EmpEditForm />} />
          <Route path="/viewemployee/:id" element={<ViewEmployee />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
