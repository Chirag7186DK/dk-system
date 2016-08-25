
// WishListController
app.controller('WishListController', function ($scope, $rootScope, $http, WishListServices){
    try{

        // redirectToViewWishList
        $rootScope.redirectToViewWishList = function (fromPageLoad){
            // check user logged in dk session
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===true){
                window.location.href = globalBaseSitePath + "wishlist.php";
            }else{
                storePageDetailsUserAccessedFrom(fromPageLoad);
                window.location.href = globalBaseSitePath + "account-signup-signin.php";
            }
        };

        // resetUWLVariable
        $rootScope.resetUWLVariable = function (purposeType) {
            $rootScope.wlMsgStr = '';
            $rootScope.isShowWLMsg = false;
            $rootScope.uwlCreationErrorMsgStr = '';
            $rootScope.isShowUWLCreationErrorMsg = false;
            $rootScope.isShowCreateUWLFormContent = false;
            $rootScope.userAllWLArrJsonObj = false;
            $rootScope.userAllWLWiseItemArrJsonData = false;
            $rootScope.searchedAllUserwiseWLSummaryArrJsonObj = false;
            $rootScope.searchedUserwiseWLAllItemArrJsonObj = false;
            if(purposeType==='showwlcreation'){
                $rootScope.isShowCreateUWLFormContent = true;
                attachedFieldValidationWLCreation();
            }
        };

        // toggleWLCreationFContent
        $rootScope.toggleUWLCreationFContent = function(){
            $rootScope.resetUWLVariable('showwlcreation');
            $rootScope.checkProductDataAvailableInSessionToAddUWL();
        };

        // collectDataUWLCreation
        $rootScope.collectDataUWLCreation = function(){
            // validate data
            var retDataValidatedStatus = validateDataUWLCreation();
            if (retDataValidatedStatus === true) {
                // collect data for creating wish list
                var collectedWishListDataObj = getParamDataForWLCreation();
                if (collectedWishListDataObj !== false && jQuery.isEmptyObject(collectedWishListDataObj) === false) {
                    $rootScope.createUserWL(collectedWishListDataObj);
                }
            }
        };

        // createUserWL 
        $rootScope.createUserWL = function (paramDataObj){
            try {
                if (paramDataObj !== false && jQuery.isEmptyObject(paramDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    // calling WishListServices 
                    WishListServices.createUserWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var retStatusUWLCreated = 'FALSE';
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusUWLCreated = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isUWLCreated', retResponseJson);
                            }
                            if (retStatusUWLCreated !== 'TRUE') {
                                notificationMsgStr = 'Please fill-up form details to create new wish list !';
                                $rootScope.isShowUWLCreationErrorMsg = true;
                                $rootScope.uwlCreationErrorMsgStr = notificationMsgStr;
                            } else {
                                clearFormFieldWLCreation();
                                $rootScope.resetUWLVariable('showwlcreation');
                                notificationMsgStr = 'New wish list is created successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                // refresh user wish list dashboard summary data using services
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in createWishList ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // showUserWL
        $rootScope.showUserWL = function () {
            try {
                $rootScope.resetUWLVariable('showUserWL');
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                if (preparedParamJsonObj !== false && jQuery.isEmptyObject(preparedParamJsonObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    $rootScope.userAllWLArrJsonObj = false;

                    // calling WishListServices 
                    WishListServices.getUserWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var userAllWLArrJsonObj = false;
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                userAllWLArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userAllWL', retResponseJson);
                            }
                            if (userAllWLArrJsonObj === false || userAllWLArrJsonObj === undefined || userAllWLArrJsonObj === '') {
                                notificationMsgStr = "No wish list found, please create new one by clicking on 'Create' icon box !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            } else {
                                var notificationMsgStr = "Your " + (userAllWLArrJsonObj).length + " wish list data are displaying below & set any one list as default settings !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.userAllWLArrJsonObj = userAllWLArrJsonObj;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in showUserWL ex=>" + ex);
            }
        };

        // deleteUserWL
        $rootScope.deleteUserWL = function (uwlDataObj) {
            try {
                // collect data
                var preparedParamJsonObj = getParamDataToDeleteUserWL(uwlDataObj);
                if (preparedParamJsonObj !== false && jQuery.isEmptyObject(preparedParamJsonObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    // calling WishListServices 
                    WishListServices.deleteUserWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var retStatusUWLRemoved = 'FALSE';
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusUWLRemoved = extractDataFromReturnAjaxResponse('DELETE', 'apiFile', 'isUWLRemoved', retResponseJson);
                            }
                            if (retStatusUWLRemoved === 'TRUE') {
                                notificationMsgStr = 'Wish list deleted successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.showUserWL();
                                // refresh user wish list dashboard summary data using services
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            } else {
                                notificationMsgStr = 'Please try again to delete wish list !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in deleteUserWL ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // collectDataUWLUpdation
        $rootScope.collectDataUWLUpdation = function (fcClass, uwlDataObj){
            // validate data
            $('.' + fcClass).find('.wld_eachWLErrorMsgPClass').empty();
            var retDataValidatedStatus = validateDataUWLUpdation(fcClass);
            if(retDataValidatedStatus===true){
                // collect data for updating user wish list
                var collectedUWLDataToUpdateObj = getParamDataForUWLUpdation(fcClass, uwlDataObj);
                if (collectedUWLDataToUpdateObj!==false && jQuery.isEmptyObject(collectedUWLDataToUpdateObj) === false) {
                    $rootScope.updateUserWL(collectedUWLDataToUpdateObj);
                }
            }
        };

        // updateUserWL
        $rootScope.updateUserWL = function (uwlDataObj) {
            try {
                if (uwlDataObj !== false && jQuery.isEmptyObject(uwlDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = uwlDataObj;

                    // calling WishListServices 
                    WishListServices.updateUserWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var notificationMsgStr = '';
                            var retStatusUWLUpdated = 'FALSE';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusUWLUpdated = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUWLUpdated', retResponseJson);
                            }
                            if (retStatusUWLUpdated === 'TRUE') {
                                notificationMsgStr = 'Wish list data updated successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                // refresh user wish list dashboard summary data using services
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            } else {
                                notificationMsgStr = 'Please try again to update wish list data !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in updateUserWL ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // showUWLWiseItemDetails 
        $rootScope.showUWLWiseItemDetails = function (uwlDataObj) {
            try {
                $rootScope.resetUWLVariable('showUserAllWLWiseItemList');
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                // console.log("showUWLWiseItemDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if (preparedParamJsonObj !== false && jQuery.isEmptyObject(preparedParamJsonObj) === false) {
                    if (uwlDataObj !== false && uwlDataObj !== undefined && jQuery.isEmptyObject(uwlDataObj) === false) {
                        preparedParamJsonObj['wishListId'] = uwlDataObj['wlId'];
                    }
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    $rootScope.userAllWLWiseItemArrJsonData = false;

                    // calling WishListServices 
                    WishListServices.getUAllWLWiseItemDetails(fetchedParamJsonObj).done(function (retResponseJson) {
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                var notificationMsgStr = '';
                                var retUserAllWLWiseItemArrJsonData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userAllWLWiseItemDetails', retResponseJson);
                                if (retUserAllWLWiseItemArrJsonData !== '' && retUserAllWLWiseItemArrJsonData !== false
                                        && retUserAllWLWiseItemArrJsonData !== undefined) {
                                    $rootScope.userAllWLWiseItemArrJsonData = retUserAllWLWiseItemArrJsonData;
                                } else {
                                    notificationMsgStr = 'No item(s) found in wish list !';
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            } catch (ex) {
                showHideLoaderBox('hide');
            }
        };

        // collectDataToMoveProductFromWishListToWishList
        $rootScope.collectDataToMoveProductFromUWLToUWL = function (elementId){
            if($('#'+elementId).length>0){
                var moveProductParamDataObj = getParamDataToMoveProductFromUWLToUWL(elementId);
                // console.log("collectDataToMoveProductFromWLToWL retParamDataObj=>"+retParamDataObj);
                if(moveProductParamDataObj!==false && jQuery.isEmptyObject(moveProductParamDataObj)===false){
                    $rootScope.moveProductFromUWLToUWL(moveProductParamDataObj);
                }
            }
        };

        // moveProductFromUWLToUWL 
        $rootScope.moveProductFromUWLToUWL = function (moveProductParamDataObj) {
            try {
                if (moveProductParamDataObj !== false && jQuery.isEmptyObject(moveProductParamDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = moveProductParamDataObj;

                    // calling WishListServices 
                    WishListServices.moveProductFromUWLToUWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        // console.log("moveProductFromUWLToUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var retStatusIsProductMovedFromUWLToUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusIsProductMovedFromUWLToUWL = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isProductMovedFromUWLToUWL', retResponseJson);
                            }
                            if (retStatusIsProductMovedFromUWLToUWL === 'TRUE') {
                                notificationMsgStr = 'Item move from one list to another list successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.showUWLWiseItemDetails();
                            } else {
                                notificationMsgStr = 'Please try again to move item from one list to another !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in moveProductFromWishListToWishList ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // removeProductFromUWL 
        $rootScope.removeProductFromUWL = function (productDataObj) {
            try {
                // get product data to remove from whish list
                var toDeleteProductParamDataObj = getParamDataToRemoveProductFromUWL(productDataObj);
                if (toDeleteProductParamDataObj !== false && jQuery.isEmptyObject(toDeleteProductParamDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = toDeleteProductParamDataObj;

                    // calling WishListServices 
                    WishListServices.removeProductFromUWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        // console.log("removeProductFromUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var retStatusIsProductRemovedFromUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusIsProductRemovedFromUWL = extractDataFromReturnAjaxResponse('DELETE', 'apiFile', 'isProductRemovedFromUWL', retResponseJson);
                            }
                            if (retStatusIsProductRemovedFromUWL === 'TRUE') {
                                notificationMsgStr = 'Item deleted from wish list successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.showUWLWiseItemDetails();
                                // refresh user wish list dashboard summary data
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            } else {
                                notificationMsgStr = 'Item not delete from wish list !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in removeProductFromWishList ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // collectDataToSearchUserWLBySearchParam
        $rootScope.collectDataToSearchUserWLBySearchParam = function () {
            $rootScope.resetUWLVariable('showSearchedAllUserwiseWL');
            if ($('#searchUWLInput').length === 1) {
                var paramDataObj = {};
                var searchString = removeHtmlStripTagsOfContent($('#searchUWLInput').val());
                if (searchString !== '' && searchString !== false && searchString !== undefined) {
                    $('#searchUWLInput').css({'border-color': '#ccc'});
                    paramDataObj['wishlistby'] = 'users';
                    if (isStringOfCharacters(searchString) === true) {
                        paramDataObj['search_string'] = searchString;
                        paramDataObj['search_by'] = 'personname';
                    } else if (isValidEmail(searchString) === true) {
                        paramDataObj['search_string'] = searchString;
                        paramDataObj['search_by'] = 'email';
                    }
                    if (Object.keys(paramDataObj).length === 3) {
                        $rootScope.getUserwiseWLSummaryBySearchParam(paramDataObj);
                    }
                } else {
                    $('#searchUWLInput').css({'border-color': '#f18178'});
                    var notificationMsgStr = "Type person name or email address to find your friends wish list !";
                    showNotificationBoxMsg(notificationMsgStr);
                }
            }
        };

        // getUserwiseWLSummaryBySearchParam 
        $rootScope.getUserwiseWLSummaryBySearchParam = function (paramDataObj) {
            try {
                if (paramDataObj !== false && jQuery.isEmptyObject(paramDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    $rootScope.searchedAllUserwiseWLSummaryArrJsonObj = false;

                    // calling WishListServices 
                    WishListServices.searchUWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        // console.log("searchUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                var notificationMsgStr = '';
                                var searchedAllUserwiseWLSummaryArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'searchedAllUserwiseWLSummary', retResponseJson);
                                if (searchedAllUserwiseWLSummaryArrJsonObj !== false && searchedAllUserwiseWLSummaryArrJsonObj !== undefined) {
                                    $rootScope.searchedAllUserwiseWLSummaryArrJsonObj = searchedAllUserwiseWLSummaryArrJsonObj;
                                    notificationMsgStr = "Your " + (searchedAllUserwiseWLSummaryArrJsonObj).length + " friends wish list data has been displayed below !";
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                } else {
                                    notificationMsgStr = "No friend(s) wish list found for entered searched string: " + paramDataObj['search_string'];
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in getUserwiseWLSummaryBySearchParam ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // collectDataToShowSearchedUserWLtemBySearchParam
        $rootScope.collectDataToShowSearchedUserWLItemBySearchParam = function (userwiseWLSummaryDataObj) {
            $rootScope.resetUWLVariable('showSearchedAllUserwiseWLItem');
            var paramDataObj = getParamDataToShowSearchedUserWLItemBySearchParam(userwiseWLSummaryDataObj);
            $rootScope.getUserWLItemBySearchParam(paramDataObj);
        };

        // getUserWLItemBySearchParam 
        $rootScope.getUserWLItemBySearchParam = function (paramDataObj) {
            try {
                if (paramDataObj !== false && jQuery.isEmptyObject(paramDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    $rootScope.searchedUserwiseWLAllItemArrJsonObj = false;

                    // calling WishListServices 
                    WishListServices.searchUWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                var notificationMsgStr = '';
                                var searchedUserwiseWishListAllItemArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'searchedUserwiseWLAllItem', retResponseJson);
                                if (searchedUserwiseWishListAllItemArrJsonObj !== false && searchedUserwiseWishListAllItemArrJsonObj !== undefined) {
                                    var yourFriendsName = searchedUserwiseWishListAllItemArrJsonObj[0]['userName'];
                                    var yourFriendsWLItemCount = searchedUserwiseWishListAllItemArrJsonObj[0]['wlmCount'];
                                    notificationMsgStr = "You are viewing " + yourFriendsWLItemCount + " item(s) of your friend '" + yourFriendsName + "' wish list !";
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                    $rootScope.searchedUserwiseWLAllItemArrJsonObj = searchedUserwiseWishListAllItemArrJsonObj;
                                } else {
                                    notificationMsgStr = "No item found in wish list, please view another wish list !";
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in getUserWishListItemBySearchParam ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // collectDataToCopyProductFromUWLToUWL
        $rootScope.collectDataToCopyProductFromUWLToUWL = function (elementId, notLoggedUserwiseWLSummaryDataObj) {
            if ($('#' + elementId).length > 0) {
                var moveProductParamDataObj = getParamDataToCopyProductFromUWLToUWL(elementId);
                // console.log("collectDataToCopyProductFromUWLToUWL retParamDataObj=>"+retParamDataObj);
                $rootScope.copyProductFromUWLToUWL(moveProductParamDataObj, notLoggedUserwiseWLSummaryDataObj);
            }
        };

        // copyProductFromUWLToUWL 
        $rootScope.copyProductFromUWLToUWL = function (copyProductParamDataObj, notLoggedUserwiseWLSummaryDataObj) {
            try {
                if (copyProductParamDataObj !== false && jQuery.isEmptyObject(copyProductParamDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = copyProductParamDataObj;

                    // calling WishListServices 
                    WishListServices.copyProductFromUWLToUWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        // console.log("copyProductFromUWLToUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var retStatusIsProductCopiedFromUWLToUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusIsProductCopiedFromUWLToUWL = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductCopiedFromUWLToUWL', retResponseJson);
                            }
                            if (retStatusIsProductCopiedFromUWLToUWL === 'TRUE') {
                                notificationMsgStr = "Item copied from your friends wish list to yours successfully !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.collectDataToShowSearchedUserWLItemBySearchParam(notLoggedUserwiseWLSummaryDataObj);
                                // refresh user wish list dashboard summary data
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            } else {
                                notificationMsgStr = "Please try again to copy item from your friends wish list to yours !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in copyProductFromUWLToUWL ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

        // prepareProductDataToAddInUWL 
        $rootScope.prepareProductDataToAddInUWL = function (productDetailsObj) {
            try {
                // store product data in session wish list
                var retStatusDataStored = storeProductDataInSessionForUWL(productDetailsObj);
                if (retStatusDataStored === true) {
                    var retUserLoggedInStatus = checkUserLoggedInSession();
                    if (retUserLoggedInStatus === false || retUserLoggedInStatus === undefined || retUserLoggedInStatus === '') {
                        $rootScope.redirectToViewWishList('wishlist');
                    } else {
                        $rootScope.addProductFromSessionToUWL();
                    }
                }
            } catch (ex) {
                // console.log("problem in prepareProductDataToAddInUWL ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };

        // checkProductDataAvailableInSessionToAddUWL, Think on it cj
        $rootScope.checkProductDataAvailableInSessionToAddUWL = function () {
            if (($rootScope.wlCount === 0 || $rootScope.wlCount === '')
                    && checkProductDataAvailableInSessionToAddUWL()) {
                var notificationMsgStr = "Please create your wish list to add item for remembering !";
                $rootScope.isShowWLMsg = true;
                $rootScope.wlMsgStr = notificationMsgStr;
                showNotificationBoxMsg(notificationMsgStr);
            } else if ($rootScope.wlCount > 0 && $rootScope.wlCount !== '') {
                $rootScope.addProductFromSessionToUWL();
            }
        };

        // addProductFromSessionToUWL 
        $rootScope.addProductFromSessionToUWL = function () {
            try {
                // get stored product data from session
                var storedProductDataObj = getStoredProductDataFromSessionToAddUWL();
                if (storedProductDataObj !== false && jQuery.isEmptyObject(storedProductDataObj) === false) {
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding": 10};
                    jsonParamBlockUIObject['message'] = "<img src='" + globalBaseSitePath + "images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = storedProductDataObj;

                    // calling WishListServices 
                    WishListServices.addProductToUWL(fetchedParamJsonObj).done(function (retResponseJson) {
                        // console.log("addProductToWishList retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function () {
                            showHideLoaderBox('hide');
                            var retStatusIsProductAddedToUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if (retResponseJson !== false && retResponseJson !== undefined && retResponseJson !== '') {
                                retStatusIsProductAddedToUWL = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductAddedUWL', retResponseJson);
                            }
                            if (retStatusIsProductAddedToUWL === 'TRUE') {
                                notificationMsgStr = "Item added to your default wish list successfully !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                clearStoredProductDataFromSessionForUWL();
                                // refresh user wish list dashboard summary data
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            } else {
                                notificationMsgStr = "Please try again to add item in your wish list !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            } catch (ex) {
                console.log("problem in addProductToWishList ex=>" + ex);
                showHideLoaderBox('hide');
            }
        };

    } catch (ex) {
        console.log("problem in wishlist controller ex=>" + ex);
    }
});
