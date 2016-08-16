<?php

/**
* Description of CorporateTieupServicesV1
* @author CJ defined this service 2016-07-24
*/

class CorporateTieupServicesV1 implements ICorporateTieupServicesV1{
    
    // CJ defined this action 2016-07-24
    public function addCorporateTieupRequest($dkParamDataArr){
        $rspDetails = array();
        $rspDetails["isCorporateTieupRequestSend"] = 'NO';
        // check requested param data
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            $lastCTRID = CorporateTieupDao::addCorporateTieupRequest($dkParamDataArr);
            if($lastCTRID>0 && $lastCTRID!=false){
                $rspDetails["isCorporateTieupRequestSend"] = 'YES';
                // add request to log
                $dkParamDataArr['corporatetieup_id'] = $lastCTRID;
                $lastCTRLogID = CorporateTieupDao::addCorporateTieupRequestLog($dkParamDataArr);
                // send sms to end user to inform about corporate tieup request recieve by desserts khazana
                $retEmailSentStatus = commonfunction :: preparedDataSendingEmailAboutCorporateTieupRequestReceiveFromCustomer($dkParamDataArr);
                $smsMsgBody = "Sms Testing CJ";
                $retSmsSentStatus = utils :: sendSMS(array("9975967186"), $smsMsgBody);
            }   
        } 
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
   
}
