

angular.module('DKAPP').factory('LocationServices', LocationServices);

function LocationServices($http, $q, $rootScope){
    try{
        var locationDetails = {};
        
        // resetUserDashboardVariableData
        locationDetails.showUserSelectedDeliveryAreaTextHeader = function(){
            $rootScope.userSelectedDeliveryAreaTextHeader = '';
            $rootScope.isShowUserSelectedDeliveryAreaTextHeader = false;
            var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
            if(infoObj!=='' && infoObj!==undefined 
                && infoObj!==false && jQuery.isEmptyObject(infoObj)===false){
                alert("infoObj=>"+JSON.stringify(infoObj));
                $rootScope.isShowUserSelectedDeliveryAreaTextHeader = true;
                $rootScope.userSelectedDeliveryAreaTextHeader = infoObj['userSelectedArea'];
                var msgStr = "You are at : "+infoObj['userSelectedArea']+" - "+infoObj['userSelectedAreaPincode'];
                var notifyInfoConfigObj = {
                    icon:false,
                    title:false,
                    sound:false, 
                    size:'normal', 
                    msg:"<p style='text-align:center;'>"+msgStr+"</p>",
                    delay:2000,
                    position:"top left" 
                }; 
                showNotificationBoxMsg('', notifyInfoConfigObj);
            }  
        };
        
        locationDetails.getDKDeliveryCityList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Location/DeliveryCity", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        locationDetails.getDKDeliveryAreaList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Location/DeliveryArea", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        locationDetails.getDKDeliveryAreaBasedProductTypeList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/DeliveryAreaBasedProductTypeList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return locationDetails;
    }catch(ex){
        console.log("problem in LocationServices ex=>"+ex);
        return false;
    }
}