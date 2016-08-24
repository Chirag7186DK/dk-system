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
    public static function addCustomizeOrderRequest($coRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('customizeorder_no', $coRequestParamDetails)){
            if($coRequestParamDetails['customizeorder_no']!=''){
                $sqlColumnNames.=" customizeorder_no,";
                $sqlValues.="'".$coRequestParamDetails['customizeorder_no']."',";
            }
        }
        if(array_key_exists('user_sessionid', $coRequestParamDetails)){
            if($coRequestParamDetails['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$coRequestParamDetails['user_sessionid']."',";
            }
        }
        if(array_key_exists('user_id', $coRequestParamDetails)){
            if($coRequestParamDetails['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$coRequestParamDetails['user_id']."',";
            }
        }
        if(array_key_exists('event_title', $coRequestParamDetails)){
            if($coRequestParamDetails['event_title']!=''){
                $sqlColumnNames.=" event_title,";
                $sqlValues.="'".$coRequestParamDetails['event_title']."',";
            }
        }
        if(array_key_exists('nos_person', $coRequestParamDetails)){
            if($coRequestParamDetails['nos_person']!=''){
                $sqlColumnNames.=" nos_person,";
                $sqlValues.="'".$coRequestParamDetails['nos_person']."',";
            }
        }
        if(array_key_exists('event_date', $coRequestParamDetails)){
            if($coRequestParamDetails['event_date']!=''){
                $sqlColumnNames.=" event_date,";
                $sqlValues.="'".$coRequestParamDetails['event_date']."',";
            }
        }
        if(array_key_exists('event_venue', $coRequestParamDetails)){
            if($coRequestParamDetails['event_venue']!=''){
                $sqlColumnNames.=" event_venue,";
                $sqlValues.="'".$coRequestParamDetails['event_venue']."',";
            }
        }
        if(array_key_exists('event_requirements', $coRequestParamDetails)){
            if($coRequestParamDetails['event_requirements']!=''){
                $sqlColumnNames.=" event_requirements,";
                $sqlValues.="'".$coRequestParamDetails['event_requirements']."',";
            }
        }
        if(array_key_exists('file', $coRequestParamDetails)){
            if($coRequestParamDetails['file']!=''){
                $sqlColumnNames.=" file,";
                $sqlValues.="'".$coRequestParamDetails['file']."',";
            }
        }
        if(array_key_exists('created_by', $coRequestParamDetails)){
            if($coRequestParamDetails['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$coRequestParamDetails['created_by']."',";
            }
        }
        if(array_key_exists('status', $coRequestParamDetails)){
            if($coRequestParamDetails['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$coRequestParamDetails['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $coRequestParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$coRequestParamDetails['created_datedtime']."',";
            $sqlQuery = " INSERT INTO DK_CUSTOMIZEORDERS_REQUEST " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-07-24
    public static function addCustomizeOrderRequestLog($coRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('customizeorder_id', $coRequestParamDetails)){
            if($coRequestParamDetails['customizeorder_id']!=''){
                $sqlColumnNames.=" customizeorder_id,";
                $sqlValues.="'".$coRequestParamDetails['customizeorder_id']."',";
            }
        }
        if(array_key_exists('description', $coRequestParamDetails)){
            if($coRequestParamDetails['description']!=''){
                $sqlColumnNames.=" description,";
                $sqlValues.="'".$coRequestParamDetails['description']."',";
            }
        }
        if(array_key_exists('status_id', $coRequestParamDetails)){
            if($coRequestParamDetails['status_id']!=''){
                $sqlColumnNames.=" status_id,";
                $sqlValues.="'".$coRequestParamDetails['status_id']."',";
            }
        }
        if(array_key_exists('created_by', $coRequestParamDetails)){
            if($coRequestParamDetails['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$coRequestParamDetails['created_by']."',";
                $coRequestParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$coRequestParamDetails['created_datedtime']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_CUSTOMIZRORDERS_REQUEST_LOG " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
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
                COALESCE(cor.customizeorder_no, '') customizeOrderNo, 
                COALESCE(cor.event_title, '') eventTitle,
                COALESCE(cor.nos_person, '') nosOfPerson, 
                COALESCE(cor.event_date, '') eventDate, 
                COALESCE(cor.event_venue, '') eventVenue, 
                COALESCE(cor.event_requirements, '') customizeRequirements,
                (CASE 
                    WHEN cor.status='R' THEN 'Requested'
                    WHEN cor.status='CV' THEN 'Consulting with vendor'
                    WHEN cor.status='C' THEN 'Confirmed by you & me'
                    WHEN cor.status='PP' THEN 'Payment Pending'
                    WHEN cor.status='PF' THEN 'Payment Failed'
                    WHEN cor.status='PF' THEN 'Deleted by you'
                    WHEN cor.status='ZA' THEN 'Deleted by us'
                END) cortLongStatusMsg,
                COALESCE(cor.status, '') corStatus,
                '2000' estimatedAmt, '1800' confirmedAmt
                FROM DK_USERS u 
                JOIN DK_CUSTOMIZEORDERS_REQUEST cor ON cor.user_id=u.id
                WHERE 1
                AND u.id='$userId'
                AND cor.user_id='$userId'
                AND u.status='A'";
            $command = $connection->createCommand($sql);
            $customizeOrderDetailsArr = $command->queryAll();
            if(count($customizeOrderDetailsArr)>0 && $customizeOrderDetailsArr!=false){
                $result =  $customizeOrderDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
}
