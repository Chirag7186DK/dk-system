
angular.module('DKAPP').factory('CustomizeOrdersServices', CustomizeOrdersServices);

// CJ defined this function 2016-07-24
function CustomizeOrdersServices(){
    try{
        
        var customizeOrdersDetails = {
            
            addCustomizeOrderRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                    return retResponseJson;
                });
                return promiseObject;
            },
            
            getCustomizeOrdersList:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
                return promiseObject;
            }
        };
        
        return customizeOrdersDetails;
        
    }catch(ex){
        return false;
    }
}; 