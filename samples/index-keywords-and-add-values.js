'use strict';
var path        =  require('path')
  , type        =  require('../lib/type')
  , inspect     =  require('../lib/inspect')
  , printKey    =  require('../lib/print-key')
  , keyByVals =  require('../lib/key-by-values')
  , keyByVal  =  require('../lib/key-by-value')
  , vehicles    =  require('./sample-data').vehicles
  , vehicleData =  require('./sample-data').vehicleData


var level = require('level')
  , dblocation = path.join(__dirname, '..', 'data/index-keywords-and-add-values.db');

level.destroy(dblocation, function () {  
  level(dblocation, { valueEncoding: 'utf8' }, addData) 
})

function addData(err, db) {
  if (err) return console.error(err);

  var indexes = keyByVals(vehicles, 'index_keyword')
    , data = keyByVal(vehicleData, 'data')

  db.batch(
      type.put(indexes).concat(type.put(data))
    , queryData.bind(null, db))
}

function queryData(db) {
  var matches = []

  db.createReadStream({ 
      keys   :  true
    , values :  true
    , start  :  'index_keyword\x00slow'
    , end    :  'index_keyword\x00slow\xff'
  })
  .on('data', function (match) { matches.push(match) } )
  .on('close', printMatch.bind(null, db, matches))
}

function printMatch (db, matches) {
  matches.forEach(function (m) {
    db.get('data' + '\x00' + m.value, function (err, res) {
      if (err) return console.error(err);
      console.log(m.value + ':');
      inspect(res)
    });
  })
}
