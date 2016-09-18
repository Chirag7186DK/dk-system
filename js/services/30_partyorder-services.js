
(function(){

    angular.module('DKAPP').factory('PartyOrdersServices', PartyOrdersServices);

    // CJ defined this function 2016-07-20
    function PartyOrdersServices($http, $q){
        try{
            var partyOrdersDetails = {
                
                addPartyOrderRequest:function(preparedParamJsonObj){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                    });
                    return promiseObject;
                },
                
                getPartyOrdersList:function(preparedParamJsonObj){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                    });
                    return promiseObject;
                }
                
            };
            
            return partyOrdersDetails;
            
        }catch(ex){
            console.log("Problem in PartyOrdersServices=>"+ex);
            return false;
        }
    } 
    
})();