import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/rentals";



// Get Single Rental  -> Search Rental By ID
// api/rentals/65c484554deec8476fb6a7b5
function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export async function getRental(rentalId) {
  return await http.get(rentalUrl(rentalId));
}

// Get All Rentals
//  /api/rentals?pageNumber=1
function rentalPage(page) {
  return `${apiEndpoint}?pageNumber=${page}`;
}
export async function getRentals(currentPage) {
  return await http.get(rentalPage(currentPage));
}


// Create rental
export async function saveRental(rental) {
  return await http.post(apiEndpoint, rental);
}


