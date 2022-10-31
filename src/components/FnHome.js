import React from "react";
import DataTable from "react-data-table-component";
import StyledDiv from "./styles/fnHomeStyle";
import { useSelector, useDispatch } from "react-redux";

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
 const encodedURI = encodeURI(csv)
 const fixedEncodedURI = encodedURI.replaceAll('#', '%23');
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

const FnHome = (props) => {
  const today = new Date();
  const sb = useSelector((state) => state.sb.option);
  const allData = props.fa_allData.fa_allData;
  
  columns = Object.entries(allData[0]);
  columns = columns.map((el) => {
    var num = el[0].match(/\d+$/);
    if (el[0] === "Description") {
      return {
        name: "Description",
        selector: (row) => row[el[0]],
        wrap: true,
        sortable: true,
        format: (row) => `${row[el[0]].slice(0, 200)}`,
      };
    } 
    else if(el[0] === "DepreciationMethod" || el[0] === "AssetNLAccount" ) return
    else if(num && num[0]!= 2022 && (Number(num[0]) != Number(today.getMonth()) + 1)) return
      
    return {
      name: el[0],
      selector: (row) => row[el[0]],
      sortable: true,
    };
  });
  columns = columns.filter(el => el)

  data = allData.map((el, i) => {
    el.Description = el.Description.replaceAll(",", "");
  
    const obj =  { id: i + 1, ...el };
    let {AssetNLAccount, DepreciationMethod, ... obj2} = obj
    let entries = Object.entries(obj);
    entries = entries.filter(el => {
    const num = el[0].match(/\d+$/);
    if(num && num[0]!= 2022 && num[0] != today.getMonth() + 1) return;
    return el;
    })
    obj2 = Object.fromEntries(entries)
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
        <DataTable
          columns={columns}
          data={data}
          actions={actionsMemo}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </StyledDiv>
  );
};

export default FnHome;
