
angular.module('DKAPP').controller('ProductController', ProductController);

function ProductController($scope, $rootScope, $http, ProductServices, LocationServices){
    try{
        
        $rootScope.productViewAllFilterPopDivClass = '';
        $rootScope.isShowViewAllProductFilter = false;
        $rootScope.toggleViewAllProductFilterBtnLabel = "SHOW FILTER";
        
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
        
        
        // loadProductTypeAllProductCategoryList 
        $rootScope.loadProductTypeAllProductCategoryList = function(){
            try{
                // get param obj to load product all product category list
                var preparedParamJsonObj = getParamObjForLoadingProductTypeAllProductCategoryList();
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
                                    storeProductTypeProductCategoryDataInSession(arrJsonObj.defaultSelectedProductCategoryDetails);
                                    $rootScope.productTypeAllProductCategoryList = arrJsonObj.productTypeAllProductCategoryList;
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
                    // $rootScope.loadProductTypeProductCategoryAllProductList();
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
           
        // loadProductTypeProductCategoryAllProductList 
        $rootScope.loadProductTypeProductCategoryAllProductList = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjForLoadingProductTypeProductCategoryAllProductList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.defaultSelectProductTypeitle = '';
                    $rootScope.defaultSelectProductTypeValue = '';
                    $rootScope.defaultSelectProductCategoryTitle = '';
                    $rootScope.defaultSelectProductCategoryValue = '';
                    $rootScope.productCategoryList = false;
                    $rootScope.allProductDetailsList = false;
                    $rootScope.notFoundProductMsgStr = '';
                    
                    // calling ProductServices to get all product list
                    ProductServices.getProductTypeProductCategoryAllProductList(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    if(retObj.productTypeDetails.productCategoryList!==false){
                                        $rootScope.productCategoryList = retObj.productTypeDetails.productCategoryList;
                                    }
                                    $rootScope.defaultSelectProductCategoryTitle = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                    if(retObj.productTypeDetails.defaultSelectProductCategoryValue!==''){
                                        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                                        existingDkParamObj['userProduct']['producttype_name'] = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                        existingDkParamObj['userProduct']['producttype_value'] = retObj.productTypeDetails.defaultedSelectedProductTypeValue;
                                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = retObj.productTypeDetails.defaultSelectProductCategoryValue;
                                        existingDkParamObj['userProduct']['producttype_categoryname'] = retObj.productTypeDetails.defaultSelectProductCategoryTitle;
                                        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                                    }
                                    if(retObj.productTypeDetails.allShopStoresDetailsArr!==false && retObj.productTypeDetails.allShopStoresDetailsArr!==undefined){
                                        $rootScope.buildAllProductShopStoresFilterListHtmlSelectControl(retObj.productTypeDetails.allShopStoresDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductPriceDetailsArr!==false && retObj.productTypeDetails.allProductPriceDetailsArr!==undefined){
                                        $rootScope.buildAllProductPriceFilterListHtmlSelectControl(retObj.productTypeDetails.allProductPriceDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductSizeDetailsArr!==false && retObj.productTypeDetails.allProductSizeDetailsArr!==undefined){
                                        $rootScope.buildAllProductSizeFilterListHtmlSelectControl(retObj.productTypeDetails.allProductSizeDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductDiscountDetailsArr!==false && retObj.productTypeDetails.allProductDiscountDetailsArr!==undefined){
                                        $rootScope.buildAllProductDiscountFilterListHtmlSelectControl(retObj.productTypeDetails.allProductDiscountDetailsArr);
                                    }
                                    if(retObj.productTypeDetails.allProductDetailsList!==false && retObj.productTypeDetails.allProductDetailsList!==undefined){
                                        $rootScope.allProductDetailsList = retObj.productTypeDetails.allProductDetailsList;
                                    }else{
                                        $rootScope.notFoundProductMsgStr = 'No products found used proper filter';
                                    }
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.allProductDetailsList = false;
                $rootScope.notFoundProductMsgStr = 'No products found used proper filter';
                console.log("problem in loadProductTypeProductCategoryAllProductList ex=>"+ex);
                showHideLoaderBox('hide');
            }
        };   
           
           
        // viewProductDetails
        $rootScope.viewProductDetails = function(paramObj){
            try{
                var rtStatus = checkAllParamToViewProductDetails(paramObj);
                if(rtStatus===true){
                    // redirect to view product details
                    window.location.href = globalBaseSitePath+"product.php";
                }
            }catch(ex){
                console.log("problem in viewProductDetails ex=>"+ex);
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
        
        // loadProductTypeProductCategoryProductDetails 
        $rootScope.loadProductTypeProductCategoryProductDetails = function(){
            try{
                // get param obj
                var preparedParamJsonObj = getParamObjFromSessionForLoadingProductTypeProductCategoryProductDetails();
                // console.log("loadProductTypeProductCategoryProductDetails preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchedParamJsonObj = {};
                    fetchedParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    
                    $rootScope.vPDetails = false;
                    
                    // calling ProductServices to get product details
                    ProductServices.getProductTypeProductCategoryProductDetails(fetchedParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', '', retResponseJson);
                                if(retObj!==false && retObj!==undefined && retObj!==''){
                                    //console.log("loadProductTypeProductCategoryProductDetails retObj=>"+JSON.stringify(retObj));
                                    $rootScope.vPDetails = retObj.viewProductDetails;
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                $rootScope.vPDetails = false;
                console.log("problem in loadProductTypeProductCategoryProductDetails ex=>"+ex);
                showHideLoaderBox('hide');
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
        
        
        
        // buildAllProductShopStoresFilterListHtmlSelectControl
        $rootScope.buildAllProductShopStoresFilterListHtmlSelectControl = function(allShopStoreList){
            try{
                var defaultedSelectedShopStore = '';
                var shopStoreFilterListSelectControlElementObj = document.getElementById("allShopStoresFilterListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(shopStoreFilterListSelectControlElementObj).find('option').remove();
                $(shopStoreFilterListSelectControlElementObj).selectpicker('destroy');
                if(allShopStoreList.length>0 && allShopStoreList!=='' && allShopStoreList!==undefined && allShopStoreList!==false){
                    // iterate each shopstore details
                    for(var eachShopstoreDetailsArrIndex = 0; eachShopstoreDetailsArrIndex<allShopStoreList.length; eachShopstoreDetailsArrIndex++){
                        if(allShopStoreList[eachShopstoreDetailsArrIndex]['isRequestedShopstoresMatched']==='Y'){
                            defaultedSelectedShopStore = allShopStoreList[eachShopstoreDetailsArrIndex]['shopStoresId'];
                        }
                        var dataIconstr = 'fa fa-user';
                        var shopStoreValue = allShopStoreList[eachShopstoreDetailsArrIndex]['shopStoresId'];
                        var shopStoreTitle = allShopStoreList[eachShopstoreDetailsArrIndex]['shopStoresTitle'];
                        var eachOptionStr = "<option class='shopstoreFilterOperationOptionClass' data-icon='"+dataIconstr+"' value='"+shopStoreValue+"'>"+shopStoreTitle+"</option>";
                        $(shopStoreFilterListSelectControlElementObj).append(eachOptionStr);
                    }
                }
                // refresh shopstore list select control element 
                $(shopStoreFilterListSelectControlElementObj).selectpicker('refresh');
                // default selected shopstore 
                if((defaultedSelectedShopStore).length===32){
                    $(shopStoreFilterListSelectControlElementObj).selectpicker('val', defaultedSelectedShopStore);
                }
                // apply function event
                if($(shopStoreFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedProductShopStoreFilterListHtmlSelectControlOnChangeEvent(shopStoreFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllProductShopStoresFilterListHtmlSelectControl=>"+ex);
            }
        };
        
        // buildedProductShopStoreFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedProductShopStoreFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
            try{
                $(elementObj).on('changed.bs.select', function(e){
                    var selectedShopStoreValues = $(elementObj).selectpicker('val');
                    // reset session storage about user product(shopstore value)
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['userProduct']['shopstore_value'] = '';
                    if(selectedShopStoreValues!=='' && (selectedShopStoreValues).length===32 && selectedShopStoreValues!==null){
                        existingDkParamObj['userProduct']['shopstore_value'] = selectedShopStoreValues;
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    // refresh the screen
                    angular.element('#vapWrapperDivId').scope().loadProductTypeProductCategoryAllProductList();
                });
            }catch(ex){
                console.log("problem in buildedShopStoreFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // buildAllProductPriceFilterListHtmlSelectControl
        $rootScope.buildAllProductPriceFilterListHtmlSelectControl = function(allProductPriceDetails){
            try{    
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
                // default selected product price filter 
                if(defaultSelectedAllProductPriceFilterArr.length>0){
                    $(productPriceFilterListSelectControlElementObj).selectpicker('val', defaultSelectedAllProductPriceFilterArr);
                }
                // apply function event
                if($(productPriceFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedProductPriceFilterListHtmlSelectControlOnChangeEvent(productPriceFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllProductPriceFilterListHtmlSelectControl=>"+ex);
            }    
        };
        
        // buildedProductPriceFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedProductPriceFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
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
                    console.log("problem in buildedProductPriceFilterListHtmlSelectControlOnChangeEvent=>"+ex);
                }    
            });
        };
        
        // buildAllProductSizeFilterListHtmlSelectControl
        $rootScope.buildAllProductSizeFilterListHtmlSelectControl = function(allProductSizeDetails){
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
                // default selected product size 
                if(defaultedSelectedProductSize!=='' && defaultedSelectedProductSize!==false){
                    $(productSizeFilterListSelectControlElementObj).selectpicker('val', defaultedSelectedProductSize);
                }
                // apply event
                if($(productSizeFilterListSelectControlElementObj).find('option').length>0){
                    $rootScope.buildedProductSizeFilterListHtmlSelectControlOnChangeEvent(productSizeFilterListSelectControlElementObj);
                }
            }catch(ex){
                console.log("problem in buildAllProductSizeFilterListHtmlSelectControl=>"+ex);
            } 
        };
        
        // buildedProductSizeFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedProductSizeFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
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
                console.log("problem in buildedProductSizeFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
        // buildAllProductDiscountFilterListHtmlSelectControl
        $rootScope.buildAllProductDiscountFilterListHtmlSelectControl = function(allProductDiscountDetails){
            var defaultSelectedAllProductDiscountFilterArr = new Array();
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
                        if(allDiscountSortingListArr[eachDiscountSortingDetailsArrIndex]['isRequestedDiscountSortedMatched']==='Y'){
                            defaultSelectedAllProductDiscountFilterArr.push(discountSortingValue);
                        }
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
                        if(allDiscountRangeList[eachDiscountRangeDetailsArrIndex]['isRequestedDiscountRangeMatched']==='Y'){
                            defaultSelectedAllProductDiscountFilterArr.push(discountRangeValue);
                        }
                    }
                    $(productDiscountFilterListSelectControlElementObj).append(optionGroupStr);
                }
            }
            // refresh product discount filter list select control element 
            $(productDiscountFilterListSelectControlElementObj).selectpicker('refresh');
            // default selected product size 
            if(defaultSelectedAllProductDiscountFilterArr.length>0){
                $(productDiscountFilterListSelectControlElementObj).selectpicker('val', defaultSelectedAllProductDiscountFilterArr);
            }
            if($(productDiscountFilterListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDiscountFilterListHtmlSelectControlOnChangeEvent(productDiscountFilterListSelectControlElementObj);
            }
        };
        
        // buildedDiscountFilterListHtmlSelectControlOnChangeEvent
        $rootScope.buildedDiscountFilterListHtmlSelectControlOnChangeEvent = function(elementObj){
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
                console.log("problem in buildedDiscountFilterListHtmlSelectControlOnChangeEvent=>"+ex);
            }
        };
        
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

