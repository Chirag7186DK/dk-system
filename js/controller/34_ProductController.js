
angular.module('DKAPP').controller('ProductController', ProductController);

function ProductController($scope, $rootScope, $http, ProductServices, LocationServices){
    try{
        
        // loadDKDeliveryAreaBasedDessertsTypeList 
        $rootScope.loadDKDeliveryAreaBasedDessertsTypeList = function(){
            try{
                // get param obj to desserts type list
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaBasedDessertsTypeList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchParamJsonObj = {};
                    fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.dkDeliveryAreaBasedDessertsTypeList = false;
                    // calling LocationServices
                    LocationServices.getDKDeliveryAreaBasedDessertsTypeList(fetchParamJsonObj).done(function(retResponseJson){
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
        
        // storeDessertsTypeDataDetailsInSessionStorageToViewAllProductList
        $rootScope.storeDessertsTypeDataDetailsInSessionStorageToViewAllProductList = function(paramObj){
            var storedDataStatus = storeDefaultDeliveryDessertsTypeDetailsInSessionStorage(paramObj, 'Y');
            if(storedDataStatus===true){  
                if((paramObj['dessertsTypeTitle']).toLowerCase()==='cakes'){
                    window.location.href =  globalBaseSitePath+"all-cakes.php";
                }else if((paramObj['dessertsTypeTitle']).toLowerCase()==='chocolates'){
                    window.location.href =  globalBaseSitePath+"all-chocolates.php";
                }
            }
        };
        
        // loadProductTypeAllProductCategoryList 
        $rootScope.loadProductTypeAllProductCategoryList = function(){
            try{
                // get param obj to load product all product category list
                var preparedParamJsonObj = getParamObjForProductTypeAllProductCategoryList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchParamJsonObj = {};
                    fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.productTypeAllProductCategoryList = false;
                    // calling ProductServices
                    ProductServices.getProductTypeAllProductCategoryList(fetchParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'productTypeProductCategoryDetails', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    $rootScope.productTypeAllProductCategoryList = arrJsonObj.productTypeAllProductCategoryList;
                                    $rootScope.storeProductTypeProductCategoryDataInSession(arrJsonObj.defaultSelectedProductCategoryDetails);
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
        $rootScope.storeProductTypeProductCategoryDataInSession = function(productCategoryParamObj){
            try{
                // storing product type product cateogory data in session
                var dataStoredInSessionStatus = storeProductTypeProductCategoryDataInSession(productCategoryParamObj);
                if(dataStoredInSessionStatus===true){
                    $rootScope.loadProductTypeProductCategoryFilterTypeList();
                    $rootScope.loadProductTypeProductCategoryAllProductList();
                }
            }catch(ex){
                console.log("problem in storeProductTypeProductCategoryDataInSession ex=>"+ex);
            }
        };
        
        // toggleProductTypeProductCategoryElementClass
        $rootScope.toggleProductTypeProductCategoryElementClass = function(currentElementClickedId, clickedElementParentClass){
            // toggle backgroun class also
            if(currentElementClickedId!==undefined && currentElementClickedId!==undefined){
                $('.'+clickedElementParentClass).find('li').removeClass('vap_eachRequestedProductCategoryLabelLIClass');
                $('#'+currentElementClickedId).addClass('vap_eachRequestedProductCategoryLabelLIClass');
            }
        };
        
        // loadProductTypeProductCategoryFilterTypeList 
        $rootScope.loadProductTypeProductCategoryFilterTypeList = function(){
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
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'filterOperationTypeList', retResponseJson);
                                if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                    if(arrJsonObj.allShopStoresDetailsArr!==false && arrJsonObj.allShopStoresDetailsArr!==undefined){
                                        $rootScope.buildStoresFilterListHtmlSelectControl(arrJsonObj.allShopStoresDetailsArr);
                                    }
                                    if(arrJsonObj.allProductPriceDetailsArr!==false && arrJsonObj.allProductPriceDetailsArr!==undefined){
                                        $rootScope.buildPriceFilterListHtmlSelectControl(arrJsonObj.allProductPriceDetailsArr);
                                    }
                                    if(arrJsonObj.allProductSizeDetailsArr!==false && arrJsonObj.allProductSizeDetailsArr!==undefined){
                                        $rootScope.buildSizeFilterListHtmlSelectControl(arrJsonObj.allProductSizeDetailsArr);
                                    }
                                    if(arrJsonObj.allProductDiscountDetailsArr!==false && arrJsonObj.allProductDiscountDetailsArr!==undefined){
                                        $rootScope.buildDiscountFilterListHtmlSelectControl(arrJsonObj.allProductDiscountDetailsArr);
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
        
        // buildStoresFilterListHtmlSelectControl
        $rootScope.buildStoresFilterListHtmlSelectControl = function(allShopStoreList){
            try{
                if($('#allShopStoresFilterListSelectCtrlId').length===1
                    && allShopStoreList.length>0 && allShopStoreList!==false){
                    var storeFilterListSelectControlElementObj = document.getElementById("allShopStoresFilterListSelectCtrlId");
                    // all options remove and destroy bootstrap select feature
                    $(storeFilterListSelectControlElementObj).find('option').remove();
                    $(storeFilterListSelectControlElementObj).selectpicker('destroy');
                    // iterate each shopstore details
                    for(var eachStoreIndex = 0; eachStoreIndex<allShopStoreList.length; eachStoreIndex++){
                        var dataIconstr = 'fa fa-user';
                        var shopStoreValue = allShopStoreList[eachStoreIndex]['shopStoresId'];
                        var shopStoreTitle = allShopStoreList[eachStoreIndex]['shopStoresTitle'];
                        var eachOptionStr = "<option class='shopstoreFilterOperationOptionClass' data-icon='"+dataIconstr+"' value='"+shopStoreValue+"'>"+shopStoreTitle+"</option>";
                        $(storeFilterListSelectControlElementObj).append(eachOptionStr);
                    }
                    // refresh shopstore list select control element 
                    $(storeFilterListSelectControlElementObj).selectpicker('refresh');
                    // apply change function event
                    if($(storeFilterListSelectControlElementObj).find('option').length>0){
                        $rootScope.applyChangeEventOnStoreFilterSelectCtrlElement(storeFilterListSelectControlElementObj);
                    }
                }
            }catch(ex){
                console.log("problem in buildStoresFilterListHtmlSelectControl=>"+ex);
            }
        };
        
        // applyChangeEventOnStoreFilterSelectCtrlElement
        $rootScope.applyChangeEventOnStoreFilterSelectCtrlElement = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedStoreValue = $(elementObj).selectpicker('val');
                    // reset session storage about user product (shopstore value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['shopstore_value'] = '';
                    if(selectedStoreValue!=='' && parseInt(selectedStoreValue)>0){
                        existingDkParamObj['userProduct']['shopstore_value'] = selectedStoreValue;
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in applyChangeEventOnStoreFilterSelectCtrlElement=>"+ex);
            }
        };
        
        // buildPriceFilterListHtmlSelectControl
        $rootScope.buildPriceFilterListHtmlSelectControl = function(allProductPriceDetails){
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
                        $rootScope.applyChangeEventOnPriceFilterSelectCtrlElement(productPriceFilterListSelectControlElementObj);
                    }
                }
            }catch(ex){
                console.log("problem in buildPriceFilterListHtmlSelectControl=>"+ex);
            }    
        };
        
        // applyChangeEventOnPriceFilterSelectCtrlElement
        $rootScope.applyChangeEventOnPriceFilterSelectCtrlElement = function(elementObj){
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
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                }catch(ex){
                    console.log("problem in applyChangeEventOnPriceFilterSelectCtrlElement=>"+ex);
                }    
            });
        };
        
        // buildSizeFilterListHtmlSelectControl
        $rootScope.buildSizeFilterListHtmlSelectControl = function(allProductSizeDetails){
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
                        $rootScope.applyChangeEventOnSizeFilterSelectCtrlElement(productSizeFilterListSelectControlElementObj);
                    }
                }
            }catch(ex){
                console.log("problem in buildSizeFilterListHtmlSelectControl=>"+ex);
            } 
        };
        
        // applyChangeEventOnSizeFilterSelectCtrlElement
        $rootScope.applyChangeEventOnSizeFilterSelectCtrlElement = function(elementObj){
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
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in applyChangeEventOnSizeFilterSelectCtrlElement=>"+ex);
            }
        };
       
        // buildDiscountFilterListHtmlSelectControl
        $rootScope.buildDiscountFilterListHtmlSelectControl = function(allProductDiscountDetails){
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
                    $rootScope.applyChangeEventOnDiscountFilterSelectCtrlElement(productDiscountFilterListSelectControlElementObj);
                }
            }
        };
        
        // applyChangeEventOnDiscountFilterSelectCtrlElement
        $rootScope.applyChangeEventOnDiscountFilterSelectCtrlElement = function(elementObj){
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
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in applyChangeEventOnDiscountFilterSelectCtrlElement=>"+ex);
            }
        };
        
           
        // loadProductTypeProductCategoryAllProductList 
        $rootScope.loadProductTypeProductCategoryAllProductList = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjForProductTypeProductCategoryAllProductList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.allProductDetailsList = false;
                    $rootScope.defaultSelectProductCategoryTitle = '';
                    $rootScope.notFoundProductMsgStr = '';
                    
                    // calling ProductServices to get all product list
                    ProductServices.getProductTypeProductCategoryAllProductList(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    $rootScope.defaultSelectProductCategoryTitle = retObj.productTypeDetails.requestedProductCategoryTitle;
                                    if(retObj.productTypeDetails.allProductDetailsList!==false 
                                        && retObj.productTypeDetails.allProductDetailsList!==undefined){
                                        $rootScope.allProductDetailsList = retObj.productTypeDetails.allProductDetailsList;
                                    }else{
                                        $rootScope.notFoundProductMsgStr = 'No products found or used proper filter';
                                    }
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.allProductDetailsList = false;
                $rootScope.notFoundProductMsgStr = 'No products found or used proper filter';
                console.log("problem in loadProductTypeProductCategoryAllProductList ex=>"+ex);
            }
        };   
           
        // view-product-details
        $rootScope.viewProductDetails = function(paramObj){
            try{
                var rtStatus = checkAllParamToViewProductDetails(paramObj);
                if(rtStatus===true){
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
        
        // collectDataToLoadDeliveryAreabasedProductTypeAllProductList, delivery area based on
        $rootScope.collectDataToViewDeliveryAreabasedProductTypeAllProductList = function(preparedParamObj){
            try{
                var retStatus = checkAllParamToViewAllProducts(preparedParamObj);
                if(retStatus===true){
                    window.location.href = globalBaseSitePath+"allproducts.php";
                }
            }catch(ex){
                console.log("problem in collectDataToLoadDeliveryAreabasedProductTypeAllProductList=>"+ex);
            }
        };
        
        
        
        // loadProductDescriptionDetails 
        $rootScope.loadProductDescriptionDetails = function(){
            try{
                // get param obj to get product description details
                var preparedParamJsonObj = getParamObjFromSessionForLoadingProductDescriptionDetails();
                // console.log("loadProductDescriptionDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.productDescriptionDetailsArr = false;
                    $rootScope.isProductDescriptionDetailsFound = false;
                    
                    // calling ProductServices 
                    ProductServices.getProductDescriptionDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    // console.log("loadProductDescriptionDetails retObj=>"+JSON.stringify(retObj));
                                    $rootScope.isProductDescriptionDetailsFound = retObj.isProductDescriptionDetailsFound;
                                    $rootScope.productDescriptionDetailsArr = retObj.descriptionDetailsArr;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                showHideLoaderBox('hide');
                $rootScope.isProductDescriptionDetailsFound = false;
                $rootScope.productDescriptionDetailsArr = false;
                console.log("loadProductTypeProductCategoryProductDetails ex=>"+ex);
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
        
    }catch(ex){
        console.log("problem in ProductTypeProductCategoryProductDetailsController ex=>"+ex);
    }
    
}

