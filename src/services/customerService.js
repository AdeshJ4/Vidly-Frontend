import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Get All Movies
export function getCustomers() {
  return http.get(apiEndpoint);
}

// Get Single Movie
export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

// Create or Update Movie
export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, customer);
}

// Delete Movie
export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
