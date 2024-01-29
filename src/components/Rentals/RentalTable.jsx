import Table from "../common/Table";

const RentalTable = ({ rentals, sortColumn, onSort, onLike, onDelete }) => {
  const columns = [
    {
      path: "customer.name",
      label: "Customer",
    },
    { path: "movie.title", label: "Movies" },
    { path: "dateOut", label: "Date Out" },
    { path: "dateReturned", label: "Date Returned" },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={rentals}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default RentalTable;
