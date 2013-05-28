'use strict';
var path        =  require('path')
  , extend      =  require('xtend')
  , type        =  require('../../lib/type')
  , dump        =  require('../../lib/dump')
  , inspect     =  require('../../lib/inspect')
  , printKey    =  require('../../lib/print-key')
  , keyByVals   =  require('../../lib/key-by-values')
  , keyByVal    =  require('../../lib/key-by-value')
  , vehicleData =  require('../sample-data').keyedVehicleData


var level      =  require('level')
  , sublevel   =  require('level-sublevel')
  , dblocation =  path.join(__dirname, '../..', 'data/sublevel-hooks.db')

level.destroy(dblocation, function () {  
  level(dblocation, { valueEncoding: 'utf8' }, function (err, db) {
    if (err) return console.error(err);
    addData(sublevel(db))
  }) 
})

function addData(db) {
  var keywordIdx  =  db.sublevel('vehicles_by_keyword')
    , vehicles    =  db.sublevel('vehicles')

  vehicles.pre(function (val, add) {
  })
  
  vehicles.batch(
    type.put(vehicleData)
  , queryData.bind(null, vehicles)
  )
}

function queryData(vehicles) {
  dump.all(vehicles)
  
  var matches = []

  /*keywordIdx.createReadStream({ 
      keys   :  true
    , values :  true
    , start  :  'slow'
    , end    :  'slow\xff'
  })
  .on('data', function (match) { matches.push(match) } )
  .on('close', printMatch.bind(null, dataColl, matches))*/
}

function printMatch (db, matches) {
  matches.forEach(function (m) {
    db.get(m.value, function (err, res) {
      if (err) return console.error(err);
      console.log(m.value + ':');
      inspect(res)
    });
  })
}
