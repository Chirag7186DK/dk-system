<?php

require_once('SimpleEmailService.php');
require_once('SimpleEmailServiceMessage.php');
require_once('SimpleEmailServiceRequest.php');
require_once('curlHttpClient.php');
require_once('textlocal.class.php');

class utils{
    
    // CJ defined this function 2016-06-15
    public static function generatingErrorReportingLog($errorNo, $errorMsg, $errorFilePath, $errorLineNo, $otherVars){
        $retLastInseredErrorLogId = false;
        if($errorNo!='' && $errorMsg!='' && $errorFilePath!='' && $errorLineNo!=''){
            // CJ think about sms/email services to send error reporting 
            global $isSendSmsEmailToAdminOnErrorOccured, $SentEmailOnErrorOccured, $SentSmsOnErrorOccured, $SiteTitle;
            $allEmailIds = $SentEmailOnErrorOccured;
            $allMobileNos = $SentSmsOnErrorOccured;
            $siteTitle = $SiteTitle;
            $preparingErrorMsgStr = "Error occured on site=>". $siteTitle;
            $preparingErrorMsgStr.=", ErrorNo=>".$errorNo;
            $preparingErrorMsgStr.=", Filepath=>".$errorFilePath;
            $preparingErrorMsgStr.=", Fileno=>".$errorLineNo;
            $preparingErrorMsgStr.=", Mesage=>".$errorMsg;
            $sqlQuery = "INSERT INTO ERRORREPORTINGLOG";
            $sqlColumnNames = "";
            $sqlValues = "";
            if($preparingErrorMsgStr!=''){
                $sqlColumnNames.=" erroroccured_description,";
                $sqlValues.="'" . $preparingErrorMsgStr . "',";
            }
            if($isSendSmsEmailToAdminOnErrorOccured=='Y'){
                $errorOccuredInformedium = 'SMS|EMAIL';
                $sqlColumnNames.=" erroroccured_informedmedium,";
                $sqlValues.="'" . $errorOccuredInformedium . "',";
            }
            if($allEmailIds!='' && count($allEmailIds)>0 
                && $allMobileNos!='' && count($allMobileNos)>0){
                $errorOccuredInformedOn = implode(",", $allEmailIds);
                $errorOccuredInformedOn.= "|".implode(",", $allMobileNos);
                $sqlColumnNames.= " erroroccured_informedon,";
                $sqlValues.= "'".$errorOccuredInformedOn."',";
            }
            if($sqlColumnNames!='' && $sqlValues!=''){
                $sqlColumnNames.= " occured_datedtime,";
                $sqlValues.= "'" . date('Y-m-d H:i:s') . "',";
                $sqlQuery.= rtrim(" (".$sqlColumnNames, ',') .")" .rtrim(" VALUES(".$sqlValues, ',').")";
                $connection = Yii::app()->db;
                $command = $connection->createCommand($sqlQuery);
                $retLastInseredErrorLogId = $command->execute();
            }
        }
        return $retLastInseredErrorLogId;
    }

