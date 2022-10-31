import { Routes, Route } from "react-router-dom";
import L from "./components/Login";
import Home from "./components/Home";
import Fa_Home from "./components/Fa_Home";
import AddUser from "./components/AddUser";
const Login = L.Login;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/fa_home" element={<Fa_Home />} />
      <Route path="/addUser" element={<AddUser />} />
    </Routes>
  );
}

export default App;
