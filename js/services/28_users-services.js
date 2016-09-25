
(function(){

    angular.module('DKAPP').factory('UsersServices', UsersServices);

    // CJ defined this function 2016-07-24
    function UsersServices($rootScope){
        try{

            var userDetails = {};

            // checkUserAuthentication
            userDetails.userSignInAuthentication = function(paramDataObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserSignInAuthentication", 'apiFile', 'POST', '', paramDataObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };
            
            // userSignUpAuthentication
            userDetails.userSignUpAuthentication = function(paramDataObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserSignUpAuthentication", 'apiFile', 'POST', '', paramDataObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };
            
            // sendOtpcode
            userDetails.sendOtpcode = function(paramDataObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/SendOtpCode", 'apiFile', 'POST', '', paramDataObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            // signOutUser
            userDetails.signOutUser = function(){
                try{
                    // fetch param data from session
                    var paramDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                        var apiParamJsonObj = {};
                        apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                        var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserLogout", 'apiFile', 'PUT', '', apiParamJsonObj).done(function(retResponseJson){});
                        return promiseObject;
                    }
                }catch(ex){
                    console.log("Problem in signOutUser=>"+ex);
                }
            };

            // getUserPersonalInfo
            userDetails.getUserPersonalInfo = function(paramDataObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageUserPersonalInfoData", 'apiFile', 'GET', '', paramDataObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            // updateUserPersonalInfo
            userDetails.updateUserPersonalInfo = function(paramDataObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageUserPersonalInfoData", 'apiFile', 'PUT', '', paramDataObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            // updateUserPasswordInfo
            userDetails.updateUserPasswordInfo = function(paramDataObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UpdateUserPasswordInfoData", 'apiFile', 'PUT', '', paramDataObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            // resetUserDashboardVariableData
            userDetails.resetUserDashboardVariableData = function(userDashboardDataObj){
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
            userDetails.refreshUserDashboardSummaryDataDetails = function(){
                try{
                    // fetch param data from session
                    var paramDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                        var apiParamJsonObj = {};
                        apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                        // calling UsersServices 
                        communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserDashboardSummaryData", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                            $rootScope.$apply(function(){
                                var userDashboardDataObj = false;
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    userDashboardDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userDetails', retResponseJson);
                                }
                                if(userDashboardDataObj!=='' && userDashboardDataObj!==false && userDashboardDataObj!==undefined){
                                    userDetails.resetUserDashboardVariableData(userDashboardDataObj);
                                }else{
                                    userDetails.resetUserDashboardVariableData(false);
                                }
                            });
                        });
                    }else{
                        userDetails.resetUserDashboardVariableData(false);
                    }
                }catch(ex){
                    console.log("Problem in refreshUserDashboardSummaryDataDetails=>"+ex);
                }
            };

            return userDetails;

        }catch(ex){
            return false;
        }
    } 

})();