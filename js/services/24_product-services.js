
(function(){

    angular.module('DKAPP').factory('ProductServices', ProductServices);

    // CJ defined this function 2016-04-22
    function ProductServices(){
        try{

            var productDetails = {};

            productDetails.getProductTypeAllProductCategoryList = function(apiParamJsonObj){
                var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeAllProductCategoryDetails", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            productDetails.getProductTypeProductCategoryFilterTypeList = function(apiParamJsonObj){
                var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryFilterTypeList", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            productDetails.getProductTypeProductCategoryAllProductList = function(apiParamJsonObj){
                var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryAllProductDetails", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            productDetails.getProductTypeProductCategoryProductDetails = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryProductDetails", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            productDetails.getProductDescriptionDetails = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductDescriptionDetails", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            return productDetails;

        }catch(ex){
            console.log("problem in Product services ex=>"+ex);
            return false;
        }
    }

})();