
// web-app loaded on devices type detect here
var isWindowResize = 'N';
var deviceWidth = parseInt($(window).width());
var deviceHeight = parseInt($(window).height());
console.log("on load deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);
//alert("on laod deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);

// web-app module defined here 
var app = angular.module('DESSERTSKHAZANAAPP', []);

///////////////////// DK services start here ////////////////////////////////

// CJ defined this function 2016-04-22
app.factory('LocationServices', function($http, $q){
    try{
        var locationDetails = {};
        
        locationDetails.getDKDeliveryCityList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Location/DeliveryCity", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        locationDetails.getDKDeliveryAreaList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Location/DeliveryArea", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        locationDetails.getDKDeliveryAreaBasedProductTypeList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/DeliveryAreaBasedProductTypeList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return locationDetails;
    }catch(ex){
        console.log("problem in LocationServices ex=>"+ex);
        return false;
    }
}); 


// CJ defined this function 2016-04-22
app.factory('ProductServices', function($http, $q){
    try{
        var productDetails = {};
        
        productDetails.getProductTypeProductCategoryProductListForDashboardLevel = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryProductListDashboardLevel", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        productDetails.getProductTypeProductCategoryAllProductList = function(preparedParamJsonObj){
            var promiseObject = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryAllProductDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        productDetails.getProductTypeProductCategoryProductDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryProductDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        productDetails.getProductDescriptionDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductDescriptionDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return productDetails;
    }catch(ex){
        console.log("problem in Product services ex=>"+ex);
        return false;
    }
}); 


// CJ defined this function 2016-04-22
app.factory('RatingReviewServices', function($http, $q){
    try{
        var ratingReviewDetails = {};
        
        ratingReviewDetails.addRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/UserRatingReviewProduct", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getShopStoreRatingReviewQuestionsAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/ManageShopStoreRatingReviewQuestionsAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getShopStoreAllUserRatingReviewed = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/ShopStoreAllUserRating", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getAllUserRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AllUserRatingReviewAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getMaxRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/MaxRatingReviewAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getAverageRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AverageRatingReviewAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return ratingReviewDetails;
    }catch(ex){
        console.log("problem in Rating/Review services ex=>"+ex);
        return false;
    }
}); 


// CJ defined this function 2016-06-22
app.factory('ShopStoreServices', function($http, $q){
    try{
        var shopstoreDetails = {};
        
        shopstoreDetails.getCShopStoreSummaryInfo = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CShopStoreSummaryInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        shopstoreDetails.getCShopStoreProductTypeProductCategoryAllProductList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CShopStoreProductTypeProductCategoryAllProductDetails", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        shopstoreDetails.getCShopStoreWorkingStyleDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CshopstoreWorkingstyle", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        shopstoreDetails.getCShopStoreProductDeliveryAreaDetails = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/ShopStore/CshopstoreProductdeliveryAreaInfo", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return shopstoreDetails;
    }catch(ex){
        console.log("problem in Shopstore services ex=>"+ex);
        return false;
    }
}); 


// CJ defined this function 2016-07-20
app.factory('PartyOrdersServices', function($http, $q){
    try{
        var partyOrdersDetails = {
            addPartyOrderRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/PartyOrders/ManagePartyOrdersRequest", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
                return promiseObject;
            }
        };
        return partyOrdersDetails;
    }catch(ex){
        return false;
    }
}); 


// CJ defined this function 2016-07-24
app.factory('CustomizeOrdersServices', function($http, $q){
    try{
        var customizeOrdersDetails = {
            addCustomizeOrderRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CustomizeOrders/ManageCustomizeOrdersRequest", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                    return retResponseJson;
                });
                return promiseObject;
            }
        };
        return customizeOrdersDetails;
    }catch(ex){
        return false;
    }
}); 


// CJ defined this function 2016-07-24
app.factory('CorporateTieupServices', function($http, $q){
    try{
        var corporateTieupDetails = {
            addingCorporateTieupRequest:function(preparedParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/CorporateTieup/ManageCorporateTieupRequest", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                    return retResponseJson;
                });
                return promiseObject;
            }
        };
        return corporateTieupDetails;
    }catch(ex){
        return false;
    }
}); 

