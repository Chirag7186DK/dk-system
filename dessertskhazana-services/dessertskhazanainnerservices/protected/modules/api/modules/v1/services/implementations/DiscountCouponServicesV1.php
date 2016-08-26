<?php

/**
* Description of DiscountCouponServicesV1
* @author CJ defined this service 2016-08-13
*/

class DiscountCouponServicesV1 implements IDiscountCouponServicesV1{

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

}
