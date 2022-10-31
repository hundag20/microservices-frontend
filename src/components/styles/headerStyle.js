import styled from "styled-components";

const StyledDiv = styled.section`
  Edit in JSFiddle
Result
HTML
CSS
JavaScript
Resources
/*
*
* ==========================================
* CUSTOM UTIL CLASSES
* ==========================================
*
*/
.navbar {
    transition: all 0.4s;
  }

  .navbar .nav-link {
    color: #4ca1af;
  }

  .navbar .nav-link:hover,
  .navbar .nav-link:focus {
    color: #4ca1af;
    text-decoration: none;
  }

  .navbar .navbar-brand {
    color: #4ca1af;
  }

  /* Change navbar styling on scroll */
  .navbar.active {
    background: #4ca1af;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .navbar.active .nav-link {
    color: #555;
  }

  .navbar.active .nav-link:hover,
  .navbar.active .nav-link:focus {
    color: #555;
    text-decoration: none;
  }

  .navbar.active .navbar-brand {
    color: #555;
  }

  /* Change navbar styling on small viewports */
  @media (max-width: 991.98px) {
    .navbar {
      background: #4ca1af;
    }

    .navbar .navbar-brand,
    .navbar .nav-link {
      color: #555;
    }
  }

  /*
*
* ==========================================
* FOR DEMO PURPOSES
* ==========================================
*
*/
  .text-small {
    font-size: 0.9rem !important;
  }

  body {
    min-height: 110vh;
  }
`;

export default StyledDiv;
