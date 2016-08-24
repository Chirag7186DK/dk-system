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
            // add customize order request status
            $dkParamDataArr['status'] = 'R';
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['customizeorder_no'] = commonfunction :: generateCustomizeOrderNo();
                $dkParamDataArr['name'] = $userSessionDetailsData['userName'];
                $dkParamDataArr['mobile'] = $userSessionDetailsData['userMobile'];
                $dkParamDataArr['email'] = $userSessionDetailsData['userEmail'];
                $dkParamDataArr['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['created_by'] = $userSessionDetailsData['unmd5UserId'];
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
                $customizeOrderDetailsArr = commonfunction :: getCustomizeOrderList($user_id);
                if(count($customizeOrderDetailsArr)>0 && $customizeOrderDetailsArr!=false){
                    $rspDetails['customizeOrderList'] = $customizeOrderDetailsArr;
                }
            }
        } 
        return $rspDetails;
    }
   
}
