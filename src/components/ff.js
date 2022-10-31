import React from "react";
import DataTable from "react-data-table-component";
import StyledDiv from "./styles/fnHomeStyle";

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify("data", null, 2)}</pre>
);

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

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

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}
const Export = ({ onExport }) => (
  <button
    type="button"
    className="btn btn-primary"
    style={{ position: "relative", right: "100px" }}
    onClick={(e) => onExport(e.target.value)}
  >
    export
  </button>
);

const columns = [
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

const data = [
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
const FnHome = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  return (
    <StyledDiv>
      <div style={{ position: "relative", left: "50px" }}>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          onSelectedRowsChange={handleRowSelected}
          actions={actionsMemo}
        />
      </div>
    </StyledDiv>
  );
};

export default FnHome;
