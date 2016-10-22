<?php

/**
* Description of ProductController
* @author CJ defined this file 2016-06-06
*/

class ProductController extends V1Controller{
    
    // CJ defined this action 2016-06-06
    public function actionDeliveryAreaBasedDessertsTypeList(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingDessertsTypeListServingInCountryCityArea($dkParamDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
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
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingProductTypeAllProductCategoryDetails($dkParamDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
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
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingProductTypeProductCategoryFilterOperationDetails($dkParamDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
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
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingAllProductDetails($dkParamDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
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
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingDessertsProductTypeCategoryProductDetails($dkParamDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
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
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingProductDescriptionDetails($dkParamDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
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
