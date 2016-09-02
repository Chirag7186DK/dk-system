<?php

/**
* Description of LocationServicesV1
* @author CJ defined this service 2016-06-06
*/

class LocationServicesV1 implements ILocationServicesV1{
    
    // CJ defined this action 2016-06-06
    public function getDeliveryCityDetails($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetching delivery city list
            $rspDetails = commonfunction :: getDeliveryCityListDetails($dkParamDataArr);
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    
    // CJ defined this action 2016-06-06
    public function getDeliveryAreaDetails($dkParamDataArr){
        $rspDetails = array();
        // checking requested param
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectedDeliveryAreaDetails'] = false;
            $rsltJsonArr['allAreaList'] = false;
            // initial variable declare
            $gcountry_ids = $dkParamDataArr['country_ids'];
            $gcity_ids = $dkParamDataArr['city_ids'];
            $garea_ids = $dkParamDataArr['area_ids'];
            // prepare param obj
            $storeDeliveryParamObj = array();
            $storeDeliveryParamObj['country_ids'] = $gcountry_ids;
            $storeDeliveryParamObj['city_ids'] = $gcity_ids;
            $storeDeliveryParamObj['groupby_area_ids'] = 'Y';
            $storeDeliveryLocationDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($storeDeliveryParamObj);
            if(count($storeDeliveryLocationDetailsArr)>0 && $storeDeliveryLocationDetailsArr!=false){
                // remove unused keys from fetched array data
                $removeUnusedKeysDataArr = array(
                    "shopStoreId"=>"0", "shopStoreName"=>"0", "countryCityAreaAffiliationId"=>"0", "countryId"=>"0", "countryName"=>"0",  
                    "ciytId"=>"0", "cityName"=>"0", "isPreorderAccept"=>"0", "takeAwayOrderAccept"=>"0", "cashOnDeliveryAccept"=>"0",
                    "isOnlinePaymentAccept"=>"0", "isHomeDeliveryAccept"=>"0", "orderDeliveryOpenTime"=>"0", "orderDeliveryCloseTime"=>"0"
                );
                $removedUnusedKeyDataArr = utils :: removeJsonKeyAndValuesFromArrayOfJsonArray($storeDeliveryLocationDetailsArr, $removeUnusedKeysDataArr, 'keyname');
                if(count($removedUnusedKeyDataArr)>0 && $removedUnusedKeyDataArr!=false){
                    // final merging 
                    $deliveryAreaListArr = utils::array_merge_common_elements(
                        $removedUnusedKeyDataArr, array(array("areaId"=>$garea_ids)), 
                        array("areaId"), array(), 
                        array("isRequestedDeliveryAreaMatched"=>"Y", "areaIcon"=>"fa fa-map-marker"), 
                        array("isRequestedDeliveryAreaMatched"=>"N", "areaIcon"=>"fa fa-map-marker")
                    );
                    if(count($deliveryAreaListArr)>0 && $deliveryAreaListArr!=false){
                        $rsltJsonArr['allAreaList'] = $deliveryAreaListArr;
                        // sorted on matched delivery area
                        $sortedOnMatchedDeliveryAreaDetailsArr =  utils::arraySort($deliveryAreaListArr, array("isRequestedDeliveryAreaMatched"));
                        if($sortedOnMatchedDeliveryAreaDetailsArr!=false && count($sortedOnMatchedDeliveryAreaDetailsArr)>0){
                            if(array_key_exists('Y', $sortedOnMatchedDeliveryAreaDetailsArr)){
                                $rsltJsonArr['defaultSelectedDeliveryAreaDetails'] = $sortedOnMatchedDeliveryAreaDetailsArr['Y'][0];
                            }
                        }
                    }
                }            
            }
            if($rsltJsonArr['allAreaList']!=false && count($rsltJsonArr['allAreaList'])>0){
                $rspDetails["deliveryAreaDetails"] =  $rsltJsonArr;
            }
        }
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
}
