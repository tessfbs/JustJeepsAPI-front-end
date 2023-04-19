import { useState, useEffect } from "react";
import axios from "axios";

const useDashboardData = () => {
  const [state, setState] = useState({
    totalSum: 0,
    totalByMonth: {},
    totalCount: 0,
    aveValue:0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await Promise.all([
          axios.get(`http://localhost:8080/totalGrandTotalByMonth`),
          axios.get(`http://localhost:8080/totalOrderInfo`),
        ]);
        setState((prev) => ({
          ...prev,
          totalByMonth: all[0].data.total_by_month,
          totalSum: all[1].data.total_sum,
          totalCount: all[1].data.count,
          aveValue: all[1].data.avg,
        }));
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      }
    };
    fetchData();
  }, []);

  return { state };
};

export default useDashboardData;
