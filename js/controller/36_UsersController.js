
angular.module('DKAPP').controller('UsersController', UsersController);

function UsersController($scope, $rootScope, $http, UsersServices){
    try{
        
        // redirectToMyAccount
        $rootScope.redirectToAccountSignUpSignIn = function(fromPageLoad){
            storePageDetailsUserAccessedFrom(fromPageLoad);
            // fetch param data from session
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===false){
                window.location.href = globalBaseSitePath+"account-signup-signin.php";
            }    
        };
        
        // isEnableAccountSignUpSignIn
        $rootScope.isEnableAccountSignUpSignIn = function(){
            var fromPageLoad = getPageDetailsUserAccessedFrom();
            if(fromPageLoad!=='' && fromPageLoad!==false){
                var userLoggedInSessionStatus = checkUserLoggedInSession();
                if(userLoggedInSessionStatus===true){
                    window.location.href = globalBaseSitePath;
                }else if(userLoggedInSessionStatus===false){
                    $rootScope.resetVariableAccountSignUpSignIn('signin');
                } 
            }
        };
        
        // resetVariableAccountSignUpSignIn
        $rootScope.resetVariableAccountSignUpSignIn = function(purposeType){
            if(purposeType==='signin'){
                $rootScope.isUserLoggedInSession = false;
                attachedFieldValidationUserSignInFormContent();
            }
        };
        
        // collectDataUserSignInAuthentication
        $rootScope.collectDataUserSignInAuthentication = function(){
            // validate form content data for user signIn related wish list
            var retValidateDataStatus = validateDataUserSignInAuthentication();
            if(retValidateDataStatus===true){
                // get param obj for signIn purpose
                var preparedParamJsonObj = getParamDataForUserSignInAuthentication();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    $rootScope.checkUserSignInAuthentication(preparedParamJsonObj);
                }
            }
        };
        
        // checkUserSignInAuthentication
        $rootScope.checkUserSignInAuthentication = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    // calling UsersServices 
                    UsersServices.checkUserAuthentication(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var authenticatedUserDetailsObj = false;
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                authenticatedUserDetailsObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userDetails', retResponseJson);
                            }
                            if(authenticatedUserDetailsObj!=='' && authenticatedUserDetailsObj!==false 
                                && authenticatedUserDetailsObj!==undefined){
                                if(authenticatedUserDetailsObj['isUserAccountActive']==='N'){
                                    $rootScope.isShowUserSignInFormContentErrorMsg = true;
                                    $rootScope.userSignInFormContentErrorMsgStr = authenticatedUserDetailsObj['msgStr'];
                                    notificationMsgStr = authenticatedUserDetailsObj['msgStr'];
                                }else{
                                    storeAuthenticatedUserDetailsInSession(authenticatedUserDetailsObj);
                                    $rootScope.redirectToUserAccessedLastPageFrom();
                                }
                            }else{
                                notificationMsgStr = 'Please enter valid details to sign-in with desserts khazana account !';
                                $rootScope.isShowUserSignInFormContentErrorMsg = true;
                                $rootScope.userSignInFormContentErrorMsgStr = notificationMsgStr;
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
            }
        };
        
        // redirectToUserAccessedLastPageFrom
        $rootScope.redirectToUserAccessedLastPageFrom = function(){
            var lastPageAccessedByUser = getPageDetailsUserAccessedFrom();
            if(lastPageAccessedByUser==='home'){
                window.location.href = globalBaseSitePath;
            }else if(lastPageAccessedByUser==='wishlist'){
                window.location.href = globalBaseSitePath+"wishlist.php";
            }else if(lastPageAccessedByUser==='viewproduct'){
                window.location.href = globalBaseSitePath+"product.php";
            }else if(lastPageAccessedByUser==='allproducts'){
                window.location.href = globalBaseSitePath+"allproducts.php";
            }else if(lastPageAccessedByUser==='viewstoreproduct'){
                window.location.href = globalBaseSitePath+"viewstoreproduct.php";
            }else if(lastPageAccessedByUser==='partyorder'){
                $rootScope.storeRequestedSectionNameToAccessInUserAccount('partyorder');
            }else if(lastPageAccessedByUser==='customizeorder'){
                $rootScope.storeRequestedSectionNameToAccessInUserAccount('customizeorder');
            }
        };
        
        // signOutUser
        $rootScope.signOutUser = function(){
            resetDKSessionData();
            window.location.href = globalBaseSitePath;
        };
        
        // checkUserCAccountIsActiveInSession
        $rootScope.checkUserCAccountIsActiveInSession = function(){
            var isUserLoggedInSession = checkUserLoggedInSession();
            if(isUserLoggedInSession===true){
                UsersServices.refreshUserDashboardSummaryDataDetails();
            }
        };
        
        // storeRequestedSectionNameToAccessInUserAccount
        $rootScope.storeRequestedSectionNameToAccessInUserAccount = function(requestedSectionName){
            var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(requestedSectionName!=='' && requestedSectionName!==false 
                && requestedSectionName!==undefined && authenticatedUserParamDataObj!==false
                && authenticatedUserParamDataObj!==undefined && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                storeRequestedSectionNameToAccessInUserAccount(requestedSectionName);
                if(authenticatedUserParamDataObj.hasOwnProperty('userProfileTypeId')===true){
                    // detected user account as customer profile
                    if(authenticatedUserParamDataObj['userProfileTypeId']==='2'){
                        window.location.href = globalBaseSitePath+"usercaccount.php";
                    }
                }
            }
        };
        
        // toggleUserAccountSectionDropdown
        $rootScope.toggleUserAccountSectionDropdown = function(){
            if($('.userAccountAllSectionListDropdownDivClass').is(":hidden")===true){
                $('.userAccountAllSectionListDropdownDivClass').css({"display":"block"});
            }else if($('.userAccountAllSectionListDropdownDivClass').is(":hidden")===false){
                $('.userAccountAllSectionListDropdownDivClass').css({"display":"none"});
            }
        };
       
        
    }catch(ex){
        console.log("problem in users controller ex=>"+ex);
    }
}
