'use strict';

module.exports = function (key) {
  console.log(key.replace('\x00', ':\t'));
}
