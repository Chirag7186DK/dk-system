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
                    $retLastInsertedUserInfoLogId = commonfunction :: preparedDataToStoreInfoAbtUserAsLog($userAuthenticationDetailsArr[0], $dkParamDataArr);
                    if($retLastInsertedUserInfoLogId>0 && $retLastInsertedUserInfoLogId!=false){
                        $rspDetails['userDetails']['udblogId'] = MD5($retLastInsertedUserInfoLogId);
                        $rspDetails['userDetails']['user_sessionid'] = $dkParamDataArr['user_sessionid'];
                        $rspDetails['userDetails']['user_sessionstarttime'] = $dkParamDataArr['user_sessionstarttime'];
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
   
}
