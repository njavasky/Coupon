'use strict ';
angular.module('couponApp')
.constant("baseURL","http://localhost:8080/CouponWebService/rest/")
.service('adminService',['$http','baseURL',function($http,baseURL){

	this.getCoupons = function(){
		return $http.get(baseURL+"admin/coupons");
	};
	this.getCompanies = function(){
		return $http.get(baseURL+"admin/companies");
	};

	this.getCustomers = function(){
		return $http.get(baseURL+"admin/customers");
	};

	this.removeCoupon = function(id){
		return $http['delete'](baseURL+"admin/coupons/"+id);
	};
	this.removeCustomer = function(id){
		return $http['delete'](baseURL+"admin/customers/"+id);
	};
	this.removeCompany = function(id){
		return $http['delete'](baseURL+"admin/companies/"+id);
	};
	this.updateCompany=function(company){
		return $http.put(baseURL+"admin/companies", company);
	};
	this.updateCustomer=function(customer){
		return $http.put(baseURL+"admin/customers", customer);
	};
	this.createCompany=function(company){
		return $http.post(baseURL+"admin/companies", company);
	};
	this.createCustomer=function(customer){
		return $http.post(baseURL+"admin/customers", customer);
	};

}])
.service('appService',['$http','baseURL',function($http,baseURL){
	this.login = function(name,password,type){
		return $http.post(baseURL + "app/login/"+ name+"/"+password+"/"+type);
	};
	this.logout = function(){
		return $http.post(baseURL + "app/logout");
	};
}])
.service('customerService',['$http','baseURL',function($http,baseURL){
	this.buy = function(coupon) {
		return $http.post(baseURL + "customer/coupons", coupon);
		
	};
	
	this.getMyCoupons = function() {
		return $http.get(baseURL + "customer/coupons");
	};

	this.getAllCoupons = function() {
		return $http.get(baseURL + "customer/coupons/all");
	};
}])
.service('companyService',['$http','baseURL',function($http,baseURL){
	this.getCoupons = function(){
		return $http.get(baseURL+"company/coupons");
	};
	this.removeCoupon = function(id){
		return $http['delete'](baseURL+"company/coupons/"+id);
	};
	this.updateCoupon=function(coupon){
		return $http.put(baseURL+"company/coupons", coupon);
	};
	this.createCoupon=function(coupon){
		return $http.post(baseURL+"company/coupons", coupon);
	};
	this.deleteImage = function(imageName){
		return $http['delete'](baseURL+"files/company/delete/"+imageName);
	};
	this.upload = function (fd, title){
		return $http.post(baseURL+"files/company/upload/"+title, fd, {
   	 				transformRequest: angular.identity, 
   	 				headers: {'Content-Type': undefined 
   	 			}
		
   })}
}])
;