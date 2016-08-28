
// CJ defined this function 2016-06-16
app.factory('DiscountCouponServices', function($http, $q, $rootScope){
    try{
        
        var discountCouponDetails = {};
        
        // userSharingDiscountCouponList
        discountCouponDetails.userSharingDiscountCouponList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/DiscountCoupon/UserSharingDiscountCouponList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // userSharedDiscountCouponList
        discountCouponDetails.userSharedDiscountCouponList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/DiscountCoupon/UserSharedDiscountCouponList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        return discountCouponDetails;
        
    }catch(ex){
        return false;
    }
}); 
