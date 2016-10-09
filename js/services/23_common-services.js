
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

            
            return commonDetails;

        }catch(ex){
            console.log("problem in CommonServices ex=>"+ex);
            return false;
        }
    }
    
})();
