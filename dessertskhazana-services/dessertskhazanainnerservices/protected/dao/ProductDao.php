<?php

/**
* Description of ProductDao
* @author chirag
*/

class ProductDao{
    
    // CJ defined this function 2016-06-06
    public static function getProductTypeList($product_type_id='', $product_typename=''){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT 
                COALESCE(pt.id, '') productTypeId, COALESCE(pt.name, '') productTypeName
                FROM PRODUCTTYPE pt 
                WHERE pt.status='A' AND pt.name IS NOT NULL ";
                if($product_type_id!='' && strlen($product_type_id)==32){
                    $sqlFetchQuery.=" AND pt.id='$product_type_id' ";
                }
                if($product_typename!='' && $product_typename!=false && $product_typename!=null){
                    $sqlFetchQuery.=" AND pt.name = '$product_typename' ";
                }
            $sqlFetchQuery.=" ORDER BY pt.sort_order ASC ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retProductTypeListArr = $command->queryAll();
            if($retProductTypeListArr!=false && count($retProductTypeListArr)>0){
                $retResult =  $retProductTypeListArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getProductTypeProductCategoryProductList($paramJson=array(), $selectStatementForGroupBy=''){
        $retResult = false;
        $sqlGroupByStatement = '';
        $sqlOrderByStmt = " ORDER BY pt.id, ppc.id, spa.product_typeid, spac.producttype_categoryid,";
        try{
            $connection = Yii::App()->db;
            
            $sql= " SELECT 
                    COALESCE(ccr.country_id, '') countryId, 
                    COALESCE(ccr.city_id, '') cityId, COALESCE(country.name, '') cityName, 
                    COALESCE(ccr.area_id, '') areaId, COALESCE(area.name, '') areaTitle,
                    COALESCE(ss.id, '') shopStoreId, COALESCE(ss.name, '') shopStoreTitle,
                    COALESCE(ss.storelabel, '') shopStoreLabel, COALESCE(ss.logofile, '') shopstore_logofile,
                    COALESCE(ss.mobile, '') shopstore_mobile,
                    COALESCE(pt.id, '') productTypeId, COALESCE(pt.name, '') productTypeTitle, 
                    COALESCE(UPPER(pt.name), '') productTypeTitleInCaps,
                    COALESCE(ppc.id, '') productTypeProductCategoryId, COALESCE(spac.name, '') productTypeProductCategoryTitle,
                    COALESCE(spl.id, '') productListId, COALESCE(spl.name, '') productListTitle,
                    COALESCE(splld.id, '') productFeatureId, COALESCE(splld.food_type, '') productFeatureFoodType, 
                    COALESCE(splld.taste_type, '') productFeatureTasteType, COALESCE(splld.pattern_type, '') productFeaturePatternType, 
                    COALESCE(splld.display_measurementtype, '') productFeatureDisplayMeasurementType,
                    COALESCE(splld.baseprice, '') productFeatureBasePrice, COALESCE(splld.product_discount, '') productFeatureDiscount,
                    COALESCE(splld.online_sellprice, '') productFeatureOnlineSellingPrice,
                    'Y' isProductImageFileShowCase,
                    COALESCE(spl.image_name, 'productphotoback.png') productImageFileName,
                    COALESCE(spl.file_path, 'images/productphotoback.png') productImageFilePath ";
            $sql.= $selectStatementForGroupBy;
            $sql.="
                    FROM PRODUCTTYPE pt
                    JOIN PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.status = 'A' AND pt.status = 'A'
                    JOIN STORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.status = 'A' 
                    JOIN STORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.store_producttype_affiliationid=spa.id 
                        AND spac.producttype_categoryid=ppc.id AND spac.status = 'A'
                    JOIN STORE_PRODUCTLIST spl ON spl.store_ptpc_affiliationid = spac.id AND spl.status = 'A'
                    JOIN STORE_PRODUCTLIST_LOGDETAILS splld ON splld.productlist_id=spl.id AND splld.status = 'A'
                    JOIN STORE ss ON ss.id=spa.store_id AND ss.status = 'A'
                    JOIN COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
                    JOIN COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
                    JOIN CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
                    JOIN AREAREACHED area ON area.id=ccr.area_id AND area.status='A'";
            
            $sql.="  WHERE 1 ";
            
                // add shop store in where condition
                if(array_key_exists('shop_storesids', $paramJson)){
                    if($paramJson['shop_storesids']!=false && $paramJson['shop_storesids']!='' 
                        && $paramJson['shop_storesids']!=null){
                        $sql.=" AND ss.id IN (".$paramJson['shop_storesids'].") AND spa.store_id IN (".$paramJson['shop_storesids'].") ";
                    }
                }
                
                // add product type id in where condition
                if(array_key_exists('product_typeids', $paramJson)){
                    if($paramJson['product_typeids']!=false && $paramJson['product_typeids']!='' 
                        && $paramJson['product_typeids']!=null){
                        $sql.=" AND pt.id IN (".$paramJson['product_typeids'].") AND ppc.product_typeid IN (".$paramJson['product_typeids'].") ";
                        $sql.=" AND spa.product_typeid IN (".$paramJson['product_typeids'].") ";
                    }
                }
                
                // add product type id ka product category id in where condition
                if(array_key_exists('product_categoryids', $paramJson)){
                    if($paramJson['product_categoryids']!=false && $paramJson['product_categoryids']!='' 
                        && $paramJson['product_categoryids']!=null){
                        $sql.=" AND ppc.id IN (".$paramJson['product_categoryids'].") AND spac.producttype_categoryid IN (".$paramJson['product_categoryids'].") ";
                    }
                }
                
                // add product_listids in where condition
                if(array_key_exists('product_listids', $paramJson)){
                    if($paramJson['product_listids']!=false && $paramJson['product_listids']!='' 
                        && $paramJson['product_listids']!=null){
                        $sql.=" AND spl.id IN (".$paramJson['product_listids'].") AND splld.productlist_id IN (".$paramJson['product_listids'].") ";
                    }
                }
                
                // filter by weight 
                if(array_key_exists('product_size_filter', $paramJson)){
                    if(count($paramJson['product_size_filter'])>0 
                        && $paramJson['product_size_filter']!=false && $paramJson['product_size_filter']!=''){
                        $sizeFilterConditionArr = array();
                        $productSizeFilterArr = $paramJson['product_size_filter'];
                        for($eachSizeFilterIndex = 0; $eachSizeFilterIndex<count($productSizeFilterArr); $eachSizeFilterIndex++){
                            if($productSizeFilterArr[$eachSizeFilterIndex]!=''){
                                $productSize = $productSizeFilterArr[$eachSizeFilterIndex];
                                array_push($sizeFilterConditionArr, " (splld.display_measurementtype='".$productSize."')");
                            }
                        }
                        if(count($sizeFilterConditionArr)>0 && $sizeFilterConditionArr!=false){
                            $sql.=" AND (".implode(" || ", $sizeFilterConditionArr).")";
                        }
                    }
                }
                
                // filter by price
                if(array_key_exists('product_price_filter', $paramJson)){
                    if(count($paramJson['product_price_filter'])>0 
                        && $paramJson['product_price_filter']!=false && $paramJson['product_price_filter']!=''){ 
                        $priceFilterConditionArr = array();
                        $productPriceFilterArr = $paramJson['product_price_filter'];
                        for($eachPriceFilterIndex = 0; $eachPriceFilterIndex<count($productPriceFilterArr); $eachPriceFilterIndex++){
                            if($productPriceFilterArr[$eachPriceFilterIndex]!=''){
                                $priceExplodeOnUnderScoreOptr = explode("_", $productPriceFilterArr[$eachPriceFilterIndex]);
                                if(count($priceExplodeOnUnderScoreOptr)>1){
                                    array_push($priceFilterConditionArr, " (splld.online_sellprice>=".$priceExplodeOnUnderScoreOptr[0]." AND splld.online_sellprice<=".$priceExplodeOnUnderScoreOptr[1].")");
                                }else{
                                    array_push($priceFilterConditionArr, " (splld.online_sellprice=".$priceExplodeOnUnderScoreOptr[0].")");
                                }
                            }
                        }
                        if(count($priceFilterConditionArr)>0 && $priceFilterConditionArr!=false){
                            $sql.=" AND (".implode(" || ", $priceFilterConditionArr).")";
                        }
                    }
                }
                
                // filter by price
                if(array_key_exists('product_discount_filter', $paramJson)){
                    if(count($paramJson['product_discount_filter'])>0 
                        && $paramJson['product_discount_filter']!=false && $paramJson['product_discount_filter']!=''){
                        $discountFilterConditionArr = array();
                        $productDiscountFilterArr = $paramJson['product_discount_filter'];
                        for($eachDiscountFilterIndex = 0; $eachDiscountFilterIndex<count($productDiscountFilterArr); $eachDiscountFilterIndex++){
                            if($productDiscountFilterArr[$eachDiscountFilterIndex]!=''){
                                $discountExplodeOnUnderScoreOptr = explode("_", $productDiscountFilterArr[$eachDiscountFilterIndex]);
                                if(count($discountExplodeOnUnderScoreOptr)>1){
                                    array_push($discountFilterConditionArr, " (splld.product_discount>=".$discountExplodeOnUnderScoreOptr[0]." AND splld.product_discount<=".$discountExplodeOnUnderScoreOptr[1].")");
                                }else{
                                    array_push($discountFilterConditionArr, " (splld.product_discount=".$discountExplodeOnUnderScoreOptr[0].")");
                                }
                            }
                        }
                        if(count($discountFilterConditionArr)>0 && $discountFilterConditionArr!=false){
                            $sql.=" AND (".implode(" || ", $discountFilterConditionArr).")";
                        }
                    }
                }
                
                // add product type id in not in where condition
                if(array_key_exists('not_inproduct_typeids', $paramJson)){
                    if($paramJson['not_inproduct_typeids']!=false && $paramJson['not_inproduct_typeids']!='' 
                        && $paramJson['not_inproduct_typeids']!=null){
                        $sql.=" AND pt.id NOT IN (".$paramJson['not_inproduct_typeids'].") AND ppc.product_typeid NOT IN (".$paramJson['not_inproduct_typeids'].") ";
                        $sql.=" AND spa.product_typeid NOT IN (".$paramJson['not_inproduct_typeids'].") ";
                    }
                }
                
                // group by condition statement
                if(array_key_exists('groupby_product_typeids', $paramJson)){
                    if($paramJson['groupby_product_typeids']=='Y'){
                        $sqlGroupByStatement.=" pt.id,";
                    }
                }
                
                if(array_key_exists('groupby_product_categoryids', $paramJson)){
                    if($paramJson['groupby_product_categoryids']=='Y'){
                        $sqlGroupByStatement.=" ppc.id,";
                    }
                }
                
                if(array_key_exists('groupby_shopstores_ids', $paramJson)){
                    if($paramJson['groupby_shopstores_ids']=='Y'){
                        $sqlGroupByStatement.=" ss.id,";
                    }
                }
                
                // sort by sort_storeareas
                if(array_key_exists('sort_storeareas', $paramJson)){
                    if($paramJson['sort_storeareas']!='' && $paramJson['sort_storeareas']!=false){
                        $sqlOrderByStmt.= $paramJson['sort_storeareas'].",";
                    }
                }
                
                // sort by sort_productfeaturesid
                if(array_key_exists('sort_productfeaturesid', $paramJson)){
                    if($paramJson['sort_productfeaturesid']!='' && $paramJson['sort_productfeaturesid']!=false){
                        $sqlOrderByStmt.= $paramJson['sort_productfeaturesid'].",";
                    }
                }
                
                // sort by price
                if(array_key_exists('price_lowtohigh', $paramJson)){
                    if($paramJson['price_lowtohigh']=='Y'){
                        $sqlOrderByStmt.=" splld.online_sellprice ASC,";
                    }
                }else if(array_key_exists('price_hightolow', $paramJson)){
                    if($paramJson['price_hightolow']=='Y'){
                        $sqlOrderByStmt.=" splld.online_sellprice DESC,";
                    }
                }else{
                    $sqlOrderByStmt.= "splld.online_sellprice ASC,";
                }
                
                // sort by discount
                if(array_key_exists('discount_lowtohigh', $paramJson)){
                    if($paramJson['discount_lowtohigh']=='Y'){
                        $sqlOrderByStmt.=" splld.product_discount ASC";
                    }
                }else if(array_key_exists('discount_hightolow', $paramJson)){
                    if($paramJson['discount_hightolow']=='Y'){
                        $sqlOrderByStmt.=" splld.product_discount DESC,";
                    }
                }else{
                    $sqlOrderByStmt.=" splld.product_discount ASC,";
                }
                
                if($sqlGroupByStatement!=''){
                    $sql.= " GROUP BY ". trim($sqlGroupByStatement, ",");
                }
                
                if($sqlOrderByStmt!=''){
                    $sql.= trim($sqlOrderByStmt, ",");
                }
            $command = $connection->createCommand($sql);
            $productDetailsArr = $command->queryAll();
            if(count($productDetailsArr)>0 && $productDetailsArr!=false){
                $retResult =  $productDetailsArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
   
    
    // CJ defined this function 2016-09-09
    public static function getStoreProductTypeProductCategoryProductSummary($storeId, $productTypeId, $productCategoryId=''){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT
                    ss.id shopStoreId, ss.name shopStoreTitle, COALESCE(area.name, '') shopStoreOrgLocation,
                    COUNT(*) totalProduct, COALESCE(MAX(splld.product_discount), '0') maxProductDiscount,
                    COALESCE(MAX(splld.online_sellprice), '') maxOnlineProductPrice,
                    COALESCE(MIN(splld.online_sellprice), '') minOnlineProductPrice
                    FROM PRODUCTTYPE pt
                    JOIN PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.status = 'A' AND pt.status = 'A'
                    JOIN STORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  AND spa.status = 'A' 
                    JOIN STORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.store_producttype_affiliationid=spa.id 
                        AND spac.producttype_categoryid=ppc.id AND spac.status = 'A'
                    JOIN STORE_PRODUCTLIST spl ON spl.store_ptpc_affiliationid = spac.id AND spl.status = 'A'
                    JOIN STORE_PRODUCTLIST_LOGDETAILS splld ON splld.productlist_id=spl.id AND splld.status = 'A'
                    JOIN STORE ss ON ss.id=spa.store_id AND ss.status = 'A'
                    JOIN COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
                    JOIN COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
                    JOIN CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
                    JOIN AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
                    WHERE 1
                    AND ss.id IN ($storeId) AND spa.store_id IN ($storeId)
                    AND pt.id IN ($productTypeId) AND ppc.product_typeid IN ($productTypeId)
                    AND spa.product_typeid IN ($productTypeId)
                    GROUP BY ss.id, spa.product_typeid
                    HAVING totalProduct>0";
            $command = $connection->createCommand($sqlFetchQuery);
            $storeProductTypeProductCategoryProductSummaryArr = $command->queryAll();
            if(count($storeProductTypeProductCategoryProductSummaryArr)>0 
                && $storeProductTypeProductCategoryProductSummaryArr!=false){
                $retResult =  $storeProductTypeProductCategoryProductSummaryArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getProductImagesDetails($productListId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT 
                COALESCE(ppimg.id, '') ppImgId,
                COALESCE(ppimg.is_showcasefile, 'N') isProductImageFileShowCase,
                COALESCE(ppimg.image_filename, 'no-image.png') productImageFileName,
                COALESCE(ppimg.file_path, 'images/producttype/default/') productImageFilePath
                FROM STORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg
                WHERE 
                ppimg.product_listid='$productListId'
                AND ppimg.status='A'
                ORDER BY ppimg.sort_order ASC";
            $command = $connection->createCommand($sqlFetchQuery);
            $retProductImagesListArr = $command->queryAll();
            if(count($retProductImagesListArr)>0 && $retProductImagesListArr!=false){
                $retResult =  $retProductImagesListArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getProductDescriptionDetails($productListId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT 
                COALESCE(spldd.productlist_id, '') productListId,
                COALESCE(spldd.id, '') productDescriptionId,
                COALESCE(spldd.description_title, '') productDescriptionTitle,
                COALESCE(spldd.description_content, '') productDescription,
                COALESCE(spldd.content_file, '') productContentFile,
                COALESCE(spldd.content_filepath, '') productContentFilePath
                FROM STORE_PRODUCTLIST_DESCRIPTIONDETAILS spldd
                WHERE 1
                AND spldd.productlist_id='$productListId'
                AND spldd.status='A' ";
            $command = $connection->createCommand($sqlFetchQuery);
            $productDescriptionDetailsArr = $command->queryAll();
            if(count($productDescriptionDetailsArr)>0 
                && $productDescriptionDetailsArr!=false){
                $retResult =  $productDescriptionDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
     
}
