// TODO add real tests with Jest
const detect = require('../lib/index');
const asyncCache = require('../lib/cache');

const domains = [
  'sandcars.net', // parking crew
  'royal.net', // smartname
  'gmail.com', // ok cached
  'hotmail.com', // ok
  'rfc822.org', // bad dns
  // 'robo3.me', // parking crew
  // 'zippiex.com',// parking crew
];

async function test() {
  const cache = await asyncCache;
  console.log(`Initial cache: ${cache.toJSON()}`);

  const promises = domains.map(domain => detect(domain)
    .then(r => console.log(`${domain} is: ${r ? 'Bad' : 'OK'}`))
    .catch(e => console.error(e)));

  Promise.all(promises)
    .then(() => console.log(`Resulting cache: ${cache.toJSON()}`));
}


test();
