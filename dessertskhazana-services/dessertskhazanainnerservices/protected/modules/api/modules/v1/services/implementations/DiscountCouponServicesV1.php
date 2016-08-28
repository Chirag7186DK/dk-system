<?php

/**
* Description of DiscountCouponServicesV1
* @author CJ defined this service 2016-08-13
*/

class DiscountCouponServicesV1 implements IDiscountCouponServicesV1{

    // CJ defined this service 2016-08-28
    public function getUserSharingDiscountCouponList($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $userId = $userSessionDetailsData['unmd5UserId'];
                $retDataArr = commonfunction :: preparedDataToGetUserSharingDiscountCouponList($userId);
                if(count($retDataArr)>0 && $retDataArr!=false){
                    $rspDetails['userSharingAllDiscountCouponList'] = $retDataArr;
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this service 2016-08-28
    public function getUserSharedDiscountCouponList($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $userId = $userSessionDetailsData['unmd5UserId'];
                $retDataArr = commonfunction :: preparedDataToGetUserSharedDiscountCouponList($userId);
                if(count($retDataArr)>0 && $retDataArr!=false){
                    $rspDetails['userSharedAllDiscountCouponList'] = $retDataArr;
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this service 2016-08-28
    public function addSharingOffersFrmOneUserToOtherUser($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isOffersShared'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unMd5UserId = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['user_sessionid'] = $dkParamDataArr['user_sessionid'];
                $dkParamDataArr['sharedby_id'] = $unMd5UserId;
                $dkParamDataArr['created_by'] = $unMd5UserId;
                $dkParamDataArr['created_datedtime'] = date('Y-m-d H:i:s');
                $dkParamDataArr['status'] = 'S';
                // storing tracking shared offers data for other users
                $offerSharedDataStatus = DiscountCouponDao :: addUserSharedDiscountCoupon($dkParamDataArr);
                
                
                
            }
        } 
        return $rspDetails;
    }

}
