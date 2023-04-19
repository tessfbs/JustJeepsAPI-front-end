import "./sidebar.scss";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <p className="title">MENU</p>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
        </Link>
        <Link to="/dashboard/po" style={{ textDecoration: "none" }}>
          <li>
            <StoreIcon className="icon" />
            <span>Products</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
