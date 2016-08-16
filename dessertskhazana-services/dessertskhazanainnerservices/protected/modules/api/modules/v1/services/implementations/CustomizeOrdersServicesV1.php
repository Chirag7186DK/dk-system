<?php

/**
* Description of CustomizeOrdersServicesV1
* @author CJ defined this service 2016-07-24
*/

class CustomizeOrdersServicesV1 implements ICustomizeOrdersServicesV1{
    
    // CJ defined this action 2016-07-20
    public function addCustomizeOrdersRequest($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["isCustomizeOrderRequestSend"] = 'NO';
        // check requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            // fetch unmd5 user data 
            $unmd5UserDataArr = UsersDao :: getUserDetails($dkParamDataArr);
            if(count($unmd5UserDataArr)==1 && $unmd5UserDataArr!=false){
                $dkParamDataArr['user_id'] = $unmd5UserDataArr[0]['unmd5UserId'];
                $dkParamDataArr['created_by'] = $unmd5UserDataArr[0]['unmd5UserId'];
            }
            // add party order request
            $dkParamDataArr['status_id'] = '1';
            $lastCORID = CustomizeOrdersDao::addCustomizeOrderRequest($dkParamDataArr);
            if($lastCORID>0 && $lastCORID!=false){
                $rspDetails["isCustomizeOrderRequestSend"] = 'YES';
                // add request to log
                $dkParamDataArr['customizeorder_id'] = $lastCORID;
                $lastCORLogID = CustomizeOrdersDao::addCustomizeOrderRequestLog($dkParamDataArr);
                // send sms to end user to inform about customize order request recieve by desserts khazana
                $retEmailSentStatus = commonfunction :: preparedDataSendingEmailAboutCustomizeOrdersRequestReceiveFromCustomer($dkParamDataArr);
                $smsMsgBody = "Sms Testing CJ";
                $retSmsSentStatus = utils :: sendSMS(array("9975967186"), $smsMsgBody);
            }   
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
   
}
