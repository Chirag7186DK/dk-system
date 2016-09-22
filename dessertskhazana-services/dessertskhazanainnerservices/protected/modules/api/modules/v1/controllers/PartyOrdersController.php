<?php

/**
* Description of PartyOrdersController
* @author CJ defined this file 2016-07-20
*/

class PartyOrdersController extends V1Controller{
    
    // CJ defined this action 2016-07-20
    public function actionManagePartyOrders(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAddingPartyOrderRequest($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $PartyOrdersServicesV1 = new PartyOrdersServicesV1();
                    $rspDetails = $PartyOrdersServicesV1->addPartyOrdersRequest($paramDataArr);
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
                    $PartyOrdersServicesV1 = new PartyOrdersServicesV1();
                    $rspDetails = $PartyOrdersServicesV1->getPartyOrderList($paramDataArr);
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
