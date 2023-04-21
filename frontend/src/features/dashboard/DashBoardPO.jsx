import "./dashboardpo.scss";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";
import Piechart from "../pie/Piechart";
import { useDashboardpoData } from "../../hooks/useDashboardData";
import Poptable from "../table/Poptable";

export const DashBoardPO = () => {
  const { state } = useDashboardpoData();
  return (
    <div className="dashboardpo">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="top">
          <div className="left">
            <div className="widgets">
              <Widget type="numproduct" value={state.numProduct} />
              <Widget type="totalordered" value={state.totalSold} />
            </div>

            <div className="mostPopular">
              <h1 className="title">Most Popular Product</h1>
              <div className="item">
                <img
                  src={state.topPopular[0] && state.topPopular[0].image}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">
                    {state.topPopular[0] && state.topPopular[0].name}
                  </h1>
                  <div className="detailItem">
                    <span className="itemKey">SKU:</span>
                    <span className="itemValue">
                      {state.topPopular[0] && state.topPopular[0].sku}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Wight:</span>
                    <span className="itemValue">
                      {state.topPopular[0] && state.topPopular[0].weight}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Total Ordered This Year:</span>
                    <span className="itemValue">
                      {state.topPopular[0] && state.topPopular[0].qty_ordered}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Vendor:</span>
                    <span className="itemValue">
                      {state.topPopular[0] && state.topPopular[0].vendors}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="rightContainer">
              <h1 className="title">Orders By Vendors</h1>
              <Piechart />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="tableTitle">
            Top 10 popular products
          </div>
          <Poptable rows={state.topPopular}/>
        </div>
      </div>
    </div>
  );
};
