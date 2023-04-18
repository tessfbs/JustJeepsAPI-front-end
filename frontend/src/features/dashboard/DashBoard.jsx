import "./dashboard.scss";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";

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
					charts
				</div>
				<div className="listContainer">
					List
				</div>
      </div>
    </div>
  );
};
