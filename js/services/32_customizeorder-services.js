
(function(){
    
    angular.module('DKAPP').factory('CustomizeOrdersServices', CustomizeOrdersServices);

    // CJ defined this function 2016-07-24
    function CustomizeOrdersServices(){
        try{

            var customizeOrdersDetails = {

                addCustomizeOrderRequest:function(apiParamJsonObj){
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'POST', '', apiParamJsonObj).done(function(retResponseJson){
                    });
                    return promiseObject;
                },

                getCustomizeOrdersList:function(apiParamJsonObj){
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    });
                    return promiseObject;
                }
            };

            return customizeOrdersDetails;

        }catch(ex){
            return false;
        }
    }; 
    
})();