import { useState, useEffect } from "react";
import axios from "axios";

const useDashboardData = () => {
  const [state, setState] = useState({
    totalSum: 0,
    totalByMonth: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await Promise.all([
          axios.get(`http://localhost:8080/totalGrandTotalByMonth`),
          axios.get(`http://localhost:8080/totalGrandTotal`),
        ]);
        setState((prev) => ({
          ...prev,
          totalSum: all[1].data.total_sum,
          totalByMonth: all[0].data.total_by_month,
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
