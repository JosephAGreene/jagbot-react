import axios from "axios";
import { USER } from "./apiVariables.js";

class UserService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = {status: 'dead'};
  }

  // Return bots belonging to user
  getBots() {
    return axios
      .get(`${USER}/bots`,
      {
        headers: {
          'x-auth-token': JSON.parse(localStorage.getItem('user')).accessToken,
        }
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

}

export default new UserService();