import "./dashboard.scss";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";
import Featured from "../featured/Featured";
import Chart from "../chart/Chart";
import List from "../list/List";
import useDashboardData from "../../hooks/useDashboardData";
import { transferMonth } from "../../helper/transfers";

export const DashBoard = () => {

  const {state} = useDashboardData();

  // console.log();

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="widgets">
          <Widget type="totalorders" />
          <Widget type="totalrevenue" value={parseInt(state.totalSum).toLocaleString()}/>
          <Widget type="aveordervalue" />
          <Widget type="totalqtyorder" />
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={3 / 1} title="This year (Revenue)" data={transferMonth(state.totalByMonth)} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Order Status</div>
          <List />
        </div>
      </div>
    </div>
  );
};
