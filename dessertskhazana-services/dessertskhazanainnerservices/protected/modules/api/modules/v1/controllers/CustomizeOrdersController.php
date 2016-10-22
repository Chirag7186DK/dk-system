<?php

/**
* Description of CustomizeOrdersController
* @author CJ defined this file 2016-07-24
*/

class CustomizeOrdersController extends V1Controller{
    
    // CJ defined this action 2016-07-24
    public function actionManageCustomizeOrders(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAddingCustomizeOrderRequest($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $CustomizeOrdersServicesV1 = new CustomizeOrdersServicesV1();
                    $rspDetails = $CustomizeOrdersServicesV1->addCustomizeOrdersRequest($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAuthenticatedUserDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $CustomizeOrdersServicesV1 = new CustomizeOrdersServicesV1();
                    $rspDetails = $CustomizeOrdersServicesV1->getCustomizeOrderList($paramDataArr);
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
