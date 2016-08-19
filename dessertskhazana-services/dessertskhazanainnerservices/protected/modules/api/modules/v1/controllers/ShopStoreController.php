<?php

/**
* Description of ShopStoreController
* @author CJ defined this file 2016-06-24
*/

class ShopStoreController extends V1Controller{
    
    // CJ defined this action 2016-06-24
    public function actionCShopStoreSummaryInfo(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingCShopstoresummaryInfo($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $ShopStoreServicesV1->getCShopStoreSummaryInfo($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-06
    public function actionCShopStoreProductTypeProductCategoryAllProductDetails(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingCshopstoreAllProductDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $ShopStoreServicesV1->getCShopStoreProductTypeProductCategoryAllProductDetails($dkParamDataArr);
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingCshopstoreWorkingstyle($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $ShopStoreServicesV1->getCshopstoreWorkingstyleDetails($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-07-18
    public function actionCshopstoreProductdeliveryAreaInfo(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingCshopstoreProductDeliveryAreaInfo($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $ShopStoreServicesV1 = new ShopStoreServicesV1();
                    $ShopStoreServicesV1->getCshopstoreProductdeliveryAreaInfo($dkParamDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