    // CJ defined this function 2016-06-15
    public static function resolvedGeneratedErrorReportingLog($resolvedErrorLogArr){
        
        if(count($resolvedErrorLogArr)>0 && $resolvedErrorLogArr!=false){
            // CJ think about sms/email services to send error reporting 
            global $isSendSmsEmailToAdminOnErrorOccured, $SentEmailOnErrorOccured, $SentSmsOnErrorOccured, $SiteTitle;
            $allEmailIds = $SentEmailOnErrorOccured;
            $allMobileNos = $SentSmsOnErrorOccured;
            try {
                $sqlQuery = "";
                if(array_key_exists('errorresolved_description', $resolvedErrorLogArr)){
                    if($resolvedErrorLogArr['errorresolved_description']!=''){
                        $sqlQuery.=" errorresolved_description='".$resolvedErrorLogArr['errorresolved_description']."',";
                    }
                }
                if(array_key_exists('resolvedby', $resolvedErrorLogArr)){
                    if($resolvedErrorLogArr['resolvedby']!=''){
                        $sqlQuery.=" resolvedby='".$resolvedErrorLogArr['resolvedby']."',";
                    }
                }
                if($isSendSmsEmailToAdminOnErrorOccured=='Y'){
                    if($allEmailIds!='' && count($allEmailIds)>0 
                        && $allMobileNos!='' && count($allMobileNos)>0){
                        $resolvedErrorInformedOn = implode(",", $allEmailIds);
                        $resolvedErrorInformedOn.= "|" . implode(",", $allMobileNos);
                        $sqlQuery.=" errorresolved_informedon='".$resolvedErrorInformedOn."',";
                    }
                }    
                if($sqlQuery!=''){
                    $sqlQuery.=" resolved_datedtime='".date('Y-m-d H:i:s')."',";
                    $connection = Yii::app()->db;
                    $command = $connection->createCommand($sqlQuery);
                    $result = $command->execute();
                }
            }catch(Exception $ex){
            }
        }
    }
    
    
    // CJ defined this functio 2016-07-23
    public static function sendEmail($toEmailIdArr, $msgSubject, $msgBody, $fileAttachmentArr=array(), $senderEmailId=''){
        $retEmailSentStatus = false;
        try{
            if(count($toEmailIdArr)>0 && $toEmailIdArr!=false
                && $msgSubject!='' && $msgSubject!=false   
                && $msgBody!='' && $msgBody!=false){
                
                if($senderEmailId==''){
                    // need to change here email id
                    $senderEmailId = $GLOBALS['EMAILSENDER'];
                }
                
                $content = utils :: getEmailMsgBodyContentForSending($msgBody, $senderEmailId);
                // sender email access data
                $sesAccessKey = $GLOBALS['SESACCESSKEY'];
                $sesSecretKey = $GLOBALS['SESSECRETKEY'];
                $awsSesServicesObj = new SimpleEmailService($sesAccessKey, $sesSecretKey);
                $emailObj = new SimpleEmailServiceMessage();
                // maximum EMAIl allowed to send in one batch
                $max_email_count = 45; 
                for($eachRecvrAddrIndex = 0; $eachRecvrAddrIndex<count($toEmailIdArr);){
                    $sentToEmailAddrArr = array();
                    for($eachEmailCount = 0; $eachEmailCount<$max_email_count && $eachEmailCount<count($toEmailIdArr); $eachEmailCount++, $eachRecvrAddrIndex++){
                        $sentToEmailAddrArr[] = $toEmailIdArr[$eachRecvrAddrIndex];
                    }
                    $emailObj->addTo(implode(",", $sentToEmailAddrArr));
                    $emailObj->setFrom($senderEmailId);
                    $emailObj->setSubject($msgSubject);
                    $emailObj->setMessageFromString('', $content);
                    // add attachment to email
                    if(count($fileAttachmentArr)>0 && $fileAttachmentArr!=false){
                        for($eachAttchmentIndex = 0; $eachAttchmentIndex<count($fileAttachmentArr); $eachAttchmentIndex++){
                        }
                    }
                    // send email batch wise to clients min 45 slot receiver addr
                    $awsSesServicesObj->sendEmail($emailObj);
                    $retEmailSentStatus = true;
                }
            }
        }catch(Exception $ex){
            $retEmailSentStatus = false;
        }
        return $retEmailSentStatus;
    }
    
    // CJ defined this function 2016-07-23
    public static function getEmailMsgBodyContentForSending($msgBody, $from){
        $content = "<table border='0' style='font-family:Verdana, Geneva, sans-serif; font-size:13px;'>
            <tr>
                <td style='color:black;'>".$msgBody."</td>
            </tr>
            <tr>
                <td style='color:black;'>From: ".$from."</td>
            </tr>
        </table>";
        return $content;
    }
    
