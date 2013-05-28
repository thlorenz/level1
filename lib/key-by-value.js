'use strict';

module.exports = function (entities, prefix) {
  var acc = [];
  prefix = prefix ? prefix + '\x00' : '';

  Object.keys(entities)
    .forEach(function (k) {
      var val = typeof entities[k] === 'object' ? JSON.stringify(entities[k]) : entities[k];
      acc.push({ key: prefix + k, value: val });
    })

  return acc;
}
