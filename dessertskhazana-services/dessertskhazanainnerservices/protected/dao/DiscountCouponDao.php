<?php

/**
* Description of DiscountCouponDao
* @author chirag 2016-08-13
*/

class DiscountCouponDao{
    
    // CJ defined this function 2016-08-28
    public static function getDiscountCouponSetupDetails($paramJson){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                dcg.id dcgId, dcg.code dcgCode, dcg.title dcgTitle,
                COALESCE(dcg.is_universally, 'N') isUniversallyAccepted,
                COALESCE(dcg.is_percentagebased, 'N') isPercentageBased,
                COALESCE(dcg.percentage_based, 0) percentageBased,
                COALESCE(dcg.is_cashback_based, 'N') isCashbackBased,
                COALESCE(dcg.cashback_based, 0) cashbackBased,
                COALESCE(dcg.above_orderamount, '') aboveOrderAmt,
                COALESCE((CASE WHEN dcg.for_userid IS NULL THEN 'N' ELSE 'Y' END), 'N') isDiscountCouponAvailableForLoggedUser,
                COALESCE(dcg.for_userid, '') userId,
                COALESCE(dcg.start_datedtime, '') startDateTime, COALESCE(dcg.end_datedtime, '') endDateTime,
                DATEDIFF(dcg.end_datedtime, dcg.start_datedtime) discountCouponValidNosDaysRemain
                FROM DK_DISCOUNTCOUPONGENERATION dcg
                WHERE 1
                AND dcg.status='A'";
                if(array_key_exists('discount_couponid', $paramJson)){
                    if($paramJson['discount_couponid']!='' && ($paramJson['discount_couponid'])>0){
                        $sql.=" AND dcg.id='".$paramJson['discount_couponid']."'";
                    }
                }
            $command = $connection->createCommand($sql);
            $discountCouponSetupDetailArr = $command->queryAll();
            if(count($discountCouponSetupDetailArr)>0 && $discountCouponSetupDetailArr!=false){
                $retResult =  $discountCouponSetupDetailArr;
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    
    // CJ defined this function 2016-08-13
    public static function getDiscountCouponAvailableForUser($userId=''){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                dcg.id dcgId,
                dcg.code dcgCode, 
                dcg.title dcgTitle,
                COALESCE(dcg.is_universally, 'N') isUniversallyAccepted,
                COALESCE(dcg.is_percentagebased, 'N') isPercentageBased,
                COALESCE(dcg.percentage_based, 0) percentageBased,
                COALESCE(dcg.is_cashback_based, 'N') isCashbackBased,
                COALESCE(dcg.cashback_based, 0) cashbackBased,
                COALESCE(dcg.above_orderamount, '') aboveOrderAmt,
                COALESCE((CASE WHEN dcg.for_userid IS NULL THEN 'N' ELSE 'Y' END), 'N') isDiscountCouponAvailableForLoggedUser,
                COALESCE(dcg.for_userid,'') forUserId
                FROM DK_DISCOUNTCOUPONGENERATION dcg
                LEFT JOIN DK_USERS u ON u.id=dcg.for_userid AND u.status='A' AND dcg.for_userid='$userId'
                WHERE 1
                AND dcg.status='A'
                AND CURDATE() BETWEEN dcg.start_datedtime AND dcg.end_datedtime";
            $command = $connection->createCommand($sql);
            $discountCouponDetailsArr = $command->queryAll();
            if(count($discountCouponDetailsArr)>0 && $discountCouponDetailsArr!=false){
                $result =  $discountCouponDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-08-26
    public static function getSharingDiscountCouponSetupListByUser($userId, $includeLimitation='Y'){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                    dcg.id dcgId, dcg.code dcgCode, dcg.title dcgTitle,
                    COALESCE(dcg.is_universally, 'N') isUniversallyAccepted,
                    COALESCE(dcg.is_percentagebased, 'N') isPercentageBased,
                    COALESCE(dcg.percentage_based, 0) percentageBased,
                    COALESCE(dcg.is_cashback_based, 'N') isCashbackBased,
                    COALESCE(dcg.cashback_based, 0) cashbackBased,
                    COALESCE(dcg.above_orderamount, '') aboveOrderAmt,
                    COALESCE((CASE WHEN dcg.for_userid IS NULL THEN 'N' ELSE 'Y' END), 'N') isDiscountCouponAvailableForLoggedUser,
                    COALESCE(dcg.for_userid,'') userId,
                    COALESCE(dcg.share_limit, 0) shareLimit,
                    COALESCE(DATE_FORMAT(dcg.end_datedtime,'%b %d %Y %h:%i %p'), '') expiredDateTime
                    FROM DK_DISCOUNTCOUPONGENERATION dcg
                    WHERE 1
                    AND dcg.status='A'
                    AND dcg.is_universally='N'
                    AND dcg.can_shareit='Y'
                    AND dcg.share_limit>0
                    AND dcg.for_userid='$userId'";
                    if($includeLimitation=='Y'){
                        $sql.=" AND NOW() BETWEEN dcg.start_datedtime AND dcg.end_datedtime
                            AND ( 
                                (dcg.is_percentagebased='Y' AND dcg.percentage_based>0 AND dcg.is_cashback_based='N' )
                                    OR
                                (dcg.is_cashback_based='Y' AND dcg.cashback_based>0 AND dcg.is_percentagebased='N')
                            )";
                    }
            $command = $connection->createCommand($sql);
            $sharingDiscountCouponSetupListByUser = $command->queryAll();
            if(count($sharingDiscountCouponSetupListByUser)>0 && $sharingDiscountCouponSetupListByUser!=false){
                $result =  $sharingDiscountCouponSetupListByUser;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-08-26
    public static function getCountUserSharedDiscountCoupon($userId, $discountCouponId){
        $countUserSharedDiscountCoupon = 0;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                    COALESCE(COUNT(*), 0) countUserSharedDiscountCoupon
                    FROM DK_USER_SHARED_DISCOUNTCOUPON usdc 
                    WHERE
                    usdc.sharedby_id='$userId'
                    AND usdc.discount_couponid='$discountCouponId'
                    AND usdc.status='S'";
            $command = $connection->createCommand($sql);
            $retDataArr = $command->queryAll();
            if(count($retDataArr)>0 && $retDataArr!=false){
                $countUserSharedDiscountCoupon =  $retDataArr[0]['countUserSharedDiscountCoupon'];
            }
        }catch(Exception $ex){
            $countUserSharedDiscountCoupon = 'FALSE';
        }
        return $countUserSharedDiscountCoupon;
    }
    
    // CJ defined this function 2016-08-26
    public static function getUserSharedDiscountCouponOtherUsersList($userId, $discountCouponId){
        $userSharedDiscountCouponOtherUsersList = 0;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                    COALESCE(usdc.shared_onmobile, '') sharedOnMobile,
                    COALESCE(usdc.shared_onemail, '') sharedOnEmail,
                    COALESCE(DATE_FORMAT(usdc.created_datedtime,'%b %d %Y %h:%i %p'), '') sharedOnDateTime
                    FROM DK_USER_SHARED_DISCOUNTCOUPON usdc 
                    WHERE
                    usdc.sharedby_id='$userId'
                    AND usdc.discount_couponid='$discountCouponId'
                    AND usdc.status='S'";
            $command = $connection->createCommand($sql);
            $retDataArr = $command->queryAll();
            if(count($retDataArr)>0 && $retDataArr!=false){
                $userSharedDiscountCouponOtherUsersList =  $retDataArr;
            }
        }catch(Exception $ex){}
        return $userSharedDiscountCouponOtherUsersList;
    }
    
    // CJ defined this function 2016-08-28
    public static function addSetupDiscountCouponGeneration($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('code', $paramJson)){
            if($paramJson['code']!=''){
                $sqlColumnNames.=" code,";
                $sqlValues.="'".$paramJson['code']."',";
            }
        }
        if(array_key_exists('title', $paramJson)){
            if($paramJson['title']!=''){
                $sqlColumnNames.=" title,";
                $sqlValues.="'".$paramJson['title']."',";
            }
        }
        if(array_key_exists('is_universally', $paramJson)){
            if($paramJson['is_universally']!=''){
                $sqlColumnNames.=" is_universally,";
                $sqlValues.="'".$paramJson['is_universally']."',";
            }
        }
        if(array_key_exists('is_percentagebased', $paramJson)){
            if($paramJson['is_percentagebased']!=''){
                $sqlColumnNames.=" is_percentagebased,";
                $sqlValues.="'".$paramJson['is_percentagebased']."',";
            }
        }
        if(array_key_exists('percentage_based', $paramJson)){
            if($paramJson['percentage_based']!=''){
                $sqlColumnNames.=" percentage_based,";
                $sqlValues.="'".$paramJson['percentage_based']."',";
            }
        }
        if(array_key_exists('is_cashback_based', $paramJson)){
            if($paramJson['is_cashback_based']!=''){
                $sqlColumnNames.=" is_cashback_based,";
                $sqlValues.="'".$paramJson['is_cashback_based']."',";
            }
        }
        if(array_key_exists('cashback_based', $paramJson)){
            if($paramJson['cashback_based']!=''){
                $sqlColumnNames.=" cashback_based,";
                $sqlValues.="'".$paramJson['cashback_based']."',";
            }
        }
        if(array_key_exists('start_datedtime', $paramJson)){
            if($paramJson['start_datedtime']!=''){
                $sqlColumnNames.=" start_datedtime,";
                $sqlValues.="'".$paramJson['start_datedtime']."',";
            }
        }
        if(array_key_exists('end_datedtime', $paramJson)){
            if($paramJson['end_datedtime']!=''){
                $sqlColumnNames.=" end_datedtime,";
                $sqlValues.="'".$paramJson['end_datedtime']."',";
            }
        }
        if(array_key_exists('above_orderamount', $paramJson)){
            if($paramJson['above_orderamount']!=''){
                $sqlColumnNames.=" above_orderamount,";
                $sqlValues.="'".$paramJson['above_orderamount']."',";
            }
        }
        if(array_key_exists('limit_used', $paramJson)){
            if($paramJson['limit_used']!=''){
                $sqlColumnNames.=" limit_used,";
                $sqlValues.="'".$paramJson['limit_used']."',";
            }
        }
        if(array_key_exists('for_userid', $paramJson)){
            if($paramJson['for_userid']!=''){
                $sqlColumnNames.=" for_userid,";
                $sqlValues.="'".$paramJson['for_userid']."',";
            }
        }
        if(array_key_exists('can_shareit', $paramJson)){
            if($paramJson['can_shareit']!=''){
                $sqlColumnNames.=" can_shareit,";
                $sqlValues.="'".$paramJson['can_shareit']."',";
            }
        }
        if(array_key_exists('share_limit', $paramJson)){
            if($paramJson['share_limit']!=''){
                $sqlColumnNames.=" share_limit,";
                $sqlValues.="'".$paramJson['share_limit']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if(array_key_exists('created_datedtime', $paramJson)){
            if($paramJson['created_datedtime']!=''){
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$paramJson['created_datedtime']."',";
            }
        }
        if(array_key_exists('status', $paramJson)){
            if($paramJson['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$paramJson['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_DISCOUNTCOUPONGENERATION " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    
    // CJ defined this function 2016-08-28
    public static function addUserSharedDiscountCoupon($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('discount_couponid', $paramJson)){
            if($paramJson['discount_couponid']!=''){
                $sqlColumnNames.=" discount_couponid,";
                $sqlValues.="'".$paramJson['discount_couponid']."',";
            }
        }
        if(array_key_exists('user_sessionid', $paramJson)){
            if($paramJson['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$paramJson['user_sessionid']."',";
            }
        }
        if(array_key_exists('sharedby_id', $paramJson)){
            if($paramJson['sharedby_id']!=''){
                $sqlColumnNames.=" sharedby_id,";
                $sqlValues.="'".$paramJson['sharedby_id']."',";
            }
        }
        if(array_key_exists('shared_onmobile', $paramJson)){
            if($paramJson['shared_onmobile']!=''){
                $sqlColumnNames.=" shared_onmobile,";
                $sqlValues.="'".$paramJson['shared_onmobile']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if(array_key_exists('created_datedtime', $paramJson)){
            if($paramJson['created_datedtime']!=''){
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$paramJson['created_datedtime']."',";
            }
        }
        if(array_key_exists('status', $paramJson)){
            if($paramJson['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$paramJson['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_USER_SHARED_DISCOUNTCOUPON " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    
}
