'use strict';

var extend = require('util')._extend

function typeTo(type, entities) {
  return entities.map(function (x) {
    return extend(x, { type: type })
  })
}

exports.put = typeTo.bind(null, 'put');
exports.del = typeTo.bind(null, 'del');
exports.get = typeTo.bind(null, 'get');
