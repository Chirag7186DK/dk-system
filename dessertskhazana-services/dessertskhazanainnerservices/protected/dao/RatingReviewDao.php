<?php

/**
* Description of ReviewDao
* @author chirag
*/

class RatingReviewDao{
    
    // CJ defined this function 2016-08-06
    public static function addUserRatingReviewAbtProduct($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('shopstore_id', $paramJson)){
            if($paramJson['shopstore_id']!=''){
                $sqlColumnNames.=" shopstore_id,";
                $sqlValues.="'".$paramJson['shopstore_id']."',";
            }
        }
        if(array_key_exists('user_id', $paramJson)){
            if($paramJson['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$paramJson['user_id']."',";
            }
        }
        if(array_key_exists('product_listid', $paramJson)){
            if($paramJson['product_listid']!=''){
                $sqlColumnNames.=" product_listid,";
                $sqlValues.="'".$paramJson['product_listid']."',";
            }
        }
        if(array_key_exists('question_id', $paramJson)){
            if($paramJson['question_id']!=''){
                $sqlColumnNames.=" question_id,";
                $sqlValues.="'".$paramJson['question_id']."',";
            }
        }
        if(array_key_exists('given_answerpoints', $paramJson)){
            if($paramJson['given_answerpoints']!=''){
                $sqlColumnNames.=" given_answerpoints,";
                $sqlValues.="'".$paramJson['given_answerpoints']."',";
            }
        }
        if(array_key_exists('given_answertext', $paramJson)){
            if($paramJson['given_answertext']!=''){
                $sqlColumnNames.=" given_answertext,";
                $sqlValues.="'".$paramJson['given_answertext']."',";
            }
        }
        if(array_key_exists('answer_pattern', $paramJson)){
            if($paramJson['answer_pattern']!=''){
                $sqlColumnNames.=" answer_pattern,";
                $sqlValues.="'".$paramJson['answer_pattern']."',";
            }
        }
        if(array_key_exists('group_no', $paramJson)){
            if($paramJson['group_no']!=''){
                $sqlColumnNames.=" group_no,";
                $sqlValues.="'".$paramJson['group_no']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $paramJson['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$paramJson['created_datedtime']."',";
            $sqlQuery = " INSERT INTO DK_USER_REVIEWANSWERDETAILS " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    
    // CJ defined this function 2016-05-22
    public static function getRatingReviewQuestionsAboutProductByShopStores($shop_storeid){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COALESCE(rqd.id, '') reviewQuestionId,
                COALESCE(rqd.shopstore_id, '') shopStoreId,
                rqd.question_title questionTitle, 
                rqd.question_answerpattern questionPattern,
                COALESCE(rqd.max_points, '0') maxPoints
                FROM DK_REVIEWQESTIONSDETAILS rqd 
                WHERE 
                rqd.shopstore_id='$shop_storeid'
                AND rqd.status='A'
                ORDER BY rqd.sort_order ASC";
            $command = $connection->createCommand($sqlFetchQuery);
            $retRatingReviewQuestionsAboutProductByShopStoresDetailsArr = $command->queryAll();
            if(count($retRatingReviewQuestionsAboutProductByShopStoresDetailsArr)>0 
                && $retRatingReviewQuestionsAboutProductByShopStoresDetailsArr!=false){
                $retResult =  $retRatingReviewQuestionsAboutProductByShopStoresDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    } 
    
    // CJ defined this function 2016-05-23
    public static function getTotalRatingAboutShopStores($shopStoreId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COUNT(DISTINCT urd.group_no) totalUserRatingAbtProduct,
                COALESCE(
                    ROUND(((CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 
                            THEN SUM(urd.given_answerpoints) ELSE 0 END
                        )/COUNT( DISTINCT urd.group_no)/5),1)
                , '') totalAvgRatingAbtProduct
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                WHERE 
                urd.status='A' AND urd.group_no IS NOT NULL AND qrd.status='A'
                AND urd.shopstore_id='$shopStoreId'
                AND urd.answer_pattern='SELECT'       
                HAVING COUNT(DISTINCT urd.group_no)>0 ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retAvgRatingProductDetailsArr = $command->queryAll();
            if(count($retAvgRatingProductDetailsArr)>0 
                && $retAvgRatingProductDetailsArr!=false){
                $retResult =  $retAvgRatingProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    
    // CJ defined this function 2016-05-23
    public static function getAvgRatingAboutProductDetails($shopStoreId, $productListId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COUNT(DISTINCT urd.group_no) totalUserRatingAbtProduct,
                COALESCE(
                    ROUND(((CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 
                            THEN SUM(urd.given_answerpoints) ELSE 0 END
                        )/COUNT( DISTINCT urd.group_no)/5),1)
                , '') totalAvgRatingAbtProduct
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                WHERE 
                urd.status='A' AND urd.group_no IS NOT NULL AND qrd.status='A'
                AND urd.shopstore_id='$shopStoreId'
                AND urd.product_listid='$productListId' 
                AND urd.answer_pattern='SELECT'    
                HAVING COUNT(DISTINCT urd.group_no)>0 ";
            $command = $connection->createCommand($sqlFetchQuery);
            $avgRatingProductDetailsArr = $command->queryAll();
            if($avgRatingProductDetailsArr!=false && count($avgRatingProductDetailsArr)>0){
                $retResult =  $avgRatingProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-05-25
    public static function getMaxRatingAboutShopStore($shopStoreId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT 
                COUNT(DISTINCT urd.group_no) countUser,
                COALESCE(qrd.id, '') questionId,
                COALESCE(qrd.question_title, '') questionTitle,
                COALESCE(qrd.max_points, '') maxPoints,
                COALESCE(urd.given_answerpoints, 0) givenMaxAnswerPoints
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                JOIN DK_USERS u ON u.id=urd.user_id
                WHERE 
                urd.status='A' AND qrd.status='A' AND urd.group_no IS NOT NULL 
                AND urd.shopstore_id ='$shopStoreId'
                AND qrd.question_answerpattern='SELECT'
                GROUP BY qrd.id, COALESCE(urd.given_answerpoints, 0)
                ORDER BY qrd.sort_order ASC, COALESCE(urd.given_answerpoints, 0) DESC";
            $command = $connection->createCommand($sqlFetchQuery);
            $retMaxRatingProductDetailsArr = $command->queryAll();
            if(count($retMaxRatingProductDetailsArr)>0 
                && $retMaxRatingProductDetailsArr!=false){
                $retResult =  $retMaxRatingProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    
    // CJ defined this function 2016-05-25
    public static function getMaxRatingAboutProductDetails($shopStoreId, $productListId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT 
                COUNT(DISTINCT urd.group_no) countUser,
                COALESCE(qrd.id, '') questionId,
                COALESCE(qrd.question_title, '') questionTitle,
                COALESCE(qrd.max_points, '') maxPoints,
                COALESCE(urd.given_answerpoints, 0) givenMaxAnswerPoints
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                JOIN DK_USERS u ON u.id=urd.user_id
                WHERE 
                urd.status='A' AND qrd.status='A' AND urd.group_no IS NOT NULL 
                AND urd.shopstore_id='$shopStoreId'
                AND urd.product_listid='$productListId'
                AND qrd.question_answerpattern='SELECT'
                GROUP BY qrd.id, COALESCE(urd.given_answerpoints, 0)
                ORDER BY qrd.sort_order ASC, COALESCE(urd.given_answerpoints, 0) DESC";
            $command = $connection->createCommand($sqlFetchQuery);
            $retMaxRatingProductDetailsArr = $command->queryAll();
            if(count($retMaxRatingProductDetailsArr)>0 && $retMaxRatingProductDetailsArr!=false){
                $retResult =  $retMaxRatingProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    
    // CJ defined this function 2016-05-23
    public static function getUserAvgRatingAboutProductDetails($shopStoreId, $productListId=''){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COALESCE(urd.shopstore_id, '') shopStoreId,
                COALESCE(urd.user_id, '') userId,
                COALESCE(urd.product_listid, '') productListId,
                COALESCE(urd.group_no, '') groupNo,
                (CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 THEN SUM(urd.given_answerpoints) ELSE 0 END) totalRatingByUser,
                COALESCE(
                    ROUND((CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 THEN SUM(urd.given_answerpoints) ELSE 0 END)/5, 1)
                , '') avgRatingByUser
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                WHERE 
                urd.status='A' AND qrd.status='A' AND urd.group_no IS NOT NULL 
                AND qrd.question_answerpattern='SELECT'
                AND urd.shopstore_id='$shopStoreId' AND qrd.shopstore_id='$shopStoreId' ";
                if($productListId!=''){
                    $sqlFetchQuery.= " AND urd.product_listid='$productListId' ";
                }    
            $sqlFetchQuery.= " GROUP BY urd.group_no ORDER BY urd.updated_datedtime DESC ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retUserAvgRatingAboutProductDetailsArr = $command->queryAll();
            if(count($retUserAvgRatingAboutProductDetailsArr)>0 
                && $retUserAvgRatingAboutProductDetailsArr!=false){
                $retResult =  $retUserAvgRatingAboutProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-05-23
    public static function getUserReviewAndRatingAboutProductDetails($shopStoreId, $productListId, $userId, $groupNo){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                CONCAT(u.name, '') userName,
                COALESCE(qrd.question_title, '') questionTitle,
                COALESCE(qrd.max_points, '') maxPoints,
                COALESCE(urd.given_answerpoints, '') givenAnswerPoints,
                COALESCE(qrd.question_answerpattern, '') answerPattern,
                COALESCE(urd.given_answertext, '') answerText,
                COALESCE(DATE_FORMAT(urd.updated_datedtime, '%M-%d-%Y (%H:%i:%s)'), '') updatedDate
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                JOIN DK_USERS u ON u.id=urd.user_id
                WHERE 
                urd.status='A' AND qrd.status='A' AND urd.group_no IS NOT NULL 
                AND urd.shopstore_id='$shopStoreId'
                AND urd.product_listid='$productListId'
                AND urd.user_id='$userId'
                AND qrd.question_answerpattern='SELECT'    
                AND urd.group_no = '$groupNo' 
                ORDER BY urd.updated_datedtime DESC ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retReviewedAboutProductDetailsArr = $command->queryAll();
            if(count($retReviewedAboutProductDetailsArr)>0 && $retReviewedAboutProductDetailsArr!=false){
                $retResult =  $retReviewedAboutProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-08-06
    public static function getMaxUserGrpNoFromRatingReviewAbtProduct(){
        $maxUserGrpNo = 1;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT MAX(urd.group_no) maxUserGrpNo
                FROM DK_USER_REVIEWANSWERDETAILS urd
                WHERE urd.group_no IS NOT NULL
                HAVING MAX(urd.group_no)>0";
            $command = $connection->createCommand($sqlFetchQuery);
            $retUserMaxgrpNoDetailsArr = $command->queryAll();
            if($retUserMaxgrpNoDetailsArr!=false && count($retUserMaxgrpNoDetailsArr)>0){
                $maxUserGrpNo =  ($retUserMaxgrpNoDetailsArr[0]['maxUserGrpNo'])+1;
            }
        }catch(Exception $ex){}   
        return $maxUserGrpNo;
    }
    
}

