import { NumericFormat } from "react-number-format";

export const userRows = [
  {
    id: 1,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 8745,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 2,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 3265,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 3,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 8574,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 4,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 8598,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 5,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total:85741,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 6,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total:1120.32,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 7,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 985.14,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 8,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 5248.14,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 9,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 25412.1,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 10,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total:1022002,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
  {
    id: 11,
    customer_firstname: "Snow",
    customer_lastname: "Asselini",
    grand_total: 10220,
    status: "active",
    currency_code: "USD",
    qty_ordered: 35,
  },
];

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
    field: "currency_code",
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
    field: "qty_ordered",
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
