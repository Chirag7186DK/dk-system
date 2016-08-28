
// CJ defined this function 2016-04-22
app.factory('ProductServices', function($http, $q){
    try{
        var productDetails = {};
        
        productDetails.getProductTypeProductCategoryProductListForDashboardLevel = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryProductListDashboardLevel", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        productDetails.getProductTypeProductCategoryAllProductList = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryAllProductDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        productDetails.getProductTypeProductCategoryProductDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryProductDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        productDetails.getProductDescriptionDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductDescriptionDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return productDetails;
    }catch(ex){
        console.log("problem in Product services ex=>"+ex);
        return false;
    }
}); 
