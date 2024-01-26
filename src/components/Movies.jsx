import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" }); // movie name is title
  const count = movies.length;

  // fetch movies and genres
  async function fetchData() {
    try {
      //It's extracting the data property from the object returned by getGenres() and renaming it to genreData.
      const { data: genreData } = await getGenres();
      //It's extracting the data property from the object returned by getMovies() and renaming it to movieData.
      const { data: movieData } = await getMovies();

      setMovies(movieData);
      setGenres(genreData);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // delete movies
  async function handleDelete(movie) {
    const originalMovies = [...movies]; //Create a copy of the original array of movies
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

  // handle like
  const handleLike = (movie) => {
    const originalMovies = [...movies];
    const index = originalMovies.indexOf(movie);

    // originalMovies[index] = { ...originalMovies[index] };
    originalMovies[index].liked = !originalMovies[index].liked;

    setMovies(originalMovies);
  };

  // you will get page no from Pagination and according to that you have to fetch movies
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // get all movies according to genre
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

  // sorting movies
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  // Filters and sorts the movies based on the current state (e.g., search query, selected genre, sort column, etc.).
  // Utilizes the paginate function to get a subset of movies for the current page.
  const getPagedData = () => {
    const allMovies = [...movies];
    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // all movies having selected genre will be returned.
    else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pagedMovies };
  };

  if (count === 0) return <p>There are no movies in the database.</p>;
  const { totalCount, data } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={handleGenreSelect}
        />
      </div>
    </div>
  );
};

export default Movies;
