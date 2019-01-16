const axios = require('axios');

async function fetch(url) {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.8'
    }
  };

  return axios.get(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }

      return console.warn(`${response.status}`);
    });
}

module.exports = fetch;