    // CJ defined this functio 2016-07-23
    public static function sendSMSSameContentOnBulkMobile($mobileDataArr, $msgBody, $smsSender=''){
        $rtSmsSentStatus = false;
        try{
            if(count($mobileDataArr)>0 && $mobileDataArr!=false
                && $msgBody!='' && $msgBody!=false){
                
                if($smsSender==''){
                    $smsSender = $GLOBALS['SMSSENDER'];
                }
                $smsUserName = $GLOBALS['SMSUSERNAME'];
                $smsApiHash = $GLOBALS['SMSAPIHASH'];
                
                // append each mobile no.s prefix
                $countMobileLength = count($mobileDataArr);
                for($eachMobileIndex = 0; $eachMobileIndex<$countMobileLength; $eachMobileIndex++){
                    $mobileDataArr[$eachMobileIndex] = "91".$mobileDataArr[$eachMobileIndex];
                }
                
                // initialize constructor
                $txtLocalClassObj = new textlocal($smsUserName, $smsApiHash, false);
                $rspSendsmsObj = $txtLocalClassObj->sendSms($mobileDataArr, $msgBody, $smsSender);
                
            }
        }catch(Exception $ex){
            $rtSmsSentStatus = false;
        }
        return $rtSmsSentStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function getUserAccessingWebsiteGeoLocationDetails(){
        $retUserGeolocationDetailsArr = array();
        $retUserGeolocationDetailsArr['ipaddress'] = $_SERVER['REMOTE_ADDR'];
        // $retUserGeolocationDetailsArr['geolocation'] = '';
        $retUserGeolocationDetailsArr['geolocation'] = $_SERVER['REMOTE_ADDR'];
        /*
            $getUserGeolocationDetailsArr = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$retUserGeolocationDetailsArr['ipaddress']));
            if(count($getUserGeolocationDetailsArr)>0 && $getUserGeolocationDetailsArr!=''){
                unset($getUserGeolocationDetailsArr['geoplugin_credit']);
                $retUserGeolocationDetailsArr['geolocation'] = json_encode($getUserGeolocationDetailsArr);
            }
        */
        return $retUserGeolocationDetailsArr;
    }
    
    // array_common func 2015-10-07
    public static function array_merge_common_elements($allJsonInArray1 = array(), $allJsonInArray2 = array(), $compareKeyNameArr, $pushKeyNameArrInMatchedArrFromArr2 = array(), $pushKeyNameArrInMatchedArr = array(), $pushKeyNameValueArrInArr1NotMatchedFromArr2 = array()) {
        if (count($allJsonInArray1) == 0 && count($allJsonInArray2) == 0) {
            return false;
        } else {
            //iterate each json arr in $allJsonInArray1
            foreach ($allJsonInArray1 as $eachArray1Index => $eachJsonArrInArray1) {
                $counterEachCompareKeyNameKaValue = 0;
                if (count($eachJsonArrInArray1) > 0 && $eachJsonArrInArray1 != false) {
                    //fetch all keys names in arr format     
                    $allKeysNamesOfArrEachJsonArrInArray1 = array_keys($eachJsonArrInArray1);
                    if (count($allJsonInArray2) > 0 && $allJsonInArray2 != false && $allJsonInArray2 != null) {
                        //iterate each json arr in $allJsonInArray2
                        foreach ($allJsonInArray2 as $eachJsonArrInArray2) {
                            //fetch all keys names in arr format     
                            $allKeysNamesOfArrEachJsonArrInArray2 = array_keys($eachJsonArrInArray2);
                            if (count($compareKeyNameArr) > 0 && $compareKeyNameArr != false && $compareKeyNameArr != null) {
                                $allKeyNamesCompareArr = array_keys(array_combine($compareKeyNameArr, $compareKeyNameArr));
                                if (count($allKeyNamesCompareArr) > 0) {
                                    $array1Intersect = array_intersect($allKeyNamesCompareArr, $allKeysNamesOfArrEachJsonArrInArray1);
                                    $array2Intersect = array_intersect($allKeyNamesCompareArr, $allKeysNamesOfArrEachJsonArrInArray2);
                                    if (count($array1Intersect) == count($array2Intersect) && count($array1Intersect) == count($compareKeyNameArr) && count($array2Intersect) == count($compareKeyNameArr)) {
                                        //iterate each compare keyname in $compareKeyNameArr
                                        for ($eachCompareKeyNamePos = 0; $eachCompareKeyNamePos < count($compareKeyNameArr); $eachCompareKeyNamePos++) {
                                            //check each compare key name exists in $allJsonInArray2, $allJsonInArray1
                                            if (array_key_exists($compareKeyNameArr[$eachCompareKeyNamePos], $eachJsonArrInArray1) == true && array_key_exists($compareKeyNameArr[$eachCompareKeyNamePos], $eachJsonArrInArray2) == true) {
                                                //check each compare key name ka value in $allJsonInArray2, $allJsonInArray1
                                                if ($eachJsonArrInArray1[$compareKeyNameArr[$eachCompareKeyNamePos]] == $eachJsonArrInArray2[$compareKeyNameArr[$eachCompareKeyNamePos]]) {
                                                    $counterEachCompareKeyNameKaValue++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // if $counterEachCompareKeyNameKaValue is matched with count of $compareKeyNameArr
                            // then push value
                            if ($counterEachCompareKeyNameKaValue == count($compareKeyNameArr) && $counterEachCompareKeyNameKaValue > 0 && count($compareKeyNameArr) > 0) {
                                // check $pushKeyNameArrInMatchedArr is >0 
                                if (count($pushKeyNameArrInMatchedArrFromArr2) > 0 && $pushKeyNameArrInMatchedArrFromArr2 != '' && $pushKeyNameArrInMatchedArrFromArr2 != null) {
                                    //iterate each push key name ka value 
                                    for ($eachPushKeyNamePos = 0; $eachPushKeyNamePos < count($pushKeyNameArrInMatchedArrFromArr2); $eachPushKeyNamePos++) {
                                        if (array_key_exists($pushKeyNameArrInMatchedArrFromArr2[$eachPushKeyNamePos], $allJsonInArray2)) {
                                            $eachJsonArrInArray1[$pushKeyNameArrInMatchedArrFromArr2[$eachPushKeyNamePos]] = $allJsonInArray2[$pushKeyNameArrInMatchedArrFromArr2[$eachPushKeyNamePos]];
                                            $allJsonInArray1[$eachArray1Index] = $eachJsonArrInArray1[$pushKeyNameArrInMatchedArrFromArr2[$eachPushKeyNamePos]];
                                        }
                                    }
                                }
                                // check $pushKeyNameArrInMatchedArr is >0 
                                if (count($pushKeyNameArrInMatchedArr) > 0 && $pushKeyNameArrInMatchedArr != '' && $pushKeyNameArrInMatchedArr != null) {
                                    $allJsonInArray1[$eachArray1Index] = array_merge($allJsonInArray1[$eachArray1Index], $pushKeyNameArrInMatchedArr);
                                }
                            } else {
                                // check $pushKeyNameArrInMatchedArr is >0 
                                if (count($pushKeyNameValueArrInArr1NotMatchedFromArr2) > 0 && $pushKeyNameValueArrInArr1NotMatchedFromArr2 != '' && $pushKeyNameValueArrInArr1NotMatchedFromArr2 != null) {
                                    $allJsonInArray1[$eachArray1Index] = array_merge($allJsonInArray1[$eachArray1Index], $pushKeyNameValueArrInArr1NotMatchedFromArr2);
                                }
                            }
                        }
                    } else {
                        // check $pushKeyNameArrInMatchedArr is >0 
                        if (count($pushKeyNameValueArrInArr1NotMatchedFromArr2) > 0 && $pushKeyNameValueArrInArr1NotMatchedFromArr2 != '' && $pushKeyNameValueArrInArr1NotMatchedFromArr2 != null) {
                            $allJsonInArray1[$eachArray1Index] = array_merge($allJsonInArray1[$eachArray1Index], $pushKeyNameValueArrInArr1NotMatchedFromArr2);
                        }
                    }
                }
            }
        }
        return $allJsonInArray1;
    }

    // CJ defined this function 2015-10-28
    public static function arraySort($inputArr, $sortByArr = array(), $joinStrWithSortingKeyArr = array()) {
        $sorting_index_count = count($sortByArr);
        $results = array();
        $arrayIndex1 = 0;
        $arrayIndex2 = 0;
        $isGivenSortByKeyPresent = false;
        $previousAllSortByKeyValueStored = array();
        foreach ($inputArr as $eachKey => $eachKeyValueDetailsArr) {
            if (count($eachKeyValueDetailsArr) > 0 && $eachKeyValueDetailsArr != '') {
                $currentAllSortByKeyValueStored = array();
                $currentIterateKeyValueDetailsArr = $eachKeyValueDetailsArr;
                if ($sorting_index_count > 0 && $sorting_index_count != '') {
                    $ind = '';
                    foreach ($sortByArr as $eachColumnName) {
                        if (array_key_exists($eachColumnName, $currentIterateKeyValueDetailsArr)) {
                            $keyName = $currentIterateKeyValueDetailsArr[$eachColumnName];
                            if (count($joinStrWithSortingKeyArr) > 0 && $joinStrWithSortingKeyArr != '') {
                                if (array_key_exists($eachColumnName, $joinStrWithSortingKeyArr)) {
                                    $collectionOfJoinStrWithKeyArrExplode = explode("##", $joinStrWithSortingKeyArr[$eachColumnName]);
                                    if (count($collectionOfJoinStrWithKeyArrExplode) > 0) {
                                        for ($eachJoinStrKeyIndex = 0; $eachJoinStrKeyIndex < count($collectionOfJoinStrWithKeyArrExplode); $eachJoinStrKeyIndex++) {
                                            if ($currentIterateKeyValueDetailsArr[$collectionOfJoinStrWithKeyArrExplode[$eachJoinStrKeyIndex]] === null) {
                                                $nullReplaceBlankValue = 'BlankValue';
                                                $keyName.= "##" . $nullReplaceBlankValue;
                                            } else {
                                                $keyName.= "##" . $currentIterateKeyValueDetailsArr[$collectionOfJoinStrWithKeyArrExplode[$eachJoinStrKeyIndex]];
                                            }
                                        }
                                    }
                                }
                            }
                            array_push($currentAllSortByKeyValueStored, $eachColumnName . "#keymatch" . $keyName);
                            $ind.= "['" . str_replace("'", "\'", $keyName) . "']";
                            $isGivenSortByKeyPresent = true;
                        }
                    }
                }
                if (count($currentAllSortByKeyValueStored) > 0) {
                    if (count($previousAllSortByKeyValueStored) == 0) {
                        $previousAllSortByKeyValueStored[trim(implode(",", $currentAllSortByKeyValueStored))] = 0;
                    } else {
                        if (array_key_exists(trim(implode(",", $currentAllSortByKeyValueStored)), $previousAllSortByKeyValueStored)) {
                            $previousAllSortByKeyValueStored[trim(implode(",", $currentAllSortByKeyValueStored))] = $previousAllSortByKeyValueStored[trim(implode(",", $currentAllSortByKeyValueStored))] + 1;
                        } else {
                            $previousAllSortByKeyValueStored[trim(implode(",", $currentAllSortByKeyValueStored))] = 0;
                        }
                    }
                }
                //CJ commented code 2015-11-06
                if ($sorting_index_count > 0 && $sorting_index_count != '' && $ind != '' && $isGivenSortByKeyPresent == true) {
                    $arrayIndex1 = $previousAllSortByKeyValueStored[trim(implode(",", $currentAllSortByKeyValueStored))];
                    eval('$results' . $ind . '[$arrayIndex1] = $eachKeyValueDetailsArr;');
                } else {
                    $results[$arrayIndex2] = $eachKeyValueDetailsArr;
                }
                if ($isGivenSortByKeyPresent == false) {
                    $arrayIndex2++;
                }
            }
        }
        return $results;
    }

    //CJ defined this func 2015-11-06
    public static function getGroupConcatStringGivenJsonDataArr($jsonDataArr, $groupConcatStrKeyBasedArr = array(), $isReturnUniqueConcatStr = 'N') {
        if (count($jsonDataArr) > 0 && $jsonDataArr != '' && count($groupConcatStrKeyBasedArr) > 0 && $groupConcatStrKeyBasedArr != '') {
            $groupConcatStrArr = array();
            for ($eachJsonKeyIndex = 0; $eachJsonKeyIndex < count($jsonDataArr); $eachJsonKeyIndex++) {
                foreach ($jsonDataArr[$eachJsonKeyIndex] as $keyName => $keyNameValue) {
                    if (array_key_exists($keyName, $groupConcatStrKeyBasedArr) == true) {
                        if ($keyNameValue != '') {
                            if (array_key_exists($keyName, $groupConcatStrArr) == true) {
                                $storedDataArr = $groupConcatStrArr[$keyName];
                                if ($isReturnUniqueConcatStr == 'Y' && !in_array($keyNameValue, $storedDataArr)) {
                                    array_push($storedDataArr, $keyNameValue);
                                    $groupConcatStrArr[$keyName] = $storedDataArr;
                                } else if ($isReturnUniqueConcatStr == 'N') {
                                    array_push($storedDataArr, $keyNameValue);
                                    $groupConcatStrArr[$keyName] = $storedDataArr;
                                }
                            } else {
                                $storedDataArr = array($keyNameValue);
                                $groupConcatStrArr[$keyName] = $storedDataArr;
                            }
                        }
                    }
                }
            }

            if (count($groupConcatStrArr) > 0 && $groupConcatStrArr != '') {
                foreach ($groupConcatStrArr as $keyName => $keyNameValueArr) {
                    if (count($keyNameValueArr) > 0 && $keyNameValueArr != '') {
                        $groupConcatStrArr[$keyName] = implode(",", $keyNameValueArr);
                    }
                }
            }
            return $groupConcatStrArr;
        } else {
            return false;
        }
    }

    // CJ defined this function 2015-11-06
    public static function makeArrJsonSequenceOrderOnKeyBasedValue($inputArr, $matchedWithKeysArr=array(), $matchedWithKeyValueArr=array()){
        if(count($inputArr)>0 && $inputArr!=false){
            $sequenceOrderArrJsonData = array();
            $notSequenceOrderArrJsonData = array();
            // iterate each json data of array
            for($eachArrJsonIndex = 0; $eachArrJsonIndex<count($inputArr); $eachArrJsonIndex++){
                if(count($matchedWithKeysArr)>0 && $matchedWithKeysArr!=false){
                    $keysWithMatchedCounter = 0 ;
                    for($eachMatchedKeyIndex = 0; $eachMatchedKeyIndex<count($matchedWithKeysArr); $eachMatchedKeyIndex++){
                        if(array_key_exists($matchedWithKeysArr[$eachMatchedKeyIndex], $inputArr[$eachArrJsonIndex])==true) {
                            $keysWithMatchedCounter++;
                        }
                    }
                    if($keysWithMatchedCounter==count($matchedWithKeysArr)){
                        array_push($sequenceOrderArrJsonData, $inputArr[$eachArrJsonIndex]);
                    }
                }else if(count($matchedWithKeyValueArr)>0 && $matchedWithKeyValueArr!=false){
                    // CJ plz think on it 
                }
            }
            // final merge first sequence order arr then not sequence arr 
            $inputArr = array_values(array_merge($sequenceOrderArrJsonData, $notSequenceOrderArrJsonData));
            return $inputArr;
        }else{
            return false;
        }
    }

    // CJ defined this function 2016-11-06
    public static function removeJsonKeyAndValuesFromArrayOfJsonArray($inputArr = array(), $removeJsonKeyArr = array()) {
        if ($inputArr == false || count($inputArr) == 0) {
            return false;
        } else if ((count($inputArr) > 0 && $inputArr != false) && ($removeJsonKeyArr == false || count($removeJsonKeyArr) == 0)) {
            return $inputArr;
        }else if (count($inputArr)>0 && $inputArr!=false && $removeJsonKeyArr!=false && count($removeJsonKeyArr) > 0) {
            // iterate each inputarr
            for ($eachInputArrIndex = 0; $eachInputArrIndex < count($inputArr); $eachInputArrIndex++) {
                $inputArr[$eachInputArrIndex] = array_diff_key($inputArr[$eachInputArrIndex], $removeJsonKeyArr);
            }
            return $inputArr;
        }else{
            return false;
        }
    }
    
}
