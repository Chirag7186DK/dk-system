<?php

/**
* Description of PartyOrdersController
* @author CJ defined this file 2016-07-20
*/

class PartyOrdersController extends V1Controller{
    
    // CJ defined this action 2016-07-20
    public function actionManagePartyOrders(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataForAddingPartyOrderRequest($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $PartyOrdersServicesV1 = new PartyOrdersServicesV1();
                    $rspDetails = $PartyOrdersServicesV1->addPartyOrdersRequest($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $PartyOrdersServicesV1 = new PartyOrdersServicesV1();
                    $rspDetails = $PartyOrdersServicesV1->getPartyOrderList($dkParamDataArr);
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
