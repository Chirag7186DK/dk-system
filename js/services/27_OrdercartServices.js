
angular.module('DKAPP').factory('OrderCartServices', OrderCartServices);

// CJ defined this function 2016-06-16
function OrderCartServices($http, $q, $rootScope){
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
        orderDetails.addProductDataInOrdercartFromSession = function(fcontentClass, productDataFromSession){
            try{
                // collect product data
                var preparedProductParamDataObj = getParamDataToAddProductInOrdercart(fcontentClass, productDataFromSession);
                if(preparedProductParamDataObj!==false && jQuery.isEmptyObject(preparedProductParamDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedProductParamDataObj;

                    // calling OrderCartServices 
                    orderDetails.addItemOrdercart(fetchedParamJsonObj).done(function(retResponseJson){
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
        
        // ordercartItemList
        orderDetails.ordercartItemList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
      
        // addItemOrdercart
        orderDetails.addItemOrdercart = function(preparedParamJsonObj){
            var jsonParamBlockUIObject = {};
            jsonParamBlockUIObject['css'] = {"padding":10};
            jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
            showHideLoaderBox('show', jsonParamBlockUIObject);
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                showHideLoaderBox('hide');
            });
            return promiseObject;
        };
        
        // updateItemOrdercart
        orderDetails.updateItemOrdercart = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'PUT', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // removeItemOrdercart
        orderDetails.removeItemOrdercart = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'DELETE', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // resetAllItemOrdercart
        orderDetails.resetAllItemOrdercart = function(){
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

                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ResetAllItemOrdercart", 'apiFile', 'DELETE', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        // orderDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("Problem in refreshUserOrdercartDashboardSummaryDataDetails=>"+ex);
            }
        };
        
        return orderDetails;
        
    }catch(ex){
        return false;
    }
} 
