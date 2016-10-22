<?php

/**
* Description of OrderCartController
* @author CJ defined this file 2016-08-06
*/

class OrderCartController extends V1Controller{
    
    // CJ defined this action 2016-08-14
    public function actionUserOrdercartDashboardSummaryData(){
        
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAuthenticatedUserDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->getUserOrdercartDashboardSummaryData($paramDataArr);
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
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAddingProductDataInOrdercart($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->addProductDataInOrdercart($paramDataArr);
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
                $paramKeyValueDataStatus = customparam :: checkParamDataForFetchingOrderItemList($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->getOrdercartItemDetails($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        if(ComponentsHttp::httpMethod()=="PUT"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataToUpdateItemInOrdercart($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->updateItemDetailsInOrdercart($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        if(ComponentsHttp::httpMethod()=="DELETE"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataToRemoveItemFromOrdercart($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->removeItemDetailsFromOrdercart($paramDataArr);
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
    public function actionStorewiseOrderSummaryCheckoutProcess(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAuthenticatedUserDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->getStorewiseOrderSummaryDataForCheckoutProcess($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-09-18
    public function actionManageDeliveryAddressOrdercartStorewise(){
        if(ComponentsHttp::httpMethod()=="PUT"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataToUpdateOrderDeliveryAddressStorewise($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $OrderCartServicesV1 = new OrderCartServicesV1();
                    $rspDetails = $OrderCartServicesV1->updateDeliveryAddressOrdercartStorewise($paramDataArr);
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
