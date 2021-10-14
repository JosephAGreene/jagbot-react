import axios from "axios";
import { MOD } from "./apiVariables.js";

class ModerationService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = { status: 'dead' };
  }

  updateBaseModeration(payload) {
    return axios
      .post(`${MOD}/update-base-moderation`,
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

  updateHelpModeration(payload) {
    return axios
      .post(`${MOD}/update-help-moderation`,
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