import axios from "axios";
import { AUTH } from "./apiVariables.js";

class AuthService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = {status: 'dead'};
  }

  getCurrentUser() {
    return axios
    .get(`${AUTH}/`, {
      withCredentials: true
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.response) {
        return error.response;
      } else {
        return this.networkIssue;
      }
    });
  }

  acknowledgeWarning(payload) {
    return axios
    .post(`${AUTH}/acknowledge-warning`, 
      {
        ...payload
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.response) {
        return error.response;
      } else {
        return this.networkIssue;
      }
    });
  }

  logout() {
    return axios
    .get(`${AUTH}/logout`, {
      withCredentials: true
    })
    .catch(error => {
      if (error.response) {
        return error.response;
      } else {
        return this.networkIssue;
      }
    });
  }
}

export default new AuthService();