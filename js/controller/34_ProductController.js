
angular.module('DKAPP').controller('ProductController', ProductController);

function ProductController($scope, $rootScope, $http, ProductServices, LocationServices, ShopStoreServices){
    try{
                
        // view-product-details
        $rootScope.viewProductDetails = function(paramObj){
            try{
                var storeDataStatus = storeProductTypeProductCategoryProductDataInSession(paramObj);
                if(storeDataStatus===true){
                    if((paramObj['productTypeTitle']).toLowerCase()==='cakes'){
                        window.location.href =  globalBaseSitePath+"cakes-product.php";
                    }else if((paramObj['productTypeTitle']).toLowerCase()==='chocolates'){
                        window.location.href =  globalBaseSitePath+"chocolates-product.php";
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
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.vAllPDetails = false;
                    // calling ProductServices to get product details
                    ProductServices.getProductTypeProductCategoryProductDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'allProductDetails', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.vAllPDetails = arrJsonObj;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.vAllPDetails = false;
                console.log("problem in loadProductTypeProductCategoryProductDetails ex=>"+ex);
            }
        };
        
        // loadStoreDeliveryFeeApplicableMsgOnDeliveryArea 
        $rootScope.loadStoreDeliveryFeeApplicableMsgOnDeliveryArea = function(){
            try{
                ShopStoreServices.getStoreDeliveryFeeApplicableMsgOnDeliveryArea();
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
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.productDescriptionDetailsArr = false;
                    $rootScope.isProductDescriptionDetailsFound = false;
                    $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
                    $rootScope.isToggleProductDescriptionContent = false;
                    // calling ProductServices 
                    ProductServices.getProductDescriptionDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var productDescriptionDetailsArr = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'descriptionDetailsArr', retResponseJson);
                                if(productDescriptionDetailsArr!==false 
                                    && productDescriptionDetailsArr!==undefined && productDescriptionDetailsArr!==''){
                                    $rootScope.isProductDescriptionDetailsFound = true;
                                    $rootScope.productDescriptionDetailsArr = productDescriptionDetailsArr;
                                    $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
                                    $rootScope.isToggleProductDescriptionContent = false;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.isProductDescriptionDetailsFound = false;
                $rootScope.productDescriptionDetailsArr = false;
                $rootScope.toggleProductDescriptionIconClass = "fa fa-chevron-circle-up";
                $rootScope.isToggleProductDescriptionContent = false;
                console.log("problem in loadProductDescriptionDetails ex=>"+ex);
            }
        };
        
        // changing product measurement  change code here
        $('#productMeasurementSelectCtrlId').on('change', function(){
            var productMeasurementValue = $(this).find('option:selected').val();
            if(productMeasurementValue!=='' && productMeasurementValue!==false){
                var productPrice = $(this).find('option:selected').attr("data-productprice");
                $('.onlineProductSellingPriceTextClass').empty().append(productPrice);
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
        console.log("problem in ProductTypeProductCategoryProductDetailsController ex=>"+ex);
    }
    
}

