
(function(){
    
    angular.module('DKAPP').factory('StoreServices', StoreServices);

    // CJ defined this function 2016-06-22
    function StoreServices($rootScope){
        try{

            var storeDetails = {};

            storeDetails.getStoreListDeliveryAreaBasedDessertsType = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/StoreListDeliveryAreaBasedDessertType", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            storeDetails.getDeliveryAreaBasedDessertsTypeList = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/DeliveryAreaBasedStoresConductDessertType", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            storeDetails.getStoreSummaryInfo = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/StoreSummaryInfo", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            storeDetails.getStoreWorkingStyleDetails = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/StoreWorkingstyle", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
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
                var paramDataObj = getParamObjStoreDeliveryFeeApplicableMsgOnDeliveryArea();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/StoreDeliveryFeeApplicableDeliveryArea", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
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
            console.log("problem in store services ex=>"+ex);
            return false;
        }
    }

})();