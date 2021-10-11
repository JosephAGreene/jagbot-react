import axios from "axios";
import { MOD } from "./apiVariables.js";

class ModerationService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = { status: 'dead' };
  }

  updateBan(payload) {
    return axios
      .post(`${MOD}/update-ban`,
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

}

export default new ModerationService();