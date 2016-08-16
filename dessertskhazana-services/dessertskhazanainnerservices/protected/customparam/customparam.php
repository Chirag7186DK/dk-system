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
                if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                    && $paramJsonData['city_ids']!=null){
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
                if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                    && $paramJsonData['city_ids']!=null){
                    $givenParamDataCorrectCount++;
                }
            }
            // check area_ids key present or not
            if(array_key_exists('area_ids', $paramJsonData)){
                if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                    && $paramJsonData['area_ids']!=null){
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
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingDessertsProductTypeListServingInCountryCityArea($paramJsonData){
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
            if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                && $paramJsonData['city_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                && $paramJsonData['area_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check producttype_ids key present or not
        if(array_key_exists('producttype_ids', $paramJsonData)){
            if($paramJsonData['producttype_ids']!='' && $paramJsonData['producttype_ids']!=false 
                && $paramJsonData['producttype_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount>=3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingDessertsProductTypeCategoryProductListDashboardLevel($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check country_ids 
        if(array_key_exists('country_ids', $paramJsonData)){
            if($paramJsonData['country_ids']=='1'){
                $givenParamDataCorrectCount++;
            }
        }
        // check city_ids key present or not
        if(array_key_exists('city_ids', $paramJsonData)){
            if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                && $paramJsonData['city_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                && $paramJsonData['area_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product_typesids key present or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if($paramJsonData['product_typesids']!='' && $paramJsonData['product_typesids']!=false 
                && $paramJsonData['product_typesids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
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
            if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                && $paramJsonData['city_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                && $paramJsonData['area_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('store_ids', $paramJsonData)){
            if($paramJsonData['store_ids']!='' && $paramJsonData['store_ids']!=false 
                && $paramJsonData['store_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if($paramJsonData['product_typesids']!='' && $paramJsonData['product_typesids']!=false 
                && $paramJsonData['product_typesids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if($paramJsonData['product_categoryids']!='' && $paramJsonData['product_categoryids']!=false 
                && $paramJsonData['product_categoryids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category ka product id is blank or not
        if(array_key_exists('product_ids', $paramJsonData)){
            if($paramJsonData['product_ids']!='' && $paramJsonData['product_ids']!=false 
                && $paramJsonData['product_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category ka product id is blank or not
        if(array_key_exists('product_featureids', $paramJsonData)){
            if($paramJsonData['product_featureids']!='' && $paramJsonData['product_featureids']!=false 
                && $paramJsonData['product_featureids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==8){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingCShopstoresummaryInfo($paramJsonData){
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
            if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                && $paramJsonData['city_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                && $paramJsonData['area_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if($paramJsonData['shopstoreids']!='' && $paramJsonData['shopstoreids']!=false 
                && $paramJsonData['shopstoreids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
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
            if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                && $paramJsonData['city_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                && $paramJsonData['area_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if($paramJsonData['product_typesids']!='' && $paramJsonData['product_typesids']!=false 
                && $paramJsonData['product_typesids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if($paramJsonData['product_categoryids']!='' && $paramJsonData['product_categoryids']!=false 
                && $paramJsonData['product_categoryids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('store_ids', $paramJsonData)){
            if($paramJsonData['store_ids']!='' && $paramJsonData['store_ids']!=false 
                && $paramJsonData['store_ids']!=null){
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
        if($givenParamDataCorrectCount>=4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-18
    public static function checkParamDataFetchingCshopstoreAllProductDetails($paramJsonData){
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
            if($paramJsonData['city_ids']!='' && $paramJsonData['city_ids']!=false 
                && $paramJsonData['city_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check area_ids key present or not
        if(array_key_exists('area_ids', $paramJsonData)){
            if($paramJsonData['area_ids']!='' && $paramJsonData['area_ids']!=false 
                && $paramJsonData['area_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type id is blank or not
        if(array_key_exists('product_typesids', $paramJsonData)){
            if($paramJsonData['product_typesids']!='' && $paramJsonData['product_typesids']!=false 
                && $paramJsonData['product_typesids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check product type ka product category id is blank or not
        if(array_key_exists('product_categoryids', $paramJsonData)){
            if($paramJsonData['product_categoryids']!='' && $paramJsonData['product_categoryids']!=false 
                && $paramJsonData['product_categoryids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStore id is blank or not
        if(array_key_exists('store_ids', $paramJsonData)){
            if($paramJsonData['store_ids']!='' && $paramJsonData['store_ids']!=false 
                && $paramJsonData['store_ids']!=null){
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
        if($givenParamDataCorrectCount>=5){
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
            if($paramJsonData['shopstoreids']!='' && $paramJsonData['shopstoreids']!=false 
                && $paramJsonData['shopstoreids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingCshopstoreProductDeliveryAreaInfo($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check shopStore id is blank or not
        if(array_key_exists('shopstoreids', $paramJsonData)){
            if($paramJsonData['shopstoreids']!='' && $paramJsonData['shopstoreids']!=false 
                && $paramJsonData['shopstoreids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-13
    public static function checkParamDataFetchingProductDescriptionDetails($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check product type id is blank or not
        if(array_key_exists('product_ids', $paramJsonData)){
            if($paramJsonData['product_ids']!='' && $paramJsonData['product_ids']!=false 
                && $paramJsonData['product_ids']!=null){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==1){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-20
    public static function checkParamDataForAddingPartyOrderRequest($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check is_LoggedInUser key present or not
        if(array_key_exists('is_LoggedInUser', $paramJsonData)){
            if($paramJsonData['is_LoggedInUser']!='' && $paramJsonData['is_LoggedInUser']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check profile_id key present or not
        if(array_key_exists('profile_id', $paramJsonData)){
            if($paramJsonData['profile_id']!='' && $paramJsonData['profile_id']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check user_id key present or not
        if(array_key_exists('user_id', $paramJsonData)){
            if($paramJsonData['user_id']!='' && $paramJsonData['user_id']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check contact_name key present or not
        if(array_key_exists('name', $paramJsonData)){
            if($paramJsonData['name']!='' && $paramJsonData['name']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check mobile key present or not
        if(array_key_exists('mobile', $paramJsonData)){
            if($paramJsonData['mobile']!='' && $paramJsonData['mobile']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check email key present or not
        if(array_key_exists('email', $paramJsonData)){
            if($paramJsonData['email']!='' && $paramJsonData['email']!=false){
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
        if($givenParamDataCorrectCount>=10){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function checkParamDataForAddingCustomizeOrderRequest($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check is_LoggedInUser key present or not
        if(array_key_exists('is_LoggedInUser', $paramJsonData)){
            if($paramJsonData['is_LoggedInUser']!='' && $paramJsonData['is_LoggedInUser']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check profile_id key present or not
        if(array_key_exists('profile_id', $paramJsonData)){
            if($paramJsonData['profile_id']!='' && $paramJsonData['profile_id']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check user_id key present or not
        if(array_key_exists('user_id', $paramJsonData)){
            if($paramJsonData['user_id']!='' && $paramJsonData['user_id']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check contact_name key present or not
        if(array_key_exists('name', $paramJsonData)){
            if($paramJsonData['name']!='' && $paramJsonData['name']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check mobile key present or not
        if(array_key_exists('mobile', $paramJsonData)){
            if($paramJsonData['mobile']!='' && $paramJsonData['mobile']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check email key present or not
        if(array_key_exists('email', $paramJsonData)){
            if($paramJsonData['email']!='' && $paramJsonData['email']!=false){
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
        if($givenParamDataCorrectCount>=10){
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
            if($paramJsonData['user_sessionid']=='' || strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check page_name key present or not
        if(array_key_exists('page_name', $paramJsonData)){
            if($paramJsonData['page_name']!='' && $paramJsonData['page_name']!=false){
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
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check user_sessionstarttime key present or not
        if(array_key_exists('user_sessionstarttime', $paramJsonData)){
            if($paramJsonData['user_sessionstarttime']!='' 
                && $paramJsonData['user_sessionstarttime']!=false){
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
            if($paramJsonData['encoded_password']!='' && $paramJsonData['encoded_password']!=false){
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
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
    /////////////////////////// wishlist related code //////////////////////
    
    // CJ defined this function 2016-08-01
    public static function checkParamDataToCreateUserWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check created_by key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check title key present or not
        if(array_key_exists('title', $paramJsonData)){
            if($paramJsonData['title']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check is_publicly key present or not
        if(array_key_exists('is_publicly', $paramJsonData)){
            if($paramJsonData['is_publicly']=='Y' || $paramJsonData['is_publicly']=='N'){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-01
    public static function checkParamDataToDeleteUWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check updated_by key present or not
        if(array_key_exists('updated_by', $paramJsonData)){
            if($paramJsonData['updated_by']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check wishListId key present or not
        if(array_key_exists('wishListId', $paramJsonData)){
            if(strlen($paramJsonData['wishListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check wishListId key present or not
        if(array_key_exists('status', $paramJsonData)){
            if($paramJsonData['status']=='Z'){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==3){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-02
    public static function checkParamDataToUdpateUWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check title key present or not
        if(array_key_exists('title', $paramJsonData)){
            if($paramJsonData['title']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check is_defaultsetting key present or not
        if(array_key_exists('is_defaultsetting', $paramJsonData)){
            if($paramJsonData['is_defaultsetting']=='Y' || $paramJsonData['is_defaultsetting']=='N'){
                $givenParamDataCorrectCount++;
            }
        }
        // check is_publicly key present or not
        if(array_key_exists('is_publicly', $paramJsonData)){
            if($paramJsonData['is_publicly']=='Y' || $paramJsonData['is_publicly']=='N'){
                $givenParamDataCorrectCount++;
            }
        }
        // check updated_by key present or not
        if(array_key_exists('updated_by', $paramJsonData)){
            if($paramJsonData['updated_by']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        // check wishListId key present or not
        if(array_key_exists('wishListId', $paramJsonData)){
            if(strlen($paramJsonData['wishListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==5){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-02
    public static function checkParamDataToMoveProductFromUWLToUWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check moveItemFromWishListId key present or not
        if(array_key_exists('moveItemFromWishListId', $paramJsonData)){
            if(strlen($paramJsonData['moveItemFromWishListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check moveItemToWishListId key present or not
        if(array_key_exists('moveItemToWishListId', $paramJsonData)){
            if(strlen($paramJsonData['moveItemToWishListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check moveWishListItemId key present or not
        if(array_key_exists('moveWishListItemId', $paramJsonData)){
            if(strlen($paramJsonData['moveWishListItemId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check userLoggedId key present or not
        if(array_key_exists('userLoggedId', $paramJsonData)){
            if(strlen($paramJsonData['userLoggedId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-02
    public static function checkParamDataToRemoveProductFromUWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check wishListItemId key present or not
        if(array_key_exists('wishListItemId', $paramJsonData)){
            if(strlen($paramJsonData['wishListItemId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check userLoggedId key present or not
        if(array_key_exists('userLoggedId', $paramJsonData)){
            if(strlen($paramJsonData['userLoggedId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-03
    public static function checkParamDataToGetUWLItemBySearchParam($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check wishlistby key exists or not
        if(array_key_exists('wishlistby', $paramJsonData)){
            if($paramJsonData['wishlistby']=='users'){
                $searchString = '';
                // check search_string key exists or not
                if(array_key_exists('search_string', $paramJsonData)){
                    if($paramJsonData['search_string']!=''){
                        $searchString = $paramJsonData['search_string'];
                        $givenParamDataCorrectCount++;
                    }
                }
                // check search_by key present or not
                if(array_key_exists('search_by', $paramJsonData)){
                    if($paramJsonData['search_by']=='personname'){
                        $isPersonNameStringMatched = preg_match('/[A-Za-z]$/', $searchString);
                        if($isPersonNameStringMatched==1 && $searchString!=''){
                            $givenParamDataCorrectCount++;
                        }
                    }
                    if($paramJsonData['search_by']=='email'){
                        $isEmailStringMatched = preg_match('/^.+[@]+([\w])+([.])+[a-z]{2,3}$/', $searchString);
                        if($isEmailStringMatched==1 && $searchString!=''){
                            $givenParamDataCorrectCount++;
                        }
                    }
                }
                if($givenParamDataCorrectCount==2){
                    $retStatus = 'TRUE';
                }
            }
        }
        // check wishlistby key exists or not
        if(array_key_exists('wishlistby', $paramJsonData)){
            if($paramJsonData['wishlistby']=='item'){
                // check createrUserId key exists or not
                if(array_key_exists('createrUserId', $paramJsonData)){
                    if(strlen($paramJsonData['createrUserId'])==32){
                        $givenParamDataCorrectCount++;
                    }
                }
                // check userLoggedId key exists or not
                if(array_key_exists('userLoggedId', $paramJsonData)){
                    if(strlen($paramJsonData['userLoggedId'])==32){
                        $givenParamDataCorrectCount++;
                    }
                }
                // check wishListId key exists or not
                if(array_key_exists('wishListId', $paramJsonData)){
                    if(strlen($paramJsonData['wishListId'])==32){
                        $givenParamDataCorrectCount++;
                    }
                }
                if($givenParamDataCorrectCount>=2){
                    $retStatus = 'TRUE';
                }
            }
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-04
    public static function checkParamDataToCopyProductFromUWLToUWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check copyItemFromWishListId key present or not
        if(array_key_exists('copyItemFromWishListId', $paramJsonData)){
            if(strlen($paramJsonData['copyItemFromWishListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check copyItemToWishListId key present or not
        if(array_key_exists('copyItemToWishListId', $paramJsonData)){
            if(strlen($paramJsonData['copyItemToWishListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check copyWishListItemId key present or not
        if(array_key_exists('copyWishListItemId', $paramJsonData)){
            if(strlen($paramJsonData['copyWishListItemId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check userLoggedId key present or not
        if(array_key_exists('userLoggedId', $paramJsonData)){
            if(strlen($paramJsonData['userLoggedId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==4){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-05
    public static function checkParamDataToAddProductForUWL($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check user_sessionid key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check shopStoreId key present or not
        if(array_key_exists('shopStoreId', $paramJsonData)){
            if(strlen($paramJsonData['shopStoreId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check productTypeId key present or not
        if(array_key_exists('productTypeId', $paramJsonData)){
            if(strlen($paramJsonData['productTypeId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check productTypeCategoryId key present or not
        if(array_key_exists('productTypeCategoryId', $paramJsonData)){
            if(strlen($paramJsonData['productTypeCategoryId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check productListId key present or not
        if(array_key_exists('productListId', $paramJsonData)){
            if(strlen($paramJsonData['productListId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check productFeatureId key present or not
        if(array_key_exists('productFeatureId', $paramJsonData)){
            if(strlen($paramJsonData['productFeatureId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==7){
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
        if(array_key_exists('store_ids', $paramJsonData)){
            if(strlen($paramJsonData['store_ids'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        // check product_ids is blank or not
        if(array_key_exists('product_ids', $paramJsonData)){
            if(strlen($paramJsonData['product_ids'])==32){
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
        if(array_key_exists('store_ids', $paramJsonData)){
            if(strlen($paramJsonData['store_ids'])==32){
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
        if(array_key_exists('store_ids', $paramJsonData)){
            if(strlen($paramJsonData['store_ids'])==32){
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
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('userAllQuesAnwerRatingReviewAbtProductArr', $paramJsonData)){
            if(count($paramJsonData['userAllQuesAnwerRatingReviewAbtProductArr'])===4){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==2){
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
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('shopstore_id', $paramJsonData)){
            if(($paramJsonData['shopstore_id'])>0 && $paramJsonData['shopstore_id']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_typeid', $paramJsonData)){
            if(($paramJsonData['product_typeid'])>0 && $paramJsonData['product_typeid']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_categoryid', $paramJsonData)){
            if(($paramJsonData['product_categoryid'])>0 && $paramJsonData['product_categoryid']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_listid', $paramJsonData)){
            if(($paramJsonData['product_listid'])>0 && $paramJsonData['product_listid']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_featureid', $paramJsonData)){
            if(($paramJsonData['product_featureid'])>0 && $paramJsonData['product_featureid']!=''){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_featuresize', $paramJsonData)){
            if($paramJsonData['product_featuresize']!='' && $paramJsonData['product_featuresize']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_featuresprice', $paramJsonData)){
            if(($paramJsonData['product_featuresprice'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_featuresqty', $paramJsonData)){
            if(($paramJsonData['product_featuresqty'])>=1){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_features_totalamount', $paramJsonData)){
            if(($paramJsonData['product_features_totalamount'])>0){
                $givenParamDataCorrectCount++;
            }
        }
        if(array_key_exists('product_description', $paramJsonData)){
            $givenParamDataCorrectCount++;
        }
        if($givenParamDataCorrectCount==12){
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
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32 || strlen($paramJsonData['udblogId'])==''){
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
    
    // CJ defined this function 2016-08-14
    public static function checkParamDataToRemoveItemFromOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32 || strlen($paramJsonData['udblogId'])==''){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('order_cartid', $paramJsonData)){
            if($paramJsonData['order_cartid']!='' && $paramJsonData['order_cartid']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('ordercart_itemid', $paramJsonData)){
            if($paramJsonData['ordercart_itemid']!='' && $paramJsonData['ordercart_itemid']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('reason', $paramJsonData)){
            if($paramJsonData['reason']!='' && $paramJsonData['reason']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check status key present or not
        if(array_key_exists('status', $paramJsonData)){
            if($paramJsonData['status']!='' && $paramJsonData['status']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==6){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-14
    public static function checkParamDataToUpdateItemFromOrdercart($paramJsonData){
        $retStatus = 'FALSE';
        $givenParamDataCorrectCount = 0;
        // check isUserLoggedIn key present or not
        if(array_key_exists('user_sessionid', $paramJsonData)){
            if(strlen($paramJsonData['user_sessionid'])>7){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('udblogId', $paramJsonData)){
            if(strlen($paramJsonData['udblogId'])==32 || strlen($paramJsonData['udblogId'])==''){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('order_cartid', $paramJsonData)){
            if($paramJsonData['order_cartid']!='' && $paramJsonData['order_cartid']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('ordercart_itemid', $paramJsonData)){
            if($paramJsonData['ordercart_itemid']!='' && $paramJsonData['ordercart_itemid']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check udblogId key present or not
        if(array_key_exists('reason', $paramJsonData)){
            if($paramJsonData['reason']!='' && $paramJsonData['reason']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        // check status key present or not
        if(array_key_exists('status', $paramJsonData)){
            if($paramJsonData['status']!='' && $paramJsonData['status']!=false){
                $givenParamDataCorrectCount++;
            }
        }
        if($givenParamDataCorrectCount==6){
            $retStatus = 'TRUE';
        }
        return $retStatus;
    }
    
    
}
