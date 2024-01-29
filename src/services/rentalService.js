import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/rentals";

function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Get All Rentals
export async function getRentals() {
  return await http.get(apiEndpoint);
}

// Get Single Rental
export async function getRental(rentalId) {
  return await http.get(rentalUrl(rentalId));
}

// Create rental
export async function saveRental(rental) {
  return await http.post(apiEndpoint, rental);
}

// Delete Movie
// export async function deleteRental(rentalId) {
//   return await http.delete(rentalUrl(rentalId));
// }
