

angular.module('DKAPP').controller('ShopStoreController', ShopStoreController);

function ShopStoreController($scope, $rootScope, $http, ShopStoreServices, RatingReviewServices){
    try{
        
        $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
        $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
        $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
        $rootScope.isShowCShopstoreAllProductFilter = false;
        $rootScope.toggleCShopstoreProductFilterBtnLabel = "SHOW FILTER";
        $rootScope.cShopstoreProductFilterPopupDivClass = "";
        $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
        $rootScope.isToggleShopStoreDessertsMenu = false;
        $rootScope.isShowShopStoreDessertsTypeMenuList = false;
        $rootScope.isShowShopStoreRatingReviewDetails = false;
        $rootScope.allUserRatingReviewDetails = false;
        $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = true;
        $rootScope.isEnableRatingReviewSubmitButton = false;
        $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
        $rootScope.cShopstoreProductDeliveryAreaNames = false;
        $rootScope.isShowCShopStoreWorkingStyleDetails = false;
        $rootScope.cShopstoreWorkingstyleDetails = false;
        
        // loadDKDeliveryAreaBasedDessertsTypeList 
        $rootScope.loadDKDeliveryAreaBasedDessertsTypeList = function(){
            try{
                // get param obj to desserts type list
                var preparedParamJsonObj = getParamObjFromSessionAtDeliveryAreaBasedCStoreServeDessertsTypeList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchParamJsonObj = {};
                    fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.dkDeliveryAreaBasedDessertsTypeList = false;
                    // calling ShopStoreServices
                    ShopStoreServices.getDKDeliveryAreaBasedDessertsTypeList(fetchParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaBasedDessertsTypeDetails', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.dkDeliveryAreaBasedDessertsTypeList = arrJsonObj.allDessertsTypeList;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadDKDeliveryAreaBasedDessertsTypeList ex=>"+ex);
                $rootScope.dkDeliveryAreaBasedDessertsTypeList = false;
            }
        };
        
        // storeDessertsTypeDataDetailsInSessionStorageToViewCStoreAllProductList
        $rootScope.storeDessertsTypeDataDetailsInSessionStorageToViewCStoreAllProductList = function(paramObj){
            var storedDataStatus = storeDessertsTypeDataDetailsInSessionStorageToViewCStoreAllProductList(paramObj, 'Y');
            if(storedDataStatus===true){  
                if((paramObj['dessertsTypeTitle']).toLowerCase()==='cakes'){
                    window.location.href =  globalBaseSitePath+"all-store-cakes.php";
                }else if((paramObj['dessertsTypeTitle']).toLowerCase()==='chocolates'){
                    window.location.href =  globalBaseSitePath+"all-store-chocolates.php";
                }
            }
        };
        
        // collectDataToRedirectCShopstoreView
        $rootScope.collectDataToViewCShopstore = function(paramDataObj){
            try{
                var retStatus = checkAllParamToViewCShopStore(paramDataObj);
                if(retStatus===true){
                    window.location.href = globalBaseSitePath+"storeproducts.php";
                }
            }catch(ex){
                console.log("problem in collectDataToViewCShopstore ex=>"+ex);
            }
        };
        
        // loadCShopStoreSummaryInfo 
        $rootScope.loadCShopStoreSummaryInfo = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjForCShopStoreSummaryInfo();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.shopstoreInfo = false;
                    $rootScope.customersReviewedRatingMsgStr = 'No any customer(s) reviewed yet !';
                    $rootScope.isRatingReviewBasedInfoFound = false;
                    // calling ShopStoreServices
                    ShopStoreServices.getCShopStoreSummaryInfo(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.shopstoreInfo = arrJsonObj.shopstoreInfo;
                                    $rootScope.customersReviewedRatingMsgStr = arrJsonObj.customersReviewedRatingMsgStr;
                                    $rootScope.isRatingReviewBasedInfoFound = arrJsonObj.isRatingReviewBasedInfoFound;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.shopstoreInfo = false;
                $rootScope.customersReviewedRatingMsgStr = 'No any customer(s) reviewed yet !';
                $rootScope.isRatingReviewBasedInfoFound = false;
                console.log("problem in loadCShopStoreMenuSummaryInfo ex=>"+ex);
            }
        };
        
        // loadCShopStoreProductTypeProductCategoryAllProductList 
        $rootScope.loadCShopStoreProductTypeProductCategoryAllProductList = function(){
            try{
                if($rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList===true){
                    // get param obj
                    var preparedParamJsonObj = getParamObjForLoadingProductTypeProductCategoryAllProductList();
                    // console.log("loadCShopStoreProductTypeProductCategoryAllProductList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                        $rootScope.defaultedSelectedProductTypeTitle = '';
                        $rootScope.defaultSelectProductCategoryTitle = '';
                        $rootScope.defaultSelectProductCategoryValue = '';
                        $rootScope.productCategoryList = false;
                        $rootScope.allProductDetailsList = false;
                        $rootScope.notFoundProductMsgStr = '';
                    
                        // calling ShopStoreServices to get all product list
                        ShopStoreServices.getCShopStoreProductTypeProductCategoryAllProductList(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadCShopStoreProductTypeProductCategoryAllProductList retObj=>"+JSON.stringify(retObj));
                                        $rootScope.defaultedSelectedProductTypeTitle = retObj.productTypeDetails.defaultedSelectedProductTypeTitle;
                                        $rootScope.defaultSelectProductCategoryTitle = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                        if(retObj.productTypeDetails.productCategoryList!==false){
                                            $rootScope.productCategoryList = retObj.productTypeDetails.productCategoryList;
                                        }
                                        if(retObj.productTypeDetails.defaultSelectProductCategoryValue!==''){
                                            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                                            existingDkParamObj['userProduct']['producttype_name'] = retObj.productTypeDetails.defaultedSelectedProductTypeTitle;
                                            existingDkParamObj['userProduct']['producttype_value'] = retObj.productTypeDetails.defaultedSelectedProductTypeValue;
                                            existingDkParamObj['userProduct']['producttype_categoryname'] = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                            existingDkParamObj['userProduct']['producttype_categoryvalue'] = retObj.productTypeDetails.defaultSelectProductCategoryValue;
                                            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                                        }
                                        if(retObj.productTypeDetails.allProductPriceDetailsArr!==false && retObj.productTypeDetails.allProductPriceDetailsArr!==undefined){
                                            $rootScope.buildAllCShopStoreProductPriceFilterListHtmlSelectControl(retObj.productTypeDetails.allProductPriceDetailsArr);
                                        }
                                        if(retObj.productTypeDetails.allProductSizeDetailsArr!==false && retObj.productTypeDetails.allProductSizeDetailsArr!==undefined){
                                            $rootScope.buildAllCShopStoreProductSizeFilterListHtmlSelectControl(retObj.productTypeDetails.allProductSizeDetailsArr);
                                        }
                                        if(retObj.productTypeDetails.allProductDiscountDetailsArr!==false && retObj.productTypeDetails.allProductDiscountDetailsArr!==undefined){
                                            $rootScope.buildAllCShopStoreProductDiscountFilterListHtmlSelectControl(retObj.productTypeDetails.allProductDiscountDetailsArr);
                                        }
                                        if(retObj.productTypeDetails.allProductDetailsList!==false && retObj.productTypeDetails.allProductDetailsList!==undefined){
                                            $rootScope.allProductDetailsList = retObj.productTypeDetails.allProductDetailsList;
                                        }else{
                                            $rootScope.notFoundProductMsgStr = 'No products found used product filter !';
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.defaultedSelectedProductTypeTitle = '';
                $rootScope.defaultSelectProductCategoryTitle = '';
                $rootScope.defaultSelectProductCategoryValue = '';
                $rootScope.productCategoryList = false;
                $rootScope.allProductDetailsList = false;
                $rootScope.notFoundProductMsgStr = 'No products found used proper filter !';
                console.log("problem in loadCShopStoreProductTypeProductCategoryAllProductList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
          
        // buildAllCShopStoreProductPriceFilterListHtmlSelectControl
        $rootScope.buildAllCShopStoreProductPriceFilterListHtmlSelectControl = function(allProductPriceDetails){
            try{    
                var defaultSelectProductPriceFilterArr = new Array();
                var productPriceFilterListSelectControlElementObj = document.getElementById("allProductPriceFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(productPriceFilterListSelectControlElementObj).find('option').remove();
                $(productPriceFilterListSelectControlElementObj).selectpicker('destroy');
                if(jQuery.isEmptyObject(allProductPriceDetails)===false && allProductPriceDetails!=='' 
                    && allProductPriceDetails!==undefined && allProductPriceDetails!==false){
                    // sorting data prepared
                    var allPriceSortingListArr = allProductPriceDetails['sortingList'];
                    if(allPriceSortingListArr.length>0 && allPriceSortingListArr!==false){
                        // iterate each price sorting details
                        var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                        for(var eachPriceSortingDetailsArrIndex = 0; eachPriceSortingDetailsArrIndex<allPriceSortingListArr.length; eachPriceSortingDetailsArrIndex++){
                            var dataIconStr = 'fa fa-sort-amount-asc';
                            var priceSortingValue = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortValue'];
                            var priceSortTitle = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortTitle'];
                            if(priceSortingValue==='hightolow'){
                                dataIconStr = 'fa fa-sort-amount-desc';
                            }
                            var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceSortingValue+"'>"+priceSortTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                            if(allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['isRequestedPriceSortedMatched']==='Y'){
                                defaultSelectProductPriceFilterArr.push(priceSortingValue);
                            }
                        }
                        $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                    // price range data prepared
                    var allPriceRangeList = allProductPriceDetails['rangeList'];
                    if(allPriceRangeList.length>0 && allPriceRangeList!==false){
                        var optionGroupStr = "<optgroup label='Price Range (Multiple selection)'>";
                        // iterate each price range details
                        for(var eachPriceRangeDetailsArrIndex = 0; eachPriceRangeDetailsArrIndex<allPriceRangeList.length; eachPriceRangeDetailsArrIndex++){
                            var dataIconStr = 'fa fa-inr';
                            var priceRangeValue = allPriceRangeList[eachPriceRangeDetailsArrIndex]['priceRangeValue'];
                            var priceRangeTitle = allPriceRangeList[eachPriceRangeDetailsArrIndex]['priceRangeTitle'];
                            var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceRangeValue+"'>"+priceRangeTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                        }
                        $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                }
                // refresh product price range list select control element 
                $(productPriceFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected price
                if(defaultSelectProductPriceFilterArr.length>0){
                    $(productPriceFilterListSelectControlElementObj).selectpicker('val', defaultSelectProductPriceFilterArr);
                }
                // apply event
                if($(productPriceFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent(productPriceFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllCShopStoreProductPriceFilterListHtmlSelectControl=>"+ex);
            }    
        };
        
        // buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            $(elementObj).on('changed.bs.select', function(e){
                try{
                    var selectedPriceFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(price filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_price_filter'] = '';
                    if(selectedPriceFilterValues!=='' && selectedPriceFilterValues!==false && selectedPriceFilterValues!==null){
                        existingDkParamObj['userProduct']['product_price_filter'] = (selectedPriceFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#cShopStoreViewAllProductDetailsBodyWrapperDivId').scope().loadCShopStoreProductTypeProductCategoryAllProductList();
                }catch(ex){
                    console.log("problem in buildedCShopStoreProductPriceFilterListHtmlSelectControlOnChangeEvent=>"+ex);
                }    
            });
        };
        
        // buildAllCShopStoreProductSizeFilterListHtmlSelectControl
        $rootScope.buildAllCShopStoreProductSizeFilterListHtmlSelectControl = function(allProductSizeDetails){
            try{
                var defaultedSelectedProductSize = '';
                var productSizeFilterListSelectControlElementObj = document.getElementById("allProductSizeFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(productSizeFilterListSelectControlElementObj).find('option').remove();
                $(productSizeFilterListSelectControlElementObj).selectpicker('destroy');
                if(jQuery.isEmptyObject(allProductSizeDetails)===false && allProductSizeDetails!=='' 
                    && allProductSizeDetails!==undefined && allProductSizeDetails!==false){
                    var allProductSizeList = allProductSizeDetails['rangeList'];
                    // iterate each product size details
                    var optionGroupStr = "<optgroup label='Size Range (Multiple selection)'>";
                    for(var eachProductSizeArrIndex = 0; eachProductSizeArrIndex<allProductSizeList.length; eachProductSizeArrIndex++){
                        var productSizeValue = allProductSizeList[eachProductSizeArrIndex]['sizeRangeValue'];
                        var optionStr = "<option class='productSizeFilterOperationOptionClass' value='"+productSizeValue+"'>"+productSizeValue+"</option>";
                        optionGroupStr+= optionStr;
                        if(allProductSizeList[eachProductSizeArrIndex]['isRequestedSizeRangeMatched']==='Y'){
                            defaultedSelectedProductSize = allProductSizeList[eachProductSizeArrIndex]['sizeRangeValue'];
                        }
                    }
                    $(productSizeFilterListSelectControlElementObj).append(optionGroupStr);
                }
                // refresh product size list select control element 
                $(productSizeFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected shopstore 
                if(defaultedSelectedProductSize!=='' && defaultedSelectedProductSize!==false){
                    $(productSizeFilterListSelectControlElementObj).selectpicker('val', defaultedSelectedProductSize);
                }
                // apply event
                if($(productSizeFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent(productSizeFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllCShopStoreProductSizeFilterListHtmlSelectControl=>"+ex);
            } 
        };
        
        // buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedSizeFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(size filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_size_filter'] = '';
                    if(selectedSizeFilterValues!=='' && selectedSizeFilterValues!==false && selectedSizeFilterValues!==null){
                        existingDkParamObj['userProduct']['product_size_filter'] = (selectedSizeFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#cShopStoreViewAllProductDetailsBodyWrapperDivId').scope().loadCShopStoreProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedCShopStoreProductSizeFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // buildAllCShopStoreProductDiscountFilterListHtmlSelectControl
        $rootScope.buildAllCShopStoreProductDiscountFilterListHtmlSelectControl = function(allProductDiscountDetails){
            var defaultSelectedProductDiscountFilterArr = new Array();
            var productDiscountFilterListSelectControlElementObj = document.getElementById("allProductDiscountFilterListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(productDiscountFilterListSelectControlElementObj).find('option').remove();
            $(productDiscountFilterListSelectControlElementObj).selectpicker('destroy');
            if(jQuery.isEmptyObject(allProductDiscountDetails)===false && allProductDiscountDetails!=='' 
                && allProductDiscountDetails!==undefined && allProductDiscountDetails!==false){
                var allDiscountSortingListArr = allProductDiscountDetails['sortingList'];
                if(allDiscountSortingListArr.length>0 && allDiscountSortingListArr!==false){
                    // iterate each price sorting details
                    var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                    for(var eachDiscountSortingDetailsArrIndex = 0; eachDiscountSortingDetailsArrIndex<allDiscountSortingListArr.length; eachDiscountSortingDetailsArrIndex++){
                        var dataIconStr = 'fa fa-sort-amount-asc';
                        var discountSortingValue = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortValue'];
                        var discountSortTitle = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortTitle'];
                        if(discountSortingValue==='hightolow'){
                            dataIconStr = 'fa fa-sort-amount-desc';
                        }
                        var eachOptionStr = "<option class='discountFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+discountSortingValue+"'>"+discountSortTitle+"</option>";
                        optionGroupStr+= eachOptionStr;
                        if(allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['isRequestedDiscountSortedMatched']==='Y'){
                            defaultSelectedProductDiscountFilterArr.push(discountSortingValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
                var allDiscountRangeList = allProductDiscountDetails['rangeList'];
                if(allDiscountRangeList.length>0 && allDiscountRangeList!==false){
                    var optionGroupStr = "<optgroup label='Range (Multiple selection)'>";
                    // iterate each price range details
                    for(var eachDiscountRangeDetailsArrIndex = 0; eachDiscountRangeDetailsArrIndex<allDiscountRangeList.length; eachDiscountRangeDetailsArrIndex++){
                        var discountRangeValue = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeValue'];
                        var discountRangeTitle = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeTitle'];
                        var eachOptionStr = "<option class='discountFilterOperationOptionClass' value='"+discountRangeValue+"'>"+discountRangeTitle+"</option>";
                        optionGroupStr+= eachOptionStr;
                        if(allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['isRequestedDiscountRangeMatched']==='Y'){
                            defaultSelectedProductDiscountFilterArr.push(discountRangeValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
            }
            // refresh product discount filter list select control element 
            $(productDiscountFilterListSelectControlElementObj).selectpicker('refresh');
            // default select product discount filter
            if(defaultSelectedProductDiscountFilterArr.length>0){
                $(productDiscountFilterListSelectControlElementObj).selectpicker('val', defaultSelectedProductDiscountFilterArr);
            }
            // apply event
            if($(productDiscountFilterListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent(productDiscountFilterListSelectControlElementObj);
            }
        };
        
        // buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedDiscountFilterValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(discount filter value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['product_discount_filter'] = '';
                    if(selectedDiscountFilterValues!=='' && selectedDiscountFilterValues!==false && selectedDiscountFilterValues!==null){
                        existingDkParamObj['userProduct']['product_discount_filter'] = (selectedDiscountFilterValues).toString();
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#cShopStoreViewAllProductDetailsBodyWrapperDivId').scope().loadCShopStoreProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedCShopStoreDiscountFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // collectDataToLoadAllProductListViaCShopStoreProductTypeProductCategory
        $rootScope.collectDataToLoadAllProductListViaCShopStoreProductTypeProductCategory = function(preparedParamObj){
            try{
                var productTypeId = '';
                var productTypeTitle = '';
                var productTypeCategoryId = '';
                var productTypeCategoryTitle = '';
                var shopStoreId = '';
                if((preparedParamObj).hasOwnProperty('productTypeId')===true){
                    productTypeId = preparedParamObj['productTypeId'] ;
                }
                if((preparedParamObj).hasOwnProperty('productTypeTitle')===true){
                    productTypeTitle = preparedParamObj['productTypeTitle'] ;
                }
                if((preparedParamObj).hasOwnProperty('productCategoryId')===true){
                    productTypeCategoryId = preparedParamObj['productCategoryId'] ;
                }
                if((preparedParamObj).hasOwnProperty('productCategoryTitle')===true){
                    productTypeCategoryTitle = preparedParamObj['productCategoryTitle'] ;
                }
                if((preparedParamObj).hasOwnProperty('shopStoreId')===true){
                    shopStoreId = preparedParamObj['shopStoreId'] ;
                }
                if((productTypeId).length===32 && productTypeTitle!==''
                    && (productTypeCategoryId).length===32 && productTypeCategoryTitle!==''
                    && (shopStoreId).length===32){
                    // reset user product session storage
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['shopstore_value'] = shopStoreId;
                    existingDkParamObj['userProduct']['producttype_value'] = productTypeId;
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = productTypeCategoryId;
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = '';
                    existingDkParamObj['userProduct']['producttype_name'] = productTypeTitle;
                    existingDkParamObj['userProduct']['producttype_categoryname'] = productTypeCategoryTitle;
                    existingDkParamObj['userProduct']['producttype_listname'] = '';
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    window.location.href = globalBaseSitePath+"storeproducts.php";
                }
            }catch(ex){
                console.log("problem in collectDataToLoadAllProductListViaCShopStoreProductTypeProductCategory=>"+ex);
            }
        };
        
        // loadShopStoreAllUserRatingReviewed 
        $rootScope.loadShopStoreAllUserRatingReviewed = function(){
            try{
                if($rootScope.isShowShopStoreRatingReviewDetails===true){
                    // get param obj to load all user rating about product 
                    var preparedParamJsonObj = getParamObjFromSessionForShopStoreRatingReviewedDetails();
                    // console.log("loadShopStoreAllUserRatingReviewed preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.allUserRatingReviewDetails = false;

                        // calling RatingReviewServices 
                        RatingReviewServices.getShopStoreAllUserRatingReviewed(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadShopStoreAllUserRatingReviewed retObj=>"+JSON.stringify(retObj));
                                        $rootScope.allUserRatingReviewDetails = retObj.allUserRatingReviewAbtProductDetails;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.allUserRatingReviewDetails = false;
                console.log("problem in loadShopStoreAllUserRatingReviewed ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        
        // loadShopStoresRatingReviewQuestions 
        $rootScope.loadShopStoresRatingReviewQuestions = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForShopStoreRatingReviewedDetails();
                // console.log("loadShopStoresRatingReviewQuestions preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){

                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = false;
                    
                    // calling RatingReviewServices 
                    RatingReviewServices.getShopStoreRatingReviewQuestionsAboutProduct(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadRatingReviewQuestionsAboutProductByShopStores retObj=>"+JSON.stringify(retObj));
                                    $rootScope.ratingReviewQuestionAboutProductByShopStoresDetails = retObj.ratingReviewQuestionAboutProductByShopStoresDetails;
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
        
        // loadCShopStoresWorkingStyle 
        $rootScope.loadCShopStoresWorkingStyle = function(){
            try{
                if($rootScope.isShowCShopStoreWorkingStyleDetails===true){
                    // get param obj to load working style details
                    var preparedParamJsonObj = getParamObjForLoadingCShopStoreWorkingStyleDetails();
                    // console.log("loadCShopStoresWorkingStyle preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.cShopstoreWorkingstyleDetails = false;

                        // calling ShopStoreServices 
                        ShopStoreServices.getCShopStoreWorkingStyleDetails(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadCShopStoresWorkingStyle retObj=>"+JSON.stringify(retObj));
                                        $rootScope.cShopstoreWorkingstyleDetails = retObj.shopstoreWorkingStyleDetails;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.cShopstoreWorkingstyleDetails = false;
                console.log("problem in loadCShopStoresWorkingStyle ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        
        // loadCShopStoresProductDeliveryArea 
        $rootScope.loadCShopStoresProductDeliveryArea = function(){
            try{
                if($rootScope.isShowCShopStoreProductDeliveryAreaDetails===true){
                    // get param obj to load cshopstore product delivery info
                    var preparedParamJsonObj = getParamObjForLoadingCShopStoreProductDeliveryAreaDetails();
                    // console.log("loadCShopStoresProductDeliveryArea preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);

                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.cShopstoreProductDeliveryAreaNames = false;

                        // calling ShopStoreServices 
                        ShopStoreServices.getCShopStoreProductDeliveryAreaDetails(fetchedParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                    if(retObj!==false && retObj!==undefined && retObj!==''){
                                        // console.log("loadCShopStoresProductDeliveryArea retObj=>"+JSON.stringify(retObj));
                                        $rootScope.cShopstoreProductDeliveryAreaNames = retObj.cShopstoreProductDeliveryAreaNames;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                console.log("problem in loadCShopStoresProductDeliveryArea ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };
        
        // toggleShopStoreSelfSummaryInfoDetails
        $rootScope.toggleShopStoreSelfSummaryInfoDetails = function(){
            if($rootScope.isToggleCShopStoreSelfSummaryInfo===false){
                $rootScope.isToggleCShopStoreSelfSummaryInfo = true;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Hide Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = true;
                $rootScope.loadCShopStoresProductDeliveryArea();
                $rootScope.isShowCShopStoreWorkingStyleDetails = true;
                $rootScope.loadCShopStoresWorkingStyle();
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = true;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
                $rootScope.loadCShopStoreProductTypeProductCategoryAllProductList();
            }
        };
        
        // toggleShopStoreRatingReviewDetails
        $rootScope.toggleShopStoreRatingReviewDetails = function(){
            if($rootScope.isShowShopStoreRatingReviewDetails===false){
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = true;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Hide Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.loadShopStoreAllUserRatingReviewed();
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
                $rootScope.loadCShopStoreProductTypeProductCategoryAllProductList();
            }
        };
        
        // toggleShopStoreDessertsMenu
        $rootScope.toggleShopStoreDessertsMenu = function(){
            if($rootScope.isToggleShopStoreDessertsMenu===false){
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = true;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Hide Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = true;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isLoadCShopStoreProductTypeProductCategoryAllProductList = true;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreProductDeliveryAreaDetails = false;
                $rootScope.cShopstoreProductDeliveryAreaNames = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }
        };
        
        // toggleCShopStoreAllProductFilterContainer
        $rootScope.toggleCShopStoreAllProductFilterContainer = function(){
            if($rootScope.isShowCShopstoreAllProductFilter===false){
                $rootScope.toggleCShopstoreProductFilterBtnLabel = "HIDE FILTER";
                $rootScope.isShowCShopstoreAllProductFilter = true;
                $rootScope.cShopstoreProductFilterPopupDivClass = "cshopstore_productFilterOperationContainerDivClass";
            }else{
                $rootScope.toggleCShopstoreProductFilterBtnLabel = "SHOW FILTER";
                $rootScope.isShowCShopstoreAllProductFilter = false;
                $rootScope.cShopstoreProductFilterPopupDivClass = "";
            }
        };
        
    }catch(ex){
        console.log("problem in ShopstoreDetailsController ex=>"+ex);
    }
    
}


