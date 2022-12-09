import React, { useEffect, useState } from "react";
import _DataTable from "react-data-table-component";
import StyledDiv from "../styles/DataTableStyle";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

let columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];

let data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
function downloadCSV(array, sb) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = `${sb}.csv`;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }
  const encodedURI = encodeURI(csv);
  const fixedEncodedURI = encodedURI.replaceAll("#", "%23");
  link.setAttribute("href", fixedEncodedURI);
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport }) => (
  <button
    type="button"
    className="btn btn-primary"
    style={{ position: "relative", right: "100px" }}
    onClick={(e) => {
      onExport(e.target.value);
    }}
  >
    export
  </button>
);

const DataTable = (props) => {
  const today = new Date();
  const [loading, setLoading] = useState(false);

  const sb = useSelector((state) => state.sb.option);
  const [allData, setAllData] = useState(props.fa_allData.fa_allData);

  const [YTDBV_month, setYTDBV_month] = useState(today.getMonth() + 1);
  const [YTDDE_month, setYTDDE_month] = useState(today.getMonth() + 1);

  const YTDDE_monthUp = () => {
    if (YTDDE_month < 12) setYTDDE_month(YTDDE_month + 1);
  };
  const YTDDE_monthDown = () => {
    if (YTDDE_month > 1) setYTDDE_month(YTDDE_month - 1);
  };
  const YTDBV_monthUp = () => {
    if (YTDBV_month < 12) setYTDBV_month(YTDBV_month + 1);
  };
  const YTDBV_monthDown = () => {
    if (YTDBV_month > 1) setYTDBV_month(YTDBV_month - 1);
  };
  columns = Object.entries(allData[0]);

  const YTDBV_reg = new RegExp(/^YTDBooklaule@EndOfMonth/);
  const YTDDE_reg = new RegExp(/^YTDDepEndOfMonth/);

  columns = columns.map((el) => {
    if (el[0] === "Description") {
      return {
        name: "Description",
        selector: (row) => row[el[0]],
        wrap: true,
        sortable: true,
        format: (row) => `${row[el[0]].slice(0, 200)}`,
      };
    } else if (el[0] === "DepreciationMethod" || el[0] === "AssetNLAccount") {
      return;
    } else if (YTDBV_reg.test(el[0])) {
      const month = el[0].split("Month")[1];
      if (month == YTDBV_month) {
        return {
          name: el[0],
          selector: (row) => row[el[0]],
          sortable: true,
        };
      } else return;
    } else if (YTDDE_reg.test(el[0])) {
      const month = el[0].split("Month")[1];
      if (month == YTDDE_month) {
        return {
          name: el[0],
          selector: (row) => row[el[0]],
          sortable: true,
        };
      } else return;
    }
    return {
      name: el[0],
      selector: (row) => row[el[0]],
      sortable: true,
    };
  });
  //maybe month counter jst a var not a state
  columns = columns.filter((el) => el);
  console.log("columns", columns);
  data = allData.map((el, i) => {
    if (el.Description) el.Description = el.Description.replaceAll(",", "");

    const obj = { id: i + 1, ...el };
    let { AssetNLAccount, DepreciationMethod, ...obj2 } = obj;
    let entries = Object.entries(obj);
    entries = entries.filter((el) => {
      // if (YTDBV_reg.test(el[0])) {
      //   if (YTDBV_month === "unset" && !YTDBV_month_lock) {
      //     const month = el[0].split("Month")[1];
      //     setYTDBV_month(month);
      //     YTDBV_month_lock = true;
      //     console.log("month for ", el[0], "is: ", month);

      //     return {
      //       name: el[0],
      //       selector: (row) => row[el[0]],
      //       sortable: true,
      //       sortFunction: handleSort,
      //     };
      //   }
      //   return;
      // } else if (YTDDE_reg.test(el[0])) {
      //   if (YTDDE_month === "unset" && !YTDDE_month_lock) {
      //     const month = el[0].split("Month")[1];
      //     setYTDDE_month(month);
      //     YTDDE_month_lock = true;

      //     console.log("month for ", el[0], "is: ", month);
      //     return {
      //       name: el[0],
      //       selector: (row) => row[el[0]],
      //       sortable: true,
      //       sortFunction: handleSort,
      //     };
      //   }
      //   return;
      // }
      return el;
    });
    obj2 = Object.fromEntries(entries);
    return obj2;
  });
  const actionsMemo = React.useMemo(
    () => (
      <Export
        onExport={() => {
          downloadCSV(data, sb);
        }}
      />
    ),
    [data, sb]
  );

  return (
    <StyledDiv>
      <div
        style={{
          position: "relative",
          marginLeft: "50px",
          marginTop: "-30px",
          marginRight: 0,
        }}
      >
        <div className="monthControlNav">
          <Button onClick={() => YTDDE_monthUp()}>
            <p>
              <i class="fas fa-plus-circle"></i>
              {`YTD Dep'n End of month (now showing month: ${YTDDE_month})`}
            </p>
          </Button>
          <Button onClick={() => YTDDE_monthDown()}>
            <p>
              <i class="fas fa-minus-circle"></i>
              {`YTD Dep'n End of month (now showing month: ${YTDDE_month})`}
            </p>
          </Button>
          <Button onClick={() => YTDBV_monthUp()}>
            <p>
              <i class="fas fa-plus-circle"></i>
              {` YTD BookValue of month (now showing month: ${YTDBV_month})`}
            </p>
          </Button>
          <Button onClick={() => YTDBV_monthDown()}>
            <p>
              <i class="fas fa-minus-circle"></i>
              {`YTD BookValue of month (now showing month: ${YTDBV_month})`}
            </p>
          </Button>
        </div>
        <_DataTable
          columns={columns}
          data={data}
          actions={actionsMemo}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          progressPending={loading}
        />
      </div>
    </StyledDiv>
  );
};

export default DataTable;
