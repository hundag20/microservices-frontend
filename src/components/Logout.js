import { authActions } from "../store/auth";
import { featureActions } from "../store/feature";
import { useDispatch } from "react-redux";
import { cookies } from "../index.js";

const Logout = () => {
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    cookies.remove("token");
    cookies.remove("role");
    dispatch(authActions.logout());
    dispatch(featureActions.clear());
  };

  return (
    <a onClick={logoutHandler} href="">
      <i className="fa fa-power-off fa-2x"></i>
      <span className="nav-text">Logout</span>
    </a>
  );
};

export default Logout;
