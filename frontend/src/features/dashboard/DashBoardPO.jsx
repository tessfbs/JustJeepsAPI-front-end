import "./dashboardpo.scss";
import Sidebar from "../sidebar/Sidebar";
import Widget from "../widget/Widget";
import Piechart from "../pie/Piechart";

export const DashBoardPO = () => {
  return (
    <div className="dashboardpo">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="left">
          <div className="widgets">
            <Widget type="totalorders" />
            <Widget type="totalrevenue" />
          </div>

          <div className="mostPopular">
            <h1 className="title">Most Popular Product</h1>
            <div className="item">
              <img
                src="https://www.justjeeps.com/pub/media/catalog/product//0/1/01-046.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">
                  LUK Clutch Kit For 2007-11 JK Wrangler 3.8 Ltr & 2002-04
                  Liberty KJ 3.7 Ltr
                </h1>
                <div className="detailItem">
                  <span className="itemKey">SKU:</span>
                  <span className="itemValue">01-046</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Wight:</span>
                  <span className="itemValue">4</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Ordered This Year:</span>
                  <span className="itemValue">28</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Vendor:</span>
                  <span className="itemValue">Meyer</span>
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
    </div>
  );
};
