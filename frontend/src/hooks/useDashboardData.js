import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboardData = () => {
  const [state, setState] = useState({
    totalSum: 0,
    totalByMonth: {},
    totalCount: 0,
    aveValue:0,
    totalQty:0,
    totalCurMonth:0,
    totalLastMonth:0,
    orders:[],
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
          orders: all[0].data.orders,
          totalByMonth: all[0].data.total_by_month,
          totalCurMonth: all[0].data.total_this_month,
          totalLastMonth: all[0].data.total_last_month,
          totalSum: all[1].data.totalSum,
          totalCount: all[1].data.count,
          aveValue: all[1].data.avg,
          totalQty: all[1].data.totalQty,
        }));
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      }
    };
    fetchData();
  }, []);

  return { state };
};

export const useDashboardpoData = () => {
  const [state, setState] = useState({
    numProduct: 0,
    totalSold: 0,
    topPopular: []
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const all = await Promise.all([
            axios.get(`http://localhost:8080/productinfo`),
            axios.get(`http://localhost:8080/toppopularproduct`),
          ]);
          setState((prev) => ({
            ...prev,
            numProduct: all[0].data.numProduct,
            totalSold:all[0].data.totalSold,
            topPopular: all[1].data,
          }));
        } catch (error) {
          console.error("Failed to fetch data from backend:", error);
        }
      };
      fetchData();
      
    } catch (error) {
      
    }
  },[]
  );
  return { state };
}
