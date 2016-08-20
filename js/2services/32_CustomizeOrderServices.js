

// CJ defined this function 2016-07-26
app.factory('WishListServices', function($http, $q, $rootScope){
    try{
        
        var wishListDetails = {};
        
        // resetUserWLDashboardVariableData
        wishListDetails.resetUserWLDashboardVariableData = function(userWLDashboardDataObj){
            if(userWLDashboardDataObj!=='' && userWLDashboardDataObj!==false 
                && userWLDashboardDataObj!==undefined){
                $rootScope.wlCount = userWLDashboardDataObj['wlCount'];
                $rootScope.wlmCount = userWLDashboardDataObj['wlmCount'];
            }else{
                $rootScope.wlCount = 0;
                $rootScope.wlmCount = 0;
            }
        };
        
        // refreshUserWLDashboardSummaryDataDetails
        wishListDetails.refreshUserWLDashboardSummaryDataDetails = function(){
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

                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/UserWLDashboardSummary", 'apiFile', 'GET', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var userWLDashboardDataObj = false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userWLDashboardDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'wlDashboardSummary', retResponseJson);
                            }
                            if(userWLDashboardDataObj!=='' && userWLDashboardDataObj!==false 
                                && userWLDashboardDataObj!==undefined){
                                wishListDetails.resetUserWLDashboardVariableData(userWLDashboardDataObj);
                            }else{
                                wishListDetails.resetUserWLDashboardVariableData(false);
                            }
                        });
                    });
                }else{
                    wishListDetails.resetUserWLDashboardVariableData(false);
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("Problem in refreshUserWLDashboardSummaryDataDetails=>"+ex);
            }
        };
        
        wishListDetails.createUserWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/CreateUserWL", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.getUserWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/UserWL", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.deleteUserWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/DeleteUserWL", 'apiFile', 'DELETE', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.updateUserWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/UdpateUWL", 'apiFile', 'PUT', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.getUAllWLWiseItemDetails = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/UserAllWLWiseItemDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.moveProductFromUWLToUWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/MoveProductFromUWLToUWL", 'apiFile', 'PUT', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.removeProductFromUWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/RemoveProductFromUWL", 'apiFile', 'DELETE', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.searchUWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/SearchUserWL", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.copyProductFromUWLToUWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/CopyProductFromUWLToUWL", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        wishListDetails.addProductToUWL = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/WishList/AddProductToUWL", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        return wishListDetails;
        
    }catch(ex){
        // console.log("problem in WishListServices ex=>"+ex);
        return false;
    }
}); 

