
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
