
// OrderCartController
app.controller('UCustomerController', function($scope, $rootScope, $http, UsersServices, WishListServices, OrderCartServices){
    try{
        
        $rootScope.isShowUCustomerAccountOtherSectionList = false;
        
        // checkRequestedSectionAvailableToAccessInUserCAccount
        $rootScope.checkRequestedSectionAvailableToAccessInUserCAccount = function(){
            var isUserLoggedInSession = checkUserLoggedInSession();
            var requestedSectionConfigDataObj =  getStoredRequestedSectionNameToAccessInUserAccount();
            if(isUserLoggedInSession===true && requestedSectionConfigDataObj!==false 
                && requestedSectionConfigDataObj!==undefined 
                && jQuery.isEmptyObject(requestedSectionConfigDataObj)===false){
                var requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
                if(requestedSectionName==='ordercart'){
                    $rootScope.displayOrdercartSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }else if(requestedSectionName==='personalinfo'){
                    $rootScope.displayPersonalInfoSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }else if(requestedSectionName==='changepassword'){
                    $rootScope.displayChangePasswordInfoSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
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
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    
                    $rootScope.userPersonalDetails =  false;

                    // calling UsersServices 
                    UsersServices.getUserPersonalInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
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
                showHideLoaderBox('hide');
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
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = userPersonalInfoParamData;
                    
                    // calling UsersServices 
                    UsersServices.updateUserPersonalInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
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
                showHideLoaderBox('hide');
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
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = userChangedPasswordInfoParamData;
                    
                    // calling UsersServices 
                    UsersServices.updateUserPasswordInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var isUserpasswordInfoUpdated =  false;
                            var notificationMsgStr = 'Your password is not change, please try again !';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isUserpasswordInfoUpdated = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUserpasswordInfoUpdated', retResponseJson);
                            }
                            if(isUserpasswordInfoUpdated==='TRUE'){
                                clearUserpasswordFormFieldInfo();
                                notificationMsgStr = 'Your password changed successfully !';
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
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
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    
                    $rootScope.ordercartRequestedAllItemDetailsArrObj =  false;

                    // calling OrderCartServices 
                    OrderCartServices.ordercartItemList(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var requestedOrdercartAllItemDetailsArrObj =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                requestedOrdercartAllItemDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartAllItemDetails', retResponseJson);
                            }
                            if(requestedOrdercartAllItemDetailsArrObj!==false && requestedOrdercartAllItemDetailsArrObj!==undefined 
                                && jQuery.isEmptyObject(requestedOrdercartAllItemDetailsArrObj)===false){
                                $rootScope.ordercartRequestedAllItemDetailsArrObj =  requestedOrdercartAllItemDetailsArrObj;
                            }else{
                                $rootScope.ordercartRequestedAllItemDetailsArrObj =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in populateOrdercartRequestedItemList ex=>"+ex);
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
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                    
                    $rootScope.ordercartCancelledAllItemDetailsArrObj =  false;
                    
                    // calling OrderCartServices 
                    OrderCartServices.ordercartItemList(fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var ordercartCancelledAllItemDetailsArrObj =  false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                ordercartCancelledAllItemDetailsArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'ordercartAllItemDetails', retResponseJson);
                            }
                            if(ordercartCancelledAllItemDetailsArrObj!==false && ordercartCancelledAllItemDetailsArrObj!==undefined 
                                && jQuery.isEmptyObject(ordercartCancelledAllItemDetailsArrObj)===false){
                                $rootScope.ordercartCancelledAllItemDetailsArrObj =  ordercartCancelledAllItemDetailsArrObj;
                            }else{
                                $rootScope.ordercartCancelledAllItemDetailsArrObj =  false;
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
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
        
        
    }catch(ex){
        console.log("problem in UCustomerController ex=>"+ex);
    }
    
});
