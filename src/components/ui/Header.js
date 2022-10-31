// import classes from "‘./data-grid.module.css’";
// import "./header.module.css";
import StyledDiv from "../styles/headerStyle";

const Header = () => {
  return (
    <StyledDiv>
      <section>
        <header className="header">
          <nav className="navbar navbar-expand-lg fixed-top py-3">
            <div className="container">
              <a
                style={{ marginLeft: "auto" }}
                href="#"
                className="navbar-brand text-uppercase font-weight-bold"
              >
                {/* ZKT5.0 client */}
              </a>
            </div>
          </nav>
        </header>
      </section>
    </StyledDiv>
  );
};

export default Header;
