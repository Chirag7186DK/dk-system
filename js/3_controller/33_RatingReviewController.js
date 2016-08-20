
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

