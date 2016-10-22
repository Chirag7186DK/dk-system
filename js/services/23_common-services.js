
(function(){
    
    angular.module('DKAPP').factory('CommonServices', CommonServices);

    function CommonServices($rootScope){
        try{

            var commonDetails = {};
            
            commonDetails.showSelectedDeliveryAreaTextHeader = function(){
                $rootScope.selectedDeliveryAreaTextHeader = '';
                $rootScope.isShowSelectedDeliveryAreaTextHeader = false;
                var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
                if(infoObj!=='' && infoObj!==undefined 
                    && infoObj!==false && jQuery.isEmptyObject(infoObj)===false){
                    $rootScope.isShowSelectedDeliveryAreaTextHeader = true;
                    $rootScope.selectedDeliveryAreaTextHeader = infoObj['userSelectedArea'];
                }  
            };

            commonDetails.resetSelectedDeliveryAreaTextHeader = function(){
                $rootScope.selectedDeliveryAreaTextHeader = '';
                $rootScope.isShowSelectedDeliveryAreaTextHeader = false;
            };

            commonDetails.notifyToUserForSelectedDeliveryarea = function(){
                $rootScope.selectedDeliveryAreaTextHeader = '';
                var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
                if(infoObj!=='' && infoObj!==undefined 
                    && infoObj!==false && jQuery.isEmptyObject(infoObj)===false){
                    $rootScope.selectedDeliveryAreaTextHeader = infoObj['userSelectedArea'];
                    var msgStr = "You selected delivery location is : "+infoObj['userSelectedArea']+" - "+infoObj['userSelectedAreaPincode'];
                    var notifyInfoConfigObj = {
                        icon:false,
                        title:false,
                        sound:false, 
                        size:'normal', 
                        msg:"<p style='text-align:center;'>"+msgStr+"</p>",
                        delay:700,
                        position:"top left" ,
                        showClass:"zoomIn notifyToUserOnlyForSelectedDeliveryArea"
                    }; 
                    showNotificationBoxMsg('', notifyInfoConfigObj);
                }  
            };
            
            // resetStoreDeliveryFeeApplicableMsgOnDeliveryArea
            commonDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(storeDeliveryFeeApplicableMsg){
                $rootScope.storeDeliveryFeeApplicableMsg = storeDeliveryFeeApplicableMsg;
            };

            // getStoreDeliveryFeeApplicableMsgOnDeliveryArea
            commonDetails.getStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(){
                // fetch param data from session
                var paramDataObj = getParamObjStoreDeliveryFeeApplicableMsgOnDeliveryArea();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Store/StoreDeliveryFeeApplicableDeliveryArea", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var storeDeliveryFeeApplicableMsg = '';
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                storeDeliveryFeeApplicableMsg = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'applicableStoreDeliveryFeeMsg', rtRspJson);
                            }
                            commonDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea(storeDeliveryFeeApplicableMsg);
                        });
                    });
                }else{
                    commonDetails.resetStoreDeliveryFeeApplicableMsgOnDeliveryArea('');
                }
            };
            
            // resetUserOrdercartDashboardVariableData
            commonDetails.resetUserOrdercartDashboardVariableData = function(userOrdercartDashboardDataObj){
                if(userOrdercartDashboardDataObj!=='' && userOrdercartDashboardDataObj!==false 
                    && userOrdercartDashboardDataObj!==undefined){
                    $rootScope.ordercartCount = userOrdercartDashboardDataObj['ordercartCount'];
                    $rootScope.totalStores = userOrdercartDashboardDataObj['totalStores'];
                    $rootScope.ordercartItemRequestedCount = userOrdercartDashboardDataObj['ordercartItemRequestedCount'];
                    $rootScope.subtotalOrderAmt = userOrdercartDashboardDataObj['subtotalOrderAmt'];
                    $rootScope.totalDeliveryFee = userOrdercartDashboardDataObj['totalDeliveryFee'];
                    $rootScope.totalOrderAmt = userOrdercartDashboardDataObj['totalOrderAmt'];
                }else{
                    $rootScope.ordercartCount = 0;
                    $rootScope.totalStores = 0;
                    $rootScope.ordercartItemRequestedCount = 0;
                    $rootScope.subtotalOrderAmt = 0;
                    $rootScope.totalDeliveryFee = 0;
                    $rootScope.totalOrderAmt = 0;
                }
            };

            // refreshUserOrdercartDashboardSummaryDataDetails
            commonDetails.refreshUserOrdercartDashboardSummaryDataDetails = function(){
                try{
                    // fetch param data from session
                    var paramDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                        var apiParamJsonObj = {};
                        apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                        communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/UserOrdercartDashboardSummaryData", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                            $rootScope.$apply(function(){
                                var userOrdercartDashboardDataObj = false;
                                if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                    userOrdercartDashboardDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'orderCartDashboardSummary', rtRspJson);
                                }
                                if(userOrdercartDashboardDataObj!=='' && userOrdercartDashboardDataObj!==false 
                                    && userOrdercartDashboardDataObj!==undefined){
                                    commonDetails.resetUserOrdercartDashboardVariableData(userOrdercartDashboardDataObj);
                                }else{
                                    commonDetails.resetUserOrdercartDashboardVariableData(false);
                                }
                            });
                        });
                    }else{
                        commonDetails.resetUserOrdercartDashboardVariableData(false);
                    }
                }catch(ex){
                    console.log("Problem in refreshUserOrdercartDashboardSummaryDataDetails=>"+ex);
                }
            };

            // addProductDataInOrdercartFromSession & item directly added in DB
            commonDetails.addProductDataInOrdercartFromSession = function(fcontentClass, productDataFromSession){
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
                                    commonDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            });
                        });
                    }
                }catch(ex){
                    console.log("problem in addProductDataInOrdercart ex=>"+ex);
                }
            };
            
            // sendOtpcode
            commonDetails.sendOtpcode = function(paramDataObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/SendOtpCodeUserAccount", 'apiFile', 'POST', '', paramDataObj).done(function(rtRspJson){});
                return promiseObject;
            };

            // signOutUser
            commonDetails.signOutUser = function(){
                try{
                    // fetch param data from session
                    var paramDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                        var apiParamJsonObj = {};
                        apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                        var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserLogout", 'apiFile', 'PUT', '', apiParamJsonObj).done(function(rtRspJson){});
                        return promiseObject;
                    }
                }catch(ex){
                    console.log("Problem in signOutUser=>"+ex);
                }
            };

            // resetUserDashboardVariableData
            commonDetails.resetUserDashboardVariableData = function(userDashboardDataObj){
                if(userDashboardDataObj!=='' && userDashboardDataObj!==false && userDashboardDataObj!==undefined){
                    $rootScope.loggedUserName = userDashboardDataObj['loggedUserName'];
                    $rootScope.userSinceFrom = userDashboardDataObj['userSinceFrom'];
                    $rootScope.isEnableRatingReviewSubmitButton = true;
                    $rootScope.userInfoAllSectionListArrObj = userDashboardDataObj['userInfoAllSectionListArr'];
                    if(userDashboardDataObj['isUserLoggedInSession']==='Y'){
                        $rootScope.isUserLoggedInSession = true;
                    }else{
                        $rootScope.isUserLoggedInSession = false;
                    }
                }else{
                    $rootScope.loggedUserName = '';
                    $rootScope.userSinceFrom = '';
                    $rootScope.isEnableRatingReviewSubmitButton = false;
                    $rootScope.isUserLoggedInSession = false;
                    $rootScope.userInfoAllSectionListArrObj = false;
                }
            };

            // refreshUserDashboardSummaryDataDetails
            commonDetails.refreshUserDashboardSummaryDataDetails = function(){
                try{
                    // fetch param data from session
                    var paramDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                        var apiParamJsonObj = {};
                        apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                        // calling UsersServices 
                        communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserDashboardSummaryData", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                            $rootScope.$apply(function(){
                                var userDashboardDataObj = false;
                                if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                    userDashboardDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userDetails', rtRspJson);
                                }
                                if(userDashboardDataObj!=='' && userDashboardDataObj!==false && userDashboardDataObj!==undefined){
                                    commonDetails.resetUserDashboardVariableData(userDashboardDataObj);
                                }else{
                                    commonDetails.resetUserDashboardVariableData(false);
                                }
                            });
                        });
                    }else{
                        commonDetails.resetUserDashboardVariableData(false);
                    }
                }catch(ex){
                    console.log("Problem in refreshUserDashboardSummaryDataDetails=>"+ex);
                }
            };
            
            // refreshWebAppData
            commonDetails.refreshWebAppData = function(){
                commonDetails.showSelectedDeliveryAreaTextHeader();
                commonDetails.notifyToUserForSelectedDeliveryarea();
                commonDetails.refreshUserDashboardSummaryDataDetails();
                commonDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                commonDetails.addProductDataInOrdercartFromSession(false, 'session');
            };
            
            // refreshWebAppVariableData
            commonDetails.refreshWebAppVariableData = function(){
                commonDetails.resetUserDashboardVariableData(false);
                commonDetails.resetUserOrdercartDashboardVariableData(false);
            };
            
            return commonDetails;

        }catch(ex){
            console.log("problem in CommonServices ex=>"+ex);
            return false;
        }
    }
    
})();
