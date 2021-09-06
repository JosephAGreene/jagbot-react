import axios from "axios";
import { AUTOMOD } from "./apiVariables.js";

class AutoModService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = { status: 'dead' };
  }

  updateInviteFilter(payload) {
    return axios
      .post(`${AUTOMOD}/invite-filter`,
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


  updateMassCapsFilter(payload) {
    return axios
      .post(`${AUTOMOD}/masscaps-filter`,
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

  updateMassMentionsFilter(payload) {
    return axios
      .post(`${AUTOMOD}/massmentions-filter`,
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

export default new AutoModService();