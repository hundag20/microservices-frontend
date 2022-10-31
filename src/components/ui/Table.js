import StyledDiv from "../styles/tablifyStyle";

let tableContent = [];
const TableData = () => {
  return tableContent;
};

const _12hourformat = (time) => {
  const t = time.split(":");
  const hour = Number(t[0]);
  if (hour < 12) return `${t[0]}:${t[1]} AM`;
  else return `${hour === 12 ? 12 : hour - 12}:${t[1]} PM`;
};

const getDeviation = (time) => {
  const t = time.split(":");
  const hour = Number(t[0]);
  const minute = Number(t[1]);
  if (hour < 12) {
    //morning sched(2 - 6)
    if (hour - 8 === 0) {
      if (minute === 0) {
        //on time
        return (
          <p className="early">{`+00:${minute > 9 ? minute : "0" + minute}`}</p>
        );
      }
      //late for less than an hour
      return (
        <p className="late">{`+00:${minute > 9 ? minute : "0" + minute}`}</p>
      );
    } else if (hour - 8 > 0) {
      //late for more than an hour
      return (
        <p className="late">{`+${hour - 8}:${
          minute > 9 ? minute : "0" + minute
        }`}</p>
      );
    } else {
      //early
      return (
        <p className="early">{`-${hour - 7 === 0 ? `00` : Math.abs(hour - 7)}:${
          60 - minute > 9 ? 60 - minute : "0" + (60 - minute)
        }`}</p>
      );
    }
  } else if (hour < 16 || (hour === 16 && minute <= 30)) {
    //after lunch (7 - 10:30)
    if (hour - 13 === 0) {
      if (minute === 0) {
        //on time
        return (
          <p className="early">{`+00:${minute > 9 ? minute : "0" + minute}`}</p>
        );
      }
      //late for less than an hour
      return (
        <p className="late">{`+00:${minute > 9 ? minute : "0" + minute}`}</p>
      );
    } else if (hour - 13 > 0) {
      //late for more than an hour
      return (
        <p className="late">{`+${hour - 13}:${
          minute > 9 ? minute : "0" + minute
        }`}</p>
      );
    } else {
      //early
      return (
        <p className="early">{`-${
          Math.abs(hour - 12) === 0 ? `00` : hour - 12
        }:${60 - minute > 9 ? 60 - minute : "0" + (60 - minute)}`}</p>
      );
    }
  } else {
    //evening (10:30 +)
    if (hour - 16 === 0) {
      if (minute === 0) {
        //on time
        return (
          <p className="early">{`OT 00:${
            minute > 9 ? minute : "0" + minute
          }`}</p>
        );
      }
      //ot for less than an 1hr and 30 minutes
      return (
        <p className="early">{`OT 00:${
          minute - 30 > 9 ? minute - 30 : "0" + (minute - 30)
        }`}</p>
      );
    } else if (hour - 16 > 0) {
      if (hour - 16 === 1) {
        return <p className="early">{`OT 00:${minute + 30}`}</p>;
      } else {
        return <p className="early">{`OT ${hour - 17}:${minute + 30}`}</p>;
      }
    }
  }
};

const Table = (props) => {
  const tablify = (data) => {
    let rows = [];
    Array.from(data).forEach((el) => {
      let gate = "";
      if (el.att.sn === "AEXH204460398") gate = "Garage gate";
      if (el.att.sn === "AF4C201260678") gate = "Sales gate";
      if (el.att.sn === "AEXH201060468") gate = "Main building";
      rows.push(
        <tr>
          <th></th>
          <th></th>
          <th>{`${el.att.CHECKTIME.split("T")[0]}`}</th>
          <th>{_12hourformat(el.att.CHECKTIME.split("T")[1].split(".")[0])}</th>
          <th>{getDeviation(el.att.CHECKTIME.split("T")[1].split(".")[0])}</th>
          <th>{gate}</th>
          <th>{el.userInfo.BADGENUMBER}</th>
          <th>{el.userInfo.NAME}</th>
          <th>{el.userInfo.EMail}</th>
        </tr>
      );
    });
    return (
      <StyledDiv>
        <div>
          <table
            id="responsive-data-table"
            className="table dt-responsive nowrap"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th> </th>
                <th> </th>
                <th>Date</th>
                <th>CHECKTIME</th>
                <th>DEVIATION</th>
                <th>GATE</th>
                <th>BADGENUMBER</th>
                <th>NAME</th>
                <th>EMAIL</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </table>
        </div>
      </StyledDiv>
    );
  };
  tableContent = tablify(props.data);
  return <TableData />;
};
export default Table;
