angular.module('couponApp')

.controller('admin',['$scope','$location','adminService', function($scope, $location, adminService){
	
	function hide_all_and_show_one(elem_to_show){
		  var all = ['couponTable', 'companyTable', 'customerTable', 
		             'successLog', 'couponJointTable', 'updateForm','createForm' ];
		  all.forEach(function(val){ $scope[val] = false; });
		  $scope[elem_to_show] = true;
		}
	function hide_all_and_show_one_insideTab(elem_to_show){
		  var all = [ 'successLog', 'couponJointTable', 'updateForm','createForm' ];
		  all.forEach(function(val){ $scope[val] = false; });
		  $scope[elem_to_show] = true;
		}
	
	$scope.tab = 1;
	hide_all_and_show_one('couponTable');
	$scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2){
        	hide_all_and_show_one('companyTable');        }
        else if (setTab === 3){
        	hide_all_and_show_one('customerTable');        }
        else{
        	hide_all_and_show_one('couponTable');        }
    };
    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    }
    
	 $scope.coupons= [];
	 $scope.loading = true;    
	 	adminService.getCoupons()
            .then(
                function(response) {
                    $scope.coupons = response.data;
                },function(err){
                	$location.path('/error');
                })['finally'](function(){
       		 $scope.loading = false;
                });

      $scope.companies= [];
            adminService.getCompanies()
            .then(
                function(response) {	
                    $scope.companies = response.data;
                },function(err){
                	$location.path('/error');
                } );

      $scope.customers= [];
            adminService.getCustomers()
            .then(
                function(response) {
                    $scope.customers = response.data;
                },function(err){
                	$location.path('/error');
                }  );

            $scope.removeCoupon = function(id){
          	  adminService.removeCoupon(id)
            .then(
                      function(response) {
                          hide_all_and_show_one_insideTab( 'successLog');
                          $scope.log = "Coupon ID# " + id + " successfully removed.";
                          adminService.getCoupons()
                          .then(
                        		  function(response) {
                        			  $scope.coupons= response.data;
                        			  console.log(response);
                        		  },function(err){
                        			  $location.path('/error');
                        		  });
                      },function(err){
                      	$location.path('/error');
                      });
            }
      
      $scope.removeCompany=function(id){
    	  adminService.removeCompany(id)
      .then(
                function(response) {
                    hide_all_and_show_one_insideTab( 'successLog');
	    	  $scope.log = "Company ID# " + id + " successfully removed.";
	    	  adminService.getCompanies()
	    	  .then(
	    			  function(response) {
	    				  $scope.companies = response.data;
	    			  },function(err){
	                  	$location.path('/error');
	                  });
                },function(err){
                	$location.path('/error');
                });
      }
      
      $scope.removeCustomer=function(id){
    	  adminService.removeCustomer(id)
      .then(
                function(response) {
                    hide_all_and_show_one_insideTab( 'successLog');
	    	  $scope.log = "Customer ID# " + id + " successfully removed.";
	    	  adminService.getCustomers()
	    	  .then(
	    			  function(response) {
	    				  $scope.customers = response.data;
	    			  },function(err){
	                  	$location.path('/error');
	                  } );
                },function(err){
                	$location.path('/error');
                } );
      }
      
      $scope.showUpdateCompany = function(company){
   	   hide_all_and_show_one_insideTab( 'updateForm');
   	   $scope.updateCompanyId = company.companyId;
   	   $scope.updateCompanyName = company.companyName;
   	   $scope.updateCompanyPassword = null;
   	   $scope.updateCompanyEmail = company.email;
      }
      
      $scope.updateCompany = function(id, name, password, email){
    	  var company = {companyId:id , companyName:name, password:password, email:email};
    	  adminService.updateCompany(company)
   	      .then(function(response) {
   	    	  hide_all_and_show_one_insideTab( 'successLog');
   	    	  $scope.log = "Company " + name+ " updated successfully.";
   	    	  adminService.getCompanies()
   	    	  .then(function(response){ 
   	    		  $scope.companies = response.data;
   	    	  },function(err){
              	$location.path('/error');
              });
   	      },function(err){
          	$location.path('/error');
          });
   	 }
      
      $scope.showUpdateCustomer = function(customer){
   	   hide_all_and_show_one_insideTab( 'updateForm');
   	   $scope.updateCustomerId = customer.customerId;
	   $scope.updateCustomerName = customer.customerName;
	   $scope.updateCustomerPassword = null;
      }

      $scope.updateCustomer = function(id,name,password){
    	  var customer = {customerId:id , customerName:name, password:password};
    	  adminService.updateCustomer(customer)
   	      .then(function(response) {
   	    	  hide_all_and_show_one_insideTab( 'successLog');
   	    	  $scope.log = "Customer " + name + " updated successfully.";
   	    	  adminService.getCustomers()
   	    	  .then(function(response){ 
   	    		  $scope.customers = response.data;
   	    	  },function(err){
              	$location.path('/error');
   	    	  });
   	      },function(err){
          	$location.path('/error');
          });
   	 }
      $scope.showCoupons = function(coupons, id){
   	   if(id>100){
   	   $scope.companyCouponsShow=true;
   	   $scope.customerCouponsShow=false;
   	    $scope.companyCouponsShowId = id;
   	   }else{
   		   $scope.customerCouponsShow=true;
   		   $scope.companyCouponsShow=false;
   		   $scope.customerCouponsShowId = id;
   	   }
   	   hide_all_and_show_one_insideTab( 'couponJointTable');
   	   $scope.jointCoupons = coupons;
      }

      $scope.createCompany = function(company){
    	  var companies = $scope.companies;
    	  if (companies.filter(function(companyX) { return companyX.companyName == company.companyName; }).length > 0) {
    		  alert("The company name "+ company.companyName+" already exists. Please enter a different name.")
    		} else{
    	  adminService.createCompany(company)
   	      .then(function(response) {
   	    	  hide_all_and_show_one_insideTab( 'successLog');
   	    	  $scope.log = "Company " + company.companyName + " successfully created.";
   	    	  $scope.company.companyName = "";
   	    	  $scope.company.password = "";
   	    	  $scope.company.email = "";
   	    	  adminService.getCompanies()
   	    	  .then(function(response){ 
   	    		  $scope.companies = response.data;
   	      },function(err){
          	$location.path('/error');
          });
    	  },function(err){
    		  $location.path('/error');
    	  });
      }
    	  }
      $scope.showCreateForm=function(){
   	   hide_all_and_show_one_insideTab( 'createForm');
   	   
   	   
      }
      $scope.createCustomer = function(customer){
    	  var customers = $scope.customers;
    	  if (customers.filter(function(customerX) { return customerX.customerName == customer.customerName; }).length > 0) {
    		  alert("The customer name "+ customer.customerName+" already exists. Please enter a different name.")
    		} else{
    	  adminService.createCustomer(customer)
   			   .then(function(response) {
   				   hide_all_and_show_one_insideTab( 'successLog');
   				   $scope.log = "Customer " + customer.customerName + " successfully created.";
   				   $scope.customer.customerName= "";
   				   $scope.customer.password = "";
   				   adminService.getCustomers()
   				   .then(function(response){ 
   					   $scope.customers = response.data;
   				   },function(err){
                   	$location.path('/error');
                   });
   			   },function(err){
   	    		  $location.path('/error');
   	    	  });
   	   }
    	  }
      $scope.lessThanPrice = function(price){
   	   if($scope.searchPrice>0){
   	   return function(coupon){
   	      return coupon[price] <= $scope.searchPrice;
   	    };
   	   } else{
   		   return function(coupon){
   			   return coupon[price];
   		   };
   	   }
   	}
}])
.controller('customer',['$scope','$location','customerService',function($scope,$location,customerService){
	$scope.tab = 1;
	$scope.showAllCoupons=true;
	$scope.showMyCoupons=false;
	$scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2){
        	$scope.showAllCoupons=false;
        	$scope.successLog = false;
        	$scope.showMyCoupons=true;
        }
        else{
        	$scope.showAllCoupons=true;
        	$scope.showMyCoupons=false;
        }
    };
    $scope.isSelected = function (checkTab) {
    	return ($scope.tab === checkTab);
    }
	$scope.buy= function(coupon){
		var myCoupons= $scope.myCoupons;
  	  if (myCoupons.filter(function(couponX) { return couponX.couponId == coupon.couponId; }).length > 0) {
  		  alert("You already have purchased the coupon '"+ coupon.title+"'.")
  		} else{
		customerService.buy(coupon)
	.then(
			function(response) {
				$scope.successLog = true;
				$scope.log = "You just purchased "+ coupon.title+ " . Enjoy!";
				customerService.getMyCoupons()
				.then(
						function(response) {
							$scope.myCoupons = response.data;
						},function(err){
			            	$location.path('/error');
			            });
			},function(err){
            	$location.path('/error');
            });
	}
	}
	$scope.myCoupons= [];
	customerService.getMyCoupons()
	.then(
			function(response) {
				$scope.myCoupons = response.data;
			},function(err){
            	$location.path('/error');
            });
	
	$scope.allCoupons= [];
	$scope.loading = true;
    customerService.getAllCoupons()
    .then(
        function(response) {
        	$scope.allCoupons = response.data;
        },function(err){
        	$location.path('/error');
        })['finally'](function(){
      		 $scope.loading = false;
        });
    
    $scope.checkDate = function(startDate, endDate){
    	var todaysDate = new Date();
    	 return function(coupon){
    	    return Date.parse(coupon[startDate]) <= todaysDate && Date.parse(coupon[endDate]) >= todaysDate ;
    	 };
    	}
    
    $scope.lessThanPrice = function(price){
    		if($scope.searchPrice>0){
    	   return function(coupon){
    	      return coupon[price] <= $scope.searchPrice;
    	    };
    	   } else{
    		   return function(coupon){
    			   return coupon[price];
    		   };
    	   }
    	}
}])
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.controller('company',['$scope', '$http', '$location', 'companyService',function($scope, $http, $location, companyService){
	$scope.tab = 1;
    
    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    }
    
    function hide_all_and_show_one_insideTab(elem_to_show){
		  var all = [ 'successLog', 'updateForm','createForm', 'uploadFail' ];
		  all.forEach(function(val){ $scope[val] = false; });
		  $scope[elem_to_show] = true;
		}
    $scope.coupons= [];
    $scope.loading = true;
    companyService.getCoupons()
    .then(
        function(response) {
            $scope.coupons = response.data;
        },function(err){
        	$location.path('/error');
        })['finally'](function(){
      		 $scope.loading = false;
        });

    $scope.removeCoupon=function(id, imageName){
  	  companyService.removeCoupon(id)
    .then(
              function(response) {
                  hide_all_and_show_one_insideTab( 'successLog');
	    	  $scope.log = "Coupon ID# " + id + " successfully removed.";
	    	  companyService.deleteImage(imageName)
	    	  .then(
	    			  function(response) {
	    			  },function(err){
	                  	$location.path('/error');
	                  });
	    	  companyService.getCoupons()
	    	  .then(
	    			  function(response) {
	    				  $scope.coupons = response.data;
	    			  },function(err){
	                  	$location.path('/error');
	                  });
              },function(err){
              	$location.path('/error');
              } );
    }

    $scope.showUpdateCoupon = function(coupon){
 	   hide_all_and_show_one_insideTab( 'updateForm');
 	   $scope.updateCoupId = coupon.couponId;
 	   $scope.updateCoupTitle = coupon.title;
 	   $scope.updateCoupStartDate= coupon.startDate;
 	   $scope.updateCoupEndDate= coupon.endDate;
 	   $scope.updateCoupAmount = coupon.amount;
 	   $scope.updateCoupType = coupon.type;
 	   $scope.updateCoupMessage= coupon.message;
 	   $scope.updateCoupPrice= coupon.price;
 	   $scope.updateCoupImage= coupon.image;
    }
    
    $scope.updateCoupon = function(id, title, startDate, endDate, amount, type, message, price, image){
  	  var coupon = {couponId:id , title:title, startDate:startDate, endDate:endDate, amount:amount, 
  			  type:type, message:message, price:price, image:image};
  	  companyService.updateCoupon(coupon)
 	      .then(function(response) {
 	    	  hide_all_and_show_one_insideTab( 'successLog');
 	    	  $scope.log = "Coupon " + title + " updated successfully.";
 	    	  companyService.getCoupons()
 	    	  .then(function(response){ 
 	    		  $scope.coupons = response.data;
 	    	  },function(err){
              	$location.path('/error');
              });
 	      },function(err){
          	$location.path('/error');
          });
 	 }
    $scope.createCoupon = function(coupon){
    	var coupons = $scope.coupons;
  	  	
    	if (coupons.filter(function(couponX) { return couponX.title == coupon.title; }).length > 0) {
  		  alert("The coupon title "+ coupon.title+" already exists. Please enter a different title.");
  		} else if(Date.parse(coupon.startDate)>=Date.parse(coupon.endDate)){	
  		alert("The end date of the coupon must be after the start date. Please modify the dates.");
  		} else 	if(validateImg()){
  			coupon.image = setImagePath();
  			upload(coupon.title);
  			companyService.createCoupon(coupon)
 	      .then(function(response) {
 	    	  hide_all_and_show_one_insideTab( 'successLog');
 	    	  $scope.log = "Coupon " + coupon.title + " successfully created.";
 	    	  $scope.coupon.title = "";
 	    	  $scope.coupon.startDate = "";
 	    	  $scope.coupon.endDate = "";
 	    	  $scope.coupon.amount= "";
 	    	  $scope.coupon.type= "";
 	    	  $scope.coupon.message= "";
 	    	  $scope.coupon.price = "";
 	    	  
 	    	  companyService.getCoupons()
 	    	  .then(function(response){ 
 	    		  $scope.coupons = response.data;
 	    	  },function(err){
              	$location.path('/error');
              });
 	      },function(err){
          	$location.path('/error');
          });

  		}
  	  }
    
    function setImagePath(){
    var fileName = angular.element(fileInput).val();
		var index = fileName.lastIndexOf(".");
		var ext = fileName.substr(index);
		var image = $scope.coupon.title + ext;
		return image;
    }
    function upload(title){
    	var file = $scope.file; 
    	var fd = new FormData();
    	fd.append('file',file);
         companyService.upload(fd,title)
         .then(function(response) {
        	 angular.element(fileInput).val(null);
      }),(function(response){
      	$scope.uploadFail = true;
    	  $scope.result = "There was a problem uploading your image, please try again";
      });
    }
    
    function validateImg(){
    	var allowed = ['jpg','gif','png', 'jpe'];
    	var fileName = angular.element(fileInput).val();
        var ext = fileName.substr(fileName.lastIndexOf(".")+1);
        // check if this image extension is in allowed array. If not will return -1
        if(allowed.indexOf(ext)<0){
             alert("invalid image format: please upload an acceptable image file (.jpg, .jpe, .gif, png ");
             return false;
        }
        return true;
    }
        
    
    
    $scope.showCreateForm=function(){
 	   hide_all_and_show_one_insideTab( 'createForm');
    }
    
    
    $scope.lessThanPrice = function(price){
 	   if($scope.searchPrice>0){
 	   return function(coupon){
 	      return coupon[price] <= $scope.searchPrice;
 	    };
 	   } else{
 		   return function(coupon){
 			   return coupon[price];
 		   };
 	   }
 	}
}])
.controller('app',['$scope', '$location', 'appService',function($scope, $location, appService){
    $scope.login = function(name,password,type){
    	appService.login(name,password,type)
    	.then(function(response){
    			if(type=="admin"){
    				$location.path('/admin');
    			} else if(type=="company"){
    				$location.path('/company');
    			} else if(type=="customer"){
    				$location.path('/customer');
    			}
    	}, function(err){
    		$scope.error = err.headers()['message'];
    	}
    	);
    }
    $scope.logout = function(){
    	appService.logout()
    	.then(function(response){
    		$location.path('/login');
    	},function(err){
        	$location.path('/error');
        });
    }
}])
;

