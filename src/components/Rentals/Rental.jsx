import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import RentalTable from "./RentalTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";
import { getRental, getRentals } from "../../services/rentalService";

const Rental = ({ user }) => {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "_id", order: "asc" });
  const [count, setTotalCount] = useState();

  const fetchRentalsData = async () => {
    try {
      let rentalsData;
      if (searchQuery) {
        if (searchQuery.length >= 24) {
          rentalsData = await getRental(searchQuery);
        } else {
          setRentals([]);
          setTotalCount(0);
          return; // Exit the function early to prevent further execution
        }
      } else {
        rentalsData = await getRentals(currentPage);
      }
  
      console.log(rentalsData);
      console.log("count: ", rentalsData.data.count);
      console.log("rental: ", rentalsData.data.rentals);
      const sorted = _.orderBy(
        rentalsData.data.rentals,
        [sortColumn.path],
        [sortColumn.order]
      );
      setRentals(sorted);
      setTotalCount(rentalsData.data.count);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchRentalsData();
  }, [currentPage, searchQuery]);

  // you will get page no from Pagination and according to that you have to fetch movies
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // sorting movies
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(rentals, [sortColumn.path], [sortColumn.order]);
    setRentals(sorted);
  };

  if (count === 0) <p>There are no rentals in the database.</p>;

  return (
    <div className="row">
      <div className="col">
        {user && (
          <Link
            to="/rentals/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Rental
          </Link>
        )}
        <p class="text-muted">
          Showing <span class="text-primary">{count}</span> rentals in the
          database.
        </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <RentalTable
          rentals={rentals}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize} // 10 movies on one page
          currentPage={currentPage} // initially one
          onPageChange={handlePageChange} // event handle to change page number
        />
      </div>
    </div>
  );
};

export default Rental;
