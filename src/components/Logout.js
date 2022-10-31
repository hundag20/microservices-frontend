import { authActions } from "../store/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    removeCookie("cookie");
    removeCookie("role");
    dispatch(authActions.logout());
  };

  return (
    <a onClick={logoutHandler} href="">
      <i className="fa fa-power-off fa-2x"></i>
      <span className="nav-text">Logout</span>
    </a>
  );
};

export default Logout;
