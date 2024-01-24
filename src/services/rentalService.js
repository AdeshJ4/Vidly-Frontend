import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/rentals";

function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Get All Rentals
export function getRentals() {
  return http.get(apiEndpoint);
}

// Get Single Rental
export function getRental(rentalId) {
  return http.get(rentalUrl(rentalId));
}

// Create rental
export function saveRental(rental) {
  return http.post(apiEndpoint, rental);
}

// Delete Movie
export function deleteMovie(movieId) {
  return http.delete(rentalUrl(movieId));
}
