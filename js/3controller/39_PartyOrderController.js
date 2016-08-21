
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
