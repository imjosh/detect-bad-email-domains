// TODO persist back dynamic cache state
// TODO possibly do persistence plugins (disk, database, etc)

let data = new Map();

function add(domain, rule, deny = true) {
  data.set(domain, {
    deny,
    domain,
    rule: rule.name,
    added: new Date().toISOString(),
  });
}

function addOk(domain) {
  add(domain, { name: '' }, false);
}

const myExports = Object.freeze({
  add,
  addOk,
  check: domain => data.get(domain),
  getAll: () => data,
  toJSON: () => JSON.stringify([...data])
});

// start loading data on first require
const init = require('./getData')().then(d => {
  data = d;
  return myExports;
});

module.exports = init;
