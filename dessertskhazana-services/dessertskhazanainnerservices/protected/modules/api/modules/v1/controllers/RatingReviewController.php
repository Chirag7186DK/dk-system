<?php

/**
* Description of RatingReviewController
* @author CJ defined this file 2016-06-06
*/

class RatingReviewController extends V1Controller{
    
    // CJ defined this action 2016-08-06
    public function actionUserRatingReviewProduct(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataToAddUserRatingReviewProduct($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->addUserRatingReviewProduct($dkParamDataArr);
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
    public function actionManageShopStoreRatingReviewQuestionsAboutProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewQuestionFromShopstores($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getRatingReviewQuestionsAboutProductByShopStores($dkParamDataArr);
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
    public function actionShopStoreAllUserRating(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingAllUserRatingsAbtShopstores($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getShopStoreAllUserRating($dkParamDataArr);
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
    public function actionAllUserRatingReviewAboutProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewAboutProduct($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getAllUserRatingReviewAboutProduct($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-06-06verageRa
    public function actionAverageRatingReviewAboutProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewAboutProduct($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getAverageRatingReviewAboutProduct($dkParamDataArr);
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
    public function actionMaxRatingReviewAboutProduct(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $requestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($requestedParamKeyStatusFromInDtoFile!=false && $requestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $paramDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewAboutProduct($dkParamDataArr);
                if($paramDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getMaxRatingReviewAboutProduct($dkParamDataArr);
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
