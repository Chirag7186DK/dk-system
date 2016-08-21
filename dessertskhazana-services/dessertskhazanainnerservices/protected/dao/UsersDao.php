<?php

/**
* Description of UsersDao
* @author chirag
*/

class UsersDao{
   
    // CJ defined this function 2016-07-24
    public static function addTrackUserInfoAccessingWebsitesDetails($utawParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('user_sessionid', $utawParamDetails)){
            if($utawParamDetails['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$utawParamDetails['user_sessionid']."',";
            }
        }
        if(array_key_exists('ipaddress', $utawParamDetails)){
            if($utawParamDetails['ipaddress']!=''){
                $sqlColumnNames.=" ipaddress,";
                $sqlValues.="'".$utawParamDetails['ipaddress']."',";
            }
        }
        if(array_key_exists('geolocation', $utawParamDetails)){
            if($utawParamDetails['geolocation']!=''){
                $sqlColumnNames.=" geolocation,";
                $sqlValues.="'".$utawParamDetails['geolocation']."',";
            }
        }
        if(array_key_exists('page_name', $utawParamDetails)){
            if($utawParamDetails['page_name']!=''){
                $sqlColumnNames.=" page_name,";
                $sqlValues.="'".$utawParamDetails['page_name']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_TRACKUSERS_ACCESSWEBSITES " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-19
    public static function generateMaxUserLogNo(){
        $maxUserLogNo = 0;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                COALESCE(MAX(id),0) maxUserLogNo
                FROM DK_USERLOG";
            $command = $connection->createCommand($sql);
            $userMaxLogNoDetailsArr = $command->queryAll();
            if(count($userMaxLogNoDetailsArr)>0 && $userMaxLogNoDetailsArr!=false){
                $maxUserLogNo = (int) $userMaxLogNoDetailsArr[0]['maxUserLogNo'];    
            }
        }catch(Exception $ex){}
        return $maxUserLogNo;
    }
    
    // CJ defined this function 2016-08-01
    public static function addUserLogDetails($userLogDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('user_logno', $userLogDetails)){
            if($userLogDetails['user_logno']!=''){
                $sqlColumnNames.=" user_logno,";
                $sqlValues.="'".$userLogDetails['user_logno']."',";
            }
        }
        if(array_key_exists('user_id', $userLogDetails)){
            if($userLogDetails['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$userLogDetails['user_id']."',";
            }
        }
        if(array_key_exists('user_sessionid', $userLogDetails)){
            if($userLogDetails['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$userLogDetails['user_sessionid']."',";
            }
        }
        if(array_key_exists('user_sessionstarttime', $userLogDetails)){
            if($userLogDetails['user_sessionstarttime']!=''){
                $sqlColumnNames.=" user_sessionstarttime,";
                $sqlValues.="'".$userLogDetails['user_sessionstarttime']."',";
            }
        }
        if(array_key_exists('user_geolocationdetails', $userLogDetails)){
            if($userLogDetails['user_geolocationdetails']!=''){
                $sqlColumnNames.=" user_geolocationdetails,";
                $sqlValues.="'".$userLogDetails['user_geolocationdetails']."',";
            }
        }
        if(array_key_exists('status', $userLogDetails)){
            if($userLogDetails['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$userLogDetails['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $userLogDetails['login_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" login_datedtime,";
            $sqlValues.="'".$userLogDetails['login_datedtime']."',";
            $sqlQuery = " INSERT INTO DK_USERLOG " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-07-27 , udblog mdg format can be bug here plz think on it CJ
    public static function getUserLogDetails($paramJson){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                COALESCE(MD5(ul.id), '') userLogId,
                COALESCE(ul.user_sessionid, '') user_sessionid,
                COALESCE(u.id, '') unmd5UserId, 
                MD5(COALESCE(u.id, '')) userId, 
                UPPER(COALESCE(u.name, '')) userName,
                COALESCE(u.email, '') userEmail, 
                COALESCE(u.mobile, '') userMobile, 
                MD5(COALESCE(up.id, '')) userProfileTypeId, 
                COALESCE(up.id, '') unmd5ProfileTypeId,
                COALESCE(up.profile_type, '') profile_type,
                COALESCE(DATE_FORMAT(u.created_datedtime, '%b %D %a, %Y'), '') userSinceFrom,
                COALESCE(u.status, 'Z') userStatus
                FROM DK_USERLOG ul
                JOIN DK_USERS u ON ul.user_id=u.id AND u.status='A' 
                JOIN DK_USERSPROFILE up ON up.id=u.profile_typeid AND up.status='A'
                WHERE 1
                AND ul.status='A' 
                AND ul.user_sessionid='".$paramJson['user_sessionid']."' 
                AND MD5(ul.id)='".$paramJson['udblogId']."'";  
            $command = $connection->createCommand($sql);
            $retUserLogDetailsArr = $command->queryAll();
            if(count($retUserLogDetailsArr)==1 && $retUserLogDetailsArr!=false){
                $retResult =  $retUserLogDetailsArr[0];    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    
    // CJ defined this function 2016-07-27
    public static function getUserDetails($paramJson=array()){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    u.id unmd5UserId, MD5(u.id) userId, UPPER(u.name) userName,
                    u.email userEmail, u.mobile userMobile, 
                    MD5(up.id) userProfileTypeId, up.id unmd5ProfileTypeId,
                    DATE_FORMAT(u.created_datedtime, '%b %D %a, %Y') userSinceFrom,
                    COALESCE(u.status, 'Z') userStatus
                    FROM DK_USERS u
                    JOIN DK_USERSPROFILE up ON up.id=u.profile_typeid AND up.status='A'
                    WHERE 1 ";  
                    // add userLoggedId in where condition
                    if(array_key_exists('userLoggedId', $paramJson)){
                        if(strlen($paramJson['userLoggedId'])==32){
                            $sql.=" AND MD5(u.id)='".$paramJson['userLoggedId']."'";
                        } 
                    }
                    // add user_id in where condition
                    if(array_key_exists('user_id', $paramJson)){
                        if(strlen($paramJson['user_id'])==32){
                            $sql.=" AND MD5(u.id)='".$paramJson['user_id']."'";
                        } 
                    }
                    // add created_by in where condition
                    if(array_key_exists('created_by', $paramJson)){
                        if(strlen($paramJson['created_by'])==32){
                            $sql.=" AND MD5(u.id)='".$paramJson['created_by']."'";
                        } 
                    }
                    // add user profile type id in where condition
                    if(array_key_exists('userProfileTypeId', $paramJson)){
                        if(strlen($paramJson['userProfileTypeId'])==32){
                            $sql.=" AND MD5(up.id)='".$paramJson['userProfileTypeId']."' AND MD5(u.profile_typeid)='".$paramJson['userProfileTypeId']."'";
                        } 
                    }
                    // add mobile in where condition
                    if(array_key_exists('encoded_mobile', $paramJson)){
                        if(strlen($paramJson['encoded_mobile'])==10){
                            $sql.=" AND u.mobile='".$paramJson['encoded_mobile']."'";
                        } 
                    }
                    // add password in where condition
                    if(array_key_exists('encoded_password', $paramJson)){
                        if($paramJson['encoded_password']!='' && $paramJson['encoded_password']!=false){
                            $sql.=" AND u.pwd=MD5('".$paramJson['encoded_password']."')";
                        } 
                    }
                    // add status in where condition
                    if(array_key_exists('status', $paramJson)){
                        if($paramJson['status']!='' && $paramJson['status']!=false){
                            $sql.=" AND u.status IN (".$paramJson['status'].")";
                        }else{
                            $sql.=" AND u.status='A'";
                        } 
                    }else{
                        $sql.=" AND u.status='A'";
                    }
            $command = $connection->createCommand($sql);
            $retUserDetailsArr = $command->queryAll();
            if(count($retUserDetailsArr)>0 && $retUserDetailsArr!=false){
                $retResult =  $retUserDetailsArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-08-06
    public static function generateMaxSessionNo(){
        $maxUserSessionNo = 0;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                COALESCE(MAX(session_idno),0) userSessionId
                FROM DK_USERSESSION";
            $command = $connection->createCommand($sql);
            $sessionNoDetailsArr = $command->queryAll();
            if(count($sessionNoDetailsArr)>0 && $sessionNoDetailsArr!=false){
                $maxUserSessionNo =  (int) $sessionNoDetailsArr[0]['userSessionId'];    
            }
        }catch(Exception $ex){}
        return $maxUserSessionNo;
    }
    
    // CJ defined this function 2016-08-06
    public static function addMaxUserSessionNo($maxUserSessionNo, $userSessionId){
        $retStatus = false;
        try{
            $connection = Yii::App()->db;
            $sql= " INSERT INTO DK_USERSESSION (session_idno, user_sessionid) VALUES('$maxUserSessionNo', '$userSessionId') ";
            $command = $connection->createCommand($sql);
            $result = $command->execute();
            if($result>0){
                $lastInsertedId = $connection->getLastInsertID();
                $retStatus = true;
            }
        }catch(Exception $ex){}
        return $retStatus;
    }
    
}
