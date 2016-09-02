<?php

/**
 * Description of ProductServicesV1
 * @author CJ defined this service 2016-06-06
 */
class ProductServicesV1 implements IProductServicesV1 {

    // CJ defined this action 2016-06-06
    public function getDeliveryAreaBasedProductTypeList($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectedAreaBasedProductTypeDetails'] = false;
            $rsltJsonArr['allProductTypeList'] = false;
            // initial variable declare
            $gcountry_ids = $dkParamDataArr['country_ids'];
            $gcity_ids = $dkParamDataArr['city_ids'];
            $garea_ids = $dkParamDataArr['area_ids'];
            $gproducttype_ids = $dkParamDataArr['producttype_ids'];
            // prepare param obj
            $storeDeliveryParamObj = array();
            $storeDeliveryParamObj['country_ids'] = $gcountry_ids;
            $storeDeliveryParamObj['city_ids'] = $gcity_ids;
            $storeDeliveryParamObj['area_ids'] = $garea_ids;
            $storeDeliveryLocationDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($storeDeliveryParamObj);
            if(count($storeDeliveryLocationDetailsArr)>0 && $storeDeliveryLocationDetailsArr!=false){
                // sorted on country city area affiliaton ids
                $sortedOnCCAIdArr = utils::arraySort($storeDeliveryLocationDetailsArr, array("countryCityAreaAffiliationId"));
                if($sortedOnCCAIdArr!=false && count($sortedOnCCAIdArr)>0){
                    // fetch all countrycityareaids keys in arr and converted into string format
                    $allCCAIdsStr = implode(",", array_keys($sortedOnCCAIdArr));
                    // fetch all area based ka product type ka shopstore details
                    $retAreaBasedConductProductTypeShopStoreDetailsArr = LocationDao::getAreaBasedConductProductTypeShopStoreDetails($allCCAIdsStr);
                    if(count($retAreaBasedConductProductTypeShopStoreDetailsArr)>0 && $retAreaBasedConductProductTypeShopStoreDetailsArr!=false){
                        // sorted on product type details
                        $sortedOnProductTypeDetailsArr = utils::arraySort($retAreaBasedConductProductTypeShopStoreDetailsArr, array("productTypeId"), array("productTypeId" => "productTypeTitle"));
                        if(count($sortedOnProductTypeDetailsArr)>0 && $sortedOnProductTypeDetailsArr!=false){
                            $finalAllProductTypeListArr = array();
                            // iterate each product type info details
                            foreach($sortedOnProductTypeDetailsArr as $eachProductTypeIdTitle=>$eachProductTypeAllProductDetailsArr){
                                $productTokens = '';
                                $productIcon = '';
                                $isRequestedProductTypeIdMatched = 'N';
                                $eachProductTypeIdTitleExplodedOnHash = explode("##", $eachProductTypeIdTitle);
                                // prepare array
                                $eachProductTypeDetailsArr = array();
                                $eachProductTypeDetailsArr['productTypeId'] = $eachProductTypeIdTitleExplodedOnHash[0];
                                $eachProductTypeDetailsArr['productTypeTitle'] = $eachProductTypeIdTitleExplodedOnHash[1];
                                if(strtolower($eachProductTypeIdTitleExplodedOnHash[1])=='cakes'){
                                    $productTokens = 'CAKES,cakes,'.strtolower($eachProductTypeIdTitleExplodedOnHash[0]).",".$eachProductTypeIdTitleExplodedOnHash[0];
                                    $productTokens.=", ".strtoupper($eachProductTypeIdTitleExplodedOnHash[0]);
                                    $productIcon = 'fa fa-birthday-cake';
                                }
                                if(strtolower($eachProductTypeIdTitleExplodedOnHash[1])=='ice cream'){
                                    $productTokens = 'ICE CREAM, ice cream,' . strtolower($eachProductTypeIdTitleExplodedOnHash[0]) . "," . $eachProductTypeIdTitleExplodedOnHash[0];
                                    $productTokens.=", " . strtoupper($eachProductTypeIdTitleExplodedOnHash[0]);
                                    $productIcon = 'fa fa-birthday-cake';
                                }
                                if($eachProductTypeIdTitleExplodedOnHash[0]==$gproducttype_ids){
                                    $rsltJsonArr['defaultSelectedAreaBasedProductTypeDetails'] = array();
                                    $rsltJsonArr['defaultSelectedAreaBasedProductTypeDetails']['matchedProductTypeId'] = $eachProductTypeIdTitleExplodedOnHash[0];
                                    $rsltJsonArr['defaultSelectedAreaBasedProductTypeDetails']['matchedProductTypeTitle'] = $eachProductTypeIdTitleExplodedOnHash[1];
                                    $isRequestedProductTypeIdMatched = 'Y';
                                }
                                $eachProductTypeDetailsArr['productTokens'] = $productTokens;
                                $eachProductTypeDetailsArr['productIcon'] = $productIcon;
                                $eachProductTypeDetailsArr['isRequestedProductTypeIdMatched'] = $isRequestedProductTypeIdMatched;
                                if(count($eachProductTypeDetailsArr)>0 && $eachProductTypeDetailsArr!=false){
                                    array_push($finalAllProductTypeListArr, $eachProductTypeDetailsArr);
                                }
                            }
                            if($finalAllProductTypeListArr!=false && count($finalAllProductTypeListArr)>0){
                                $rsltJsonArr['allProductTypeList'] = $finalAllProductTypeListArr;
                            }
                        }
                    }
                }
            }
            if($rsltJsonArr['allProductTypeList']!=false && count($rsltJsonArr['allProductTypeList'])>0){
                $rspDetails["deliveryAreaBasedProductTypeDetails"] = $rsltJsonArr;
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

    // CJ defined this function 2016-06-16
    public function getProductTypeProductCategoryAllProductDetails($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectProductCategoryTitle'] = '';
            $rsltJsonArr['defaultSelectProductCategoryValue'] = '';
            $rsltJsonArr['productCategoryList'] = false;
            $rsltJsonArr['allShopStoresDetailsArr'] = false;
            $rsltJsonArr['allProductPriceDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductPriceDetailsArr']['rangeList'] = false;
            $rsltJsonArr['allProductSizeDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductSizeDetailsArr']['rangeList'] = false;
            $rsltJsonArr['allProductDiscountDetailsArr']['sortingList'] = false;
            $rsltJsonArr['allProductDiscountDetailsArr']['rangeList'] = false;
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

            // prepare param obj to get shopstore delivery location details
            $shopStoreProductDeliveryParamObj = array();
            $shopStoreProductDeliveryParamObj['country_ids'] = $gcountry_id;
            $shopStoreProductDeliveryParamObj['city_ids'] = $gcity_id;
            $shopStoreProductDeliveryParamObj['area_ids'] = $garea_id;
            $retShopStoreDeliveryLocationDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($shopStoreProductDeliveryParamObj);
            if(count($retShopStoreDeliveryLocationDetailsArr) > 0 && $retShopStoreDeliveryLocationDetailsArr != false) {
                // sorted on shops store ids bhai
                $sortedOnAllShopStoreDeliveyLocationFacilityDetailsArr = utils::arraySort($retShopStoreDeliveryLocationDetailsArr, array("shopStoreId"));
                // sorted on country city area affiliaton ids of shopstores bhai
                $sortedOnCountryCityAreaAffiliationDetailsArr = utils::arraySort($retShopStoreDeliveryLocationDetailsArr, array("countryCityAreaAffiliationId"));
                if($sortedOnCountryCityAreaAffiliationDetailsArr != false && count($sortedOnCountryCityAreaAffiliationDetailsArr) > 0) {
                    // extract all shopstore countrycityareaids keys in arr and converted into string format
                    $allCountryCityAreaAffiliatonIdsStr = implode(",", array_keys($sortedOnCountryCityAreaAffiliationDetailsArr));
                    // all shopstores ids
                    $allShopStoresIdsStr = implode(",", array_keys($sortedOnAllShopStoreDeliveyLocationFacilityDetailsArr));
                    // prepare param obj to get product type details
                    $paramObj1 = array();
                    $paramObj1['shop_storesids'] = $allShopStoresIdsStr;
                    $paramObj1['country_city_area_affiliationids'] = $allCountryCityAreaAffiliatonIdsStr;
                    $paramObj1['product_typeids'] = $gproductTypeId;
                    // fetch product type details
                    $retProductTypeDetailsArr = ProductDao :: getProductTypeProductCategoryProductList($paramObj1);
                    if(count($retProductTypeDetailsArr)>0 && $retProductTypeDetailsArr!=false){
                            // sort on product category ids
                            $sortedOnProductCategoryArr = utils::arraySort($retProductTypeDetailsArr, array("productTypeProductCategoryId"));
                            if (count($sortedOnProductCategoryArr) > 0 && $sortedOnProductCategoryArr != false) {
                                $productTypeAllProductCategoryWiseFilterDetailsArr = array();
                                // iterate each product category 
                                foreach ($sortedOnProductCategoryArr as $eachProductCategoryId => $productCategoryDetailsArr){
                                    $isRequestedProductCategoryMatched = 'N';
                                    if($gproductTypeProductCategoryId==false || $gproductTypeProductCategoryId==''
                                        || $gproductTypeProductCategoryId==null){
                                        $gproductTypeProductCategoryId = $eachProductCategoryId;
                                    }
                                    if($eachProductCategoryId==$gproductTypeProductCategoryId){
                                        $isRequestedProductCategoryMatched = 'Y';
                                        $rsltJsonArr['defaultedSelectedProductTypeTitle'] = $productCategoryDetailsArr[0]['productTypeTitle'];
                                        $rsltJsonArr['defaultedSelectedProductTypeValue'] = $productCategoryDetailsArr[0]['productTypeId'];
                                        $rsltJsonArr['defaultSelectProductCategoryTitle'] = strtoupper($productCategoryDetailsArr[0]['productTypeProductCategoryTitle']);
                                        $rsltJsonArr['defaultSelectProductCategoryValue'] = $gproductTypeProductCategoryId;
                                    }
                                    // prepare data for product category wise filtering 
                                    array_push($productTypeAllProductCategoryWiseFilterDetailsArr, 
                                        array(
                                            "productTypeId" => $gproductTypeId,
                                            "productTypeTitle" => $productCategoryDetailsArr[0]['productTypeProductCategoryTitle'],
                                            "productCategoryId" => $eachProductCategoryId,
                                            "productCategoryTitle" => strtoupper($productCategoryDetailsArr[0]['productTypeProductCategoryTitle']),
                                            "isRequestedProductCategoryMatched" => $isRequestedProductCategoryMatched,
                                            "totalProductCount" => count($productCategoryDetailsArr)
                                        )
                                    );

                                    if($isRequestedProductCategoryMatched=='Y'){
                                        // prepare data shopstore filering 
                                        // sort on shopstore ids
                                        $sortedOnShopStoresArr = utils::arraySort($productCategoryDetailsArr, array("shopStoreId"));
                                        $rsltJsonArr['allShopStoresDetailsArr'] = commonfunction :: preparedShopstoreFilterationData($sortedOnShopStoresArr, $gShopstoreId);

                                        // prepare data for price range, sorting etc filerting
                                        // sorted on online product price 
                                        $retSortedPriceRangeListArr = utils::arraySort($productCategoryDetailsArr, array('productFeatureOnlineSellingPrice'));
                                        if(count($retSortedPriceRangeListArr) > 0 && $retSortedPriceRangeListArr != false) {
                                            $minPriceValue = min(array_keys($retSortedPriceRangeListArr));
                                            $maxPriceValue = max(array_keys($retSortedPriceRangeListArr));
                                            $resultArr = commonfunction :: preparedProductPriceFilterationData($minPriceValue, $maxPriceValue, $gProductPriceFilterArr, $gProductPriceSortOn);
                                            $rsltJsonArr['allProductPriceDetailsArr']['sortingList'] = $resultArr['sortingList'];
                                            $rsltJsonArr['allProductPriceDetailsArr']['rangeList'] = $resultArr['rangeList'];
                                        }

                                        // prepare data for size range
                                        $retSortedOnProductSizeArr = array_keys(utils::arraySort($productCategoryDetailsArr, array("productFeatureDisplayMeasurementType")));
                                        $isProductSizeArrSorted = sort($retSortedOnProductSizeArr);
                                        if($isProductSizeArrSorted == true && count($retSortedOnProductSizeArr) > 0 && $retSortedOnProductSizeArr != false) {
                                            $rsltJsonArr['allProductSizeDetailsArr']['rangeList'] = commonfunction :: preparedProductSizeFilterationData($retSortedOnProductSizeArr, $gProductSizeFilterArr);
                                        }

                                        // prepare data for discount range, sorting etc filerting
                                        // sorted on product discount 
                                        $sortedProductDiscountListArr = array_values(array_filter(array_keys(utils::arraySort($productCategoryDetailsArr, array('productFeatureDiscount')))));
                                        if(count($sortedProductDiscountListArr)>0 && $sortedProductDiscountListArr != false) {
                                            $minDiscountValue = min($sortedProductDiscountListArr);
                                            $maxDiscountValue = max($sortedProductDiscountListArr);
                                            $resultArr = commonfunction :: preparedProductDiscountFilterationData($minDiscountValue, $maxDiscountValue, $gProductDiscountFilterArr, $gProductDiscountSortOn);
                                            // final dumping
                                            $rsltJsonArr['allProductDiscountDetailsArr']['sortingList'] = $resultArr['sortingList'];
                                            $rsltJsonArr['allProductDiscountDetailsArr']['rangeList'] = $resultArr['rangeList'];
                                        }
                                    }
                                }
                                $rsltJsonArr['productCategoryList'] = $productTypeAllProductCategoryWiseFilterDetailsArr;
                            }
                        }

                    // prepare param obj to get product list
                    $paramObj2 = array();
                    $paramObj2['shop_storesids'] = $allShopStoresIdsStr;
                    $paramObj2['country_city_area_affiliationids'] = $allCountryCityAreaAffiliatonIdsStr;
                    $paramObj2['product_typeids'] = $gproductTypeId;
                    if($gShopstoreId!='' && $gShopstoreId!=false && $gShopstoreId!=null){
                        $paramObj2['shop_storesids'] = $gShopstoreId;
                    }
                    if($gproductTypeProductCategoryId!='' && $gproductTypeProductCategoryId!=false 
                        && $gproductTypeProductCategoryId!=null){
                        $paramObj2['product_categoryids'] = $gproductTypeProductCategoryId;
                    }
                    if (count($gProductPriceFilterArr) > 0 && $gProductPriceFilterArr != false) {
                        $paramObj2['product_price_filter'] = $gProductPriceFilterArr;
                    }
                    if (count($gProductSizeFilterArr) > 0 && $gProductSizeFilterArr != false) {
                        $paramObj2['product_size_filter'] = $gProductSizeFilterArr;
                    }
                    if (count($gProductDiscountFilterArr) > 0 && $gProductDiscountFilterArr != false) {
                        $paramObj2['product_discount_filter'] = $gProductDiscountFilterArr;
                    }
                    if ($gProductPriceSortOn != '' && $gProductPriceSortOn != false) {
                        $paramObj2["price_" . $gProductPriceSortOn] = 'Y';
                    }
                    if ($gProductDiscountSortOn != '' && $gProductDiscountSortOn != false) {
                        $paramObj2["discount_" . $gProductDiscountSortOn] = 'Y';
                    }

                    // fetch product list
                    $productTypeProductCategoryAllProductList = false;
                    $retAllShopStoresProductTypeProductCategoryProductListArr = ProductDao :: getProductTypeProductCategoryProductList($paramObj2);
                    if(count($retAllShopStoresProductTypeProductCategoryProductListArr)>0 && $retAllShopStoresProductTypeProductCategoryProductListArr != false) {
                        // sort on product type id, product c$applyWhereConditionArrategory id
                        // preparing product list
                        $sortedOnProductTypeProductCategoryDetailsArr = utils::arraySort($retAllShopStoresProductTypeProductCategoryProductListArr, array("productTypeId", "productTypeProductCategoryId"));
                        if(count($sortedOnProductTypeProductCategoryDetailsArr) > 0 && $sortedOnProductTypeProductCategoryDetailsArr != false) {
                            // iterate each product type ids
                            foreach($sortedOnProductTypeProductCategoryDetailsArr as $eachProductTypeId => $productCategoryDetailsArr) {
                                // iterate each product type ka product category 
                                foreach($productCategoryDetailsArr as $eachProductCategoryId=>$productDetailsArr){
                                    if($gproductTypeProductCategoryId=='' || $gproductTypeProductCategoryId==null
                                        || $gproductTypeProductCategoryId==false){
                                        $gproductTypeProductCategoryId = $eachProductCategoryId;
                                    }
                                    if($eachProductCategoryId==$gproductTypeProductCategoryId){
                                        // prepare array to remove unused key details from all product list
                                        $removeJsonKeyFromEachInputJsonArr = array(
                                            "productTypeTitleInCaps" => "0", "shopStoreLabel" => "0", "shopstore_mobile" => "0", "shopstore_logofile" => "0",
                                            "shopstore_mobile" => "0", "productListId1" => "0", "shopStoreId1" => "0", "productFeatureMeasurementOnlyNos" => "0",
                                            "isProductImageFileShowCase" => "0", "countryId" => "0", "cityId" => "0", "areaId" => "0", "areaTitle" => "0"
                                        );
                                        $productTypeProductCategoryAllProductList = utils :: removeJsonKeyAndValuesFromArrayOfJsonArray($productDetailsArr, $removeJsonKeyFromEachInputJsonArr, 'keyname');
                                        break;
                                    }
                                }
                                if(count($productTypeProductCategoryAllProductList)>0 && $productTypeProductCategoryAllProductList!=false){
                                    $rsltJsonArr['allProductDetailsList'] = $productTypeProductCategoryAllProductList;
                                    break;
                                }
                            }
                        }
                    }
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
