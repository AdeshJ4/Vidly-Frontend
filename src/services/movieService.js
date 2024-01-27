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
export async function getMovie(movieId) {
  return await http.get(movieUrl(movieId));
}

// Create or Update Movie
export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;  // delete _id property
    return await http.put(movieUrl(movie._id), body);
  }

  return await http.post(apiEndpoint, movie);
}

// Delete Movie
export async function deleteMovie(movieId) {
  return await http.delete(movieUrl(movieId));
}
