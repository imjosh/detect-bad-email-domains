// const fs = require('fs');
// const path = require('path');

// TODO load cache from csv
// TODO persist back dynamic cache state
// TODO possibly do persistence plugins (disk, database, etc)

let cache;

const ready = loadCache()
  .then(c => { cache = c; })
  .catch(err => console.error(err, err.stack));

function add(domain, rule, deny = true) {
  cache.set(domain, {
    deny,
    domain,
    rule: rule.name,
    added: new Date().toISOString(),
  });
}

function addOk(domain) {
  add(domain, { name: '' }, false);
}

function check(domain) {
  return cache.get(domain);
}

function get() {
  return cache;
}

function isReady() {
  return ready;
}

async function loadCache() {
  // TODO FIXME
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(new Map([
      [
        'rsvhr.com',
        {
          domain: 'rsvhr.com',
          rule: '',
          deny: true,
        },
      ],
      [
        'qualityservice.com',
        {
          domain: 'qualityservice.com',
          rule: '',
          deny: true,
        }
      ],
      [
        'gmail.com',
        {
          domain: 'gmail.com',
          rule: '',
          deny: false,
        }
      ]
    ])), 10000);
  });
}

function toJSON() {
  return JSON.stringify([...cache]);
}

module.exports = {
  add,
  addOk,
  check,
  get,
  isReady,
  toJSON,
};
