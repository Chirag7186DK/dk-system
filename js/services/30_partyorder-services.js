
(function(){

    angular.module('DKAPP').factory('PartyOrdersServices', PartyOrdersServices);

    // CJ defined this function 2016-07-20
    function PartyOrdersServices(){
        try{
            var partyOrdersDetails = {
                
                addPartyOrderRequest:function(apiParamJsonObj){
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'POST', '', apiParamJsonObj).done(function(retResponseJson){
                    });
                    return promiseObject;
                },
                
                getPartyOrdersList:function(apiParamJsonObj){
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
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