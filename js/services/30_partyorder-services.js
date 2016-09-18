
angular.module('DKAPP').factory('PartyOrdersServices', PartyOrdersServices);

// CJ defined this function 2016-07-20
function PartyOrdersServices($http, $q){
    try{
        var partyOrdersDetails = {
            addPartyOrderRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
                return promiseObject;
            },
            getPartyOrdersList:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
                return promiseObject;
            }
        };
        return partyOrdersDetails;
    }catch(ex){
        return false;
    }
} 