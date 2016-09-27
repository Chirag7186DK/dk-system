
angular.module('DKAPP').controller('CustomizeOrdersController', CustomizeOrdersController);

function CustomizeOrdersController($scope, $rootScope, $http, CustomizeOrdersServices){
    try{
        
        $rootScope.isShowCustomizeOrderRequestErrorMsg = false;
        $rootScope.isShowCustomizeOrderRequestFormContent = true;
        $rootScope.isShowCustomizeOrderRequestSendThankyouMsg = false;
        $rootScope.customizeOrderErrorMsgStr = '';
        $rootScope.requestedCustomizeOrderNo = '';
        
        // redirectToViewCustomizeOrderRequest 
        $rootScope.redirectToViewCustomizeOrderRequest = function(){
            try{
                // check user logged in dk session
                var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(authenticatedUserParamDataObj!==false && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                    storeRequestedSectionNameToAccessInUserAccount('partyorder');
                    if(authenticatedUserParamDataObj.hasOwnProperty('userProfileTypeId')===true){
                        // detected user account as customer profile
                        if(authenticatedUserParamDataObj['userProfileTypeId']==='2'){
                            window.location.href = globalBaseSitePath+"customer-account.php";
                        }
                    }
                }else{
                    window.location.href = globalBaseSitePath + "customizeorder.php";
                }
            }catch(ex){
                console.log("problem in redirectToViewPartyOrderRequest ex=>"+ex);
            }
        };
        
        // addCustomizeOrdersRequest 
        $rootScope.addCustomizeOrdersRequest = function(){
            try{
                var retValidateParamDataStatus = validateParamDataCustomizeOrderRequest();
                if(retValidateParamDataStatus===false){
                    $rootScope.isShowCustomizeOrderRequestErrorMsg = true;
                    $rootScope.customizeOrderErrorMsgStr = 'Please fill-up form details to send request customize order !!!';
                }else{
                    var preparedParamJsonObj = getParamDataObjForCustomizeOrderRequest();
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var apiParamJsonObj = {};
                        apiParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        // calling CustomizeOrdersServices to add customize order request
                        CustomizeOrdersServices.addCustomizeOrderRequest(apiParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var coRequestedStatusDetails = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'coRequestedStatusDetails', retResponseJson);
                                    if(coRequestedStatusDetails!==false && coRequestedStatusDetails!==undefined 
                                        && jQuery.isEmptyObject(coRequestedStatusDetails)===false){
                                        if(coRequestedStatusDetails['isCustomizeOrderRequestSend']==='YES'){
                                            clearCustomizeOrderRequestFormField();
                                            $rootScope.isShowCustomizeOrderRequestFormContent = false;
                                            $rootScope.isShowCustomizeOrderRequestSendThankyouMsg = true;
                                            $rootScope.requestedCustomizeOrderNo = coRequestedStatusDetails['customizeOrderNo'];
                                        }else{
                                            $rootScope.isShowCustomizeOrderRequestErrorMsg = false;
                                            $rootScope.customizeOrderErrorMsgStr = 'Please try again to send request customize order !!!';
                                            $rootScope.requestedCustomizeOrderNo  = '';
                                        }
                                    }else{
                                        $rootScope.isShowCustomizeOrderRequestErrorMsg = true;
                                        $rootScope.customizeOrderErrorMsgStr = 'Please try again to send request customize order !!!';
                                        $rootScope.requestedCustomizeOrderNo  = '';
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                console.log("problem in addCustomizeOrderRequest ex=>"+ex);
            }
        };
        
        // toggleNewCustomizeOrderRequestFormContent
        $rootScope.toggleNewCustomizeOrderRequestFormContent = function(){
            try{
                $rootScope.isShowCustomizeOrderRequestErrorMsg = false;
                $rootScope.isShowCustomizeOrderRequestFormContent = true;
                $rootScope.isShowCustomizeOrderRequestSendThankyouMsg = false;
                $rootScope.customizeOrderErrorMsgStr = '';
                $rootScope.requestedCustomizeOrderNo = '';
            }catch(ex){
                console.log("problem in toggleNewCustomizeOrderRequestFormContent ex=>"+ex);
            }
        };
        
        // loadCustomizeOrdersList 
        $rootScope.loadCustomizeOrdersList = function(){
            try{
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.customizeOrderListArrObj = false;
                    // calling CustomizeOrdersServices to add customize order request
                    CustomizeOrdersServices.getCustomizeOrdersList(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var customizeOrderListArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'customizeOrderList', retResponseJson);
                                if(customizeOrderListArrObj!==false && customizeOrderListArrObj!==undefined 
                                    && jQuery.isEmptyObject(customizeOrderListArrObj)===false){
                                    $rootScope.customizeOrderListArrObj = customizeOrderListArrObj;
                                }else{
                                    $rootScope.customizeOrderListArrObj = false;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadCustomizeOrdersList ex=>"+ex);
            }
        };
        
        // toggleCOLogList
        $rootScope.toggleCOLogList = function(coDataObj){
            coDataObj.isShowCoPaymentLogList = false;
            if(coDataObj.isCoShowLogList===true){
                coDataObj.isCoShowLogList = false;
            }else{
                coDataObj.isCoShowLogList = true;
            }
        };
        
        // toggleCOPaymentLogList
        $rootScope.toggleCOPaymentLogList = function(coDataObj){
            coDataObj.isCoShowLogList = false;
            if(coDataObj.isShowCoPaymentLogList===true){
                coDataObj.isShowCoPaymentLogList = false;
            }else{
                coDataObj.isShowCoPaymentLogList = true;
            }
        };
        
        
    }catch(ex){
        console.log("problem in CustomizeOrdersController ex=>"+ex);
    }
}
