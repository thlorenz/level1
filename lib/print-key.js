'use strict';

module.exports = function (key) {
  console.log(key.split('\x00').join('\t'));
}
