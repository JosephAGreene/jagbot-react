import axios from "axios";
import { BOT } from "./apiVariables.js";

class BotService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = {status: 'dead'};
  }

  addSingleResponseModule(payload) {
    return axios
    .post(`${BOT}single-response`, 
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

  updateSingleResponseModule(payload) {
    return axios
    .post(`${BOT}update-single-response`, 
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

  deleteCommandModule(payload) {
    return axios
    .delete(`${BOT}command-module`, 
      { 
        data: payload
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

export default new BotService();