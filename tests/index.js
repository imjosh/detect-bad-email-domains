// TODO add real tests with Jest
const detect = require('../lib/index');
const cache = require('../lib/cache');

const domains = [
  'zippiex.com',
  'gmail.com',
  'hotmail.com',
];

async function test() {
  await cache.isReady();
  console.log(`Initial cache: ${cache.toJSON()}`);

  const promises = domains.map(domain => detect(domain)
    .then(r => console.log(`${domain} is bad: ${r}`))
    .catch(e => console.error(e, e.stack)));

  Promise.all(promises)
    .then(() => console.log(`Resulting cache: ${cache.toJSON()}`));
}


test();
