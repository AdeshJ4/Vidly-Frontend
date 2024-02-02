import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getGenres } from "../../services/genreService";
import { deleteMovie, getMovies } from "../../services/movieService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/ListGroup";
import { Link } from "react-router-dom";
import RentalTable from "./RentalTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";
import { getRentals } from "../../services/rentalService";

const Rental = ({ user }) => {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "_id", order: "asc" }); // movie name is title
  const count = rentals.length;


  async function fetchRentals() {
    try {
      const { data: rentalData } = await getRentals();
      setRentals(rentalData);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchRentals();
  }, []);

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
  };

  // Filters and sorts the movies based on the current state (e.g., search query, selected genre, sort column, etc.).
  // Utilizes the paginate function to get a subset of movies for the current page.
  const getPagedData = () => {
    const allRentals = [...rentals];
    let filtered = allRentals;

    if (searchQuery)
      filtered = allRentals.filter((m) =>
        m._id.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedRentals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pagedRentals };
  };

  if (count === 0) <p>There are no rentals in the database.</p>;
  const { totalCount, data } = getPagedData();

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
        <p>Showing {totalCount} rentals in the database.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <RentalTable
          rentals={data}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize} // 10 movies on one page
          currentPage={currentPage} // initially one
          onPageChange={handlePageChange} // event handle to change page number
        />
      </div>
    </div>
  );
};

export default Rental;
