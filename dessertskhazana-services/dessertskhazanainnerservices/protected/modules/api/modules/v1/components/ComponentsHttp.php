<?php

class ComponentsHttp{
    
    public static function httpMethod() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET')
            return 'GET';
        else if ($_SERVER['REQUEST_METHOD'] == 'POST')
            return 'POST';
        else if ($_SERVER['REQUEST_METHOD'] == 'PUT')
            return 'PUT';
        else if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
            return 'DELETE';
    }

    public static function setHeader($statusCode){
        //header('HTTP/1.1 '.$statusCode.' '.self::getStatusCodeMessage($statusCode));
    }

    public static function getStatusCodeMessage($status){
        $codes = array(
            100 => 'Continue',
            101 => 'Switching Protocols',
            200 => 'Ok',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            306 => '(Unused)',
            307 => 'Temporary Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported'
        );
        return (isset($codes[$status])) ? $codes[$status] : '';
    }

    public static function setCustomheader($key, $value) {
        //header($key . ":" . $value);
    }

    public static function setSecurityHeader($hashString) {
        self::setCustomheader("hash", $hashString);
    }

    public static function PrepareIncommingPostData() {
        ini_set("allow_url_fopen", true);
        $replaceNewLine = array("\r\n", "\n", "\r");
        $postData = str_replace($replaceNewLine, " ", file_get_contents("php://input"));
        $data = json_decode($postData, true);
        return $data;
    }

    public static function prepareInCommingGetData(){
        if(array_key_exists('data', $_GET)){
            $replaceNewLine = array("\r\n", "\n", "\r");
            $getData1 = str_replace($replaceNewLine, " ", $_GET['data']);
            $getData = str_replace("trophyhouseparam", "#", $getData1);
            $data = json_decode($getData, true);
            return $data;
        }else{
            return false;
        }
    }

    public static function VerifySecurityHeader(){
        $headerExists = false;
        $headers = apache_request_headers();
        foreach ($headers as $key => $value) {
            if (strtolower($key)=='hash' && $value==SessionDto::$sessionKey){
                $headerExists = true;
            }
        }
        return $headerExists; //@FIXME Fourcefull true for security header
    }

    public static function GenerateInvalidAccess() {
        self::setHeader(400);
        ComponentsJson::setRetTypeAsJSON();
        $json = array(
            'statusCode' => 400,
            'statusMsg' => "FAILED",
            "message"=>"Invalid Url Access"
        );
        ComponentsJson::GenerateJsonAndSend($json);
        die();
    }

    /*
    * This function is used to check the 'action' requested by the user
    */
    public static function getActionName() {
        $uri = $_SERVER['REQUEST_URI'];
        $action = substr($uri, strrpos($uri, '/') + 1);
        return $action;
    }
    
}