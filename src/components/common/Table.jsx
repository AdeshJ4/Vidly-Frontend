import React, { memo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

// data = customer data / movie data /genre data / rental data
// columns = columns contain CRUD Operation and Fields Names
// sortColumns = initially how data should be sorted like asc or desc
// onSort = if you click on field name then data should be reversed

const Table = ({ columns, data, sortColumn, onSort }) => {
  return (
    <>
      <div class="table-responsive mb-3">
        <table className="table table-bordered table-hover border-primary">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
    </>
  );
};

export default memo(Table);
