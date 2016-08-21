<?php

/**
* Description of PartyOrdersServicesV1
* @author CJ defined this service 2016-07-20
*/

class PartyOrdersServicesV1 implements IPartyOrdersServicesV1{
    
    // CJ defined this action 2016-08-21
    public function addPartyOrdersRequest($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["isPartyOrderRequestSend"] = 'NO';
        // check requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // add party order request status
            $dkParamDataArr['status'] = 'R';
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['created_by'] = $userSessionDetailsData['unmd5UserId'];
            }
            $dkParamDataArr['partyorder_no'] = commonfunction :: generatePartyOrderNo();
            $lastPORID = PartyOrdersDao::addPartyOrderRequest($dkParamDataArr);
            if($lastPORID>0){
                $rspDetails["isPartyOrderRequestSend"] = 'YES';
                // send sms to end user to inform about party order request recieve by desserts khazana
                // $retEmailSentStatus = commonfunction :: preparedDataSendingEmailAboutPartyOrdersRequestReceiveFromCustomer($dkParamDataArr);
                // $smsMsgBody = "Sms Testing CJ";
                // $retSmsSentStatus = utils :: sendSMS(array("9975967186"), $smsMsgBody);
            }   
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
   
}
