<?php

/**
* Description of CustomizeOrdersDao
* @author chirag
*/

class CustomizeOrdersDao{
   
    // CJ defined this function 2016-07-24
    public static function addCustomizeOrderRequest($coRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('is_LoggedInUser', $coRequestParamDetails)){
            if($coRequestParamDetails['is_LoggedInUser']!=''){
                $sqlColumnNames.=" is_LoggedInUser,";
                $sqlValues.="'".$coRequestParamDetails['is_LoggedInUser']."',";
            }
        }
        if(array_key_exists('profile_id', $coRequestParamDetails)){
            if($coRequestParamDetails['profile_id']!=''){
                $sqlColumnNames.=" profile_id,";
                $sqlValues.="'".$coRequestParamDetails['profile_id']."',";
            }
        }
        if(array_key_exists('user_id', $coRequestParamDetails)){
            if($coRequestParamDetails['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$coRequestParamDetails['user_id']."',";
            }
        }
        if(array_key_exists('name', $coRequestParamDetails)){
            if($coRequestParamDetails['name']!=''){
                $sqlColumnNames.=" name,";
                $sqlValues.="'".$coRequestParamDetails['name']."',";
            }
        }
        if(array_key_exists('mobile', $coRequestParamDetails)){
            if($coRequestParamDetails['mobile']!=''){
                $sqlColumnNames.=" mobile,";
                $sqlValues.="'".$coRequestParamDetails['mobile']."',";
            }
        }
        if(array_key_exists('email', $coRequestParamDetails)){
            if($coRequestParamDetails['email']!=''){
                $sqlColumnNames.=" email,";
                $sqlValues.="'".$coRequestParamDetails['email']."',";
            }
        }
        if(array_key_exists('occassion_title', $coRequestParamDetails)){
            if($coRequestParamDetails['occassion_title']!=''){
                $sqlColumnNames.=" occassion_title,";
                $sqlValues.="'".$coRequestParamDetails['occassion_title']."',";
            }
        }
        if(array_key_exists('nos_person', $coRequestParamDetails)){
            if($coRequestParamDetails['nos_person']!=''){
                $sqlColumnNames.=" nos_person,";
                $sqlValues.="'".$coRequestParamDetails['nos_person']."',";
            }
        }
        if(array_key_exists('party_date', $coRequestParamDetails)){
            if($coRequestParamDetails['party_date']!=''){
                $sqlColumnNames.=" party_date,";
                $sqlValues.="'".$coRequestParamDetails['party_date']."',";
            }
        }
        if(array_key_exists('party_venue', $coRequestParamDetails)){
            if($coRequestParamDetails['party_venue']!=''){
                $sqlColumnNames.=" party_venue,";
                $sqlValues.="'".$coRequestParamDetails['party_venue']."',";
            }
        }
        if(array_key_exists('party_requirements', $coRequestParamDetails)){
            if($coRequestParamDetails['party_requirements']!=''){
                $sqlColumnNames.=" party_requirements,";
                $sqlValues.="'".$coRequestParamDetails['party_requirements']."',";
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
        if(array_key_exists('status_id', $coRequestParamDetails)){
            if($coRequestParamDetails['status_id']!=''){
                $sqlColumnNames.=" status_id,";
                $sqlValues.="'".$coRequestParamDetails['status_id']."',";
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
    
    
}
