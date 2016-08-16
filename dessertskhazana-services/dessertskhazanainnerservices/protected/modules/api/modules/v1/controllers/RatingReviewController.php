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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToAddUserRatingReviewProduct($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->addUserRatingReviewProduct($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    uitls :: getRatingReviewQuestionsAboutProductByShopStores();
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewQuestionFromShopstores($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getRatingReviewQuestionsAboutProductByShopStores($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    uitls :: getRatingReviewQuestionsAboutProductByShopStores();
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingAllUserRatingsAbtShopstores($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getShopStoreAllUserRating($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    uitls :: generateResponseDataForInvalidRequestParamKeyData();
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewAboutProduct($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getAllUserRatingReviewAboutProduct($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    uitls :: generateResponseDataForInvalidRequestParamKeyData();
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewAboutProduct($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getAverageRatingReviewAboutProduct($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    uitls :: generateResponseDataForInvalidRequestParamKeyData();
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
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataFetchingRatingReviewAboutProduct($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $RatingReviewServicesV1 = new RatingReviewServicesV1();
                    $rspDetails = $RatingReviewServicesV1->getMaxRatingReviewAboutProduct($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    uitls :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
}
