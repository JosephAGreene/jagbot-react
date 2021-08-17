import axios from "axios";
import { CUSTOM } from "./apiVariables.js";

class CustomModuleService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = {status: 'dead'};
  }

  addSingleResponseModule(payload) {
    return axios
    .post(`${CUSTOM}/single-response`, 
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
    .put(`${CUSTOM}/update-single-response`, 
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

  addOptionedResponseModule(payload) {
    return axios
    .post(`${CUSTOM}/optioned-response`, 
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

  updateOptionedResponseModule(payload) {
    return axios
    .put(`${CUSTOM}/update-optioned-response`, 
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

  addRandomResponseModule(payload) {
    return axios
    .post(`${CUSTOM}/random-response`, 
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

  updateRandomResponseModule(payload) {
    return axios
    .put(`${CUSTOM}/update-random-response`, 
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
    .delete(`${CUSTOM}/`, 
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

export default new CustomModuleService();