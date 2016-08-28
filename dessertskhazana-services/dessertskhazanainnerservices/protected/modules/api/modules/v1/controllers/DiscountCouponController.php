<?php

/**
* Description of DiscountCouponController
* @author CJ defined this file 2016-08-13
*/

class DiscountCouponController extends V1Controller{
    
    // CJ defined this action 2016-08-14
    public function actionUserSharingDiscountCouponList(){
        
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $DiscountCouponServicesV1 = new DiscountCouponServicesV1();
                    $rspDetails = $DiscountCouponServicesV1->getUserSharingDiscountCouponList($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-28
    public function actionUserSharedDiscountCouponList(){
        
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $DiscountCouponServicesV1 = new DiscountCouponServicesV1();
                    $rspDetails = $DiscountCouponServicesV1->getUserSharedDiscountCouponList($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-28
    public function actionSharingOffersFrmOneUserToOtherUser(){
        
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAddingSharingOffersFrmOneUserToOtherUser($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $DiscountCouponServicesV1 = new DiscountCouponServicesV1();
                    $rspDetails = $DiscountCouponServicesV1->addSharingOffersFrmOneUserToOtherUser($dkParamDataArr);
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
