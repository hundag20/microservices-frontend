import styled from "styled-components";

const StyledDiv = styled.div`
  body {
    background-color: #fff;
    padding: 20px;
  }

  .top-information,
  .bottom-information {
    padding: 0 20px;
  }

  table.dataTable.dtr-inline.collapsed
    > tbody
    > tr[role="row"]
    > td:first-child:before,
  table.dataTable.dtr-inline.collapsed
    > tbody
    > tr[role="row"]
    > th:first-child:before {
    background-color: #29cc97;
    top: 14px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border: 0;
    font-weight: bold;
    box-shadow: none;
  }
  .late {
    color: red;
  }
  .early {
    color: green;
  }
  table.dataTable.dtr-inline.collapsed
    > tbody
    > tr.parent
    > td:first-child:before,
  table.dataTable.dtr-inline.collapsed
    > tbody
    > tr.parent
    > th:first-child:before {
    background-color: fec400;
  }
`;
export default StyledDiv;
