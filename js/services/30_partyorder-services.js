
(function(){

    angular.module('DKAPP').factory('PartyOrdersServices', PartyOrdersServices);

    // CJ defined this function 2016-07-20
    function PartyOrdersServices(){
        try{
            var partyOrdersDetails = {
                
                addPartyOrderRequest:function(apiParamJsonObj){
                    var blockUIObj = {};
                    blockUIObj['css'] = {"padding":10};
                    blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', blockUIObj);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'POST', '', apiParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                    });
                    return promiseObject;
                },
                
                getPartyOrdersList:function(apiParamJsonObj){
                    var blockUIObj = {};
                    blockUIObj['css'] = {"padding":10};
                    blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', blockUIObj);
                    var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrders", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
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