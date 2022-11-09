import Notify from "./ui/Notify";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { uiActions } from "../store/ui";
import Sidebar from "./Sidebar";
import Header from "./ui/Header";
import { sbActions } from "../store/sidebar";
import SpinLoader from "./ui/SpinLoader";
import Paginate from "./ui/Paginate";
import { _host, _port, cookies } from "../index.js";

let effect = {
  firstTime: true,
};

const ZktHome = () => {
  const dispatch = useDispatch();

  const [allData, setAllData] = useState(0);
  const feature = useSelector((state) => state.feature);
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const sb = useSelector((state) => state.sb.option);
  const isPending = useSelector((state) => state.ui.isLoading);

  //switch is a state
  let sidebarOptions = [];

  const todayHandler = async (event) => {
    effect.firstTime = false;
    dispatch(uiActions.startLoad());
    dispatch(sbActions.switch({ option: "today" }));
  };
  const yestHandler = async (event) => {
    effect.firstTime = false;
    dispatch(sbActions.switch({ option: "yest" }));
    dispatch(uiActions.startLoad());
  };
  const lastWeekHandler = async (event) => {
    effect.firstTime = false;
    dispatch(sbActions.switch({ option: "week" }));
    dispatch(uiActions.startLoad());
  };
  useEffect(() => {
    //auth&admin at front-end.port + 1 && zkt basic/hr/ at front-end.port + 2 && finance at front-end.port + 3
    let port = Number(_port);
    switch (userData.role) {
      case "admin":
        if (feature.feature === "hr") port = port + 2;
        if (feature.feature === "finance") port = port + 3;
        break;
      case "hr":
        port = port + 2;
        break;
      case "finance":
        port = port + 3;
        break;
    }
    if (
      effect.firstTime != true &&
      sb != "dashboard" &&
      sb != "fa_dashboard" &&
      (sb === "today" || sb === "yest" || sb === "week")
    ) {
      const token = cookies.get("token");

      const url = `http://${_host}:${port}/v1/${sb}`;
      axios
        .post(url, {
          x_access_token: token,
        })
        .then(async (response) => {
          const data = response.data.data;

          setAllData({ allData: data });
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
    }
  }, [sb]);

  if (userData.role === "hr" || userData.role === "admin") {
    sidebarOptions = [
      <li className="has-subnav">
        <a href="#" onClick={todayHandler}>
          <i className="fa fas fa-redo"></i>
          <span className="nav-text">Today</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={yestHandler}>
          <i className="fa fas fa-retweet"></i>
          <span className="nav-text">Yesterday</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={lastWeekHandler}>
          <i className="fa fas fa-calendar-alt"></i>
          <span className="nav-text">Last Week</span>
        </a>
      </li>,
    ];
  }

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div>
      {errType && <Notify />}
      {isPending && <SpinLoader />}
      <Sidebar sidebarOptions={sidebarOptions} />
      <Header />
      {allData && sb != "fahome" && (
        <Paginate
          data={allData}
          itemsCountPerPage={10}
          totalItemsCount={allData.allData.length}
          pageRangeDisplayed={5}
        />
      )}
    </div>
  );
};

export default ZktHome;
/*
TODO: make sidebar sticky
FIXME: handle allData@home=empty array -> Pass empty error
*/
