<?php

/**
* Description of LocationController
* @author CJ defined this file 2016-06-06
*/

class LocationController extends V1Controller{
    
    // CJ defined this action 2016-06-06
    public function actionDeliveryCity(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDeliveryCityListServingDessertsProductType($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $LocationServicesV1 = new LocationServicesV1();
                    $LocationServicesV1->getDeliveryCityDetails($dkParamDataArr);
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDeliveryAreaListServingDessertsProductType($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $LocationServicesV1 = new LocationServicesV1();
                    $LocationServicesV1->getDeliveryAreaDetails($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
