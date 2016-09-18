
(function(){
    
    angular.module('DKAPP').factory('CustomizeOrdersServices', CustomizeOrdersServices);

    // CJ defined this function 2016-07-24
    function CustomizeOrdersServices(){
        try{

            var customizeOrdersDetails = {

                addCustomizeOrderRequest:function(preparedParamJsonObj){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                    });
                    return promiseObject;
                },

                getCustomizeOrdersList:function(preparedParamJsonObj){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
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