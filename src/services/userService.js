import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/users";

export async function getUser(userId) {
  return await http.get(`${apiEndpoint}/${userId}`);
}

export async function registerUser(user) {
  if (user._id) {
    const body = { ...user };
    delete body._id; // delete _id property
    return await http.put(`${apiEndpoint}/${user._id}`, body);
  } else {
    return await http.post(apiUrl + "/users/register", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export async function getUsers(currentPage) {
  return await http.get(`${apiEndpoint}?pageNumber=${currentPage}`);
}

export const getUsersBySearchQuery = async (query, pageNumber) => {
  return await http.get(
    `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`
  );
};

export async function deleteUser(userId) {
  return await http.delete(`${apiEndpoint}/${userId}`);
}
