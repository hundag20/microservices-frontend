import { featureActions } from "../store/feature";
import { useDispatch } from "react-redux";

const AdminReset = () => {
  const dispatch = useDispatch();

  const resetHandler = (event) => {
    event.preventDefault();
    dispatch(featureActions.clear());
  };

  return (
    <a onClick={resetHandler} href="">
      <i className="fa fas fa-home"></i>
      <span className="nav-text">Home</span>
    </a>
  );
};

export default AdminReset;
