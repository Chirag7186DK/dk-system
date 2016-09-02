<?php

/**
* Description of ProductController
* @author CJ defined this file 2016-06-06
*/

class ProductController extends V1Controller{
    
    // CJ defined this action 2016-06-06
    public function actionDeliveryAreaBasedProductTypeList(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingDessertsProductTypeListServingInCountryCityArea($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $ProductServicesV1 = new ProductServicesV1();
                    $ProductServicesV1->getDeliveryAreaBasedProductTypeList($dkParamDataArr);
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
                    $ProductServicesV1->getProductTypeProductCategoryAllProductDetails($dkParamDataArr);
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
                    $ProductServicesV1->getProductTypeProductCategoryProductDetails($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-05-25, API Completed
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
                    $ProductServicesV1->getProductTypeProductCategoryProductDescriptionDetails($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
