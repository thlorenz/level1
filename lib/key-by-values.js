'use strict';

module.exports = function (entities, prefix) {
  var acc = [];
  prefix = prefix ? prefix + '\x00' : '';

  Object.keys(entities)
    .forEach(function (k) {
      var words = entities[k];
      words.forEach(function (w) { 
        acc.push({ key: prefix + w + '\x00' + k, value: k });
      })
    })

  return acc;
}
