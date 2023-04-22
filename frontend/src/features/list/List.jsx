import { DataGrid } from "@mui/x-data-grid";
import { transferOrder,userColumns } from "../../helper/transfers.jsx";
import "./list.scss";

const List = ({value}) => {
  const userRows = transferOrder(value);
  return (
    <div className="datatable">

      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={userColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5,10]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default List;
