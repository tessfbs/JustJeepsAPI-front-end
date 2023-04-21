import "./dashboard.scss";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";
import Featured from "../featured/Featured";
import Chart from "../chart/Chart";
import List from "../list/List";
import { useDashboardData } from "../../hooks/useDashboardData";
import { transferMonth } from "../../helper/transfers";
import { NumericFormat } from "react-number-format";

export const DashBoard = () => {
  const { state } = useDashboardData();
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="widgets">
          <Widget
            type="totalorders"
            value={state.totalCount.toLocaleString()}
          />
          <Widget
            type="totalrevenue"
            value={parseInt(state.totalSum).toLocaleString()}
          />
          <Widget
            type="aveordervalue"
            value={
              <NumericFormat
                value={state.aveValue}
                thousandSeparator=","
                displayType="text"
                decimalScale={2}
                fixedDecimalScale
              />
            }
          />
          <Widget type="totalqtyorder" value={state.totalQty} />
        </div>
        <div className="charts">
          <Featured value={[state.totalCurMonth, state.totalLastMonth]} />
          <Chart
            aspect={3 / 1}
            title="This year (Revenue)"
            data={transferMonth(state.totalByMonth)}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Order Status</div>
          <List value={state.orders} />
        </div>
      </div>
    </div>
  );
};
