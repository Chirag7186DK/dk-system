<?php

/**
* Description of PartyOrdersServicesV1
* @author CJ defined this service 2016-07-20
*/

class PartyOrdersServicesV1 implements IPartyOrdersServicesV1{
    
    // CJ defined this action 2016-07-20
    public function addPartyOrdersRequest($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["isPartyOrderRequestSend"] = 'NO';
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
            $lastPORID = PartyOrdersDao::addPartyOrderRequest($dkParamDataArr);
            if($lastPORID>0){
                $rspDetails["isPartyOrderRequestSend"] = 'YES';
                // add request to log
                $dkParamDataArr['party_id'] = $lastPORID;
                $lastPORLogID = PartyOrdersDao::addPartyOrderRequestLog($dkParamDataArr);
                // send sms to end user to inform about party order request recieve by desserts khazana
                $retEmailSentStatus = commonfunction :: preparedDataSendingEmailAboutPartyOrdersRequestReceiveFromCustomer($dkParamDataArr);
                $smsMsgBody = "Sms Testing CJ";
                $retSmsSentStatus = utils :: sendSMS(array("9975967186"), $smsMsgBody);
            }   
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
   
}
