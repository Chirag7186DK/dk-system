<?php

/**
* Description of DiscountCouponDao
* @author chirag 2016-08-13
*/

class DiscountCouponDao{
    
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
                COALESCE(dcg.for_userid, '') forUserId
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
    public static function getUserSharingDiscountCouponList($userId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "";
            $command = $connection->createCommand($sql);
            $userSharingDiscountCouponListDetailsArr = $command->queryAll();
            if(count($userSharingDiscountCouponListDetailsArr)>0 && $userSharingDiscountCouponListDetailsArr!=false){
                $result =  $userSharingDiscountCouponListDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
}
