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
        return $rspDetails;
    }
    
    
    // CJ defined this action 2016-06-06
    public function getDeliveryAreaDetails($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetching delivery area list
            $rspDetails = commonfunction :: getDeliveryAreaListDetails($dkParamDataArr);
        } 
        return $rspDetails;
    }
    
}
