'use strict';

function inspect(obj, depth) {
  console.log(require('util').inspect(obj, false, depth || 5, true));
}

var level = require('level')
var db = level(__dirname + '/../data/keys01.db', { valueEncoding: 'json' }, function () {

  var b = db.batch();
  for (var i = 0; i < 10; i++) {
    b.put('name' + i, { value: { pos: i, location: 'loc ' + i } })
  }
  b.write(batched)

  function batched() {
    db.createReadStream({ keys: false, values: true, start: 'name3', end: 'name4' })
      .on('data', inspect)
      .on('close', function () { db.close() })
  }
})
