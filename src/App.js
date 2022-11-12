import { Routes, Route } from "react-router-dom";
import L from "./components/Login";
import Zkt_Home from "./components/Zkt_Home";
import Fa_Home from "./components/Fa_Home";
import AdminHome from "./components/AdminHome";
import AsHome from "./components/AsHome";
const Login = L.Login;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/zkt_home" element={<Zkt_Home />} />
      <Route path="/fa_home" element={<Fa_Home />} />
      <Route path="/as_home" element={<AsHome />} />
      <Route path="/admin_home" element={<AdminHome />} />
    </Routes>
  );
}

export default App;
