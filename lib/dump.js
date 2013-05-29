'use strict';

var inspect = require('./inspect');

function dump (keys, values, db) {
  db.createReadStream({ 
      keys   :  keys
    , values :  values
  })
  .on('data', inspect )
  .on('close', function () { console.log('---') })
}

module.exports = 
exports        =  dump.bind(null, true, true)
exports.keys   =  dump.bind(null, true, false)
exports.values =  dump.bind(null, false, true)
exports.all    =  exports 
