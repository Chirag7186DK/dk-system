<?php

/**
* Description of ShopStoreDao
* @author chirag
*/

class ShopStoreDao{
   
    // CJ defined this function 2016-06-06
    public static function getShopStoresList($shop_storeids='', $ccaId=''){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COALESCE(ss.id, '') shopStoreId, 
                COALESCE(ss.shopstore_name, '') shopStoreName,
                UPPER(COALESCE(ss.shopstore_name, '')) shopStoreNameInCaps,
                COALESCE(ss.shopstore_logofile, '') shopStoreLogoFile,
                COALESCE(ss.shopstore_mobile, '') shopStoreContact,
                COALESCE(ss.address, '') shopStoreAddress,
                COALESCE(a.id, '') areaId, COALESCE(a.name, '') areaName
                FROM DK_SHOPSTORES ss 
                JOIN DK_COUNTRYCITYAREAAFFILIATION cca ON cca.id=ss.country_city_area_affiliationId
                JOIN DK_CITYREACHED c ON c.id=cca.city_id 
                JOIN DK_AREAREACHED a ON a.id=cca.area_id
                WHERE 1
                AND ss.status='A' AND c.status='A' AND a.status='A' AND cca.status='A'";
                if($shop_storeids!='' && $shop_storeids!=false && $shop_storeids!=null){
                    $sqlFetchQuery.=" AND ss.id IN ($shop_storeids)";
                }
                if($ccaId!='' && $ccaId!=false && $ccaId!=null){
                    $sqlFetchQuery.=" AND ss.country_city_area_affiliationId IN ($ccaId) ";
                }
            $command = $connection->createCommand($sqlFetchQuery);
            $storeListArr = $command->queryAll();
            if(count($storeListArr)>0 && $storeListArr!=false){
                $retResult =  $storeListArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    } 
   
    // CJ defined this function 2016-06-06
    public static function getShopStoreDeliveryLocationFacilityDetails($paramJson=array()){
        $retResult = false;
        $sqlGroupByStatement = '';
        $sqlOrderByStmt = " ORDER BY country.name ASC,city.name ASC, area.name ASC,";
        try{
            
            $connection = Yii::App()->db;
            
            $sql= " SELECT 
                    COALESCE(ss.id, '') shopStoreId, COALESCE(ss.shopstore_name, '') shopStoreName,
                    COALESCE(ss.country_city_area_affiliationId, '') countryCityAreaAffiliationId,
                    COALESCE(country.id, '') countryId, COALESCE(country.name, '') countryName, 
                    COALESCE(city.id, '') cityId, COALESCE(city.name, '') cityName,
                    COALESCE(area.id, '') areaId, COALESCE(area.name, '') areaName,
                    COALESCE(area.pincode, '') areaPincode,
                    COALESCE(sdl.is_preorderaccept, 'Y') isPreorderAccept, 
                    COALESCE(sdl.is_takeawayorderaccept, 'N') takeAwayOrderAccept,
                    COALESCE(sdl.is_cashondeliveryaccept, 'N') cashOnDeliveryAccept, 
                    COALESCE(sdl.is_onlinepaymentaccept, 'Y') isOnlinePaymentAccept, 
                    COALESCE(sdl.is_homedeliveryaccept, 'Y') isHomeDeliveryAccept, 
                    COALESCE(sdl.is_courierdeliveryaccept, 'N') is_courierdeliveryaccept, 
                    COALESCE(sdl.orderdelivery_opentime, '') orderDeliveryOpenTime, 
                    COALESCE(sdl.orderdelivery_closetime, '') orderDeliveryCloseTime,
                    COALESCE(sdl.deliveryfee, '') deliveryfee, COALESCE(sdl.min_orderamount, '') min_orderamount,
                    COALESCE(sdl.delivery_time, '60 MIN') delivery_time
                    FROM DK_SHOPSTORES ss
                    JOIN DK_SHOPSTORE_DELIVERYLOCATIONDETAILS sdl ON sdl.shopstore_id=ss.id AND sdl.status='A'
                    JOIN DK_COUNTRYREACHED country ON sdl.country_id=country.id AND country.status='A'
                    JOIN DK_CITYREACHED city ON sdl.city_id=city.id AND city.status='A' 
                    JOIN DK_AREAREACHED area ON sdl.area_id=area.id AND area.status='A'";
            $sql.="  WHERE 1 ";
            
                // add shop store in where condition
                if(array_key_exists('shop_storesids', $paramJson)){
                    if($paramJson['shop_storesids']!=false && $paramJson['shop_storesids']!='' 
                        && $paramJson['shop_storesids']!=null){
                        $sql.=" AND ss.id IN (".$paramJson['shop_storesids'].") AND sdl.shopstore_id IN (".$paramJson['shop_storesids'].") ";
                    }
                }
                
                // add country in where condition
                if(array_key_exists('country_ids', $paramJson)){
                    if($paramJson['country_ids']!=false && $paramJson['country_ids']!='' 
                        && $paramJson['country_ids']!=null){
                        $sql.=" AND sdl.country_id IN (".$paramJson['country_ids'].") AND country.id IN (".$paramJson['country_ids'].") ";
                    }
                }
                
                // add city in where condition
                if(array_key_exists('city_ids', $paramJson)){
                    if($paramJson['city_ids']!=false && $paramJson['city_ids']!='' 
                        && $paramJson['city_ids']!=null){
                        $sql.=" AND sdl.city_id IN (".$paramJson['city_ids'].") AND city.id IN (".$paramJson['city_ids'].") ";
                    }
                }
                
                // add area in where condition
                if(array_key_exists('area_ids', $paramJson)){
                    if($paramJson['area_ids']!=false && $paramJson['area_ids']!='' 
                        && $paramJson['area_ids']!=null){
                        $sql.=" AND sdl.area_id IN (".$paramJson['area_ids'].") AND area.id IN (".$paramJson['area_ids'].") ";
                    }
                }
                
                // add takeawayorder in where condition
                if(array_key_exists('takeawayorder', $paramJson)){
                    if($paramJson['takeawayorder']=='Y'){
                        $sql.=" AND sdl.is_takeawayorderaccept = 'Y'";
                    }
                }
                
                // add preorder in where condition
                if(array_key_exists('preorder', $paramJson)){
                    if($paramJson['preorder']=='Y'){
                        $sql.=" AND sdl.is_preorderaccept = 'Y'";
                    }
                }
                
                // add cashdelivery in where condition
                if(array_key_exists('cashdelivery', $paramJson)){
                    if($paramJson['cashdelivery']=='Y'){
                        $sql.=" AND sdl.is_cashondeliveryaccept = 'Y'";
                    }
                }
                
                // add onlinepayment in where condition
                if(array_key_exists('onlinepayment', $paramJson)){
                    if($paramJson['onlinepayment']=='Y'){
                        $sql.=" AND sdl.is_onlinepaymentaccept = 'Y'";
                    }
                }
                
                // add homedelivery in where condition
                if(array_key_exists('homedelivery', $paramJson)){
                    if($paramJson['homedelivery']=='Y'){
                        $sql.=" AND sdl.is_homedeliveryaccept = 'Y'";
                    }
                }
                
                // add group by statement 
                if(array_key_exists('groupby_area_ids', $paramJson)){
                    if($paramJson['groupby_area_ids']=='Y'){
                        $sqlGroupByStatement.=" sdl.area_id,";
                    }
                }
                if(array_key_exists('groupby_city_ids', $paramJson)){
                    if($paramJson['groupby_city_ids']=='Y'){
                        $sqlGroupByStatement.=" sdl.city_id,";
                    }
                }
                
                if($sqlGroupByStatement!=''){
                    $sql.= " GROUP BY ".trim($sqlGroupByStatement, ",");
                }
                if($sqlOrderByStmt!=''){
                    $sql.= trim($sqlOrderByStmt, ",");
                }
            
            $command = $connection->createCommand($sql);
            $storeDeliveryLocationListArr = $command->queryAll();
            if(count($storeDeliveryLocationListArr)>0 && $storeDeliveryLocationListArr!=false){
                $retResult =  $storeDeliveryLocationListArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-07-18
    public static function getShopstoreWorkingstyleDetails($shop_storeids){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COALESCE(sw.dayname, '') dayName,
                COALESCE(sw.open_time, '') openTime,
                COALESCE(sw.close_time, '') closeTime,
                (CASE WHEN COALESCE(sw.is_shopholiday,'N')='N' THEN 'OPEN' ELSE 'CLOSE' END) isShopholiday,
                (CASE WHEN DAYNAME(CURDATE())=COALESCE(sw.dayname, '') THEN 'Y' ELSE 'N' END) isTodayDayMatched
                FROM DK_SHOPSTORE_WORKINGHOURS sw 
                WHERE sw.status='A' AND sw.shopstore_id IN ($shop_storeids) ";
            $command = $connection->createCommand($sqlFetchQuery);
            $storeWorkingDetailsArr = $command->queryAll();
            if(count($storeWorkingDetailsArr)>0 && $storeWorkingDetailsArr!=false){
                $retResult =  $storeWorkingDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    } 
   
    
}

