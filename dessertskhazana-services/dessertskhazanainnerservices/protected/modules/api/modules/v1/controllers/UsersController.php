<?php

/**
* Description of UsersController
* @author CJ defined this file 2016-07-24
*/

class UsersController extends V1Controller{
    
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
    
    public function actionManageTrackUserAccessingWebsites(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForAddingTrackUserAccessingWebsites($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->addTrackUserInfoAccessingWebsitesDetails($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    public function actionUserSignUpAuthentication(){
        if(ComponentsHttp::httpMethod()=="POST"){
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
    
    public function actionUserSignInAuthentication(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUserSignInAuthentication($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->userSignInAuthentication($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    public function actionUserForgotPwdAuthentication(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUserForgotPwdAuthentication($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->userForgotPwdAuthentication($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
    public function actionSendOtpCode(){
        if(ComponentsHttp::httpMethod()=="POST"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForSendingOtpcode($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->sendOtpcode($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
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
    
    public function actionUserLog(){
        if(ComponentsHttp::httpMethod()=="PUT"){
            $inDtoArray = customparam :: checkRequestedParamKeyNamePresentInDtoFile($this->_inDtoArray);
            if($inDtoArray!='FALSE'){
                $paramDataArr = $inDtoArray['dkParamDataArr'];
                $paramKeyValueDataStatus = customparam :: checkParamDataForUserLog($paramDataArr);
                if($paramKeyValueDataStatus=='TRUE'){
                    $UsersServicesV1 = new UsersServicesV1();
                    $rspDetails = $UsersServicesV1->updateUserLog($paramDataArr);
                    ComponentsJson::GenerateJsonAndSend($rspDetails);
                }else{
                    commonfunction :: generateResponseDataForInvalidRequestParamKeyData();
                }
            }else{
                commonfunction :: generateResponseDataForInvalidRequestParamKey();
            }
        }
    }
    
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
