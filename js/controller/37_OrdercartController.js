
angular.module('DKAPP').controller('OrderCartController', OrderCartController);

// OrderCartController
function OrderCartController($rootScope, OrderCartServices){
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
                    window.location.href = globalBaseSitePath+"account-signup-signin.php";
                }
            }catch(ex){
                console.log("problem in checkingProductDataToAddInOrdercart=>"+ex);
            }
        };
        
        
        // addProductDataInOrdercart & item directly added in DB
        $rootScope.addProductDataInOrdercart = function(fcontentClass, productDataFromSession){
            try{
                // collect product data
                var preparedProductParamDataObj = getParamDataToAddProductInOrdercart(fcontentClass, productDataFromSession);
                if(preparedProductParamDataObj!==false && jQuery.isEmptyObject(preparedProductParamDataObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedProductParamDataObj;
                    // calling OrderCartServices 
                    OrderCartServices.addItemOrdercart(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var isProductAddedInOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to add item in your order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isProductAddedInOrdercart = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductAddedInOrdercart', retResponseJson);
                            }
                            if(isProductAddedInOrdercart==='TRUE'){
                                notificationMsgStr = "Item added in your order cart successfully !";
                                clearProductContentAfterAddedProductInOrdercart(fcontentClass);
                                // refresh user order cart dashboard summary data using services
                                // OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
                                if(productDataFromSession==='session'){
                                    
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
       
    }catch(ex){
        console.log("problem in OrdercartController ex=>"+ex);
    }
    
}
