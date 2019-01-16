const fetch = require('./utils/fetch');
const rules = require('./rules');
const asyncCache = require('./cache');

let cache;

async function initCache() {
  cache = cache || await asyncCache;
}

async function index(_domain) {
  await initCache();
  if (!_domain || typeof _domain !== 'string') {
    throw new Error('Missing or bad domain provided');
  }

  const domain = _domain.toLocaleLowerCase();

  const cachedDomain = cache.check(domain);
  if (cachedDomain) {
    return cachedDomain.deny;
  }

  const url = `http://${domain}`;
  return fetch(url)
    .then(html => checkDomain(html, domain))
    .catch(err => {
      if (err.code === 'ENOTFOUND') {
        cache.add(domain, { name: 'ENOTFOUND' });
      }
    });
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
