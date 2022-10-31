import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import Table from "./Table";

const Paginate = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [currentLow, setCurrentLow] = useState(0);
  const [currentHigh, setCurrentHigh] = useState(10);
  const handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    setCurrentLow(Number((pageNumber - 1) * 10));
    setCurrentHigh(Number(pageNumber) * 10);
  };

  // console.log("activePage: ", activePage);
  // console.log("currentRange: ", { currentLow, currentHigh });
  const dataSlice = Object.values(props.data.allData).slice(
    currentLow,
    currentHigh
  );
  console.log("dataSlice", dataSlice);

  return (
    <div>
      <Table data={dataSlice} />
      <div style={{ position: "absolute", right: "60px" }}>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={props.itemsCountPerPage}
          totalItemsCount={props.totalItemsCount}
          pageRangeDisplayed={props.pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default Paginate;
