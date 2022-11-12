import Notify from "./ui/Notify";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { uiActions } from "../store/ui";
import Sidebar from "./Sidebar";
import DataTable from "./ui/DataTable";
import Header from "./ui/Header";
import { sbActions } from "../store/sidebar";
import SpinLoader from "./ui/SpinLoader";
import { _host, _port, cookies } from "../index.js";

let effect = {
  firstTime: true,
};

const AsHome = () => {
  const dispatch = useDispatch();

  const [fa_allData, setfa_AllData] = useState(0);
  const feature = useSelector((state) => state.feature);
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const sb = useSelector((state) => state.sb.option);
  const isPending = useSelector((state) => state.ui.isLoading);

  //switch is a state
  let sidebarOptions = [];

  const fa = {
    outHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "out" }));
    },
  };
  console.log("sidebar currently: ", sb);
  useEffect(() => {
    if (sb === "out") {
      console.log("running");
      try {
        //auth&admin at front-end.port + 1 && zkt basic/hr/ at front-end.port + 2 && finance at front-end.port + 3
        let port = Number(_port);
        switch (userData.role) {
          case "admin":
            if (feature.feature === "hr") port = port + 2;
            if (feature.feature === "finance") port = port + 3;
            if (feature.feature === "as") port = port + 3;
            break;
          case "hr":
            port = port + 2;
            break;
          case "finance":
            port = port + 3;
            break;
        }
        const token = cookies.get("token");
        dispatch(uiActions.startLoad());
        const url = `http://${_host}:${port}/v1/${sb}`;
        axios
          .post(url, {
            x_access_token: token,
          })
          .then(async (response) => {
            const data = response.data.data;

            setfa_AllData({ fa_allData: data });
            dispatch(uiActions.stopLoad());
          })
          .catch(function (error) {
            effect.switch = false;
            dispatch(uiActions.stopLoad());

            // handle error
            if (error?.response?.data && error?.response?.data?.error) {
              console.log("err @ axios: ", error.response.data.error);
              dispatch(
                uiActions.notif({
                  type: "danger",
                  msg: "Something went wrong",
                })
              );
            } else {
              console.log("unknown err @ axios: ", error);
              dispatch(
                uiActions.notif({
                  type: "danger",
                  msg: "something went wrong",
                })
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [sb]);

  sidebarOptions = [
    <li className="has-subnav">
      <a href="#" onClick={fa.outHandler}>
        <i className="fa fas fa-home"></i>
        <span className="nav-text">Outstanding</span>
      </a>
    </li>,
  ];

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }
  return (
    <div>
      {errType && <Notify />}
      {isPending && <SpinLoader />}
      <Sidebar sidebarOptions={sidebarOptions} />
      <Header />

      {fa_allData && <DataTable fa_allData={fa_allData} sb={sb} />}
    </div>
  );
};

export default AsHome;
/*
TODO: make sidebar sticky
FIXME: handle allData@home=empty array -> Pass empty error
*/
