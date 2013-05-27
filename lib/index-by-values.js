'use strict';

module.exports = function (entities) {
  var acc = [];

  Object.keys(entities)
    .forEach(function (k) {
      var words = entities[k];
      words.forEach(function (w) { 
        acc.push({ key: w + '\x00' + k, value: k });
      })
    })

  return acc;
}
