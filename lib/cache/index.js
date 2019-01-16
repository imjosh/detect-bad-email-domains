// const fs = require('fs');
// const path = require('path');

// TODO load cache from csv
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

async function getData() {
  // TODO FIXME
  return new Promise((resolve) => {
    setTimeout(() => resolve(new Map([
      [
        'rsvhr.com',
        {
          domain: 'rsvhr.com',
          rule: 'parkingcrew.net',
          deny: true,
        },
      ],
      [
        'qualityservice.com',
        {
          domain: 'qualityservice.com',
          rule: 'smartname',
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
    ])), 1000);
  });
}

const myExports = Object.freeze({
  add,
  addOk,
  check: domain => data.get(domain),
  getAll: () => data,
  toJSON: () => JSON.stringify([...data])
});

// start loading data on first require
const init = getData().then(d => {
  data = d;
  return myExports;
});

module.exports = init;
