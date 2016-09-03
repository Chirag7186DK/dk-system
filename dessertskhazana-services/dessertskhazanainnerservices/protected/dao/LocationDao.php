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
                    COALESCE(c.id, '') cityId, 
                    COALESCE(c.name, '') cityName
                    FROM DK_CITYREACHED c 
                    WHERE 1
                    AND c.status='A' AND c.name IS NOT NULL";
                    if($city_ids!=''){
                        $sql.=" AND c.id IN ($city_ids) ";
                    }
                    if($city_name!=''){
                        $sql.=" AND LOWER(c.name)='$city_name' ";
                    }
            $sql.= " ORDER BY c.sort_order ASC ";    
            $command = $connection->createCommand($sql);
            $cityList = $command->queryAll();
            if(count($cityList)>0 && $cityList!=false){
                $retResult =  $cityList;    
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
                    COALESCE(a.id, '') areaId, 
                    COALESCE(a.name, '') areaName
                    FROM DK_AREAREACHED a
                    WHERE 1
                    AND a.status='A' AND a.name IS NOT NULL";
                    if($area_ids!=''){
                        $sql.=" AND a.id IN ($area_ids) ";
                    }
                    if($area_name!=''){
                        $sql.=" AND LOWER(a.name)='$area_name' ";
                    }
            $sql.= " ORDER BY a.sort_order ASC ";    
            $command = $connection->createCommand($sql);
            $areaList = $command->queryAll();
            if(count($areaList)>0 && $areaList!=false){
                $retResult =  $areaList;    
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
            $sql= " SELECT 
                    COALESCE(cca.id, '') ccaId,
                    COALESCE(country.id, '') countryId, COALESCE(country.name, '') countryName,
                    COALESCE(city.id, '') cityId, COALESCE(city.name, '') cityName,
                    COALESCE(area.id, '') areaId, COALESCE(area.name, '') areaName, 
                    COALESCE(area.pincode, '') areaPincode
                    FROM DK_COUNTRYCITYAREAAFFILIATION cca
                    JOIN DK_COUNTRYREACHED country ON country.id=cca.country_id AND country.status='A'
                    JOIN DK_CITYREACHED city ON city.id=cca.city_id AND city.status='A'
                    JOIN DK_AREAREACHED area ON area.id=cca.area_id AND area.status='A'
                    WHERE cca.status='A' AND country.name IS NOT NULL 
                    AND city.name IS NOT NULL AND area.name IS NOT NULL ";
                    if($country_ids!=''){
                        $sql.=" AND cca.country_id IN ($country_ids) ";
                    }
                    if($city_ids!=''){
                        $sql.=" AND cca.city_id IN ($city_ids) ";
                    }
                    if($area_ids!=''){
                        $sql.=" AND cca.area_id IN ($area_ids) ";
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
            if(count($retCountryCityAreaAffiliationList)>0 && $retCountryCityAreaAffiliationList!=false){
                $retResult =  $retCountryCityAreaAffiliationList;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-05-24
    // very Important func
    public static function getCCABasedConductDessertsTypeDetails($ccaIds, $productTypeIds='', $notProductTypeIds='', $shopStoreIds='', $sqlGroupByStatement=''){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    COALESCE(cpts.cca_id, '') countryCityAreaAffiliationId,
                    COALESCE(cca.country_id, '') countryId, 
                    COALESCE(cca.city_id, '') cityId, COALESCE(c.name, '') cityName,
                    COALESCE(cca.area_id, '') areaId, COALESCE(a.name,'') areaName,
                    COALESCE(cpts.product_typeid, '') productTypeId, COALESCE(pt.name, '') productTypeTitle,
                    COALESCE(s.id, '') shopStoreId, COALESCE(s.shopstore_name, '') shopStoreTitle
                    FROM DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE cpts
                    JOIN DK_COUNTRYCITYAREAAFFILIATION cca ON cca.id=cpts.cca_id 
                    JOIN DK_CITYREACHED c ON c.id=cca.city_id 
                    JOIN DK_AREAREACHED a ON a.id=cca.area_id 
                    JOIN DK_PRODUCTTYPE pt ON pt.id=cpts.product_typeid 
                    JOIN DK_SHOPSTORES s ON FIND_IN_SET_X(s.id, cpts.shopstore_ids)>0
                    WHERE 1
                    AND cpts.status='A' AND cca.status='A' AND c.status='A' AND a.status='A' 
                    AND pt.status='A' AND s.status='A'
                    AND cpts.cca_id IN ($ccaIds) AND cca.id IN ($ccaIds) ";
                    if($productTypeIds!=''){
                        $sql.=" AND pt.id IN ($productTypeIds) AND cpts.product_typeid IN ($productTypeIds) ";
                    }
                    if($notProductTypeIds!=''){
                        $sql.=" AND pt.id NOT IN ($notProductTypeIds) AND cpts.product_typeid NOT IN ($notProductTypeIds) ";
                    }
                    if($shopStoreIds!=''){
                        $sql.=" AND FIND_IN_SET_X($shopStoreIds, cpts.shopstore_ids)>0 AND s.id IN ($shopStoreIds) ";
                    }
                    if($sqlGroupByStatement!=''){
                        $sql.= " GROUP BY ". trim($sqlGroupByStatement, ",");
                    }
            $sql.= "  ORDER BY pt.sort_order ASC ";        
            $command = $connection->createCommand($sql);
            $ccaBasedConductDessertsTypeDetails = $command->queryAll();
            if(count($ccaBasedConductDessertsTypeDetails)>0 
                && $ccaBasedConductDessertsTypeDetails!=false){
                $retResult =  $ccaBasedConductDessertsTypeDetails;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    
}
