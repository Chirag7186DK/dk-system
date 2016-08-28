
angular.module('DKAPP').factory('ShopStoreServices', ShopStoreServices);

// CJ defined this function 2016-06-22
function ShopStoreServices($http, $q){
    try{
        var shopstoreDetails = {};
        
        shopstoreDetails.getCShopStoreSummaryInfo = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CShopStoreSummaryInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        shopstoreDetails.getCShopStoreProductTypeProductCategoryAllProductList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CShopStoreProductTypeProductCategoryAllProductDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        shopstoreDetails.getCShopStoreWorkingStyleDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CshopstoreWorkingstyle", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        shopstoreDetails.getCShopStoreProductDeliveryAreaDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CshopstoreProductdeliveryAreaInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return shopstoreDetails;
    }catch(ex){
        console.log("problem in Shopstore services ex=>"+ex);
        return false;
    }
}
