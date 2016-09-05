

angular.module('DKAPP').controller('ShopStoreController', ShopStoreController);

function ShopStoreController($rootScope, $rootScope, $http, ProductServices, ShopStoreServices, RatingReviewServices){
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
        $rootScope.isEnableRatingReviewSubmitButton = false;
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
                        $rootScope.$apply(function(){
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
                    window.location.href =  globalBaseSitePath+"store-all-cakes.php";
                }else if((paramObj['dessertsTypeTitle']).toLowerCase()==='chocolates'){
                    window.location.href =  globalBaseSitePath+"store-all-chocolates.php";
                }
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
                        $rootScope.$apply(function(){
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
        
        // loadProductTypeAllProductCategoryList 
        $rootScope.loadProductTypeAllProductCategoryListCStore = function(){
            try{
                // get param obj to load product all product category list
                var preparedParamJsonObj = getParamObjForProductTypeAllProductCategoryList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchParamJsonObj = {};
                    fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.productTypeAllProductCategoryList = false;
                    // calling ProductServices
                    ProductServices.getProductTypeAllProductCategoryList(fetchParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'productTypeProductCategoryDetails', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.productTypeAllProductCategoryList = arrJsonObj.productTypeAllProductCategoryList;
                                    $rootScope.storeProductTypeProductCategoryDataInSessionCStore(arrJsonObj.defaultSelectedProductCategoryDetails);
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadProductTypeAllProductCategoryList ex=>"+ex);
                $rootScope.productTypeAllProductCategoryList = false;
            }
        };
        
        // storeProductTypeProductCategoryDataInSession 
        $rootScope.storeProductTypeProductCategoryDataInSessionCStore = function(productCategoryParamObj){
            try{
                // storing product type product cateogory data in session
                var dataStoredInSessionStatus = storeProductTypeProductCategoryDataInSession(productCategoryParamObj);
                if(dataStoredInSessionStatus===true){
                    $rootScope.loadProductTypeProductCategoryFilterTypeListCStore();
                    $rootScope.loadProductTypeProductCategoryAllProductListCStore();
                }
            }catch(ex){
                console.log("problem in storeProductTypeProductCategoryDataInSession ex=>"+ex);
            }
        };
        
        // toggleProductTypeProductCategoryElementClass
        $rootScope.toggleProductTypeProductCategoryElementClass = function(currentElementClickedId, clickedElementParentClass){
            // toggle backgroun class also
            if(currentElementClickedId!==undefined && currentElementClickedId!==undefined){
                $('.'+clickedElementParentClass).find('li').removeClass('cshopstore_eachRequestedProductCategoryLIClass');
                $('#'+currentElementClickedId).addClass('cshopstore_eachRequestedProductCategoryLIClass');
            }
        };
        
        // loadProductTypeProductCategoryFilterTypeList 
        $rootScope.loadProductTypeProductCategoryFilterTypeListCStore = function(){
            try{
                // get param obj to load product type product category filter type list
                var preparedParamJsonObj = getParamObjForProductTypeProductCategoryFilterTypeList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    
                    var fetchParamJsonObj = {};
                    fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.productViewAllFilterPopDivClass = '';
                    $rootScope.isShowViewAllProductFilter = false;
                    $rootScope.toggleViewAllProductFilterBtnLabel = "SHOW FILTER";
        
                    // calling ProductServices
                    ProductServices.getProductTypeProductCategoryFilterTypeList(fetchParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'filterOperationTypeList', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    if(arrJsonObj.allProductPriceDetailsArr!==false && arrJsonObj.allProductPriceDetailsArr!==undefined){
                                        $rootScope.buildPriceFilterListHtmlSelectControlCStore(arrJsonObj.allProductPriceDetailsArr);
                                    }
                                    if(arrJsonObj.allProductSizeDetailsArr!==false && arrJsonObj.allProductSizeDetailsArr!==undefined){
                                        $rootScope.buildSizeFilterListHtmlSelectControlCStore(arrJsonObj.allProductSizeDetailsArr);
                                    }
                                    if(arrJsonObj.allProductDiscountDetailsArr!==false && arrJsonObj.allProductDiscountDetailsArr!==undefined){
                                        $rootScope.buildDiscountFilterListHtmlSelectControlCStore(arrJsonObj.allProductDiscountDetailsArr);
                                    }
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.loadProductTypeProductCategoryFilterTypeList = false;
                console.log("problem in loadProductTypeProductCategoryFilterTypeList ex=>"+ex);
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
        
        // buildPriceFilterListHtmlSelectControl
        $rootScope.buildPriceFilterListHtmlSelectControlCStore = function(allProductPriceDetails){
            try{    
                if($('#allProductPriceFilterListSelectCtrlId').length===1){
                    var defaultSelectedAllProductPriceFilterArr = new Array();
                    var productPriceFilterListSelectControlElementObj = document.getElementById("allProductPriceFilterListSelectCtrlId");
                    // all options remove and destroy bootstrap select feature
                    $(productPriceFilterListSelectControlElementObj).find('option').remove();
                    $(productPriceFilterListSelectControlElementObj).selectpicker('destroy');
                    if(jQuery.isEmptyObject(allProductPriceDetails)===false && allProductPriceDetails!=='' 
                        && allProductPriceDetails!==undefined && allProductPriceDetails!==false){
                        // price sorting data prepared
                        var allPriceSortingListArr = allProductPriceDetails['sortingList'];
                        if(allPriceSortingListArr.length>0 && allPriceSortingListArr!==false){
                            // iterate each price sorting details
                            var optionGroupStr = "<optgroup label='Sort On (Single selection)' data-max-options='1'>";
                            for(var eachPriceSortingDetailsArrIndex = 0; eachPriceSortingDetailsArrIndex<allPriceSortingListArr.length; eachPriceSortingDetailsArrIndex++){
                                var dataIconStr = 'fa fa-sort-amount-asc';
                                var priceSortingValue = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortValue'];
                                var priceSortingTitle = allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['priceSortTitle'];
                                if(priceSortingValue==='hightolow'){
                                    dataIconStr = 'fa fa-sort-amount-desc';
                                }
                                var eachOptionStr = "<option class='priceFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+priceSortingValue+"'>"+priceSortingTitle+"</option>";
                                optionGroupStr+= eachOptionStr;
                                if(allPriceSortingListArr[eachPriceSortingDetailsArrIndex]['isRequestedPriceSortedMatched']==='Y'){
                                    defaultSelectedAllProductPriceFilterArr.push(priceSortingValue);
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
                                if(allPriceRangeList[eachPriceRangeDetailsArrIndex]['isRequestedPriceRangeMatched']==='Y'){
                                    defaultSelectedAllProductPriceFilterArr.push(priceRangeValue);
                                }
                            }
                            $(productPriceFilterListSelectControlElementObj).append(optionGroupStr);
                        }
                    }
                    // refresh product price range list select control element 
                    $(productPriceFilterListSelectControlElementObj).selectpicker('refresh');
                    // apply change function event
                    if($(productPriceFilterListSelectControlElementObj).find('option').length>0){
                        $rootScope.applyChangeEventOnPriceFilterSelectCtrlElementCStore(productPriceFilterListSelectControlElementObj);
                    }
                }
            }catch(ex){
                console.log("problem in buildPriceFilterListHtmlSelectControlCStore=>"+ex);
            }    
        };
        
        // applyChangeEventOnPriceFilterSelectCtrlElement
        $rootScope.applyChangeEventOnPriceFilterSelectCtrlElementCStore = function(elementObj){
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
                    $rootScope.loadProductTypeProductCategoryAllProductListCStore();
                }catch(ex){
                    console.log("problem in applyChangeEventOnPriceFilterSelectCtrlElementCStore=>"+ex);
                }    
            });
        };
        
        // buildSizeFilterListHtmlSelectControl
        $rootScope.buildSizeFilterListHtmlSelectControlCStore = function(allProductSizeDetails){
            try{
                if($('#allProductSizeFilterListSelectCtrlId').length===1){
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
                        }
                        $(productSizeFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                    // refresh product size list select control element 
                    $(productSizeFilterListSelectControlElementObj).selectpicker('refresh');
                    // apply change function event
                    if($(productSizeFilterListSelectControlElementObj).find('option').length>0){
                        $rootScope.applyChangeEventOnSizeFilterSelectCtrlElementCStore(productSizeFilterListSelectControlElementObj);
                    }
                }
            }catch(ex){
                console.log("problem in buildSizeFilterListHtmlSelectControl=>"+ex);
            } 
        };
        
        // applyChangeEventOnSizeFilterSelectCtrlElement
        $rootScope.applyChangeEventOnSizeFilterSelectCtrlElementCStore = function(elementObj){
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
                    $rootScope.loadProductTypeProductCategoryAllProductListCStore();
                });
            }catch(ex){
                console.log("problem in applyChangeEventOnSizeFilterSelectCtrlElementCStore=>"+ex);
            }
        };
       
        // buildDiscountFilterListHtmlSelectControl
        $rootScope.buildDiscountFilterListHtmlSelectControlCStore = function(allProductDiscountDetails){
            if($('#allProductDiscountFilterListSelectCtrlId').length===1){ 
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
                            var discountSortingTitle = allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['discountSortTitle'];
                            if(discountSortingValue==='hightolow'){
                                dataIconStr = 'fa fa-sort-amount-desc';
                            }
                            var eachOptionStr = "<option class='discountFilterOperationOptionClass' data-icon='"+dataIconStr+"' value='"+discountSortingValue+"'>"+discountSortingTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                        }
                        $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                    var allDiscountRangeList = allProductDiscountDetails['rangeList'];
                    if(allDiscountRangeList.length>0 && allDiscountRangeList!==false){
                        var optionGroupStr = "<optgroup label='Discount Range (Multiple selection)'>";
                        // iterate each price range details
                        for(var eachDiscountRangeDetailsArrIndex = 0; eachDiscountRangeDetailsArrIndex<allDiscountRangeList.length; eachDiscountRangeDetailsArrIndex++){
                            var discountRangeValue = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeValue'];
                            var discountRangeTitle = allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['discountRangeTitle'];
                            var eachOptionStr = "<option class='discountFilterOperationOptionClass' value='"+discountRangeValue+"'>"+discountRangeTitle+"</option>";
                            optionGroupStr+= eachOptionStr;
                        }
                        $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                    }
                }
                // refresh product discount filter list select control element 
                $(productDiscountFilterListSelectControlElementObj).selectpicker('refresh');
                if($(productDiscountFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventOnDiscountFilterSelectCtrlElementCStore(productDiscountFilterListSelectControlElementObj);
                }
            }
        };
        
        // applyChangeEventOnDiscountFilterSelectCtrlElement
        $rootScope.applyChangeEventOnDiscountFilterSelectCtrlElementCStore = function(elementObj){
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
                    $rootScope.loadProductTypeProductCategoryAllProductListCStore();
                });
            }catch(ex){
                console.log("problem in applyChangeEventOnDiscountFilterSelectCtrlElementCStore=>"+ex);
            }
        };
        
        // loadProductTypeProductCategoryAllProductList 
        $rootScope.loadProductTypeProductCategoryAllProductListCStore = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjForProductTypeProductCategoryAllProductList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.allProductDetailsList = false;
                    $rootScope.defaultSelectProductCategoryTitle = '';
                    $rootScope.notFoundProductMsgStr = 'No products found or used proper filter !!!';
                    $rootScope.totalProductCount = 0;
                    // calling ProductServices 
                    ProductServices.getProductTypeProductCategoryAllProductList(fetchedParamJsonObj).done(function(retResponseJson){
                        $rootScope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.defaultSelectProductCategoryTitle = arrJsonObj.productTypeDetails.requestedProductCategoryTitle;
                                    if(arrJsonObj.productTypeDetails.allProductDetailsList!==false 
                                        && arrJsonObj.productTypeDetails.allProductDetailsList!==undefined){
                                        $rootScope.allProductDetailsList = arrJsonObj.productTypeDetails.allProductDetailsList;
                                        $rootScope.totalProductCount = arrJsonObj.productTypeDetails.allProductDetailsList.length;
                                    }else{
                                        $rootScope.notFoundProductMsgStr = 'No products found or used proper filter !!!';
                                    }
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.allProductDetailsList = false;
                $rootScope.notFoundProductMsgStr = 'No products found or used proper filter !!!';
                $rootScope.totalProductCount = 0;
                console.log("problem in loadProductTypeProductCategoryAllProductListCStore ex=>"+ex);
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
                            $rootScope.$apply(function(){
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
                        $rootScope.$apply(function(){
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
                    // get param obj to load store working style details
                    var preparedParamJsonObj = getParamObjForCShopStoreWorkingStyleDetails();
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var fetchedParamJsonObj = {};
                        fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.cShopstoreWorkingstyleDetails = false;
                        // calling ShopStoreServices 
                        ShopStoreServices.getCShopStoreWorkingStyleDetails(fetchedParamJsonObj).done(function(retResponseJson){
                            $rootScope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'shopstoreWorkingStyleDetails', retResponseJson);
                                    if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                        $rootScope.cShopstoreWorkingstyleDetails = arrJsonObj;
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.cShopstoreWorkingstyleDetails = false;
                console.log("problem in loadCShopStoresWorkingStyle ex=>"+ex);
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
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = true;
                $rootScope.loadCShopStoresWorkingStyle();
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
                $rootScope.loadProductTypeProductCategoryAllProductListCStore();
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
                $rootScope.isShowShopStoreRatingReviewDetails = true;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Hide Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.loadShopStoreAllUserRatingReviewed();
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
                $rootScope.loadProductTypeProductCategoryAllProductListCStore();
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
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }else{
                $rootScope.isToggleCShopStoreSelfSummaryInfo = false;
                $rootScope.toggleShopStoreSelfSummaryInfoLblText = "Show Details";
                $rootScope.isToggleShopStoreDessertsMenu = false;
                $rootScope.toggleShopStoreDessertsMenuSummaryInfoLblText = "Show Details";
                $rootScope.isShowShopStoreDessertsTypeMenuList = false;
                $rootScope.isShowShopStoreRatingReviewDetails = false;
                $rootScope.toggleShopStoreRatingReviewSummaryInfoLblText = "Show Details";
                $rootScope.allUserRatingReviewDetails = false;
                $rootScope.isShowCShopStoreWorkingStyleDetails = false;
                $rootScope.cShopstoreWorkingstyleDetails = false;
            }
        };
        
        
    }catch(ex){
        console.log("problem in ShopstoreDetailsController ex=>"+ex);
    }
    
}


