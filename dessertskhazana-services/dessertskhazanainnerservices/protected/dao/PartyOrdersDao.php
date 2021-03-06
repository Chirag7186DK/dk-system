<?php

/**
* Description of PartyOrdersDao
* @author chirag
*/

class PartyOrdersDao{
    
    // CJ defined this function 2016-08-21
    public static function generateMaxPartyOrderNo(){
        $maxPartyOrderId = 0;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT COALESCE(MAX(por.id), 0) partyOrderId
                FROM DK_PARTYORDERS_REQUEST por
                WHERE 1";
            $command = $connection->createCommand($sql);
            $partyOrderDetailsArr = $command->queryAll();
            if(count($partyOrderDetailsArr)==1 && $partyOrderDetailsArr!=false){
                $maxPartyOrderId =  $partyOrderDetailsArr[0]['partyOrderId'];    
            }
        }catch(Exception $ex){}
        return $maxPartyOrderId;
    }
   
    // CJ defined this function 2016-07-20
    public static function addPartyOrderRequest($poRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('partyorder_no', $poRequestParamDetails)){
            if($poRequestParamDetails['partyorder_no']!=''){
                $sqlColumnNames.=" partyorder_no,";
                $sqlValues.="'".$poRequestParamDetails['partyorder_no']."',";
            }
        }
        if(array_key_exists('user_sessionid', $poRequestParamDetails)){
            if($poRequestParamDetails['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$poRequestParamDetails['user_sessionid']."',";
            }
        }
        if(array_key_exists('user_id', $poRequestParamDetails)){
            if($poRequestParamDetails['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$poRequestParamDetails['user_id']."',";
            }
        }
        if(array_key_exists('occassion_title', $poRequestParamDetails)){
            if($poRequestParamDetails['occassion_title']!=''){
                $sqlColumnNames.=" occassion_title,";
                $sqlValues.="'".$poRequestParamDetails['occassion_title']."',";
            }
        }
        if(array_key_exists('nos_person', $poRequestParamDetails)){
            if($poRequestParamDetails['nos_person']!=''){
                $sqlColumnNames.=" nos_person,";
                $sqlValues.="'".$poRequestParamDetails['nos_person']."',";
            }
        }
        if(array_key_exists('party_date', $poRequestParamDetails)){
            if($poRequestParamDetails['party_date']!=''){
                $sqlColumnNames.=" party_date,";
                $sqlValues.="'".$poRequestParamDetails['party_date']."',";
            }
        }
        if(array_key_exists('party_venue', $poRequestParamDetails)){
            if($poRequestParamDetails['party_venue']!=''){
                $sqlColumnNames.=" party_venue,";
                $sqlValues.="'".$poRequestParamDetails['party_venue']."',";
            }
        }
        if(array_key_exists('party_requirements', $poRequestParamDetails)){
            if($poRequestParamDetails['party_requirements']!=''){
                $sqlColumnNames.=" party_requirements,";
                $sqlValues.="'".$poRequestParamDetails['party_requirements']."',";
            }
        }
        if(array_key_exists('file', $poRequestParamDetails)){
            if($poRequestParamDetails['file']!=''){
                $sqlColumnNames.=" file,";
                $sqlValues.="'".$poRequestParamDetails['file']."',";
            }
        }
        if(array_key_exists('created_by', $poRequestParamDetails)){
            if($poRequestParamDetails['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$poRequestParamDetails['created_by']."',";
            }
        }
        if(array_key_exists('status', $poRequestParamDetails)){
            if($poRequestParamDetails['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$poRequestParamDetails['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $poRequestParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$poRequestParamDetails['created_datedtime']."',";
            $sqlQuery = " INSERT INTO DK_PARTYORDERS_REQUEST " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    
    // CJ defined this function 2016-07-20
    public static function addPartyOrderRequestLog($poRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('party_id', $poRequestParamDetails)){
            if($poRequestParamDetails['party_id']!=''){
                $sqlColumnNames.=" party_id,";
                $sqlValues.="'".$poRequestParamDetails['party_id']."',";
            }
        }
        if(array_key_exists('description', $poRequestParamDetails)){
            if($poRequestParamDetails['description']!=''){
                $sqlColumnNames.=" description,";
                $sqlValues.="'".$poRequestParamDetails['description']."',";
            }
        }
        if(array_key_exists('status', $poRequestParamDetails)){
            if($poRequestParamDetails['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$poRequestParamDetails['status']."',";
            }
        }
        if(array_key_exists('created_by', $poRequestParamDetails)){
            if($poRequestParamDetails['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$poRequestParamDetails['created_by']."',";
                $poRequestParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$poRequestParamDetails['created_datedtime']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_PARTYORDERS_REQUEST_LOG " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-22
    public static function getPartyOrderList($userId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT
                COALESCE(por.partyorder_no, '') partyOrderNo, 
                COALESCE(por.occassion_title, '') occassionTitle,
                COALESCE(por.nos_person, '') nosOfPerson, 
                COALESCE(por.party_date, '') partyDate, 
                COALESCE(por.party_venue, '') partyVenue, 
                COALESCE(por.party_requirements, '') partyRequirements,
                (CASE 
                    WHEN por.status='R' THEN 'Requested'
                    WHEN por.status='CV' THEN 'Consulting with vendor'
                    WHEN por.status='C' THEN 'Confirmed by you & me'
                    WHEN por.status='PP' THEN 'Payment Pending'
                    WHEN por.status='PF' THEN 'Payment Failed'
                    WHEN por.status='PF' THEN 'Deleted by you'
                    WHEN por.status='ZA' THEN 'Deleted by us'
                END) portLongStatusMsg,
                COALESCE(por.status, '') porStatus,
                '2000' estimatedAmt, '1800' confirmedAmt
                FROM DK_USERS u 
                JOIN DK_PARTYORDERS_REQUEST por ON por.user_id=u.id
                WHERE 1
                AND u.id='$userId'
                AND por.user_id='$userId'
                AND u.status='A'";
            $command = $connection->createCommand($sql);
            $partyOrderDetailsArr = $command->queryAll();
            if(count($partyOrderDetailsArr)>0 && $partyOrderDetailsArr!=false){
                $result =  $partyOrderDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
}
