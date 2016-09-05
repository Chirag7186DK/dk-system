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
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
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
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataForAddingProductDataInOrdercart($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
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
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataForFetchingOrderItemList($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
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
        if(ComponentsHttp::httpMethod()=="PUT"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataToUpdateItemFromOrdercart($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
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
        if(ComponentsHttp::httpMethod()=="DELETE"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataToRemoveItemFromOrdercart($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
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
    }
    
    // CJ defined this action 2016-09-05
    public function actionResetAllItemOrdercart(){
        
        if(ComponentsHttp::httpMethod()=="DELETE"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->resetAllItemOrdercart($dkParamDataArr);
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
