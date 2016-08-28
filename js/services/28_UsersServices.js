
// CJ defined this function 2016-07-24
app.factory('UsersServices', function($http, $q, $rootScope){
    try{
        
        var userDetails = {};
        
        // checkUserAuthentication
        userDetails.checkUserAuthentication = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/CheckUserAuthentication", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // getUserPersonalInfo
        userDetails.getUserPersonalInfo = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageUserPersonalInfoData", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // updateUserPersonalInfo
        userDetails.updateUserPersonalInfo = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageUserPersonalInfoData", 'apiFile', 'PUT', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // updateUserPasswordInfo
        userDetails.updateUserPasswordInfo = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UpdateUserPasswordInfoData", 'apiFile', 'PUT', '', preparedParamJsonObj).done(function(retResponseJson){});
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
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    // calling UsersServices 
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/UserDashboardSummaryData", 'apiFile', 'GET', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
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
                showHideLoaderBox('hide');
                console.log("Problem in refreshUserDashboardSummaryDataDetails=>"+ex);
            }
        };
        
        return userDetails;
        
    }catch(ex){
        return false;
    }
}); 
