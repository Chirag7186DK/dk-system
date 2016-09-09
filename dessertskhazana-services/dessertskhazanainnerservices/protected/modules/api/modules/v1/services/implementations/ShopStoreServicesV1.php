<?php

/**
* Description of ShopStoreServicesV1
* @author CJ defined this service 2016-06-24
*/

class ShopStoreServicesV1 implements IShopStoreServicesV1{
    
    // CJ defined this action 2016-09-09
    public function getDeliveryAreaBasedDessertTypeCStoreList($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // initial variable declare
            $gccaIds = $dkParamDataArr['ccaId'];
            $gcountry_ids = $paramJsonData['country_ids'];
            $gcity_ids = $paramJsonData['city_ids'];
            $garea_ids = $paramJsonData['area_ids'];
            $gproducttype_ids = $dkParamDataArr['product_typesids'];
            $allStoreInfoListArr = array();
            // fetch all store ids details who serving given desserts type in given delivery area
            $storesIdDetailsArr = LocationDao::getCCABasedConductDessertsTypeDetails($gccaIds, $gproducttype_ids, '', '', '');
            if(count($storesIdDetailsArr)>0 && $storesIdDetailsArr!=false){
                // iterate each stores id details 
                for($eachStoreIndx = 0; $eachStoreIndx<count($storesIdDetailsArr); $eachStoreIndx++){
                    $storeId = $storesIdDetailsArr[$eachStoreIndx]['shopStoreId'];
                    // fetching basic store info details
                    $storeBasicInfoDetailsArr = ShopStoreDao :: getShopStoresList($storeId, '');
                    if(count($storeBasicInfoDetailsArr)==1 && $storeBasicInfoDetailsArr!=false){
                        $eachStoreInfoData = array();
                        $eachStoreInfoData['shopStoreId'] = $storeId;
                        $eachStoreInfoData['shopStoreTitle'] = $storeBasicInfoDetailsArr[0]['shopStoreTitle'];
                        $eachStoreInfoData['shopStoreOrgLocation'] = 'Chinchwad';
                        $eachStoreInfoData['shopStoreLogoFile'] = '';
                        $eachStoreInfoData['lessOrderAmt'] = '';
                        $eachStoreInfoData['deliveryFee'] = '';
                        $eachStoreInfoData['deliveryTime'] = '';
                        $eachStoreInfoData['discountUpto'] = '';
                        $eachStoreInfoData['otherDessertsTypeServedStr'] = '';
                        $eachStoreInfoData['totalProduct'] = '';
                        $eachStoreInfoData['reviewedRatingStr'] = '';
                        // rating & review summary fetching of given storeid
                        $dataArr1 = RatingReviewDao::getTotalRatingAboutShopStores($storeId);
                        if(count($dataArr1)==1 && $dataArr1!=false){
                            $eachStoreInfoData['reviewedRatingStr'] = $dataArr1[0]['totalUserRatingAbtProduct'];
                        }
                        // fetching store delivery facility given location
                        $paramJson1 = array();
                        $paramJson1['shop_storesids'] = $storeId;
                        $paramJson1['country_ids'] = $gcountry_ids;
                        $paramJson1['city_ids'] = $gcity_ids;
                        $paramJson1['area_ids'] = $garea_ids;
                        $storeDeliveryFacilityDataArr = ShopStoreDao :: getShopStoreDeliveryLocationFacilityDetails($paramJson1);
                        if($storeDeliveryFacilityDataArr!=false && count($storeDeliveryFacilityDataArr)==1){
                            $eachStoreInfoData['lessOrderAmt'] = $storeDeliveryFacilityDataArr[0]['min_orderamount'];
                            $eachStoreInfoData['deliveryFee'] = $storeDeliveryFacilityDataArr[0]['deliveryfee'];
                            $eachStoreInfoData['deliveryTime'] = $storeDeliveryFacilityDataArr[0]['delivery_time'];
                        }
                        array_push($allStoreInfoListArr, $eachStoreInfoData);
                    }
                }
            }
        }
        return $rspDetails;
    }
    
    // CJ defined this action 2016-09-04
    public function getDeliveryAreaBasedCStoreConductDessertType($dkParamDataArr){
        $rspDetails = array();
        // checking requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails'] = false;
            $rsltJsonArr['allDessertsTypeList'] = false;
            // initial variable declare
            $gccaIds = $dkParamDataArr['ccaId'];
            $gstoreIds = $dkParamDataArr['shopstoreids'];
            $gproducttype_ids = $dkParamDataArr['product_typesids'];
            // fetch all desserts type details based on ccaIds store serving
            $ccaBasedConductDessertsTypeDetailsArr = LocationDao::getCCABasedConductDessertsTypeDetails($gccaIds, '', '', $gstoreIds, '');
            if(count($ccaBasedConductDessertsTypeDetailsArr)>0 && $ccaBasedConductDessertsTypeDetailsArr!=false){
                $allDessertsTypeListArr = array();
                // iterate each desserts type list
                for($eachIndex = 0; $eachIndex<count($ccaBasedConductDessertsTypeDetailsArr); $eachIndex++){
                    $productIcon = '';
                    $isRequestedDessertsTypeIdMatched = 'N';
                    $iteratedDessertsTypeListId = $ccaBasedConductDessertsTypeDetailsArr[$eachIndex]['productTypeId'];
                    $iteratedDessertsTypeTitle = $ccaBasedConductDessertsTypeDetailsArr[$eachIndex]['productTypeTitle'];
                    $storeId = $ccaBasedConductDessertsTypeDetailsArr[$eachIndex]['shopStoreId'];
                    $storeTitle = $ccaBasedConductDessertsTypeDetailsArr[$eachIndex]['shopStoreTitle'];
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
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails']['dessertsTypeId'] = $iteratedDessertsTypeListId;
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails']['dessertsTypeTitle'] = $iteratedDessertsTypeTitle;
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails']['shopStoreId'] = $storeId;
                        $rsltJsonArr['defaultSelectedAreaBasedDessertsTypeDetails']['shopStoreTitle'] = $storeTitle;
                    }
                    array_push($allDessertsTypeListArr, array(
                        "dessertsTypeId"=>$iteratedDessertsTypeListId,
                        "dessertsTypeTitle"=>$iteratedDessertsTypeTitle,
                        "dessertsIcon"=>$productIcon,
                        "shopStoreId"=>$storeId,
                        "shopStoreTitle"=>$storeTitle,
                        "isRequestedProductTypeIdMatched"=>$isRequestedDessertsTypeIdMatched
                    ));
                }
                $rsltJsonArr['allDessertsTypeList'] = $allDessertsTypeListArr;
                $rspDetails["deliveryAreaBasedDessertsTypeDetails"] = $rsltJsonArr;
            }
        }
        return $rspDetails;
    }
    
    // CJ defined this action 2016-06-24
    public function getCShopStoreSummaryInfo($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['shopstoreInfo'] = array();
        $rspDetails['customersReviewedRatingMsgStr'] = 'No any customer(s) reviewed yet !';
        $rspDetails['isRatingReviewBasedInfoFound'] = false;
        $rspDetails['ratingReviewBasedInfo'] = '';
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            
            // initial variable declare here
            $gshopstore_id = $dkParamDataArr['shopstoreids'];
            
            // fetch store basic info
            $dataArr1 = ShopStoreDao::getShopStoresList($gshopstore_id, '');
            if(count($dataArr1)==1 && $dataArr1!=false){
                $rspDetails['shopstoreInfo'] = $dataArr1[0];
            }

            // prepare data to get total rating & reviewed  by user(s) about store
            $dataArr2 = RatingReviewDao::getTotalRatingAboutShopStores($gshopstore_id);
            if(count($dataArr2)==1 && $dataArr2!=false){
                $rspDetails['isRatingReviewBasedInfoFound'] = true;
                $rspDetails['customersReviewedRatingMsgStr'] = $dataArr2[0]['totalUserRatingAbtProduct'].' customer(s) reviewed & ratings';
            }

            // prepare data to get max avg rating about shopstores based 
            // on product quality, taste, price,delivery etc
            $retMaxAvgRatingShopStoresDetailsArr = RatingReviewDao::getMaxRatingAboutShopStore($gshopstore_id);
            if(count($retMaxAvgRatingShopStoresDetailsArr)>0 && $retMaxAvgRatingShopStoresDetailsArr!=false){
                $sortedOnRQuestionAnswMaxPointsArr = utils::arraySort($retMaxAvgRatingShopStoresDetailsArr, array("questionId", "givenMaxAnswerPoints"));
                if(count($sortedOnRQuestionAnswMaxPointsArr)>0 && $sortedOnRQuestionAnswMaxPointsArr!=false){
                    $rspDetails['ratingReviewBasedInfo'] = array();
                    //iterate each question
                    foreach($sortedOnRQuestionAnswMaxPointsArr as $eachQuestionId=>$allGivenAnsweredMaxPointsDetilsArr){
                        $maxRating = max(array_keys($allGivenAnsweredMaxPointsDetilsArr));
                        array_push($rspDetails['ratingReviewBasedInfo'], 
                            array(
                                "ratingQuestionTitle"=>strtoupper($allGivenAnsweredMaxPointsDetilsArr[$maxRating][0]['questionTitle']),
                                "maxRating"=>$maxRating
                            )
                        );
                    }
                }
            }
        }
        return $rspDetails;
    }
   
    // CJ defined this action 2016-07-18
    public function getCshopstoreWorkingstyleDetails($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gshopstore_id = $dkParamDataArr['shopstoreids'];
            // fetch store working style details
            $dataArr1 = ShopStoreDao :: getShopstoreWorkingstyleDetails($gshopstore_id);
            if(count($dataArr1)>0 && $dataArr1!=false){
                $rspDetails["shopstoreWorkingStyleDetails"] = $dataArr1;
            }
        }
        return $rspDetails;
    }

}
