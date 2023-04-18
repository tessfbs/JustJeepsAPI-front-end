import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../datatablesource.jsx";
import "./list.scss";

const List = () => {

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
