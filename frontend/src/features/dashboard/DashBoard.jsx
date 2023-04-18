import "./dashboard.scss";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";
import Featured from "../featured/Featured";
import Chart from "../chart/Chart";
import List from "../list/List";

export const DashBoard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="widgets">
          <Widget type="totalorders" />
          <Widget type="totalrevenue" />
          <Widget type="aveordervalue" />
          <Widget type="totalqtyorder" />
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={3 / 1} title="This year (Revenue)" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Order Status</div>
          <List />
        </div>
      </div>
    </div>
  );
};
