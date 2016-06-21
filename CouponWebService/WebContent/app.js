'use strict';
angular.module('couponApp', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl : 'login.html',
		controller : 'app'
	})
	.when('/admin', {
		templateUrl : 'admin.html',
		controller : 'admin'
	})
	.when('/company', {
		templateUrl : 'company.html',
		controller : 'company'
	})
	.when('/customer', {
		templateUrl : 'customer.html',
		controller : 'customer'
	})
	.when('/error', {
		templateUrl : 'error.html',
	}).otherwise({
		redirectTo: '/login'
	});
});

