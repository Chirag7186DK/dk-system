
(function(){
    
    angular.module('DKAPP').factory('CommonServices', CommonServices);

    function CommonServices($rootScope){
        try{

            var commonDetails = {};
            
            commonDetails.showSelectedDeliveryAreaTextHeader = function(){
                $rootScope.selectedDeliveryAreaTextHeader = '';
                $rootScope.isShowSelectedDeliveryAreaTextHeader = false;
                var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
                if(infoObj!=='' && infoObj!==undefined 
                    && infoObj!==false && jQuery.isEmptyObject(infoObj)===false){
                    $rootScope.isShowSelectedDeliveryAreaTextHeader = true;
                    $rootScope.selectedDeliveryAreaTextHeader = infoObj['userSelectedArea'];
                }  
            };

            commonDetails.resetSelectedDeliveryAreaTextHeader = function(){
                $rootScope.selectedDeliveryAreaTextHeader = '';
                $rootScope.isShowSelectedDeliveryAreaTextHeader = false;
            };

            commonDetails.notifyToUserForSelectedDeliveryarea = function(){
                $rootScope.selectedDeliveryAreaTextHeader = '';
                var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
                if(infoObj!=='' && infoObj!==undefined 
                    && infoObj!==false && jQuery.isEmptyObject(infoObj)===false){
                    $rootScope.selectedDeliveryAreaTextHeader = infoObj['userSelectedArea'];
                    var msgStr = "You selected delivery location is : "+infoObj['userSelectedArea']+" - "+infoObj['userSelectedAreaPincode'];
                    var notifyInfoConfigObj = {
                        icon:false,
                        title:false,
                        sound:false, 
                        size:'normal', 
                        msg:"<p style='text-align:center;'>"+msgStr+"</p>",
                        delay:2000,
                        position:"top left" ,
                        showClass:"zoomIn notifyToUserOnlyForSelectedDeliveryArea"
                    }; 
                    showNotificationBoxMsg('', notifyInfoConfigObj);
                }  
            };
            
            // resetStoreDeliveryFeeApplicableMsgOnDeliveryArea
            commonDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(storeDeliveryFeeApplicableMsg){
                $rootScope.storeDeliveryFeeApplicableMsg = storeDeliveryFeeApplicableMsg;
            };

            // getStoreDeliveryFeeApplicableMsgOnDeliveryArea
            commonDetails.getStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(){
                // fetch param data from session
                var paramDataObj = getParamObjStoreDeliveryFeeApplicableMsgOnDeliveryArea();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/StoreDeliveryFeeApplicableDeliveryArea", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var storeDeliveryFeeApplicableMsg = '';
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                storeDeliveryFeeApplicableMsg = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'applicableStoreDeliveryFeeMsg', rtRspJson);
                            }
                            commonDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea(storeDeliveryFeeApplicableMsg);
                        });
                    });
                }else{
                    commonDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea('');
                }
            };
            
            return commonDetails;

        }catch(ex){
            console.log("problem in CommonServices ex=>"+ex);
            return false;
        }
    }
    
})();
