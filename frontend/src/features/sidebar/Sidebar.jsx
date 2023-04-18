import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <p className="title">MENU</p>
        <li>
          <CreditCardIcon className="icon" />
          <span>Orders</span>
        </li>
        <li>
          <StoreIcon className="icon" />
          <span>Products</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
