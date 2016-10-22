<?php

/**
* Description of LocationController
* @author CJ defined this file 2016-06-06
*/

class LocationController extends V1Controller{
    
    // CJ defined this action 2016-06-06
    public function actionDeliveryCity(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingDeliveryCityListServingDessertsProductType($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $LocationServicesV1 = new LocationServicesV1();
                    $rspDetails = $LocationServicesV1->getDeliveryCityDetails($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-06
    public function actionDeliveryArea(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingDeliveryAreaListServingDessertsProductType($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $LocationServicesV1 = new LocationServicesV1();
                    $rspDetails = $LocationServicesV1->getDeliveryAreaDetails($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
