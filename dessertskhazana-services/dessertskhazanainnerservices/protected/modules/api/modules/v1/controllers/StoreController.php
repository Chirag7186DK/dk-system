<?php

/**
* Description of StoresController
* @author CJ defined this file 2016-06-24
*/

class StoreController extends V1Controller{
    
    // CJ defined this action 2016-09-09
    public function actionStoreListDeliveryAreaBasedDessertType(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingStoresListDeliveryAreaBasedDessertType($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $StoreServicesV1 = new StoreServicesV1();
                    $rspDetails = $StoreServicesV1->getStoreListDeliveryAreaBasedDessertType($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-09-04
    public function actionDeliveryAreaBasedStoresConductDessertType(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingDeliveryAreabasedStoresConductDessertType($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $StoreServicesV1 = new StoreServicesV1();
                    $rspDetails = $StoreServicesV1->getDeliveryAreaBasedStoresConductDessertType($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-24
    public function actionStoreSummaryInfo(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingStoresummaryInfo($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $StoreServicesV1 = new StoreServicesV1();
                    $rspDetails = $StoreServicesV1->getStoreSummaryInfo($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-07-18
    public function actionStoreWorkingstyle(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingStoreWorkingstyle($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $StoreServicesV1 = new StoreServicesV1();
                    $rspDetails = $StoreServicesV1->getStoreWorkingstyleDetails($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-07-18
    public function actionStoreDeliveryFeeApplicableDeliveryArea(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataStoreDeliveryFeeApplicableOnDeliveryArea($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $StoreServicesV1 = new StoreServicesV1();
                    $rspDetails = $StoreServicesV1->getStoreDeliveryFeeApplicableOnDeliveryArea($paramDataArr);
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
