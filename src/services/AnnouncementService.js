import axios from "axios";
import { ANNOUNCE } from "./apiVariables.js";

class AnnouncementService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = { status: 'dead' };
  }


  addJoinAnnouncement(payload) {
    return axios
      .post(`${ANNOUNCE}/new-join`,
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

export default new AnnouncementService();