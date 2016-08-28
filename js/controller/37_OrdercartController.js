
// OrderCartController
app.controller('OrderCartController', function($scope, $rootScope, $http, OrderCartServices){
    try{
         
        // checkProductDataToAddInOrdercart 
        $rootScope.checkProductDataToAddInOrdercart = function(productDetailsObj, fcontentClass, fromPageLoad){
            try{
                // check is user logged in or not session
                var isUserLoggedInSession = checkUserLoggedInSession();
                if(isUserLoggedInSession===true){
                    // validating product data status
                    var validatedDataStatus = validateProductDataToAddInOrdercart(fcontentClass);
                    if(validatedDataStatus===true && 
                        (productDetailsObj!==false && productDetailsObj!==undefined && jQuery.isEmptyObject(productDetailsObj)===false)){
                        $rootScope.addProductDataInOrdercart(productDetailsObj, fcontentClass);
                    }else if(validatedDataStatus===true && 
                        (productDetailsObj===false || productDetailsObj===undefined || jQuery.isEmptyObject(productDetailsObj)===true)){
                        $rootScope.addProductDataInOrdercart(false, fcontentClass);
                    }else{
                        var notifyMsgStr = "Please enter product qty / message to add item in order cart !";
                        showNotificationBoxMsg(notifyMsgStr);
                    }
                }else if(isUserLoggedInSession===false){
                    storePageDetailsUserAccessedFrom(fromPageLoad);
                    storeUserOrderItemInSession(productDetailsObj, fcontentClass);
                    window.location.href = globalBaseSitePath+"account-signup-signin.php";
                }
            }catch(ex){
                console.log("problem in checkingProductDataToAddInOrdercart=>"+ex);
            }
        };
        
        
        // addProductDataInOrdercart & item directly added in DB
        $rootScope.addProductDataInOrdercart = function(productDetailsObj, fcontentClass, productDataFromSession){
            try{
                // collect product data
                var preparedProductParamDataObj = getParamDataToAddProductInOrdercart(productDetailsObj, fcontentClass, productDataFromSession);
                if(preparedProductParamDataObj!==false && jQuery.isEmptyObject(preparedProductParamDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedProductParamDataObj;

                    // calling OrderCartServices 
                    OrderCartServices.addItemOrdercart(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
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
                                OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
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
    
});
