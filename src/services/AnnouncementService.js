import axios from "axios";
import { ANNOUNCE } from "./apiVariables.js";

class AnnouncementService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = { status: 'dead' };
  }


  addNewAnnouncement(payload) {
    return axios
      .post(`${ANNOUNCE}/new-announcement`,
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

  updateAnnouncement(payload) {
    return axios
      .put(`${ANNOUNCE}/update-announcement`,
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