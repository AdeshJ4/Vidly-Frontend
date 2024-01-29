import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteCustomer, getCustomers } from "../../services/customerService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/ListGroup"; // customer "isGold" or Not
import { Link } from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";

const Customer = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" }); // customer name is "name"
  const count = customers.length;

  // fetch customers
  async function fetchCustomers() {
    try {
      //It's extracting the data property from the object returned by getGenres() and renaming it to customerData.
      const { data: customerData } = await getCustomers();
      setCustomers(customerData);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  // delete movies
  async function handleDelete(customer) {
    const originalCustomers = [...customers];
    try {
      setCustomers(customers.filter((c) => c._id !== customer._id));
      await deleteCustomer(customer._id);
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 404) {
        toast.error("This customer has already been deleted.");
      }
      setMovies(originalCustomers);
    }
  }

  // you will get page no from Pagination and according to that you have to fetch customers
  const handlePageChange = (page) => {
    // page = 1, 2, 3
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // sorting customers  -> { path: "name", order: "asc" }
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  // Filters and sorts the customers based on the current state (e.g., search query, sort column, etc.).
  const getPagedData = () => {
    const allCustomers = [...customers];
    let filtered = allCustomers;

    if (searchQuery)
      filtered = allCustomers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedCustomers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pagedCustomers };
  };

  if (count === 0) return <p>There are no customers in the database.</p>;
  const { totalCount, data } = getPagedData();

  return (
    <div className="row">
      {/* <div className="col-3">
        <ListGroup
          customers={customers}
          selectedGenre={selectedGenre}
          onGenreSelect={handleGenreSelect}
        />
      </div> */}

      <div className="col">
        {user && (
          <Link
            to="/customers/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Customer
          </Link>
        )}
        <p>Showing {totalCount} Customers in the database.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <CustomerTable
          customers={data}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize} // 6 customers on one page
          currentPage={currentPage} // initially one
          onPageChange={handlePageChange} // event handle to change page number
        />
      </div>
    </div>
  );
};

export default Customer;
