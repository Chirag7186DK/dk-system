
angular.module('DKAPP').controller('UsersController', UsersController);

function UsersController($scope, $rootScope, UsersServices){
    try{
        
        // goToSignUpSignInAccountSection
        $rootScope.goToSignUpSignInAccountSection = function(fromPageLoad){
            storePageDetailsUserAccessedFrom(fromPageLoad);
            // fetch param data from session
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===false){
                window.location.href = globalBaseSitePath+"account-signup-signin.php";
            }    
        };
        
        // isUserAlreadySignedInAccountSection
        $rootScope.isUserAlreadySignedInAccountSection = function(){
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===true){
                window.location.href = globalBaseSitePath;
            }else if(userLoggedInSessionStatus===false){
                $rootScope.toggleAccountFormSectionName('signInSection');
            } 
        };
        
        // toggleAccountFormSectionName
        $rootScope.toggleAccountFormSectionName = function(sectionName){
            removeTemporaryUserSignUpDataFromSesion();
            removeTemporaryUserSignedInDataFromSesion();
            $rootScope.showAccountFormSectionName = sectionName;
        };
        
        // collectDataUserSignInAuthentication
        $rootScope.collectDataUserSignInAuthentication = function(fromSection){
            var rtValidatedDataStatus = validateDataUserSignInAuthentication(fromSection);
            if(rtValidatedDataStatus===true){
                var preparedParamJsonObj = getParamDataForUserSignInAuthentication(fromSection);
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    $rootScope.userSignInAuthentication(preparedParamJsonObj);
                }
            }
        };
        
        // userSignInAuthentication
        $rootScope.userSignInAuthentication = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling UsersServices 
                    UsersServices.userSignInAuthentication(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            var userDataObj = false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userDetails', retResponseJson);
                            }
                            if(userDataObj!=='' && userDataObj!==false && userDataObj!==undefined){
                                if(userDataObj['isUserAccountActive']==='N'
                                    && userDataObj['isOtpCodeSent']==='N' && userDataObj['isOtpCodeValidated']==='N'){
                                    $rootScope.showAccountFormSectionName = 'signInSection';
                                    $rootScope.isShowUserSignInNoticeMsg = 'TRUE';
                                    $rootScope.userSignInNoticeMsgStr = userDataObj['msgStr'];
                                }else if(userDataObj['isUserAccountActive']==='Y'
                                    && (userDataObj['isOtpCodeSent']==='Y' || userDataObj['isOtpCodeSent']==='N') 
                                    && userDataObj['isOtpCodeValidated']==='N'){
                                    storeAuthenticatedUserDetailsInSession(userDataObj);
                                    $rootScope.showAccountFormSectionName = 'signInOtpSection';
                                    $rootScope.isShowUserSignInOtpNoticeMsg = 'TRUE';
                                    $rootScope.userSignInOtpNoticeMsgStr = userDataObj['msgStr'];
                                }else if(userDataObj['isUserAccountActive']==='Y'
                                    && userDataObj['isOtpCodeSent']==='Y' && userDataObj['isOtpCodeValidated']==='Y'){
                                    storeAuthenticatedUserDetailsInSession(userDataObj);
                                    $rootScope.redirectToUserAccessedLastPageFrom();
                                }
                            }else{
                                removeTemporaryUserSignUpDataFromSesion();
                                removeTemporaryUserSignedInDataFromSesion();
                                $rootScope.showAccountFormSectionName = 'signInSection';
                                $rootScope.isShowUserSignInNoticeMsg = 'TRUE';
                                $rootScope.userSignInNoticeMsgStr = "Invalid account details !!!";
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in userSignInAuthentication=>"+ex);
            }
        };
        
        // collectDataUserSignUpAuthentication
        $rootScope.collectDataUserSignUpAuthentication = function(fromSection){
            var retValidateDataStatus = validateDataUserSignUpAuthentication(fromSection);
            if(retValidateDataStatus===true){
                var preparedParamJsonObj = getParamDataForUserSignUpAuthentication(fromSection);
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    $rootScope.userSignUpAuthentication(preparedParamJsonObj);
                }
            }
        };
        
        // userSignUpAuthentication
        $rootScope.userSignUpAuthentication = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling UsersServices 
                    UsersServices.userSignUpAuthentication(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            var rtDataObj = false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                rtDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                            }
                            if(rtDataObj!=='' && rtDataObj!==false && rtDataObj!==undefined){
                                if(rtDataObj['isOtpCodeSent']==='N' && rtDataObj['isOtpCodeValidated']==='N'){
                                    removeUserSignUpDataFromSesion();
                                    $rootScope.showAccountFormSectionName = 'signUpSection';
                                    $rootScope.isShowUserSignUpNoticeMsg = 'TRUE';
                                    $rootScope.userSignUpNoticeMsgStr = rtDataObj['msgStr'];
                                }else if(rtDataObj['isOtpCodeSent']==='Y' && rtDataObj['isOtpCodeValidated']==='N'){
                                    storeTemporaryUserSignUpData(paramDataObj);
                                    $rootScope.showAccountFormSectionName = 'otpSection';
                                    $rootScope.isShowUserSignUpOtpNoticeMsg = 'TRUE';
                                    $rootScope.userSignUpOtpNoticeMsgStr = rtDataObj['msgStr'];
                                }else if(rtDataObj['isOtpCodeSent']==='Y' && rtDataObj['isOtpCodeValidated']==='Y'){
                                    storeAuthenticatedUserDetailsInSession(rtDataObj['userDetails']);
                                    window.location.href = globalBaseSitePath;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in userSignUpAuthentication=>"+ex);
            }
        };
        
        // redirectToUserAccessedLastPageFrom
        $rootScope.redirectToUserAccessedLastPageFrom = function(){
            var lastPageAccessedByUser = getPageDetailsUserAccessedFrom();
            if(lastPageAccessedByUser==='home'){
                window.location.href = globalBaseSitePath;
            }else if(lastPageAccessedByUser==='all-stores-cakes'){
                window.location.href = globalBaseSitePath+"all-stores-cakes.php";
            }else if(lastPageAccessedByUser==='all-stores-chocolates'){
                window.location.href = globalBaseSitePath+"all-stores-chocolates";
            }else if(lastPageAccessedByUser==='store-all-cakes'){
                window.location.href = globalBaseSitePath+"store-all-cakes.php";
            }else if(lastPageAccessedByUser==='store-all-chocolates'){
                window.location.href = globalBaseSitePath+"store-all-chocolates.php";
            }else if(lastPageAccessedByUser==='cakes-product'){
                window.location.href = globalBaseSitePath+"cakes-product.php";
            }else if(lastPageAccessedByUser==='chocolates-product'){
                window.location.href = globalBaseSitePath+"chocolates-product";
            }else if(lastPageAccessedByUser==='partyorder'){
                $rootScope.storeRequestedSectionNameToAccessInUserAccount('partyorder');
            }else if(lastPageAccessedByUser==='customizeorder'){
                $rootScope.storeRequestedSectionNameToAccessInUserAccount('customizeorder');
            }
        };
        
        // signOutUser
        $rootScope.signOutUser = function(){
            UsersServices.signOutUser();
            resetDKSessionData();
            window.location.href = globalBaseSitePath;
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
                        window.location.href = globalBaseSitePath+"customer-account.php";
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
