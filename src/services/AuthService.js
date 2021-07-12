import axios from "axios";
import { AUTH } from "./apiVariables.js";

class AuthService {
  login(email, password) {
    return axios
      .post(AUTH + 'signin', {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response;
      })
      .catch(error => {
        const networkIssue = {status: 'dead'};
        if (error.response) {
          return error.response;
        } else {
          return networkIssue;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();