import axios from "axios";
import { Navigate } from "react-router-dom";
import SpinLoader from "./ui/SpinLoader";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import { uiActions } from "../store/ui";
import Notify from "./ui/Notify";

const AddUser = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const errType = useSelector((state) => state.ui.notif.type);
  const isPending = useSelector((state) => state.ui.isLoading);

  const enterNewUser = async (data) => {
    try {
      const url = "http://172.20.117.47:3002/v1/addUser";
      await axios.post(url, data);
      return { status: 200, msg: "user added successfully" };
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "something went wrong" };
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      username: data.get("username"),
      password: data.get("password"),
      cpassword: data.get("cpassword"),
      role: data.get("role"),
    };
    if (!(await Login.unameIsValid(data.username))) {
      dispatch(uiActions.notif({ type: "danger", msg: "invalid username" }));
    } else if (data.password.length != 8 || data.password.includes("*")) {
      dispatch(uiActions.notif({ type: "danger", msg: "invalid password" }));
    } else if (data.password != data.cpassword) {
      dispatch(
        uiActions.notif({ type: "danger", msg: "passwords don't match" })
      );
    } else {
      //spin
      dispatch(uiActions.startLoad());

      const result = await enterNewUser(data);
      if (result.status === 200) {
        dispatch(uiActions.notif({ type: "success", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      } else if (result.status === 500) {
        dispatch(uiActions.notif({ type: "danger", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      }
    }
  };

  const NewUserForm = () => {
    return (
      <div
        className="main"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="form1">
          <br />
          <form onSubmit={submitHandler}>
            <label>Email:</label>
            <br />
            <input
              name="username"
              type="text"
              id="df"
              placeholder="example@moenco.com.et"
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              name="password"
              type="password"
              id="req5"
              placeholder="Password"
            />
            <br />
            <label>Confirm password:</label>
            <br />
            <input
              name="cpassword"
              type="password"
              id="req6"
              placeholder="Password"
            />
            <br />
            <br />
            role___
            <select name="role" id="selection">
              <option>admin</option>
              <option>hr</option>
              <option>finance</option>
            </select>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }
  return (
    <div>
      {errType && <Notify />}
      {isPending && <SpinLoader />}

      <NewUserForm />
    </div>
  );
};

export default AddUser;
