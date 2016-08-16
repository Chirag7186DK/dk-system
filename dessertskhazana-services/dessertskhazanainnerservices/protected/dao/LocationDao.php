<?php

/**
* Description of LocationDao
* @author chirag
*/

class LocationDao{
   
    // CJ defined this function 2016-06-06
    public static function getCityList($city_ids='', $city_name=''){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    COALESCE(MD5(c.id), '') cityId, 
                    COALESCE(c.name, '') cityName
                    FROM DK_CITYREACHED c 
                    WHERE 
                    c.status='A' AND c.name IS NOT NULL";
                    if($city_ids!=''){
                        $sql.=" AND MD5(c.id) IN ($city_ids) ";
                    }
                    if($city_name!=''){
                        $sql.=" AND LOWER(c.name)='$city_name' ";
                    }
            $sql.= " ORDER BY c.sort_order ASC ";    
            $command = $connection->createCommand($sql);
            $retCityList = $command->queryAll();
            if(count($retCityList)>0 && $retCityList!=false && $retCityList!=''){
                $retResult =  $retCityList;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getAreaList($area_ids='', $area_name=''){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    COALESCE(MD5(a.id), '') areaId, 
                    COALESCE(a.name, '') areaName
                    FROM DK_AREAREACHED a
                    WHERE 
                    a.status='A' AND a.name IS NOT NULL";
                    if($area_ids!=''){
                        $sql.=" AND MD5(a.id) IN ($area_ids) ";
                    }
                    if($area_name!=''){
                        $sql.=" AND LOWER(a.name)='$area_name' ";
                    }
            $sql.= " ORDER BY a.sort_order ASC ";    
            $command = $connection->createCommand($sql);
            $retAreaList = $command->queryAll();
            if(count($retAreaList)>0 && $retAreaList!=false && $retAreaList!=''){
                $retResult =  $retAreaList;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
       
    
    // CJ defined this function 2016-03-27
    public static function getCountryCityAreaAffiliationList($country_ids='', $city_ids='', $area_ids='', $type_ofdetailsshow=''){
        $retResult = false;
        $sqlGroupByStmt = '';
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT COALESCE(MD5(cca.id), '') ccaId,
                    COALESCE(MD5(country.id), '') countryId, COALESCE(country.name, '') countryName,
                    COALESCE(MD5(city.id), '') cityId, COALESCE(city.name, '') cityName,
                    COALESCE(MD5(area.id), '') areaId, COALESCE(area.name, '') areaName
                    FROM DK_COUNTRYCITYAREAAFFILIATION cca
                    JOIN DK_COUNTRYREACHED country ON country.id=cca.country_id AND country.status='A'
                    JOIN DK_CITYREACHED city ON city.id=cca.city_id AND city.status='A'
                    JOIN DK_AREAREACHED area ON area.id=cca.area_id AND area.status='A'
                    WHERE cca.status='A' AND country.name IS NOT NULL 
                    AND city.name IS NOT NULL AND area.name IS NOT NULL ";
                    
                    if($country_ids!=''){
                        $sql.=" AND MD5(cca.country_id) IN ($country_ids) ";
                    }
                    if($city_ids!=''){
                        $sql.=" AND MD5(cca.city_id) IN ($city_ids) ";
                    }
                    if($area_ids!=''){
                        $sql.=" AND MD5(cca.area_id) IN ($area_ids) ";
                    }
                    
                    if($type_ofdetailsshow!='' && ($type_ofdetailsshow=='city_list' || $type_ofdetailsshow=='city_details')){
                        $sqlGroupByStmt.= " cca.country_id, cca.city_id ";
                    }
                    
                    if($sqlGroupByStmt!='' && $sqlGroupByStmt!=false){
                        $sql.= " GROUP BY ".$sqlGroupByStmt;
                    }
            $sql.= " ORDER BY country.sort_order ASC, city.sort_order ASC, area.sort_order ASC ";    
            $command = $connection->createCommand($sql);
            $retCountryCityAreaAffiliationList = $command->queryAll();
            if(count($retCountryCityAreaAffiliationList)>0 && $retCountryCityAreaAffiliationList!=false && $retCountryCityAreaAffiliationList!=''){
                $retResult =  $retCountryCityAreaAffiliationList;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-05-24
    public static function getAreaBasedConductProductTypeShopStoreDetails($countryCityAreaAffiliationId, $productTypeId='', $notProductTypeId='', $shopStoreId=''){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    COALESCE(MD5(cca.country_id), '') countryId,
                    COALESCE(MD5(cca.city_id), '') cityId, 
                    COALESCE(MD5(cca.area_id), '') areaId,
                    COALESCE(a.name, '') areaTitle,
                    COALESCE(MD5(cpts.cca_id), '') countryCityAreaAffiliationId,
                    COALESCE(MD5(cpts.product_typeid), '') productTypeId,
                    COALESCE(pt.name, '') productTypeTitle,
                    COALESCE(MD5(cpts.shopstore_id), '') shopStoreId,
                    COALESCE(s.shopstore_name, '') shopStoreTitle
                    FROM DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE cpts
                    JOIN DK_COUNTRYCITYAREAAFFILIATION cca ON cca.id=cpts.cca_id 
                    JOIN DK_AREAREACHED a ON a.id=cca.area_id
                    JOIN DK_PRODUCTTYPE pt ON pt.id=cpts.product_typeid 
                    JOIN DK_SHOPSTORES s ON s.id=cpts.shopstore_id AND cpts.cca_id=s.country_city_area_affiliationId
                    WHERE 
                    cpts.status='A'
                    AND cca.status='A'
                    AND a.status='A'
                    AND pt.status='A'
                    AND s.status='A'
                    AND cpts.cca_id IN ($countryCityAreaAffiliationId)
                    AND s.country_city_area_affiliationId IN ($countryCityAreaAffiliationId)
                    AND cca.id IN ($countryCityAreaAffiliationId) ";
                    if($productTypeId!=''){
                        $sql.=" AND pt.id IN ($productTypeId) AND cpts.product_typeid IN ($productTypeId) ";
                    }
                    if($notProductTypeId!=''){
                        $sql.=" AND pt.id NOT IN ($notProductTypeId) AND cpts.product_typeid NOT IN ($notProductTypeId) ";
                    }
                    if($shopStoreId!=''){
                        $sql.=" AND cpts.shopstore_id IN ($shopStoreId) AND s.id IN ($shopStoreId) ";
                    }
            $sql.= "    ORDER BY pt.sort_order ASC ";        
            $command = $connection->createCommand($sql);
            $retAreaBasedConductProductTypeShopStoreDetails = $command->queryAll();
            if(count($retAreaBasedConductProductTypeShopStoreDetails)>0 
                && $retAreaBasedConductProductTypeShopStoreDetails!=false){
                $retResult =  $retAreaBasedConductProductTypeShopStoreDetails;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    
}
