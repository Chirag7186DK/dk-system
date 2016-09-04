<?php

/**
* Description of ProductController
* @author CJ defined this file 2016-06-06
*/

class ProductController extends V1Controller{
    
    // CJ defined this action 2016-06-06
    public function actionDeliveryAreaBasedDessertsTypeList(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDessertsTypeListServingInCountryCityArea($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $rspDetails = $ProductServicesV1->getDeliveryAreaBasedDessertsTypeList($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-09-03
    public function actionProductTypeAllProductCategoryDetails(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingProductTypeAllProductCategoryDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $rspDetails = $ProductServicesV1->getProductTypeAllProductCategoryDetails($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-09-03
    public function actionProductTypeProductCategoryFilterTypeList(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingProductTypeProductCategoryFilterOperationDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $rspDetails = $ProductServicesV1->getProductTypeProductCategoryFilterTypeList($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-06
    public function actionProductTypeProductCategoryAllProductDetails(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingAllProductDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $rspDetails = $ProductServicesV1->getProductTypeProductCategoryAllProductDetails($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-06
    public function actionProductTypeProductCategoryProductDetails(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDessertsProductTypeCategoryProductDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $rspDetails = $ProductServicesV1->getProductTypeProductCategoryProductDetails($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-05-25
    public function actionProductDescriptionDetails(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingProductDescriptionDetails($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $rspDetails = $ProductServicesV1->getProductTypeProductCategoryProductDescriptionDetails($dkParamDataArr);
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
