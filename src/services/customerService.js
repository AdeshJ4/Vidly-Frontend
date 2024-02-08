import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/customers";

// Get All Customers
// export async function getCustomers(currentPage) {
//   const data = await http.get(apiEndpoint);
//   console.log(data);
//   return data;
// }

// Get Single Customer
function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export async function getCustomer(customerId) {
  return await http.get(customerUrl(customerId));
}

// Get All Customers
// /api/customers?pageNumber=1
function customerPage(page) {
  return `${apiEndpoint}?pageNumber=${page}`;
}
export async function getCustomers(currentPage) {
  // const { data } = await http.get(customerPage(currentPage));
  // console.log(data.count);
  // console.log(data.customers);
  return await http.get(customerPage(currentPage));
}

// Get Customers based on membership
// api/customers/membership/Gold?pageNumber=1
function customerMembership(membership, pageNumber) {
  return `${apiEndpoint}/membership/${membership.name}?pageNumber=${pageNumber}`;
}
export async function getCustomersByMemberships(pageNumber, membership) {
  return await http.get(customerMembership(pageNumber, membership));
}

// get Movies based on search
// api/customers/search/customerName?pageNumber=1
function customerSearch(query, pageNumber) {
  return `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`;
}
export const getCustomersBySearchQuery = async (query, pageNumber) => {
  return await http.get(customerSearch(query, pageNumber));
};

// Create or Update Customer
export async function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return await http.put(customerUrl(customer._id), body);
  }

  return await http.post(apiEndpoint, customer);
}

// Delete Customer
export async function deleteCustomer(customerId) {
  return await http.delete(customerUrl(customerId));
}
