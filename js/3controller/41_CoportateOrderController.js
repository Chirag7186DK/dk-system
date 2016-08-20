
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
