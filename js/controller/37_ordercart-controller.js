
angular.module('DKAPP').controller('OrderCartController', OrderCartController);

// OrderCartController
function OrderCartController($rootScope, $state, OrderCartServices, CommonServices){
    
    try{
         
        // checkProductDataToAddInOrdercart 
        $rootScope.checkProductDataToAddInOrdercart = function(fcontentClass, fromPageLoad){
            try{
                // check is user logged in or not session
                var isUserLoggedInSession = checkUserLoggedInSession();
                if(isUserLoggedInSession===true){
                    // validating product data status
                    var validatedDataStatus = validateProductDataToAddInOrdercart(fcontentClass);
                    if(validatedDataStatus===true){
                        $rootScope.addProductDataInOrdercart(fcontentClass);
                    }else{
                        var notifyMsgStr = "Please enter product qty / message to add item in order cart !!!";
                        showNotificationBoxMsg(notifyMsgStr);
                    }
                }else if(isUserLoggedInSession===false){
                    storePageDetailsUserAccessedFrom(fromPageLoad);
                    storeUserOrderItemInSession(fcontentClass);
                    // window.location.href = globalBaseSitePath+"account-signup-signin.php";
                    $state.go('account-signup-signin');
                }
            }catch(ex){
                console.log("problem in checkingProductDataToAddInOrdercart=>"+ex);
            }
        };
        
        // addProductDataInOrdercart & item directly added in DB
        $rootScope.addProductDataInOrdercart = function(fcontentClass, productDataFromSession){
            try{
                // collect product data
                var paramDataObj = getParamDataToAddProductInOrdercart(fcontentClass, productDataFromSession);
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'POST', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var isProductAddedInOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to add item in your order cart !";
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                isProductAddedInOrdercart = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductAddedInOrdercart', rtRspJson);
                            }
                            if(isProductAddedInOrdercart==='TRUE'){
                                notificationMsgStr = "Item added in your order cart successfully !";
                                clearProductContentAfterAddedProductInOrdercart(fcontentClass);
                                // refresh user order cart dashboard summary data using services
                                OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
                                if(productDataFromSession!=='session'){
                                    CommonServices.getStoreDeliveryFeeApplicableMsgOnDeliveryArea();
                                }
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in addProductDataInOrdercart ex=>"+ex);
            }
        };
        
        // gotoCheckoutProcess
        $rootScope.gotoCheckoutProcess = function(){
            try{
                // check user logged in session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false 
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    // window.location.href = globalBaseSitePath+"checkout.php";
                    $state.go('checkout');
                }else{
                    // window.location.href = globalBaseSitePath;
                    $state.go('/');
                }
            }catch(ex){
                console.log("problem in gotoCheckoutProcess ex=>"+ex);
            }
        };
    
        // loadStorewiseOrderSummaryForCheckoutProcess
        $rootScope.loadStorewiseOrderSummaryForCheckoutProcess = function(){
            try{
                var paramDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/StorewiseOrderSummaryCheckoutProcess", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var allStorewiseOrderSummaryDataArrObj =  false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                allStorewiseOrderSummaryDataArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'storewiseOrderSummaryData', rtRspJson);
                            }
                            if(allStorewiseOrderSummaryDataArrObj!==false && allStorewiseOrderSummaryDataArrObj!==undefined 
                                && jQuery.isEmptyObject(allStorewiseOrderSummaryDataArrObj)===false){
                                $rootScope.allStorewiseOrderSummaryDataArrObj =  allStorewiseOrderSummaryDataArrObj;
                            }else{
                                // window.location.href = globalBaseSitePath;
                                $state.go('/');
                            }
                        });
                    });
                }else{
                    // window.location.href = globalBaseSitePath;
                    $state.go('/');
                }
            }catch(ex){
                console.log("problem in loadStorewiseOrderSummaryForCheckoutProcess ex=>"+ex);
            }
        };

        //  checkOrderDeliveryAddressDataForUpdate
        $rootScope.checkOrderDeliveryAddressDataForUpdate = function(fcontentClass){
            // validating order delivery address details
            var validatedDataStatus = validateOrderDeliveryAddressData(fcontentClass);
            if(validatedDataStatus===true){
                $rootScope.updateOrderDeliveryAddressInOrdercartStore(fcontentClass);
            }else{
                var notifyMsgStr = "Please enter order delivery address for updation !!!";
                showNotificationBoxMsg(notifyMsgStr);
            }
        };
    
        // updateOrderDeliveryAddressInOrdercartStore
        $rootScope.updateOrderDeliveryAddressInOrdercartStore = function(fcontentClass){
            try{
                // collect product data
                var paramDataObj = getParamDataToUdateOrderDeliveryAddressInOrdercartStore(fcontentClass);
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageDeliveryAddressOrdercartStorewise", 'apiFile', 'PUT', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var isUpdatedOrderDeliveryAddress = 'FALSE';
                            var notificationMsgStr = "Please try again to updated order delivery address !!!";
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                isUpdatedOrderDeliveryAddress = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUpdatedOrderDeliveryAddress', rtRspJson);
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

       
    }catch(ex){
        console.log("problem in OrdercartController ex=>"+ex);
    }
    
}
