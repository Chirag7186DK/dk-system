
angular.module('DKAPP').controller('UsersController', UsersController);

function UsersController($scope, $rootScope, $state, CommonServices){
    try{
        
        // goToSignUpSignInAccountSection
        $rootScope.goToSignUpSignInAccountSection = function(fromPageLoad){
            storePageDetailsUserAccessedFrom(fromPageLoad);
            // fetch param data from session
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===false){
                // window.location.href = globalBaseSitePath+"account-signup-signin.php";
                $state.go('account-signup-signin'); 
            }    
        };
        
        // showLoaderAccountHasbeenVerfied
        $rootScope.showLoaderAccountHasbeenVerfied = function(){};
        
        // isUserAlreadySignedInAccountSection
        $rootScope.isUserAlreadySignedInAccountSection = function(){
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===true){
                // window.location.href = globalBaseSitePath;
                $state.go('/'); 
            }else if(userLoggedInSessionStatus===false){
                $rootScope.toggleAccountFormSectionName('signInSection');
            } 
        };
        
        // toggleAccountFormSectionName
        $rootScope.toggleAccountFormSectionName = function(sectionName){
            removeTemporaryUserSignUpDataFromSesion();
            removeTemporaryUserSignedInDataFromSesion();
            // removeTemporaryUseFrgtPwdDataFromSesion();
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
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserSignInAuthentication", 'apiFile', 'POST', '', apiParamJsonObj).done(function(rtRspJson){
                        $scope.$apply(function(){
                            var userDataObj = false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                userDataObj = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'userDetails', rtRspJson);
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
                                    storeTemporaryUserSignedInData(userDataObj);
                                    $rootScope.showAccountFormSectionName = 'signInOtpSection';
                                    $rootScope.isShowUserSignInOtpNoticeMsg = 'TRUE';
                                    $rootScope.userSignInOtpNoticeMsgStr = userDataObj['msgStr'];
                                }else if(userDataObj['isUserAccountActive']==='Y'
                                    && userDataObj['isOtpCodeSent']==='Y' && userDataObj['isOtpCodeValidated']==='Y'){
                                    storeAuthenticatedUserDetailsInSession(userDataObj);
                                    removeTemporaryUserSignUpDataFromSesion();
                                    removeTemporaryUserSignedInDataFromSesion();
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
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserSignUpAuthentication", 'apiFile', 'POST', '', apiParamJsonObj).done(function(rtRspJson){
                        $scope.$apply(function(){
                            var rtDataObj = false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                rtDataObj = extractDataFromReturnAjaxResponse('POST', 'apiFile', '', rtRspJson);
                            }
                            if(rtDataObj!=='' && rtDataObj!==false && rtDataObj!==undefined){
                                if(rtDataObj['isOtpCodeSent']==='N' && rtDataObj['isOtpCodeValidated']==='N'){
                                    removeTemporaryUserSignUpDataFromSesion();
                                    $rootScope.showAccountFormSectionName = 'signUpSection';
                                    $rootScope.isShowUserSignUpNoticeMsg = 'TRUE';
                                    $rootScope.userSignUpNoticeMsgStr = rtDataObj['msgStr'];
                                }else if(rtDataObj['isOtpCodeSent']==='Y' && rtDataObj['isOtpCodeValidated']==='N'){
                                    storeTemporaryUserSignUpData(paramDataObj);
                                    $rootScope.showAccountFormSectionName = 'signUpOtpSection';
                                    $rootScope.isShowUserSignUpOtpNoticeMsg = 'TRUE';
                                    $rootScope.userSignUpOtpNoticeMsgStr = rtDataObj['msgStr'];
                                }else if(rtDataObj['isOtpCodeSent']==='Y' && rtDataObj['isOtpCodeValidated']==='Y'){
                                    storeAuthenticatedUserDetailsInSession(rtDataObj['userDetails']);
                                    $rootScope.redirectToUserAccessedLastPageFrom();
                                }
                            }else{
                                removeTemporaryUserSignUpDataFromSesion();
                                removeTemporaryUserSignedInDataFromSesion();
                                $rootScope.showAccountFormSectionName = 'signUpSection';
                                $rootScope.isShowUserSignUpNoticeMsg = 'FALSE';
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in userSignUpAuthentication=>"+ex);
            }
        };
        
        
        // collectDataUserFrgtPwdAuthentication
        $rootScope.collectDataUserFrgtPwdAuthentication = function(fromSection){
            var rtValidatedDataStatus = validateDataUserFrgtPwdAuthentication(fromSection);
            if(rtValidatedDataStatus===true){
                var preparedParamJsonObj = getParamDataForUserFrgtPwdAuthentication(fromSection);
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    $rootScope.userForgotPwdAuthentication(preparedParamJsonObj);
                }
            }
        };
        
        // userForgotPwdAuthentication
        $rootScope.userForgotPwdAuthentication = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserForgotPwdAuthentication", 'apiFile', 'POST', '', apiParamJsonObj).done(function(rtRspJson){
                        $scope.$apply(function(){
                            var userDataObj = false;
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                userDataObj = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'userDetails', rtRspJson);
                            }
                            if(userDataObj!=='' && userDataObj!==false && userDataObj!==undefined){
                                if(userDataObj['isUserAccountActive']==='N' && userDataObj['isOtpCodeSent']==='N' 
                                    && userDataObj['isOtpCodeValidated']==='N' && userDataObj['isPasswordChanged']==='N'){
                                    removeTemporaryUserFrgtPwdDataFromSesion();
                                    $rootScope.showAccountFormSectionName = 'frgtPwdStep1Section';
                                    $rootScope.isShowFrgtPwdNoticeMsgStepNo = 'frgtPwdStep1';
                                    $rootScope.userFrgtPwdNoticeMsgStr = userDataObj['msgStr'];
                                }else if(userDataObj['isUserAccountActive']==='Y' && userDataObj['isOtpCodeSent']==='Y' 
                                    && userDataObj['isOtpCodeValidated']==='N' && userDataObj['isPasswordChanged']==='N'){
                                    storeTemporaryUserFrgtPwdData(userDataObj);
                                    $rootScope.showAccountFormSectionName = 'frgtPwdStep2Section';
                                    $rootScope.isShowFrgtPwdNoticeMsgStepNo = 'frgtPwdStep2';
                                    $rootScope.userFrgtPwdNoticeMsgStr = userDataObj['msgStr'];
                                }else if(userDataObj['isUserAccountActive']==='Y' && userDataObj['isOtpCodeSent']==='Y' 
                                    && userDataObj['isOtpCodeValidated']==='Y' && userDataObj['isPasswordChanged']==='N'){
                                    storeTemporaryUserFrgtPwdData(userDataObj);
                                    $rootScope.showAccountFormSectionName = 'frgtPwdStep3Section';
                                    $rootScope.isShowFrgtPwdNoticeMsgStepNo = 'frgtPwdStep3';
                                    $rootScope.userFrgtPwdNoticeMsgStr = userDataObj['msgStr'];
                                }else if(userDataObj['isUserAccountActive']==='Y' && userDataObj['isOtpCodeSent']==='Y' 
                                    && userDataObj['isOtpCodeValidated']==='Y' && userDataObj['isPasswordChanged']==='Y'){
                                    removeTemporaryUserFrgtPwdDataFromSesion();
                                    $rootScope.showAccountFormSectionName = 'frgtPwdStep4Section';
                                    $rootScope.isShowFrgtPwdNoticeMsgStepNo = 'frgtPwdStep4';
                                }
                            }else{
                                removeTemporaryUserSignUpDataFromSesion();
                                removeTemporaryUserSignedInDataFromSesion();
                                $rootScope.showAccountFormSectionName = 'signUpSection';
                                $rootScope.isShowUserSignUpNoticeMsg = 'FALSE';
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in userSignUpAuthentication=>"+ex);
            }
        };
        
        // resendOtpcodeClick
        $rootScope.resendOtpcodeClick = function(fromSection){
            var paramDataObj = getParamDataForResendOtpcode(fromSection);
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    var rtDataObj = CommonServices.sendOtpcode(apiParamJsonObj);
                    if(fromSection==='signInOtpSection'){
                        $rootScope.isShowUserSignInOtpNoticeMsg = 'TRUE';
                        $rootScope.userSignInOtpNoticeMsgStr = 'OTP sent successfully on your registered mobile no.s with us and it will take 15 to 45 sec approx to reach at your message box !!!';
                    }else if(fromSection==='signUpOtpSection'){
                        $rootScope.isShowUserSignUpOtpNoticeMsg = 'TRUE';
                        $rootScope.userSignUpOtpNoticeMsgStr = 'OTP sent successfully on your mobile no.s and it will take 15 to 45 sec approx to reach at your message box !!!';
                    }else if(fromSection==='frgtPwdOtpSection'){
                        $rootScope.isShowFrgtPwdNoticeMsgStepNo = 'frgtPwdStep2';
                        $rootScope.userFrgtPwdNoticeMsgStr = "OTP sent successfully on your registered mobile no.s and it will take 15 to 45 sec approx to reach at your message box !!!";
                    }
                }
            }catch(ex){
                console.log("Problem in resendOtpcodeClick=>"+ex);
            }
        };
        
        // redirectToUserAccessedLastPageFrom
        $rootScope.redirectToUserAccessedLastPageFrom = function(){
            var lastPageAccessedByUser = getPageDetailsUserAccessedFrom();
            if(lastPageAccessedByUser==='home'){
                // window.location.href = globalBaseSitePath;
                $state.go('/'); 
            }else if(lastPageAccessedByUser==='all-stores-cakes'){
                // window.location.href = globalBaseSitePath+"all-stores-cakes.php";
                $state.go('all-stores-cakes'); 
            }else if(lastPageAccessedByUser==='store-all-cakes'){
                // window.location.href = globalBaseSitePath+"store-all-cakes.php";
                $state.go('store-all-cakes'); 
            }else if(lastPageAccessedByUser==='cakes-product'){
                // window.location.href = globalBaseSitePath+"cakes-product.php";
                $state.go('cakes-product'); 
            }else if(lastPageAccessedByUser==='partyorder'){
                $rootScope.storeRequestedSectionNameToAccessInUserAccount('partyorder');
            }else if(lastPageAccessedByUser==='customizeorder'){
                $rootScope.storeRequestedSectionNameToAccessInUserAccount('customizeorder');
            }
        };
        
        // signOutUser
        $rootScope.signOutUser = function(){
            CommonServices.signOutUser();
            resetDKSessionData();
            // window.location.href = globalBaseSitePath;
            $state.go('/', {reload:true}); 
            CommonServices.refreshWebAppVariableData();
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
                        // window.location.href = globalBaseSitePath+"customer-account.php";
                        if($state.current.name!=='customer-account'){
                            $state.go('customer-account');
                        }else if($state.current.name==='customer-account'){
                            $state.reload();
                        }
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
