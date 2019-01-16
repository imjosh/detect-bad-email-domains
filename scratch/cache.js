/* cache.js */
let cache;
const ready = asyncLoadData()
  .then(d => { cache = d; });

function asyncLoadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ foo: 'bar', });
    }, 1000);
  });
}

module.exports = {
  add: (key, val) => { cache[key] = val; },
  getAll: () => cache,
  isReady: () => ready,
};
