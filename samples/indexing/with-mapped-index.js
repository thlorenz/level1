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

var level       =  require('level')
  , sublevel    =  require('level-sublevel')
  , mappedIndex =  require('level-mapped-index')
  , dblocation  =  path.join(__dirname, '../..', 'data/sublevel-mapped-index.db')

level.destroy(dblocation, function () {  
  level(dblocation, { valueEncoding: 'utf8' }, function (err, db) {
    if (err) return console.error(err);
    db = sublevel(db)
    db = mappedIndex(db)

    registerIndexes(db)
    addData(db)
  }) 
})

function registerIndexes(db) {
  /*db.registerIndex('vehicles_by_keyword', function (key, value, emit) {
    JSON.parse(value)
      .keywords
      .forEach(function (w) { emit(w) })
  })*/

  db.registerIndex('key', function (key, value, emit) {
    console.log('emitting', key)
    emit(key)
  })
}

function addData(db) {
  db.put(
      vehicleData[0].key
    , vehicleData[0].value
    , function () {
        db.put(
            vehicleData[1].key
          , vehicleData[1].value
          , queryData.bind(null, db)
        )
      }
  )

  /*db.batch(
    type.put(vehicleData)
  , queryData.bind(null, db)
  )*/
}

function queryData(db) {
  dump(db)
  db.getBy('key', 'car', function (err, data) {
    console.log('arguments: ', arguments);
  });

}
