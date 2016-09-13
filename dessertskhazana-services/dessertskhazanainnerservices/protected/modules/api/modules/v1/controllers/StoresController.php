<?php

/**
* Description of StoresController
* @author CJ defined this file 2016-06-24
*/

class StoresController extends V1Controller{
    
    // CJ defined this action 2016-09-09
    public function actionDeliveryAreaBasedDessertTypeStoresList(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDeliveryAreaBasedDessertTypeStoresList($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $StoresServicesV1 = new StoresServicesV1();
                    $rspDetails = $StoresServicesV1->getDeliveryAreaBasedDessertTypeStoresList($dkParamDataArr);
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
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDeliveryAreabasedStoresConductDessertType($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $StoresServicesV1 = new StoresServicesV1();
                    $rspDetails = $StoresServicesV1->getDeliveryAreaBasedStoresConductDessertType($dkParamDataArr);
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
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingStoresummaryInfo($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $StoresServicesV1 = new StoresServicesV1();
                    $rspDetails = $StoresServicesV1->getStoreSummaryInfo($dkParamDataArr);
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
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingStoreWorkingstyle($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $StoresServicesV1 = new StoresServicesV1();
                    $rspDetails = $StoresServicesV1->getStoreWorkingstyleDetails($dkParamDataArr);
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
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataStoreDeliveryFeeApplicableOnDeliveryArea($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $StoresServicesV1 = new StoresServicesV1();
                    $rspDetails = $StoresServicesV1->getStoreDeliveryFeeApplicableOnDeliveryArea($dkParamDataArr);
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
