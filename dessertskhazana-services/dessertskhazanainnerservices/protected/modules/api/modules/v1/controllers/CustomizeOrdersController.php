<?php

/**
* Description of CustomizeOrdersController
* @author CJ defined this file 2016-07-24
*/

class CustomizeOrdersController extends V1Controller{
    
    // CJ defined this action 2016-07-24
    public function actionManageCustomizeOrdersRequest(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAddingCustomizeOrderRequest($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $CustomizeOrdersServicesV1 = new CustomizeOrdersServicesV1();
                    $CustomizeOrdersServicesV1->addCustomizeOrdersRequest($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
