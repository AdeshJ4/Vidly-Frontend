import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/rentals";

// Get Single Rental  -> Search Rental By ID
// api/rentals/65c484554deec8476fb6a7b5
function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export async function getRental(rentalId) {
  try {
    return await http.get(rentalUrl(rentalId));
  } catch (err) {
    throw err;
  }
}

// Get All Rentals
//  /api/rentals?pageNumber=1
function rentalPage(page) {
  try {
    return `${apiEndpoint}?pageNumber=${page}`;
  } catch (err) {
    throw err;
  }
}
export async function getRentals(currentPage) {
  try {
    return await http.get(rentalPage(currentPage));
  } catch (err) {
    throw err;
  }
}

// Create rental
export async function saveRental(rental) {
  try {
    return await http.post(apiEndpoint, rental);
  } catch (err) {
    throw err;
  }
}