// CJ defined this function 2016-07-24
app.factory('UsersServices', function($http, $q, $rootScope){
    try{
        
        var userDetails = {};
        
        userDetails.checkUserAuthentication = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/CheckUserAuthentication", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // resetUserDashboardVariableData
        userDetails.resetUserDashboardVariableData = function(userDashboardDataObj){
            if(userDashboardDataObj!=='' && userDashboardDataObj!==false && userDashboardDataObj!==undefined){
                $rootScope.loggedUserName = userDashboardDataObj['loggedUserName'];
                $rootScope.userSinceFrom = userDashboardDataObj['userSinceFrom'];
                $rootScope.isEnableRatingReviewSubmitButton = true;
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


// CJ defined this function 2016-06-16
app.factory('OrderCartServices', function($http, $q, $rootScope, UsersServices){
    try{
        
        var orderDetails = {};
        
        // resetUserOrdercartDashboardVariableData
        orderDetails.resetUserOrdercartDashboardVariableData = function(userOrdercartDashboardDataObj){
            if(userOrdercartDashboardDataObj!=='' && userOrdercartDashboardDataObj!==false 
                && userOrdercartDashboardDataObj!==undefined){
                $rootScope.ordercartCount = userOrdercartDashboardDataObj['ordercartCount'];
                $rootScope.ordercartItemRequestedCount = userOrdercartDashboardDataObj['ordercartItemRequestedCount'];
                $rootScope.subtotalOrderAmt = userOrdercartDashboardDataObj['subtotalOrderAmt'];
            }else{
                $rootScope.ordercartCount = 0;
                $rootScope.ordercartItemRequestedCount = 0;
                $rootScope.subtotalOrderAmt = 0;
            }
        };
        
        // refreshUserOrdercartDashboardSummaryDataDetails
        orderDetails.refreshUserOrdercartDashboardSummaryDataDetails = function(){
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

                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/UserOrdercartDashboardSummaryData", 'apiFile', 'GET', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var userOrdercartDashboardDataObj = false;
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userOrdercartDashboardDataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'orderCartDashboardSummary', retResponseJson);
                            }
                            if(userOrdercartDashboardDataObj!=='' && userOrdercartDashboardDataObj!==false 
                                && userOrdercartDashboardDataObj!==undefined){
                                orderDetails.resetUserOrdercartDashboardVariableData(userOrdercartDashboardDataObj);
                            }else{
                                orderDetails.resetUserOrdercartDashboardVariableData(false);
                            }
                        });
                    });
                }else{
                    orderDetails.resetUserOrdercartDashboardVariableData(false);
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("Problem in refreshUserOrdercartDashboardSummaryDataDetails=>"+ex);
            }
        };
      
        
        // addProductDataInOrdercart & item directly added in DB
        orderDetails.addProductDataInOrdercart = function(productDetailsObj, fcontentClass, productDataFromSession){
            try{
                // collect product data
                var preparedProductParamDataObj = getParamDataToAddProductInOrdercart(productDetailsObj, fcontentClass, productDataFromSession);
                if(preparedProductParamDataObj!==false && jQuery.isEmptyObject(preparedProductParamDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedProductParamDataObj;

                    // calling OrderCartServices 
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/AddProductData", 'apiFile', 'POST', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var isProductAddedInOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to add item in your order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isProductAddedInOrdercart = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductAddedInOrdercart', retResponseJson);
                            }
                            if(isProductAddedInOrdercart==='TRUE'){
                                notificationMsgStr = "Item added in your order cart successfully !";
                                clearProductContentAfterAddedProductInOrdercart(fcontentClass);
                                // refresh user order cart dashboard summary data using services
                                orderDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in addProductDataInOrdercart ex=>"+ex);
            }
        };
       
        // ordercartItemList
        orderDetails.ordercartItemList = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItemList", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        
        // removeItemOrdercart
        orderDetails.removeItemOrdercart = function(productDataObj){
            try{
                // check is user logged in or not session
                var paramDataObj = getParamDataToRemoveItemFromOrdercart(productDataObj);
                if(paramDataObj!==false && paramDataObj!==undefined && jQuery.isEmptyObject(paramDataObj)===false){
                
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;
                    
                    // calling OrderCartServices 
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItemList", 'apiFile', 'DELETE', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var isItemRemovedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to remove item from your order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isItemRemovedFromOrdercart = extractDataFromReturnAjaxResponse('DELETE', 'apiFile', 'isItemRemovedFromOrdercart', retResponseJson);
                            }
                            if(isItemRemovedFromOrdercart==='TRUE'){
                                notificationMsgStr = "Item removed from your order cart !";
                                // refresh user order cart dashboard summary data using services
                                orderDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                                // refresh order cart item list using services
                                orderDetails.ordercartItemList('R');
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in removeItemOrdercart ex=>"+ex);
            }
        };
        
        // updateItemOrdercart
        orderDetails.updateItemOrdercart = function(){
            try{
                // check is user logged in or not session
                var paramDataObj = getParamDataToUpdateItemFromOrdercart();
                if(paramDataObj!==false && paramDataObj!==undefined && jQuery.isEmptyObject(paramDataObj)===false){
                
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;
                    
                    // calling OrderCartServices 
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/OrderCart/ManageOrdercartItemList", 'apiFile', 'DELETE', '', fetchedParamJsonObj).done(function(retResponseJson){
                        showHideLoaderBox('hide');
                        $rootScope.$apply(function(){
                            var isItemUpdatedFromOrdercart = 'FALSE';
                            var notificationMsgStr = "Please try again to update item in your order cart !";
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isItemUpdatedFromOrdercart = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isItemUpdatedFromOrdercart', retResponseJson);
                            }
                            if(isItemUpdatedFromOrdercart==='TRUE'){
                                notificationMsgStr = "Item updated in your order cart !";
                                // refresh user order cart dashboard summary data using services
                                orderDetails.refreshUserOrdercartDashboardSummaryDataDetails();
                                // refresh order cart item list using services
                                orderDetails.ordercartItemList('R');
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                console.log("problem in removeItemOrdercart ex=>"+ex);
            }
        };
        
        return orderDetails;
        
    }catch(ex){
        return false;
    }
}); 

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



////////////////////////////////// DK controller start here ////////////////////////////////


// userSessionController using
app.controller('userSessionController', function($scope, $rootScope, UsersServices, OrderCartServices){
    
    // global variable declare 
    // this variable will be reflect on ui screen
    $rootScope.isDkDeliveryCityChanged = false;
    $rootScope.isDkDeliveryAreaChanged = false;
    $rootScope.dkDeliveryCityList = false;
    $rootScope.defaultedSelectedDKDeliveryCity = '';
    $rootScope.dkDeliveryAreaList = false;
    $rootScope.defaultedSelectedDKDeliveryArea = '';
    $rootScope.dkDeliveryAreaBasedProductTypeList = false;
    $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
    $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
    $rootScope.isDessertsProductTypeProductListLoaded = false;
    
    // loadDefaultDataInDkSession
    $rootScope.loadDefaultDataInDkSession = function(pageLoad){
        try{
            // check DKPARAMOBJ is available or not in session storage
            if((sessionStorage.getItem('DKPARAMOBJ')===null || sessionStorage.getItem('DKPARAMOBJ')===undefined 
                || sessionStorage.getItem('DKPARAMOBJ')==='' || sessionStorage.getItem('DKPARAMOBJ')===false) && pageLoad==='home'){
                var retStatusResetDkSessionDataCleared = initializeDkSessionData();  
                if(retStatusResetDkSessionDataCleared===true){
                }
            }else if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false) && pageLoad==='home'){
                // generate new user session id
                generateDkUserSessionId();
                addTrackingUserInfoAccessingWebsitesDetails(pageLoad);
            }else if((sessionStorage.getItem('DKPARAMOBJ')===null || sessionStorage.getItem('DKPARAMOBJ')===undefined 
                || sessionStorage.getItem('DKPARAMOBJ')==='' || sessionStorage.getItem('DKPARAMOBJ')===false) && pageLoad!=='home'){
                // clear browser cookies and other thing by javascript
                resetDKSessionData();
                // redirect to main page of desserts khazana
                window.location = globalBaseSitePath;
            }
        }catch(ex){
            console.log("problem in loadDefaultDataInDkSession ex=>"+ex);
        }
    };
    
    // checkInBackgroundDataAvailableForUpdationFromSession
    $rootScope.checkInBackgroundDataAvailableForUpdationFromSession = function(pageLoad){
        OrderCartServices.addProductDataInOrdercart(false, false, 'session');
    };
    
});


// LocationController using LocationServices
app.controller('LocationController', function($scope, $rootScope, $http, LocationServices){
    try{
        
        // loadDkDeliveryCityList 
        $rootScope.loadDkDeliveryCityList = function(loadOnPage){
            try{
                // get param obj to get related city details
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDkDeliveryCityDetails();
                // console.log("loadDkDeliveryCityList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchCityParamJsonObj = {};
                    fetchCityParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    // calling LocationServices to get dk delivery city details
                    LocationServices.getDKDeliveryCityList(fetchCityParamJsonObj).done(function(retResponseJson){
                        // console.log("retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryCityDetails', retResponseJson);
                                // console.log("loadDkDeliveryCityList retResponseJson=>"+JSON.stringify(retArrObj));
                                if(retArrObj!==false && retArrObj!==undefined && retArrObj!==''){
                                    storeDefaultDeliveryCityDetailsInSessionStorage(retArrObj.defaultSelectedDeliveryCityDetails, 'N');
                                    // final all dk delivery city list in variable and default city also
                                    $rootScope.defaultedSelectedDKDeliveryCity = retArrObj.defaultSelectedDeliveryCityDetails['cityId'];
                                    $rootScope.dkDeliveryCityList = retArrObj.allCityList;
                                    $rootScope.buildDKDeliveryCityListlHtmlSelectControl($rootScope.dkDeliveryCityList, loadOnPage);
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadDkDeliveryCityList ex=>"+ex);
                $rootScope.dkDeliveryCityList = false;
                $rootScope.defaultedSelectedDKDeliveryCity = '';
                showHideLoaderBox('hide');
            }
        };
        
        // buildDKDeliveryCityListlHtmlSelectControl
        $rootScope.buildDKDeliveryCityListlHtmlSelectControl = function(cityList, cityDetailsLoadedOnPage){
            // get html element obj 
            var cityListSelectControlElementObj = document.getElementById("dkDeliveryCityListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(cityListSelectControlElementObj).find('option').remove();
            $(cityListSelectControlElementObj).selectpicker('destroy');
            if(cityList.length>0 && cityList!=='' && cityList!==undefined && cityList!==false){
                // iterate each city details 
                for(var eachCityDetailsArrIndex = 0; eachCityDetailsArrIndex<cityList.length; eachCityDetailsArrIndex++){
                    var cityValue = cityList[eachCityDetailsArrIndex]['cityId'];
                    var cityIcon = cityList[eachCityDetailsArrIndex]['cityIcon'];
                    var cityName = cityList[eachCityDetailsArrIndex]['cityName'];
                    var eachOptionStr = "<option class='citySuggestionOptionClass' data-icon='"+cityIcon+"' value='"+cityValue+"'>"+cityName+"</option>";
                    $(cityListSelectControlElementObj).append(eachOptionStr);
                }
            }
            // refresh city list select control element 
            $(cityListSelectControlElementObj).selectpicker('refresh');
            // showing default selected city
            $(cityListSelectControlElementObj).selectpicker('val', $rootScope.defaultedSelectedDKDeliveryCity);
            // apply change event on city list
            if($(cityListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDKDeliveryCityListlHtmlSelectControlOnChangeEvent(cityListSelectControlElementObj, cityDetailsLoadedOnPage);
            }
            // refresh dependency element
            $rootScope.refreshElementDependencyDeliveryCity();
        };
        
        // buildedDKDeliveryCityListlHtmlSelectControlOnChangeEvent
        $rootScope.buildedDKDeliveryCityListlHtmlSelectControlOnChangeEvent = function(elementObj, cityDetailsLoadedOnPage){
            // city details change by user then 
            $(elementObj).on('changed.bs.select', function(e){
                var paramObj = {"cityId":$(elementObj).selectpicker('val'), "cityName":$(elementObj).find('option:selected').text()};
                storeDefaultDeliveryCityDetailsInSessionStorage(paramObj, 'Y');
                $rootScope.defaultedSelectedDKDeliveryCity = ($(elementObj).selectpicker('val'));
                // refresh dk delivery area list, dk delivery city list, delivery desserts product type list
                $rootScope.refreshElementDependencyDeliveryCity(cityDetailsLoadedOnPage, 'Y');
            });
        };
        
        // refreshElementDependencyDeliveryCity
        $rootScope.refreshElementDependencyDeliveryCity = function(cityDetailsLoadedOnPage){
            $rootScope.isDkDeliveryCityChanged = false;
            $rootScope.isDkDeliveryAreaChanged = false;
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
            $rootScope.isDessertsProductTypeProductListLoaded = false;
            // refresh dk delivery area list, dk delivery city list, delivery desserts product type list
            if($rootScope.defaultedSelectedDKDeliveryCity!=='' && $rootScope.defaultedSelectedDKDeliveryCity!==false){
                $rootScope.isDkDeliveryCityChanged = true;
                // remove existing delivery area option list & refresh delivery area options list
                if($('#dkDeliveryAreaListWrapperDivId').length===1){
                    $('#dkDeliveryAreaListSelectCtrlId').find('option').remove();
                    angular.element('#dkDeliveryAreaListWrapperDivId').scope().loadDKDeliveryAreaList(cityDetailsLoadedOnPage);
                }
                // remove existing delivery area desserts product type option list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                }
            }
        };
        
        // loadDKDeliveryAreaList 
        $rootScope.loadDKDeliveryAreaList = function(loadAreaDetailsOnPage){
            try{
                if($rootScope.isDkDeliveryCityChanged===true){
                    // get param obj to dk delivery area details
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaDetails();
                    // console.log("loadDKDeliveryAreaList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling LocationServices to get dk delivery area list
                        LocationServices.getDKDeliveryAreaList(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaDetails', retResponseJson);
                                    if(retArrJsonObj!==false && retArrJsonObj!==undefined && retArrJsonObj!==''){
                                        storeDefaultDeliveryAreaDetailsInSessionStorage(retArrJsonObj.defaultSelectedDeliveryAreaDetails, 'N');
                                        if(retArrJsonObj.defaultSelectedDeliveryAreaDetails!==false){
                                            $rootScope.defaultedSelectedDKDeliveryArea = retArrJsonObj.defaultSelectedDeliveryAreaDetails['areaId'];
                                        }
                                        $rootScope.dkDeliveryAreaList = retArrJsonObj.allAreaList;
                                        $rootScope.buildDKDeliveryAreaListHtmlSelectControl($rootScope.dkDeliveryAreaList, loadAreaDetailsOnPage);
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.dkDeliveryAreaList = false;
                $rootScope.defaultedSelectedDKDeliveryArea = '';
                showHideLoaderBox('hide');
                console.log("problem in loadDKDeliveryAreaList ex=>"+ex);
            }
        };
        
        // buildDKDeliveryAreaListHtmlSelectControl
        $rootScope.buildDKDeliveryAreaListHtmlSelectControl = function(dkDeliveryAreaList, areaDetailsLoadedOnPage){
            var areaListSelectControlElementObj = document.getElementById("dkDeliveryAreaListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(areaListSelectControlElementObj).find('option').remove();
            $(areaListSelectControlElementObj).selectpicker('destroy');
            if(dkDeliveryAreaList.length>0 && dkDeliveryAreaList!=='' && dkDeliveryAreaList!==undefined && dkDeliveryAreaList!==false){
                // iterate each area details 
                for(var eachAreaDetailsArrIndex = 0; eachAreaDetailsArrIndex<dkDeliveryAreaList.length; eachAreaDetailsArrIndex++){
                    var areaValue = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaId'];
                    var areaIcon = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaIcon'];
                    var areaName = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaName'];
                    var eachOptionStr = "<option class='cityAreaSuggestionOptionClass' data-icon='"+areaIcon+"' value='"+areaValue+"'>"+areaName+"</option>";
                    $(areaListSelectControlElementObj).append(eachOptionStr);
                }
            }
            // refresh dk delivery area list select control element 
            $(areaListSelectControlElementObj).selectpicker('refresh');
            // showing default selected delivery area list
            $(areaListSelectControlElementObj).selectpicker('val', $rootScope.defaultedSelectedDKDeliveryArea);
            // apply change event of area list
            if($(areaListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDKDeliveryAreaListHtmlSelectControlOnChangeEvent(areaListSelectControlElementObj, areaDetailsLoadedOnPage);
            }
            // refresh dependency element on ui screen
            $rootScope.refreshElementDependencyDeliveryArea(areaDetailsLoadedOnPage);
            
        };
        
        // buildedDKDeliveryAreaListHtmlSelectControlOnChangeEvent
        $rootScope.buildedDKDeliveryAreaListHtmlSelectControlOnChangeEvent = function(elementObj, areaDetailsLoadedOnPage){
            $(elementObj).on('changed.bs.select', function(e){
                var paramObj = {"areaId":$(elementObj).selectpicker('val'), "areaName":$(elementObj).find('option:selected').text()};
                storeDefaultDeliveryAreaDetailsInSessionStorage(paramObj, 'Y');
                $rootScope.defaultedSelectedDKDeliveryArea =  ($('#dkDeliveryCityListSelectCtrlId').selectpicker('val'));
                // refresh desserts product type list based on city, area
                $rootScope.refreshElementDependencyDeliveryArea(areaDetailsLoadedOnPage);
            });
        };
        
        // refreshElementDependencyDeliveryArea
        $rootScope.refreshElementDependencyDeliveryArea = function(areaDetailsLoadedOnPage){
            $rootScope.isDkDeliveryCityChanged = true;
            $rootScope.isDkDeliveryAreaChanged = false;
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
            $rootScope.isDessertsProductTypeProductListLoaded = false;
            if($rootScope.defaultedSelectedDKDeliveryArea!=='' && $rootScope.defaultedSelectedDKDeliveryArea!==false){
                $rootScope.isDkDeliveryAreaChanged = true;
                // remove existing desserts product type list and add new one list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                    angular.element('#dkDeliveryAreaDessertsProductListWrapperDivId').scope().loadDKDeliveryAreaBasedProductTypeList($rootScope.isDkDeliveryAreaChanged, areaDetailsLoadedOnPage);
                }
            }
        };
        
        // loadDKDeliveryAreaBasedProductTypeList 
        $rootScope.loadDKDeliveryAreaBasedProductTypeList = function(isDkDeliveryAreaChanged, loadDessertsProductaDetailsOnPage){
            try{
                if(isDkDeliveryAreaChanged===true && $rootScope.isDkDeliveryAreaChanged===true){
                    // get param obj to product type details
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaBasedProductTypeDetails();
                    // console.log("loadDKDeliveryAreaBasedProductTypeList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling LocationServices to get dk delivery area based product type list
                        LocationServices.getDKDeliveryAreaBasedProductTypeList(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    // console.log("getDKDeliveryAreaBasedProductTypeList retResponseJson=>"+JSON.stringify(retResponseJson));
                                    var retArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaBasedProductTypeDetails', retResponseJson);
                                    if(retArrJsonObj!==false && retArrJsonObj!==undefined && retArrJsonObj!==''){
                                        if(retArrJsonObj.defaultSelectedAreaBasedProductTypeDetails!==false){
                                            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = retArrJsonObj.defaultSelectedAreaBasedProductTypeDetails['matchedProductTypeId'];
                                            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = retArrJsonObj.defaultSelectedAreaBasedProductTypeDetails['matchedProductTypeTitle'];
                                        }else{
                                            storeDefaultDeliveryDessertsProductTypeDetailsInSessionStorage(false, 'Y');
                                        }
                                        $rootScope.dkDeliveryAreaBasedProductTypeList = retArrJsonObj.allProductTypeList;
                                        $rootScope.buildDKDeliveryAreaBasedProductListHtmlSelectControl($rootScope.dkDeliveryAreaBasedProductTypeList, loadDessertsProductaDetailsOnPage);
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.dkDeliveryAreaBasedProductTypeList = false;
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
                showHideLoaderBox('hide');
                console.log("problem in loadDKDeliveryAreaBasedProductTypeList ex=>"+ex);
            }
        };
        
        // buildDKDeliveryAreaBasedProductListHtmlSelectControl
        $rootScope.buildDKDeliveryAreaBasedProductListHtmlSelectControl = function(allDessertsProductTypeList, loadDessertsProductaDetailsOnPage){
            var productTypeListSelectControlElementObj = document.getElementById("dkDeliveryAreaDessertsProductListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(productTypeListSelectControlElementObj).find('option').remove();
            $(productTypeListSelectControlElementObj).selectpicker('destroy');
            if(allDessertsProductTypeList.length>0 && allDessertsProductTypeList!=='' 
                && allDessertsProductTypeList!==undefined && allDessertsProductTypeList!==false){
                // iterate each product type details 
                for(var eachProductTypeDetailsArrIndex = 0; eachProductTypeDetailsArrIndex<allDessertsProductTypeList.length; eachProductTypeDetailsArrIndex++){
                    var producttypeValue = allDessertsProductTypeList[eachProductTypeDetailsArrIndex]['productTypeId'];
                    var productIcon = allDessertsProductTypeList[eachProductTypeDetailsArrIndex]['productIcon'];
                    var productTypeTitle = allDessertsProductTypeList[eachProductTypeDetailsArrIndex]['productTypeTitle'];
                    var eachOptionStr = "<option class='deliveryAreaBasedProductTypeSuggestionOptionClass' data-icon='"+productIcon+"' value='"+producttypeValue+"'>"+productTypeTitle+"</option>";
                    $(productTypeListSelectControlElementObj).append(eachOptionStr);
                }
            }
            // refresh producttype list select control element 
            $(productTypeListSelectControlElementObj).selectpicker('refresh');
            // showing default selected desserts product type list
            $(productTypeListSelectControlElementObj).selectpicker('val', $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue);
            // applying change event function
            if($(productTypeListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDKDeliveryAreaBasedProductTypeListlHtmlSelectControlOnChangeEvent(productTypeListSelectControlElementObj);
            }
            // refresh dependency element on ui screen
            $rootScope.refreshElementDependencyDeliveryAreabasedDessertsProductType();
        };
        
        // buildedDKDeliveryAreaBasedProductTypeListlHtmlSelectControlOnChangeEvent
        $rootScope.buildedDKDeliveryAreaBasedProductTypeListlHtmlSelectControlOnChangeEvent = function(elementObj){
            // product type details change by user then 
            $(elementObj).on('changed.bs.select', function(e){
                var productTypeId = ($(elementObj).selectpicker('val'));
                var productTypeTitle = ($(elementObj).find('option:selected').text());
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = productTypeId;
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = productTypeTitle;
                // refresh dependency element on ui screen
                $rootScope.refreshElementDependencyDeliveryAreabasedDessertsProductType();
            });
        };
       
        // refreshElementDependencyDeliveryAreabasedDessertsProductType
        $rootScope.refreshElementDependencyDeliveryAreabasedDessertsProductType = function(){
            $rootScope.isDessertsProductTypeProductListLoaded = false;
            if($rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue!==false
                && $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue!==''
                && $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle!==false
                && $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle!==''){  
                var paramObj = {
                    "matchedProductTypeId":$rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue,
                    "matchedProductTypeTitle":$rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle
                };
                storeDefaultDeliveryDessertsProductTypeDetailsInSessionStorage(paramObj, 'Y');
                // refresh all desserts product type list at dashboard level only
                $rootScope.isDessertsProductTypeProductListLoaded = true;
                angular.element('#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId').scope().loadDkDeliveryAreabasedDessertsKhazanaServedDessertsProductTypeList();
                // refresh each desserts product type products list at dashboard level only
                var preparedParamObj = {};
                preparedParamObj['productTypeId'] = $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue;
                preparedParamObj['productTypeTitle'] = $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle;
                $rootScope.collectDataToLoadProductTypeAllProductListForDashboarLevel(preparedParamObj);
            } 
        };
       
        // collectDataToLoadProductTypeAllProductListForDashboarLevel, delivery area based on
        $rootScope.collectDataToLoadProductTypeAllProductListForDashboarLevel = function(preparedParamObj){
            try{   
                var retStatus = checkAllParamToViewDessertsProducTypeProductListDashboardLevel(preparedParamObj);
                if(retStatus===true){
                    // refresh delivery area based product type list dropdown
                    // refresh producttype list select control element 
                    var productTypeId = preparedParamObj['productTypeId'];
                    var productTypeListSelectControlElementObj = document.getElementById("dkDeliveryAreaDessertsProductListSelectCtrlId");
                    $(productTypeListSelectControlElementObj).selectpicker('refresh');
                    $(productTypeListSelectControlElementObj).selectpicker('val', productTypeId);
                    // refresh dashboard level product type all product list
                    angular.element('#dashboardLevelAllProductTypeProductListContainerDivId').scope().loadProductTypeProductCategoryProductListForDashboardLevel();
                }
            }catch(ex){
                console.log("problem in collectDataToLoadProductTypeAllProductListForDashboarLevel=>"+ex);
            }
        };
        
    }catch(ex){
        console.log("problem in location controller ex=>"+ex);
    }
});


// PartyOrdersController
app.controller('PartyOrdersController', function($scope, $rootScope, $http, PartyOrdersServices){
    try{
        
        $rootScope.isShowPartyOrderRequestErrorMsg = false;
        $rootScope.isShowPartyOrderRequestFormContent = true;
        $rootScope.isShowPartyOrderRequestSendThankyouMsg = false;
        $rootScope.partyOrderErrorMsgStr = '';
        
        // redirectToViewPartyOrderRequest 
        $rootScope.redirectToViewPartyOrderRequest = function(){
            try{
                // get param obj to get related city details
                var retStatus = checkParamDataToRedirectForRequestPartyOrder();
                // console.log("redirectToRequestPartyOrder retStatus=>"+retStatus);
                if(retStatus===true){
                    window.location.href =  globalBaseSitePath+"partyorder.php";
                }
            }catch(ex){
                console.log("problem in redirectToViewPartyOrderRequest ex=>"+ex);
            }
        };
        
        // attachedFieldValidationPartyOrdersRequest
        $rootScope.attachedFieldValidationPartyOrdersRequest = function(){
            try{
                attachedFieldValidationPartyOrdersRequest();
            }catch(ex){
                console.log("problem in attachedFieldValidationPartyOrdersRequsest ex=>"+ex);
            }
        };
        
        // addPartyOrderRequest 
        $rootScope.addPartyOrdersRequest = function(){
            try{
                var retValidateParamDataStatus = validateParamDataPartyOrderRequest();
                if(retValidateParamDataStatus===false){
                    $rootScope.isShowPartyOrderRequestErrorMsg = true;
                    $rootScope.partyOrderErrorMsgStr = 'Please fill-up form details to send request party order !';
                }else{
                    // get param obj to add party order request
                    var preparedParamJsonObj = getParamDataObjForPartyOrderRequest();
                    // console.log("loadDKDeliveryAreaBasedProductTypeList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling PartyOrdersServices to add party order request
                        PartyOrdersServices.addPartyOrderRequest(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    // console.log("addPartyOrdersRequest retResponseJson=>"+JSON.stringify(retResponseJson));
                                    var retStatus = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'isPartyOrderRequestSend', retResponseJson);
                                    if(retStatus==='YES'){
                                        clearPartyOrderRequestFormField();
                                        $rootScope.isShowPartyOrderRequestFormContent = false;
                                        $rootScope.isShowPartyOrderRequestSendThankyouMsg = true;
                                    }else{
                                        $rootScope.isShowPartyOrderRequestErrorMsg = true;
                                        $rootScope.partyOrderErrorMsgStr = 'Please try again to send request party order !';
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                console.log("problem in addPartyOrderRequest ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
    }catch(ex){
        console.log("problem in PartyOrdersController ex=>"+ex);
    }
});


// CustomizeOrderController
app.controller('CustomizeOrdersController', function($scope, $rootScope, $http, CustomizeOrdersServices){
    try{
        
        $rootScope.isShowCustomizeOrderRequestErrorMsg = false;
        $rootScope.isShowCustomizeOrderRequestFormContent = true;
        $rootScope.isShowCustomizeOrderRequestSendThankyouMsg = false;
        $rootScope.customizeOrderErrorMsgStr = '';
        
        // redirectToViewCustomizeOrderRequest 
        $rootScope.redirectToViewCustomizeOrderRequest = function(){
            try{
                // get param obj to get related city details
                var retStatus = checkParamDataToRedirectForRequestCustomizeOrder();
                // console.log("redirectToViewCustomizeOrderRequest retStatus=>"+retStatus);
                if(retStatus===true){
                    window.location.href =  globalBaseSitePath+"customizeorder.php";
                }
            }catch(ex){
                console.log("problem in redirectToViewCustomizeOrderRequest ex=>"+ex);
            }
        };
        
        // attachedFieldValidationCustomizeOrdersRequest
        $rootScope.attachedFieldValidationCustomizeOrdersRequest = function(){
            try{
                attachedFieldValidationCustomizeOrdersRequest();
            }catch(ex){
                console.log("problem in attachedFieldValidationCustomizeOrdersRequest ex=>"+ex);
            }
        };
        
        // addCustomizeOrdersRequest 
        $rootScope.addCustomizeOrdersRequest = function(){
            try{
                var retValidateParamDataStatus = validateParamDataCustomizeOrderRequest();
                if(retValidateParamDataStatus===false){
                    $rootScope.isShowCustomizeOrderRequestErrorMsg = true;
                    $rootScope.customizeOrderErrorMsgStr = 'Please fill-up form details to send request customize order !';
                }else{
                    // get param obj to add customize order request
                    var preparedParamJsonObj = getParamDataObjForCustomizeOrderRequest();
                    // console.log("addCustomizeOrdersRequest preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling CustomizeOrdersServices to add customize order request
                        CustomizeOrdersServices.addCustomizeOrderRequest(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    // console.log("addPartyOrdersRequest retResponseJson=>"+JSON.stringify(retResponseJson));
                                    var retStatus = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'isCustomizeOrderRequestSend', retResponseJson);
                                    if(retStatus==='YES'){
                                        clearCustomizeOrderRequestFormField();
                                        $rootScope.isShowCustomizeOrderRequestFormContent = false;
                                        $rootScope.isShowCustomizeOrderRequestSendThankyouMsg = true;
                                    }else{
                                        $rootScope.isShowCustomizeOrderRequestErrorMsg = true;
                                        $rootScope.customizeOrderErrorMsgStr = 'Please try again to send request customize order !';
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                console.log("problem in addCustomizeOrderRequest ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
    }catch(ex){
        console.log("problem in CustomizeOrdersController ex=>"+ex);
    }
});


// CorporateTieupController
app.controller('CorporateTieupController', function($scope, $rootScope, $http, CorporateTieupServices){
    try{
        
        $rootScope.isShowCorporateTieupRequestErrorMsg = false;
        $rootScope.isShowCorporateTieupRequestFormContent = true;
        $rootScope.isShowCorporateTieupRequestSendThankyouMsg = false;
        $rootScope.corporateTieupErrorMsgStr = '';
        
        // redirectToViewCorporateTieupRequest 
        $rootScope.redirectToViewCorporateTieupRequest = function(){
            try{
                // get param obj
                var retStatus = checkParamDataToRedirectForRequestCorporateTieup();
                // console.log("redirectToViewCorporateTieupRequest retStatus=>"+retStatus);
                if(retStatus===true){
                    window.location.href =  globalBaseSitePath+"corporatetieup.php";
                }
            }catch(ex){
                console.log("problem in redirectToViewCorporateTieupRequest ex=>"+ex);
            }
        };
        
        // attachedFieldValidationCorporateTieupOrdersRequest
        $rootScope.attachedFieldValidationCorporateTieupRequest = function(){
            try{
                attachedFieldValidationCorporateTieupRequest();
            }catch(ex){
                console.log("problem in attachedFieldValidationCorporateTieupRequest ex=>"+ex);
            }
        };
        
        // addCorporateTieupRequest 
        $rootScope.addCorporateTieupRequest = function(){
            try{
                var retValidateParamDataStatus = validateParamDataCorporateTieupRequest();
                if(retValidateParamDataStatus===false){
                    $rootScope.isShowCorporateTieupRequestErrorMsg = true;
                    $rootScope.corporateTieupErrorMsgStr = 'Please fill-up form details to send request for corporate tieup !';
                }else{
                    // get param obj to add corporate tie-up request
                    var preparedParamJsonObj = getParamDataObjForCorporateTieupRequest();
                    // console.log("addCorporateTieupRequest preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling CorporateTieupServices to add corporate tieup request
                        CorporateTieupServices.addingCorporateTieupRequest(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    // console.log("addPartyOrdersRequest retResponseJson=>"+JSON.stringify(retResponseJson));
                                    var retStatus = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'isCorporateTieupRequestSend', retResponseJson);
                                    if(retStatus==='YES'){
                                        clearCustomizeOrderRequestFormField();
                                        $rootScope.isShowCorporateTieupRequestFormContent = false;
                                        $rootScope.isShowCorporateTieupRequestSendThankyouMsg = true;
                                    }else{
                                        $rootScope.isShowCorporateTieupRequestErrorMsg = true;
                                        $rootScope.corporateTieupErrorMsgStr = 'Please try again to send request for corporate tie-up !';
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                console.log("problem in addCorporateTieupRequest ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
    }catch(ex){
        console.log("problem in corporate tieup controller ex=>"+ex);
    }
});


// ProductTypeProductCategoryProductDetailsController
app.controller('ProductTypeProductCategoryProductDetailsController', function($scope, $rootScope, $http, ProductServices, LocationServices){
    try{
        
        $rootScope.productViewAllFilterPopDivClass = '';
        $rootScope.isShowViewAllProductFilter = false;
        $rootScope.toggleViewAllProductFilterBtnLabel = "SHOW FILTER";
        
        // loadDkDeliveryAreabasedDessertsKhazanaServedDessertsProductTypeList 
        $rootScope.loadDkDeliveryAreabasedDessertsKhazanaServedDessertsProductTypeList = function(){
            try{
                // get param obj to product type details
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaBasedProductTypeDetails();
                // console.log("loadDkDeliveryAreabasedDessertsKhazanaServedDessertsProductTypeList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    $rootScope.deliveryAreabasedDkServedDessertsProductTypeList = false;

                    var fetchAreaParamJsonObj = {};
                    fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    // calling LocationServices to get dk delivery area based product type list
                    LocationServices.getDKDeliveryAreaBasedProductTypeList(fetchAreaParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaBasedProductTypeDetails', retResponseJson);
                                if(retArrJsonObj!==false && retArrJsonObj!==undefined && retArrJsonObj!==''){
                                    $rootScope.isDessertsProductTypeProductListLoaded = true;
                                    $rootScope.deliveryAreabasedDkServedDessertsProductTypeList = retArrJsonObj.allProductTypeList;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadDkDeliveryAreabasedDessertsKhazanaServedDessertsProductTypeList ex=>"+ex);
                $rootScope.deliveryAreabasedDkServedDessertsProductTypeList = false;
                showHideLoaderBox('hide');
            }
        };
        
        // loadProductTypeProductCategoryProductListForDashboardLevel 
        $rootScope.loadProductTypeProductCategoryProductListForDashboardLevel = function(){
            try{
                // get param obj to product type ka product list
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDashboardLevelProduct();
                console.log("loadProductTypeProductCategoryProductListForDashboardLevel preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.allProductTypeProductCategoryProductListForDashBoardLevel = false;
                    $rootScope.defaultDKServedDessertsProductType = '';
                    $rootScope.productTypeProductCategoryProductListNotFoundForDashBoardLevelMsgStr = '';
                    
                    // calling ProductServices 
                    ProductServices.getProductTypeProductCategoryProductListForDashboardLevel(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadProductTypeProductCategoryProductListForDashboardLevel retObj=>"+JSON.stringify(retObj));
                                    storeDefaultDessertsProductTypeDetailsDashboardLevelInSessionStorage(retObj.defaultSelectedProductTypeDetails);
                                    $rootScope.defaultDKServedDessertsProductType = retObj.defaultSelectedProductTypeDetails['matchedProductTypeTitle'];
                                    $rootScope.allProductTypeProductCategoryProductListForDashBoardLevel = retObj.allProductTypeProductCategoryProductList;
                                    $rootScope.productTypeProductCategoryProductListNotFoundForDashBoardLevelMsgStr = '';
                                }
                            }else{
                                $rootScope.dashBoardLevelNotFoundProductTypeProductCategoryProductListMsgStr = 'No product found !';
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.allProductTypeProductCategoryProductListForDashBoardLevel = false;
                $rootScope.defaultDKServedDessertsProductType = '';
                $rootScope.productTypeProductCategoryProductListNotFoundForDashBoardLevelMsgStr = 'No product found !';
                console.log("problem in productTypeProductCategoryProductListForDashBoardLevel ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // viewProductDetails
        $rootScope.viewProductDetails = function(paramObj){
            try{
                var rtStatus = checkAllParamToViewProductDetails(paramObj);
                if(rtStatus===true){
                    // redirect to view product details
                    window.location.href = globalBaseSitePath+"viewproduct.php";
                }
            }catch(ex){
                console.log("problem in viewProductDetails ex=>"+ex);
            }
        };
        
        // collectDataToLoadDeliveryAreabasedProductTypeAllProductList, delivery area based on
        $rootScope.collectDataToViewDeliveryAreabasedProductTypeAllProductList = function(preparedParamObj){
            try{
                var retStatus = checkAllParamToViewAllProducts(preparedParamObj);
                if(retStatus===true){
                    window.location.href = globalBaseSitePath+"allproducts.php";
                }
            }catch(ex){
                console.log("problem in collectDataToLoadDeliveryAreabasedProductTypeAllProductList=>"+ex);
            }
        };
        
        // loadProductTypeProductCategoryProductDetails 
        $rootScope.loadProductTypeProductCategoryProductDetails = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjFromSessionForLoadingProductTypeProductCategoryProductDetails();
                // console.log("loadProductTypeProductCategoryProductDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.vPDetails = false;
                    
                    // calling ProductServices to get product details
                    ProductServices.getProductTypeProductCategoryProductDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    //console.log("loadProductTypeProductCategoryProductDetails retObj=>"+JSON.stringify(retObj));
                                    $rootScope.vPDetails = retObj.viewProductDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.vPDetails = false;
                console.log("problem in loadProductTypeProductCategoryProductDetails ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // loadProductDescriptionDetails 
        $rootScope.loadProductDescriptionDetails = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForLoadingProductDescriptionDetails();
                // console.log("loadProductDescriptionDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.productDescriptionDetailsArr = false;
                    $rootScope.isProductDescriptionDetailsFound = false;
                    
                    // calling ProductServices 
                    ProductServices.getProductDescriptionDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadProductDescriptionDetails retObj=>"+JSON.stringify(retObj));
                                    $rootScope.isProductDescriptionDetailsFound = retObj.isProductDescriptionDetailsFound;
                                    $rootScope.productDescriptionDetailsArr = retObj.descriptionDetailsArr;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.isProductDescriptionDetailsFound = false;
                $rootScope.productDescriptionDetailsArr = false;
                console.log("loadProductTypeProductCategoryProductDetails ex=>"+ex);
            }
        };
        
        // changing product measurement  change code here
        $('#productMeasurementSelectCtrlId').on('change', function(){
            var productMeasurementValue = $(this).find('option:selected').val();
            if(productMeasurementValue!=='' && productMeasurementValue!==false){
                var productPrice = $(this).find('option:selected').attr("data-productprice");
                $('.onlineProductSellingPriceTextClass').empty().append(productPrice);
            }
        });
        
        // loadProductTypeProductCategoryAllProductList 
        $rootScope.loadProductTypeProductCategoryAllProductList = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjForLoadingProductTypeProductCategoryAllProductList();
                // console.log("loadProductTypeProductCategoryAllProductList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.defaultSelectProductCategoryTitle = '';
                    $rootScope.defaultSelectProductCategoryValue = '';
                    $rootScope.productCategoryList = false;
                    $rootScope.allProductDetailsList = false;
                    $rootScope.notFoundProductMsgStr = '';
                    
                    // calling ProductServices to get all product list
                    ProductServices.getProductTypeProductCategoryAllProductList(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    //console.log("loadProductTypeProductCategoryAllProductList retObj=>"+JSON.stringify(retObj));
                                    if(retObj.productTypeDetails.productCategoryList!==false){
                                        $rootScope.productCategoryList = retObj.productTypeDetails.productCategoryList;
                                    }
                                    $rootScope.defaultSelectProductCategoryTitle = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                    if(retObj.productTypeDetails.defaultSelectProductCategoryValue!==''){
                                        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = retObj.productTypeDetails.defaultSelectProductCategoryValue;
                                        existingDkParamObj['userProduct']['producttype_categoryname'] = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                                    }
                                    if(retObj.productTypeDetails.allShopStoresDetailsArr!==false && retObj.productTypeDetails.allShopStoresDetailsArr!==undefined){
                                        $rootScope.buildAllProductShopStoresFilterListHtmlSelectControl(retObj.productTypeDetails.allShopStoresDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductPriceDetailsArr!==false && retObj.productTypeDetails.allProductPriceDetailsArr!==undefined){
                                        $rootScope.buildAllProductPriceFilterListHtmlSelectControl(retObj.productTypeDetails.allProductPriceDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductSizeDetailsArr!==false && retObj.productTypeDetails.allProductSizeDetailsArr!==undefined){
                                        $rootScope.buildAllProductSizeFilterListHtmlSelectControl(retObj.productTypeDetails.allProductSizeDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductDiscountDetailsArr!==false && retObj.productTypeDetails.allProductDiscountDetailsArr!==undefined){
                                        $rootScope.buildAllProductDiscountFilterListHtmlSelectControl(retObj.productTypeDetails.allProductDiscountDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductDetailsList!==false && retObj.productTypeDetails.allProductDetailsList!==undefined){
                                        $rootScope.allProductDetailsList = retObj.productTypeDetails.allProductDetailsList;
                                    }else{
                                        $rootScope.notFoundProductMsgStr = 'No products found used proper filter';
                                    }
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.allProductDetailsList = false;
                $rootScope.notFoundProductMsgStr = 'No products found used proper filter';
                console.log("problem in loadProductTypeProductCategoryAllProductList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // buildAllProductShopStoresFilterListHtmlSelectControl
        $rootScope.buildAllProductShopStoresFilterListHtmlSelectControl = function(allShopStoreList){
            try{
                var defaultedSelectedShopStore = '';
                var shopStoreFilterListSelectControlElementObj = document.getElementById("allShopStoresFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(shopStoreFilterListSelectControlElementObj).find('option').remove();
                $(shopStoreFilterListSelectControlElementObj).selectpicker('destroy');
                if(allShopStoreList.length>0 && allShopStoreList!=='' && allShopStoreList!==undefined && allShopStoreList!==false){
                    // iterate each shopstore details
                    for(var eachShopstoreDetailsArrIndex = 0; eachShopstoreDetailsArrIndex<allShopStoreList.length; eachShopstoreDetailsArrIndex++){
                        if(allShopStoreList[eachShopstoreDetailsArrIndex]['isRequestedShopstoresMatched']==='Y'){
                            defaultedSelectedShopStore = allShopStoreList[eachShopstoreDetailsArrIndex]['shopStoresId'];
                        }
                        var dataIconstr = 'fa fa-user';
                        var shopStoreValue = allShopStoreList[eachShopstoreDetailsArrIndex]['shopStoresId'];
                        var shopStoreTitle = allShopStoreList[eachShopstoreDetailsArrIndex]['shopStoresTitle'];
                        var eachOptionStr = "<option class='shopstoreFilterOperationOptionClass' data-icon='"+dataIconstr+"' value='"+shopStoreValue+"'>"+shopStoreTitle+"</option>";
                        $(shopStoreFilterListSelectControlElementObj).append(eachOptionStr);
                    }
                }
                // refresh shopstore list select control element 
                $(shopStoreFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected shopstore 
                if((defaultedSelectedShopStore).length===32){
                    $(shopStoreFilterListSelectControlElementObj).selectpicker('val', defaultedSelectedShopStore);
                }
                // apply function event
                if($(shopStoreFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedProductShopStoreFilterListHtmlSelectControlOnChangeEvent(shopStoreFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllProductShopStoresFilterListHtmlSelectControl=>"+ex);
            }
        };
        
        // buildedProductShopStoreFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedProductShopStoreFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedShopStoreValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(shopstore value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['shopstore_value'] = '';
                    if(selectedShopStoreValues!=='' && (selectedShopStoreValues).length===32 && selectedShopStoreValues!==null){
                        existingDkParamObj['userProduct']['shopstore_value'] = selectedShopStoreValues;
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedShopStoreFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // buildAllProductPriceFilterListHtmlSelectControl
        $rootScope.buildAllProductPriceFilterListHtmlSelectControl = function(allProductPriceDetails){
            try{    
                var defaultSelectedAllProductPriceFilterArr = new Array();
                var productPriceFilterListSelectControlElementObj = document.getElementById("allProductPriceFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(productPriceFilterListSelectControlElementObj).find('option').remove();
                $(productPriceFilterListSelectControlElementObj).selectpicker('destroy');
                if(jQuery.isEmptyObject(allProductPriceDetails)===false && allProductPriceDetails!=='' 
                    && allProductPriceDetails!==undefined && allProductPriceDetails!==false){
                    // price sorting data prepared
                    var allPriceSortingListArr = allProductPriceDetails['sortingList'];
                    if(allPriceSortingListArr.length>0 && allPriceSortingListArr!==false){
                        // iterate each price sorting details
                        var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                        for(var eachPriceSortingDetailsArrIndex = 0; eachPriceSortingDetailsArrIndex<allPriceSortingListArr.length; eachPriceSortingDetailsArrIndex++){
                            var dataIconStr = 'fa fa-sort-amount-asc';
                            var priceSortingValue = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortValue'];
                            var priceSortingTitle = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortTitle'];
                            if(priceSortingValue==='hightolow'){
                                dataIconStr = 'fa fa-sort-amount-desc';
                            }
                            var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceSortingValue+"'>"+priceSortingTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                            if(allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['isRequestedPriceSortedMatched']==='Y'){
                                defaultSelectedAllProductPriceFilterArr.push(priceSortingValue);
                            }
                        }
                        $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                    // price range data prepared
                    var allPriceRangeList = allProductPriceDetails['rangeList'];
                    if(allPriceRangeList.length>0 && allPriceRangeList!==false){
                        var optionGroupStr = "<optgroup label='Price Range (Multiple selection)'>";
                        // iterate each price range details
                        for(var eachPriceRangeDetailsArrIndex = 0; eachPriceRangeDetailsArrIndex<allPriceRangeList.length; eachPriceRangeDetailsArrIndex++){
                            var dataIconStr = 'fa fa-inr';
                            var priceRangeValue = allPriceRangeList[eachPriceRangeDetailsArrIndex]['priceRangeValue'];
                            var priceRangeTitle = allPriceRangeList[eachPriceRangeDetailsArrIndex]['priceRangeTitle'];
                            var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceRangeValue+"'>"+priceRangeTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                            if(allPriceRangeList[eachPriceRangeDetailsArrIndex]['isRequestedPriceRangeMatched']==='Y'){
                                defaultSelectedAllProductPriceFilterArr.push(priceRangeValue);
                            }
                        }
                        $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                }
                // refresh product price range list select control element 
                $(productPriceFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected product price filter 
                if(defaultSelectedAllProductPriceFilterArr.length>0){
                    $(productPriceFilterListSelectControlElementObj).selectpicker('val', defaultSelectedAllProductPriceFilterArr);
                }
                // apply function event
                if($(productPriceFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedProductPriceFilterListHtmlSelectControlOnChangeEvent(productPriceFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllProductPriceFilterListHtmlSelectControl=>"+ex);
            }    
        };
        
        // buildedProductPriceFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedProductPriceFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            $(elementObj).on('changed.bs.select', function(e){
                try{
                    var selectedPriceFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(price filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_price_filter'] = '';
                    if(selectedPriceFilterValues!=='' && selectedPriceFilterValues!==false && selectedPriceFilterValues!==null){
                        existingDkParamObj['userProduct']['product_price_filter'] = (selectedPriceFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                }catch(ex){
                    console.log("problem in buildedProductPriceFilterListHtmlSelectControlOnChangeEvent=>"+ex);
                }    
            });
        };
        
        // buildAllProductSizeFilterListHtmlSelectControl
        $rootScope.buildAllProductSizeFilterListHtmlSelectControl = function(allProductSizeDetails){
            try{
                var defaultedSelectedProductSize = '';
                var productSizeFilterListSelectControlElementObj = document.getElementById("allProductSizeFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(productSizeFilterListSelectControlElementObj).find('option').remove();
                $(productSizeFilterListSelectControlElementObj).selectpicker('destroy');
                if(jQuery.isEmptyObject(allProductSizeDetails)===false && allProductSizeDetails!=='' 
                    && allProductSizeDetails!==undefined && allProductSizeDetails!==false){
                    var allProductSizeList = allProductSizeDetails['rangeList'];
                    // iterate each product size details
                    var optionGroupStr = "<optgroup label='Size Range (Multiple selection)'>";
                    for(var eachProductSizeArrIndex = 0; eachProductSizeArrIndex<allProductSizeList.length; eachProductSizeArrIndex++){
                        var productSizeValue = allProductSizeList[eachProductSizeArrIndex]['sizeRangeValue'];
                        var optionStr = "<option class='productSizeFilterOperationOptionClass' value='"+productSizeValue+"'>"+productSizeValue+"</option>";
                        optionGroupStr+= optionStr;
                        if(allProductSizeList[eachProductSizeArrIndex]['isRequestedSizeRangeMatched']==='Y'){
                            defaultedSelectedProductSize = allProductSizeList[eachProductSizeArrIndex]['sizeRangeValue'];
                        }
                    }
                    $(productSizeFilterListSelectControlElementObj).append(optionGroupStr);
                }
                // refresh product size list select control element 
                $(productSizeFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected product size 
                if(defaultedSelectedProductSize!=='' && defaultedSelectedProductSize!==false){
                    $(productSizeFilterListSelectControlElementObj).selectpicker('val', defaultedSelectedProductSize);
                }
                // apply event
                if($(productSizeFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedProductSizeFilterListHtmlSelectControlOnChangeEvent(productSizeFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllProductSizeFilterListHtmlSelectControl=>"+ex);
            } 
        };
        
        // buildedProductSizeFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedProductSizeFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedSizeFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(size filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_size_filter'] = '';
                    if(selectedSizeFilterValues!=='' && selectedSizeFilterValues!==false && selectedSizeFilterValues!==null){
                        existingDkParamObj['userProduct']['product_size_filter'] = (selectedSizeFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedProductSizeFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // buildAllProductDiscountFilterListHtmlSelectControl
        $rootScope.buildAllProductDiscountFilterListHtmlSelectControl = function(allProductDiscountDetails){
            var defaultSelectedAllProductDiscountFilterArr = new Array();
            var productDiscountFilterListSelectControlElementObj = document.getElementById("allProductDiscountFilterListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(productDiscountFilterListSelectControlElementObj).find('option').remove();
            $(productDiscountFilterListSelectControlElementObj).selectpicker('destroy');
            if(jQuery.isEmptyObject(allProductDiscountDetails)===false && allProductDiscountDetails!=='' 
                && allProductDiscountDetails!==undefined && allProductDiscountDetails!==false){
                var allDiscountSortingListArr = allProductDiscountDetails['sortingList'];
                if(allDiscountSortingListArr.length>0 && allDiscountSortingListArr!==false){
                    // iterate each price sorting details
                    var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                    for(var eachDiscountSortingDetailsArrIndex = 0; eachDiscountSortingDetailsArrIndex<allDiscountSortingListArr.length; eachDiscountSortingDetailsArrIndex++){
                        var dataIconStr = 'fa fa-sort-amount-asc';
                        var discountSortingValue = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortValue'];
                        var discountSortingTitle = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortTitle'];
                        if(discountSortingValue==='hightolow'){
                            dataIconStr = 'fa fa-sort-amount-desc';
                        }
                        var eachOptionStr = "<option class='discountFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+discountSortingValue+"'>"+discountSortingTitle+"</option>";
                        optionGroupStr+= eachOptionStr;
                        if(allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['isRequestedDiscountSortedMatched']==='Y'){
                            defaultSelectedAllProductDiscountFilterArr.push(discountSortingValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
                var allDiscountRangeList = allProductDiscountDetails['rangeList'];
                if(allDiscountRangeList.length>0 && allDiscountRangeList!==false){
                    var optionGroupStr = "<optgroup label='Discount Range (Multiple selection)'>";
                    // iterate each price range details
                    for(var eachDiscountRangeDetailsArrIndex = 0; eachDiscountRangeDetailsArrIndex<allDiscountRangeList.length; eachDiscountRangeDetailsArrIndex++){
                        var discountRangeValue = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeValue'];
                        var discountRangeTitle = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeTitle'];
                        var eachOptionStr = "<option class='discountFilterOperationOptionClass' value='"+discountRangeValue+"'>"+discountRangeTitle+"</option>";
                        optionGroupStr+= eachOptionStr;
                        if(allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['isRequestedDiscountRangeMatched']==='Y'){
                            defaultSelectedAllProductDiscountFilterArr.push(discountRangeValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
            }
            // refresh product discount filter list select control element 
            $(productDiscountFilterListSelectControlElementObj).selectpicker('refresh');
            // default selected product size 
            if(defaultSelectedAllProductDiscountFilterArr.length>0){
                $(productDiscountFilterListSelectControlElementObj).selectpicker('val', defaultSelectedAllProductDiscountFilterArr);
            }
            if($(productDiscountFilterListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDiscountFilterListHtmlSelectControlOnChangeEvent(productDiscountFilterListSelectControlElementObj);
            }
        };
        
        // buildedDiscountFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedDiscountFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedDiscountFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(discount filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_discount_filter'] = '';
                    if(selectedDiscountFilterValues!=='' && selectedDiscountFilterValues!==false && selectedDiscountFilterValues!==null){
                        existingDkParamObj['userProduct']['product_discount_filter'] = (selectedDiscountFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedDiscountFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // toggleViewAllProductFilterContainer
        $rootScope.toggleViewAllProductFilterContainer = function(){
            if($rootScope.isShowViewAllProductFilter===false){
                $rootScope.toggleViewAllProductFilterBtnLabel = 'HIDE FILTER';
                $rootScope.isShowViewAllProductFilter = true;
                $rootScope.productViewAllFilterPopDivClass = 'vap_productFilterOperationContainerDivClass';
            }else{
                $rootScope.toggleViewAllProductFilterBtnLabel = 'SHOW FILTER';
                $rootScope.productViewAllFilterPopDivClass = '';
                $rootScope.isShowViewAllProductFilter = false;
            }
        };
        
    }catch(ex){
        console.log("problem in ProductTypeProductCategoryProductDetailsController ex=>"+ex);
    }
    
});


// RatingReviewController
app.controller('RatingReviewController', function($scope, $rootScope, $http, RatingReviewServices){
    try{
        
        // loadAverageRatingReviewedAboutProduct 
        $rootScope.loadAverageRatingReviewedAboutProduct = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                // console.log("loadAverageRatingReviewedAboutProduct preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.avgRatingReviewedAboutProductDetails = false;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.getAverageRatingReviewAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadAverageRatingReviewedAboutProduct retObj=>"+JSON.stringify(retObj));
                                    $rootScope.avgRatingReviewedAboutProductDetails = retObj.avgRatingReviewedAboutProductDetails;
                                }
                            }
                        });
                    });
                    
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.avgRatingReviewedAboutProductDetails = false;
                console.log("problem in loadAverageRatingReviewedAboutProduct ex=>"+ex);
            }
        };
        
        // loadMaxAverageRatingReviewedAboutProduct 
        $rootScope.loadMaxAverageRatingReviewedAboutProduct = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                // console.log("loadMaxAverageRatingReviewedAboutProduct preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.maxRatingAndReviewedTypeDetailsArr = false;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.getMaxRatingReviewAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadMaxAverageRatingReviewedAboutProduct retObj=>"+JSON.stringify(retObj));
                                    $rootScope.maxRatingAndReviewedTypeDetailsArr = retObj.maxRatingAndReviewedTypeDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.maxRatingAndReviewedTypeDetailsArr = false;
                console.log("problem in loadMaxAverageRatingReviewedAboutProduct ex=>"+ex);
            }
        };
        
        // loadRatingReviewQuestionsAboutProductByShopStores 
        $rootScope.loadRatingReviewQuestionsAboutProductByShopStores = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                // console.log("loadRatingReviewQuestionsAboutProductByShopStores preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = false;
                    $rootScope.isRatingReviewQuestionDetailsFound = false;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.getShopStoreRatingReviewQuestionsAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadRatingReviewQuestionsAboutProductByShopStores retObj=>"+JSON.stringify(retObj));
                                    $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = retObj.ratingReviewQuestionAboutProductByShopStoresDetails;
                                    $rootScope.isRatingReviewQuestionDetailsFound = retObj.isRatingReviewQuestionDetailsFound;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = false;
                console.log("problem in loadProductTypeProductCategoryProductDetails ex=>"+ex);
            }
        };
        
        // loadAllUserRatingReviewAboutProductDetails 
        $rootScope.loadAllUserRatingReviewAboutProductDetails = function(){
            try{
                // get param obj to load all user rating about product 
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                // console.log("loadAllUserRatingReviewAboutProductDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.allUserRatingReviewAboutProductDetailsArr = false;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.getAllUserRatingReviewAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadAllUserRatingReviewAboutProductDetails retObj=>"+JSON.stringify(retObj));
                                    $rootScope.allUserRatingReviewAboutProductDetailsArr = retObj.allUserRatingReviewAbtProductDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.allUserRatingReviewAboutProductDetailsArr = false;
                console.log("loadAllUserRatingReviewAboutProductDetails ex=>"+ex);
            }
        };
        
        // checkUserLoggedInForSubmitingRatingReviewAbtProduct
        $rootScope.checkUserLoggedInForSubmitingRatingReviewAbtProduct = function(){
            $rootScope.isEnableRatingReviewSubmitButton = false;
            // check in session 
            if(sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined){
                // extract dk param obj from session
                var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(existingDkParamObj!==false && existingDkParamObj!=='' && jQuery.isEmptyObject(existingDkParamObj)===false){
                    // extract user param obj
                    if(existingDkParamObj.hasOwnProperty('userSession')===true){
                        var userSessionObj = existingDkParamObj['userSession'];
                        if(userSessionObj.hasOwnProperty('isUserLoggedIn')===true){
                            if(userSessionObj['isUserLoggedIn']==='Y'){
                                $rootScope.isEnableRatingReviewSubmitButton = true;
                            }
                        }
                    }
                }
            }
        };
        
        // collectDataToAddRatingReviewAboutProduct
        $rootScope.collectDataToAddRatingReviewAboutProduct = function(fcontentCass){
            var validatedDataStatus = validateUserRatingReviewAbtProduct(fcontentCass);
            if(validatedDataStatus===true){
                var paramDataObj  = getParamDataForAddingUserRatingReviewAbtProduct(fcontentCass);
                if(Object.keys(paramDataObj).length===2 && paramDataObj!==false){
                    $rootScope.addRatingReviewAboutProduct(paramDataObj, fcontentCass);
                }else{
                    var notifyMsgStr = 'Please enter comment for rating & review about product !';
                    showNotificationBoxMsg(notifyMsgStr);
                }
            }else{
                var notifyMsgStr = 'Please enter comment for rating & review about product !';
                showNotificationBoxMsg(notifyMsgStr);
            }
        };
        
        // addRatingReviewAboutProduct
        $rootScope.addRatingReviewAboutProduct = function(preparedParamJsonObj, fcontentCass){
            try{
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.addRatingReviewAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var notifyMsgStr = 'Please try again to post review & rating about product !';
                            var isAddedReviewRatingAbouProduct = 'FALSE';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isAddedReviewRatingAbouProduct = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isAddedReviewRatingAbouProduct', retResponseJson);
                            }
                            if(isAddedReviewRatingAbouProduct==='TRUE'){
                                notifyMsgStr = 'Your reviewed & rating about product posted successfully !';
                                clearRatingReviewAbtProductFormContent(fcontentCass);
                                $rootScope.loadMaxAverageRatingReviewedAboutProduct();
                                $rootScope.loadAllUserRatingReviewAboutProductDetails();
                                $rootScope.loadAverageRatingReviewedAboutProduct();
                            }
                            showNotificationBoxMsg(notifyMsgStr);
                        });
                    });
                    
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.avgRatingReviewedAboutProductDetails = false;
                console.log("problem in loadAverageRatingReviewedAboutProduct ex=>"+ex);
            }
        };
        
        
    }catch(ex){
        console.log("problem in ProductTypeProductCategoryProductDetailsController ex=>"+ex);
    }
    
});


// ShopStoreController
app.controller('ShopStoreController', function($scope, $rootScope, $http, ShopStoreServices, RatingReviewServices){
    try{
        
        $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
        $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
        $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
        $rootScope.isShowCShopstoreAllProductFilter = false;
        $rootScope.toggleCShopstoreProductFilterBtnLabel = "SHOW FILTER";
        $rootScope.cShopstoreProductFilterPopupDivClass = "";
        $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
        $rootScope.isToggleShopStoreDessertsMenu = false;
        $rootScope.isShowShopStoreDessertsTypeMenuList = false;
        $rootScope.isShowShopStoreRatingReviewDetails = false;
        $rootScope.allUserRatingReviewDetails = false;
        $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = true;
        $rootScope.isEnableRatingReviewSubmitButton = false;
        $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
        $rootScope.cShopstoreProductDeliveryAreaNames = false;
        $rootScope.isShowCShopStoreWorkingStyleDetails = false;
        $rootScope.cShopstoreWorkingstyleDetails = false;
        
        // collectDataToRedirectCShopstoreView
        $rootScope.collectDataToViewCShopstore = function(paramDataObj){
            try{
                var retStatus = checkAllParamToViewCShopStore(paramDataObj);
                if(retStatus===true){
                    window.location.href = globalBaseSitePath+"viewstoreproduct.php";
                }
            }catch(ex){
                console.log("problem in collectDataToViewCShopstore ex=>"+ex);
            }
        };
        
        // loadCShopStoreSummaryInfo 
        $rootScope.loadCShopStoreSummaryInfo = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjForLoadingCShopStoreSummaryInfo();
                // console.log("loadCShopStoreSummaryInfo preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.shopstoreInfo = false;
                    $rootScope.totalCountDeliveryArea = '';
                    $rootScope.customersReviewedRatingMsgStr = 'No any customer(s) reviewed yet !';
                    $rootScope.isRatingReviewBasedInfoFound = false;
                    $rootScope.totalCountDessertsType = '';
                    $rootScope.totalCountAllDessertsTypeProduct = 0;
                    $rootScope.allDessertsSummaryInfo = false;
                    
                    // calling ShopStoreServices to get summary info
                    ShopStoreServices.getCShopStoreSummaryInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("getCShopStoreMenuSummaryInfo retObj=>"+JSON.stringify(retObj));
                                    $rootScope.totalCountDessertsType = retObj.totalCountDessertsType;
                                    $rootScope.totalCountAllDessertsTypeProduct = retObj.totalCountAllDessertsTypeProduct;
                                    $rootScope.allDessertsSummaryInfo = retObj.allDessertsSummaryInfo;
                                    $rootScope.shopstoreInfo = retObj.shopstoreInfo;
                                    $rootScope.totalCountDeliveryArea = retObj.totalCountDeliveryArea;
                                    $rootScope.customersReviewedRatingMsgStr = retObj.customersReviewedRatingMsgStr;
                                    $rootScope.isRatingReviewBasedInfoFound = retObj.isRatingReviewBasedInfoFound;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.shopstoreInfo = false;
                $rootScope.totalCountDeliveryArea = '';
                $rootScope.customersReviewedRatingMsgStr = 'No any customer(s) reviewed yet !';
                $rootScope.isRatingReviewBasedInfoFound = false;
                $rootScope.totalCountDessertsType = '';
                $rootScope.totalCountAllDessertsTypeProduct = 0;
                $rootScope.allDessertsSummaryInfo = false;
                console.log("problem in loadCShopStoreMenuSummaryInfo ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // loadCShopStoreProductTypeProductCategoryAllProductList 
        $rootScope.loadCShopStoreProductTypeProductCategoryAllProductList = function(){
            try{
                if($rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList===true){
                    // get param obj
                    var preparedParamJsonObj = getParamObjForLoadingProductTypeProductCategoryAllProductList();
                    // console.log("loadCShopStoreProductTypeProductCategoryAllProductList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                        $rootScope.defaultedSelectedProductTypeTitle = '';
                        $rootScope.defaultSelectProductCategoryTitle = '';
                        $rootScope.defaultSelectProductCategoryValue = '';
                        $rootScope.productCategoryList = false;
                        $rootScope.allProductDetailsList = false;
                        $rootScope.notFoundProductMsgStr = '';
                    
                        // calling ShopStoreServices to get all product list
                        ShopStoreServices.getCShopStoreProductTypeProductCategoryAllProductList(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadCShopStoreProductTypeProductCategoryAllProductList retObj=>"+JSON.stringify(retObj));
                                        $rootScope.defaultedSelectedProductTypeTitle = retObj.productTypeDetails.defaultedSelectedProductTypeTitle;
                                        $rootScope.defaultSelectProductCategoryTitle = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                        if(retObj.productTypeDetails.productCategoryList!==false){
                                            $rootScope.productCategoryList = retObj.productTypeDetails.productCategoryList;
                                        }
                                        if(retObj.productTypeDetails.defaultSelectProductCategoryValue!==''){
                                            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                                            existingDkParamObj['userProduct']['producttype_value'] = retObj.productTypeDetails.defaultSelectProductCategoryValue;
                                            existingDkParamObj['userProduct']['producttype_categoryvalue'] = retObj.productTypeDetails.defaultSelectProductCategoryValue;
                                            existingDkParamObj['userProduct']['producttype_categoryname'] = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                                        }
                                        if(retObj.productTypeDetails.allProductPriceDetailsArr!==false && retObj.productTypeDetails.allProductPriceDetailsArr!==undefined){
                                            $rootScope.buildAllCShopStoreProductPriceFilterListHtmlSelectControl(retObj.productTypeDetails.allProductPriceDetailsArr);
                                        }
                                        if(retObj.productTypeDetails.allProductSizeDetailsArr!==false && retObj.productTypeDetails.allProductSizeDetailsArr!==undefined){
                                            $rootScope.buildAllCShopStoreProductSizeFilterListHtmlSelectControl(retObj.productTypeDetails.allProductSizeDetailsArr);
                                        }
                                        if(retObj.productTypeDetails.allProductDiscountDetailsArr!==false && retObj.productTypeDetails.allProductDiscountDetailsArr!==undefined){
                                            $rootScope.buildAllCShopStoreProductDiscountFilterListHtmlSelectControl(retObj.productTypeDetails.allProductDiscountDetailsArr);
                                        }
                                        if(retObj.productTypeDetails.allProductDetailsList!==false && retObj.productTypeDetails.allProductDetailsList!==undefined){
                                            $rootScope.allProductDetailsList = retObj.productTypeDetails.allProductDetailsList;
                                        }else{
                                            $rootScope.notFoundProductMsgStr = 'No products found used product filter !';
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.defaultedSelectedProductTypeTitle = '';
                $rootScope.defaultSelectProductCategoryTitle = '';
                $rootScope.defaultSelectProductCategoryValue = '';
                $rootScope.productCategoryList = false;
                $rootScope.allProductDetailsList = false;
                $rootScope.notFoundProductMsgStr = 'No products found used proper filter !';
                console.log("problem in loadCShopStoreProductTypeProductCategoryAllProductList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
          
        // buildAllCShopStoreProductPriceFilterListHtmlSelectControl
        $rootScope.buildAllCShopStoreProductPriceFilterListHtmlSelectControl = function(allProductPriceDetails){
            try{    
                var defaultSelectProductPriceFilterArr = new Array();
                var productPriceFilterListSelectControlElementObj = document.getElementById("allProductPriceFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(productPriceFilterListSelectControlElementObj).find('option').remove();
                $(productPriceFilterListSelectControlElementObj).selectpicker('destroy');
                if(jQuery.isEmptyObject(allProductPriceDetails)===false && allProductPriceDetails!=='' 
                    && allProductPriceDetails!==undefined && allProductPriceDetails!==false){
                    // sorting data prepared
                    var allPriceSortingListArr = allProductPriceDetails['sortingList'];
                    if(allPriceSortingListArr.length>0 && allPriceSortingListArr!==false){
                        // iterate each price sorting details
                        var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                        for(var eachPriceSortingDetailsArrIndex = 0; eachPriceSortingDetailsArrIndex<allPriceSortingListArr.length; eachPriceSortingDetailsArrIndex++){
                            var dataIconStr = 'fa fa-sort-amount-asc';
                            var priceSortingValue = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortValue'];
                            var priceSortTitle = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortTitle'];
                            if(priceSortingValue==='hightolow'){
                                dataIconStr = 'fa fa-sort-amount-desc';
                            }
                            var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceSortingValue+"'>"+priceSortTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                            if(allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['isRequestedPriceSortedMatched']==='Y'){
                                defaultSelectProductPriceFilterArr.push(priceSortingValue);
                            }
                        }
                        $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                    // price range data prepared
                    var allPriceRangeList = allProductPriceDetails['rangeList'];
                    if(allPriceRangeList.length>0 && allPriceRangeList!==false){
                        var optionGroupStr = "<optgroup label='Price Range (Multiple selection)'>";
                        // iterate each price range details
                        for(var eachPriceRangeDetailsArrIndex = 0; eachPriceRangeDetailsArrIndex<allPriceRangeList.length; eachPriceRangeDetailsArrIndex++){
                            var dataIconStr = 'fa fa-inr';
                            var priceRangeValue = allPriceRangeList[eachPriceRangeDetailsArrIndex]['priceRangeValue'];
                            var priceRangeTitle = allPriceRangeList[eachPriceRangeDetailsArrIndex]['priceRangeTitle'];
                            var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceRangeValue+"'>"+priceRangeTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                        }
                        $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                }
                // refresh product price range list select control element 
                $(productPriceFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected price
                if(defaultSelectProductPriceFilterArr.length>0){
                    $(productPriceFilterListSelectControlElementObj).selectpicker('val', defaultSelectProductPriceFilterArr);
                }
                // apply event
                if($(productPriceFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent(productPriceFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllCShopStoreProductPriceFilterListHtmlSelectControl=>"+ex);
            }    
        };
        
        // buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            $(elementObj).on('changed.bs.select', function(e){
                try{
                    var selectedPriceFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(price filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_price_filter'] = '';
                    if(selectedPriceFilterValues!=='' && selectedPriceFilterValues!==false && selectedPriceFilterValues!==null){
                        existingDkParamObj['userProduct']['product_price_filter'] = (selectedPriceFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#cShopStoreViewAllProductDetailsBodyWrapperDivId').scope().loadCShopStoreProductTypeProductCategoryAllProductList();
                }catch(ex){
                    console.log("problem in buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent=>"+ex);
                }    
            });
        };
        
        // buildAllCShopStoreProductSizeFilterListHtmlSelectControl
        $rootScope.buildAllCShopStoreProductSizeFilterListHtmlSelectControl = function(allProductSizeDetails){
            try{
                var defaultedSelectedProductSize = '';
                var productSizeFilterListSelectControlElementObj = document.getElementById("allProductSizeFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(productSizeFilterListSelectControlElementObj).find('option').remove();
                $(productSizeFilterListSelectControlElementObj).selectpicker('destroy');
                if(jQuery.isEmptyObject(allProductSizeDetails)===false && allProductSizeDetails!=='' 
                    && allProductSizeDetails!==undefined && allProductSizeDetails!==false){
                    var allProductSizeList = allProductSizeDetails['rangeList'];
                    // iterate each product size details
                    var optionGroupStr = "<optgroup label='Size Range (Multiple selection)'>";
                    for(var eachProductSizeArrIndex = 0; eachProductSizeArrIndex<allProductSizeList.length; eachProductSizeArrIndex++){
                        var productSizeValue = allProductSizeList[eachProductSizeArrIndex]['sizeRangeValue'];
                        var optionStr = "<option class='productSizeFilterOperationOptionClass' value='"+productSizeValue+"'>"+productSizeValue+"</option>";
                        optionGroupStr+= optionStr;
                        if(allProductSizeList[eachProductSizeArrIndex]['isRequestedSizeRangeMatched']==='Y'){
                            defaultedSelectedProductSize = allProductSizeList[eachProductSizeArrIndex]['sizeRangeValue'];
                        }
                    }
                    $(productSizeFilterListSelectControlElementObj).append(optionGroupStr);
                }
                // refresh product size list select control element 
                $(productSizeFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected shopstore 
                if(defaultedSelectedProductSize!=='' && defaultedSelectedProductSize!==false){
                    $(productSizeFilterListSelectControlElementObj).selectpicker('val', defaultedSelectedProductSize);
                }
                // apply event
                if($(productSizeFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent(productSizeFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllCShopStoreProductSizeFilterListHtmlSelectControl=>"+ex);
            } 
        };
        
        // buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedSizeFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(size filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_size_filter'] = '';
                    if(selectedSizeFilterValues!=='' && selectedSizeFilterValues!==false && selectedSizeFilterValues!==null){
                        existingDkParamObj['userProduct']['product_size_filter'] = (selectedSizeFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#cShopStoreViewAllProductDetailsBodyWrapperDivId').scope().loadCShopStoreProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // buildAllCShopStoreProductDiscountFilterListHtmlSelectControl
        $rootScope.buildAllCShopStoreProductDiscountFilterListHtmlSelectControl = function(allProductDiscountDetails){
            var defaultSelectedProductDiscountFilterArr = new Array();
            var productDiscountFilterListSelectControlElementObj = document.getElementById("allProductDiscountFilterListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(productDiscountFilterListSelectControlElementObj).find('option').remove();
            $(productDiscountFilterListSelectControlElementObj).selectpicker('destroy');
            if(jQuery.isEmptyObject(allProductDiscountDetails)===false && allProductDiscountDetails!=='' 
                && allProductDiscountDetails!==undefined && allProductDiscountDetails!==false){
                var allDiscountSortingListArr = allProductDiscountDetails['sortingList'];
                if(allDiscountSortingListArr.length>0 && allDiscountSortingListArr!==false){
                    // iterate each price sorting details
                    var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                    for(var eachDiscountSortingDetailsArrIndex = 0; eachDiscountSortingDetailsArrIndex<allDiscountSortingListArr.length; eachDiscountSortingDetailsArrIndex++){
                        var dataIconStr = 'fa fa-sort-amount-asc';
                        var discountSortingValue = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortValue'];
                        var discountSortTitle = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortTitle'];
                        if(discountSortingValue==='hightolow'){
                            dataIconStr = 'fa fa-sort-amount-desc';
                        }
                        var eachOptionStr = "<option class='discountFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+discountSortingValue+"'>"+discountSortTitle+"</option>";
                        optionGroupStr+= eachOptionStr;
                        if(allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['isRequestedDiscountSortedMatched']==='Y'){
                            defaultSelectedProductDiscountFilterArr.push(discountSortingValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
                var allDiscountRangeList = allProductDiscountDetails['rangeList'];
                if(allDiscountRangeList.length>0 && allDiscountRangeList!==false){
                    var optionGroupStr = "<optgroup label='Range (Multiple selection)'>";
                    // iterate each price range details
                    for(var eachDiscountRangeDetailsArrIndex = 0; eachDiscountRangeDetailsArrIndex<allDiscountRangeList.length; eachDiscountRangeDetailsArrIndex++){
                        var discountRangeValue = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeValue'];
                        var discountRangeTitle = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeTitle'];
                        var eachOptionStr = "<option class='discountFilterOperationOptionClass' value='"+discountRangeValue+"'>"+discountRangeTitle+"</option>";
                        optionGroupStr+= eachOptionStr;
                        if(allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['isRequestedDiscountRangeMatched']==='Y'){
                            defaultSelectedProductDiscountFilterArr.push(discountRangeValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
            }
            // refresh product discount filter list select control element 
            $(productDiscountFilterListSelectControlElementObj).selectpicker('refresh');
            // default select product discount filter
            if(defaultSelectedProductDiscountFilterArr.length>0){
                $(productDiscountFilterListSelectControlElementObj).selectpicker('val', defaultSelectedProductDiscountFilterArr);
            }
            // apply event
            if($(productDiscountFilterListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent(productDiscountFilterListSelectControlElementObj);
            }
        };
        
        // buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedDiscountFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(discount filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_discount_filter'] = '';
                    if(selectedDiscountFilterValues!=='' && selectedDiscountFilterValues!==false && selectedDiscountFilterValues!==null){
                        existingDkParamObj['userProduct']['product_discount_filter'] = (selectedDiscountFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#cShopStoreViewAllProductDetailsBodyWrapperDivId').scope().loadCShopStoreProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // collectDataToLoadAllProductListViaCShopStoreProductTypeProductCategory
        $rootScope.collectDataToLoadAllProductListViaCShopStoreProductTypeProductCategory = function(preparedParamObj){
            try{
                var productTypeId = '';
                var productTypeTitle = '';
                var productTypeCategoryId = '';
                var productTypeCategoryTitle = '';
                var shopStoreId = '';
                if((preparedParamObj).hasOwnProperty('productTypeId')===true){
                    productTypeId = preparedParamObj['productTypeId'] ;
                }
                if((preparedParamObj).hasOwnProperty('productTypeTitle')===true){
                    productTypeTitle = preparedParamObj['productTypeTitle'] ;
                }
                if((preparedParamObj).hasOwnProperty('productCategoryId')===true){
                    productTypeCategoryId = preparedParamObj['productCategoryId'] ;
                }
                if((preparedParamObj).hasOwnProperty('productCategoryTitle')===true){
                    productTypeCategoryTitle = preparedParamObj['productCategoryTitle'] ;
                }
                if((preparedParamObj).hasOwnProperty('shopStoreId')===true){
                    shopStoreId = preparedParamObj['shopStoreId'] ;
                }
                if((productTypeId).length===32 && productTypeTitle!==''
                    && (productTypeCategoryId).length===32 && productTypeCategoryTitle!==''
                    && (shopStoreId).length===32){
                    // reset user product session storage
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['shopstore_value'] = shopStoreId;
                    existingDkParamObj['userProduct']['producttype_value'] = productTypeId;
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = productTypeCategoryId;
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = '';
                    existingDkParamObj['userProduct']['producttype_name'] = productTypeTitle;
                    existingDkParamObj['userProduct']['producttype_categoryname'] = productTypeCategoryTitle;
                    existingDkParamObj['userProduct']['producttype_listname'] = '';
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    window.location.href = globalBaseSitePath+"viewstoreproduct.php";
                }
            }catch(ex){
                console.log("problem in collectDataToLoadAllProductListViaCShopStoreProductTypeProductCategory=>"+ex);
            }
        };
        
        // loadShopStoreAllUserRatingReviewed 
        $rootScope.loadShopStoreAllUserRatingReviewed = function(){
            try{
                if($rootScope.isShowShopStoreRatingReviewDetails===true){
                    // get param obj to load all user rating about product 
                    var preparedParamJsonObj = getParamObjFromSessionForShopStoreRatingReviewedDetails();
                    // console.log("loadShopStoreAllUserRatingReviewed preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.allUserRatingReviewDetails = false;

                        // calling RatingReviewServices 
                        RatingReviewServices.getShopStoreAllUserRatingReviewed(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadShopStoreAllUserRatingReviewed retObj=>"+JSON.stringify(retObj));
                                        $rootScope.allUserRatingReviewDetails = retObj.allUserRatingReviewAbtProductDetails;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.allUserRatingReviewDetails = false;
                console.log("problem in loadShopStoreAllUserRatingReviewed ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        
        // loadShopStoresRatingReviewQuestions 
        $rootScope.loadShopStoresRatingReviewQuestions = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForShopStoreRatingReviewedDetails();
                // console.log("loadShopStoresRatingReviewQuestions preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){

                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = false;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.getShopStoreRatingReviewQuestionsAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadRatingReviewQuestionsAboutProductByShopStores retObj=>"+JSON.stringify(retObj));
                                    $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = retObj.ratingReviewQuestionAboutProductByShopStoresDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = false;
                console.log("problem in loadProductTypeProductCategoryProductDetails ex=>"+ex);
            }
        };
        
        // checkUserLoggedInForSubmitingRatingReviewAbtProduct
        $rootScope.checkUserLoggedInForSubmitingRatingReviewAbtProduct = function(){
            $rootScope.isEnableRatingReviewSubmitButton = false;
            // check in session 
            if(sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined){
                // extract dk param obj from session
                var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(existingDkParamObj!==false && existingDkParamObj!=='' && jQuery.isEmptyObject(existingDkParamObj)===false){
                    // extract user param obj
                    if(existingDkParamObj.hasOwnProperty('userSession')===true){
                        var userSessionObj = existingDkParamObj['userSession'];
                        if(userSessionObj.hasOwnProperty('isUserLoggedIn')===true){
                            if(userSessionObj['isUserLoggedIn']==='Y'){
                                $rootScope.isEnableRatingReviewSubmitButton = true;
                            }
                        }
                    }
                }
            }
        };
        
        // loadCShopStoresWorkingStyle 
        $rootScope.loadCShopStoresWorkingStyle = function(){
            try{
                if($rootScope.isShowCShopStoreWorkingStyleDetails===true){
                    // get param obj to load working style details
                    var preparedParamJsonObj = getParamObjForLoadingCShopStoreWorkingStyleDetails();
                    // console.log("loadCShopStoresWorkingStyle preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.cShopstoreWorkingstyleDetails = false;

                        // calling ShopStoreServices 
                        ShopStoreServices.getCShopStoreWorkingStyleDetails(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadCShopStoresWorkingStyle retObj=>"+JSON.stringify(retObj));
                                        $rootScope.cShopstoreWorkingstyleDetails = retObj.shopstoreWorkingStyleDetails;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.cShopstoreWorkingstyleDetails = false;
                console.log("problem in loadCShopStoresWorkingStyle ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        
        // loadCShopStoresProductDeliveryArea 
        $rootScope.loadCShopStoresProductDeliveryArea = function(){
            try{
                if($rootScope.isShowCShopStoreProductDeliveryAreaDetails===true){
                    // get param obj to load cshopstore product delivery info
                    var preparedParamJsonObj = getParamObjForLoadingCShopStoreProductDeliveryAreaDetails();
                    // console.log("loadCShopStoresProductDeliveryArea preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.cShopstoreProductDeliveryAreaNames = false;

                        // calling ShopStoreServices 
                        ShopStoreServices.getCShopStoreProductDeliveryAreaDetails(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadCShopStoresProductDeliveryArea retObj=>"+JSON.stringify(retObj));
                                        $rootScope.cShopstoreProductDeliveryAreaNames = retObj.cShopstoreProductDeliveryAreaNames;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                console.log("problem in loadCShopStoresProductDeliveryArea ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // toggleShopStoreSelfSummaryInfoDetails
        $rootScope.toggleShopStoreSelfSummaryInfoDetails = function(){
            if($rootScope.isToggleCShopStoreSelfSummaryInfo===false){
                $rootScope.isToggleCShopStoreSelfSummaryInfo = true;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Hide Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = true;
                $rootScope.loadCShopStoresProductDeliveryArea();
                $rootScope.isShowCShopStoreWorkingStyleDetails = true;
                $rootScope.loadCShopStoresWorkingStyle();
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = true;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
                $rootScope.loadCShopStoreProductTypeProductCategoryAllProductList();
            }
        };
        
        // toggleShopStoreRatingReviewDetails
        $rootScope.toggleShopStoreRatingReviewDetails = function(){
            if($rootScope.isShowShopStoreRatingReviewDetails===false){
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = true;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Hide Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.loadShopStoreAllUserRatingReviewed();
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = true;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
                $rootScope.loadCShopStoreProductTypeProductCategoryAllProductList();
            }
        };
        
        // toggleShopStoreDessertsMenu
        $rootScope.toggleShopStoreDessertsMenu = function(){
            if($rootScope.isToggleShopStoreDessertsMenu===false){
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = true;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Hide Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = true;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = true;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }
        };
        
        // toggleCShopStoreAllProductFilterContainer
        $rootScope.toggleCShopStoreAllProductFilterContainer = function(){
            if($rootScope.isShowCShopstoreAllProductFilter===false){
                $rootScope.toggleCShopstoreProductFilterBtnLabel = "HIDE FILTER";
                $rootScope.isShowCShopstoreAllProductFilter = true;
                $rootScope.cShopstoreProductFilterPopupDivClass = "cshopstore_productFilterOperationContainerDivClass";
            }else{
                $rootScope.toggleCShopstoreProductFilterBtnLabel = "SHOW FILTER";
                $rootScope.isShowCShopstoreAllProductFilter = false;
                $rootScope.cShopstoreProductFilterPopupDivClass = "";
            }
        };
        
    }catch(ex){
        console.log("problem in ShopstoreDetailsController ex=>"+ex);
    }
    
});


// UsersController
app.controller('UsersController', function($scope, $rootScope, $http, UsersServices){
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
                window.location.href = globalBaseSitePath+"viewproduct.php";
            }else if(lastPageAccessedByUser==='allproducts'){
                window.location.href = globalBaseSitePath+"allproducts.php";
            }else if(lastPageAccessedByUser==='viewstoreproduct'){
                window.location.href = globalBaseSitePath+"viewstoreproduct.php";
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
        
    }catch(ex){
        console.log("problem in users controller ex=>"+ex);
    }
});

// OrderCartController
app.controller('OrderCartController', function($scope, $rootScope, $http, OrderCartServices){
    try{
         
        // checkingProductDataToAddInOrdercart 
        $rootScope.checkingProductDataToAddInOrdercart = function(productDetailsObj, fcontentClass, fromPageLoad){
            try{
                // check is user logged in or not session
                var isUserLoggedInSession = checkUserLoggedInSession();
                if(isUserLoggedInSession===true){
                    // validating product data status
                    var validatedDataStatus = validateProductDataToAddInOrdercart(fcontentClass);
                    if(validatedDataStatus===true && 
                        (productDetailsObj!==false && productDetailsObj!==undefined && jQuery.isEmptyObject(productDetailsObj)===false)){
                        OrderCartServices.addProductDataInOrdercart(productDetailsObj, fcontentClass);
                    }else if(validatedDataStatus===true && 
                        (productDetailsObj===false || productDetailsObj===undefined || jQuery.isEmptyObject(productDetailsObj)===true)){
                        OrderCartServices.addProductDataInOrdercart(false, fcontentClass);
                    }else{
                        var notifyMsgStr = "Please enter product qty / message to add item in order cart !";
                        showNotificationBoxMsg(notifyMsgStr);
                    }
                }else if(isUserLoggedInSession===false){
                    storePageDetailsUserAccessedFrom(fromPageLoad);
                    storeUserOrderItemInSession(productDetailsObj, fcontentClass);
                    window.location.href = globalBaseSitePath+"account-signup-signin.php";
                }
            }catch(ex){
                console.log("problem in checkingProductDataToAddInOrdercart=>"+ex);
            }
        };
        
    }catch(ex){
        console.log("problem in OrdercartController ex=>"+ex);
    }
    
});


// WishListController
app.controller('WishListController', function($scope, $rootScope, $http, WishListServices){
    try{
      
        // redirectToViewWishList
        $rootScope.redirectToViewWishList = function(fromPageLoad){
            // check user logged in dk session
            var userLoggedInSessionStatus = checkUserLoggedInSession();
            if(userLoggedInSessionStatus===true){
                window.location.href = globalBaseSitePath+"wishlist.php";
            }else{
                storePageDetailsUserAccessedFrom(fromPageLoad);
                window.location.href = globalBaseSitePath+"account-signup-signin.php";
            }    
        };
        
        // resetUWLVariable
        $rootScope.resetUWLVariable = function(purposeType){
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
            if(retDataValidatedStatus===true){
                // collect data for creating wish list
                var collectedWishListDataObj = getParamDataForWLCreation();
                if(collectedWishListDataObj!==false && jQuery.isEmptyObject(collectedWishListDataObj)===false){
                    $rootScope.createUserWL(collectedWishListDataObj);
                }
            }
        };
        
        // createUserWL 
        $rootScope.createUserWL = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    // calling WishListServices 
                    WishListServices.createUserWL(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var retStatusUWLCreated = 'FALSE';
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusUWLCreated = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isUWLCreated', retResponseJson);
                            }
                            if(retStatusUWLCreated!=='TRUE'){
                                notificationMsgStr = 'Please fill-up form details to create new wish list !';
                                $rootScope.isShowUWLCreationErrorMsg = true;
                                $rootScope.uwlCreationErrorMsgStr = notificationMsgStr;
                            }else{
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
            }catch(ex){
                console.log("problem in createWishList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // showUserWL
        $rootScope.showUserWL = function(){
            try{
                $rootScope.resetUWLVariable('showUserWL');
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.userAllWLArrJsonObj = false;
                    
                    // calling WishListServices 
                    WishListServices.getUserWL(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var userAllWLArrJsonObj = false;
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                userAllWLArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userAllWL', retResponseJson);
                            }
                            if(userAllWLArrJsonObj===false || userAllWLArrJsonObj===undefined || userAllWLArrJsonObj===''){
                                notificationMsgStr = "No wish list found, please create new one by clicking on 'Create' icon box !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }else{
                                var notificationMsgStr = "Your "+(userAllWLArrJsonObj).length +" wish list data are displaying below & set any one list as default settings !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.userAllWLArrJsonObj = userAllWLArrJsonObj;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in showUserWL ex=>"+ex);
            }
        };
        
        // deleteUserWL
        $rootScope.deleteUserWL = function(uwlDataObj){
            try{
                // collect data
                var preparedParamJsonObj = getParamDataToDeleteUserWL(uwlDataObj);
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    // calling WishListServices 
                    WishListServices.deleteUserWL(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var retStatusUWLRemoved = 'FALSE';
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusUWLRemoved = extractDataFromReturnAjaxResponse('DELETE', 'apiFile', 'isUWLRemoved', retResponseJson);
                            }
                            if(retStatusUWLRemoved==='TRUE'){
                                notificationMsgStr = 'Wish list deleted successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.showUserWL();
                                // refresh user wish list dashboard summary data using services
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            }else{
                                notificationMsgStr = 'Please try again to delete wish list !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in deleteUserWL ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // collectDataUWLUpdation
        $rootScope.collectDataUWLUpdation = function(fcClass, uwlDataObj){
            // validate data
            $('.'+fcClass).find('.wld_eachWLErrorMsgPClass').empty();
            var retDataValidatedStatus = validateDataUWLUpdation(fcClass);
            if(retDataValidatedStatus===true){
                // collect data for updating user wish list
                var collectedUWLDataToUpdateObj = getParamDataForUWLUpdation(fcClass, uwlDataObj);
                if(collectedUWLDataToUpdateObj!==false && jQuery.isEmptyObject(collectedUWLDataToUpdateObj)===false){
                    $rootScope.updateUserWL(collectedUWLDataToUpdateObj);
                }
            }
        };
        
        // updateUserWL
        $rootScope.updateUserWL = function(uwlDataObj){
            try{
                if(uwlDataObj!==false && jQuery.isEmptyObject(uwlDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = uwlDataObj;
                    
                    // calling WishListServices 
                    WishListServices.updateUserWL(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var notificationMsgStr = '';
                            var retStatusUWLUpdated = 'FALSE';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusUWLUpdated = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isUWLUpdated', retResponseJson);
                            }
                            if(retStatusUWLUpdated==='TRUE'){
                                notificationMsgStr = 'Wish list data updated successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                // refresh user wish list dashboard summary data using services
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            }else{
                                notificationMsgStr = 'Please try again to update wish list data !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in updateUserWL ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // showUWLWiseItemDetails 
        $rootScope.showUWLWiseItemDetails = function(uwlDataObj){
            try{
                $rootScope.resetUWLVariable('showUserAllWLWiseItemList');
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                // console.log("showUWLWiseItemDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    if(uwlDataObj!==false && uwlDataObj!==undefined && jQuery.isEmptyObject(uwlDataObj)===false){
                        preparedParamJsonObj['wishListId'] = uwlDataObj['wlId'];
                    }
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.userAllWLWiseItemArrJsonData = false;

                    // calling WishListServices 
                    WishListServices.getUAllWLWiseItemDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var notificationMsgStr = '';
                                var retUserAllWLWiseItemArrJsonData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'userAllWLWiseItemDetails', retResponseJson);
                                if(retUserAllWLWiseItemArrJsonData!=='' && retUserAllWLWiseItemArrJsonData!==false 
                                    && retUserAllWLWiseItemArrJsonData!==undefined){
                                    $rootScope.userAllWLWiseItemArrJsonData = retUserAllWLWiseItemArrJsonData;
                                }else{
                                    notificationMsgStr = 'No item(s) found in wish list !';
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
            }
        };
        
        // collectDataToMoveProductFromWishListToWishList
        $rootScope.collectDataToMoveProductFromUWLToUWL = function(elementId){
            if($('#'+elementId).length>0){
                var moveProductParamDataObj = getParamDataToMoveProductFromUWLToUWL(elementId);
                // console.log("collectDataToMoveProductFromWLToWL retParamDataObj=>"+retParamDataObj);
                if(moveProductParamDataObj!==false && jQuery.isEmptyObject(moveProductParamDataObj)===false){
                    $rootScope.moveProductFromUWLToUWL(moveProductParamDataObj);
                }
            }
        };
        
        // moveProductFromUWLToUWL 
        $rootScope.moveProductFromUWLToUWL = function(moveProductParamDataObj){
            try{
                if(moveProductParamDataObj!==false && jQuery.isEmptyObject(moveProductParamDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = moveProductParamDataObj;

                    // calling WishListServices 
                    WishListServices.moveProductFromUWLToUWL(fetchedParamJsonObj).done(function(retResponseJson){
                        // console.log("moveProductFromUWLToUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var retStatusIsProductMovedFromUWLToUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusIsProductMovedFromUWLToUWL = extractDataFromReturnAjaxResponse('PUT', 'apiFile', 'isProductMovedFromUWLToUWL', retResponseJson);
                            }
                            if(retStatusIsProductMovedFromUWLToUWL==='TRUE'){
                                notificationMsgStr = 'Item move from one list to another list successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.showUWLWiseItemDetails();
                            }else{
                                notificationMsgStr = 'Please try again to move item from one list to another !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in moveProductFromWishListToWishList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // removeProductFromUWL 
        $rootScope.removeProductFromUWL = function(productDataObj){
            try{
                // get product data to remove from whish list
                var toDeleteProductParamDataObj = getParamDataToRemoveProductFromUWL(productDataObj);
                if(toDeleteProductParamDataObj!==false && jQuery.isEmptyObject(toDeleteProductParamDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = toDeleteProductParamDataObj;

                    // calling WishListServices 
                    WishListServices.removeProductFromUWL(fetchedParamJsonObj).done(function(retResponseJson){
                        // console.log("removeProductFromUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var retStatusIsProductRemovedFromUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusIsProductRemovedFromUWL = extractDataFromReturnAjaxResponse('DELETE', 'apiFile', 'isProductRemovedFromUWL', retResponseJson);
                            }
                            if(retStatusIsProductRemovedFromUWL==='TRUE'){
                                notificationMsgStr = 'Item deleted from wish list successfully !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.showUWLWiseItemDetails();
                                // refresh user wish list dashboard summary data
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            }else{
                                notificationMsgStr = 'Item not delete from wish list !';
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in removeProductFromWishList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // collectDataToSearchUserWLBySearchParam
        $rootScope.collectDataToSearchUserWLBySearchParam = function(){
            $rootScope.resetUWLVariable('showSearchedAllUserwiseWL');
            if($('#searchUWLInput').length===1){
                var paramDataObj = {};
                var searchString = removeHtmlStripTagsOfContent($('#searchUWLInput').val());
                if(searchString!=='' && searchString!==false && searchString!==undefined){
                    $('#searchUWLInput').css({'border-color':'#ccc'});
                    paramDataObj['wishlistby'] = 'users';
                    if(isStringOfCharacters(searchString)===true){
                        paramDataObj['search_string'] = searchString;
                        paramDataObj['search_by'] = 'personname';
                    }else if(isValidEmail(searchString)===true){
                        paramDataObj['search_string'] = searchString;
                        paramDataObj['search_by'] = 'email';
                    }
                    if(Object.keys(paramDataObj).length===3){
                        $rootScope.getUserwiseWLSummaryBySearchParam(paramDataObj);
                    }
                }else{
                    $('#searchUWLInput').css({'border-color':'#f18178'});
                    var notificationMsgStr = "Type person name or email address to find your friends wish list !";
                    showNotificationBoxMsg(notificationMsgStr);
                }
            }
        };
        
        // getUserwiseWLSummaryBySearchParam 
        $rootScope.getUserwiseWLSummaryBySearchParam = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    $rootScope.searchedAllUserwiseWLSummaryArrJsonObj = false;
                    
                    // calling WishListServices 
                    WishListServices.searchUWL(fetchedParamJsonObj).done(function(retResponseJson){
                        // console.log("searchUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var notificationMsgStr = '';
                                var searchedAllUserwiseWLSummaryArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'searchedAllUserwiseWLSummary', retResponseJson);
                                if(searchedAllUserwiseWLSummaryArrJsonObj!==false && searchedAllUserwiseWLSummaryArrJsonObj!==undefined){
                                    $rootScope.searchedAllUserwiseWLSummaryArrJsonObj = searchedAllUserwiseWLSummaryArrJsonObj;
                                    notificationMsgStr = "Your "+(searchedAllUserwiseWLSummaryArrJsonObj).length +" friends wish list data has been displayed below !";
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }else{
                                    notificationMsgStr  = "No friend(s) wish list found for entered searched string: "+paramDataObj['search_string'];
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in getUserwiseWLSummaryBySearchParam ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // collectDataToShowSearchedUserWLtemBySearchParam
        $rootScope.collectDataToShowSearchedUserWLItemBySearchParam = function(userwiseWLSummaryDataObj){
            $rootScope.resetUWLVariable('showSearchedAllUserwiseWLItem');
            var paramDataObj = getParamDataToShowSearchedUserWLItemBySearchParam(userwiseWLSummaryDataObj);
            $rootScope.getUserWLItemBySearchParam(paramDataObj);
        };
        
        // getUserWLItemBySearchParam 
        $rootScope.getUserWLItemBySearchParam = function(paramDataObj){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = paramDataObj;

                    $rootScope.searchedUserwiseWLAllItemArrJsonObj = false;
                    
                    // calling WishListServices 
                    WishListServices.searchUWL(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var notificationMsgStr = '';
                                var searchedUserwiseWishListAllItemArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'searchedUserwiseWLAllItem', retResponseJson);
                                if(searchedUserwiseWishListAllItemArrJsonObj!==false && searchedUserwiseWishListAllItemArrJsonObj!==undefined){
                                    var yourFriendsName = searchedUserwiseWishListAllItemArrJsonObj[0]['userName'];
                                    var yourFriendsWLItemCount = searchedUserwiseWishListAllItemArrJsonObj[0]['wlmCount'];
                                    notificationMsgStr = "You are viewing "+yourFriendsWLItemCount+" item(s) of your friend '"+yourFriendsName+"' wish list !";
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                    $rootScope.searchedUserwiseWLAllItemArrJsonObj = searchedUserwiseWishListAllItemArrJsonObj;
                                }else{
                                    notificationMsgStr = "No item found in wish list, please view another wish list !";
                                    $rootScope.isShowWLMsg = true;
                                    $rootScope.wlMsgStr = notificationMsgStr;
                                }
                                showNotificationBoxMsg(notificationMsgStr);
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in getUserWishListItemBySearchParam ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // collectDataToCopyProductFromUWLToUWL
        $rootScope.collectDataToCopyProductFromUWLToUWL = function(elementId, notLoggedUserwiseWLSummaryDataObj){
            if($('#'+elementId).length>0){
                var moveProductParamDataObj = getParamDataToCopyProductFromUWLToUWL(elementId);
                // console.log("collectDataToCopyProductFromUWLToUWL retParamDataObj=>"+retParamDataObj);
                $rootScope.copyProductFromUWLToUWL(moveProductParamDataObj, notLoggedUserwiseWLSummaryDataObj);
            }
        };
        
        // copyProductFromUWLToUWL 
        $rootScope.copyProductFromUWLToUWL = function(copyProductParamDataObj, notLoggedUserwiseWLSummaryDataObj){
            try{
                if(copyProductParamDataObj!==false && jQuery.isEmptyObject(copyProductParamDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = copyProductParamDataObj;

                    // calling WishListServices 
                    WishListServices.copyProductFromUWLToUWL(fetchedParamJsonObj).done(function(retResponseJson){
                        // console.log("copyProductFromUWLToUWL retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var retStatusIsProductCopiedFromUWLToUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusIsProductCopiedFromUWLToUWL = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductCopiedFromUWLToUWL', retResponseJson);
                            }
                            if(retStatusIsProductCopiedFromUWLToUWL==='TRUE'){
                                notificationMsgStr = "Item copied from your friends wish list to yours successfully !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                $rootScope.collectDataToShowSearchedUserWLItemBySearchParam(notLoggedUserwiseWLSummaryDataObj);
                                // refresh user wish list dashboard summary data
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            }else{
                                notificationMsgStr = "Please try again to copy item from your friends wish list to yours !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in copyProductFromUWLToUWL ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // prepareProductDataToAddInUWL 
        $rootScope.prepareProductDataToAddInUWL = function(productDetailsObj){
            try{
                // store product data in session wish list
                var retStatusDataStored = storeProductDataInSessionForUWL(productDetailsObj);
                if(retStatusDataStored===true){
                    var retUserLoggedInStatus = checkUserLoggedInSession();
                    if(retUserLoggedInStatus===false || retUserLoggedInStatus===undefined || retUserLoggedInStatus===''){
                        $rootScope.redirectToViewWishList('wishlist');
                    }else{
                        $rootScope.addProductFromSessionToUWL();
                    }
                }
            }catch(ex){
                // console.log("problem in prepareProductDataToAddInUWL ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // checkProductDataAvailableInSessionToAddUWL, Think on it cj
        $rootScope.checkProductDataAvailableInSessionToAddUWL = function(){
            if(($rootScope.wlCount===0 || $rootScope.wlCount==='') 
                && checkProductDataAvailableInSessionToAddUWL()){
                var notificationMsgStr = "Please create your wish list to add item for remembering !";
                $rootScope.isShowWLMsg = true;
                $rootScope.wlMsgStr = notificationMsgStr;
                showNotificationBoxMsg(notificationMsgStr);
            }else if($rootScope.wlCount>0 && $rootScope.wlCount!==''){
                $rootScope.addProductFromSessionToUWL();
            }
        };
        
        // addProductFromSessionToUWL 
        $rootScope.addProductFromSessionToUWL = function(){
            try{
                // get stored product data from session
                var storedProductDataObj = getStoredProductDataFromSessionToAddUWL();
                if(storedProductDataObj!==false && jQuery.isEmptyObject(storedProductDataObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);

                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = storedProductDataObj;

                    // calling WishListServices 
                    WishListServices.addProductToUWL(fetchedParamJsonObj).done(function(retResponseJson){
                        // console.log("addProductToWishList retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            var retStatusIsProductAddedToUWL = 'FALSE';
                            var notificationMsgStr = '';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                retStatusIsProductAddedToUWL = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isProductAddedUWL', retResponseJson);
                            }
                            if(retStatusIsProductAddedToUWL==='TRUE'){
                                notificationMsgStr = "Item added to your default wish list successfully !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                                clearStoredProductDataFromSessionForUWL();
                                // refresh user wish list dashboard summary data
                                WishListServices.refreshUserWLDashboardSummaryDataDetails();
                            }else{
                                notificationMsgStr = "Please try again to add item in your wish list !";
                                $rootScope.isShowWLMsg = true;
                                $rootScope.wlMsgStr = notificationMsgStr;
                            }
                            showNotificationBoxMsg(notificationMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in addProductToWishList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
    }catch(ex){
        console.log("problem in wishlist controller ex=>"+ex);
    }
});


// RefreshWebAppDataController
app.controller('RefreshWebAppDataController', function($scope, $rootScope, $http, UsersServices, OrderCartServices, WishListServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            var retUserDashboardSummaryDataObj = UsersServices.refreshUserDashboardSummaryDataDetails();
            var retUserOrdercartDashboardSummaryDataObj = OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            var retUserWLDashboardSummaryDataObj = WishListServices.refreshUserWLDashboardSummaryDataDetails();
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
});


// OrderCartController
app.controller('UCustomerController', function($scope, $rootScope, $http, UsersServices, WishListServices, OrderCartServices){
    try{
        
        $rootScope.isShowUCustomerAccountOtherSectionList = false;
        
        // storeRequestedSectionNameToAccessInUserCAccount
        $rootScope.storeRequestedSectionNameToAccessInUserCAccount = function(requestedSectionName){
            var isUserLoggedInSession = checkUserLoggedInSession();
            if(requestedSectionName!=='' && requestedSectionName!==false 
                && requestedSectionName!==undefined && isUserLoggedInSession===true){
                storeRequestedSectionNameToAccessInUserCAccount(requestedSectionName);
                window.location.href = globalBaseSitePath+"usercaccount.php";
            }
        };
        
        // checkRequestedSectionAvailableToAccessInUserCAccount
        $rootScope.checkRequestedSectionAvailableToAccessInUserCAccount = function(){
            var isUserLoggedInSession = checkUserLoggedInSession();
            var requestedSectionConfigDataObj =  getStoredRequestedSectionNameToAccessInUserCAccount();
            if(isUserLoggedInSession===true && requestedSectionConfigDataObj!==false 
                && requestedSectionConfigDataObj!==undefined 
                && jQuery.isEmptyObject(requestedSectionConfigDataObj)===false){
                var requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
                if(requestedSectionName==='ordercart'){
                    $rootScope.displayOrdercartSectionToAccessInUserCAccount(requestedSectionConfigDataObj);
                }
            }
        };
        
        // toggleUCustomerAccountOtherSectionList
        $rootScope.toggleUCustomerAccountOtherSectionList = function(){
            if($rootScope.isShowUCustomerAccountOtherSectionList===false){
                $rootScope.isShowUCustomerAccountOtherSectionList = true;
            }else if($rootScope.isShowUCustomerAccountOtherSectionList===true){
                $rootScope.isShowUCustomerAccountOtherSectionList = false;
            }
        };
        
        // displayOrdercartSectionToAccessInUserCAccount
        $rootScope.displayOrdercartSectionToAccessInUserCAccount = function(requestedSectionConfigDataObj){
            $rootScope.displayedSectionName = requestedSectionConfigDataObj['displaySectionName'];
            $rootScope.requestedSectionName = requestedSectionConfigDataObj['requestedSectionName'];
            OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            $rootScope.uca_toggleOrdercartSectionList($rootScope.requestedSectionName);
        };
        
        $rootScope.uca_toggleOrdercartSectionList = function(displayOrdercartSectionType){
            if(displayOrdercartSectionType==='ordercart' || displayOrdercartSectionType==='requestitem'){
                $rootScope.displayOrdercartSectionType = 'requestitem';
            }else{
                $rootScope.displayOrdercartSectionType = displayOrdercartSectionType;
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
        
    }catch(ex){
        console.log("problem in UCustomerController ex=>"+ex);
    }
    
});


///////////////////////////////////// DK directive start ///////////////////////////


// resizeWindowDirective
app.directive('resizeWindowDirective', function($window){
    return {
        link:function(scope){
            // caculate height, width
            function onResize(e){
                isWindowResize = 'Y';
                deviceWidth = parseInt($(window).width());
                deviceHeight = parseInt($(window).height());
                console.log("on resize deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);
                // Namespacing events with name of directive + event to avoid collisions
                scope.$broadcast('resize::resize');
            }
            // clean up process
            function cleanUp() {
                angular.element($window).off('resize', onResize);
            }
            // bind resize on window
            angular.element($window).on('resize', onResize);
            scope.$on('$destroy', cleanUp);
        }
    };
});

// scrollWindowDirective
app.directive('scrollWindowDirective', function($window){
    return {
        link:function(scope){
            function onScroll(e){
                // Namespacing events with name of directive + event to avoid collisions
                scope.$broadcast('scroll::scroll');
            }
            // clean up process
            function cleanUp() {
                angular.element($window).off('scroll', onScroll);
            }
            // bind scroll on window
            angular.element($window).on('scroll', onScroll);
            scope.$on('$destroy', cleanUp);
        }
    };
});

// scrollToTopBtnClass
app.directive("scrollToTopBtnClass", function($window){
    return {
        restrict: 'C',
        link: function($scope, $el, $attrs){
            $scope.isShowScrollToTopBtnWebAppPage = false;
            // listening scroll event
            $scope.$on('scroll::scroll', function(){
                // console.log("scrollToTopBtnClass=>"+$window.pageYOffset);
                if($window.pageYOffset>=300){
                    $scope.isShowScrollToTopBtnWebAppPage = true;
                    $el.click(function(){
                        $('html,body').animate({
                            scrollTop:0
                        });
                    });
                }else{
                    $scope.isShowScrollToTopBtnWebAppPage = false;
                }
                $scope.$apply();
            });
        }
    };
});

// for onBodyScrollClass
app.directive("onBodyScrollClass", function($window){
    return {
        restrict: 'C',
        link: function($scope, $el, $attrs){
            $scope.stickNtStickWebAppHeaderClass = 'notStickFHeaderContainerDivClass';
            $scope.$on('scroll::scroll', function(){
                if($window.pageYOffset>=12){
                    //$scope.stickNtStickWebAppHeaderClass = 'stickFHeaderContainerDivClass';
                }else{
                    //$scope.stickNtStickWebAppHeaderClass = 'notStickFHeaderContainerDivClass';
                }
                $scope.$apply();
            });
        }
    };
});

// showCustomerDeliveryCityAreaDessertsProductTypeTextForHeaderDivClass
app.directive("showCustomerDeliveryCityAreaDessertsProductTypeTextForHeaderDivClass", function($window){
    return {
        restrict: 'C',
        link: function($scope, $el, $attrs){
            $scope.isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader = false;
            $scope.customerDeliveryCityAreaDessertsProductTypeTextForHeader = '';
            $scope.$on('scroll::scroll', function(){
                if($window.pageYOffset>=12){
                    var msgStr = getCustomerDeliveryCityAreaDessertsProductTypeTextForHeader();
                    if(msgStr!=='' && msgStr!==undefined && msgStr!==false){
                        //$scope.isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader = true;
                        //$scope.customerDeliveryCityAreaDessertsProductTypeTextForHeader = msgStr;
                    }
                }else{
                    $scope.isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader = false;
                    $scope.customerDeliveryCityAreaDessertsProductTypeTextForHeader = '';
                }
                $scope.$apply();
            });
        }
    };
});


// images pre loading directive
app.directive('preloadProductImagesClass', function($timeout) {
    return {
        restrict: 'C',
        link: function (scope, elm){
           $timeout(function(){
                $(elm).lazyload({
                    effect:'fadeIn',
                    effectspeed:100,
                    'skip_invisible':false
                });
            },0);
        }
    };
});

// viewProductqtyinputDirective
app.directive('viewProductqtyinputDirective', function($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $el.numeric(
                {
                    "allowMinus":false, 
                    "allowThouSep":false, 
                    "allowLeadingSpaces":false, 
                    "startWith":"1",
                    "allowDecSep":false
                }
            );
        }
    };
});


// viewProductmsginputDirective
app.directive('viewProductmsginputDirective', function($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $el.alphanum(
                {
                    "maxLength":40,
                    "allowOtherCharSets":false,
                    "allow":''
                }
            );
        }
    };
});


// loadDklogoImagesDirective
app.directive('loadDklogoImagesDirective', function(){
    return function(scope, element, attrs){
        loadDkLogoImages(element);
        scope.$on('resize::resize', function() {
            loadDkLogoImages();
        });
    };
});


// loadPartyorderImagesDirective
app.directive('loadPartyorderImagesDirective', function(){
    return function(scope, element, attrs){
        loadPartyOrderImages(element);
        scope.$on('resize::resize', function() {
            loadPartyOrderImages();
        });
    };
});

// loadCoperatetieupImagesDirective
app.directive('loadCoperatetieupImagesDirective', function(){
    return function(scope, element, attrs){
        loadCoperateTieupImages(element);
        scope.$on('resize::resize', function() {
            loadCoperateTieupImages();
        });
    };
});

// loadCustomizeorderImagesDirective
app.directive('loadCustomizeorderImagesDirective', function(){
    return function(scope, element, attrs){
        loadCustomizeOrderImages(element);
        scope.$on('resize::resize', function() {
            loadCustomizeOrderImages();
        });
    };
});


// CJ defined this function 2016-07-10
function loadDkLogoImages(){
    if($('.dkLogoImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.dkLogoImgClass').attr('src', "images/dk/dklogo/dessertskhazanalogo-290|129.png");
        }
        if(deviceWidth>=400){
            $('.dkLogoImgClass').attr('src', "images/dk/dklogo/dessertskhazanalogo-290|129.png");
        }
    }
}

// CJ defined this function 2016-07-10
function loadPartyOrderImages(){
    if($('.partyOrderImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.partyOrderImgClass').attr('src', "images/dk/homebanner/hb_partyorderbg-288|124.png");
        }
        if(deviceWidth>=400){
            $('.partyOrderImgClass').attr('src', "images/dk/homebanner/hb_partyorderbg-588|253.png");
        }
    }
}

// CJ defined this function 2016-07-10
function loadCoperateTieupImages(){
    if($('.coperateOrderImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.coperateOrderImgClass').attr('src', "images/dk/homebanner/hb_corporatepartybg-288|124.png");
        }
        if(deviceWidth>=400){
            $('.coperateOrderImgClass').attr('src', "images/dk/homebanner/hb_corporatepartybg-588|253.png");
        }
    }
}

// CJ defined this function 2016-07-10
function loadCustomizeOrderImages(){
    if($('.customizeOrderImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.customizeOrderImgClass').attr('src', "images/dk/homebanner/hb_customizeOrder-588|253.png");
        }
        if(deviceWidth>=400){
            $('.customizeOrderImgClass').attr('src', "images/dk/homebanner/hb_customizeOrder-588|253.png");
        }
    }
}

// customerBreadcrumbDirective
app.directive('customerBreadcrumbDirective', function(){
    return function(scope, element, attrs){
        // customer product breadcrumb fetch
        scope.customerBreadCrumbOnWebApp = getCustomerBreadcrumb();
    };
});

// scrollHorizontallyDessertsproducttypelistDashboardlevel
app.directive('scrollHorizontallyDessertsproducttypelistDashboardlevel', function(){
    return {
        link:function(scope, element, attrs){
            if(scope.$last){
                setTimeout(function(){
                    // apply horizontal scrolling features
                    if($('#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId').length>0){
                        var existingOwlOptions = {
                            navigation:false,
                            paginationSpeed:1000,
                            goToFirstSpeed:2000,
                            transitionStyle:"fade",
                            itemsScaleUp:true
                        };
                        var owlObj = $("#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").data('owlCarousel');
                        if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                            owlObj.reinit(existingOwlOptions);
                        }else{
                            $("#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                        }
                    }
                }, 1);
            }
        }
    };
});

// maxheightProductboxwidgetDashboardlevel
app.directive('maxheightProductboxwidgetDashboardlevel', function(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply max height css on element
            setTimeout(function(){
                applyMaxHeightCssOnAllProductBoxWidget('dl_productBoxWidgetDivClass');
            }, 1);
            scope.$on('resize::resize', function() {
                applyMaxHeightCssOnAllProductBoxWidget('dl_productBoxWidgetDivClass');
            });
        }
    };
});

// scrollHorizontallyDessertsproducttypelistViewproductlevel
app.directive('scrollHorizontallyDessertsproducttypelistViewproductlevel', function(){
    return function(scope, element, attrs){
        if(scope.$last){
            setTimeout(function(){
                if($('#vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
});

// scrollHorizontallyDessertsproducttypelistAllproductlevel
app.directive('scrollHorizontallyDessertsproducttypelistAllproductlevel', function(){
    return function(scope, element, attrs){
        if(scope.$last){
            setTimeout(function(){
                if($('#vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
});


// scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel
app.directive('scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel', function(){
    return function(scope, element, attrs){
        if(scope.$first){
            $(element).addClass('vap_eachRequestedProductCategoryLabelDivClass');
        }
        if(scope.$last){
            setTimeout(function(){
                if($('#vap_productAllCategoryContainerDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#vap_productAllCategoryContainerDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#vap_productAllCategoryContainerDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
});

// maxheightProductboxwidgetAllproductslevel
app.directive('maxheightProductboxwidgetAllproductslevel', function(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply max height css on element
            setTimeout(function(){
                applyMaxHeightCssOnAllProductBoxWidget('vap_productBoxWidgetDivClass');
            }, 1);
            scope.$on('resize::resize', function() {
                applyMaxHeightCssOnAllProductBoxWidget('vap_productBoxWidgetDivClass');
            });
        }
    };
});

// scrollHorizontallyCshopstoresummaryinfo
app.directive('scrollHorizontallyCshopstoresummaryinfo', function(){
    return function(scope, element, attrs){
        // apply horizontal scrolling features
        setTimeout(function(){
            if($('#cshopStoreSummaryInfoWrapperDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade",
                    autoHeight:true
                };
                var owlObj = $("#cshopStoreSummaryInfoWrapperDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#cshopStoreSummaryInfoWrapperDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
});

// scrollHorizontallyDessertsproducttypelistCshopstorelevel
app.directive('scrollHorizontallyDessertsproducttypelistCshopstorelevel', function(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply horizontal scrolling features
            setTimeout(function(){
                if($('#cshopStoreServedAllDessertsProductScrollerWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#cshopStoreServedAllDessertsProductScrollerWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#cshopStoreServedAllDessertsProductScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
});

// scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel
app.directive('scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel', function(){
    return function(scope, element, attrs){
        if(scope.$first){
            $(element).addClass('cshopstore_eachRequestedProductCategoryLIClass');
        }
        if(scope.$last){
            // apply horizontal scrolling features
            setTimeout(function(){
                if($('#cShopStoreProductAllCategoryContainerDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#cShopStoreProductAllCategoryContainerDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#cShopStoreProductAllCategoryContainerDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
});

// maxheightProductboxwidgetCshopstorelevel
app.directive('maxheightProductboxwidgetCshopstorelevel', function(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply max height css on element
            setTimeout(function(){
                applyMaxHeightCssOnAllProductBoxWidget('cshopstore_productBoxWidgetDivClass');
            }, 1);
            scope.$on('resize::resize', function() {
                applyMaxHeightCssOnAllProductBoxWidget('cshopstore_productBoxWidgetDivClass');
            });
        }
    };
});

// CJ defined this function 2016-07-18 
function applyMaxHeightCssOnAllProductBoxWidget(applyMaxheightOnElementClassName){
    var maxHeight = 0;
    var allProductBoxWidgetElementObj = document.getElementsByClassName(applyMaxheightOnElementClassName);
    if(allProductBoxWidgetElementObj.length>0 && allProductBoxWidgetElementObj!==null){
        // iterate each element to get max height
        for(var elmentIndex = 0; elmentIndex< allProductBoxWidgetElementObj.length; elmentIndex++){
            var currentIteratedElementHeight = $(allProductBoxWidgetElementObj[elmentIndex]).height();
            if (currentIteratedElementHeight>maxHeight){
                maxHeight = currentIteratedElementHeight;
            }
        }
    }
    if(maxHeight>0){
        // $("."+applyMaxheightOnElementClassName).css({"height":maxHeight+"px"});
    }
}

// scrollTopWhenDisplayRenderingFinishedDessertsproductlist
app.directive('scrollTopWhenDisplayRenderingFinishedDessertsproductlist', function(){
    return function(scope, $element, attrs){
        if(scope.$last){
            /*
                var windowTopPos = angular.element('#dl_DeliveryAreabasedDkServedAllDessertsContainerDivId').offset().top;
                $('html,body').animate({
                    scrollTop:windowTopPos
                });
            */
        }
    };
});

// scrollVerticallyOrdercartitemrequestedList
app.directive('scrollVerticallyOrdercartitemrequestedList', function(){
    return function(scope, $element, attrs){
        if(scope.$last){
            /* slim scroll feature attached here */
            if($('#dropdown_odrcartAllItemRequestedDivId').length>0){
                $('#dropdown_odrcartAllItemRequestedDivId').slimscroll({
                    height:'200px',
                    allowPageScroll:false,
                    railVisible:true,
                    start:'top',
                    color:'#00B9F5',
                    alwaysVisible: true,
                    distance:'0px',
                    size:'6px'
                });
            }
        }
    };
});


// scroll-horizontally-ordercart-allsectionheader-directive
app.directive('scrollHorizontallyOrdercartAllsectionheaderDirective', function(){
    return function(scope, element, attrs){
        setTimeout(function(){
            if($('#uca_ordercartAllSectionHeaderContainerDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade"
                };
                var owlObj = $("#uca_ordercartAllSectionHeaderContainerDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#uca_ordercartAllSectionHeaderContainerDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
});