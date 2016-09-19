
(function(){
    
    angular.module('DKAPP').factory('CustomizeOrdersServices', CustomizeOrdersServices);

    // CJ defined this function 2016-07-24
    function CustomizeOrdersServices(){
        try{

            var customizeOrdersDetails = {

                addCustomizeOrderRequest:function(apiParamJsonObj){
                    var blockUIObj = {};
                    blockUIObj['css'] = {"padding":10};
                    blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', blockUIObj);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'POST', '', apiParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                    });
                    return promiseObject;
                },

                getCustomizeOrdersList:function(apiParamJsonObj){
                    var blockUIObj = {};
                    blockUIObj['css'] = {"padding":10};
                    blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', blockUIObj);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrders", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
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