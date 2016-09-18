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
        if(array_key_exists('event_title', $coRequestParamDetails)){
            if($coRequestParamDetails['event_title']!=''){
                $sqlColumnNames.=" event_title,";
                $sqlValues.="'".$coRequestParamDetails['event_title']."',";
            }
        }
        if(array_key_exists('nos_person', $paramDetails)){
            if($paramDetails['nos_person']!='' 
                && ($paramDetails['nos_person'])>0){
                $sqlColumnNames.=" nos_person,";
                $sqlValues.="'".$paramDetails['nos_person']."',";
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
            $coRequestParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$coRequestParamDetails['created_datedtime']."',";
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
                COALESCE(cor.totalamount, 0) poTotalAmount,
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
    
}
