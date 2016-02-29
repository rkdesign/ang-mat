'use strict';

var angular = angular;
var module = angular.module('datepickerCtrl', []); 

module.controller("MainCtrl", ['$scope', '$mdDatePicker', function($scope, $mdDatePicker) {
    this.startDate = function(ev) {
      $mdDatePicker(ev, $scope.startDate).then(function(selectedDate) {
        $scope.startDate = selectedDate;

        var now = selectedDate;
        var then = $scope.endDate;
        var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        $scope.dateDifferenceDays = d.asDays();
      });
    }
    this.endDate = function(ev) {
      $mdDatePicker(ev, $scope.endDate).then(function(selectedDate) {
        $scope.endDate = selectedDate;

        var now = $scope.startDate;
        var then = selectedDate;
        var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        $scope.dateDifferenceDays = d.asDays();
      });
    }
  }]);

  module.controller('DatePickerCtrl', ['$scope', '$mdDialog', 'currentDate', '$mdMedia', function($scope, $mdDialog, currentDate, $mdMedia) {
    var self = this;

    this.currentDate = currentDate;
    this.currentMoment = moment(self.currentDate);
    this.weekDays = moment.weekdaysMin();

    $scope.$mdMedia = $mdMedia;
    $scope.yearsOptions = [];
    for (var i = 1930; i <= this.currentMoment.year() ; i++) {
      $scope.yearsOptions.push(i);
    }
    $scope.year = this.currentMoment.year();

    this.setYear = function() {
      self.currentMoment.year($scope.year);
    };

    this.selectDate = function(dom) {
      self.currentMoment.date(dom);
    };

    this.cancel = function() {
      $mdDialog.cancel();
    };

    this.confirm = function() {
      $mdDialog.hide(this.currentMoment.toDate());
    };

    this.getDaysInMonth = function() {
      var days = self.currentMoment.daysInMonth(),
        firstDay = moment(self.currentMoment).date(1).day();

      var arr = [];
      for (var i = 1; i <= (firstDay + days); i++)
        arr.push(i > firstDay ? (i - firstDay) : false);

      return arr;
    };

    this.nextMonth = function() {
      self.currentMoment.add(1, 'months');
      $scope.year = self.currentMoment.year();
    };

    this.prevMonth = function() {
      self.currentMoment.subtract(1, 'months');
      $scope.year = self.currentMoment.year();
    };
  }]);

  module.factory("$mdDatePicker", ["$mdDialog", function($mdDialog) {
    var datePicker = function(targetEvent, currentDate) {
      if (!angular.isDate(currentDate)) currentDate = Date.now();

      return $mdDialog.show({
        controller: 'DatePickerCtrl',
        controllerAs: 'datepicker',
        templateUrl: "/modal.datepicker.html",
        targetEvent: targetEvent,
        locals: {
          currentDate: currentDate
        }
      });
    }

    return datePicker;
  }]);

  module.directive("input", ["$mdDatePicker", "$timeout", function($mdDatePicker, $timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if ('undefined' !== typeof attrs.type && 'date' === attrs.type && ngModel) {
          angular.element(element).on("click", function(ev) {
            $mdDatePicker(ev, ngModel.$modelValue).then(function(selectedDate) {
              $timeout(function() {
                ngModel.$setViewValue(moment(selectedDate).format("YYYY-MM-DD"));
                ngModel.$render();
              });
            });
          });
        }
      }
    }
  }]);