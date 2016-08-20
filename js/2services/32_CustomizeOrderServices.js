
// CJ defined this function 2016-07-24
app.factory('CustomizeOrdersServices', function($http, $q){
    try{
        var customizeOrdersDetails = {
            addCustomizeOrderRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrdersRequest", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                    return retResponseJson;
                });
                return promiseObject;
            }
        };
        return customizeOrdersDetails;
    }catch(ex){
        return false;
    }
}); 