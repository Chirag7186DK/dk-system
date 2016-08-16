<?php

/**
* Description of WishListController
* @author CJ defined this file 2016-08-01
*/

class WishListController extends V1Controller{
    
    // CJ defined this action 2016-07-30
    public function actionCreateUserWL(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToCreateUserWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->createUserWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-01
    public function actionUserWL(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->getUserWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-01
    public function actionDeleteUserWL(){
        if(ComponentsHttp::httpMethod()=="DELETE"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToDeleteUWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->deleteUserWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-02
    public function actionUdpateUWL(){
        if(ComponentsHttp::httpMethod()=="PUT"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToUdpateUWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->updateUWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-07-26
    public function actionUserAllWLWiseItemDetails(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->getUserAllWLWiseItemDetails($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-02
    public function actionMoveProductFromUWLToUWL(){
        if(ComponentsHttp::httpMethod()=="PUT"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToMoveProductFromUWLToUWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->moveProductFromUWLToUWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-02
    public function actionRemoveProductFromUWL(){
        if(ComponentsHttp::httpMethod()=="DELETE"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToRemoveProductFromUWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->removeProductFromUWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-03
    public function actionSearchUserWL(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToGetUWLItemBySearchParam($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->getUWLItemBySearchParam($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-03
    public function actionCopyProductFromUWLToUWL(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToCopyProductFromUWLToUWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->copyProductFromUWLToUWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-05
    public function actionAddProductToUWL(){
        if(ComponentsHttp::httpMethod()=="POST"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataToAddProductForUWL($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->addProductToUWL($dkParamDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-05 // done
    public function actionUserWLDashboardSummary(){
        if(ComponentsHttp::httpMethod()=="GET"){
            // checking requested param key name 
            $retRequestedParamKeyStatusFromInDtoFile = customparam :: checkRequestedParamKeyFromInDtoFile($this->_inDtoArray);
            if($retRequestedParamKeyStatusFromInDtoFile!=false && $retRequestedParamKeyStatusFromInDtoFile!=''){
                $inDtoArray = $this->_inDtoArray;
                $dkParamDataArr = $inDtoArray['dkParamDataArr'];
                // checking param key value data & return status
                $retParamDataCorrectIncorrectStatus = customparam :: checkParamDataForAuthenticatedUserDetails($dkParamDataArr);
                if($retParamDataCorrectIncorrectStatus=='TRUE'){
                    $WishListServicesV1 = new WishListServicesV1();
                    $rspDetails = $WishListServicesV1->getUserWLDashboardSummary($dkParamDataArr);
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
