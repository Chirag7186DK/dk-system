
// CustomizeOrderController
app.controller('CustomizeOrdersController', function($scope, $rootScope, $http, CustomizeOrdersServices){
    try{
        
        $rootScope.isShowCustomizeOrderRequestErrorMsg = false;
        $rootScope.isShowCustomizeOrderRequestFormContent = true;
        $rootScope.isShowCustomizeOrderRequestSendThankyouMsg = false;
        $rootScope.customizeOrderErrorMsgStr = '';
        $rootScope.requestedPartyOrderNo = '';
        
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
                            window.location.href = globalBaseSitePath+"usercaccount.php";
                        }
                    }
                }else{
                    window.location.href = globalBaseSitePath + "customizeorder.php";
                }
            }catch(ex){
                console.log("problem in redirectToViewPartyOrderRequest ex=>"+ex);
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
                                            $rootScope.customizeOrderErrorMsgStr = 'Please try again to send request customize order !';
                                            $rootScope.requestedCustomizeOrderNo  = '';
                                        }
                                    }else{
                                        $rootScope.isShowCustomizeOrderRequestErrorMsg = true;
                                        $rootScope.customizeOrderErrorMsgStr = 'Please try again to send request customize order !';
                                        $rootScope.requestedCustomizeOrderNo  = '';
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
