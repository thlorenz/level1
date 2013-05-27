'use strict';

var level = require('level')
var db = level(__dirname + '/../data/dbprk02.db', { valueEncoding: 'json' })

db.put(
    'dprk'
  , { name: 'Teega'
    , food: 'beef'
    , dob:  'May 2010'
    , occupation: 'cuddle'
    }
  , function (err) {
      db.get('dprk', function (err, value) {
        console.log('value: ', value);
        db.close()
      })
  })
