
// CJ defined this function 2016-06-16
app.factory('OrderCartServices', function($http, $q, $rootScope, UsersServices){
    try{
        
        var orderDetails = {};
        
        // resetUserOrdercartDashboardVariableData
        orderDetails.resetUserOrdercartDashboardVariableData = function(userOrdercartDashboardDataObj){
            if(userOrdercartDashboardDataObj!=='' && userOrdercartDashboardDataObj!==false 
                && userOrdercartDashboardDataObj!==undefined){
                $rootScope.ordercartCount = userOrdercartDashboardDataObj['ordercartCount'];
                $rootScope.ordercartItemRequestedCount = userOrdercartDashboardDataObj['ordercartItemRequestedCount'];
                $rootScope.subtotalOrderAmt = userOrdercartDashboardDataObj['subtotalOrderAmt'];
            }else{
                $rootScope.ordercartCount = 0;
                $rootScope.ordercartItemRequestedCount = 0;
                $rootScope.subtotalOrderAmt = 0;
            }
        };
        
        // refreshUserOrdercartDashboardSummaryDataDetails
        orderDetails.refreshUserOrdercartDashboardSummaryDataDetails = function(){
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
                    orderDetails.resetUserOrdercartDashboardVariableData(false);
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("Problem in refreshUserOrdercartDashboardSummaryDataDetails=>"+ex);
            }
        };
      
        // addProductDataInOrdercartFromSession & item directly added in DB
        orderDetails.addProductDataInOrdercartFromSession = function(productDetailsObj, fcontentClass, productDataFromSession){
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
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/AddProductData", 'apiFile', 'POST', '', fetchedParamJsonObj).done(function(retResponseJson){
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
                                orderDetails.refreshUserOrdercartDashboardSummaryDataDetails();
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
      
        // addItemOrdercart
        orderDetails.addItemOrdercart = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/AddProductData", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // ordercartItemList
        orderDetails.ordercartItemList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItemList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // removeItemOrdercart
        orderDetails.removeItemOrdercart = function(productDataObj){
            try{
                // check is user logged in or not session
                var paramDataObj = getParamDataToRemoveItemFromOrdercart(productDataObj);
                if(paramDataObj!==false && paramDataObj!==undefined && jQuery.isEmptyObject(paramDataObj)===false){
                
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;
                    
                    // calling OrderCartServices 
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItemList", 'apiFile', 'DELETE', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var isItemRemovedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to remove item from your order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isItemRemovedFromOrdercart = extractDataFromReturnAjaxResponse('DELETE', 'apiFile', 'isItemRemovedFromOrdercart', retResponseJson);
                            }
                            if(isItemRemovedFromOrdercart==='TRUE'){
                                notificationMsgStr = "Item removed from your order cart !";
                                // refresh user order cart dashboard summary data using services
                                orderDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                                // refresh order cart item list using services
                                orderDetails.ordercartItemList('R');
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in removeItemOrdercart ex=>"+ex);
            }
        };
        
        
        
        return orderDetails;
        
    }catch(ex){
        return false;
    }
}); 
