
// OrderCartController
app.controller('UCustomerController', function($scope, $rootScope, $http, UsersServices, WishListServices, OrderCartServices){
    try{
        
        $rootScope.isShowUCustomerAccountOtherSectionList = false;
        
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
