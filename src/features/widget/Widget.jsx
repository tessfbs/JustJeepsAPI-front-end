import "./widget.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { toggleButtonGroupClasses } from "@mui/material";

const Widget = (props) => {
  const {type} = props;
  let data;
  //temporary
  const amount = props.value || "Unknown";
  const diff = 20;

  switch (type) {
    case "totalorders":
      data = {
        title: "TOTAL NUMBER OF ORDERS",
        isMoney: false,
        link: "See all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "totalrevenue":
      data = {
        title: "TOTAL REVENUE",
        isMoney: toggleButtonGroupClasses,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "aveordervalue":
      data = {
        title: "AVERAGE ORDER VALUE",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "totalqtyorder":
      data = {
        title: "TOTAL QUANTITY ORDERED",
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "numproduct":
      data = {
        title: "NUMBER OF PRODUCTS",
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "totalordered":
      data = {
        title: "TOTAL PRODUCTS ORDERED",
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="leftw">
        <div className="title">{data.title}</div>
        <div className="counter">{data.isMoney && "$"}{amount}</div>
      </div>
      <div className="rightw">
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
