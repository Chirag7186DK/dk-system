
angular.module('DKAPP').controller('CheckoutController', CheckoutController);

// CheckoutController
function CheckoutController($rootScope, OrderCartServices){
    
    // gotoCheckoutProcess
    $rootScope.gotoCheckoutProcess = function(){
        try{
            // check user logged in session
            var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(authenticatedUserParamDataObj!==false 
                && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                window.location.href = globalBaseSitePath+"checkout.php";
            }else{
                window.location.href = globalBaseSitePath;
            }
        }catch(ex){
            console.log("problem in gotoCheckoutProcess ex=>"+ex);
        }
    };
    
    // loadStorewiseOrderSummaryForCheckoutProcess
    $rootScope.loadStorewiseOrderSummaryForCheckoutProcess = function(){
        try{
            var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(authenticatedUserParamDataObj!==false 
                && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                var apiParamJsonObj = {};
                apiParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                // calling OrderCartServices 
                OrderCartServices.getStorewiseOrderSummaryForCheckoutProcess(apiParamJsonObj).done(function(retResponseJson){
                    $rootScope.$apply(function(){
                        var allStorewiseOrderSummaryDataArrObj =  false;
                        if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                            allStorewiseOrderSummaryDataArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'storewiseOrderSummaryData', retResponseJson);
                        }
                        if(allStorewiseOrderSummaryDataArrObj!==false && allStorewiseOrderSummaryDataArrObj!==undefined 
                            && jQuery.isEmptyObject(allStorewiseOrderSummaryDataArrObj)===false){
                            $rootScope.allStorewiseOrderSummaryDataArrObj =  allStorewiseOrderSummaryDataArrObj;
                        }else{
                            window.location.href = globalBaseSitePath;
                        }
                    });
                });
            }else{
                window.location.href = globalBaseSitePath;
            }
        }catch(ex){
            console.log("problem in loadStorewiseOrderSummaryForCheckoutProcess ex=>"+ex);
        }
    };

    //  checkOrderDeliveryAddressDataForSave
    $rootScope.checkOrderDeliveryAddressDataForSave = function(fcontentClass){
        // validating order delivery address details
        var validatedDataStatus = validateOrderDeliveryAddressData(fcontentClass);
        if(validatedDataStatus===true){
            $rootScope.updateOrderDeliveryAddressInOrdercartStore(fcontentClass);
        }else{
            var notifyMsgStr = "Please enter delivery address !!!";
            showNotificationBoxMsg(notifyMsgStr);
        }
    };
    
    // updateOrderDeliveryAddressInOrdercartStore
    $rootScope.updateOrderDeliveryAddressInOrdercartStore = function(fcontentClass){
        try{
            // collect product data
            var preparedProductParamDataObj = getParamDataToAddOrderDeliveryAddressInOrdercartStore(fcontentClass);
            if(preparedProductParamDataObj!==false && jQuery.isEmptyObject(preparedProductParamDataObj)===false){
                var apiParamJsonObj = {};
                apiParamJsonObj['dkParamDataArr'] = preparedProductParamDataObj;
                // calling OrderCartServices 
                OrderCartServices.updateOrderDeliveryAddressInOrdercartStore(apiParamJsonObj).done(function(retResponseJson){
                    $rootScope.$apply(function(){
                        var isUpdatedOrderDeliveryAddress = 'FALSE';
                        var notificationMsgStr = "Please try again to updated order delivery address !!!";
                        if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                            isUpdatedOrderDeliveryAddress = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUpdatedOrderDeliveryAddress', retResponseJson);
                        }
                        if(isUpdatedOrderDeliveryAddress==='TRUE'){
                            notificationMsgStr = "Order delivery address updated successfully !!!";
                        }
                        showNotificationBoxMsg(notificationMsgStr);
                    });
                });
            }
        }catch(ex){
            console.log("problem in updateOrderDeliveryAddressInOrdercartStore ex=>"+ex);
        }
    };
    
}
