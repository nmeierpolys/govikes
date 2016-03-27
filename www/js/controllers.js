angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

//.controller('HornsCtrl', function($scope, Horns, $ionicPlatform, $timeout) {
.controller('HornsCtrl', function($scope, Horns, $ionicPlatform, $timeout, $cordovaNativeAudio) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.sounds = [
    { 
      Name: 'horn',
      Path: 'audio/horn.wav',
      FriendlyName: 'Horn'
    },
    { 
      Name: 'skol',
      Path: 'audio/skol.wav',
      FriendlyName: 'Skol Vikings'
    },
    { 
      Name: 'voice',
      Path: 'audio/voice.wav',
      FriendlyName: 'Voice Horn'
    },
    { 
      Name: 'weakhorn',
      Path: 'audio/weakhorn.wav',
      FriendlyName: 'Weak Horn'
    },
    { 
      Name: 'sadtrombone',
      Path: 'audio/sadtrombone.wav',
      FriendlyName: 'Sad Tromone'
    }
  ];
  
  $scope.selectedSound = $scope.sounds[0];
  $scope.previousSound = $scope.sounds[0];
  $scope.soundIsEnabled =  true;
  var justChangedSounds = true;

  $ionicPlatform.ready(function() {
      for(soundIndex in $scope.sounds)
      {
        var sound = $scope.sounds[soundIndex];
        console.log(sound);
        $cordovaNativeAudio.preloadComplex(sound.Name, sound.Path, 1, 1, 0);
      }
  });
  
  $scope.soundChanged = function() {
    console.log("OnChange");
    $scope.soundIsEnabled = true; 
  }
  
  $scope.play = function(desiredSound) {
    console.log(desiredSound.Name + " => " + $scope.previousSound.Name + " | " + justChangedSounds);
    
    if(!$scope.soundIsEnabled)
    {
      justChangedSounds = false;
      return;
    }
      
    stopAll();
    
    var selectedSound;
    for(soundIndex in $scope.sounds)
    {
      var thisSound = $scope.sounds[soundIndex];
      if(thisSound.Name == desiredSound.Name)
        selectedSound = thisSound;
    }
    if(angular.isUndefined(selectedSound))
       return;
    
    $scope.previousSound = selectedSound;
    console.log("Sound started");
    $cordovaNativeAudio.play(selectedSound.Name, playCallback, playCallback, playCallback);
  };
  
  $scope.stop = function() {
    stopAll();
  }
  
  var playCallback = function(msg) {
    console.log("Callback: " + msg);
    console.log("Sound finished");
  }
  
  function stopAll() {
    for(soundIndex in $scope.sounds)
    {
      $cordovaNativeAudio.stop($scope.sounds[soundIndex].Name); 
    }
    console.log("Stop: " + $scope.previousSound.FriendlyName);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Horns) {
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
