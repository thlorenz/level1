'use strict';

var level = require('level')
var db = level(__dirname + '/../data/dbprk01.db')

db.put('name', 'Teega', function (err) {
  db.batch([  
      { type: 'put', key: 'food', value: 'beef' }
    , { type: 'put', key: 'dob', value: 'May 2009' }
    , { type: 'put', key: 'occupation', value: 'cuddle' }
  ], function (err) {
    if (err) return console.error('err: ', err);
    
    db.createReadStream()
      .on('data', console.log)
      .on('close', function () { db.close() })
  })
})
