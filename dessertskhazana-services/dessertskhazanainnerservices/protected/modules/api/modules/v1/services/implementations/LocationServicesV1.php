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
            $rsltJsonArr = array();
            $rsltJsonArr['defaultSelectedDeliveryCityDetails'] = false;
            $rsltJsonArr['allCityList'] = false;
            // initial variable declare here
            $gcity_ids = $dkParamDataArr['city_ids'];
            $deliveryCityListDetailsArr = LocationDao::getCityList($gcity_ids, '');
            if(count($deliveryCityListDetailsArr)>0 && $deliveryCityListDetailsArr!=false){
                // iterate each delivery city details
                for($eachIndex = 0; $eachIndex<count($deliveryCityListDetailsArr); $eachIndex++){
                    $deliveryCityListDetailsArr[$eachIndex]['cityIcon'] = 'fa fa-map-marker';
                    $deliveryCityListDetailsArr[$eachIndex]['isRequestedDeliveryCityMatched'] = 'N';
                    if($deliveryCityListDetailsArr[$eachIndex]['cityId']==$gcity_ids){
                        $deliveryCityListDetailsArr[$eachIndex]['isRequestedDeliveryCityMatched'] = 'Y';
                        // default selected delivery city to show
                        $rsltJsonArr['defaultSelectedDeliveryCityDetails'] = array(
                            "cityId"=>$gcity_ids,
                            "cityName"=>$deliveryCityListDetailsArr[$eachIndex]['cityName'],
                            "cityIcon"=>"fa fa-map-marker"
                        );
                    }
                }
                $rspDetails["deliveryCityDetails"] =  $rsltJsonArr;
            }
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
            $shopStoreProductDeliveryParamObj = array();
            $shopStoreProductDeliveryParamObj['country_ids'] = $gcountry_ids;
            $shopStoreProductDeliveryParamObj['city_ids'] = $gcity_ids;
            $shopStoreProductDeliveryParamObj['groupby_area_ids'] = 'Y';
            $retShopStoreDeliveryLocationDetailsArr = ShopStoreDao::getShopStoreDeliveryLocationFacilityDetails($shopStoreProductDeliveryParamObj);
            if(count($retShopStoreDeliveryLocationDetailsArr)>0 && $retShopStoreDeliveryLocationDetailsArr!=false){
                // remove unused keys from fetched array data
                $removeJsonKeyFromEachInputJsonArr = array(
                    "shopStoreId"=>"0", "shopStoreName"=>"0", "countryCityAreaAffiliationId"=>"0", "countryId"=>"0", "countryName"=>"0",  
                    "ciytId"=>"0", "cityName"=>"0", "isPreorderAccept"=>"0", "takeAwayOrderAccept"=>"0", "cashOnDeliveryAccept"=>"0",
                    "isOnlinePaymentAccept"=>"0", "isHomeDeliveryAccept"=>"0", "orderDeliveryOpenTime"=>"0", "orderDeliveryCloseTime"=>"0"
                );
                $removedUnusedKeynameFromShopStoresDeliveryLocationsDetailsArr = utils :: removeJsonKeyAndValuesFromArrayOfJsonArray($retShopStoreDeliveryLocationDetailsArr, $removeJsonKeyFromEachInputJsonArr, 'keyname');
                if(count($removedUnusedKeynameFromShopStoresDeliveryLocationsDetailsArr)>0 && $removedUnusedKeynameFromShopStoresDeliveryLocationsDetailsArr!=false){
                    // final merging 
                    $finalDeliveryLocationDetailsArr = utils::array_merge_common_elements(
                        $removedUnusedKeynameFromShopStoresDeliveryLocationsDetailsArr, 
                        array(array("areaId"=>$garea_ids)), 
                        array("areaId"), array(), 
                        array("isRequestedDeliveryAreaMatched"=>"Y", "areaIcon"=>"fa fa-map-marker"), 
                        array("isRequestedDeliveryAreaMatched"=>"N", "areaIcon"=>"fa fa-map-marker")
                    );
                    if(count($finalDeliveryLocationDetailsArr)>0 && $finalDeliveryLocationDetailsArr!=false){
                        $rsltJsonArr['allAreaList'] = $finalDeliveryLocationDetailsArr;
                        //sorted on matched delivery area
                        $sortedOnMatchedDeliveryAreaDetailsArr =  utils::arraySort($finalDeliveryLocationDetailsArr, array("isRequestedDeliveryAreaMatched"));
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
