'use strict';

var level = require('level')
var db = level(__dirname + '/../data/dbprk01.db')

db.batch([  
    { type: 'put', key: 'name', value: 'teega' }
  , { type: 'put', key: 'food', value: 'beef' }
  , { type: 'put', key: 'dob', value: 'May 2009' }
  , { type: 'put', key: 'occupation', value: 'cuddle' }
], function (err) {
  if (err) return console.error('err: ', err);
    db.get('food', function (err, value) {
      console.log('value: ', value);
      db.close()
    })
  }
)
