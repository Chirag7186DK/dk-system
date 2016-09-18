<?php

/**
* Description of CustomizeOrdersDao
* @author chirag
*/

class CustomizeOrdersDao{
   
    // CJ defined this function 2016-08-21
    public static function generateMaxCustomizeOrderNo(){
        $maxCustomizeOrderId = 0;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT COALESCE(MAX(cor.id), 0) customizeOrderId
                FROM DK_CUSTOMIZEORDERS_REQUEST cor
                WHERE 1";
            $command = $connection->createCommand($sql);
            $customizeOrderDetailsArr = $command->queryAll();
            if(count($customizeOrderDetailsArr)==1 && $customizeOrderDetailsArr!=false){
                $maxCustomizeOrderId =  $customizeOrderDetailsArr[0]['customizeOrderId'];    
            }
        }catch(Exception $ex){}
        return $maxCustomizeOrderId;
    }
    
    // CJ defined this function 2016-07-24
    public static function addCustomizeOrderRequest($paramDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('customizeorder_no', $paramDetails)){
            if($paramDetails['customizeorder_no']!=''){
                $sqlColumnNames.=" customizeorder_no,";
                $sqlValues.="'".$paramDetails['customizeorder_no']."',";
            }
        }
        if(array_key_exists('user_sessionid', $paramDetails)){
            if($paramDetails['user_sessionid']!='' 
                && strlen($paramDetails['user_sessionid'])>=20){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$paramDetails['user_sessionid']."',";
            }
        }
        if(array_key_exists('user_id', $paramDetails)){
            if($paramDetails['user_id']!='' 
                && ($paramDetails['user_id'])>0){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$paramDetails['user_id']."',";
            }
        }
        if(array_key_exists('event_title', $paramDetails)){
            if($paramDetails['event_title']!=''){
                $sqlColumnNames.=" event_title,";
                $sqlValues.="'".$paramDetails['event_title']."',";
            }
        }
        if(array_key_exists('nos_person', $paramDetails)){
            if($paramDetails['nos_person']!='' 
                && ($paramDetails['nos_person'])>0){
                $sqlColumnNames.=" nos_person,";
                $sqlValues.="'".$paramDetails['nos_person']."',";
            }
        }
        if(array_key_exists('event_date', $paramDetails)){
            if($paramDetails['event_date']!=''){
                $sqlColumnNames.=" event_date,";
                $sqlValues.="'".$paramDetails['event_date']."',";
            }
        }
        if(array_key_exists('event_venue', $paramDetails)){
            if($paramDetails['event_venue']!=''){
                $sqlColumnNames.=" event_venue,";
                $sqlValues.="'".$paramDetails['event_venue']."',";
            }
        }
        if(array_key_exists('event_requirements', $paramDetails)){
            if($paramDetails['event_requirements']!=''){
                $sqlColumnNames.=" event_requirements,";
                $sqlValues.="'".$paramDetails['event_requirements']."',";
            }
        }
        if(array_key_exists('file', $paramDetails)){
            if($paramDetails['file']!=''){
                $sqlColumnNames.=" file,";
                $sqlValues.="'".$paramDetails['file']."',";
            }
        }
        if(array_key_exists('created_by', $paramDetails)){
            if($paramDetails['created_by']!='' && ($paramDetails['created_by'])>0){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramDetails['created_by']."',";
            }
        }
        if(array_key_exists('status', $paramDetails)){
            if($paramDetails['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$paramDetails['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $paramDetails['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$paramDetails['created_datedtime']."',";
            $sqlQuery = " INSERT INTO CUSTOMIZEORDERS_REQUEST " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-07-24
    public static function addCustomizeOrderRequestLog($paramDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('customizeorder_id', $paramDetails)){
            if($paramDetails['customizeorder_id']!=''){
                $sqlColumnNames.=" customizeorder_id,";
                $sqlValues.="'".$paramDetails['customizeorder_id']."',";
            }
        }
        if(array_key_exists('description', $paramDetails)){
            if($paramDetails['description']!=''){
                $sqlColumnNames.=" description,";
                $sqlValues.="'".$paramDetails['description']."',";
            }
        }
        if(array_key_exists('created_by', $paramDetails)){
            if($paramDetails['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramDetails['created_by']."',";
                $paramDetails['created_datedtime'] = date('Y-m-d H:i:s');
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$paramDetails['created_datedtime']."',";
            }
        }
        if(array_key_exists('status', $paramDetails)){
            if($paramDetails['status']=='A' || $paramDetails['status']=='Z'){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$paramDetails['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO CUSTOMIZRORDERS_REQUEST_LOG " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-23
    public static function getCustomizeOrderList($userId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT
                COALESCE(cor.id, '') customizeOrderId, 
                COALESCE(cor.customizeorder_no, '') customizeOrderNo, 
                COALESCE(cor.event_title, '') occassionTitle,
                COALESCE(cor.nos_person, '') nosOfPerson, 
                COALESCE(cor.event_date, '') eventDate, 
                COALESCE(cor.event_venue, '') eventVenue, 
                COALESCE(cor.event_requirements, '') eventRequirements,
                COALESCE(cor.estimated_budget, 0) estimatedBudget,
                COALESCE(cor.totalamount, 0) coTotalAmount,
                (CASE 
                    WHEN cor.status='R' THEN 'Requested by you'
                    WHEN cor.status='CC' THEN 'Confirmed by you for further processing'
                    WHEN cor.status='CV' THEN 'Consulting with our vendor'
                    WHEN cor.status='PP' THEN 'Payment Pending'
                    WHEN cor.status='PF' THEN 'Payment Failed'
                    WHEN cor.status='ZC' THEN 'Deleted/Removed by you'
                    WHEN cor.status='ZA' THEN 'Deleted/Removed by us'
                END) corLongStatusMsg, COALESCE(cor.status, '') corShortStatus
                FROM USERS u 
                JOIN CUSTOMIZEORDERS_REQUEST cor ON cor.user_id=u.id
                WHERE 1
                AND u.status='A' 
                AND u.id='$userId' AND cor.user_id='$userId'
                ORDER BY cor.updated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $customizeOrderDetailsArr = $command->queryAll();
            if(count($customizeOrderDetailsArr)>0 && $customizeOrderDetailsArr!=false){
                $result =  $customizeOrderDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-09-18
    public static function getCustomizeOrderLogDetails($userId, $customizeOrderId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                COALESCE(corl.description, '') poLogDescription,
                COALESCE(DATE_FORMAT(corl.updated_datedtime, '%b %D %a, %Y'), '') lastUpdatedTime,
                (CASE 
                    WHEN corl.profile_typeid='2' THEN 'You' 
                    ELSE 'Admin'
                END) coLogMemberLabel
                FROM USERS u 
                JOIN CUSTOMIZEORDERS_REQUEST por ON cor.user_id=u.id
                JOIN CUSTOMIZEORDERS_REQUEST_LOG porl ON corl.party_id=cor.id
                WHERE 1
                AND u.status='A' AND corl.status='A'
                AND u.id='$userId' AND cor.user_id='$userId'
                AND cor.id='$customizeOrderId' AND corl.customizeorder_id='$customizeOrderId'
                ORDER BY corl.updated_datedtime DESC ";
            $command = $connection->createCommand($sql);
            $coLogDetailsArr = $command->queryAll();
            if(count($coLogDetailsArr)>0 && $coLogDetailsArr!=false){
                $result =  $coLogDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-09-18
    public static function getPaymentDetailsForCustomizeOrder($userId, $customizeOrderId, $isIncludeTobePayingAmtStatus='N'){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                COALESCE(cogp.totalamount, 0) poGeneratedTotalAmt,
                COALESCE(cogp.payingamount, 0) payingamount,
                COALESCE(cogp.balanceamount, 0) balanceamount,
                COALESCE(cogp.description, 0) description,
                (CASE 
                    WHEN cogp.status='G' THEN 'Generated'
                    WHEN cogp.status='PD' THEN 'Payment Done'
                    WHEN cogp.status='PF' THEN 'Payment Failed'
                    WHEN cogp.status='ZC' THEN 'Deleted/Removed by you'
                    WHEN cogp.status='ZA' THEN 'Deleted/Removed by us'
                END) cogpLongStatusMsg, COALESCE(cogp.status, '') cogpShortStatus,
                COALESCE(DATE_FORMAT(cogp.udated_datedtime, '%b %D %a, %Y'), '') lastUpdatedTime
                FROM USERS u 
                JOIN CUSTOMIZEORDERS_REQUEST por ON cor.user_id=u.id
                JOIN CUSTOMIZEORDERS_GENERATEPAYMENT cogp ON cogp.customizeorder_id=cor.id
                WHERE 1
                AND u.status='A'
                AND u.id='$userId' AND cor.user_id='$userId'
                AND cor.id='$customizeOrderId' AND cogp.customizeorder_id='$customizeOrderId' ";
                if($isIncludeTobePayingAmtStatus=='Y'){
                    $sql.=" AND (cogp.status='G' || cogp.status='PF') ";
                }    
                $sql.=" ORDER BY cogp.udated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $coPaymentDetailsArr = $command->queryAll();
            if(count($coPaymentDetailsArr)>0 && $coPaymentDetailsArr!=false){
                $result =  $coPaymentDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
}
