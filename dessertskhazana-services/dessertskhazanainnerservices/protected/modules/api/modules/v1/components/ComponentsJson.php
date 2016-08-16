<?php

class ComponentsJson{
    
    public static function setRetTypeAsJSON(){
        header("Content-Type: application/json");
    }

    public static function GenerateJsonAndSend($data, $ispretty='N'){
        $data = (array) $data;
        ComponentsHttp::setSecurityHeader(SessionDto::$sessionKey);
        if(isset($data['status']))										//@FIXME	Check that status is sent from all outgoing response no forcefull status setting is a good practice
            ComponentsHttp::setHeader($data['status']);
        else 
            ComponentsHttp::setHeader(200);
        self::setRetTypeAsJSON();
        if($ispretty == 'N'){
            print CJSON::encode(self::createCollectionArray($data));
        }else if($ispretty == 'Y' || $ispretty == 'y'){
            print json_encode(self::createCollectionArray($data), JSON_PRETTY_PRINT);
        }
    }

    private static function createCollectionArray($data){
        $collection = array("collection" => array(
            "response"=>$data
        ));
        return $collection;
    }
}

?>