const papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const defaultInPath = path.join(__dirname, '../..', 'cache-data', 'domains.csv');

function index(inPath) {
  const myInPath = inPath || defaultInPath;
  return readFile(myInPath, 'utf8')
    .then(csv => {
      const parseObj = papa.parse(csv, {
        dynamicTyping: true,
        escapeChar: '"',
        header: true,
        quoteChar: '"',
        skipEmptyLines: true,
      });

      const { errors, data } = parseObj;
      if (errors.length) {
        console.error('CSV parse errors:');
        errors.forEach(err => console.error(err));
      }

      if (!data.length) {
        throw new Error('No data from CSV file');
      }

      return data;
    });
}

module.exports = index;
