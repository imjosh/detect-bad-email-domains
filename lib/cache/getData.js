const csvData = require('./csvToJson');
const jsonToMap = require('./jsonToMap');

async function index() {
  const json = await csvData();
  return jsonToMap(json);
}

module.exports = index;
