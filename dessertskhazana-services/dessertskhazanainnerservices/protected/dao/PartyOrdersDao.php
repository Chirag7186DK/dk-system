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
    public static function addPartyOrderRequest($paramDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('partyorder_no', $paramDetails)){
            if($paramDetails['partyorder_no']!=''){
                $sqlColumnNames.=" partyorder_no,";
                $sqlValues.="'".$paramDetails['partyorder_no']."',";
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
        if(array_key_exists('occassion_title', $paramDetails)){
            if($paramDetails['occassion_title']!=''){
                $sqlColumnNames.=" occassion_title,";
                $sqlValues.="'".$paramDetails['occassion_title']."',";
            }
        }
        if(array_key_exists('nos_person', $paramDetails)){
            if($paramDetails['nos_person']!='' 
                && ($paramDetails['nos_person'])>0){
                $sqlColumnNames.=" nos_person,";
                $sqlValues.="'".$paramDetails['nos_person']."',";
            }
        }
        if(array_key_exists('party_date', $paramDetails)){
            if($paramDetails['party_date']!=''){
                $sqlColumnNames.=" party_date,";
                $sqlValues.="'".$paramDetails['party_date']."',";
            }
        }
        if(array_key_exists('party_venue', $paramDetails)){
            if($paramDetails['party_venue']!=''){
                $sqlColumnNames.=" party_venue,";
                $sqlValues.="'".$paramDetails['party_venue']."',";
            }
        }
        if(array_key_exists('party_requirements', $paramDetails)){
            if($paramDetails['party_requirements']!=''){
                $sqlColumnNames.=" party_requirements,";
                $sqlValues.="'".$paramDetails['party_requirements']."',";
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
            $sqlQuery = " INSERT INTO PARTYORDERS_REQUEST " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    
    // CJ defined this function 2016-07-20
    public static function addPartyOrderRequestLog($paramDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('party_id', $paramDetails)){
            if($paramDetails['party_id']!='' && ($paramDetails['party_id'])>0){
                $sqlColumnNames.=" party_id,";
                $sqlValues.="'".$paramDetails['party_id']."',";
            }
        }
        if(array_key_exists('description', $paramDetails)){
            if($paramDetails['description']!='' 
                && strlen($paramDetails['description'])>0){
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
            $sqlQuery = " INSERT INTO PARTYORDERS_REQUEST_LOG " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
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
            $sql= "SELECT
                    COALESCE(por.id, '') partyOrderId, 
                    COALESCE(por.partyorder_no, '') partyOrderNo, 
                    COALESCE(por.occassion_title, '') occassionTitle,
                    COALESCE(por.nos_person, '') nosOfPerson, 
                    COALESCE(por.party_date, '') partyDate, 
                    COALESCE(por.party_venue, '') partyVenue, 
                    COALESCE(por.party_requirements, '') partyRequirements,
                    COALESCE(por.estimated_budget, 0) estimatedBudget,
                    COALESCE(por.totalamount, 0) poTotalAmount,
                    (CASE 
                        WHEN por.status='R' THEN 'Requested by you'
                        WHEN por.status='CC' THEN 'Confirmed by you for further processing'
                        WHEN por.status='CV' THEN 'Consulting with our vendor'
                        WHEN por.status='PP' THEN 'Payment Pending'
                        WHEN por.status='PF' THEN 'Payment Failed'
                        WHEN por.status='ZC' THEN 'Deleted/Removed by you'
                        WHEN por.status='ZA' THEN 'Deleted/Removed by us'
                    END) porLongStatusMsg, COALESCE(por.status, '') porShortStatus
                    FROM USERS u 
                    JOIN PARTYORDERS_REQUEST por ON por.user_id=u.id
                    WHERE 1
                    AND u.status='A' 
                    AND u.id='$userId' AND por.user_id='$userId'
                    ORDER BY por.updated_datedtime DESC ";
            $command = $connection->createCommand($sql);
            $poDetailsArr = $command->queryAll();
            if(count($poDetailsArr)>0 && $poDetailsArr!=false){
                $result =  $poDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    
    // CJ defined this function 2016-09-18
    public static function getPartyOrderLogDetails($userId, $partyOrderId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                COALESCE(porl.description, '') poLogDescription,
                COALESCE(DATE_FORMAT(porl.updated_datedtime, '%b %D %a, %Y'), '') lastUpdatedTime,
                (CASE 
                    WHEN porl.profile_typeid='2' THEN 'You' 
                    ELSE 'Admin'
                END) poLogMemberLabel
                FROM USERS u 
                JOIN PARTYORDERS_REQUEST por ON por.user_id=u.id
                JOIN PARTYORDERS_REQUEST_LOG porl ON porl.party_id=por.id
                WHERE 1
                AND u.status='A' AND porl.status='A'
                AND u.id='$userId' AND por.user_id='$userId'
                AND por.id='$partyOrderId' AND porl.party_id='$partyOrderId'
                ORDER BY porl.updated_datedtime DESC ";
            $command = $connection->createCommand($sql);
            $poLogDetailsArr = $command->queryAll();
            if(count($poLogDetailsArr)>0 && $poLogDetailsArr!=false){
                $result =  $poLogDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-09-18
    public static function getPaymentDetailsForPartyOrder($userId, $partyOrderId, $isIncludeTobePayingAmtStatus='N'){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                COALESCE(pogp.totalamount, 0) poGeneratedTotalAmt,
                COALESCE(pogp.payingamount, 0) payingamount,
                COALESCE(pogp.balanceamount, 0) balanceamount,
                COALESCE(pogp.description, 0) description,
                (CASE 
                    WHEN pogp.status='G' THEN 'Generated'
                    WHEN pogp.status='PD' THEN 'Payment Done'
                    WHEN pogp.status='PF' THEN 'Payment Failed'
                    WHEN pogp.status='ZC' THEN 'Deleted/Removed by you'
                    WHEN pogp.status='ZA' THEN 'Deleted/Removed by us'
                END) pogpLongStatusMsg, COALESCE(pogp.status, '') pogpShortStatus,
                COALESCE(DATE_FORMAT(pogp.udated_datedtime, '%b %D %a, %Y'), '') lastUpdatedTime
                FROM USERS u 
                JOIN PARTYORDERS_REQUEST por ON por.user_id=u.id
                JOIN PARTYORDERS_GENERATEPAYMENT pogp ON pogp.party_id=por.id
                WHERE 1
                AND u.status='A'
                AND u.id='$userId' AND por.user_id='$userId'
                AND por.id='$partyOrderId' AND pogp.party_id='$partyOrderId' ";
                if($isIncludeTobePayingAmtStatus=='Y'){
                    $sql.=" AND (pogp.status='G' || pogp.status='PF') ";
                }    
                $sql.=" ORDER BY pogp.udated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $poPaymentDetailsArr = $command->queryAll();
            if(count($poPaymentDetailsArr)>0 && $poPaymentDetailsArr!=false){
                $result =  $poPaymentDetailsArr;
            }
        }catch(Exception $ex){}
        return $result;
    }
    
}
