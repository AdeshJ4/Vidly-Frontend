import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/movies";

// Get All Movies
// /api/movies?pageNumber=1
export async function getMovies(currentPage) {
  try {
    return await http.get(`${apiEndpoint}?pageNumber=${currentPage}`);
  } catch (err) {
    throw err;
  }
}

// get Movies based on search
// api/movies/search/movieName?pageNumber=1
export const getMoviesBySearchQuery = async (query, pageNumber) => {
  try {
    return await http.get(
      `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`
    );
  } catch (err) {
    throw err;
  }
};

// Get Movies based on genre
// api/movies/genre/Action?pageNumber=1
export async function getMoviesByGenre(genre, pageNumber) {
  try {
    return await http.get(
      `${apiEndpoint}/genre/${genre.name}?pageNumber=${pageNumber}`
    );
  } catch (err) {
    throw err;
  }
}

// Get Single Movie
export async function getMovie(movieId) {
  try {
    return await http.get(`${apiEndpoint}/${movieId}`);
  } catch (err) {
    throw err;
  }
}

// Create or Update Movie
export async function saveMovie(movie) {
  try {
    if (movie._id) {
      const body = { ...movie };
      delete body._id; // delete _id property
      return await http.put(`${apiEndpoint}/${movie._id}`, body);
    }

    return await http.post(apiEndpoint, movie);
  } catch (err) {
    throw err;
  }
}

// Delete Movie
export async function deleteMovie(movieId) {
  try {
    return await http.delete(`${apiEndpoint}/${movieId}`);
  } catch (err) {
    throw err;
  }
}
