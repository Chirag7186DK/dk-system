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
            $gcountry_ids = $dkParamDataArr['country_ids'];
            $gcity_ids = $dkParamDataArr['city_ids'];
            $garea_ids = $dkParamDataArr['area_ids'];
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
                        $eachStoreInfoData['shopStoreTitle'] = $storeBasicInfoDetailsArr[0]['shopStoreName'];
                        $eachStoreInfoData['shopStoreOrgLocation'] = $storeBasicInfoDetailsArr[0]['areaName'];
                        $eachStoreInfoData['shopStoreAddress'] = $storeBasicInfoDetailsArr[0]['shopStoreAddress'];
                        $eachStoreInfoData['shopStoreLogoFile'] = '';
                        $eachStoreInfoData['reviewedRatingStr'] = 'No review & rating from customer yet !!!';
                        $eachStoreInfoData['isReviewedRatingFound'] = 'FALSE';
                        $eachStoreInfoData['dessertsTypeId'] = $gproducttype_ids;
                        $eachStoreInfoData['dessertsTypeTitle'] = $storesIdDetailsArr[0]['productTypeTitle'];
                        $eachStoreInfoData['dessertsTypeServedStr'] = 'Cakes, Chocolates';
                        $eachStoreInfoData['totalProduct'] = '';
                        $eachStoreInfoData['deliveryFeeMsgStr'] = 'Free home delivery at your doorstep !!!';
                        $eachStoreInfoData['deliveryTime'] = '60 MIN';
                        $eachStoreInfoData['discountUpto'] = '';
                        $storeLocatedAreaId = $storeBasicInfoDetailsArr[0]['areaId'];
                        // rating & review summary fetching of given storeid
                        $dataArr1 = RatingReviewDao::getTotalRatingAboutShopStores($storeId);
                        if(count($dataArr1)==1 && $dataArr1!=false){
                            $eachStoreInfoData['isReviewedRatingFound'] = 'TRUE';
                            $eachStoreInfoData['reviewedRatingStr'] = $dataArr1[0]['totalAvgRatingAbtProduct']." star from ".$dataArr1[0]['totalUserRatingAbtProduct']." customers !!!";
                            $eachStoreInfoData['avgRatingReviewed'] = $dataArr1[0]['totalAvgRatingAbtProduct'];
                            $eachStoreInfoData['totalUserRatingReviewed'] = $dataArr1[0]['totalUserRatingAbtProduct'];
                        }
                        // fetching store delivery facility given location
                        $paramJson1 = array();
                        $paramJson1['shop_storesids'] = $storeId;
                        $paramJson1['country_ids'] = $gcountry_ids;
                        $paramJson1['city_ids'] = $gcity_ids;
                        $paramJson1['area_ids'] = $garea_ids;
                        $storeDeliveryFacilityDataArr = ShopStoreDao :: getShopStoreDeliveryLocationFacilityDetails($paramJson1);
                        if($storeDeliveryFacilityDataArr!=false && count($storeDeliveryFacilityDataArr)==1){
                            $isHomeDeliveryAccept = $storeDeliveryFacilityDataArr[0]['isHomeDeliveryAccept'];
                            $is_courierdeliveryaccept = $storeDeliveryFacilityDataArr[0]['is_courierdeliveryaccept'];
                            $deliveryTime = $storeDeliveryFacilityDataArr[0]['delivery_time'];
                            if($deliveryTime!='' && $deliveryTime!=false){
                                $eachStoreInfoData['deliveryTime'] = $deliveryTime;
                            }
                            $minOrderAmt = $storeDeliveryFacilityDataArr[0]['min_orderamount'];
                            $deliveryFee = $storeDeliveryFacilityDataArr[0]['deliveryfee'];
                            if($deliveryFee>0 && $deliveryFee!='' && $minOrderAmt!='' && $minOrderAmt>0 && $isHomeDeliveryAccept=='Y'){
                                $eachStoreInfoData['deliveryFeeMsgStr'] = "Shipping charges Rs $deliveryFee will be apply on order amount less than Rs $minOrderAmt !!!";
                            }else if($deliveryFee>0 && $deliveryFee!='' && $minOrderAmt!='' && $minOrderAmt>0 && $is_courierdeliveryaccept=='Y'){
                                $eachStoreInfoData['deliveryFeeMsgStr'] = "Shipping charges Rs $deliveryFee will be apply on order amount less than Rs $minOrderAmt & product will be deliver by courier services !!!";
                            }
                        }
                        // fetching store product type summary data
                        $dataArr2 = ProductDao :: getStoreProductTypeProductCategoryProductSummary($storeId, $gproducttype_ids, '');
                        if($dataArr2!=false && count($dataArr2)==1){
                            $eachStoreInfoData['totalProduct'] = $dataArr2[0]['totalProduct'];
                            $eachStoreInfoData['discountUpto'] = $dataArr2[0]['maxProductDiscount'];
                        }
                        if($storeLocatedAreaId==$garea_ids){
                            array_unshift($allStoreInfoListArr, $eachStoreInfoData);
                        }else{
                            array_push($allStoreInfoListArr, $eachStoreInfoData);
                        }
                    }
                }
            }
            
            // final checking
            if(count($allStoreInfoListArr)>0 && $allStoreInfoListArr!=false){
                $rspDetails['allStoreInfoList'] = $allStoreInfoListArr;
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
        $rspDetails['customersReviewedRatingMsgStr'] = 'No any customer(s) reviewed yet !!!';
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
    
    // CJ defined this action 2016-09-11
    public function checkStoreDeliveryFeeApplicableOnUserProduct($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['applicableStoreDeliveryFeeMsg'] = 'Your eligible for free home delivery to your door step !!!';
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            
            // initial variable declare here
            $gshopstore_id = $dkParamDataArr['store_id'];
            $gcountry_ids = $dkParamDataArr['country_ids'];
            $gcity_ids = $dkParamDataArr['city_ids'];
            $garea_ids = $dkParamDataArr['area_ids'];
            $gccaId = $dkParamDataArr['ccaId'];
            $deliveryFee = '0';
            $minOrderAmt = '0';
            $subTotalOrderAmt = 0;
            $isHomeDeliveryAccept = 'Y';
            $is_courierdeliveryaccept = 'Y';
            $updateApplicableDeliveryFee = '0';
            $isOrdercartStoreSummaryFound = 'N';
            $userId = 0;
            
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $userId = $userSessionDetailsData['unmd5UserId'];
            }
                
            // fetching store delivery facility given location
            $paramJson1 = array();
            $paramJson1['shop_storesids'] = $gshopstore_id;
            $paramJson1['country_ids'] = $gcountry_ids;
            $paramJson1['city_ids'] = $gcity_ids;
            $paramJson1['area_ids'] = $garea_ids;
            $dataArr1 = ShopStoreDao :: getShopStoreDeliveryLocationFacilityDetails($paramJson1);
            if($dataArr1!=false && count($dataArr1)==1){
                $isHomeDeliveryAccept = $dataArr1[0]['isHomeDeliveryAccept'];
                $is_courierdeliveryaccept = $dataArr1[0]['is_courierdeliveryaccept'];
                $minOrderAmt = $dataArr1[0]['min_orderamount'];
                $deliveryFee = $dataArr1[0]['deliveryfee'];
            }
                
            // fetching order cart store summary data
            $dataArr2 = OrderCartDao::getRequestedOrdercartStoreSummary($userId, $gshopstore_id, $gccaId);
            if($dataArr2>0 && $dataArr2>0){
                $subTotalOrderAmt = $dataArr2[0]['subtotalOrderAmtNotIncludingDeliveryFee'];
                $isOrdercartStoreSummaryFound = 'Y';
            }

            if($deliveryFee>0 && $deliveryFee!='' && $minOrderAmt!='' 
                && $minOrderAmt>0 && $isHomeDeliveryAccept=='Y'){
                if($subTotalOrderAmt>0 && $subTotalOrderAmt>=$minOrderAmt){
                    $updateApplicableDeliveryFee = '0';
                    $rspDetails['applicableStoreDeliveryFeeMsg'] = 'Your eligible for free home delivery to your door step !!!';
                }else if($subTotalOrderAmt>0 && $subTotalOrderAmt<$minOrderAmt){
                    $rspDetails['applicableStoreDeliveryFeeMsg'] = "Shipping charges Rs $deliveryFee will be apply on order amount less than Rs $minOrderAmt !!!";
                }
            }else if($deliveryFee>0 && $deliveryFee!='' && $minOrderAmt!='' 
                && $minOrderAmt>0 && $is_courierdeliveryaccept=='Y'){
                if($subTotalOrderAmt>0 && $subTotalOrderAmt>=$minOrderAmt){
                    $updateApplicableDeliveryFee = '0';
                    $rspDetails['applicableStoreDeliveryFeeMsg'] = 'Your eligible for free home delivery by courier to your door step !!!';
                }else if($subTotalOrderAmt>0 && $subTotalOrderAmt<$minOrderAmt){
                    $rspDetails['applicableStoreDeliveryFeeMsg'] = "Shipping charges Rs $deliveryFee will be apply on order amount less than Rs $minOrderAmt & product will be deliver by courier services !!!";
                }
            }

            // finally checking to update order cart store delivery fee applicable on user product
            // at specific delivery location
            if($isOrdercartStoreSummaryFound=='Y' && $userId>0 && $userId!=''
                && $updateApplicableDeliveryFee>=0){
                $paramJson2 = array();
                $paramJson2['deliveryfee'] = $updateApplicableDeliveryFee;
                $paramJson2['updated_by'] = $userId;
                $paramJson2['id'] = $dataArr2[0]['ordercartStoreId'];
                $updatedStatusOrdrcartStore = OrderCartDao :: updateEntryInOrdercartStore($paramJson2);
            }
        }
        return $rspDetails;
    }
    
}
