

angular.module('DKAPP').factory('LocationServices', LocationServices);

function LocationServices($http, $q, $rootScope){
    try{
        
        var locationDetails = {};
        
        locationDetails.showUserSelectedDeliveryAreaTextHeader = function(){
            $rootScope.userSelectedDeliveryAreaTextHeader = '';
            $rootScope.isShowUserSelectedDeliveryAreaTextHeader = false;
            var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
            if(infoObj!=='' && infoObj!==undefined 
                && infoObj!==false && jQuery.isEmptyObject(infoObj)===false){
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
                    position:"top left" ,
                    showClass:"zoomIn deliveryAreaNotifyBoxClass"
                }; 
                showNotificationBoxMsg('', notifyInfoConfigObj);
            }  
        };
        
        locationDetails.getDKDeliveryCityList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Location/DeliveryCity", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        locationDetails.getDKDeliveryAreaList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Location/DeliveryArea", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        locationDetails.getDKDeliveryAreaBasedDessertsTypeList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/DeliveryAreaBasedDessertsTypeList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        return locationDetails;
        
    }catch(ex){
        console.log("problem in LocationServices ex=>"+ex);
        return false;
    }
}