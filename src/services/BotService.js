import axios from "axios";
import { BOT } from "./apiVariables.js";

class BotService {

  constructor() {
    // Generic response to give API experiences internal issues.
    this.networkIssue = { status: 'dead' };
  }

  getBotSummary() {
    return axios
      .get(`${BOT}/summary`,
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

  checkoutBot(payload) {
    return axios
      .post(`${BOT}/checkout-bot`,
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

  addNewBot(payload) {
    return axios
      .post(`${BOT}/add-new-bot`,
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

  getServerRoles(payload) {
    return axios
      .post(`${BOT}/server-roles`,
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

  getBotChannels(payload) {
    return axios
      .post(`${BOT}/bot-channels`,
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

  updateBotPrefix(payload) {
    return axios
      .post(`${BOT}/update-prefix`,
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

  updateBotName(payload) {
    return axios
      .post(`${BOT}/update-name`,
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

  updateBotAvatar(payload) {
    let formData = new FormData();
    formData.append('botId', payload.botId);
    formData.append('avatar', payload.avatar);
    return axios
      .post(`${BOT}/update-avatar`, formData,
        {
          withCredentials: true
        },
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        },
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

  updateBotToken(payload) {
    return axios
      .post(`${BOT}/update-token`,
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

  updateBotActivity(payload) {
    return axios
      .post(`${BOT}/update-activity`,
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

  updateBotEnabled(payload) {
    return axios
      .post(`${BOT}/update-enabled`,
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

  deleteBot(botId) {
    return axios
      .delete(`${BOT}/delete-bot`,
        {
          data: { botId: botId },
          withCredentials: true,
        },
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