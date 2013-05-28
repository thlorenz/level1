'use strict';
var path        =  require('path')
  , extend      =  require('xtend')
  , type        =  require('../lib/type')
  , dump        =  require('../lib/dump')
  , inspect     =  require('../lib/inspect')
  , printKey    =  require('../lib/print-key')
  , indexByVals =  require('../lib/index-by-values')
  , indexByVal  =  require('../lib/index-by-value')
  , vehicles    =  require('./sample-data').vehicles
  , vehicleData =  require('./sample-data').vehicleData


var level      =  require('level')
  , Sublevel   =  require('level-sublevel')
  , dblocation =  path.join(__dirname, '..', 'data/index-keywords-and-add-values-sublevel.db')

level.destroy(dblocation, function () {  
  level(dblocation, { valueEncoding: 'utf8' }, function (err, db) {
    if (err) return console.error(err);
    addData(new Sublevel(db))
  }) 
})

function addData(db) {
  var sub         =  db.sublevel('__main__')
    , keywordIdx  =  db.sublevel('index_keyword')
    , dataColl    =  db.sublevel('data')
    , keywords    =  indexByVals(vehicles)
    , data        =  indexByVal(vehicleData)
    , putKeywords =  type.put(keywords)
    , putData     =  type.put(data)

    , bykeyword =  putKeywords.map(function (x) {
        return extend(x, { prefix: keywordIdx }) 
      })

    , values = putData.map(function (x) {
        return extend(x, { prefix: dataColl })
      })
    ;

  
  // need some sublevel here insert with my prefixes being respected
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
