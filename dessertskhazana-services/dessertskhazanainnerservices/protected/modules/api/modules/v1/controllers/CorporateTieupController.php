<?php

/**
* Description of CorporateTieupControllers
* @author CJ defined this file 2016-07-24
*/

class CorporateTieupController extends V1Controller{
    
    // CJ defined this action 2016-07-24
    public function actionManageCorporateTieupRequest(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAddingCorporateTieupRequest($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $CorporateTieupServicesV1 = new CorporateTieupServicesV1();
                    $CorporateTieupServicesV1->addCorporateTieupRequest($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
