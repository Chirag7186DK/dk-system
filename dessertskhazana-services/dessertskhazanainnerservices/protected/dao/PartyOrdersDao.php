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
        if(array_key_exists('name', $poRequestParamDetails)){
            if($poRequestParamDetails['name']!=''){
                $sqlColumnNames.=" name,";
                $sqlValues.="'".$poRequestParamDetails['name']."',";
            }
        }
        if(array_key_exists('mobile', $poRequestParamDetails)){
            if($poRequestParamDetails['mobile']!=''){
                $sqlColumnNames.=" mobile,";
                $sqlValues.="'".$poRequestParamDetails['mobile']."',";
            }
        }
        if(array_key_exists('email', $poRequestParamDetails)){
            if($poRequestParamDetails['email']!=''){
                $sqlColumnNames.=" email,";
                $sqlValues.="'".$poRequestParamDetails['email']."',";
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
    
    
}
