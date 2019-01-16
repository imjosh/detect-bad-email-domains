/* app.js */
const myCache = require('./cache.js');

(function init() {
  myCache.isReady()
    .then(() => main());
}());

function main() {
  // log cache contents
  console.log(myCache.getAll());
}
