
angular.module('DKAPP').controller('UCustomerController', UCustomerController);

function UCustomerController($rootScope, UsersServices, OrderCartServices){
    
    try{
        
        // checkRequestedSectionAvailableToAccessInUserCAccount
        $rootScope.checkRequestedSectionAvailableToAccessInUserCAccount = function(){
            var isUserLoggedInSession = checkUserLoggedInSession();
            var requestedSectionConfigDataObj = getStoredRequestedSectionNameToAccessInUserAccount();
            if(isUserLoggedInSession===true && requestedSectionConfigDataObj!==false 
                && requestedSectionConfigDataObj!==undefined 
                && jQuery.isEmptyObject(requestedSectionConfigDataObj)===false){
                var requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
                if(requestedSectionName==='personalinfo'){
                    $rootScope.displayPersonalInfoSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }else if(requestedSectionName==='changepassword'){
                    $rootScope.displayChangePasswordInfoSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }else if(requestedSectionName==='ordercart'){
                    $rootScope.displayOrdercartSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }else if(requestedSectionName==='partyorder'){
                    $rootScope.displayPartyOrderInfoSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }else if(requestedSectionName==='customizeorder'){
                    $rootScope.displayCustomizeOrderInfoSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }
            }
        };
        
        // displayPersonalInfoSectionToAccessInUserCAccount
        $rootScope.displayPersonalInfoSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
            $rootScope.displayPersonalInfoSectionType = "text_personalinfo";
        };
        
        // showEditableUserCustomerProfileInfo
        $rootScope.showEditableUserCustomerProfileInfo = function(displayPersonalInfoSectionType){
            $rootScope.displayPersonalInfoSectionType = displayPersonalInfoSectionType;
        };
        
        // closeEditableUserCustomerProfileInfo
        $rootScope.closeEditableUserCustomerProfileInfo = function(displayPersonalInfoSectionType){
            $rootScope.displayPersonalInfoSectionType = displayPersonalInfoSectionType;
        };
        
        // populateUserPersonalInfo
        $rootScope.populateUserPersonalInfoInUserCAccount = function(){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.userPersonalDetails =  false;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageUserPersonalInfoData", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var userPersonalDetailsArrObj =  false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                userPersonalDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userPersonalDetails', rtRspJson);
                            }
                            if(userPersonalDetailsArrObj!==false && userPersonalDetailsArrObj!==undefined 
                                && jQuery.isEmptyObject(userPersonalDetailsArrObj)===false){
                                $rootScope.userPersonalDetails =  userPersonalDetailsArrObj;
                            }else{
                                $rootScope.userPersonalDetails =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateUserPersonalInfo ex=>"+ex);
            }
        };
        
        // checkDataToUpdateUserpersonalnfo
        $rootScope.checkDataToUpdateUserpersonalnfo = function(){
            var retValidatedDataStatus = validateUserProfileInfoData();
            if(retValidatedDataStatus===true){
                var userPersonalInfoParamData = getParamDataToUpdateUserpersonalInfo();
                if(userPersonalInfoParamData!==false && userPersonalInfoParamData!==undefined
                    && jQuery.isEmptyObject(userPersonalInfoParamData)===false){
                    $rootScope.updateUserPersonalInfoInUserCAccount(userPersonalInfoParamData);
                }
            }
        };
        
        // updateUserPersonalInfoInUserCAccount
        $rootScope.updateUserPersonalInfoInUserCAccount = function(userPersonalInfoParamData){
            try{
                if(userPersonalInfoParamData!==false && userPersonalInfoParamData!==undefined
                    && jQuery.isEmptyObject(userPersonalInfoParamData)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = userPersonalInfoParamData;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageUserPersonalInfoData", 'apiFile', 'PUT', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var isUserprofileInfoUpdated =  false;
                            var notificationMsgStr = 'User profile info not update, please try again !!!';
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                isUserprofileInfoUpdated = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUserprofileInfoUpdated', rtRspJson);
                            }
                            if(isUserprofileInfoUpdated==='TRUE'){
                                notificationMsgStr = 'User profile info updated, successfully !!!';
                                $rootScope.showEditableUserCustomerProfileInfo('text_personalinfo');
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateUserPersonalInfo ex=>"+ex);
            }
        };
        
        // displayChangePasswordInfoSectionToAccessInUserCAccount
        $rootScope.displayChangePasswordInfoSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
        };
        
        // checkDataToUpdateUserpasswordInfo
        $rootScope.checkDataToUpdateUserpasswordInfo = function(){
            var retValidatedDataStatus = validationUserChangePasswordInfoData();
            if(retValidatedDataStatus===true){
                var userChangePasswordInfoParamData = getParamDataToUpdateUserpasswordInfo();
                if(userChangePasswordInfoParamData!==false && userChangePasswordInfoParamData!==undefined
                    && jQuery.isEmptyObject(userChangePasswordInfoParamData)===false){
                    $rootScope.updateUserPaswordInfoInUserCAccount(userChangePasswordInfoParamData);
                }
            }
        };
        
        // updateUserPaswordInfoInUserCAccount
        $rootScope.updateUserPaswordInfoInUserCAccount = function(userChangedPasswordInfoParamData){
            try{
                if(userChangedPasswordInfoParamData!==false && userChangedPasswordInfoParamData!==undefined
                    && jQuery.isEmptyObject(userChangedPasswordInfoParamData)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = userChangedPasswordInfoParamData;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UpdateUserPasswordInfoData", 'apiFile', 'PUT', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var userpwdChangedStatusDetails =  false;
                            var notificationMsgStr = 'Your password is not change, please try again !!!';
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                userpwdChangedStatusDetails = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'userpwdChangedStatusDetails', rtRspJson);
                            }
                            if(userpwdChangedStatusDetails['ispwdChanged']==='TRUE'){
                                clearUserpasswordFormFieldInfo();
                                notificationMsgStr = userpwdChangedStatusDetails['statusMsg'];
                            }else if(userpwdChangedStatusDetails['ispwdChanged']==='FALSE'){
                                notificationMsgStr = userpwdChangedStatusDetails['statusMsg'];
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in updateUserPaswordInfoInUserCAccount ex=>"+ex);
            }
        };
        
        
        // displayOrdercartSectionToAccessInUserCAccount
        $rootScope.displayOrdercartSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
            OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            $rootScope.uca_toggleOrdercartSectionList($rootScope.requestedSectionName);
        };
        
        // uca_toggleOrdercartSectionList
        $rootScope.uca_toggleOrdercartSectionList = function(displayOrdercartSectionType, clickedElementId, clickedElementParentClass){
            if(displayOrdercartSectionType==='ordercart' || displayOrdercartSectionType==='requestitem'){
                $rootScope.displayOrdercartSectionType = 'requestitem';
            }else{
                $rootScope.displayOrdercartSectionType = displayOrdercartSectionType;
            }
            // toggle backgroun class also
            if(clickedElementId!==undefined && clickedElementParentClass!==undefined){
                $('.'+clickedElementParentClass).find('li').removeClass('uca_ordercartSelectedTabLabelSectionContainerLIClass');
                $('#'+clickedElementId).addClass('uca_ordercartSelectedTabLabelSectionContainerLIClass');
            }
        };
        
        // populateOrdercartRequestedItemList
        $rootScope.populateOrdercartRequestedItemList = function(ordercartItemListByStatusType){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    authenticatedUserParamDataObj['ordercartItemListByStatusType'] = ordercartItemListByStatusType;
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.ordercartRequestedAllStoreWiseData =  false;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var ordercartRequestedData =  false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                ordercartRequestedData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartRequestedData', rtRspJson);
                            }
                            if(ordercartRequestedData!==false && ordercartRequestedData!==undefined 
                                && jQuery.isEmptyObject(ordercartRequestedData)===false){
                                $rootScope.ordercartRequestedAllStoreWiseData =  ordercartRequestedData.ordercartAllStoreWiseData;
                            }else{
                                $rootScope.ordercartAllStoreWiseData =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateOrdercartRequestedItemList ex=>"+ex);
            }
        };
        
        // uca_toggleOrdercartRequestedStoreItemsList
        $rootScope.uca_toggleOrdercartRequestedStoreItemsList = function(ordercartStoreDataObj){
            if(ordercartStoreDataObj.isShowItemList===true){
                ordercartStoreDataObj.isShowItemList = false;
            }else{
                ordercartStoreDataObj.isShowItemList = true;
            }
        };
        
        // populateOrdercartCancelledItemList
        $rootScope.populateOrdercartCancelledItemList = function(ordercartItemListByStatusType){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    authenticatedUserParamDataObj['ordercartItemListByStatusType'] = ordercartItemListByStatusType;
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.allOrdercartWiseCancelledData =  false;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var ordercartCancelledData =  false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                ordercartCancelledData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartCancelledData', rtRspJson);
                            }
                            if(ordercartCancelledData!==false && ordercartCancelledData!==undefined 
                                && jQuery.isEmptyObject(ordercartCancelledData)===false){
                                $rootScope.allOrdercartWiseCancelledData =  ordercartCancelledData;
                            }else{
                                $rootScope.allOrdercartWiseCancelledData =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateOrdercartCancelledItemList ex=>"+ex);
            }
        };
        
        // uca_toggleOrdercartCancelledItemsList
        $rootScope.uca_toggleOrdercartCancelledItemsList = function(ordercartDataObj){
            if(ordercartDataObj.isShowItemList===true){
                ordercartDataObj.isShowItemList = false;
            }else{
                ordercartDataObj.isShowItemList = true;
            }
        };
        
        // populateOrdercartAllOrderedItemList
        $rootScope.populateOrdercartAllOrderedItemList = function(ordercartItemListByStatusType){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    authenticatedUserParamDataObj['ordercartItemListByStatusType'] = ordercartItemListByStatusType;
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.allOrdercartWiseOrderedData =  false;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var allOrdercartWiseOrderedData =  false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                allOrdercartWiseOrderedData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartOrderedData', rtRspJson);
                            }
                            if(allOrdercartWiseOrderedData!==false && allOrdercartWiseOrderedData!==undefined 
                                && jQuery.isEmptyObject(allOrdercartWiseOrderedData)===false){
                                $rootScope.allOrdercartWiseOrderedData =  allOrdercartWiseOrderedData;
                            }else{
                                $rootScope.allOrdercartWiseOrderedData =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateOrdercartAllOrderedItemList ex=>"+ex);
            }
        };
        
        // uca_toggleOrdercartOrderedItemsList
        $rootScope.uca_toggleOrdercartOrderedItemsList = function(ordercartStoreDataObj){
            if(ordercartStoreDataObj.isShowItemList===true){
                ordercartStoreDataObj.isShowItemList = false;
            }else{
                ordercartStoreDataObj.isShowItemList = true;
            }
        };
        
        // checkProductDataToUdateInOrdercart 
        $rootScope.checkProductDataToUdateInOrdercart = function(productDetailsObj, fcontentClass){
            try{
                // validating product data status
                var validatedDataStatus = validateProductDataToUpdateInOrdercart(fcontentClass);
                if(validatedDataStatus===true && 
                    (productDetailsObj!==false && productDetailsObj!==undefined && jQuery.isEmptyObject(productDetailsObj)===false)){
                    $rootScope.updateItemOrdercart(productDetailsObj, fcontentClass);
                }else{
                    var notifyMsgStr = "Please enter product qty / message to update item in order cart !";
                    showNotificationBoxMsg(notifyMsgStr);
                }
            }catch(ex){
                console.log("problem in checkProductDataToUdateInOrdercart=>"+ex);
            }
        };
        
        // updateItemOrdercart
        $rootScope.updateItemOrdercart = function(productDetailsObj, fcontentClass){
            try{
                // check is user logged in or not session
                var paramDataObj = getParamDataToUpdateItemInOrdercart(productDetailsObj, fcontentClass);
                if(paramDataObj!==false && paramDataObj!==undefined && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'PUT', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var isItemUpdatedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to update item in order cart !";
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                isItemUpdatedFromOrdercart = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isItemUpdatedFromOrdercart', rtRspJson);
                            }
                            if(isItemUpdatedFromOrdercart==='TRUE'){
                                notificationMsgStr = "Item updated in order cart successfully !";
                                // refresh list
                                $rootScope.populateOrdercartRequestedItemList('R');
                                OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in updateItemOrdercart ex=>"+ex);
            }
        };
        
        // removeItemOrdercart
        $rootScope.removeItemOrdercart = function(productDetailsObj){
            try{
                var paramDataObj = getParamDataToRemoveItemFromOrdercart(productDetailsObj);
                if(paramDataObj!==false && paramDataObj!==undefined && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services 
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItem", 'apiFile', 'DELETE', '', apiParamJsonObj).done(function(rtRspJson){
                        $rootScope.$apply(function(){
                            var isItemRemovedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to remove item from order cart !";
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                isItemRemovedFromOrdercart = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isItemRemovedFromOrdercart', rtRspJson);
                            }
                            if(isItemRemovedFromOrdercart==='TRUE'){
                                notificationMsgStr = "Item remove from order cart successfully !";
                                // refresh list
                                $rootScope.populateOrdercartRequestedItemList('R');
                                OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in removeItemOrdercart ex=>"+ex);
            }
        };
        
        // displayPartyOrderInfoSectionToAccessInUserCAccount
        $rootScope.displayPartyOrderInfoSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
            $rootScope.displayPartyOrderInfoSectionType = "createpartyorder";
            $rootScope.uca_togglePartyOrderSectionList($rootScope.displayPartyOrderInfoSectionType);
        };
        
        // uca_togglePartyOrderSectionList
        $rootScope.uca_togglePartyOrderSectionList = function(displayPartyOrderInfoSectionType, clickedElementId, clickedElementParentClass){
            if(displayPartyOrderInfoSectionType==='createpartyorder' || displayPartyOrderInfoSectionType==='partyorder'){
                $rootScope.displayPartyOrderInfoSectionType = 'createpartyorder';
            }else{
                $rootScope.displayPartyOrderInfoSectionType = displayPartyOrderInfoSectionType;
            }
            // toggle background color class also
            if(clickedElementId!==undefined && clickedElementParentClass!==undefined){
                $('.'+clickedElementParentClass).find('li').removeClass('po_SelectedTabLabelSectionContainerLIClass');
                $('#'+clickedElementId).addClass('po_SelectedTabLabelSectionContainerLIClass');
            }
        };
        
        // displayCustomizeOrderInfoSectionToAccessInUserCAccount
        $rootScope.displayCustomizeOrderInfoSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
            $rootScope.displayCustomizeOrderInfoSectionType = "createcustomizeorder";
            $rootScope.uca_togglePartyOrderSectionList($rootScope.displayCustomizeOrderInfoSectionType);
        };
        
        // uca_toggleCustomizeOrderSectionList
        $rootScope.uca_toggleCustomizeOrderSectionList = function(displayCustomizeOrderInfoSectionType, clickedElementId, clickedElementParentClass){
            if(displayCustomizeOrderInfoSectionType==='createpartyorder' || displayCustomizeOrderInfoSectionType==='customizeorder'){
                $rootScope.displayCustomizeOrderInfoSectionType = 'createcustomizeorder';
            }else{
                $rootScope.displayCustomizeOrderInfoSectionType = displayCustomizeOrderInfoSectionType;
            }
            // toggle background color class also
            if(clickedElementId!==undefined && clickedElementParentClass!==undefined){
                $('.'+clickedElementParentClass).find('li').removeClass('co_SelectedTabLabelSectionContainerLIClass');
                $('#'+clickedElementId).addClass('co_SelectedTabLabelSectionContainerLIClass');
            }
        };
        
    }catch(ex){
        console.log("problem in UCustomerController ex=>"+ex);
    }
    
}
