
angular.module('DKAPP').controller('ProductController', ProductController);

function ProductController($scope, $rootScope, $state, CommonServices){
    try{
                
        // view-product-details
        $rootScope.viewProductDetails = function(paramObj){
            try{
                var storedDataStatus = storeProductTypeProductCategoryProductDataInSession(paramObj);
                if(storedDataStatus===true){
                    if((paramObj['productTypeTitle']).toLowerCase()==='cakes'){
                        // window.location.href =  globalBaseSitePath+"cakes-product.php";
                        $state.go('cakes-product'); 
                    }
                }
            }catch(ex){
                console.log("problem in viewProductDetails ex=>"+ex);
            }
        };
        
        // loadProductTypeProductCategoryProductDetails 
        $rootScope.loadProductTypeProductCategoryProductDetails = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjFromSessionForProductTypeProductCategoryProductDetails();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.productDetails = false;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductTypeProductCategoryProductDetails", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $scope.$apply(function(){
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'allProductDetails', rtRspJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.productDetails = arrJsonObj;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.productDetails = false;
                console.log("problem in loadProductTypeProductCategoryProductDetails ex=>"+ex);
            }
        };
        
        // loadStoreDeliveryFeeApplicableMsgOnDeliveryArea 
        $rootScope.loadStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(){
            try{
                CommonServices.getStoreDeliveryFeeApplicableMsgOnDeliveryArea();
            }catch(ex){
                console.log("problem in loadStoreDeliveryFeeApplicableMsgOnDeliveryArea ex=>"+ex);
            }
        };
        
        // loadProductDescriptionDetails 
        $rootScope.loadProductDescriptionDetails = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForProductDescriptionDetails();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var apiParamJsonObj = {};
                    apiParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.productDescriptionDetailsArr = false;
                    $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
                    $rootScope.isToggleProductDescriptionContent = false;
                    // calling ajax services
                    communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Product/ProductDescriptionDetails", 'apiFile', 'GET', '', apiParamJsonObj).done(function(rtRspJson){
                        $scope.$apply(function(){
                            if(rtRspJson!==false && rtRspJson!==undefined && rtRspJson!==''){
                                var productDescriptionDetailsArr = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'descriptionDetailsArr', rtRspJson);
                                if(productDescriptionDetailsArr!==false 
                                    && productDescriptionDetailsArr!==undefined && productDescriptionDetailsArr!==''){
                                    $rootScope.productDescriptionDetailsArr = productDescriptionDetailsArr;
                                    $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
                                    $rootScope.isToggleProductDescriptionContent = false;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.productDescriptionDetailsArr = false;
                $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
                $rootScope.isToggleProductDescriptionContent = false;
                console.log("problem in loadProductDescriptionDetails ex=>"+ex);
            }
        };
        
        // changing product measurement/size  change code here
        $('#productMeasurementSelectCtrlId').on('change', function(){
            var productMeasurementValue = $(this).find('option:selected').val();
            if(productMeasurementValue!=='' && productMeasurementValue!==false){
                var productJsonData = $(this).find('option:selected').attr("data-productdata");
            }
        });
        
        // toggleViewAllProductFilterContainer
        $rootScope.toggleViewAllProductFilterContainer = function(){
            if($rootScope.isShowViewAllProductFilter===false){
                $rootScope.toggleViewAllProductFilterBtnLabel = 'HIDE FILTER';
                $rootScope.isShowViewAllProductFilter = true;
                $rootScope.productViewAllFilterPopDivClass = 'vap_productFilterOperationContainerDivClass';
            }else{
                $rootScope.toggleViewAllProductFilterBtnLabel = 'SHOW FILTER';
                $rootScope.productViewAllFilterPopDivClass = '';
                $rootScope.isShowViewAllProductFilter = false;
            }
        };
        
        // toggleProductDescriptionContent
        $rootScope.toggleProductDescriptionContent = function(toggleElementId){
            $("#"+toggleElementId).slideToggle("slow");
            if($rootScope.isToggleProductDescriptionContent===false){
                $rootScope.isToggleProductDescriptionContent = true;
                $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-down";
            }else{
                $rootScope.isToggleProductDescriptionContent = false;
                $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
            }
        };
        
        // toggleShippingProductContent
        $rootScope.toggleShippingProductContent = function(toggleElementId){
            if($rootScope.isToggleShippingProductContent===false){
                $rootScope.isToggleShippingProductContent = true;
                $rootScope.toggleShippingProductIconClass = "fa fa-chevron-circle-down";
            }else{
                $rootScope.isToggleShippingProductContent = false;
                $rootScope.toggleShippingProductIconClass = "fa fa-chevron-circle-up";
            }
            $("#"+toggleElementId).slideToggle("slow");
        };
        
        // toggleRatingReviewProductContent
        $rootScope.toggleRatingReviewProductContent = function(toggleElementId){
            if($rootScope.isToggleRatingReviewProductContent===false){
                $rootScope.isToggleRatingReviewProductContent = true;
                $rootScope.toggleRatingReviewProductIconClass = "fa fa-chevron-circle-down";
            }else{
                $rootScope.isToggleRatingReviewProductContent = false;
                $rootScope.toggleRatingReviewProductIconClass = "fa fa-chevron-circle-up";
            }
            $("#"+toggleElementId).slideToggle("slow");
        };
        
    }catch(ex){
        console.log("problem in ProductController ex=>"+ex);
    }
    
}

