function index(json) {
  const myMap = new Map();

  json.forEach(e => {
    const {
      domain, rule, deny, added
    } = e;

    myMap.set(domain, {
      domain, rule, deny, added
    });
  });

  return myMap;
}

module.exports = index;
