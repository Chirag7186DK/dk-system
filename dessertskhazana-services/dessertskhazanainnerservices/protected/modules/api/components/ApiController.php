<?php

// CJ added lines of code here 2016-07-24
error_reporting(E_ALL);

function dk_errorhandling($errorNo, $errorMsg, $errorFile, $errorLineNo, $otherVars){
    global $SiteTitle;
    $preparingErrorMsgStr = "Error occured at server level=>". $SiteTitle;
    $preparingErrorMsgStr.=", ErrorNo=>".$errorNo;
    $preparingErrorMsgStr.=", Filepath=>".$errorFile;
    $preparingErrorMsgStr.=", Fileno=>".$errorLineNo;
    $preparingErrorMsgStr.=", Mesage=>".$errorMsg;
    throw new Exception($preparingErrorMsgStr);
}
set_error_handler('dk_errorhandling');

class ApiController extends Controller{
    
    public function init() {
        parent::init();
        Yii::app()->attachEventHandler('onError', array($this, 'dk_errorhandling'));
        Yii::app()->attachEventHandler('onException', array($this, 'dk_errorhandling'));
    }
    
    // CJ added lines of code here 2016-07-24
    public function dk_errorhandling(CEvent $event){
        $event->handled = true;
        $errorNo = $event->exception->getCode();
        $errorMsg = $event->exception->getMessage();
        $errorFile = $event->exception->getFile();
        $errorLineNo = $event->exception->getLine();
        $otherVars = '';
        // store error in db
        $retLastInsertedErrorReportingLogId = utils :: generatingErrorReportingLog($errorNo, $errorMsg, $errorFile, $errorLineNo, $otherVars);
        $retSentSmsStatus = commonfunction :: preparedSmsDataToSendAdminMembersForErrorOccuredOnServer($errorNo, $errorMsg, $errorFile, $errorLineNo, $otherVars);
        $retSentEmailStatus = commonfunction :: preparedEmailDataToSendAdminMembersForErrorOccuredOnServer($errorNo, $errorMsg, $errorFile, $errorLineNo, $otherVars);
        commonfunction :: generateResponseDataForErrorOccured();
    }
    
}
