import Notify from "./ui/Notify";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { uiActions } from "../store/ui";
import Sidebar from "./Sidebar";
import Header from "./ui/Header";
import { sbActions } from "../store/sidebar";
import AddUser from "./AddUser";
import SpinLoader from "./ui/SpinLoader";
import Paginate from "./ui/Paginate";
let effect = {
  firstTime: true,
};

const Home = () => {
  const dispatch = useDispatch();

  const [allData, setAllData] = useState(0);
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const sb = useSelector((state) => state.sb.option);
  const isPending = useSelector((state) => state.ui.isLoading);

  //switch is a state
  let sidebarOptions = [];
  const addUserHanlder = (event) => {
    // event.preventDefault();
    dispatch(sbActions.switch({ option: "addUser" }));
  };
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
    if (effect.firstTime != true) {
      try {
      } catch (err) {
        console.log(err);
      }
      const url = `http://172.17.16.1:3001/v1/${sb}`;
      axios
        .get(url)
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

  if (userData.role === "admin") {
    sidebarOptions = [
      <li className="has-subnav" key={1}>
        <a href="#" onClick={addUserHanlder}>
          <i className="fa fas fa-user-plus"></i>
          <span className="nav-text">Add user</span>
        </a>
      </li>,
    ];
  } else if (userData.role === "hr") {
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
      {sb === "addUser" && <AddUser />}
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

export default Home;
/*
TODO: make sidebar sticky
FIXME: handle allData@home=empty array -> Pass empty error
*/
