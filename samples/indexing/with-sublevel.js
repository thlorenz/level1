'use strict';
var path        =  require('path')
  , extend      =  require('xtend')
  , type        =  require('../../lib/type')
  , dump        =  require('../../lib/dump')
  , inspect     =  require('../../lib/inspect')
  , printKey    =  require('../../lib/print-key')
  , keyByVals   =  require('../../lib/key-by-values')
  , keyByVal    =  require('../../lib/key-by-value')
  , vehicles    =  require('../sample-data').vehicles
  , vehicleData =  require('../sample-data').vehicleData


var level      =  require('level')
  , sublevel   =  require('level-sublevel')
  , dblocation =  path.join(__dirname, '../..', 'data/sublevel.db')

level.destroy(dblocation, function () {  
  level(dblocation, { valueEncoding: 'utf8' }, function (err, db) {
    if (err) return console.error(err);
    addData(sublevel(db))
  }) 
})

function addData(db) {
  var sub         =  db.sublevel('__main__')
    , keywordIdx  =  db.sublevel('index_keyword')
    , dataColl    =  db.sublevel('data')
    , keywords    =  keyByVals(vehicles)
    , data        =  keyByVal(vehicleData)

    , bykeyword =  type.put(keywords).map(function (x) {
        return extend(x, { prefix: keywordIdx }) 
      })

    , values = type.put(data).map(function (x) {
        return extend(x, { prefix: dataColl })
      })
  
  // need some sublevel here when I insert with prefixes so they are being respected
  // i.e. just db.batch(batch(bykeyword.concat(values) doesn't work and
  //           bykeyword.batch(bykeyword.concat(values) ... is odd
  //      so   using a dummy sub is best option?
  sub.batch(
      bykeyword.concat(values) 
    , queryData.bind(null, keywordIdx, dataColl)
  )
}

function queryData(keywordIdx, dataColl) {
  
  var matches = []

  keywordIdx.createReadStream({ 
      keys   :  true
    , values :  true
    , start  :  'slow'
    , end    :  'slow\xff'
  })
  .on('data', function (match) { matches.push(match) } )
  .on('close', printMatch.bind(null, dataColl, matches))
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
