<?php


class validation{
    
    public static function isNumberic($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false && $contentData!=true){
            $regPattern = "/^[1-9][0-9]{0,15}$/";
            if(preg_match($regPattern, $contentData)>0){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }

}
