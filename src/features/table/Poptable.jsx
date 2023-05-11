import "./poptable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NumericFormat } from "react-number-format";
import { styled } from '@mui/material/styles';

const List = ({ rows }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650,fontSize: 20, }} aria-label="simple table" size="small">
        <TableHead className="tablehead">
          <TableRow>
            <TableCell className="tableCell" width="10%">SKU</TableCell>
            <TableCell className="tableCell" width="10%">Brand</TableCell>
            <TableCell className="tableCell" width="5%">Vender</TableCell>
            <TableCell className="tableCell" width="58%">Name</TableCell>
            <TableCell className="tableCell" width="5%">Price</TableCell>
            <TableCell className="tableCell" width="7%">Qty Ordered</TableCell>
            <TableCell className="tableCell" width="5%">Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.sku}>
              <TableCell className="tableCell"  width="10%">{row.sku}</TableCell>
              <TableCell className="tableCell"  width="10%">{row.brand_name}</TableCell>
              <TableCell className="tableCell"  width="5%">{row.vendors}</TableCell>
              <TableCell className="tableCell"  width="58%">
                <div className="cellWrapper">
                  <img src={row.image} alt="" className="image" />
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell"  width="5%">
                $
                <NumericFormat
                  value={row.price}
                  thousandSeparator=","
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale
                />
              </TableCell>
              <TableCell className="tableCell"  width="7%">{row.qty_ordered}</TableCell>
              <TableCell className="tableCell"  width="5%">{row.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
