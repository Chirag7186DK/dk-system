
angular.module('DKAPP').factory('ShopStoreServices', ShopStoreServices);

// CJ defined this function 2016-06-22
function ShopStoreServices($http, $q){
    try{
        
        var shopstoreDetails = {};
        
        shopstoreDetails.getDKDeliveryAreaBasedDessertsTypeList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/DeliveryAreaBasedCStoreConductDessertType", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        shopstoreDetails.getCShopStoreSummaryInfo = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CShopStoreSummaryInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
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
