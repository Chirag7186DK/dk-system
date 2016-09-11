<?php

/**
* Description of ShopStoreController
* @author CJ defined this file 2016-06-24
*/

class ShopStoreController extends V1Controller{
    
    // CJ defined this action 2016-09-09
    public function actionDeliveryAreaBasedDessertTypeCStoreList(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDeliveryAreaBasedDessertTypeCStoreList($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $rspDetails = $ShopStoreServicesV1->getDeliveryAreaBasedDessertTypeCStoreList($dkParamDataArr);
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
    public function actionDeliveryAreaBasedCStoreConductDessertType(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDeliveryAreabasedCStoreConductDessertType($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $rspDetails = $ShopStoreServicesV1->getDeliveryAreaBasedCStoreConductDessertType($dkParamDataArr);
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
    public function actionCShopStoreSummaryInfo(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingCShopstoresummaryInfo($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $rspDetails = $ShopStoreServicesV1->getCShopStoreSummaryInfo($dkParamDataArr);
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
    public function actionCshopstoreWorkingstyle(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingCshopstoreWorkingstyle($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $rspDetails = $ShopStoreServicesV1->getCshopstoreWorkingstyleDetails($dkParamDataArr);
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
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $rspDetails = $ShopStoreServicesV1->getStoreDeliveryFeeApplicableOnDeliveryArea($dkParamDataArr);
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
