<?php

/**
* Description of RatingReviewController
* @author CJ defined this file 2016-06-06
*/

class RatingReviewController extends V1Controller{
    
    // CJ defined this action 2016-08-06
    public function actionUserRatingReviewProduct(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataToAddUserRatingReviewProduct($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->addUserRatingReviewProduct($paramDataArr);
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
    public function actionStoreRatingReviewQuestions(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingStoreRatingReviewQuestion($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getStoreRatingReviewQuestions($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-26
    public function actionStoreAllUserRating(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingStoreAllUserRating($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getStoreAllUserRating($paramDataArr);
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
    public function actionAllUserRatingReviewProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingRatingReviewProduct($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getAllUserRatingReviewProduct($paramDataArr);
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
    public function actionAverageRatingReviewProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingRatingReviewProduct($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getAverageRatingReviewProduct($paramDataArr);
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
    public function actionMaxRatingReviewProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataFetchingRatingReviewProduct($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getMaxRatingReviewProduct($paramDataArr);
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
