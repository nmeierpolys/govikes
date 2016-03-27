angular.module('starter.services', [])

.factory('Horns', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var horns = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return horns;
    },
    remove: function(horn) {
      horns.splice(horns.indexOf(horn), 1);
    },
    get: function(hornId) {
      for (var i = 0; i < horns.length; i++) {
        if (horns[i].id === parseInt(hornId)) {
          return horns[i];
        }
      }
      return null;
    }
  };
});
