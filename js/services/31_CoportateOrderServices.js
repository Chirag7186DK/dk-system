
// CJ defined this function 2016-07-24
app.factory('CorporateTieupServices', function($http, $q){
    try{
        var corporateTieupDetails = {
            addingCorporateTieupRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CorporateTieup/ManageCorporateTieupRequest", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                    return retResponseJson;
                });
                return promiseObject;
            }
        };
        return corporateTieupDetails;
    }catch(ex){
        return false;
    }
});