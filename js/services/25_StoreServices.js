
angular.module('DKAPP').factory('StoreServices', StoreServices);

// CJ defined this function 2016-06-22
function StoreServices($rootScope){
    try{
        
        var storeDetails = {};
        
        storeDetails.getDeliveryAreaBasedDessertsTypeStoresList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Stores/DeliveryAreaBasedDessertTypeStoresList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        storeDetails.getDKDeliveryAreaBasedDessertsTypeList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Stores/DeliveryAreaBasedStoresConductDessertType", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        storeDetails.getStoreSummaryInfo = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Stores/StoreSummaryInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        storeDetails.getCStoresWorkingStyleDetails = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Stores/StoreWorkingstyle", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        // resetStoreDeliveryFeeApplicableMsgOnDeliveryArea
        storeDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(storeDeliveryFeeApplicableMsg){
            $rootScope.storeDeliveryFeeApplicableMsg = storeDeliveryFeeApplicableMsg;
        };
        
        // getStoreDeliveryFeeApplicableMsgOnDeliveryArea
        storeDetails.getStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(){
            // fetch param data from session
            var preparedParamJsonObj = getParamObjStoreDeliveryFeeApplicableMsgOnDeliveryArea();
            if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var fetchedParamJsonObj = {};
                fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Stores/StoreDeliveryFeeApplicableDeliveryArea", 'apiFile', 'GET', '', fetchedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                    $rootScope.$apply(function(){
                        var storeDeliveryFeeApplicableMsg = '';
                        if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                            storeDeliveryFeeApplicableMsg = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'applicableStoreDeliveryFeeMsg', retResponseJson);
                        }
                        storeDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea(storeDeliveryFeeApplicableMsg);
                    });
                });
            }else{
                storeDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea('');
            }
        };
        
        return storeDetails;
        
    }catch(ex){
        console.log("problem in Shopstore services ex=>"+ex);
        return false;
    }
}
