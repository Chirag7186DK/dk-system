<?php

/**
* Description of UsersController
* @author CJ defined this file 2016-07-24
*/

class UsersController extends V1Controller{
    
    // CJ defined this action 2016-07-24
    public function actionManageTrackUserAccessingWebsites(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAddingTrackUserAccessingWebsites($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $UsersServicesV1->addTrackUserInfoAccessingWebsitesDetails($paramDataArr);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-06
    public function actionGenerateUserSessionId(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $UsersServicesV1 = new UsersServicesV1();
                $rspDetails = $UsersServicesV1->generateUserSessionId($paramDataArr);
                ComponentsJson::GenerateJsonAndSend($rspDetails);
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-09-21
    public function actionUserSignUpAuthentication(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUserSignUpAuthentication($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->userSignUpAuthentication($paramDataArr);
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
    public function actionCheckUserAuthentication(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUserSignInAuthentication($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->checkUserAuthentication($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-14
    public function actionUserDashboardSummaryData(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAuthenticatedUserDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->getUserDashboardSummaryDataDetails($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-21
    public function actionManageUserPersonalInfoData(){
        if(ComponentsHttp::httpMethod()=="GET"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAuthenticatedUserDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->getUserPersonalInfoData($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
        if(ComponentsHttp::httpMethod()=="PUT"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUpdatingUserPersonalDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->updateUserPersonalInfoData($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-21
    public function actionUpdateUserPasswordInfoData(){
        if(ComponentsHttp::httpMethod()=="PUT"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUpdatingUserPasswordDetails($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->updateUserPasswordInfoData($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    // CJ defined this action 2016-08-30
    public function actionUserLogout(){
        if(ComponentsHttp::httpMethod()=="PUT"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForLogoutUser($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->userLogoutFromWebsites($paramDataArr);
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
