
// CJ defined this function 2016-07-20
app.factory('PartyOrdersServices', function($http, $q){
    try{
        var partyOrdersDetails = {
            addPartyOrderRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrdersRequest", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
                return promiseObject;
            }
        };
        return partyOrdersDetails;
    }catch(ex){
        return false;
    }
}); 