'use strict';

/**
 * @ngdoc overview
 * @name iibHeatMapApp
 * @description
 * # iibHeatMapApp
 *
 * Main module of the application.
 */
angular
    .module('iibHeatMapApp', [
        'ngResource',
        'ngRoute',
        'restangular',
        'ui.bootstrap',
        'toggle-switch',
        'autofocus',
        'ui.bootstrap.accordion',
        'ui.bootstrap.tpls'
    ])
    .constant("CONFIG", {
        "API_HOST": "http://localhost:8080",
        "TOPOLOGY": "http://localhost:8080/apiv0/inode/topology",
        "API_ROUTE": "apiv0"
    })
    .config(function($routeProvider, RestangularProvider, CONFIG) {
        RestangularProvider.setBaseUrl(CONFIG.API_HOST);
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/chart', {
                templateUrl: 'views/chart.html',
                controller: 'ChartCtrl'
            })
            .when('/health', {
                templateUrl: 'views/health.html',
                controller: 'HealthCtrl'
            })
            .when('/manage', {
                templateUrl: 'views/manage.html',
                controller: 'ManageCtrl'
            })
            .when('/manage/addNode', {
                templateUrl: 'views/add-node.html',
                controller: 'AddNodeCtrl'
            })
            .when('/manage/editNode/:id', {
                templateUrl: 'views/edit-node.html',
                controller: 'EditNodeCtrl'
            })
            .when('/services', {
                templateUrl: 'views/services.html',
                controller: 'ServicesCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .factory('INodeRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('INode', function(INodeRestangular, CONFIG) {
        return INodeRestangular.service(CONFIG.API_ROUTE + '/inode');
    })
    .factory('ServiceRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('Service', function(ServiceRestangular, CONFIG) {
        return ServiceRestangular.service(CONFIG.API_ROUTE + '/service');
    })
    .factory('ResourceDetails', function() {
        var resource = {
            resource: {}
        };

        return resource;
    });
