import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./ui/Header";
import { _host, _port } from "../index.js";
import Fa_Home from "./Fa_Home";
import ZktHome from "./Zkt_Home";
import { featureActions } from "../store/feature";

const AdminHome = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const feature = useSelector((state) => state.feature);

  //switch is a state
  let sidebarOptions = [];

  const logsHandler = async () => {};
  const hrHandler = async () => {
    dispatch(featureActions.switch({ feature: "hr" }));
  };
  const financeHandler = async () => {
    dispatch(featureActions.switch({ feature: "finance" }));
  };

  sidebarOptions = [
    <li className="has-subnav">
      <a href="#" onClick={financeHandler}>
        <i className="fa fas fa-hand-holding-usd"></i>
        <span className="nav-text">Finance</span>
      </a>
    </li>,
    <li className="has-subnav">
      <a href="#" onClick={hrHandler}>
        <i className="fa far fa-users"></i>
        <span className="nav-text">HR</span>
      </a>
    </li>,
    <li className="has-subnav">
      <a href="#" onClick={logsHandler}>
        <i className="fa fas fa-laptop-medical"></i>
        <span className="nav-text">Logs</span>
      </a>
    </li>,
  ];

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  const Options = () => {
    if (feature.feature && feature.feature === "finance") return <Fa_Home />;
    else if (feature.feature && feature.feature === "hr") return <ZktHome />;
    else if (!feature.feature)
      return <Sidebar sidebarOptions={sidebarOptions} />;
  };

  return <Options />;
};

export default AdminHome;
