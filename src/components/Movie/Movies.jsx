import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getGenres } from "../../services/genreService";
import {
  deleteMovie,
  getMovies,
  getMoviesByGenre,
  getMoviesBySearchQuery,
} from "../../services/movieService";
import ListGroup from "../common/ListGroup";
import { Link } from "react-router-dom";
import MoviesTable from "./MoviesTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" }); // movie name is title
  const [count, setTotalCount] = useState();

  const fetchMoviesData = async () => {
    try {
      let moviesData;
      if (searchQuery) {
        moviesData = await getMoviesBySearchQuery(searchQuery, currentPage);
      } else if (selectedGenre) {
        moviesData = await getMoviesByGenre(selectedGenre, currentPage);
      } else {
        moviesData = await getMovies(currentPage);
      }
      const sorted = _.orderBy(
        moviesData.data.movies,
        [sortColumn.path],
        [sortColumn.order]
      );
      setMovies(sorted);
      setTotalCount(moviesData.data.count);
    } catch (err) {
      toast.error("Failed to fetch movies.");
    }
  };

  const fetchGenres = async () => {
    try {
      const { data } = await getGenres();
      setGenres(data);
    } catch (err) {
      toast.error("Failed to fetch genres.");
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMoviesData();
  }, [currentPage, searchQuery, selectedGenre]);

  // delete movies
  async function handleDelete(movie) {
    const originalMovies = [...movies];
    setMovies(movies.filter((m) => m._id !== movie._id));
    try {
      await deleteMovie(movie._id);
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      setMovies(originalMovies);
    }
  }

  const handleLike = (movie) => {
    const originalMovies = [...movies];
    const index = originalMovies.indexOf(movie);

    // originalMovies[index] = { ...originalMovies[index] };
    originalMovies[index].liked = !originalMovies[index].liked;

    setMovies(originalMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // sorting movies
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    setMovies(sorted);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  if (count === 0) <p>There are no movies in the database.</p>;

  return (
    <div className="row">
      <div className="col-md-3 mb-3">
        <ListGroup
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={handleGenreSelect}
        />
      </div>

      <div className="col-md-9">
        {user && (
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        )}

        <p class="text-muted">
          Showing <span class="text-primary">{count}</span> movies in the
          database.
        </p>

        <SearchBox value={searchQuery} onChange={handleSearch} />

        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
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

export default Movies;
