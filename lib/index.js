const fetch = require('./utils/fetch.js');
const rules = require('./rules.js');
const cache = require('./cache');

async function index(_domain) {
  await cache.isReady();
  if (!_domain || typeof _domain !== 'string') {
    throw new Error('Missing or bad domain provided');
  }

  const domain = _domain.toLocaleLowerCase();

  const cachedDomain = cache.check(domain);
  if (cachedDomain) {
    return cachedDomain.deny;
  }

  // console.log(`cache miss for ${domain}`);
  const url = `http://www.${domain}`;

  return fetch(url)
    .then(html => checkDomain(html, domain));
}

function checkDomain(html, domain) {
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];

    if (rule.regex.test(html)) {
      cache.add(domain, rule);
      return true;
    }
  }

  cache.addOk(domain);
  return false;
}


module.exports = index;
