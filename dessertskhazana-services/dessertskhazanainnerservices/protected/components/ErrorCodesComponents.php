<?php


class ErrorCodesComponents{
	
    public static function generateSimsErrorCode($simsErrorCode){
        $errorArray	= self::generateErrorCode($simsErrorCode);
        $error = array("error" => $errorArray);
        return $error;
    }

    private static function generateErrorCode($simsErrorCode){
        $simsStatus = array();
        return (isset($simsStatus[$simsErrorCode])) ? $simsStatus[$simsErrorCode] : array(
            "code"			=>		9999,
            "message"		=>		"Undefined error occurred",
            "description"	=>		"We were not able to trace this!. It seems that you have found a bug. Please report it",
            "link"			=>		"http://api.dessertskhazana.com/v1/bugs"
        );
    }
}