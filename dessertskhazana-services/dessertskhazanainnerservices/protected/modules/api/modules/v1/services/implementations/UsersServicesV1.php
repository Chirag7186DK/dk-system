<?php

/**
* Description of UsersServicesV1
* @author CJ defined this service 2016-07-24
*/

class UsersServicesV1 implements IUsersServicesV1{
    
    // CJ defined this action 2016-07-20
    public function addTrackUserInfoAccessingWebsitesDetails($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["isTrackedUserInfoAccessingWebsites"] = 'NO';
        // check requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            $utawParamDetails = commonfunction :: prepareParamDataForTrackingUserInfoAccessingWebsites($dkParamDataArr);
            $lastUTAWId = UsersDao::addTrackUserInfoAccessingWebsitesDetails($utawParamDetails);
            if($lastUTAWId>0 && $lastUTAWId!=false){
                $rspDetails["isTrackedUserInfoAccessingWebsites"] = 'YES';
            }  
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this action 2016-08-06
    public function generateUserSessionId($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionId = commonfunction :: getUserSessionId();
            if($userSessionId!=false && strlen($userSessionId)>7){
                $rspDetails['userSessionId'] = $userSessionId;
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-09-21
    public function userSignUpAuthentication($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isOtpCodeSent'] = 'N';
        $isSendOtpCode = 'N';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userEmailParamData = array();
            $userEmailParamData['encoded_email'] = $dkParamDataArr['encoded_email'];
            $userEmailParamData['status'] = "'A','Z'";
            $dataArr1 = UsersDao :: getUserDetails($userEmailParamData);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // sorting on status based
                $sortedOnStatusDataArr = utils::arraySort($dataArr1);
                if(array_key_exists('A', $sortedOnStatusDataArr)==true){
                    if(count($sortedOnStatusDataArr['A'])>1){
                        $rspDetails['userDetails']['msgStr'] = 'Email-Id is already associated with us !!!';
                    }else if(count($sortedOnStatusDataArr['A'])==1){
                        $isSendOtpCode = 'Y';
                    }
                }else if(array_key_exists('Z', $sortedOnStatusDataArr)==true){
                    if(count($sortedOnStatusDataArr['Z'])==1){
                        $rspDetails['userDetails']['msgStr'] = 'Email-Id is already associated with us but your account is inactive, please call customer care no.s to make account active !!!';
                    }
                }
            }else{
                $isSendOtpCode = 'Y';
            }
            // sending otp code and storing purpose
            if($isSendOtpCode=='Y'){
                $mobile = $userEmailParamData['encoded_mobile'];
                $otpCode = '111';
                $dkParamDataArr['otpcode'] = $otpCode;
                // storing otp code
                $statusOtpcodeStored = UsersDao :: addUserOtpcodeDetails($dkParamDataArr);
                // sending otp code
                $smsSentStatus = commonfunction :: preparedOtpcodeDataSendingToSignUpUserMobile($mobile, $otpCode);
                $rspDetails['userDetails']['msgStr'] = "Enter One Time Password (OTP) sent to your mobile number $mobile";
                $rspDetails['userDetails']['isOtpCodeSent'] = "Y";
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-01 & use for user signIn purpose 
    public function checkUserAuthentication($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid account details !';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $dkParamDataArr['status'] = "'A','Z'";
            $userAuthenticationDetailsArr = UsersDao :: getUserDetails($dkParamDataArr);
            if(count($userAuthenticationDetailsArr)==1 && $userAuthenticationDetailsArr!=false){
                $userStatus = $userAuthenticationDetailsArr[0]['userStatus'];
                if($userStatus=='Z'){
                    $rspDetails['userDetails']['isUserAccountActive'] = 'N';
                    $rspDetails['userDetails']['msgStr'] = 'Your account is inactive, please call customer care no.s to make account active !';
                }else{
                    $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                    $rspDetails['userDetails']['msgStr'] = 'Authenticated user accessing web-app !';
                    // store user info as login status
                    $lastInsertedUserInfoLogNo = commonfunction :: preparedDataToStoreInfoAbtUserAsLog($userAuthenticationDetailsArr[0], $dkParamDataArr);
                    if($lastInsertedUserInfoLogNo!=false && $lastInsertedUserInfoLogNo!=''){
                        $rspDetails['userDetails']['udblogId'] = $lastInsertedUserInfoLogNo;
                        $rspDetails['userDetails']['user_sessionid'] = $dkParamDataArr['user_sessionid'];
                        $rspDetails['userDetails']['usersession_starttimestamp'] = $dkParamDataArr['usersession_starttimestamp'];
                        $rspDetails['userDetails']['userProfileTypeId'] = $userAuthenticationDetailsArr[0]['unmd5ProfileTypeId'];
                    }
                }
            }else{
                $rspDetails['userDetails']['msgStr'] = 'Invalid account details !';
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-01
    public function getUserDashboardSummaryDataDetails($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
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
    public function getUserPersonalInfoData($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
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
    public function updateUserPersonalInfoData($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isUserprofileInfoUpdated'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
                $updateProfileInfoDataStatus = UsersDao :: updateUserPersonalInfoData($dkParamDataArr);
                if($updateProfileInfoDataStatus==true){
                    $rspDetails['isUserprofileInfoUpdated'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this action 2016-08-21
    public function updateUserPasswordInfoData($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['userpwdChangedStatusDetails'] = array();
        $rspDetails['userpwdChangedStatusDetails']['ispwdChanged'] = 'FALSE';
        $rspDetails['userpwdChangedStatusDetails']['statusMsg'] = 'Your password is not change, please try again !';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['pwd'] = MD5($dkParamDataArr['new_password']);
                $updatedPasswordDataStatus = UsersDao :: updateUserPersonalInfoData($dkParamDataArr);
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
    public function userLogoutFromWebsites($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isUserLogoutFromWebsites'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
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
