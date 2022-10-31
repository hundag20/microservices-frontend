import StyledDiv from "./styles/sidebarStyle";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import logo from "../img/logo.png";
import nologo from "../img/no-logo.PNG";

const Sidebar = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const pic = userData.role === 'finance' ? nologo : logo;
 
  return (
    <StyledDiv>
      <section>
        <div className="area">
          <nav className="main-menu">
            <ul>
              <li className="has-subnav">
                <i className="fa"></i>
                <img
                  style={{ height: "100px", width: "55px" }}
                  src={pic}
                  alt="Logo"
                />
              </li>
              {props.sidebarOptions}
            </ul>

            <ul className="logout">
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </StyledDiv>
  );
};

export default Sidebar;
