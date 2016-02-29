'use strict';

var angular = angular;
var module = angular.module('Authentication', []);
module.controller('RegistrationController', function ($scope, $rootScope, $state, $mdDialog, $mdMedia) {	
  	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  	$scope.dialogTitle = "Login";
  	
$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    
    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: 'dynamicViews/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });
    
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

});

module.controller('DialogController', function ($scope, $mdDialog) {
		$scope.max = 2;
		$scope.selectedIndex = 0;		
		
	 	   /*$scope.hide = function() {
		    $mdDialog.hide();
		  };
		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };
		  $scope.answer = function(answer) {
		    $mdDialog.hide(answer);
		  };*/
		 $scope.cancel = function() {
			    $mdDialog.cancel();
		 };
		  $scope.showLoginScreen = function() {
			  $scope.selectedIndex=0;
			  $scope.dialogTitle = "Login";
		  }

		  $scope.showRegistrationScreen = function() {
			  $scope.selectedIndex=1;
			  $scope.dialogTitle = "Registration";
		  } 
		  
		  $scope.showForgotScreen = function() {
			  $scope.selectedIndex=2;
			  $scope.dialogTitle = "Forgot Password";
		 }
});

/*
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
 
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}*/