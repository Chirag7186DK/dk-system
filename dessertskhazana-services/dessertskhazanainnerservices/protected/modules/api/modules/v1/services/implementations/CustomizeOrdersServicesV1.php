<?php

/**
* Description of CustomizeOrdersServicesV1
* @author CJ defined this service 2016-07-24
*/

class CustomizeOrdersServicesV1 implements ICustomizeOrdersServicesV1{
    
    // CJ defined this action 2016-08-21
    public function addCustomizeOrdersRequest($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["coRequestedStatusDetails"] = array();
        $rspDetails['coRequestedStatusDetails']["isCustomizeOrderRequestSend"] = 'NO';
        $rspDetails['coRequestedStatusDetails']["customizeOrderNo"] = '';
        // check requested param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['customizeorder_no'] = commonfunction :: generateCustomizeOrderNo();
                $dkParamDataArr['user_id'] = $unmd5UserId;
                $dkParamDataArr['created_by'] = $unmd5UserId;
                $dkParamDataArr['status'] = 'R';
                $lastCORID = CustomizeOrdersDao::addCustomizeOrderRequest($dkParamDataArr);
                if($lastCORID>0 && $lastCORID!=false){
                    $rspDetails['coRequestedStatusDetails']["isCustomizeOrderRequestSend"] = 'YES';
                    $rspDetails['coRequestedStatusDetails']["customizeOrderNo"] = $dkParamDataArr['customizeorder_no'];
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
    public function getCustomizeOrderList($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $user_id = $userSessionDetailsData['unmd5UserId'];
                $dataArr1 = commonfunction :: getCustomizeOrderList($user_id);
                if(count($dataArr1)>0 && $dataArr1!=false){
                    $rspDetails['customizeOrderList'] = $dataArr1;
                }
            }
        } 
        return $rspDetails;
    }
   
}
