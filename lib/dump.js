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

exports.keys   =  dump.bind(null, true, false)
exports.values =  dump.bind(null, false, true)
exports.all    =  dump.bind(null, true, true)
