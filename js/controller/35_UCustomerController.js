
angular.module('DKAPP').controller('UCustomerController', UCustomerController);

function UCustomerController($rootScope, UsersServices, OrderCartServices, DiscountCouponServices){
    
    try{
        
        // checkRequestedSectionAvailableToAccessInUserCAccount
        $rootScope.checkRequestedSectionAvailableToAccessInUserCAccount = function(){
            var isUserLoggedInSession = checkUserLoggedInSession();
            var requestedSectionConfigDataObj =  getStoredRequestedSectionNameToAccessInUserAccount();
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
                }else if(requestedSectionName==='shareoffers'){
                    $rootScope.displayShareoffersSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
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
        
        // attachedFieldValidationUserCustomerProfileInfo
        $rootScope.attachedFieldValidationUserProfileInfo = function(){
            attachedFieldValidationUserProfileInfo();
        };
        
        // populateUserPersonalInfo
        $rootScope.populateUserPersonalInfoInUserCAccount = function(){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.userPersonalDetails =  false;
                    // calling UsersServices 
                    UsersServices.getUserPersonalInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var userPersonalDetailsArrObj =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userPersonalDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userPersonalDetails', retResponseJson);
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
            var retValidatedDataStatus = validationUserProfileInfoData();
            if(retValidatedDataStatus===true){
                var userPersonalInfoParamData = getParamDataToUpdateUserpersonalInfo();
                if(userPersonalInfoParamData!==false && userPersonalInfoParamData!==undefined
                    && jQuery.isEmptyObject(userPersonalInfoParamData)===false){
                    $rootScope.updateUserPersonalInfoInUserCAccount(userPersonalInfoParamData);
                }
            }else{
                var notificationMsgStr = "Please enter valid data to update profile info !";
                showNotificationBoxMsg(notificationMsgStr);
            }
        };
        
        // updateUserPersonalInfoInUserCAccount
        $rootScope.updateUserPersonalInfoInUserCAccount = function(userPersonalInfoParamData){
            try{
                if(userPersonalInfoParamData!==false && userPersonalInfoParamData!==undefined
                    && jQuery.isEmptyObject(userPersonalInfoParamData)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = userPersonalInfoParamData;
                    // calling UsersServices 
                    UsersServices.updateUserPersonalInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var isUserprofileInfoUpdated =  false;
                            var notificationMsgStr = 'User profile info not update, please try again !';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isUserprofileInfoUpdated = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUserprofileInfoUpdated', retResponseJson);
                            }
                            if(isUserprofileInfoUpdated==='TRUE'){
                                notificationMsgStr = 'User profile info updated, successfully !';
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
            }else{
                var notificationMsgStr = "Please enter valid password data to change !";
                showNotificationBoxMsg(notificationMsgStr);
            }
        };
        
        
        // updateUserPaswordInfoInUserCAccount
        $rootScope.updateUserPaswordInfoInUserCAccount = function(userChangedPasswordInfoParamData){
            try{
                if(userChangedPasswordInfoParamData!==false && userChangedPasswordInfoParamData!==undefined
                    && jQuery.isEmptyObject(userChangedPasswordInfoParamData)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = userChangedPasswordInfoParamData;
                    // calling UsersServices 
                    UsersServices.updateUserPasswordInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var userpwdChangedStatusDetails =  false;
                            var notificationMsgStr = 'Your password is not change, please try again !';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userpwdChangedStatusDetails = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'userpwdChangedStatusDetails', retResponseJson);
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
                console.log("problem in populateUserPersonalInfo ex=>"+ex);
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
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.ordercartRequestedAllStoreWiseData =  false;
                    // $rootScope.ordercartRequestedSummaryData =  false;
                    // calling OrderCartServices 
                    OrderCartServices.ordercartItemList(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var ordercartRequestedData =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                ordercartRequestedData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartRequestedData', retResponseJson);
                            }
                            if(ordercartRequestedData!==false && ordercartRequestedData!==undefined 
                                && jQuery.isEmptyObject(ordercartRequestedData)===false){
                                $rootScope.ordercartRequestedAllStoreWiseData =  ordercartRequestedData.ordercartAllStoreWiseData;
                                // $rootScope.ordercartRequestedSummaryData =  ordercartRequestedData.ordercartSummaryData;
                            }else{
                                $rootScope.ordercartAllStoreWiseData =  false;
                                // $rootScope.ordercartRequestedSummaryData =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateOrdercartRequestedItemList ex=>"+ex);
            }
        };
        
        // uca_OrdercartRequestedStoreItemsList
        $rootScope.uca_OrdercartRequestedStoreItemsList = function(storeDataObj){
            if(storeDataObj.isShowItemList===true){
                storeDataObj.isShowItemList = false;
            }else{
                storeDataObj.isShowItemList = true;
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
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    $rootScope.ordercartCancelledAllStoreWiseData =  false;
                    // calling OrderCartServices 
                    OrderCartServices.ordercartItemList(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var ordercartCancelledData =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                ordercartCancelledData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartCancelledData', retResponseJson);
                            }
                            if(ordercartCancelledData!==false && ordercartCancelledData!==undefined 
                                && jQuery.isEmptyObject(ordercartCancelledData)===false){
                                $rootScope.ordercartCancelledAllStoreWiseData =  ordercartCancelledData;
                            }else{
                                $rootScope.ordercartCancelledAllStoreWiseData =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in populateOrdercartCancelledItemList ex=>"+ex);
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
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    
                    $rootScope.allOrdercartNoAllItemDetailsArrObj =  false;
                    
                    // calling OrderCartServices 
                    OrderCartServices.ordercartItemList(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var ordercartOrderedAllItemDetailsArrObj =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                ordercartOrderedAllItemDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartAllItemDetails', retResponseJson);
                            }
                            if(ordercartOrderedAllItemDetailsArrObj!==false && ordercartOrderedAllItemDetailsArrObj!==undefined 
                                && jQuery.isEmptyObject(ordercartOrderedAllItemDetailsArrObj)===false){
                                $rootScope.allOrdercartNoAllItemDetailsArrObj =  ordercartOrderedAllItemDetailsArrObj;
                            }else{
                                $rootScope.allOrdercartNoAllItemDetailsArrObj =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in populateOrdercartAllOrderedItemList ex=>"+ex);
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
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling OrderCartServices 
                    OrderCartServices.updateItemOrdercart(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var isItemUpdatedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to update item in order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isItemUpdatedFromOrdercart = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isItemUpdatedFromOrdercart', retResponseJson);
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
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling OrderCartServices 
                    OrderCartServices.removeItemOrdercart(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            var isItemRemovedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to remove item from order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isItemRemovedFromOrdercart = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isItemRemovedFromOrdercart', retResponseJson);
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
        
        
        // displayShareoffersSectionToAccessInUserCAccount
        $rootScope.displayShareoffersSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.isShowSharingOffersOperationDetails = false;
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
            $rootScope.uca_toggleShareoffersSectionList($rootScope.requestedSectionName);
        };
        
        // uca_toggleShareoffersSectionList
        $rootScope.uca_toggleShareoffersSectionList = function(displayShareOffersSectionType, clickedElementId, clickedElementParentClass){
            if(displayShareOffersSectionType==='shareoffers' || displayShareOffersSectionType==='availableshareoffers'){
                $rootScope.displayShareOffersSectionType = 'availableshareoffers';
            }else{
                $rootScope.displayShareOffersSectionType = displayShareOffersSectionType;
            }
            // toggle backgroun class also
            if(clickedElementId!==undefined && clickedElementParentClass!==undefined){
                $('.'+clickedElementParentClass).find('li').removeClass('uca_shareoffersSelectedTabLabelSectionContainerLIClass');
                $('#'+clickedElementId).addClass('uca_shareoffersSelectedTabLabelSectionContainerLIClass');
            }
        };
        
        // populateUserSharingDiscountCouponList
        $rootScope.populateUserSharingDiscountCouponList = function(){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    
                    $rootScope.userSharingAllDiscountCouponDetailsArrObj =  false;

                    // calling DiscountCouponServices 
                    DiscountCouponServices.userSharingDiscountCouponList(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var userSharingAllDiscountCouponDetailsArrObj =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userSharingAllDiscountCouponDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userSharingAllDiscountCouponList', retResponseJson);
                            }
                            if(userSharingAllDiscountCouponDetailsArrObj!==false && userSharingAllDiscountCouponDetailsArrObj!==undefined 
                                && jQuery.isEmptyObject(userSharingAllDiscountCouponDetailsArrObj)===false){
                                $rootScope.userSharingAllDiscountCouponDetailsArrObj =  userSharingAllDiscountCouponDetailsArrObj;
                            }else{
                                $rootScope.userSharingAllDiscountCouponDetailsArrObj =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in populateUserSharingDiscountCouponList ex=>"+ex);
            }
        };
        
        // checkDataToShareOffersToOtherUser
        $rootScope.checkDataToShareOffersToOtherUser = function(sharingOffersDetailsObj, fcontentClass){
            try{
                // validating sharing offers data status
                var validatedDataStatus = validateDataToShareOffers(fcontentClass);
                if(validatedDataStatus===true && 
                    (sharingOffersDetailsObj!==false && sharingOffersDetailsObj!==undefined && jQuery.isEmptyObject(sharingOffersDetailsObj)===false)){
                    $rootScope.addSharingOffersFromOneUserToOtherUsers(sharingOffersDetailsObj, fcontentClass);
                }else{
                    var notifyMsgStr = "Please enter valid 10 digits mobile no.s to share offers !";
                    showNotificationBoxMsg(notifyMsgStr);
                }
            }catch(ex){
                console.log("problem in checkDataToShareOffersToOtherUser=>"+ex);
            }
        };
        
        // addSharingOffersFromOneUserToOtherUsers
        $rootScope.addSharingOffersFromOneUserToOtherUsers = function(sharingOffersDetailsObj, fcontentClass){
            try{
                
                var paramDataObj = getParamDataToSharingOffersFromOneUserToOtherUsers(sharingOffersDetailsObj, fcontentClass);
                if(paramDataObj!==false && paramDataObj!==undefined
                    && jQuery.isEmptyObject(paramDataObj)===false){
                
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    // calling DiscountCouponServices 
                    DiscountCouponServices.addSharingOffersFrmOneUserToOtherUsers(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var isOffersShared =  'FALSE';
                            var notifyMsgStr = "Please try again to share offers !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isOffersShared = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'isOffersShared', retResponseJson);
                            }
                            alert(isOffersShared);
                            if(isOffersShared==='TRUE'){
                                notifyMsgStr = "offers has been shared to your friends/colleagues on given mobile no.s !";
                                $rootScope.populateUserSharingDiscountCouponList();
                            }
                            showNotificationBoxMsg(notifyMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in addSharingOffersFromOneUserToOtherUsers ex=>"+ex);
            }
        };
        
        
        // populateUserSharedDiscountCouponList
        $rootScope.populateUserSharedDiscountCouponList = function(){
            try{
                // check is user logged in or not session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && authenticatedUserParamDataObj!==undefined
                    && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    
                    $rootScope.userSharedAllDiscountCouponDetailsArrObj =  false;
                    $rootScope.totalCountUserSharedAllDiscountCoupon =  0;

                    // calling DiscountCouponServices 
                    DiscountCouponServices.userSharedDiscountCouponList(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var userSharedAllDiscountCouponDetailsArrObj =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userSharedAllDiscountCouponDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userSharedAllDiscountCouponList', retResponseJson);
                            }
                            if(userSharedAllDiscountCouponDetailsArrObj!==false && userSharedAllDiscountCouponDetailsArrObj!==undefined 
                                && jQuery.isEmptyObject(userSharedAllDiscountCouponDetailsArrObj)===false){
                                $rootScope.totalCountUserSharingAllDiscountCoupon =  userSharedAllDiscountCouponDetailsArrObj.length;
                                $rootScope.userSharedAllDiscountCouponDetailsArrObj =  userSharedAllDiscountCouponDetailsArrObj;
                            }else{
                                $rootScope.totalCountUserSharedAllDiscountCoupon =  0;
                                $rootScope.userSharedAllDiscountCouponDetailsArrObj =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in populateUserSharedDiscountCouponList ex=>"+ex);
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
