<?php

/**
* Description of ShopStoreServicesV1
* @author CJ defined this service 2016-06-24
*/

class ShopStoreServicesV1 implements IShopStoreServicesV1{
    
    // CJ defined this action 2016-06-24
    public function getCShopStoreSummaryInfo($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['shopstoreInfo'] = array();
            $rsltJsonArr['totalCountDeliveryArea'] = '';
            $rsltJsonArr['totalCountDessertsType'] = '';
            $rsltJsonArr['customersReviewedRatingMsgStr'] = 'No any customer(s) reviewed yet !';
            $rsltJsonArr['isRatingReviewBasedInfoFound'] = false;
            $rsltJsonArr['ratingReviewBasedInfo'] = '';
            $rsltJsonArr['totalCountAllDessertsTypeProduct'] = 0;
            $rsltJsonArr['allDessertsSummaryInfo'] = false;
            // initial variable declare here
            $gshopstore_id = $dkParamDataArr['shopstoreids'];
            $isShopStoreMenuSummaryInfoFound = 'N';
            // prepare param obj to get shopstore menu summary info
            $paramObj1 = array();
            $paramObj1['shop_storesids'] = $gshopstore_id;
            // fetch all product type details
            $retAllProductTypeDetailsArr = ProductDao :: getProductTypeProductCategoryProductList($paramObj1);
            if(count($retAllProductTypeDetailsArr)>0 && $retAllProductTypeDetailsArr!=false){
                // sorted on product type
                $sortedOnProductTypeDetailsArr = utils::arraySort($retAllProductTypeDetailsArr, array("productTypeId"));
                if(count($sortedOnProductTypeDetailsArr)>0 && $sortedOnProductTypeDetailsArr!=false){
                    $isShopStoreMenuSummaryInfoFound = 'Y'; 
                    $rsltJsonArr['totalCountDessertsType'] = count($sortedOnProductTypeDetailsArr);
                    $rsltJsonArr['allDessertsSummaryInfo'] = array();
                    // iterate each product type
                    foreach($sortedOnProductTypeDetailsArr as $eachProductTypeId=>$allProductDetailsAr){
                        $eachProductTypeDetailsArr =  array();
                        $eachProductTypeDetailsArr['productTypeId'] = $eachProductTypeId;
                        $eachProductTypeDetailsArr['productTypeTitle'] = $allProductDetailsAr[0]['productTypeTitleInCaps'];
                        $eachProductTypeDetailsArr['shopStoreId'] = $gshopstore_id;
                        $eachProductTypeDetailsArr['shopStoreTitle'] = $allProductDetailsAr[0]['shopStoreTitle'];
                        $eachProductTypeDetailsArr['allProductCount'] = count($allProductDetailsAr);
                        $productIcon = 'fa fa-birthday-cake';
                        if(strtolower($eachProductTypeDetailsArr['productTypeTitle'])=='cakes'){
                            $productIcon = 'fa fa-birthday-cake';
                        }
                        if(strtolower($eachProductTypeDetailsArr['productTypeTitle'])=='ice cream'){
                            $productIcon = 'fa fa-birthday-cake';
                        }
                        $eachProductTypeDetailsArr['productIcon'] = $productIcon;
                        array_push($rsltJsonArr['allDessertsSummaryInfo'], $eachProductTypeDetailsArr);
                        $rsltJsonArr['totalCountAllDessertsTypeProduct'] = $rsltJsonArr['totalCountAllDessertsTypeProduct'] + count($allProductDetailsAr);
                    }
                }
            }

            // prepare param obj shopstore info
            $retShopStoreInfoDetailsArr = ShopStoreDao::getShopStoresList($gshopstore_id, '');
            if(count($retShopStoreInfoDetailsArr)>0 && $retShopStoreInfoDetailsArr!=false){
                $rsltJsonArr['shopstoreInfo'] = $retShopStoreInfoDetailsArr[0];
            }

            // prepare param obj to get shopstore delivery location details
            $shopStoreProductDeliveryParamObj = array();
            $shopStoreProductDeliveryParamObj['shop_storesids'] = $gshopstore_id;
            $retShopStoreDeliveryLocationDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($shopStoreProductDeliveryParamObj);
            if(count($retShopStoreDeliveryLocationDetailsArr)>0 && $retShopStoreDeliveryLocationDetailsArr!=false){
                $rsltJsonArr['totalCountDeliveryArea'] = count($retShopStoreDeliveryLocationDetailsArr);
            }

            // prepare data to get total rating by user(s) about shopstores
            $retRatingShopStoresDetailsArr = RatingReviewDao::getTotalRatingAboutShopStores($gshopstore_id);
            if(count($retRatingShopStoresDetailsArr)>0 && $retRatingShopStoresDetailsArr!=false){
                $rsltJsonArr['isRatingReviewBasedInfoFound'] = true;
                $rsltJsonArr['customersReviewedRatingMsgStr'] = $retRatingShopStoresDetailsArr[0]['totalUserRatingAbtProduct'].' customer(s) reviewed & ratings';
            }

            // prepare data to get max avg rating about shopstores based 
            // on product quality, taste, price,delivery etc
            $retMaxAvgRatingShopStoresDetailsArr = RatingReviewDao::getMaxRatingAboutShopStore($gshopstore_id);
            if(count($retMaxAvgRatingShopStoresDetailsArr)>0 && $retMaxAvgRatingShopStoresDetailsArr!=false){
                $sortedOnRQuestionAnswMaxPointsArr = utils::arraySort($retMaxAvgRatingShopStoresDetailsArr, array("questionId", "givenMaxAnswerPoints"));
                if(count($sortedOnRQuestionAnswMaxPointsArr)>0 && $sortedOnRQuestionAnswMaxPointsArr!=false){
                    $rsltJsonArr['ratingReviewBasedInfo'] = array();
                    //iterate each question
                    foreach($sortedOnRQuestionAnswMaxPointsArr as $eachQuestionId=>$allGivenAnsweredMaxPointsDetilsArr){
                        $maxRating = max(array_keys($allGivenAnsweredMaxPointsDetilsArr));
                        array_push($rsltJsonArr['ratingReviewBasedInfo'], 
                            array(
                                "ratingQuestionTitle"=>strtoupper($allGivenAnsweredMaxPointsDetilsArr[$maxRating][0]['questionTitle']),
                                "maxRating"=>$maxRating
                            )
                        );
                    }
                }
            }
            if($isShopStoreMenuSummaryInfoFound=='Y'){
                $rspDetails = $rsltJsonArr;
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

    // CJ defined this action 2016-06-24
    public function getCShopStoreProductTypeProductCategoryAllProductDetails($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultedSelectedProductTypeTitle'] = '';
            $rsltJsonArr['defaultSelectProductCategoryTitle'] = '';
            $rsltJsonArr['defaultSelectProductCategoryValue'] = '';
            $rsltJsonArr['productCategoryList'] = false;
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
            $gproductTypeId = $dkParamDataArr['product_typesids'];
            $gproductTypeProductCategoryId = $dkParamDataArr['product_categoryids'];
            $gShopstoreId = $dkParamDataArr['shopstoreids'];
            $gProductSizeFilterArr = explode(",", $dkParamDataArr['product_size_filter']);

            if($dkParamDataArr['product_price_filter']!= '' 
                && $dkParamDataArr['product_price_filter']!= false){
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

            // prepare param obj to get product type  of given shopstore
            $paramObj1 = array();
            $paramObj1['shop_storesids'] = $gShopstoreId;
            $paramObj1['product_typeids'] = $gproductTypeId;
            // fetch product type details
            $retProductTypeDetailsArr = ProductDao :: getProductTypeProductCategoryProductList($paramObj1);
            if(count($retProductTypeDetailsArr)>0 && $retProductTypeDetailsArr!=false){
                // sort on product category ids
                $sortedOnProductCategoryArr = utils::arraySort($retProductTypeDetailsArr, array("productTypeProductCategoryId"));
                if(count($sortedOnProductCategoryArr)>0 && $sortedOnProductCategoryArr!=false){
                    $productTypeAllProductCategoryWiseFilterDetailsArr = array();
                    // iterate each product category 
                    foreach($sortedOnProductCategoryArr as $eachProductCategoryId=>$productCategoryDetailsArr){
                        $isRequestedProductCategoryMatched = 'N';
                        if($gproductTypeProductCategoryId==false || $gproductTypeProductCategoryId==null
                            || $gproductTypeProductCategoryId==''){
                            $gproductTypeProductCategoryId = $eachProductCategoryId;
                        }
                        if($eachProductCategoryId==$gproductTypeProductCategoryId){
                            $isRequestedProductCategoryMatched = 'Y';
                            $rsltJsonArr['defaultedSelectedProductTypeTitle'] = $productCategoryDetailsArr[0]['productTypeTitle'];
                            $rsltJsonArr['defaultSelectProductCategoryTitle'] = strtoupper($productCategoryDetailsArr[0]['productTypeProductCategoryTitle']);
                            $rsltJsonArr['defaultSelectProductCategoryValue'] = $gproductTypeProductCategoryId;
                        }
                        // prepare data for product category wise filtering 
                        array_push($productTypeAllProductCategoryWiseFilterDetailsArr, 
                            array(
                                "shopStoreId"=>$gShopstoreId,
                                "shopStoreTitle"=>$productCategoryDetailsArr[0]['shopStoreTitle'],
                                "productTypeId"=>$gproductTypeId,
                                "productTypeTitle"=>$productCategoryDetailsArr[0]['productTypeTitle'],
                                "productTypeProductCategoryId"=>$eachProductCategoryId,
                                "productTypeCategoryTitle"=>strtoupper($productCategoryDetailsArr[0]['productTypeProductCategoryTitle']),
                                "isRequestedProductCategoryMatched"=>$isRequestedProductCategoryMatched,
                                "totalProductCount"=>count($productCategoryDetailsArr)
                            )
                        );

                        if($isRequestedProductCategoryMatched=='Y'){
                            // prepare data for price range, sorting etc filerting
                            // sorted on online product price 
                            $retSortedPriceRangeListArr = utils::arraySort($productCategoryDetailsArr, array('productFeatureOnlineSellingPrice'));
                            if(count($retSortedPriceRangeListArr)>0 && $retSortedPriceRangeListArr!=false){   
                                $minPriceValue = min(array_keys($retSortedPriceRangeListArr));
                                $maxPriceValue = max(array_keys($retSortedPriceRangeListArr));
                                $resultArr = commonfunction :: preparedProductPriceFilterationData($minPriceValue, $maxPriceValue, $gProductPriceFilterArr, $gProductPriceSortOn);
                                $rsltJsonArr['allProductPriceDetailsArr']['sortingList'] = $resultArr['sortingList'];
                                $rsltJsonArr['allProductPriceDetailsArr']['rangeList'] = $resultArr['rangeList'];
                            }
                            // prepare data for size range
                            $retSortedOnProductSizeArr = array_keys(utils::arraySort($productCategoryDetailsArr, array("productFeatureDisplayMeasurementType")));
                            $isProductSizeArrSorted = sort($retSortedOnProductSizeArr);
                            if($isProductSizeArrSorted==true && count($retSortedOnProductSizeArr)>0 && $retSortedOnProductSizeArr!=false){
                                $rsltJsonArr['allProductSizeDetailsArr']['rangeList'] = commonfunction :: preparedProductSizeFilterationData($retSortedOnProductSizeArr, $gProductSizeFilterArr);
                            }
                            // prepare data for discount range, sorting etc filerting
                            // sorted on product discount 
                            $sortedProductDiscountListArr = array_values(array_filter(array_keys(utils::arraySort($productCategoryDetailsArr, array('productFeatureDiscount')))));
                            if(count($sortedProductDiscountListArr)>0 && $sortedProductDiscountListArr!=false){
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
            $paramObj2['shop_storesids'] = $gShopstoreId;
            $paramObj2['product_typeids'] = $gproductTypeId;
            $paramObj2['product_categoryids'] = $gproductTypeProductCategoryId;
            if(count($gProductPriceFilterArr)>0 && $gProductPriceFilterArr!=false){
                $paramObj2['product_price_filter'] = $gProductPriceFilterArr;
            }
            if(count($gProductSizeFilterArr)>0 && $gProductSizeFilterArr!=false){
                $paramObj2['product_size_filter'] = $gProductSizeFilterArr;
            }
            if(count($gProductDiscountFilterArr)>0 && $gProductDiscountFilterArr!=false){
                $paramObj2['product_discount_filter'] = $gProductDiscountFilterArr;
            }
            if($gProductPriceSortOn!='' && $gProductPriceSortOn!=false){
                $paramObj2['price_'.$gProductPriceSortOn] = 'Y';
            }
            if($gProductDiscountSortOn!='' && $gProductDiscountSortOn!=false){
                $paramObj2['discount_'.$gProductDiscountSortOn] = 'Y';
            }

            // fetch product list
            $productTypeProductCategoryAllProductList = false;
            $retShopStoresProductTypeProductCategoryProductListArr = ProductDao :: getProductTypeProductCategoryProductList($paramObj2);
            if(count($retShopStoresProductTypeProductCategoryProductListArr)>0 && $retShopStoresProductTypeProductCategoryProductListArr!=false){
                // prepare array to remove unused key details from all product list
                $removeJsonKeyFromEachInputJsonArr = array(
                    "productTypeTitleInCaps"=>"0", "shopStoreLabel"=>"0", "shopstore_mobile"=>"0", "shopstore_logofile"=>"0", 
                    "shopstore_mobile"=>"0", "productListId11"=>"0", "shopStoreId11"=>"0", "productFeatureMeasurementOnlyNos"=>"0",
                    "isProductImageFileShowCase"=>"0", "countryId"=>"0", "cityId"=>"0", "areaId"=>"0", "areaTitle"=>"0" 
                );
                $productTypeProductCategoryAllProductList = utils :: removeJsonKeyAndValuesFromArrayOfJsonArray($retShopStoresProductTypeProductCategoryProductListArr, $removeJsonKeyFromEachInputJsonArr, 'keyname');
                if(count($productTypeProductCategoryAllProductList)>0 && $productTypeProductCategoryAllProductList!=false){
                    $rsltJsonArr['allProductDetailsList'] = $productTypeProductCategoryAllProductList;
                }
            }
            $rspDetails["productTypeDetails"] = $rsltJsonArr;
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

    // CJ defined this action 2016-07-18
    public function getCshopstoreWorkingstyleDetails($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gshopstore_id = $dkParamDataArr['shopstoreids'];
            // fetch store working style details
            $retShopstoreWorkingstyleDetailsArr = ShopStoreDao :: getShopstoreWorkingstyleDetails($gshopstore_id);
            if(count($retShopstoreWorkingstyleDetailsArr)>0 && $retShopstoreWorkingstyleDetailsArr!=false){
                $rspDetails["shopstoreWorkingStyleDetails"] = $retShopstoreWorkingstyleDetailsArr;
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

    // CJ defined this action 2016-07-18
    public function getCshopstoreProductdeliveryAreaInfo($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // prepare param obj to get shopstore delivery location details
            $shopStoreProductDeliveryAreaParamObj = array();
            $shopStoreProductDeliveryAreaParamObj['shop_storesids'] = $dkParamDataArr['shopstoreids'];
            // fetch product delivery area details
            $retShopStoreDeliveryLocationDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($shopStoreProductDeliveryAreaParamObj);
            if(count($retShopStoreDeliveryLocationDetailsArr)>0 && $retShopStoreDeliveryLocationDetailsArr!=false){
                $rspDetails['cShopstoreProductDeliveryAreaDetails'] = $retShopStoreDeliveryLocationDetailsArr;
                $rspDetails['cShopstoreProductDeliveryAreaNames'] = implode(", ", array_keys(utils::arraySort($retShopStoreDeliveryLocationDetailsArr, array("areaName"))));
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }

}
