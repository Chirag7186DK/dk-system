<?php


class validation{
    
    public static function isValidNumberic($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false){
            $regPattern = "/^[1-9]+$/";
            if(preg_match($regPattern, $contentData)>0){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }
    
    public static function isValidEmail($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false){
            if(preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $contentData)>0){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }
    
    public static function isValidMobile($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false){
            if(preg_match("/^[5-9]{1}[0-9]{9}+$/", $contentData)>0){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }
    
    public static function isValidPwd($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false){
            if(strlen($contentData)>=5 && strlen($contentData)<=10){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }
    
    public static function isValidBirthdate($contentData){
        $rtStatus = 'FALSE';
        if($contentData!='' && $contentData!=false){
            if(preg_match("/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}+$/", $contentData)>0){
                $rtStatus = 'TRUE';
            }
        }
        return $rtStatus;
    }

}
