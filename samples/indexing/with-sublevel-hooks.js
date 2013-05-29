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
    inspect(val.keywords);

    JSON.parse(val.value)
      .forEach(function (w) {
        add({ 
            type   :  'put'
          , key    :  w + '\x00' + val.key
          , value  :  val.key
          , prefix :  keywordIdx
        })  
    })
  })
  
  vehicles.batch(
    type.put(vehicleData)
  , queryData.bind(null, keywordIdx, vehicles)
  )
}

function queryData(keywordIdx, vehicles) {
  var matches = []
  
  keywordIdx.createReadStream({ 
      keys   :  true
    , values :  true
    , start  :  'roof'
    , end    :  'roof\xff'
  })
  .on('data', function (match) { matches.push(match) } )
  .on('close', printMatch.bind(null, vehicles, matches))
}

function printMatch (db, matches) {
  matches.forEach(function (m) {
    db.get(m.value, function (err, res) {
      if (err) return console.error(err);
      console.log(m.value + ':');
      inspect(JSON.parse(res))
    });
  })
}
