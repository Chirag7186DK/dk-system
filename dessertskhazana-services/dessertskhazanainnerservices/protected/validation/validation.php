<?php


class validation{
    
    public static function isNumberic($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false){
            $regPattern = "/^[1-9]+$/";
            if(preg_match($regPattern, $contentData)>0){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }

}
