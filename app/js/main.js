var app = angular.module('ang-material', [       
    'ui.router' ,
    'Authentication'  ,
   
    'ngMaterial',
    'ngAria',
    'datepickerCtrl',
     
]);

app
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider, SessionService, $httpProvider) {

      //Set up routes
      $urlRouterProvider.otherwise('home');
      $stateProvider
      $stateProvider.state('/', {
        url: '/'       
      }).state('home', {
        url: '/home',
        views: {
          'header': { 
            templateUrl: 'defaultViews/header.html'           
          },
          'content': {
            controller: 'RegistrationController',
            templateUrl: 'dynamicViews/index.html'
          },
          'footer': {            
            templateUrl: 'defaultViews/footer.html' 
          }
        }
      }).state('datepick', {
          url: '/datepick',
          views: {
            'header': { 
              templateUrl: 'defaultViews/header.html'           
            },
            'content': {
              controller: 'MainCtrl',
              templateUrl: 'dynamicViews/datepick.html'
            },
            'footer': {            
              templateUrl: 'defaultViews/footer.html' 
            }
          }
        })
      
    }
  ])
.run(function ($rootScope, $state) {
    $state.go("home");
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {      
      
    });

  })