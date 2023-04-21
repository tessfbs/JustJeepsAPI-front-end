import './featured.scss'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const Featured = ({value}) => {
  
  let current = parseInt(value[0]/1000);
  let last = parseInt(value[1]/1000);
  let target = parseInt(last * 1.1);
  let ratio = parseInt((current / target) * 100);
  if (ratio > 100) {
    ratio = 100;
  }
  
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={ratio} text={"66%"} strokeWidth={5}/>
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">${current}k</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="tiemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${target}k</div>
            </div>
          </div>
          {/* <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${last}k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
