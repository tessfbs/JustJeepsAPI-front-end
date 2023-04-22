import { NumericFormat } from "react-number-format";

export const transferMonth = (obj) => {
  const result = [];
  const element = {};
  const array = Object.keys(obj).reverse();
  array.forEach((item) => {
    switch (item.slice(-2)) {
      case "01":
        result.push({ name: "January", Total: parseInt(obj[item]) });
        break;
      case "02":
        result.push({ name: "February", Total: parseInt(obj[item]) });
        break;
      case "03":
        result.push({ name: "March", Total: parseInt(obj[item]) });
        break;
      case "04":
        result.push({ name: "April", Total: parseInt(obj[item]) });
        break;
      case "05":
        result.push({ name: "May", Total: parseInt(obj[item]) });
        break;
      case "06":
        result.push({ name: "June", Total: parseInt(obj[item]) });
        break;
      case "07":
        result.push({ name: "July", Total: parseInt(obj[item]) });
        break;
      case "08":
        result.push({ name: "August", Total: parseInt(obj[item]) });
        break;
      case "09":
        result.push({ name: "September", Total: parseInt(obj[item]) });
        break;
      case "10":
        result.push({ name: "October", Total: parseInt(obj[item]) });
        break;
      case "11":
        result.push({ name: "November", Total: parseInt(obj[item]) });
        break;
      case "12":
        result.push({ name: "December", Total: parseInt(obj[item]) });
        break;
      default:
        break;
    }
  });
  return result;
};

export const transferOrder = (array) => {
  const result = [];
  console.log(array[1]);
  array.forEach(
    ({
      id,
      customer_firstname,
      customer_lastname,
      grand_total,
      status,
      order_currency_code,
      total_qty_ordered,
    }) => {
      result.push({
        id,
        customer_firstname: (customer_firstname || "").toUpperCase(),
        customer_lastname: (customer_lastname || "").toUpperCase(),
        grand_total,
        status,
        order_currency_code,
        total_qty_ordered,
      });
    }
  );
  return result;
};

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customer_name",
    headerName: "Customer Name",
    width: 230,
    valueGetter: (params) =>
      `${params.row.customer_firstname || ""} ${
        params.row.customer_lastname || ""
      }`,
  },
  {
    field: "order_currency_code",
    headerName: "Currency Code",
    width: 200,
  },
  {
    field: "grand_total",
    headerName: "Grand Total",
    width: 260,
    renderCell: (params) => {
      return (
        <div className="grandTotal">
          $<NumericFormat value={params.row.grand_total} thousandSeparator="," displayType="text" decimalScale={2} fixedDecimalScale />
        </div>
      );
    },
  },
  {
    field: "total_qty_ordered",
    headerName: "Quantity Ordered",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];