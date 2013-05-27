'use strict';
var extend = require('util')._extend;

function inspect(obj, depth) {
  console.log(require('util').inspect(obj, false, depth || 5, true));
}


var entries = {
    car         :  [ 'drive', 'fast', 'dangerous', 'roof', 'engine' ]
  , bus         :  [ 'drive', 'slow', 'roof', 'engine' ]
  , bike        :  [ 'drive', 'fast', 'dangerous', 'engine' ]
  , bicycle     :  [ 'drive', 'slow', 'dangerous' ]
  , weelchair   :  [ 'drive', 'slow', 'dangerous' ]
  , cane        :  [ 'walk', 'slow' ]
  , hike        :  [ 'walk', 'slow' ]
  , run         :  [ 'walk', 'fast' ]
  , mountaineer :  [ 'walk', 'slow', 'dangerous' ]
}

function index(entities) {
  var acc = [];

  Object.keys(entities)
    .forEach(function (k) {
      var words = entities[k];
      words.forEach(function (w) { 
        acc.push({ key: '!' + w + '!' + k + '\xff', value: k });
      })
    })

  return acc;
}

function del(entities) {
  return entities.map(function (x) {
    return extend(x, { type: 'del' })
  })
}

function put(entities) {
  return entities.map(function (x) {
    return extend(x, { type: 'put' })
  })
}


var level = require('level')
var db = level(__dirname + '/../data/index-keywords.db', { valueEncoding: 'utf8' }, function () {
  var indexes = index(entries);
  db.batch(
      del(indexes).concat(put(indexes))
    , function () {
        db.createReadStream({ 
            keys   :  true
          , values :  false
          , start  :  '!slow'
          , end    :  '!slow\xff'
        })
        .on('data', inspect)
        .on('close', function () { db.close() })
    }
  )
})
