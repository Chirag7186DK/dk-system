
angular.module('DKAPP').factory('ShopStoreServices', ShopStoreServices);

// CJ defined this function 2016-06-22
function ShopStoreServices(){
    try{
        
        var shopstoreDetails = {};
        
        shopstoreDetails.getDeliveryAreaBasedDessertsTypeCStoreList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/DeliveryAreaBasedDessertTypeCStoreList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        shopstoreDetails.getDKDeliveryAreaBasedDessertsTypeList = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/DeliveryAreaBasedCStoreConductDessertType", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        shopstoreDetails.getCShopStoreSummaryInfo = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CShopStoreSummaryInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        shopstoreDetails.getCShopStoreWorkingStyleDetails = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CshopstoreWorkingstyle", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        // checkStoreDeliveryFeeApplicable
        shopstoreDetails.checkStoreDeliveryFeeApplicable = function(){
            try{
                // fetch param data from session
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/UserOrdercartDashboardSummaryData", 'apiFile', 'GET', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var userOrdercartDashboardDataObj = false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userOrdercartDashboardDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'orderCartDashboardSummary', retResponseJson);
                            }
                            if(userOrdercartDashboardDataObj!=='' && userOrdercartDashboardDataObj!==false 
                                && userOrdercartDashboardDataObj!==undefined){
                                orderDetails.resetUserOrdercartDashboardVariableData(userOrdercartDashboardDataObj);
                            }else{
                                orderDetails.resetUserOrdercartDashboardVariableData(false);
                            }
                        });
                    });
                }else{
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("Problem in checkStoreDeliveryFeeApplicable=>"+ex);
            }
        };
        
        return shopstoreDetails;
        
    }catch(ex){
        console.log("problem in Shopstore services ex=>"+ex);
        return false;
    }
}
