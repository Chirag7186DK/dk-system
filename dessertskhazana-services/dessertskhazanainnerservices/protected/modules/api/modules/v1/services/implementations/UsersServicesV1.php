<?php

/**
* Description of UsersServicesV1
* @author CJ defined this service 2016-07-24
*/

class UsersServicesV1 implements IUsersServicesV1{
    
    // CJ defined this action 2016-08-06
    public function generateUserSessionId($paramDataArr){
        $rspDetails = array();
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userSessionId = commonfunction :: getUserSessionId();
            if($userSessionId!=false && strlen($userSessionId)>=20){
                $rspDetails['userSessionId'] = $userSessionId;
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-07-20
    public function addTrackUserInfoAccessingWebsitesDetails($paramDataArr){
        $rspDetails = array();
        $rspDetails["isTrackedUserInfoAccessingWebsites"] = 'NO';
        if(count($paramDataArr)>0 && $paramDataArr!='' && $paramDataArr!=false){
            $utawParamDetails = commonfunction :: prepareParamDataForTrackingUserInfoAccessingWebsites($paramDataArr);
            $lastUTAWId = UsersDao::addTrackUserInfoAccessingWebsitesDetails($utawParamDetails);
            if($lastUTAWId>0 && $lastUTAWId!=false){
                $rspDetails["isTrackedUserInfoAccessingWebsites"] = 'YES';
            }  
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-09-21
    public function userSignUpAuthentication($paramDataArr){
        $rspDetails = array();
        $rspDetails['msgStr'] = 'Email-Id is already associated with us !!!';
        $rspDetails['isOtpCodeSent'] = 'N';
        $rspDetails['isOtpCodeValidated'] = 'N';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            if($paramDataArr['EmailAuthAndOtpRequest']=='Y'){
                $rtDataArr1 = commonfunction :: handlingUserSignUpEmailAndOtpRequest($paramDataArr);
                $rspDetails = array_merge($rspDetails, $rtDataArr1);
                $rspDetails['name'] = $paramDataArr['name'];
                $rspDetails['email'] = $paramDataArr['email'];
                $rspDetails['mobile'] = $paramDataArr['mobile'];
            }else if($paramDataArr['validateOtpAndCreateAccountRequest']=='Y'){
                $rtDataArr1 = commonfunction :: handlingUserSignUpSentOtpcode($paramDataArr);
                if($rtDataArr1['isOtpCodeValidated']=='N'){
                    $rspDetails = array_merge($rspDetails, $rtDataArr1);
                    $rspDetails['name'] = $paramDataArr['name'];
                    $rspDetails['email'] = $paramDataArr['email'];
                    $rspDetails['mobile'] = $paramDataArr['mobile'];
                }else if($rtDataArr1['isOtpCodeValidated']=='Y'){
                    // creating new account 
                    $paramDataArr['pwd'] = $paramDataArr['pwd'];
                    $paramDataArr['profile_typeid'] = '2';
                    $lastInsertedUserId = UsersDao :: addUserDetails($paramDataArr);
                    if($lastInsertedUserId>0 && $lastInsertedUserId!=false){
                        $signInParamDataArr = array();
                        $signInParamDataArr['email'] = $paramDataArr['email'];
                        $signInParamDataArr['pwd'] = $paramDataArr['pwd'];
                        $signInParamDataArr['user_sessionid'] = $paramDataArr['user_sessionid'];
                        $signInParamDataArr['usersession_starttimestamp'] = $paramDataArr['usersession_starttimestamp'];
                        $signInParamDataArr['usedOtpcodeId'] = $rtDataArr1['usedOtpcodeId'];
                        // fetching user signin details about creating new account
                        $rtDataArr2 = commonfunction :: makeUserAccountActiveAsSignedIn($signInParamDataArr);
                        if($rtDataArr2['userDetails']['isUserAccountActive']=='Y'){
                            $rspDetails = array_merge($rspDetails, $rtDataArr2);
                            $rspDetails['isOtpCodeSent'] = 'Y';
                            $rspDetails['isOtpCodeValidated'] = 'Y';
                        }
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-09-24
    public function userSignInAuthentication($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid account details !!!';
        $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            if($paramDataArr['isRequestCheckingCreditional']=='Y'){
                // checking user account is active or not
                $rtDataArr1 = commonfunction :: handlingUserSignInAuthentication($paramDataArr);
                if($rtDataArr1['userDetails']['isUserAccountActive']=='Y'){
                    // preparing sending otp code data
                    $sendingOtpParamDataArr = array();
                    $sendingOtpParamDataArr['user_sessionid'] = $paramDataArr['user_sessionid'];
                    $sendingOtpParamDataArr['name'] = $rtDataArr1['userDetails']['name'];
                    $sendingOtpParamDataArr['email'] = $paramDataArr['email'];
                    $sendingOtpParamDataArr['mobile'] = $rtDataArr1['userDetails']['mobile'];
                    $sendingOtpParamDataArr['pwd'] = $paramDataArr['pwd'];
                    $rtDataArr2 = commonfunction :: handlingUserSigInAndOtpRequest($sendingOtpParamDataArr);
                    if($rtDataArr2['userDetails']['isOtpCodeSent']=='Y'){
                        $rspDetails['userDetails']['isOtpCodeSent'] = 'Y';
                        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
                        $rspDetails['userDetails']['msgStr'] = $rtDataArr2['userDetails']['msgStr'];
                    }else{
                        $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
                        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
                        $rspDetails['userDetails']['msgStr'] = $rtDataArr2['userDetails']['msgStr'];
                    }
                    $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                    $rspDetails['userDetails']['name'] = $rtDataArr1['userDetails']['name'];
                    $rspDetails['userDetails']['email'] = $paramDataArr['email'];
                    $rspDetails['userDetails']['mobile'] = $rtDataArr1['userDetails']['mobile'];
                    $rspDetails['userDetails']['pwd'] = $paramDataArr['pwd'];
                }else{
                    $rspDetails = array_merge($rspDetails, $rtDataArr1);
                    $rspDetails['userDetails']['isUserAccountActive'] = 'N';
                    $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
                    $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
                }
            }else if($paramDataArr['isRequestValidateOtpAndUserSignedIn']=='Y'){
                $rtDataArr3 = commonfunction :: handlingUserSignInSentOtpcode($paramDataArr);
                if($rtDataArr3['userDetails']['isOtpCodeValidated']=='N'){
                    $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                    $rspDetails['userDetails']['isOtpCodeSent'] = 'Y';
                    $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
                    $rspDetails['userDetails']['msgStr'] = $rtDataArr3['userDetails']['msgStr'];
                    $rspDetails['userDetails']['name'] = $paramDataArr['name'];
                    $rspDetails['userDetails']['email'] = $paramDataArr['email'];
                    $rspDetails['userDetails']['mobile'] = $paramDataArr['mobile'];
                    $rspDetails['userDetails']['pwd'] = $paramDataArr['pwd'];
                }else if($rtDataArr3['userDetails']['isOtpCodeValidated']=='Y'){
                    $paramDataArr['usedOtpcodeId'] = $rtDataArr3['userDetails']['usedOtpcodeId'];
                    $rtDataArr4 = commonfunction :: makeUserAccountActiveAsSignedIn($paramDataArr);
                    $rspDetails = array_merge($rspDetails, $rtDataArr4);
                    $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                    $rspDetails['userDetails']['isOtpCodeSent'] = 'Y';
                    $rspDetails['userDetails']['isOtpCodeValidated'] = 'Y';
                }
            }
        } 
        return $rspDetails;
    }
    
    
    // CJ defined this action 2016-09-25
    public function userForgotPwdAuthentication($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'N';
        $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
        $rspDetails['userDetails']['isPasswordChanged'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid account details !!!';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            if($paramDataArr['isRequestCheckingCreditional']=='Y'){
                $rtDataArr1 = commonfunction :: handlingUserForgotPwdEmailAndOtpRequest($paramDataArr);
                if($rtDataArr1['userDetails']['isUserAccountActive']=='Y'){
                    $rspDetails = array_merge($rspDetails, $rtDataArr1);
                    $rspDetails['userDetails']['email'] = $paramDataArr['email'];
                    $rspDetails['userDetails']['isPasswordChanged'] = 'N';
                }else if($rtDataArr1['userDetails']['isUserAccountActive']=='N'){
                    $rspDetails = array_merge($rspDetails, $rtDataArr1);
                    $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
                    $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
                    $rspDetails['userDetails']['email'] = $paramDataArr['email'];
                    $rspDetails['userDetails']['isPasswordChanged'] = 'N';
                }
            }else if($paramDataArr['isRequestValidateOtp']=='Y'){
                $rtDataArr2 = commonfunction :: handlingUserForgotPwdSentOtpcode($paramDataArr);
                if($rtDataArr2['userDetails']['isOtpCodeValidated']=='N'){
                    $rspDetails = array_merge($rspDetails, $rtDataArr2);
                    $rspDetails['userDetails']['email'] = $paramDataArr['email'];
                    $rspDetails['userDetails']['isPasswordChanged'] = 'N';
                }else if($rtDataArr2['userDetails']['isOtpCodeValidated']=='Y'){
                    $rspDetails = array_merge($rspDetails, $rtDataArr2);
                    $rspDetails['userDetails']['email'] = $paramDataArr['email'];
                    $rspDetails['userDetails']['isPasswordChanged'] = 'N';
                }
            }else if($paramDataArr['isRequestUpdatePwd']=='Y'){
                $userId = $paramDataArr['tokenId'];
                if($userId>0 && $userId!=false){
                    $updateUserDataParam = array();
                    $updateUserDataParam['user_id'] = $userId;
                    $updateUserDataParam['updated_by'] = $userId;
                    $updateUserDataParam['pwd'] = MD5($paramDataArr['pwd']);
                    $uptdPwdDataStatus = UsersDao :: updateUserPersonalInfoData($updateUserDataParam);
                    if($uptdPwdDataStatus==true){
                        $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                        $rspDetails['userDetails']['isOtpCodeSent'] = 'Y';
                        $rspDetails['userDetails']['isOtpCodeValidated'] = 'Y';
                        $rspDetails['userDetails']['isPasswordChanged'] = 'Y';
                        $rspDetails['userDetails']['msgStr'] = 'Your password is updated !!!';
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-01
    public function sendOtpcodeOnUserAccount($paramDataArr){
        $rspDetails = array();
        $rspDetails['isOtpcodeSent'] = 'FALSE';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            
            if($paramDataArr['purposetype']=='resendForSignIn'){
                $paramDataArr['otpcode'] = trim(utils :: getRandomOtpcode('6'));
                $paramDataArr['sent_onmedium'] = "mobile";
                $lastInsertedId = UsersDao :: addUserOtpcodeDetails($paramDataArr);
                $rtSmsSentStatus = commonfunction :: prepareAndSendOtpcodeMsgToSignInUserAccount(
                    $paramDataArr['mobile'], $paramDataArr['otpcode']    
                );
                $rspDetails['isOtpcodeSent'] = 'TRUE';
            }
            
            if($paramDataArr['purposetype']=='resendForSignUp'){
                $paramDataArr['otpcode'] = trim(utils :: getRandomOtpcode('6'));
                $paramDataArr['sent_onmedium'] = "mobile";
                $lastInsertedId = UsersDao :: addUserOtpcodeDetails($paramDataArr);
                $rtSmsSentStatus = commonfunction :: prepareAndSendOtpcodeMsgToSignUpUserAccount(
                    $paramDataArr['mobile'], $paramDataArr['otpcode']    
                );
                $rspDetails['isOtpcodeSent'] = 'TRUE';
            }
            
            if($paramDataArr['purposetype']=='resendForFrgtPwd'){
                if(array_key_exists('tokenId', $paramDataArr)){
                    if(validation::isValidNumberic($paramDataArr['tokenId'])=='TRUE'){
                        $authParamData = array();
                        $authParamData['email'] = $paramDataArr['email'];
                        $authParamData['user_id'] = $paramDataArr['tokenId'];
                        $authenticatedUserData = UsersDao :: getUserDetails($authParamData);
                        if(count($authenticatedUserData)>0 && $authenticatedUserData!=false){
                            $paramDataArr['otpcode'] = trim(utils :: getRandomOtpcode('6'));
                            $paramDataArr['user_id'] = "mobile";
                            $paramDataArr['mobile'] = $authenticatedUserData[0]['userMobile'];
                            $paramDataArr['name'] = $authenticatedUserData[0]['userName'];
                            $paramDataArr['user_id'] = $paramDataArr['tokenId'];
                            $paramDataArr['sent_onmedium'] = "mobile";
                            $lastInsertedId = UsersDao :: addUserOtpcodeDetails($paramDataArr);
                            $rtSmsSentStatus = commonfunction :: prepareAndSendOtpcodeMsgToUserAccountForForgotPwd(
                                $paramDataArr['mobile'], $paramDataArr['otpcode']    
                            );
                            $rspDetails['isOtpcodeSent'] = 'TRUE';
                        }
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-01
    public function getUserDashboardSummaryDataDetails($paramDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $userProfileTypeId = $userSessionDetailsData['unmd5ProfileTypeId'];
                $userProfileType = strtolower($userSessionDetailsData['profile_type']);
                // detected user profile type is customer then fetch info
                if($userProfileTypeId=='2' && $userProfileType=='customer'){
                    // collect authenticated user as customer dashboard summary related data
                    $rspDetails = commonfunction :: getUserAsCustomerDashboardSummaryDataDetails($userSessionDetailsData);
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this action 2016-08-21
    public function getUserPersonalInfoData($paramDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $rspDetails['userPersonalDetails'] = array();
                $rspDetails['userPersonalDetails']['name'] = $userSessionDetailsData['userName'];
                $rspDetails['userPersonalDetails']['mobile'] = $userSessionDetailsData['userMobile'];
                $rspDetails['userPersonalDetails']['email'] = $userSessionDetailsData['userEmail'];
                $rspDetails['userPersonalDetails']['gender'] = $userSessionDetailsData['userGender'];
                $rspDetails['userPersonalDetails']['birthdate'] = $userSessionDetailsData['userBirthdate'];
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-21
    public function updateUserPersonalInfoData($paramDataArr){
        $rspDetails = array();
        $rspDetails['isUserprofileInfoUpdated'] = 'FALSE';
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $paramDataArr['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $paramDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
                $updateProfileInfoDataStatus = UsersDao :: updateUserPersonalInfoData($paramDataArr);
                if($updateProfileInfoDataStatus==true){
                    $rspDetails['isUserprofileInfoUpdated'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this action 2016-08-21
    public function updateUserPasswordInfoData($paramDataArr){
        $rspDetails = array();
        $rspDetails['userpwdChangedStatusDetails'] = array();
        $rspDetails['userpwdChangedStatusDetails']['ispwdChanged'] = 'FALSE';
        $rspDetails['userpwdChangedStatusDetails']['statusMsg'] = 'Your password is not change, please try again !';
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $paramDataArr['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $paramDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
                $paramDataArr['pwd'] = MD5($paramDataArr['new_password']);
                $updatedPasswordDataStatus = UsersDao :: updateUserPersonalInfoData($paramDataArr);
                if($updatedPasswordDataStatus==true){
                    $rspDetails['userpwdChangedStatusDetails']['ispwdChanged'] = 'TRUE';
                    $rspDetails['userpwdChangedStatusDetails']['statusMsg'] = 'Your password is changed successfully !';
                }
            }else{
                $rspDetails['userpwdChangedStatusDetails']['ispwdChanged'] = 'FALSE';
                $rspDetails['userpwdChangedStatusDetails']['statusMsg'] = 'Given old password is not matching, please enter valid password !';
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-30
    public function updateUserLog($paramDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            if(array_key_exists('isRequestActivationTimeUpdation', $paramDataArr)){
                if($paramDataArr['isRequestActivationTimeUpdation']=='Y'){
                    $rspDetails['isActivationTimeUpdateUserSession'] = 'N';
                    $rtUpdatedStatus = UsersDao :: updateActivationTimeUserSession(
                        $paramDataArr['udblogId'], $paramDataArr['user_sessionid']
                    );
                    if($rtUpdatedStatus=='TRUE'){
                        $rspDetails['isActivationTimeUpdateUserSession'] = 'Y';
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-30
    public function userLogoutFromWebsites($paramDataArr){
        $rspDetails = array();
        $rspDetails['isUserLogoutFromWebsites'] = 'FALSE';
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $udblogId = $userSessionDetailsData['userLogId'];
                $userSessionId = $userSessionDetailsData['user_sessionid'];
                $logoutStatus = UsersDao :: userLogoutFromWebsites($udblogId, $userSessionId);
                if($logoutStatus=='TRUE'){
                    $rspDetails['isUserLogoutFromWebsites'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }

    
}
