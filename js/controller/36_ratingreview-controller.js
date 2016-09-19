
angular.module('DKAPP').controller('RatingReviewController', RatingReviewController);

function RatingReviewController($scope, $rootScope, RatingReviewServices){
    try{
        
        // loadAverageRatingReviewedProduct 
        $rootScope.loadAverageRatingReviewedProduct = function(){
            try{
                // get param obj
                var paramDataObj = getParamObjFromSessionForRatingReviewDetails();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    $rootScope.avgRatingReviewedProductDetails = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getAverageRatingReviewProduct(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var dataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(dataObj!==false && dataObj!==undefined && dataObj!==''){
                                    $rootScope.avgRatingReviewedProductDetails = dataObj.avgRatingReviewedProductDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.avgRatingReviewedProductDetails = false;
                console.log("problem in loadAverageRatingReviewedProduct ex=>"+ex);
            }
        };
        
        // loadMaxAverageRatingReviewedProduct 
        $rootScope.loadMaxAverageRatingReviewedProduct = function(){
            try{
                // get param obj to get product description details
                var paramDataObj = getParamObjFromSessionForRatingReviewDetails();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    $rootScope.maxRatingReviewedTypeDetailsArr = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getMaxRatingReviewProduct(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var dataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(dataObj!==false && dataObj!==undefined && dataObj!==''){
                                    $rootScope.maxRatingReviewedTypeDetailsArr = dataObj.maxRatingAndReviewedTypeDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.maxRatingReviewedTypeDetailsArr = false;
                console.log("problem in loadMaxAverageRatingReviewedProduct ex=>"+ex);
            }
        };
        
        // loadStoreRatingReviewQuestions 
        $rootScope.loadStoreRatingReviewQuestions = function(){
            try{
                // get param obj to get product description details
                var paramDataObj = getParamObjFromSessionForRatingReviewDetails();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    $rootScope.storeRatingReviewQuestionDetails = false;
                    $rootScope.isStoreRatingReviewQuestionFound = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getStoreRatingReviewQuestions(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var dataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(dataObj!==false && dataObj!==undefined && dataObj!==''){
                                    $rootScope.storeRatingReviewQuestionDetails = dataObj.storeRatingReviewQuestionDetails;
                                    $rootScope.isStoreRatingReviewQuestionFound = dataObj.isStoreRatingReviewQuestionFound;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.storeRatingReviewQuestionDetails = false;
                $rootScope.isStoreRatingReviewQuestionFound = false;
                console.log("problem in loadStoreRatingReviewQuestions ex=>"+ex);
            }
        };
        
        // loadAllUserRatingReviewProduct 
        $rootScope.loadAllUserRatingReviewProduct = function(){
            try{
                // get param obj to load all user rating about product 
                var paramDataObj = getParamObjFromSessionForRatingReviewDetails();
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    $rootScope.allUserRatingReviewProductDetailsArr = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getAllUserRatingReviewProduct(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var dataObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(dataObj!==false && dataObj!==undefined && dataObj!==''){
                                    $rootScope.allUserRatingReviewAboutProductDetailsArr = dataObj.allUserRatingReviewProductDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.allUserRatingReviewProductDetailsArr = false;
                console.log("problem in loadAllUserRatingReviewProduct ex=>"+ex);
            }
        };
        
        // collectDataToAddUserRatingReviewProduct
        $rootScope.collectDataToAddUserRatingReviewProduct = function(fcontentCass){
            var validatedDataStatus = validateDataToAddUserRatingReviewProduct(fcontentCass);
            if(validatedDataStatus===true){
                var paramDataObj = getParamDataForAddingUserRatingReviewProduct(fcontentCass);
                if(Object.keys(paramDataObj).length===4 && paramDataObj!==false){
                    $rootScope.addUserRatingReviewProduct(paramDataObj, fcontentCass);
                }else{
                    var notifyMsgStr = 'Please enter comment for rating & review about product !';
                    showNotificationBoxMsg(notifyMsgStr);
                }
            }else{
                var notifyMsgStr = 'Please enter comment for rating & review about product !';
                showNotificationBoxMsg(notifyMsgStr);
            }
        };
        
        // addUserRatingReviewProduct
        $rootScope.addUserRatingReviewProduct = function(paramDataObj, fcontentCass){
            try{
                if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = paramDataObj;
                    // calling RatingReviewServices 
                    RatingReviewServices.addUserRatingReviewProduct(apiParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            var notifyMsgStr = 'Please try again to post review & rating about product !!!';
                            var isUserAddedRatingReviewProduct = 'FALSE';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isUserAddedRatingReviewProduct = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isUserAddedRatingReviewProduct', retResponseJson);
                            }
                            alert(isUserAddedRatingReviewProduct);
                            if(isUserAddedRatingReviewProduct==='TRUE'){
                                notifyMsgStr = 'Your reviewed & rating about product posted successfully !!!';
                                clearRatingReviewAbtProductFormContent(fcontentCass);
                                $rootScope.loadAverageRatingReviewedProduct();
                                $rootScope.loadMaxAverageRatingReviewedProduct();
                                $rootScope.loadAllUserRatingReviewProduct();
                            }
                            showNotificationBoxMsg(notifyMsgStr);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadAverageRatingReviewedProduct ex=>"+ex);
            }
        };
        
        
    }catch(ex){
        console.log("problem in rating review controller ex=>"+ex);
    }
    
}

