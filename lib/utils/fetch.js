const axios = require('axios');

async function fetch(url, options = {}) {
  return axios.get(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }

      return console.warn(`${response.status}`);
    });
}

module.exports = fetch;
