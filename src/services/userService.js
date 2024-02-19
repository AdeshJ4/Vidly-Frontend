import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/users";

//get single user
// /api/users/65c1e2bdc56595645b7d6fce
export async function getUser(userId) {
  try {
    return await http.get(`${apiEndpoint}/${userId}`);
  } catch (err) {
    throw err;
  }
}

// create or update
export async function registerUser(user) {
  // Update
  try {
    if (user._id) {
      const body = { ...user };
      delete body._id; // delete _id property
      return await http.put(`${apiEndpoint}/${user._id}`, body);
    } else {
      // create
      return await http.post(apiUrl + "/users/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  } catch (err) {
    throw err;
  }
}

// Get All Users
// /api/users?pageNumber=1
export async function getUsers(currentPage) {
  try {
    return await http.get(`${apiEndpoint}?pageNumber=${currentPage}`);
  } catch (err) {
    throw err;
  }
}

// get Users based on search
// api/users/search/userName?pageNumber=1
export const getUsersBySearchQuery = async (query, pageNumber) => {
  try {
    return await http.get(
      `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`
    );
  } catch (err) {
    throw err;
  }
};

// Delete Users
export async function deleteUser(userId) {
  try {
    return await http.delete(`${apiEndpoint}/${userId}`);
  } catch (err) {
    throw err;
  }
}
