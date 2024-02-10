import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/users";
// const apiEndpoint = apiUrl + "/users/register";

// create a user/employee
// async function register(user) {
//   return await http.post(apiEndpoint, {
//     name: user.name,
//     email: user.email,
//     password: user.password,
//   });
// }

// /api/users/65c1e2bdc56595645b7d6fce
function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// create or update
export async function registerUser(user) {
  // Update
  if (user._id) {
    const body = { ...user };
    delete body._id; // delete _id property
    return await http.put(`${apiEndpoint}/${user._id}`, body);
    // return await http.put(`${apiEndpoint}/${user._id}`, body);
  } else {
    // create
    return await http.post(apiUrl + "/users/register", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}


// Get All Users
// /api/users?pageNumber=1
function userPage(page) {
  return `${apiEndpoint}?pageNumber=${page}`;
}
export async function getUsers(currentPage) {
  return await http.get(userPage(currentPage));
}

// get Users based on search
// api/users/search/userName?pageNumber=1
function userSearch(query, pageNumber) {
  return `${apiEndpoint}/${query}?pageNumber=${pageNumber}`;
}
export const getUsersBySearchQuery = async (query, pageNumber) => {
  return await http.get(userSearch(query, pageNumber));
};

// Delete Users
export async function deleteUser(userId) {
  return await http.delete(userUrl(userId));
}

