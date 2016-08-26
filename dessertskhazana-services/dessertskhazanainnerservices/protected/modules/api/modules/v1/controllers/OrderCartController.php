<?php

/**
* Description of OrderCartController
* @author CJ defined this file 2016-08-06
*/

class OrderCartController extends V1Controller{
    
    // CJ defined this action 2016-08-14
    public function actionUserOrdercartDashboardSummaryData(){
        
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->getUserOrdercartDashboardSummaryData($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-14
    public function actionManageOrdercartItem(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAddingProductDataInOrdercart($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->addProductDataInOrdercart($dkParamDataArr);
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForFetchingOrderItemList($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->getOrdercartItemDetails($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        
        if(ComponentsHttp::httpMethod()=="DELETE"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToRemoveItemFromOrdercart($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->removeItemDetailsFromOrdercart($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        
        if(ComponentsHttp::httpMethod()=="PUT"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToUpdateItemFromOrdercart($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->updateItemDetailsFromOrdercart($dkParamDataArr);
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
