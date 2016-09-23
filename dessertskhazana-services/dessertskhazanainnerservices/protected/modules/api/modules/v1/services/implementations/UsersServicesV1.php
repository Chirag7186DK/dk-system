<?php

/**
* Description of UsersServicesV1
* @author CJ defined this service 2016-07-24
*/

class UsersServicesV1 implements IUsersServicesV1{
    
    // CJ defined this action 2016-07-20
    public function addTrackUserInfoAccessingWebsitesDetails($paramDataArr){
        $rspDetails = array();
        $rspDetails["isTrackedUserInfoAccessingWebsites"] = 'NO';
        // check requested param data
        if(count($paramDataArr)>0 && $paramDataArr!='' && $paramDataArr!=false){
            $utawParamDetails = commonfunction :: prepareParamDataForTrackingUserInfoAccessingWebsites($paramDataArr);
            $lastUTAWId = UsersDao::addTrackUserInfoAccessingWebsitesDetails($utawParamDetails);
            if($lastUTAWId>0 && $lastUTAWId!=false){
                $rspDetails["isTrackedUserInfoAccessingWebsites"] = 'YES';
            }  
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this action 2016-08-06
    public function generateUserSessionId($paramDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userSessionId = commonfunction :: getUserSessionId();
            if($userSessionId!=false && strlen($userSessionId)>7){
                $rspDetails['userSessionId'] = $userSessionId;
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
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            if(array_key_exists('EmailAuthAndOtpRequest', $paramDataArr)){
                if($paramDataArr['EmailAuthAndOtpRequest']=='Y'){
                    $rtDataArr1 = commonfunction :: handlingUserSignUpEmailAndOtpRequest($paramDataArr);
                    $rspDetails = array_merge($rspDetails, $rtDataArr1);
                }
            }else if(array_key_exists('validateOtpAndCreateAccountRequest', $paramDataArr)){
                if($paramDataArr['validateOtpAndCreateAccountRequest']=='Y'){
                    $rtDataArr1 = commonfunction :: handlingUserSignUpSentOtpcode($paramDataArr);
                    if($rtDataArr1['isOtpCodeValidated']=='N'){
                        $rspDetails = array_merge($rspDetails, $rtDataArr1);
                    }else if($rtDataArr1['isOtpCodeValidated']=='Y'){
                        // creating new account 
                        $paramDataArr['pwd'] = MD5($paramDataArr['pwd']);
                        $paramDataArr['profile_typeid'] = '2';
                        $lastInsertedUserId = UsersDao :: addUserDetails($paramDataArr);
                        if($lastInsertedUserId>0 && $lastInsertedUserId!=false){
                            $rspDetails['msgStr'] = 'Your account has been created !!!';
                            $rspDetails['isOtpCodeSent'] = 'Y';
                            $rspDetails['isOtpCodeValidated'] = 'Y';
                            $signInParamDataArr = array();
                            $signInParamDataArr['email'] = $paramDataArr['email'];
                            $signInParamDataArr['pwd'] = $paramDataArr['pwd'];
                            $signInParamDataArr['user_sessionid'] = $paramDataArr['user_sessionid'];
                            $signInParamDataArr['usersession_starttimestamp'] = $paramDataArr['usersession_starttimestamp'];
                            // fetching user signin details about creating new account
                            $rtDataArr2 = commonfunction :: handlingUserSignInAuthentication($signInParamDataArr);
                            $rspDetails = array_merge($rspDetails, $rtDataArr2);
                        }
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-01 & use for user signIn purpose 
    public function userSignInAuthentication($paramDataArr){
        $rspDetails = array();
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $rspDetails = commonfunction :: handlingUserSignInAuthentication($paramDataArr);
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
