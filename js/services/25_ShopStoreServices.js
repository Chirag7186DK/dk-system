
angular.module('DKAPP').factory('ShopStoreServices', ShopStoreServices);

// CJ defined this function 2016-06-22
function ShopStoreServices($rootScope){
    try{
        
        var shopstoreDetails = {};
        
        shopstoreDetails.getDeliveryAreaBasedDessertsTypeCStoreList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/DeliveryAreaBasedDessertTypeCStoreList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
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
        
        shopstoreDetails.getCShopStoreWorkingStyleDetails = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CshopstoreWorkingstyle", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        // resetStoreDeliveryFeeApplicableMsgOnDeliveryArea
        shopstoreDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(storeDeliveryFeeApplicableMsg){
            $rootScope.storeDeliveryFeeApplicableMsg = storeDeliveryFeeApplicableMsg;
        };
        
        // getStoreDeliveryFeeApplicableMsgOnDeliveryArea
        shopstoreDetails.getStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(){
            // fetch param data from session
            var preparedParamJsonObj = getParamObjStoreDeliveryFeeApplicableMsgOnDeliveryArea();
            if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var fetchedParamJsonObj = {};
                fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/StoreDeliveryFeeApplicableDeliveryArea", 'apiFile', 'GET', '', fetchedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                    $rootScope.$apply(function(){
                        var storeDeliveryFeeApplicableMsg = '';
                        if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                            storeDeliveryFeeApplicableMsg = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'applicableStoreDeliveryFeeMsg', retResponseJson);
                        }
                        shopstoreDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea(storeDeliveryFeeApplicableMsg);
                    });
                });
            }else{
                shopstoreDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea('');
            }
        };
        
        return shopstoreDetails;
        
    }catch(ex){
        console.log("problem in Shopstore services ex=>"+ex);
        return false;
    }
}
