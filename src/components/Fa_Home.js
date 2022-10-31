import Notify from "./ui/Notify";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { uiActions } from "../store/ui";
import Sidebar from "./Sidebar";
import FnHome from "./FnHome";
import Header from "./ui/Header";
import { sbActions } from "../store/sidebar";
import AddUser from "./AddUser";
import SpinLoader from "./ui/SpinLoader";
import Paginate from "./ui/Paginate";
let effect = {
  firstTime: true,
};

const Fa_Home = () => {
  const dispatch = useDispatch();

  const [fa_allData, setfa_AllData] = useState(0);
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const sb = useSelector((state) => state.sb.option);
  const isPending = useSelector((state) => state.ui.isLoading);

  //switch is a state
  let sidebarOptions = [];

  const fa = {
    allHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "all" }));
    },
    fixedplantequipHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "fixedplantequip" }));
    },
    fixturefittingHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "fixturefitting" }));
    },
    freestandequipHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "freestandequip" }));
    },
    officeequipallHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "officeequipall" }));
    },
    poolingHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "pooling" }));
    },
    vehicleHandler: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "vehicle" }));
    },
    compHardHanlder: async (event) => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
      effect.firstTime = false;
      dispatch(sbActions.switch({ option: "compHard" }));
    },
  };
  useEffect(() => {
    if (effect.firstTime != true) {
      try {
        dispatch(uiActions.startLoad());
        const url = `http://172.20.117.47:3002/v1/${sb}`;
        axios
          .get(url)
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
        <a href="#" onClick={fa.allHandler}>
          <i className="fa fas fa-home"></i>
          <span className="nav-text">All</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.fixedplantequipHandler}>
          <i className="fa fas fa-bolt"></i>
          <span className="nav-text">Fixed Plant Equipment</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.fixturefittingHandler}>
          <i className="fa fas fa-retweet"></i>
          <span className="nav-text">fixture & Fitting</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.freestandequipHandler}>
          <i className="fa fas fa-calendar-alt"></i>
          <span className="nav-text">free Stand Equipment</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.officeequipallHandler}>
          <i className="fa fas fa-calendar-alt"></i>
          <span className="nav-text">Office Equipment all</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.poolingHandler}>
          <i className="fa fas fa-calendar-alt"></i>
          <span className="nav-text">Pooling</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.vehicleHandler}>
          <i className="fa fas fa-truck-pickup"></i>
          <span className="nav-text">Vehicle</span>
        </a>
      </li>,
      <li className="has-subnav">
        <a href="#" onClick={fa.compHardHanlder}>
          <i className="fa fas fa-tv"></i>
          <span className="nav-text">Computer Hardware</span>
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

      {fa_allData && <FnHome fa_allData={fa_allData} sb={sb} />}
    </div>
  );
};

export default Fa_Home;
/*
TODO: make sidebar sticky
FIXME: handle allData@home=empty array -> Pass empty error
*/
