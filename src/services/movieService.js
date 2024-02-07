import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/movies";

// /api/movies/65c1e2bdc56595645b7d6fce
function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// /api/movies?pageNumber=1
function moviePage(page) {
  return `${apiEndpoint}?pageNumber=${page}`;
}

// Get All Movies
export async function getMovies(currentPage) {
  return await http.get(moviePage(currentPage));
}

// api/movies/search/movieName?pageNumber=1
function movieSearch(query, pageNumber) {
  return `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`;
}
// get Movies based on search
export const getMoviesBySearchQuery = async (query, pageNumber) => {
  return await http.get(movieSearch(query, pageNumber));
};

// api/movies/genre/Action?pageNumber=1
function movieGenre(genre, pageNumber) {
  return `${apiEndpoint}/genre/${genre.name}?pageNumber=${pageNumber}`;
}

// Get Movies based on genre
export async function getMoviesByGenre(pageNumber, genre) {
  return await http.get(movieGenre(pageNumber, genre));
}

// Get Single Movie
export async function getMovie(movieId) {
  return await http.get(movieUrl(movieId));
}

// Create or Update Movie
export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id; // delete _id property
    return await http.put(movieUrl(movie._id), body);
  }

  return await http.post(apiEndpoint, movie);
}

// Delete Movie
export async function deleteMovie(movieId) {
  return await http.delete(movieUrl(movieId));
}
