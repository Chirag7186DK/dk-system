<?php

/**
* Description of UsersDao
* @author chirag
*/

class UsersDao{
   
    // CJ defined this function 2016-07-24
    public static function addTrackUserInfoAccessingWebsitesDetails($paramData){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('user_sessionid', $paramData)){
            if($paramData['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$paramData['user_sessionid']."',";
            }
        }
        if(array_key_exists('usersession_startimestamp', $paramData)){
            if($paramData['usersession_startimestamp']!=''){
                $sqlColumnNames.=" usersession_startimestamp,";
                $sqlValues.="'".$paramData['usersession_startimestamp']."',";
            }
        }
        if(array_key_exists('ipaddress', $paramData)){
            if($paramData['ipaddress']!=''){
                $sqlColumnNames.=" ipaddress,";
                $sqlValues.="'".$paramData['ipaddress']."',";
            }
        }
        if(array_key_exists('geolocation', $paramData)){
            if($paramData['geolocation']!=''){
                $sqlColumnNames.=" geolocation,";
                $sqlValues.="'".$paramData['geolocation']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO TRACKUSERS_ACCESSWEBSITES " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-09-22
    public static function addUserDetails($paramData){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('profile_typeid', $paramData)){
            if($paramData['profile_typeid']!='' && $paramData['profile_typeid']>0){
                $sqlColumnNames.=" profile_typeid,";
                $sqlValues.="'".$paramData['profile_typeid']."',";
            }
        }
        if(array_key_exists('name', $paramData)){
            if($paramData['name']!='' && strlen($paramData['name'])>0){
                $sqlColumnNames.=" name,";
                $sqlValues.="'".$paramData['name']."',";
            }
        }
        if(array_key_exists('email', $paramData)){
            if($paramData['email']!='' && strlen($paramData['email'])>0){
                $sqlColumnNames.=" email,";
                $sqlValues.="'".$paramData['email']."',";
            }
        }
        if(array_key_exists('mobile', $paramData)){
            if($paramData['mobile']!='' && strlen($paramData['mobile'])>0){
                $sqlColumnNames.=" mobile,";
                $sqlValues.="'".$paramData['mobile']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".date('Y-m-d H:i:s')."',";
            $sqlQuery = " INSERT INTO USERS " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-21
    public static function updateUserPersonalInfoData($paramJson){
        $connection = Yii::app()->db;
        $dynamicSql = "";
        $retStatus = false;
        if(array_key_exists('name', $paramJson)){
            if($paramJson['name']!=''){
                $dynamicSql.=" name='".$paramJson['name']."',";
            }
        }
        if(array_key_exists('email', $paramJson)){
            if($paramJson['email']!=''){
                $dynamicSql.=" email='".$paramJson['email']."',";
            }
        }
        if(array_key_exists('mobile', $paramJson)){
            if($paramJson['mobile']!=''){
                $dynamicSql.=" mobile='".$paramJson['mobile']."',";
            }
        }
        if(array_key_exists('pwd', $paramJson)){
            if($paramJson['pwd']!=''){
                $dynamicSql.=" pwd='".$paramJson['pwd']."',";
            }
        }
        if(array_key_exists('gender', $paramJson)){
            if($paramJson['gender']!=''){
                $dynamicSql.=" gender='".$paramJson['gender']."',";
            }
        }
        if(array_key_exists('birthdate', $paramJson)){
            if($paramJson['birthdate']!=''){
                $dynamicSql.=" birthdate='".$paramJson['birthdate']."',";
            }
        }
        if(array_key_exists('updated_by', $paramJson)){
            if($paramJson['updated_by']!=''){
                $dynamicSql.=" updated_by='".$paramJson['updated_by']."',";
            }
        }
        if($dynamicSql!='' && array_key_exists('user_id', $paramJson)){
            if($paramJson['user_id']!=''){
                $sqlQuery = " UPDATE USERS SET ".rtrim($dynamicSql, ',');
                $sqlQuery.=" WHERE id='".$paramJson['user_id']."'";
                $command = $connection->createCommand($sqlQuery);
                $result = $command->execute();
                if($result>0){
                    $retStatus = true;
                }
            }
        }
        return $retStatus;
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
                    FROM USERS u
                    JOIN USERSPROFILE up ON up.id=u.profile_typeid AND up.status='A'
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
                    // add email in where condition
                    if(array_key_exists('email', $paramJson)){
                        if(strlen($paramJson['email'])>0){
                            $sql.=" AND u.email='".$paramJson['email']."'";
                        } 
                    }
                    // add password in where condition
                    if(array_key_exists('password', $paramJson)){
                        if($paramJson['password']!='' && $paramJson['password']!=false){
                            $sql.=" AND u.pwd=MD5('".$paramJson['password']."')";
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
    
    // CJ defined this function 2016-08-01
    public static function addUserLogDetails($paramData){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('user_logno', $paramData)){
            if($paramData['user_logno']!=''){
                $sqlColumnNames.=" user_logno,";
                $sqlValues.="'".$paramData['user_logno']."',";
            }
        }
        if(array_key_exists('user_id', $paramData)){
            if($paramData['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$paramData['user_id']."',";
            }
        }
        if(array_key_exists('user_sessionid', $paramData)){
            if($paramData['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$paramData['user_sessionid']."',";
            }
        }
        if(array_key_exists('user_sessionstarttime', $paramData)){
            if($paramData['user_sessionstarttime']!=''){
                $sqlColumnNames.=" user_sessionstarttime,";
                $sqlValues.="'".$paramData['user_sessionstarttime']."',";
            }
        }
        if(array_key_exists('user_geolocationdetails', $paramData)){
            if($paramData['user_geolocationdetails']!=''){
                $sqlColumnNames.=" user_geolocationdetails,";
                $sqlValues.="'".$paramData['user_geolocationdetails']."',";
            }
        }
        if(array_key_exists('status', $paramData)){
            if($paramData['status']!=''){
                $sqlColumnNames.=" status,";
                $sqlValues.="'".$paramData['status']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $paramData['login_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" login_datedtime,";
            $sqlValues.="'".$paramData['login_datedtime']."',";
            $sqlQuery = " INSERT INTO USERLOG " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
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
                FROM USERLOG";
            $command = $connection->createCommand($sql);
            $userMaxLogNoDetailsArr = $command->queryAll();
            if(count($userMaxLogNoDetailsArr)>0 && $userMaxLogNoDetailsArr!=false){
                $maxUserLogNo = (int) $userMaxLogNoDetailsArr[0]['maxUserLogNo'];    
            }
        }catch(Exception $ex){}
        return $maxUserLogNo;
    }
    
    
    // CJ defined this function 2016-07-27 , udblog mdg format can be bug here plz think on it CJ
    public static function getUserLogDetails($paramJson){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                COALESCE(ul.user_logno, '') userLogId,
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
                COALESCE(u.pincode, '') userPincode,
                COALESCE(u.gender, 'Male') userGender,
                COALESCE(u.birthdate, '') userBirthdate,
                COALESCE(u.status, 'Z') userStatus
                FROM USERLOG ul
                JOIN USERS u ON ul.user_id=u.id AND u.status='A' 
                JOIN USERSPROFILE up ON up.id=u.profile_typeid AND up.status='A'
                WHERE 1
                AND ul.status='A' 
                AND ul.user_sessionid='".$paramJson['user_sessionid']."' 
                AND ul.user_logno='".$paramJson['udblogId']."'";  
                if(array_key_exists('old_password', $paramJson)){
                    if($paramJson['old_password']!='' && strlen($paramJson['old_password'])>0){
                        $sql.=" AND u.pwd=MD5('".$paramJson['old_password']."')";
                    }
                }
            $command = $connection->createCommand($sql);
            $retUserLogDetailsArr = $command->queryAll();
            if(count($retUserLogDetailsArr)==1 && $retUserLogDetailsArr!=false){
                $retResult =  $retUserLogDetailsArr[0];    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
   
    
    // CJ defined this function 2016-08-30
    public static function userLogoutFromWebsites($udblogId, $userSessionId){
        $retStatus = 'FALSE';
        try{
            $connection = Yii::App()->db;
            $sql= " UPDATE USERLOG SET status='Z', logout_datedtime='".date('Y-m-d H:i:s')."'
                WHERE user_logno='$udblogId' AND user_sessionid='$userSessionId' ";
            $command = $connection->createCommand($sql);
            $result = $command->execute();
            if($result>0){
                $retStatus = 'TRUE';
            }
        }catch(Exception $ex){}
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-06
    public static function addMaxUserSessionNo($maxUserSessionNo, $userSessionId){
        $retStatus = false;
        try{
            $connection = Yii::App()->db;
            $sql= " INSERT INTO USERSESSION (session_idno, user_sessionid) VALUES('$maxUserSessionNo', '$userSessionId') ";
            $command = $connection->createCommand($sql);
            $result = $command->execute();
            if($result>0){
                $lastInsertedId = $connection->getLastInsertID();
                $retStatus = true;
            }
        }catch(Exception $ex){}
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-06
    public static function generateMaxSessionNo(){
        $maxUserSessionNo = 0;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                COALESCE(MAX(session_idno),0) userSessionId
                FROM USERSESSION";
            $command = $connection->createCommand($sql);
            $sessionNoDetailsArr = $command->queryAll();
            if(count($sessionNoDetailsArr)>0 && $sessionNoDetailsArr!=false){
                $maxUserSessionNo =  (int) $sessionNoDetailsArr[0]['userSessionId'];    
            }
        }catch(Exception $ex){}
        return $maxUserSessionNo;
    }
    
    // CJ defined this function 2016-09-21
    public static function addUserOtpcodeDetails($paramData){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('user_sessionid', $paramData)){
            if($paramData['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$paramData['user_sessionid']."',";
            }
        }
        if(array_key_exists('name', $paramData)){
            if($paramData['name']!='' && strlen($paramData['name'])>0){
                $sqlColumnNames.=" name,";
                $sqlValues.="'".$paramData['name']."',";
            }
        }
        if(array_key_exists('email', $paramData)){
            if($paramData['email']!='' && strlen($paramData['email'])>0){
                $sqlColumnNames.=" email,";
                $sqlValues.="'".$paramData['email']."',";
            }
        }
        if(array_key_exists('mobile', $paramData)){
            if($paramData['mobile']!='' && strlen($paramData['mobile'])>0){
                $sqlColumnNames.=" mobile,";
                $sqlValues.="'".$paramData['mobile']."',";
            }
        }
        if(array_key_exists('otpcode', $paramData)){
            if($paramData['otpcode']!='' && strlen($paramData['otpcode'])>0){
                $sqlColumnNames.=" otpcode,";
                $sqlValues.="'".$paramData['otpcode']."',";
            }
        }
        if(array_key_exists('sent_onmedium', $paramData)){
            if($paramData['sent_onmedium']!='' && strlen($paramData['sent_onmedium'])>0){
                $sqlColumnNames.=" sent_onmedium,";
                $sqlValues.="'".$paramData['sent_onmedium']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO USER_OTPCODE ".rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-06
    public static function checkOtpCodeActiveForUserSignUpAuth($userSessionId, $name, $email, $mobile, $otpcode){
        $retResult = 0;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT 
                uotpc.id otpcodeId
                FROM USER_OTPCODE uotpc
                WHERE 
                uotpc.user_sessionid='$userSessionId' AND uotpc.name='$name'
                AND uotpc.email='$email' AND uotpc.mobile='$mobile'
                AND uotpc.otpcode='$otpcode' AND uotpc.status='S'";
            $command = $connection->createCommand($sql);
            $userOtpcodeDataArr = $command->queryAll();
            if(count($userOtpcodeDataArr)==1 && $userOtpcodeDataArr!=false){
                $retResult = $userOtpcodeDataArr;
            }
        }catch(Exception $ex){
            $retResult = false;
        }
        return $retResult;
    }
    
    // CJ defined this function 2016-08-21
    public static function updateOtpCodeStatus($otpcodeId){
        $retStatus = 'FALSE';
        if($otpcodeId>0 && $otpcodeId!=false){
            $connection = Yii::app()->db;
            $sql = "UPDATE USER_OTPCODE uotpc SET uotpc.status='V' WHERE uotpc.id='$otpcodeId'";
            $command = $connection->createCommand($sql);
            $retResult = $command->execute();
            if($retResult>0 && $retResult!=false){
                $retStatus = 'TRUE';
            }
        }
        return $retStatus;
    }
    
}
