import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/genres";

function genreUrl(id) {
  return `${apiEndpoint}/${id}`
}

// Get All Genres
export async function getGenres(){
  return await http.get(apiEndpoint);
}

// Get Single Movie
export function getGenre(genreId) {
  return http.get(genreUrl(genreId));
}


// Create or Update Genre
export function saveGenre(genre) {
  // update
  if (genre._id) {
    const body = { ...genre };
    delete body._id;
    return http.put(genreUrl(genre._id), body);
  }
  // create
  return http.post(apiEndpoint, movie);
}


// Delete Movie
export function deleteGenre(genreId) {
  return http.delete(genreUrl(genreId));
}
