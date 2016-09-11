<?php

class customparam{
    
    // CJ defined this function 2016-07-20
    public static function checkRequestedParamKeyFromInDtoFile($paramJsonData, $InDtoClassName='DessertsKhazanaInDto'){
        try{
            if(count($paramJsonData)>0 && $paramJsonData!=false){
                $dkInDtoObj = InDtoObjectFactory::create($InDtoClassName, $paramJsonData); 
                if($dkInDtoObj->isRequestParamKeyValid=='false'){
                    return false;
                }else{
                    return $dkInDtoObj;
                }
            }else{
                return false;
            }
        }catch(Exception $ex){
            return false;
        }
    }
    
    ////////////////////////// delivery city list  //////////////////////////
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingDeliveryCityListServingDessertsProductType($paramJsonData){
        $retStatus = 'FALSE';
        try{
            $givenParamDataCorrectCount = 0;
            // check country_ids key present or not
            if(array_key_exists('country_ids', $paramJsonData)){
                if($paramJsonData['country_ids']=='1'){
                    $givenParamDataCorrectCount++;
                }
            }
            // check city_ids key present or not
            if(array_key_exists('city_ids', $paramJsonData)){
                if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                    $givenParamDataCorrectCount++;
                }
            }
            if($givenParamDataCorrectCount>=1){
                $retStatus = 'TRUE';
            }
        }catch(Exception $ex){
            $retStatus = false;
        }
        return $retStatus;
    }
    
    ////////////////////////// delivery area list //////////////////////////
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingDeliveryAreaListServingDessertsProductType($paramJsonData){
        $retStatus = 'FALSE';
        try{
            $givenParamDataCorrectCount = 0;
            // check country_ids key present or not
            if(array_key_exists('country_ids', $paramJsonData)){
                if($paramJsonData['country_ids']=='1'){
                    $givenParamDataCorrectCount++;
                }
            }
            // check city_ids key present or not
            if(array_key_exists('city_ids', $paramJsonData)){
                if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                    $givenParamDataCorrectCount++;
                }
            }
            // check area_ids key present or not
            if(array_key_exists('area_ids', $paramJsonData)){
                if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                    $givenParamDataCorrectCount++;
                }
            }
            if($givenParamDataCorrectCount>=2){
                $retStatus = 'TRUE';
            }
        }catch(Exception $ex){
            $retStatus = 'FALSE';
        }
        return $retStatus;
    }
    
    ////////////////////// delivery area served desserts type//////////////////////////
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingDessertsTypeListServingInCountryCityArea($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check country_ids key present or not
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check producttype_ids key present or not
        if(array_key_exists('producttype_ids', $paramJsonData)){
            if(($paramJsonData['producttype_ids'])>0 && $paramJsonData['producttype_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    ////////////////////// specific desserts type all products level //////////////////////////
    
    // CJ defined this function 2016-09-04
    public static function checkParamDataFetchingProductTypeAllProductCategoryDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check producttype_ids key present or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-09-04
    public static function checkParamDataFetchingProductTypeProductCategoryFilterOperationDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check producttype_ids key present or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check allShopstoreids is blank or not
        if(array_key_exists('allShopstoreids', $paramJsonData)){
            if($paramJsonData['allShopstoreids']!='' && strlen($paramJsonData['allShopstoreids'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-07-18
    public static function checkParamDataFetchingAllProductDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check producttype_ids key present or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if($paramJsonData['shopstoreids']!='' && $paramJsonData['shopstoreids']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check product price filter
        if(array_key_exists('product_price_filter', $paramJsonData)){
            if($paramJsonData['product_price_filter']!='' 
                && $paramJsonData['product_price_filter']!=false 
                && $paramJsonData['product_price_filter']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product size filter
        if(array_key_exists('product_size_filter', $paramJsonData)){
            if($paramJsonData['product_size_filter']!='' 
                && $paramJsonData['product_size_filter']!=false 
                && $paramJsonData['product_size_filter']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product discount filter
        if(array_key_exists('product_discount_filter', $paramJsonData)){
            if($paramJsonData['product_discount_filter']!='' 
                && $paramJsonData['product_discount_filter']!=false 
                && $paramJsonData['product_discount_filter']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=7){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingDessertsProductTypeCategoryProductDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check ccaId key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopstoreids is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if(($paramJsonData['product_categoryids'])>0 && $paramJsonData['product_categoryids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category ka product id is blank or not
        if(array_key_exists('productlist_ids', $paramJsonData)){
            if(($paramJsonData['productlist_ids'])>0 && $paramJsonData['productlist_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category ka product id is blank or not
        if(array_key_exists('product_featureids', $paramJsonData)){
            if(($paramJsonData['product_featureids'])>0 && $paramJsonData['product_featureids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==9){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingProductDescriptionDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product type id is blank or not
        if(array_key_exists('productlist_ids', $paramJsonData)){
            if(($paramJsonData['productlist_ids'])>0 && $paramJsonData['productlist_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    ////////////////////// store level related code //////////////////////////
    
    // CJ defined this function 2016-09-09
    public static function checkParamDataFetchingDeliveryAreaBasedDessertTypeCStoreList($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-09-04
    public static function checkParamDataFetchingDeliveryAreabasedCStoreConductDessertType($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product delivery country
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if(($paramJsonData['product_typesids'])>0 && $paramJsonData['product_typesids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==6){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingCShopstoresummaryInfo($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
     
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingCshopstoreWorkingstyle($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-09-10
    public static function checkParamDataStoreDeliveryFeeApplicableOnDeliveryArea($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if(($paramJsonData['city_ids'])>0 && $paramJsonData['city_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if(($paramJsonData['area_ids'])>0 && $paramJsonData['area_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('store_id', $paramJsonData)){
            if(($paramJsonData['store_id'])>0 && $paramJsonData['store_id']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function checkParamDataForAddingTrackUserAccessingWebsites($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_id key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check usersession_startimestamp key present or not
        if(array_key_exists('usersession_startimestamp', $paramJsonData)){
            if($paramJsonData['usersession_startimestamp']!='' && $paramJsonData['usersession_startimestamp']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function checkParamDataForAddingCorporateTieupRequest($paramJsonData){
        $retStatus = 'TRUE';
        return $retStatus;
    }
    
    
    //////////////////////////// user related code //////////////////////
    
    
    // CJ defined this function 2016-07-27
    public static function checkParamDataForUserSignInAuthentication($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check user_sessionstarttime key present or not
        if(array_key_exists('usersession_starttimestamp', $paramJsonData)){
            if($paramJsonData['usersession_starttimestamp']!='' 
                && $paramJsonData['usersession_starttimestamp']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check encoded_mobile key present or not
        if(array_key_exists('encoded_mobile', $paramJsonData)){
            if(strlen($paramJsonData['encoded_mobile'])==10){
                $givenParamDataCorrectCount++;
            }
        }
        // check encoded_password key present or not
        if(array_key_exists('encoded_password', $paramJsonData)){
            if(strlen($paramJsonData['encoded_password'])>0 && $paramJsonData['encoded_password']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-01
    public static function checkParamDataForAuthenticatedUserDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-21
    public static function checkParamDataForUpdatingUserPersonalDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check name key present or not
        if(array_key_exists('name', $paramJsonData)){
            if(strlen($paramJsonData['name'])>0 && $paramJsonData['name']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check email key present or not
        if(array_key_exists('email', $paramJsonData)){
            $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $paramJsonData['email']);
            if(strlen($paramJsonData['email'])>0 && $isEmailStringMatched==true){
                $givenParamDataCorrectCount++;
            }
        }
        // check mobile key present or not
        if(array_key_exists('mobile', $paramJsonData)){
            if(strlen($paramJsonData['mobile'])==10){
                $givenParamDataCorrectCount++;
            }
        }
        // check gender key present or not
        if(array_key_exists('gender', $paramJsonData)){
            if(strlen($paramJsonData['gender'])>0 && $paramJsonData['gender']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check birthdate key present or not
        if(array_key_exists('birthdate', $paramJsonData)){
            if(strlen($paramJsonData['birthdate'])>0 && $paramJsonData['birthdate']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==7){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-21
    public static function checkParamDataForUpdatingUserPasswordDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check old_password key present or not
        if(array_key_exists('old_password', $paramJsonData)){
            if(strlen($paramJsonData['old_password'])>0 && $paramJsonData['old_password']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check old_password key present or not
        if(array_key_exists('new_password', $paramJsonData)){
            if(strlen($paramJsonData['new_password'])>0 && strlen($paramJsonData['newc_password'])>0
                && $paramJsonData['new_password']==$paramJsonData['newc_password']){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-30
    public static function checkParamDataForLogoutUser($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    /////////////////////////// rating/review related code //////////////////////
    
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingRatingReviewAboutProduct($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check store_ids  is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check productlist_ids is blank or not
        if(array_key_exists('productlist_ids', $paramJsonData)){
            if(($paramJsonData['productlist_ids'])>0 && $paramJsonData['productlist_ids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingAllUserRatingsAbtShopstores($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check store_ids  is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-22
    public static function checkParamDataFetchingRatingReviewQuestionFromShopstores($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check store_ids  is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if(($paramJsonData['shopstoreids'])>0 && $paramJsonData['shopstoreids']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
 
    // CJ defined this function 2016-08-06
    public static function checkParamDataToAddUserRatingReviewProduct($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_sessionid  is blank or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('userAllQuesAnwerRatingReviewAbtProductArr', $paramJsonData)){
            if(count($paramJsonData['userAllQuesAnwerRatingReviewAbtProductArr'])===4){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
     
    
    ////////////////////////// order cart related code ////////////
    
    
    public static function checkParamDataForAddingProductDataInOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check temp_userid  is blank or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('store_id', $paramJsonData)){
            if(($paramJsonData['store_id'])>0 && $paramJsonData['store_id']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('areaname', $paramJsonData)){
            if(strlen($paramJsonData['areaname'])>0 && $paramJsonData['areaname']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('ccaId', $paramJsonData)){
            if(($paramJsonData['ccaId'])>0 && $paramJsonData['ccaId']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('deliveryfee', $paramJsonData)){
            $givenParamDataCorrectCount++;
        }
        if(array_key_exists('minorderamt', $paramJsonData)){
            $givenParamDataCorrectCount++;
        }
        if(array_key_exists('featureid', $paramJsonData)){
            if(($paramJsonData['featureid'])>0 && $paramJsonData['featureid']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('size', $paramJsonData)){
            if($paramJsonData['size']!='' && $paramJsonData['size']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('price', $paramJsonData)){
            if(($paramJsonData['price'])>0 && $paramJsonData['price']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('qty', $paramJsonData)){
            if(($paramJsonData['qty'])>=1 && $paramJsonData['qty']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('totalamount', $paramJsonData)){
            if(($paramJsonData['totalamount'])>0 && $paramJsonData['totalamount']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('description', $paramJsonData)){
            $givenParamDataCorrectCount++;
        }
        if($givenParamDataCorrectCount==13){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-14
    public static function checkParamDataForFetchingOrderItemList($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check ordercartItemListByStatusType key present or not
        if(array_key_exists('ordercartItemListByStatusType', $paramJsonData)){
            if($paramJsonData['ordercartItemListByStatusType']!='' 
                && $paramJsonData['ordercartItemListByStatusType']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-08-26
    public static function checkParamDataToUpdateItemFromOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check ordercart_itemid key present or not
        if(array_key_exists('ordercart_itemid', $paramJsonData)){
            if($paramJsonData['ordercart_itemid']!='' && ($paramJsonData['ordercart_itemid'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        // check qty key present or not
        if(array_key_exists('product_featuresqty', $paramJsonData)){
            if($paramJsonData['product_featuresqty']!='' && ($paramJsonData['product_featuresqty'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        // check totalamount key present or not
        if(array_key_exists('product_features_totalamount', $paramJsonData)){
            if($paramJsonData['product_features_totalamount']!='' && ($paramJsonData['product_features_totalamount'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
      // CJ defined this function 2016-08-26
    public static function checkParamDataToRemoveItemFromOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check ordercart_itemid key present or not
        if(array_key_exists('ordercart_itemid', $paramJsonData)){
            if($paramJsonData['ordercart_itemid']!='' && ($paramJsonData['ordercart_itemid'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        // check reason key present or not
        if(array_key_exists('reason', $paramJsonData)){
            if($paramJsonData['reason']!='' && strlen($paramJsonData['reason'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        // check status key present or not
        if(array_key_exists('status', $paramJsonData)){
            if($paramJsonData['status']=='ZC' || $paramJsonData['status']=='ZA'){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    //////////////////////////// party order related code //////////////////////////////////////
    
    // CJ defined this function 2016-07-20
    public static function checkParamDataForAddingPartyOrderRequest($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check occassion_title key present or not
        if(array_key_exists('occassion_title', $paramJsonData)){
            if($paramJsonData['occassion_title']!='' && $paramJsonData['occassion_title']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check nos_person key present or not
        if(array_key_exists('nos_person', $paramJsonData)){
            if($paramJsonData['nos_person']!='' && $paramJsonData['nos_person']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check party_date key present or not
        if(array_key_exists('party_date', $paramJsonData)){
            if($paramJsonData['party_date']!='' && $paramJsonData['party_date']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check party_venue key present or not
        if(array_key_exists('party_venue', $paramJsonData)){
            if($paramJsonData['party_venue']!='' && $paramJsonData['party_venue']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check party_requirements key present or not
        if(array_key_exists('party_requirements', $paramJsonData)){
            if($paramJsonData['party_requirements']!='' && $paramJsonData['party_requirements']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check requirements key present or not
        if(array_key_exists('file', $paramJsonData)){
            if($paramJsonData['file']!='' && $paramJsonData['file']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=7){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    //////////////////////// customize order related code ///////////////////////////
    
    // CJ defined this function 2016-07-20
    public static function checkParamDataForAddingCustomizeOrderRequest($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check event_title key present or not
        if(array_key_exists('event_title', $paramJsonData)){
            if($paramJsonData['event_title']!='' && $paramJsonData['event_title']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check nos_person key present or not
        if(array_key_exists('nos_person', $paramJsonData)){
            if($paramJsonData['nos_person']!='' && $paramJsonData['nos_person']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check event_date key present or not
        if(array_key_exists('event_date', $paramJsonData)){
            if($paramJsonData['event_date']!='' && $paramJsonData['event_date']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check event_venue key present or not
        if(array_key_exists('event_venue', $paramJsonData)){
            if($paramJsonData['event_venue']!='' && $paramJsonData['event_venue']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check event_requirements key present or not
        if(array_key_exists('event_requirements', $paramJsonData)){
            if($paramJsonData['event_requirements']!='' && $paramJsonData['event_requirements']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check requirements key present or not
        if(array_key_exists('file', $paramJsonData)){
            if($paramJsonData['file']!='' && $paramJsonData['file']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=7){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    ////////////////////////// Sharing offers code //////////////////////////
    
    
    // CJ defined this function 2016-08-28
    public static function checkParamDataForAddingSharingOffersFrmOneUserToOtherUser($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])>=20){
                $givenParamDataCorrectCount++;
            }
        }
        // check discount_couponid key present or not
        if(array_key_exists('discount_couponid', $paramJsonData)){
            if(($paramJsonData['discount_couponid'])>0 && $paramJsonData['discount_couponid']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('shared_onmobile', $paramJsonData)){
            if(strlen($paramJsonData['shared_onmobile'])==10){
                $givenParamDataCorrectCount++;
            }
        }
        
        if($givenParamDataCorrectCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    
}
