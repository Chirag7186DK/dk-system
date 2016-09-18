
angular.module('DKAPP').controller('PartyOrdersController', PartyOrdersController);

// PartyOrdersController
function PartyOrdersController($scope, $rootScope, PartyOrdersServices){
    
    try{
        
        $rootScope.isShowPartyOrderRequestErrorMsg = false;
        $rootScope.isShowPartyOrderRequestFormContent = true;
        $rootScope.isShowPartyOrderRequestSendThankyouMsg = false;
        $rootScope.partyOrderErrorMsgStr = '';
        $rootScope.requestedPartyOrderNo = '';
        
        // redirectToViewPartyOrderRequest 
        $rootScope.redirectToViewPartyOrderRequest = function(){
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
                    window.location.href = globalBaseSitePath + "partyorder.php";
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
                    // console.log("addPartyOrdersRequest preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        // calling PartyOrdersServices to add party order request
                        PartyOrdersServices.addPartyOrderRequest(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var poRequestedStatusDetails = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'poRequestedStatusDetails', retResponseJson);
                                    if(poRequestedStatusDetails!==false && poRequestedStatusDetails!==undefined 
                                        && jQuery.isEmptyObject(poRequestedStatusDetails)===false){
                                        if(poRequestedStatusDetails['isPartyOrderRequestSend']==='YES'){
                                            clearPartyOrderRequestFormField();
                                            $rootScope.isShowPartyOrderRequestFormContent = false;
                                            $rootScope.isShowPartyOrderRequestSendThankyouMsg = true;
                                            $rootScope.requestedPartyOrderNo = poRequestedStatusDetails['partyOrderNo'];
                                        }else{
                                            $rootScope.isShowPartyOrderRequestErrorMsg = false;
                                            $rootScope.partyOrderErrorMsgStr = 'Please try again to send request party order !';
                                            $rootScope.requestedPartyOrderNo  = '';
                                        }
                                    }else{
                                        $rootScope.isShowPartyOrderRequestErrorMsg = true;
                                        $rootScope.partyOrderErrorMsgStr = 'Please try again to send request party order !';
                                        $rootScope.requestedPartyOrderNo  = '';
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                console.log("problem in addPartyOrderRequest ex=>"+ex);
            }
        };
        
        // toggleNewPartyOrderRequestFormContent
        $rootScope.toggleNewPartyOrderRequestFormContent = function(){
            try{
                $rootScope.isShowPartyOrderRequestErrorMsg = false;
                $rootScope.isShowPartyOrderRequestFormContent = true;
                $rootScope.isShowPartyOrderRequestSendThankyouMsg = false;
                $rootScope.partyOrderErrorMsgStr = '';
                $rootScope.requestedPartyOrderNo = '';
            }catch(ex){
                console.log("problem in toggleNewPartyOrderRequestFormContent ex=>"+ex);
            }
        };
        
        // getPartyOrdersList 
        $rootScope.getPartyOrdersList = function(){
            try{
                var preparedParamJsonObj = getParamDataAuthenticatedUserDetailsFromSession();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchAreaParamJsonObj = {};
                    fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.partyOrderListArrObj = false;
                    // calling PartyOrdersServices to add party order request
                    PartyOrdersServices.getPartyOrdersList(fetchAreaParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var partyOrderListArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'partyOrderList', retResponseJson);
                                if(partyOrderListArrObj!==false && partyOrderListArrObj!==undefined 
                                    && jQuery.isEmptyObject(partyOrderListArrObj)===false){
                                    $rootScope.partyOrderListArrObj = partyOrderListArrObj;
                                }else{
                                    $rootScope.partyOrderListArrObj = false;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in getPartyOrdersList ex=>"+ex);
            }
        };
        
    }catch(ex){
        console.log("problem in PartyOrdersController ex=>"+ex);
    }
}
