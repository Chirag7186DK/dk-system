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
                // fetch given discount coupon id setup details
                $fetchSDCouponParamData =  array();
                $fetchSDCouponParamData['discount_couponid'] = $dkParamDataArr['discount_couponid'];
                $discountCouponSetupDetailsArr = DiscountCouponDao :: getDiscountCouponSetupDetails($fetchSDCouponParamData);
                if(count($discountCouponSetupDetailsArr)==1 && $discountCouponSetupDetailsArr!=false){
                    $unMd5UserId = $userSessionDetailsData['unmd5UserId'];
                    $dkParamDataArr['user_sessionid'] = $dkParamDataArr['user_sessionid'];
                    $dkParamDataArr['sharedby_id'] = $unMd5UserId;
                    $dkParamDataArr['created_by'] = $unMd5UserId;
                    $dkParamDataArr['created_datedtime'] = date('Y-m-d H:i:s');
                    $dkParamDataArr['status'] = 'S';
                    // storing tracking shared offers data for other users
                    $lastInsertedIdOfferShared = DiscountCouponDao :: addUserSharedDiscountCoupon($dkParamDataArr);
                    if($lastInsertedIdOfferShared>0 && $lastInsertedIdOfferShared!=false){
                        // deciding discount coupon valid end datetime what will be while sharing offers to other users
                        $startDateObj = date_create(date('Y-m-d H:i:s'));
                        $nosOfDays = $discountCouponSetupDetailsArr[0]['discountCouponValidNosDaysRemain'];
                        $discountCouponValidEndDateTime = date_add($startDateObj, date_interval_create_from_date_string("$nosOfDays days"));
                        
                        $addSDCouponParamData =  array();
                        $addSDCouponParamData['code'] = $discountCouponSetupDetailsArr[0]['dcgCode'];
                        $addSDCouponParamData['title'] = $discountCouponSetupDetailsArr[0]['dcgTitle'];
                        $addSDCouponParamData['is_universally'] = 'N';
                        $addSDCouponParamData['is_percentagebased'] = $discountCouponSetupDetailsArr[0]['isPercentageBased'];
                        $addSDCouponParamData['percentage_based'] = $discountCouponSetupDetailsArr[0]['percentageBased'];
                        $addSDCouponParamData['is_cashback_based'] = $discountCouponSetupDetailsArr[0]['isCashbackBased'];
                        $addSDCouponParamData['cashback_based'] = $discountCouponSetupDetailsArr[0]['cashbackBased'];
                        $addSDCouponParamData['start_datedtime'] = date('Y-m-d H:i:s');
                        $addSDCouponParamData['end_datedtime'] = $discountCouponValidEndDateTime;
                        $addSDCouponParamData['above_orderamount'] = $discountCouponSetupDetailsArr[0]['aboveOrderAmt'];
                        $addSDCouponParamData['limit_used'] = '1';
                        $addSDCouponParamData['for_userid'] = '';
                        $addSDCouponParamData['can_shareit'] = 'N';
                        $addSDCouponParamData['share_limit'] = '0';
                        $addSDCouponParamData['created_by'] = $unMd5UserId;
                        $addSDCouponParamData['created_datedtime'] = date('Y-m-d H:i:s');
                        $addSDCouponParamData['status'] = 'A';
                        // storing discount coupon setup details
                        $lastInsertedIdSetupDiscountCoupon = DiscountCouponDao :: addSetupDiscountCouponGeneration($addSDCouponParamData);
                        if($lastInsertedIdSetupDiscountCoupon>0 && $lastInsertedIdSetupDiscountCoupon!=false){
                            $rspDetails['isOffersShared'] = 'TRUE';
                            // send sms to end user to inform about offers has been shared by his/her friends/colleagues
                            // $smsMsgBody = "Sms Testing CJ";
                            // $sharedOfferUsermobile = '9975967186';
                            // $retSmsSentStatus = utils :: sendSMS(array($sharedOfferUsermobile), $smsMsgBody);
                        }
                    }
                }
            }
        } 
        return $rspDetails;
    }

}
