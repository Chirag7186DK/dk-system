

angular.module('DKAPP').factory('LocationServices', LocationServices);

function LocationServices($http, $q){
    try{
        var locationDetails = {};
        
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