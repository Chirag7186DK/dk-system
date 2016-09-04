<?php

/**
* Description of ProductServicesV1
* @author CJ defined this service 2016-06-06
*/

class ProductServicesV1 implements IProductServicesV1{

    // CJ defined this action 2016-06-06
    public function getDeliveryAreaBasedDessertsTypeList($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails'] = false;
            $rsltJsonArr['allDessertsTypeList'] = false;
            // initial variable declare
            $gccaIds = $dkParamDataArr['ccaId'];
            $gproducttype_ids = $dkParamDataArr['producttype_ids'];
            $sqlGroupByStatement = ' pt.id ';
            // fetch all desserts type details based on ccaIds
            $ccaBasedConductDessertsTypeDetailsArr = LocationDao::getCCABasedConductDessertsTypeDetails($gccaIds, '', '', '', $sqlGroupByStatement);
            if(count($ccaBasedConductDessertsTypeDetailsArr)>0 && $ccaBasedConductDessertsTypeDetailsArr!=false){
                $allDessertsTypeListArr = array();
                // iterate each desserts type list
                for($eachIndex = 0; $eachIndex<count($ccaBasedConductDessertsTypeDetailsArr); $eachIndex++){
                    $productIcon = '';
                    $isRequestedDessertsTypeIdMatched = 'N';
                    $iteratedDessertsTypeListId = $ccaBasedConductDessertsTypeDetailsArr[$eachIndex]['productTypeId'];
                    $iteratedDessertsTypeTitle = $ccaBasedConductDessertsTypeDetailsArr[$eachIndex]['productTypeTitle'];
                    if(strtolower($iteratedDessertsTypeTitle)=='cakes'){
                        $productIcon = 'fa fa-birthday-cake';
                    }
                    if(strtolower($iteratedDessertsTypeTitle)=='ice cream'){
                        $productIcon = 'fa fa-birthday-cake';
                    }
                    if(strtolower($iteratedDessertsTypeTitle)=='chocolates'){
                        $productIcon = 'fa fa-birthday-cake';
                    }
                    if($gproducttype_ids==$iteratedDessertsTypeListId){
                        $isRequestedDessertsTypeIdMatched = 'Y';
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails'] = array();
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails']['matchedProductTypeId'] = $iteratedDessertsTypeListId;
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails']['matchedProductTypeTitle'] = $iteratedDessertsTypeTitle;
                    }
                    array_push($allDessertsTypeListArr, array(
                        "dessertsTypeId"=>$iteratedDessertsTypeListId,
                        "dessertsTypeTitle"=>$iteratedDessertsTypeTitle,
                        "dessertsIcon"=>$productIcon,
                        "isRequestedProductTypeIdMatched"=>$isRequestedDessertsTypeIdMatched
                    ));
                }
                $rsltJsonArr['allDessertsTypeList'] = $allDessertsTypeListArr;
                $rspDetails["deliveryAreaBasedDessertsTypeDetails"] = $rsltJsonArr;
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this action 2016-09-03
    public function getProductTypeAllProductCategoryDetails($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectedProductCategoryDetails'] = false;
            $rsltJsonArr['productTypeAllProductCategoryList'] = false;
            // initial variable declare
            $gccaIds = $dkParamDataArr['ccaId'];
            $gproducttype_ids = $dkParamDataArr['product_typesids'];
            $product_categoryids = $dkParamDataArr['product_categoryids'];
            // fetch store details who do given desserts type business in ccaIds
            $allStoreDetailsArr = LocationDao::getCCABasedConductDessertsTypeDetails($gccaIds, $gproducttype_ids, '', '', '');
            if(count($allStoreDetailsArr)>0 && $allStoreDetailsArr!=false){
                $allStoreIdsStr = implode(",", array_keys(utils :: arraySort($allStoreDetailsArr, array("shopStoreId"))));
                $paramDataArr1 = array();
                $paramDataArr1['product_typeids'] = $gproducttype_ids;
                $paramDataArr1['shop_storesids'] = $allStoreIdsStr;
                $paramDataArr1['groupby_product_typeids'] = 'Y';
                $paramDataArr1['groupby_product_categoryids'] = 'Y';
                $selectStatementForGroupBy = ", COUNT(DISTINCT splld.id) totalProductCount, GROUP_CONCAT(DISTINCT ss.id) shopStoreIds ";
                $dataArr1 = ProductDao :: getProductTypeProductCategoryProductList($paramDataArr1, $selectStatementForGroupBy);
                if(count($dataArr1)>0 && $dataArr1!=false){
                    $productTypeAllCategoryList = array();
                    $counterRequestedProductCategoryFound = 0;
                    // iterate each product type all product category list
                    for($eachIndex = 0; $eachIndex<count($dataArr1); $eachIndex++){
                        $isRequestedProductCategoryMatched  = 'N';
                        $iteratedProductTypeId = $dataArr1[$eachIndex]['productTypeId'];
                        $iteratedProductTypeTitle = $dataArr1[$eachIndex]['productTypeTitle'];
                        $iteratedProductCategoryId = $dataArr1[$eachIndex]['productTypeProductCategoryId'];
                        $iteratedProductCategoryTitle = $dataArr1[$eachIndex]['productTypeProductCategoryTitle'];
                        $totalProductCount = $dataArr1[$eachIndex]['totalProductCount'];
                        $shopStoreIds = $dataArr1[$eachIndex]['shopStoreIds'];
                        if($product_categoryids==$iteratedProductCategoryId){
                            $isRequestedProductCategoryMatched  = 'Y';
                            $rsltJsonArr['defaultSelectedProductCategoryDetails'] = array();
                            $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeId'] = $iteratedProductTypeId;
                            $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeTitle'] = $iteratedProductTypeTitle;
                            $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeProductCategoryId'] = $iteratedProductCategoryId;
                            $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeProductCategoryTitle'] = $iteratedProductCategoryTitle;
                            $rsltJsonArr['defaultSelectedProductCategoryDetails']['totalProductCount'] = $totalProductCount;
                            $rsltJsonArr['defaultSelectedProductCategoryDetails']['shopStoreIds'] = $shopStoreIds;
                            $counterRequestedProductCategoryFound++;
                        }
                        array_push($productTypeAllCategoryList, 
                            array(
                                "productTypeId"=>$iteratedProductTypeId,
                                "productTypeTitle"=>$iteratedProductTypeTitle,
                                "productTypeProductCategoryId"=>$iteratedProductCategoryId,
                                "productTypeProductCategoryTitle"=>$iteratedProductCategoryTitle,
                                "totalProductCount"=>$totalProductCount,
                                "shopStoreIds"=>$shopStoreIds,
                                "isRequestedProductCategoryMatched"=>$isRequestedProductCategoryMatched
                            )
                        );
                    }
                    if($counterRequestedProductCategoryFound==0){
                        $rsltJsonArr['defaultSelectedProductCategoryDetails'] = array();
                        $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeId'] = $dataArr1[0]['productTypeId'];
                        $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeTitle'] = $dataArr1[0]['productTypeTitle'];
                        $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeProductCategoryId'] = $dataArr1[0]['productTypeProductCategoryId'];
                        $rsltJsonArr['defaultSelectedProductCategoryDetails']['productTypeProductCategoryTitle'] = $dataArr1[0]['productTypeProductCategoryTitle'];
                        $rsltJsonArr['defaultSelectedProductCategoryDetails']['totalProductCount'] = $dataArr1[0]['totalProductCount'];
                        $rsltJsonArr['defaultSelectedProductCategoryDetails']['shopStoreIds'] = $dataArr1[0]['shopStoreIds'];
                    }
                    $rsltJsonArr['productTypeAllProductCategoryList'] = $productTypeAllCategoryList;
                    $rspDetails["productTypeProductCategoryDetails"] = $rsltJsonArr;
                }
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this action 2016-09-03
    public function getProductTypeProductCategoryFilterTypeList($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            
            $rsltJsonArr = array();
            $rsltJsonArr['allShopStoresDetailsArr'] = false;
            $rsltJsonArr['allProductPriceDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductPriceDetailsArr']['rangeList'] = false;
            $rsltJsonArr['allProductSizeDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductSizeDetailsArr']['rangeList'] = false;
            $rsltJsonArr['allProductDiscountDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductDiscountDetailsArr']['rangeList'] = false;
            
            // initial varaible declare
            $gProductPriceFilterArr = array();
            $gProductPriceSortOn = '';
            $gProductDiscountFilterArr = array();
            $gProductDiscountSortOn = '';
            $gproductTypeId = $dkParamDataArr['product_typesids'];
            $gproductTypeProductCategoryId = $dkParamDataArr['product_categoryids'];
            $gAllShopstoreIds = $dkParamDataArr['allShopstoreids'];
            
            // prepare param obj to get all product list
            $paramObj1 = array();
            $paramObj1['product_typeids'] = $gproductTypeId;
            $paramObj1['product_categoryids'] = $gproductTypeProductCategoryId;
            $paramObj1['shop_storesids'] = $gAllShopstoreIds;
            $dataArr1 = ProductDao :: getProductTypeProductCategoryProductList($paramObj1);
            if(count($dataArr1)>0 && $dataArr1!=false){
                
                // prepare shopstore data  filtering list
                // sort on shopstore ids
                $sortedOnShopStoresArr = utils::arraySort($dataArr1, array("shopStoreId"));
                $rsltJsonArr['allShopStoresDetailsArr'] = commonfunction :: preparedShopstoreFilterationData($sortedOnShopStoresArr);
                
                // prepare data for price range, sorting etc filerting
                // sorted on online product price 
                $sortedPriceRangeListArr = utils::arraySort($dataArr1, array('productFeatureOnlineSellingPrice'));
                if(count($sortedPriceRangeListArr)>0 && $sortedPriceRangeListArr!=false){
                    $minPriceValue = min(array_keys($sortedPriceRangeListArr));
                    $maxPriceValue = max(array_keys($sortedPriceRangeListArr));
                    $resultArr = commonfunction :: preparedProductPriceFilterationData($minPriceValue, $maxPriceValue);
                    $rsltJsonArr['allProductPriceDetailsArr']['sortingList'] = $resultArr['sortingList'];
                    $rsltJsonArr['allProductPriceDetailsArr']['rangeList'] = $resultArr['rangeList'];
                }
                
                // prepare data for size range
                $sortedOnProductSizeArr = array_keys(utils::arraySort($dataArr1, array("productFeatureDisplayMeasurementType")));
                $isProductSizeArrSorted = sort($sortedOnProductSizeArr);
                if($isProductSizeArrSorted==true && count($sortedOnProductSizeArr)>0 && $sortedOnProductSizeArr!=false){
                    $rsltJsonArr['allProductSizeDetailsArr']['rangeList'] = commonfunction :: preparedProductSizeFilterationData($sortedOnProductSizeArr);
                }
                
                // prepare data for discount range, sorting etc filerting
                // sorted on product discount 
                $sortedProductDiscountListArr = array_values(array_filter(array_keys(utils::arraySort($dataArr1, array('productFeatureDiscount')))));
                if(count($sortedProductDiscountListArr)>0 && $sortedProductDiscountListArr!=false){
                    $minDiscountValue = min($sortedProductDiscountListArr);
                    $maxDiscountValue = max($sortedProductDiscountListArr);
                    $resultArr = commonfunction :: preparedProductDiscountFilterationData($minDiscountValue, $maxDiscountValue);
                    // final dumping
                    $rsltJsonArr['allProductDiscountDetailsArr']['sortingList'] = $resultArr['sortingList'];
                    $rsltJsonArr['allProductDiscountDetailsArr']['rangeList'] = $resultArr['rangeList'];
                }
                
            }
            
            $rspDetails["filterOperationTypeList"] = $rsltJsonArr;
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

    
    // CJ defined this function 2016-06-16
    public function getProductTypeProductCategoryAllProductDetails($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            
            $rsltJsonArr = array();
            $rsltJsonArr['allShopStoresDetailsArr'] = false;
            $rsltJsonArr['allProductPriceDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductPriceDetailsArr']['rangeList'] = false;
            $rsltJsonArr['allProductSizeDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductSizeDetailsArr']['rangeList'] = false;
            $rsltJsonArr['allProductDiscountDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductDiscountDetailsArr']['rangeList'] = false;
            $rsltJsonArr['requestedProductCategoryTitle'] = false;
            $rsltJsonArr['allProductDetailsList'] = false;
            
            // initial varaible declare
            $gProductPriceFilterArr = array();
            $gProductPriceSortOn = '';
            $gProductDiscountFilterArr = array();
            $gProductDiscountSortOn = '';
            $gcountry_id = $dkParamDataArr['country_ids'];
            $gcity_id = $dkParamDataArr['city_ids'];
            $garea_id = $dkParamDataArr['area_ids'];
            $gproductTypeId = $dkParamDataArr['product_typesids'];
            $gproductTypeProductCategoryId = $dkParamDataArr['product_categoryids'];
            $gShopstoreId = $dkParamDataArr['shopstoreids'];
            $gProductSizeFilterArr = explode(",", $dkParamDataArr['product_size_filter']);

            // price filter
            if($dkParamDataArr['product_price_filter']!= '' && $dkParamDataArr['product_price_filter']!= false){
                $tempPriceFilterArr = explode(",", $dkParamDataArr['product_price_filter']);
                if (($removedValue = array_search('lowtohigh', $tempPriceFilterArr)) !== false) {
                    $gProductPriceSortOn = "lowtohigh";
                    unset($tempPriceFilterArr[$removedValue]);
                } else if (($removedValue = array_search('hightolow', $tempPriceFilterArr)) !== false) {
                    $gProductPriceSortOn = "hightolow";
                    unset($tempPriceFilterArr[$removedValue]);
                }
                $gProductPriceFilterArr = array_values($tempPriceFilterArr);
            }

            // discount filter
            if($dkParamDataArr['product_discount_filter']!='' && $dkParamDataArr['product_discount_filter']!=false){
                $tempProductDiscountFilterArr = explode(",", $dkParamDataArr['product_discount_filter']);
                if(($removedValue = array_search('lowtohigh', $tempProductDiscountFilterArr)) !== false){
                    $gProductDiscountSortOn = "lowtohigh";
                    unset($tempProductDiscountFilterArr[$removedValue]);
                }else if (($removedValue = array_search('hightolow', $tempProductDiscountFilterArr))!==false){
                    $gProductDiscountSortOn = "hightolow";
                    unset($tempProductDiscountFilterArr[$removedValue]);
                }
                $gProductDiscountFilterArr = array_values($tempProductDiscountFilterArr);
            }
            
            // prepare param obj to get all product list
            $paramObj2 = array();
            $paramObj2['shop_storesids'] = $gShopstoreId;
            $paramObj2['product_typeids'] = $gproductTypeId;
            $paramObj2['product_categoryids'] = $gproductTypeProductCategoryId;
            if(count($gProductPriceFilterArr)>0 && $gProductPriceFilterArr!=false){
                $paramObj1['product_price_filter'] = $gProductPriceFilterArr;
            }
            if(count($gProductSizeFilterArr)>0 && $gProductSizeFilterArr!=false){
                $paramObj1['product_size_filter'] = $gProductSizeFilterArr;
            }
            if(count($gProductDiscountFilterArr)>0 && $gProductDiscountFilterArr!=false){
                $paramObj1['product_discount_filter'] = $gProductDiscountFilterArr;
            }
            if($gProductPriceSortOn!='' && $gProductPriceSortOn!=false){
                $paramObj1["price_".$gProductPriceSortOn] = 'Y';
            }
            if($gProductDiscountSortOn!='' && $gProductDiscountSortOn!=false){
                $paramObj1["discount_".$gProductDiscountSortOn] = 'Y';
            }
            $dataArr2 = ProductDao :: getProductTypeProductCategoryProductList($paramObj2);
            if(count($dataArr2)>0 && $dataArr2!=false){
                // prepare array to remove unused key value details from all product list
                $removeUnusedKeyValueDataArr = array(
                    "productTypeTitleInCaps"=>"0", "shopStoreLabel"=>"0", "shopstore_mobile"=>"0", 
                    "shopstore_logofile"=>"0", "shopstore_mobile"=>"0", "isProductImageFileShowCase"=>"0", 
                    "countryId"=>"0", "cityId"=>"0", "cityName"=>"0", "areaId"=>"0"
                );
                $allProductDetailsList = utils :: removeJsonKeyAndValuesFromArrayOfJsonArray($dataArr2, $removeUnusedKeyValueDataArr, 'keyname');
                if(count($allProductDetailsList)>0 && $allProductDetailsList!=false){
                    $rsltJsonArr['requestedProductCategoryTitle'] = $allProductDetailsList[0]['productTypeProductCategoryTitle'];
                    $rsltJsonArr['allProductDetailsList'] = $allProductDetailsList;
                }
            }
            
        }
        
        $rspDetails["productTypeDetails"] = $rsltJsonArr;
        ComponentsJson::GenerateJsonAndSend($rspDetails);
        
    }

    // CJ defined this function 2016-06-06
    public function getProductTypeProductCategoryProductDetails($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // initial variable declare
            $gShopStoreId = $dkParamDataArr['store_ids'];
            $gproductTypeId = $dkParamDataArr['product_typesids'];
            $gproductTypeProductCategoryId = $dkParamDataArr['product_categoryids'];
            $gproductTypeProductCategoryProductId = $dkParamDataArr['product_ids'];
            $gproductTypeProductCategoryProductFeatureId = $dkParamDataArr['product_featureids'];
            // checking given shopstore id exists or not 
            $retShopStoreDetailsArr = ShopStoreDao::getShopStoresList($gShopStoreId, '');
            if(count($retShopStoreDetailsArr)>0 && $retShopStoreDetailsArr!=false){
                $isShopStoreServedOtherProducts = true;
                $storeServedOtherProductsNames = '';
                $storeServedOtherProductsDetails = array();
                $storeDeliveryAreaNamesStr = '';
                $storeDeliveryLocationDetailsArr = array();
                $productImagesDetailsArr = false;
                $productTypeIconStr = '';
                $isShowProductCommentBox = false;
                // fetching requested product details
                $allProductDetailsArr = array();
                $applyWhereConditionArr = array();
                $applyWhereConditionArr['shop_storesids'] = $gShopStoreId;
                $applyWhereConditionArr['product_typeids'] = $gproductTypeId;
                $applyWhereConditionArr['product_categoryids'] = $gproductTypeProductCategoryId;
                $applyWhereConditionArr['product_listids'] = $gproductTypeProductCategoryProductId;
                $retProductDetailsArr = ProductDao :: getProductTypeProductCategoryProductList($applyWhereConditionArr);
                if(count($retProductDetailsArr) > 0 && $retProductDetailsArr != false) {
                    // detect product type is cake, icecream, chips, drinks etc, bcoz to show product icon at ui screen
                    $productTypeTitle = strtolower($retProductDetailsArr[0]['productTypeTitle']);
                    if($productTypeTitle=='cakes'){
                        $productTypeIconStr = "fa fa-birthday-cake";
                        $isShowProductCommentBox = true;
                    }else if($productTypeTitle=='ice cream'){
                        $productTypeIconStr = "fa fa-birthday-cake";
                        $isShowProductCommentBox = false;
                    }
                    array_push($storeServedOtherProductsDetails, 
                        array(
                            "productTypeId" => $retProductDetailsArr[0]['productTypeId'],
                            "productTypeTitle" => ucwords($productTypeTitle),
                            "productIcon" => $productTypeIconStr,
                            "shopStoreId" => $gShopStoreId
                        )
                    );
                    // final merging product details 
                    $allProductDetailsArr = utils::array_merge_common_elements(
                        $retProductDetailsArr, array(array("productFeatureId" => $gproductTypeProductCategoryProductFeatureId)), array("productFeatureId"), array(), array("isRequestedProductFeaturesDetailsMatched" => "Y"), array("isRequestedProductFeaturesDetailsMatched" => "N")
                    );

                    // fetch product images details of requested product list id ka
                    $retProductImagesDetailsArr = ProductDao::getProductImagesDetails($gproductTypeProductCategoryProductId);
                    if (count($retProductImagesDetailsArr) > 0 && $retProductImagesDetailsArr != false) {
                        $productImagesDetailsArr = $retProductImagesDetailsArr;
                    }

                    // fetch given shopStores delivery location facility details using, store_id
                    $shopStoresProductDeliveryFacilityParam = array();
                    $shopStoresProductDeliveryFacilityParam['shop_storesids'] = $gShopStoreId;
                    $shopStoresProductDeliveryFacilityParam['groupby_area_ids'] = 'Y';
                    $retShopStoresDeliveryLocationFacilityDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($shopStoresProductDeliveryFacilityParam);
                    if(count($retShopStoresDeliveryLocationFacilityDetailsArr) > 0 && $retShopStoresDeliveryLocationFacilityDetailsArr != false) {
                        // prepare array to remove unused key details from delivery locations
                        $removeJsonKeyFromEachInputJsonArr = array(
                            "shopStoreId" => "0", "countryId" => "0", "countryName" => "0", "cityId" => "0",
                            "cityName" => "0", "isPreorderAccept" => "0", "takeAwayOrderAccept" => "0", "cashOnDeliveryAccept" => "0",
                            "isOnlinePaymentAccept" => "0", "isHomeDeliveryAccept" => "0", "orderDeliveryOpenTime" => "0", "orderDeliveryCloseTime" => "0"
                        );
                        $storeDeliveryLocationDetailsArr = utils :: removeJsonKeyAndValuesFromArrayOfJsonArray($retShopStoresDeliveryLocationFacilityDetailsArr, $removeJsonKeyFromEachInputJsonArr, 'keyname');
                        if (count($storeDeliveryLocationDetailsArr) > 0 && $storeDeliveryLocationDetailsArr != false) {
                            $storeDeliveryAreaNamesStr = implode(", ", array_keys(utils::arraySort($storeDeliveryLocationDetailsArr, array("areaName"))));
                        }
                        // fetch other product type details of given shoptStores affilatted
                        // sorted on country city area affiliaton ids
                        $allCountryCityAreaAffiliatonIdsStr = implode(",", array_keys(utils::arraySort($retShopStoresDeliveryLocationFacilityDetailsArr, array("countryCityAreaAffiliationId"))));
                        $retShopStoresAffiliatedToOthersProductTypeDetailsArrr = LocationDao :: getAreaBasedConductProductTypeShopStoreDetails($allCountryCityAreaAffiliatonIdsStr, '', $gproductTypeId, $gShopStoreId);
                        if($retShopStoresAffiliatedToOthersProductTypeDetailsArrr != false && count($retShopStoresAffiliatedToOthersProductTypeDetailsArrr) > 0) {
                            $sortedOnProductTypeDetailsShopStoresAffiliatedArr = utils::arraySort($retShopStoresAffiliatedToOthersProductTypeDetailsArrr, array("productTypeTitle"));
                            if(count($sortedOnProductTypeDetailsShopStoresAffiliatedArr) > 0 && $sortedOnProductTypeDetailsShopStoresAffiliatedArr != false) {
                                $storeServedOtherProductsNames = implode(",", array_keys($sortedOnProductTypeDetailsShopStoresAffiliatedArr));
                                // iterate each product type details
                                foreach ($sortedOnProductTypeDetailsShopStoresAffiliatedArr as $eachServedOtherProductTypeTitle => $servedOtherProductTypeDetailsArr) {
                                    $productIcon = 'fa fa-birthday-cake';
                                    if(strtolower($eachServedOtherProductTypeTitle)=="cakes"){
                                        $productIcon = 'fa fa-birthday-cake';
                                    }
                                    if(strtolower($eachServedOtherProductTypeTitle)=="ice cream"){
                                        $productIcon = 'fa fa-birthday-cake';
                                    }
                                    array_push($storeServedOtherProductsDetails, 
                                        array(
                                            "productTypeId" => $servedOtherProductTypeDetailsArr[0]['productTypeId'],
                                            "productTypeTitle" => $eachServedOtherProductTypeTitle,
                                            "productIcon" => $productIcon,
                                            "shopStoreId" => $servedOtherProductTypeDetailsArr[0]['shopStoreId'],
                                            "shopStoreTitle" => $servedOtherProductTypeDetailsArr[0]['shopStoreTitle']
                                        )
                                    );
                                }
                            }
                        }
                    }
                }
                // finally checking
                if(count($allProductDetailsArr)>0 && $allProductDetailsArr!=false && $storeDeliveryAreaNamesStr!=''){
                    $rsltJsonArr = array();
                    $rsltJsonArr['isShopStoreServedOtherProducts'] = $isShopStoreServedOtherProducts;
                    $rsltJsonArr['storeServedOtherProductsNames'] = $storeServedOtherProductsNames;
                    $rsltJsonArr['storeServedOtherProductsDetails'] = $storeServedOtherProductsDetails;
                    $rsltJsonArr['storeDeliveryArea'] = $storeDeliveryAreaNamesStr;
                    $rsltJsonArr['isShowProductCommentBox'] = $isShowProductCommentBox;
                    $rsltJsonArr['productTypeIconStr'] = $productTypeIconStr;
                    $rsltJsonArr['productDetails'] = $allProductDetailsArr;
                    $rsltJsonArr['productImagesDetails'] = $productImagesDetailsArr;
                    $rspDetails["viewProductDetails"] = $rsltJsonArr;
                }
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

    // CJ defined this action 2016-06-06
    public function getProductTypeProductCategoryProductDescriptionDetails($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gproductListId = $dkParamDataArr['product_ids'];
            // fetch product description details
            $retProductDescriptionDetails = ProductDao::getProductDescriptionDetails($gproductListId);
            if(count($retProductDescriptionDetails) > 0 && $retProductDescriptionDetails != false) {
                $productDescriptionDetailsArr = array();
                // iterate each product description details
                for($eachProductDescriptionDetailsArrIndex = 0; $eachProductDescriptionDetailsArrIndex < count($retProductDescriptionDetails); $eachProductDescriptionDetailsArrIndex++) {
                    $productDescriptionTitle = $retProductDescriptionDetails[$eachProductDescriptionDetailsArrIndex]['productDescriptionTitle'];
                    $productContentExplodedOnDoubleHashOptr = explode("##", $retProductDescriptionDetails[$eachProductDescriptionDetailsArrIndex]['productDescription']);
                    array_push($productDescriptionDetailsArr, 
                        array(
                            "descriptionTitle" => $productDescriptionTitle,
                            "descriptionPointsArr" => $productContentExplodedOnDoubleHashOptr
                        )
                    );
                }
                $rspDetails["isProductDescriptionDetailsFound"] = true;
                $rspDetails["descriptionDetailsArr"] = $productDescriptionDetailsArr;
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

}
