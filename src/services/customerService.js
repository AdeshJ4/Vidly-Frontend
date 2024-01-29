import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Get All Movies
export async function getCustomers() {
  return await http.get(apiEndpoint);
}

// Get Single Movie
export async function getCustomer(customerId) {
  return await http.get(customerUrl(customerId));
}

// Create or Update Movie
export async function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return await http.put(customerUrl(customer._id), body);
  }

  return await http.post(apiEndpoint, customer);
}

// Delete Movie
export async function deleteCustomer(customerId) {
  return await http.delete(customerUrl(customerId));
}
