'use strict';
var path     =  require('path')
  , type     =  require('../lib/type')
  , printKey =  require('../lib/print-key')
  , key      =  require('../lib/key-by-values')
  , vehicles =  require('./sample-data').vehicles

var level = require('level')
  , dblocation = path.join(__dirname, '..', 'data/index-keywords.db');

var db = level(dblocation, { valueEncoding: 'utf8' }, function () {
  var indexes = key(vehicles);
  db.batch(
      type.del(indexes).concat(type.put(indexes))
    , function () {
        db.createReadStream({ 
            keys   :  true
          , values :  false
          , start  :  'slow'
          , end    :  'slow\xff'
        })
        .on('data', printKey)
        .on('close', function () { db.close() })
    }
  )
})
