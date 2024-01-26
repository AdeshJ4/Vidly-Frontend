import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Get All Movies
export async function getMovies() {
  return await http.get(apiEndpoint);
}

// Get Single Movie
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

// Create or Update Movie
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

// Delete Movie
export async function deleteMovie(movieId) {
  return await http.delete(movieUrl(movieId));
}
