<?php

class customparam{
    
    public static function checkRequestedParamKeyNamePresentInDtoFile($paramJsonData, $InDtoClassName='DessertsKhazanaInDto'){
        $paramDataObj = 'FALSE';
        try{
            if(count($paramJsonData)>0 && $paramJsonData!=false){
                $indtoObj = InDtoObjectFactory::create($InDtoClassName, $paramJsonData); 
                if($indtoObj->isRequestParamKeyValid=='TRUE'){
                    $paramDataObj = json_decode(json_encode($indtoObj), true);
                }
            }
        }catch(Exception $ex){}
        return $paramDataObj;
    }
    
    public static function checkParamDataForAddingTrackUserAccessingWebsites($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('usersession_startimestamp', $paramJsonData)){
            if($paramJsonData['usersession_startimestamp']!='' && $paramJsonData['usersession_startimestamp']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }

    public static function checkParamDataFetchingDeliveryCityListServingDessertsProductType($paramJsonData){
        $retStatus = 'FALSE';
        try{
            $correctParamKeyValueDataCount = 0;
            if(array_key_exists('country_ids', $paramJsonData)){
                if($paramJsonData['country_ids']=='1'){
                    $correctParamKeyValueDataCount++;
                }
            }
            if(array_key_exists('city_ids', $paramJsonData)){
                if(validation::isNumberic($paramJsonData['city_ids'])=='TRUE'){
                    $correctParamKeyValueDataCount++;
                }
            }
            if($correctParamKeyValueDataCount>=1){
                $retStatus = 'TRUE';
            }
        }catch(Exception $ex){
            $retStatus = false;
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingDeliveryAreaListServingDessertsProductType($paramJsonData){
        $retStatus = 'FALSE';
        try{
            $correctParamKeyValueDataCount = 0;
            if(array_key_exists('country_ids', $paramJsonData)){
                if($paramJsonData['country_ids']=='1'){
                    $correctParamKeyValueDataCount++;
                }
            }
            if(array_key_exists('city_ids', $paramJsonData)){
                if(validation::isNumberic($paramJsonData['city_ids'])=='TRUE'){
                    $correctParamKeyValueDataCount++;
                }
            }
            if(array_key_exists('area_ids', $paramJsonData)){
                if(validation::isNumberic($paramJsonData['area_ids'])=='TRUE'){
                    $correctParamKeyValueDataCount++;
                }
            }
            if($correctParamKeyValueDataCount>=2){
                $retStatus = 'TRUE';
            }
        }catch(Exception $ex){
            $retStatus = 'FALSE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingDessertsTypeListServingInCountryCityArea($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('city_ids', $paramJsonData)){
            if(validation::isNumberic($paramJsonData['city_ids'])=='TRUE'){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('area_ids', $paramJsonData)){
            if(validation::isNumberic($paramJsonData['area_ids'])=='TRUE'){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('ccaId', $paramJsonData)){
            if(validation::isNumberic($paramJsonData['ccaId'])=='TRUE'){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('producttype_ids', $paramJsonData)){
            if(validation::isNumberic($paramJsonData['producttype_ids'])=='TRUE'){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataFetchingProductTypeAllProductCategoryDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataFetchingProductTypeProductCategoryFilterOperationDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('allShopstoreids', $paramJsonData)){
            if($paramJsonData['allShopstoreids']!='' && strlen($paramJsonData['allShopstoreids'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataFetchingAllProductDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check producttype_ids key present or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if($paramJsonData['shopstoreids']!='' && $paramJsonData['shopstoreids']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product price filter
        if(array_key_exists('product_price_filter', $paramJsonData)){
            if($paramJsonData['product_price_filter']!='' 
                && $paramJsonData['product_price_filter']!=false 
                && $paramJsonData['product_price_filter']!=null){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product size filter
        if(array_key_exists('product_size_filter', $paramJsonData)){
            if($paramJsonData['product_size_filter']!='' 
                && $paramJsonData['product_size_filter']!=false 
                && $paramJsonData['product_size_filter']!=null){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product discount filter
        if(array_key_exists('product_discount_filter', $paramJsonData)){
            if($paramJsonData['product_discount_filter']!='' 
                && $paramJsonData['product_discount_filter']!=false 
                && $paramJsonData['product_discount_filter']!=null){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=7){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingDessertsProductTypeCategoryProductDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check shopstoreids is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type ka product category ka product id is blank or not
        if(array_key_exists('productlist_ids', $paramJsonData)){
            if(($paramJsonData['productlist_ids'])>0 && $paramJsonData['productlist_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type ka product category ka product id is blank or not
        if(array_key_exists('product_featureids', $paramJsonData)){
            if(($paramJsonData['product_featureids'])>0 && $paramJsonData['product_featureids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==9){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingProductDescriptionDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check product type id is blank or not
        if(array_key_exists('productlist_ids', $paramJsonData)){
            if(($paramJsonData['productlist_ids'])>0 && $paramJsonData['productlist_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataFetchingStoresListDeliveryAreaBasedDessertType($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingDeliveryAreabasedStoresConductDessertType($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==6){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingStoresummaryInfo($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
     
    public static function checkParamDataFetchingStoreWorkingstyle($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataStoreDeliveryFeeApplicableOnDeliveryArea($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $correctParamKeyValueDataCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('store_id', $paramJsonData)){
            if(($paramJsonData['store_id'])>0 && $paramJsonData['store_id']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataForUserSignUpAuthentication($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('usersession_starttimestamp', $paramJsonData)){
            if($paramJsonData['usersession_starttimestamp']!='' 
                && $paramJsonData['usersession_starttimestamp']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('name', $paramJsonData)){
            if(strlen($paramJsonData['name'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('email', $paramJsonData)){
            $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $paramJsonData['email']);
            if(strlen($paramJsonData['email'])>0 && $isEmailStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('mobile', $paramJsonData)){
            $isMobileStringMatched = preg_match('/^\d{10}$/', $paramJsonData['mobile']);
            if(strlen($paramJsonData['mobile'])==10 && $isMobileStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('EmailAuthAndOtpRequest', $paramJsonData)
            && array_key_exists('validateOtpAndCreateAccountRequest', $paramJsonData)){
            if($paramJsonData['EmailAuthAndOtpRequest']=='Y'
                && $paramJsonData['validateOtpAndCreateAccountRequest']=='N'){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==6){
                $retStatus = 'TRUE';
            }
        }
        if(array_key_exists('EmailAuthAndOtpRequest', $paramJsonData)
            && array_key_exists('validateOtpAndCreateAccountRequest', $paramJsonData)
            && array_key_exists('otpcode', $paramJsonData) 
            && array_key_exists('pwd', $paramJsonData)){
            if($paramJsonData['EmailAuthAndOtpRequest']=='N'
                && $paramJsonData['validateOtpAndCreateAccountRequest']=='Y'
                && strlen($paramJsonData['otpcode'])==6
                && (strlen($paramJsonData['pwd'])>=5 && strlen($paramJsonData['pwd'])<=10)){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==6){
                $retStatus = 'TRUE';
            }
        }
        return $retStatus;
    }
    
    public static function checkParamDataForUserSignInAuthentication($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('usersession_starttimestamp', $paramJsonData)){
            if($paramJsonData['usersession_starttimestamp']!='' 
                && $paramJsonData['usersession_starttimestamp']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('email', $paramJsonData)){
            $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $paramJsonData['email']);
            if(strlen($paramJsonData['email'])>0 && $isEmailStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('pwd', $paramJsonData)){
            if(strlen($paramJsonData['pwd'])>=5 && strlen($paramJsonData['pwd'])<=10){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('isRequestCheckingCreditional', $paramJsonData)
            && array_key_exists('isRequestValidateOtpAndUserSignedIn', $paramJsonData)){
            if($paramJsonData['isRequestCheckingCreditional']=='Y'
                && $paramJsonData['isRequestValidateOtpAndUserSignedIn']=='N'){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==5){
                $retStatus = 'TRUE';
            }
        }
        if(array_key_exists('isRequestCheckingCreditional', $paramJsonData)
            && array_key_exists('isRequestValidateOtpAndUserSignedIn', $paramJsonData)
            && array_key_exists('otpcode', $paramJsonData)){
            if($paramJsonData['isRequestCheckingCreditional']=='N'
                && $paramJsonData['isRequestValidateOtpAndUserSignedIn']=='Y'
                && strlen($paramJsonData['otpcode'])==6){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==5){
                $retStatus = 'TRUE';
            }
        }
        return $retStatus;
    }
    
    public static function checkParamDataForUserForgotPwdAuthentication($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('usersession_starttimestamp', $paramJsonData)){
            if($paramJsonData['usersession_starttimestamp']!='' 
                && $paramJsonData['usersession_starttimestamp']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('email', $paramJsonData)){
            $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $paramJsonData['email']);
            if(strlen($paramJsonData['email'])>0 && $isEmailStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('isRequestCheckingCreditional', $paramJsonData)
            && array_key_exists('isRequestValidateOtp', $paramJsonData)
            && array_key_exists('isRequestUpdatePwd', $paramJsonData)){
            if($paramJsonData['isRequestCheckingCreditional']=='Y'
                && $paramJsonData['isRequestValidateOtp']=='N'
                && $paramJsonData['isRequestUpdatePwd']=='N'){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==4){
                $retStatus = 'TRUE';
            }
        }
        if(array_key_exists('isRequestCheckingCreditional', $paramJsonData)
            && array_key_exists('isRequestValidateOtp', $paramJsonData)
            && array_key_exists('tokenId', $paramJsonData)    
            && array_key_exists('otpcode', $paramJsonData)   
            && array_key_exists('isRequestUpdatePwd', $paramJsonData)){
            if($paramJsonData['isRequestCheckingCreditional']=='N'
                && $paramJsonData['isRequestValidateOtp']=='Y'
                && strlen($paramJsonData['otpcode'])==6
                && $paramJsonData['tokenId']>0 && $paramJsonData['tokenId']!=''  
                && $paramJsonData['isRequestUpdatePwd']=='N'){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==4){
                $retStatus = 'TRUE';
            }
        }
        if(array_key_exists('isRequestCheckingCreditional', $paramJsonData)
            && array_key_exists('isRequestValidateOtp', $paramJsonData)
            && array_key_exists('isRequestUpdatePwd', $paramJsonData)
            && array_key_exists('pwd', $paramJsonData)
            && array_key_exists('cpwd', $paramJsonData)
            && array_key_exists('tokenId', $paramJsonData)){
            if($paramJsonData['isRequestCheckingCreditional']=='N'
                && $paramJsonData['isRequestValidateOtp']=='N'
                && $paramJsonData['isRequestUpdatePwd']=='Y'
                && (strlen($paramJsonData['pwd'])>=5 && strlen($paramJsonData['pwd'])<=10)
                && $paramJsonData['pwd']==$paramJsonData['cpwd']
                && $paramJsonData['tokenId']>0 && $paramJsonData['tokenId']!=''){
                $correctParamKeyValueDataCount++;
            }
            if($correctParamKeyValueDataCount==4){
                $retStatus = 'TRUE';
            }
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataForSendingOtpcode($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('usersession_starttimestamp', $paramJsonData)){
            if($paramJsonData['usersession_starttimestamp']!='' 
                && $paramJsonData['usersession_starttimestamp']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('name', $paramJsonData)){
            if(strlen($paramJsonData['name'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('email', $paramJsonData)){
            $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $paramJsonData['email']);
            if(strlen($paramJsonData['email'])>0 && $isEmailStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('mobile', $paramJsonData)){
            $isMobileStringMatched = preg_match('/^\d{10}$/', $paramJsonData['mobile']);
            if(strlen($paramJsonData['mobile'])==10 && $isMobileStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('pwd', $paramJsonData)){
            if(strlen($paramJsonData['pwd'])>=5 && strlen($paramJsonData['pwd'])<=10){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('purposetype', $paramJsonData)){
            if(strlen($paramJsonData['purposetype'])>=5){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=6){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataForAuthenticatedUserDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataForUpdatingUserPersonalDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check name key present or not
        if(array_key_exists('name', $paramJsonData)){
            if(strlen($paramJsonData['name'])>0 && $paramJsonData['name']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check email key present or not
        if(array_key_exists('email', $paramJsonData)){
            $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $paramJsonData['email']);
            if(strlen($paramJsonData['email'])>0 && $isEmailStringMatched==true){
                $correctParamKeyValueDataCount++;
            }
        }
        // check mobile key present or not
        if(array_key_exists('mobile', $paramJsonData)){
            if(strlen($paramJsonData['mobile'])==10){
                $correctParamKeyValueDataCount++;
            }
        }
        // check gender key present or not
        if(array_key_exists('gender', $paramJsonData)){
            if(strlen($paramJsonData['gender'])>0 && $paramJsonData['gender']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check birthdate key present or not
        if(array_key_exists('birthdate', $paramJsonData)){
            if(strlen($paramJsonData['birthdate'])>0 && $paramJsonData['birthdate']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==7){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataForUpdatingUserPasswordDetails($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check old_password key present or not
        if(array_key_exists('old_password', $paramJsonData)){
            if(strlen($paramJsonData['old_password'])>0 && $paramJsonData['old_password']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check old_password key present or not
        if(array_key_exists('new_password', $paramJsonData)){
            if(strlen($paramJsonData['new_password'])>0 && strlen($paramJsonData['newc_password'])>0
                && $paramJsonData['new_password']==$paramJsonData['newc_password']){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataForLogoutUser($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataFetchingRatingReviewProduct($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check store_ids  is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check productlist_ids is blank or not
        if(array_key_exists('productlist_ids', $paramJsonData)){
            if(($paramJsonData['productlist_ids'])>0 && $paramJsonData['productlist_ids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingStoreAllUserRating($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check store_ids  is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataFetchingStoreRatingReviewQuestion($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check store_ids  is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
 
    public static function checkParamDataToAddUserRatingReviewProduct($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check user_sessionid  is blank or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('ratingReviewedProductArr', $paramJsonData)){
            if(count($paramJsonData['ratingReviewedProductArr'])===4){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
     
    
    public static function checkParamDataForAddingProductDataInOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check temp_userid  is blank or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('store_id', $paramJsonData)){
            if(($paramJsonData['store_id'])>0 && $paramJsonData['store_id']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('areaname', $paramJsonData)){
            if(strlen($paramJsonData['areaname'])>0 && $paramJsonData['areaname']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('deliveryfee', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        if(array_key_exists('minorderamt', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        if(array_key_exists('featureid', $paramJsonData)){
            if(($paramJsonData['featureid'])>0 && $paramJsonData['featureid']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('size', $paramJsonData)){
            if($paramJsonData['size']!='' && $paramJsonData['size']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('price', $paramJsonData)){
            if(($paramJsonData['price'])>0 && $paramJsonData['price']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('qty', $paramJsonData)){
            if(($paramJsonData['qty'])>=1 && $paramJsonData['qty']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('totalamount', $paramJsonData)){
            if(($paramJsonData['totalamount'])>0 && $paramJsonData['totalamount']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        if(array_key_exists('description', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        if($correctParamKeyValueDataCount==13){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataForFetchingOrderItemList($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ordercartItemListByStatusType key present or not
        if(array_key_exists('ordercartItemListByStatusType', $paramJsonData)){
            if($paramJsonData['ordercartItemListByStatusType']!='' 
                && $paramJsonData['ordercartItemListByStatusType']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataToUpdateItemInOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ordercartId key present or not
        if(array_key_exists('ordercartId', $paramJsonData)){
            if($paramJsonData['ordercartId']!='' && ($paramJsonData['ordercartId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ordercartStoreId key present or not
        if(array_key_exists('ordercartStoreId', $paramJsonData)){
            if($paramJsonData['ordercartStoreId']!='' && ($paramJsonData['ordercartStoreId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check store_id key present or not
        if(array_key_exists('store_id', $paramJsonData)){
            if($paramJsonData['store_id']!='' && ($paramJsonData['store_id'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if($paramJsonData['ccaId']!='' && ($paramJsonData['ccaId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check minorderamt key present or not
        if(array_key_exists('minorderamt', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        // check deliveryfee key present or not
        if(array_key_exists('deliveryfee', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        // check orderStoreItemId key present or not
        if(array_key_exists('orderStoreItemId', $paramJsonData)){
            if($paramJsonData['orderStoreItemId']!='' && ($paramJsonData['orderStoreItemId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check qty key present or not
        if(array_key_exists('qty', $paramJsonData)){
            if($paramJsonData['qty']!='' && ($paramJsonData['qty'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check totalamount key present or not
        if(array_key_exists('totalamount', $paramJsonData)){
            if($paramJsonData['totalamount']!='' && ($paramJsonData['totalamount'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==11){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataToRemoveItemFromOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ordercartId key present or not
        if(array_key_exists('ordercartId', $paramJsonData)){
            if($paramJsonData['ordercartId']!='' && ($paramJsonData['ordercartId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ordercartStoreId key present or not
        if(array_key_exists('ordercartStoreId', $paramJsonData)){
            if($paramJsonData['ordercartStoreId']!='' && ($paramJsonData['ordercartStoreId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check store_id key present or not
        if(array_key_exists('store_id', $paramJsonData)){
            if($paramJsonData['store_id']!='' && ($paramJsonData['store_id'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if($paramJsonData['ccaId']!='' && ($paramJsonData['ccaId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check minorderamt key present or not
        if(array_key_exists('minorderamt', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        // check deliveryfee key present or not
        if(array_key_exists('deliveryfee', $paramJsonData)){
            $correctParamKeyValueDataCount++;
        }
        // check orderStoreItemId key present or not
        if(array_key_exists('orderStoreItemId', $paramJsonData)){
            if($paramJsonData['orderStoreItemId']!='' && ($paramJsonData['orderStoreItemId'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check status key present or not
        if(array_key_exists('status', $paramJsonData)){
            if($paramJsonData['status']!='' && ($paramJsonData['status']=='ZC' || $paramJsonData['status']=='ZA')){
                $correctParamKeyValueDataCount++;
            }
        }
        // check reason key present or not
        if(array_key_exists('reason', $paramJsonData)){
            if($paramJsonData['reason']!='' && strlen($paramJsonData['reason'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==11){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    public static function checkParamDataToUpdateOrderDeliveryAddressStorewise($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check orderDeliveryDataArr key present or not
        if(array_key_exists('orderDeliveryDataArr', $paramJsonData)){
            if(count($paramJsonData['orderDeliveryDataArr'])>0 
                && $paramJsonData['orderDeliveryDataArr']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    public static function checkParamDataForAddingPartyOrderRequest($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check occassion_title key present or not
        if(array_key_exists('occassion_title', $paramJsonData)){
            if($paramJsonData['occassion_title']!='' && $paramJsonData['occassion_title']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check nos_person key present or not
        if(array_key_exists('nos_person', $paramJsonData)){
            if($paramJsonData['nos_person']!='' && ($paramJsonData['nos_person'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        // check party_date key present or not
        if(array_key_exists('party_date', $paramJsonData)){
            if($paramJsonData['party_date']!='' && $paramJsonData['party_date']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check party_venue key present or not
        if(array_key_exists('party_venue', $paramJsonData)){
            if($paramJsonData['party_venue']!='' && $paramJsonData['party_venue']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check party_requirements key present or not
        if(array_key_exists('party_requirements', $paramJsonData)){
            if($paramJsonData['party_requirements']!='' && $paramJsonData['party_requirements']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check requirements key present or not
        if(array_key_exists('file', $paramJsonData)){
            if($paramJsonData['file']!='' && $paramJsonData['file']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check estimated_budget key present or not
        if(array_key_exists('estimated_budget', $paramJsonData)){
            if($paramJsonData['estimated_budget']!='' && ($paramJsonData['estimated_budget'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=8){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }

    public static function checkParamDataForAddingCustomizeOrderRequest($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check event_title key present or not
        if(array_key_exists('event_title', $paramJsonData)){
            if($paramJsonData['event_title']!='' && $paramJsonData['event_title']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check nos_person key present or not
        if(array_key_exists('nos_person', $paramJsonData)){
            if($paramJsonData['nos_person']!='' && $paramJsonData['nos_person']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check event_date key present or not
        if(array_key_exists('event_date', $paramJsonData)){
            if($paramJsonData['event_date']!='' && $paramJsonData['event_date']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check event_venue key present or not
        if(array_key_exists('event_venue', $paramJsonData)){
            if($paramJsonData['event_venue']!='' && $paramJsonData['event_venue']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check event_requirements key present or not
        if(array_key_exists('event_requirements', $paramJsonData)){
            if($paramJsonData['event_requirements']!='' && $paramJsonData['event_requirements']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check requirements key present or not
        if(array_key_exists('file', $paramJsonData)){
            if($paramJsonData['file']!='' && $paramJsonData['file']!=false){
                $correctParamKeyValueDataCount++;
            }
        }
        // check estimated_budget key present or not
        if(array_key_exists('estimated_budget', $paramJsonData)){
            if($paramJsonData['estimated_budget']!='' && ($paramJsonData['estimated_budget'])>0){
                $correctParamKeyValueDataCount++;
            }
        }
        if($correctParamKeyValueDataCount>=8){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    ////////////////////////// Sharing offers code //////////////////////////
    
    
    // CJ defined this function 2016-08-28
    public static function checkParamDataForAddingSharingOffersFrmOneUserToOtherUser($paramJsonData){
        $retStatus = 'FALSE';
        $correctParamKeyValueDataCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $correctParamKeyValueDataCount++;
            }
        }
        // check discount_couponid key present or not
        if(array_key_exists('discount_couponid', $paramJsonData)){
            if(($paramJsonData['discount_couponid'])>0 && $paramJsonData['discount_couponid']!=''){
                $correctParamKeyValueDataCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('shared_onmobile', $paramJsonData)){
            if(strlen($paramJsonData['shared_onmobile'])==10){
                $correctParamKeyValueDataCount++;
            }
        }
        
        if($correctParamKeyValueDataCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    
}
