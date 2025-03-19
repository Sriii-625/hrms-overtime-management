import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Hr from "./pages/Hr";
import Employee from "./pages/Employee";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/hr/*" element={<Hr />} />
        <Route path="/employee/*" element={<Employee />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
