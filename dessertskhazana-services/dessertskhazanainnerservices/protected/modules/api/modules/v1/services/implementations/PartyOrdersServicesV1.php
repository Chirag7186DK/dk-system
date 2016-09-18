<?php

/**
* Description of PartyOrdersServicesV1
* @author CJ defined this service 2016-07-20
*/

class PartyOrdersServicesV1 implements IPartyOrdersServicesV1{
    
    // CJ defined this action 2016-08-21
    public function addPartyOrdersRequest($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["poRequestedStatusDetails"] = array();
        $rspDetails['poRequestedStatusDetails']["isPartyOrderRequestSend"] = 'NO';
        $rspDetails['poRequestedStatusDetails']["partyOrderNo"] = '';
        // check requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['partyorder_no'] = commonfunction :: generatePartyOrderNo();
                $dkParamDataArr['user_id'] = $unmd5UserId;
                $dkParamDataArr['created_by'] = $unmd5UserId;
                $dkParamDataArr['status'] = 'R';
                $lastPORID = PartyOrdersDao::addPartyOrderRequest($dkParamDataArr);
                if($lastPORID>0 && $lastPORID!=false){
                    $rspDetails['poRequestedStatusDetails']["isPartyOrderRequestSend"] = 'YES';
                    $rspDetails['poRequestedStatusDetails']["partyOrderNo"] = $dkParamDataArr['partyorder_no'];
                    // send sms to end user to inform about party order request recieve by desserts khazana
                    // $retEmailSentStatus = commonfunction :: preparedDataSendingEmailAboutPartyOrdersRequestReceiveFromCustomer($dkParamDataArr);
                    // $smsMsgBody = "Sms Testing CJ";
                    // $retSmsSentStatus = utils :: sendSMS(array("9975967186"), $smsMsgBody);
                }   
            }
        } 
        return $rspDetails;
    }

    // CJ defined this action 2016-08-22
    public function getPartyOrderList($dkParamDataArr) {
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $user_id = $userSessionDetailsData['unmd5UserId'];
                $partyOrderDetailsArr = commonfunction :: getPartyOrderList($user_id);
                if(count($partyOrderDetailsArr)>0 && $partyOrderDetailsArr!=false){
                    $rspDetails['partyOrderList'] = $partyOrderDetailsArr;
                }
            }
        } 
        return $rspDetails;
    }

}
