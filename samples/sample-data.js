'use strict';
var xtend = require('xtend')

exports.vehicles = {
    car         :  [ 'drive', 'fast', 'dangerous', 'roof', 'engine' ]
  , bus         :  [ 'drive', 'slow', 'roof', 'engine' ]
  , bike        :  [ 'drive', 'fast', 'dangerous', 'engine' ]
  , bicycle     :  [ 'drive', 'slow', 'dangerous' ]
  , wheelchair  :  [ 'drive', 'slow', 'dangerous' ]
  , cane        :  [ 'walk', 'slow' ]
  , hike        :  [ 'walk', 'slow' ]
  , run         :  [ 'walk', 'fast' ]
  , mountaineer :  [ 'walk', 'slow', 'dangerous' ]
}

exports.vehicleData = {
    car: { 
        description: 'The first working steam-powered vehicle was designed — and most likely built — by Ferdinand Verbiest, a Flemish member of a Jesuit mission in China around 1672.'
      , url: 'http://en.wikipedia.org/wiki/Automobile'
    }
  , bus: {
        description: 'A bus (/ˈbʌs/; plural "buses", /ˈbʌsɨz/, archaically also omnibus, multibus, or autobus) is a road vehicle designed to carry passengers.'
      , url: 'http://en.wikipedia.org/wiki/Bus'
    }
  , bike: {
        description: 'A motorcycle (also called a motorbike, bike, moto or cycle) is a two[1] or three wheeled[2] motor vehicle.'
      , url: 'http://en.wikipedia.org/wiki/Motorcycle'
    }
  , bicycle: {
        description: 'A bicycle, often called a bike[2] (and sometimes referred to as a "pushbike",[3] "pedal bike",[4] "pedal cycle",[5] or "cycle"[6]), is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
      , url: 'http://en.wikipedia.org/wiki/Bicycle'
    }
  , wheelchair: {
        description: 'A wheelchair is a chair with wheels, designed to be a replacement for walking. The device comes in variations where it is propelled by motors or by the seated occupant turning the rear wheels by hand.'
      , url: 'http://en.wikipedia.org/wiki/Wheelchair'
    }
  , cane: {
        description: 'A walking stick is a device used by many people to facilitate balancing while walking.'
      , url: 'http://en.wikipedia.org/wiki/Walking_stick'
    }
  , hike: {
        description: 'Hiking is an outdoor activity which consists of walking in natural environments, often in mountainous or other scenic terrain.'
      , url: 'http://en.wikipedia.org/wiki/Hiking'
    }
  , run: {
        description: 'Running is a means of terrestrial locomotion allowing humans and other animals to move rapidly on foot.'
      , url: 'http://en.wikipedia.org/wiki/Running'
    }
  , mountaineer: {
        description: 'Mountaineering or mountain climbing is the sport, hobby or profession of hiking, skiing, and climbing mountains.'
      , url: 'http://en.wikipedia.org/wiki/Mountaineering'
    }
}

exports.keyedVehicleData = Object.keys(exports.vehicles)
  .map(function (k) {
    var data = exports.vehicleData[k]
      , keywords = exports.vehicles[k]
    return { 
        key: k
      , value: { description: data.description, url: data.url, keywords: keywords } 
    }
  })
