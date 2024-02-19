import http from "./httpService";
import { apiUrl } from "../config/config.json";
import { toast } from "react-toastify";

const apiEndpoint = apiUrl + "/customers";

// Get Single Customer
export async function getCustomer(customerId) {
  try {
    return await http.get(`${apiEndpoint}/${customerId}`);
  } catch (err) {
    throw err;
  }
}

// Get All Customers
// /api/customers?pageNumber=1
export async function getCustomers(currentPage) {
  try {
    return await http.get(`${apiEndpoint}?pageNumber=${currentPage}`);
  } catch (err) {
    throw err;
  }
}

// Get Customers based on membership
// api/customers/membership/Gold?pageNumber=1
export async function getCustomersByMemberships(membership, pageNumber) {
  try {
    return await http.get(
      `${apiEndpoint}/membership/${membership.name}?pageNumber=${pageNumber}`
    );
  } catch (err) {
    throw err;
  }
  // return await http.get(customerMembership(pageNumber, membership));
}

// get Movies based on search
// api/customers/search/customerName?pageNumber=1
export const getCustomersBySearchQuery = async (query, pageNumber) => {
  try {
    return await http.get(
      `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`
    );
  } catch (err) {
    throw err;
  }
};

// Create or Update Customer
export async function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    try {
      return await http.put(`${apiEndpoint}/${customer._id}`, body);
    } catch (err) {
      throw err;
    }
  } else {
    try {
      return await http.post(apiEndpoint, customer);
    } catch (err) {
      throw err;
    }
  }
}

// Delete Customer
export async function deleteCustomer(customerId) {
  try {
    return await http.delete(`${apiEndpoint}/${customerId}`);
  } catch (err) {
    throw err;
  }
}
