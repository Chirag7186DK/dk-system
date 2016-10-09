
(function(){
    
    angular.module('DKAPP').factory('StoreServices', StoreServices);

    // CJ defined this function 2016-06-22
    function StoreServices($rootScope){
        try{

            var storeDetails = {};

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
                    // calling ajax services
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