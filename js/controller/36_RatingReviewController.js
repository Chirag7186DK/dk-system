
angular.module('DKAPP').controller('RatingReviewController', RatingReviewController);

function RatingReviewController($scope, $rootScope, RatingReviewServices){
    try{
        
        // loadAverageRatingReviewedProduct 
        $rootScope.loadAverageRatingReviewedProduct = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.avgRatingReviewedProductDetails = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getAverageRatingReviewProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    $rootScope.avgRatingReviewedProductDetails = retObj.avgRatingReviewedAboutProductDetails;
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
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.maxRatingReviewedTypeDetailsArr = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getMaxRatingReviewProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    $rootScope.maxRatingReviewedTypeDetailsArr = retObj.maxRatingAndReviewedTypeDetails;
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
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.storeRatingReviewQuestionDetails = false;
                    $rootScope.isRatingReviewQuestionDetailsFound = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getShopStoreRatingReviewQuestionsAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    $rootScope.storeRatingReviewQuestionDetails = retObj.ratingReviewQuestionAboutProductByShopStoresDetails;
                                    $rootScope.isRatingReviewQuestionDetailsFound = retObj.isRatingReviewQuestionDetailsFound;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.storeRatingReviewQuestionDetails = false;
                console.log("problem in loadStoreRatingReviewQuestions ex=>"+ex);
            }
        };
        
        // loadAllUserRatingReviewProduct 
        $rootScope.loadAllUserRatingReviewProduct = function(){
            try{
                // get param obj to load all user rating about product 
                var preparedParamJsonObj = getParamObjFromSessionForRatingReviewDetails();
                // console.log("loadAllUserRatingReviewAboutProductDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.allUserRatingReviewProductDetailsArr = false;
                    // calling RatingReviewServices 
                    RatingReviewServices.getAllUserRatingReviewProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    $rootScope.allUserRatingReviewAboutProductDetailsArr = retObj.allUserRatingReviewAbtProductDetails;
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
        
        // collectDataToAddUserRatingReviewAboutProduct
        $rootScope.collectDataToAddUserRatingReviewAboutProduct = function(fcontentCass){
            var validatedDataStatus = validateUserRatingReviewProduct(fcontentCass);
            if(validatedDataStatus===true){
                var paramDataObj  = getParamDataForAddingUserRatingReviewProduct(fcontentCass);
                if(Object.keys(paramDataObj).length===3 && paramDataObj!==false){
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
        $rootScope.addUserRatingReviewProduct = function(preparedParamJsonObj, fcontentCass){
            try{
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    // calling RatingReviewServices 
                    RatingReviewServices.addRatingReviewAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            var notifyMsgStr = 'Please try again to post review & rating about product !';
                            var isUserAddedReviewRatingProduct = 'FALSE';
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                isUserAddedReviewRatingProduct = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'isAddedReviewRatingAbouProduct', retResponseJson);
                            }
                            if(isUserAddedReviewRatingProduct==='TRUE'){
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
                console.log("problem in loadAverageRatingReviewedAboutProduct ex=>"+ex);
            }
        };
        
        
    }catch(ex){
        console.log("problem in rating review controller ex=>"+ex);
    }
    
}

