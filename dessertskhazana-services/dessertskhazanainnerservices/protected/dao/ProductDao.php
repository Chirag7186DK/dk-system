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
                FROM DK_PRODUCTTYPE pt 
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
                $retResult =  $retCityListArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getProductTypeProductCategoryProductList($paramJson=array(), $selectStatementForGroupBy=''){
        $retResult = false;
        $sqlGroupByStatement = '';
        $sqlOrderByStmt = " ORDER BY pt.id, ppc.id, spa.product_typeid, sppc.producttype_categoryid,";
        try{
            $connection = Yii::App()->db;
            
            $sql= " SELECT 
                    COALESCE(ccr.country_id, '') countryId, 
                    COALESCE(ccr.city_id, '') cityId, COALESCE(country.name, '') cityName, 
                    COALESCE(ccr.area_id, '') areaId, COALESCE(area.name, '') areaTitle,
                    COALESCE(spa.shopstore_id, '') shopStoreId, COALESCE(ss.shopstore_name, '') shopStoreTitle,
                    COALESCE(ss.shop_storelabel, '') shopStoreLabel, COALESCE(ss.shopstore_logofile, '') shopstore_logofile,
                    COALESCE(ss.shopstore_mobile, '') shopstore_mobile,
                    COALESCE(pt.id, '') productTypeId, COALESCE(pt.name, '') productTypeTitle, 
                    COALESCE(UPPER(pt.name), '') productTypeTitleInCaps,
                    COALESCE(ppc.id, '') productTypeProductCategoryId, COALESCE(ppc.name, '') productTypeProductCategoryTitle,
                    COALESCE(spl.id, '') productListId, COALESCE(spl.name, '') productListTitle,
                    COALESCE(splld.id, '') productFeatureId, COALESCE(splld.food_type, '') productFeatureFoodType, 
                    COALESCE(splld.taste_type, '') productFeatureTasteType, COALESCE(splld.pattern_type, '') productFeaturePatternType, 
                    COALESCE(splld.display_measurementtype, '') productFeatureDisplayMeasurementType,
                    COALESCE(splld.baseprice, '') productFeatureBasePrice, COALESCE(splld.product_discount, '') productFeatureDiscount,
                    COALESCE(splld.online_sellprice, '') productFeatureOnlineSellingPrice,
                    COALESCE(splImg.is_showcasefile, 'N') isProductImageFileShowCase,
                    COALESCE(splImg.image_filename, 'r1_(270x239).png') productImageFileName,
                    COALESCE(splImg.file_path, 'images/') productImageFilePath ";
            $sql.= $selectStatementForGroupBy;
            $sql.="
                    FROM DK_PRODUCTTYPE pt
                    JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.status = 'A' AND pt.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  AND spa.status = 'A' 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.shopstores_producttype_affiliationid=spa.id 
                        AND spac.producttype_categoryid=ppc.id AND spac.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTLIST spl ON spl.shopstores_ptpc_affiliationid = spac.id AND spl.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTLIST_LOGDETAILS splld ON splld.productlist_id=spl.id AND splld.status = 'A'
                    JOIN DK_SHOPSTORES ss ON ss.id=spa.shopstore_id AND ss.status = 'A'
                    JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
                    JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
                    JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
                    JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
                    LEFT JOIN DK_SHOPSTORE_PRODUCTLIST_IMAGEFILEMAPPING splImg 
                        ON splImg.product_listid=spl.id  AND splImg.status = 'A' AND splImg.is_showcasefile = 'Y' ";
                        
                    // add product_listids in left join condition for image file mapping
                    if(array_key_exists('product_listids', $paramJson)){
                        if($paramJson['product_listids']!=false && $paramJson['product_listids']!='' 
                            && $paramJson['product_listids']!=null){
                            $sql.=" AND splImg.product_listid IN (".$paramJson['product_listids'].") ";
                        } 
                    } 
            
            $sql.="  WHERE 1 ";
            
                // add shop store in where condition
                if(array_key_exists('shop_storesids', $paramJson)){
                    if($paramJson['shop_storesids']!=false && $paramJson['shop_storesids']!='' 
                        && $paramJson['shop_storesids']!=null){
                        $sql.=" AND ss.id IN (".$paramJson['shop_storesids'].") AND spa.shopstore_id IN (".$paramJson['shop_storesids'].") ";
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
                        $sql.=" AND spl.id IN (".$paramJson['product_listids'].") AND splld.product_listid IN (".$paramJson['product_listids'].") ";
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
                FROM DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg
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
    public static function getProductDescriptionDetails($productListId, $productFeatureId=''){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = "SELECT 
                COALESCE(ppd.id, '') productDescriptionId,
                COALESCE(ppd.product_listid, '') productListId,
                COALESCE(ppd.product_feature_id, '') productFeatureId,
                COALESCE(ppd.description_title, '') productDescriptionTitle,
                COALESCE(ppd.description_content, '') productDescription,
                COALESCE(ppd.content_file, '') productContentFile,
                COALESCE(ppd.content_filepath, '') productContentFilePath
                FROM DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_DESCRIPTIONDETAILS ppd
                WHERE 
                ppd.product_listid='$productListId'
                AND ppd.status='A' ";
                if($productFeatureId!=''){
                    $sqlFetchQuery.=" AND ppd.product_feature_id='$productFeatureId' ";
                }
            $command = $connection->createCommand($sqlFetchQuery);
            $retProductDescriptionDetailsArr = $command->queryAll();
            if(count($retProductDescriptionDetailsArr)>0 
                && $retProductDescriptionDetailsArr!=false){
                $retResult =  $retProductDescriptionDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getAvgRatingAboutProductDetails($shopStoreId, $productListId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COUNT(DISTINCT urd.group_no) totalUserRatingAbtProduct,
                COALESCE(
                    ROUND(((CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 THEN SUM(urd.given_answerpoints) ELSE 0 END)/5)/COUNT( DISTINCT urd.group_no), 1)
                , '') totalAvgRatingAbtProduct
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                WHERE 
                urd.status='A' AND urd.group_no IS NOT NULL AND qrd.status='A'
                AND urd.shopstore_id='$shopStoreId'
                AND urd.product_listid='$productListId' 
                HAVING COUNT(DISTINCT urd.group_no)>0 ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retAvgRatingProductDetailsArr = $command->queryAll();
            if($retAvgRatingProductDetailsArr!=false && count($retAvgRatingProductDetailsArr)>0){
                $retResult =  $retAvgRatingProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    
    // CJ defined this function 2016-06-06
    public static function getUserAvgRatingAboutProductDetails($shopStoreId, $productListId, $userId){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COALESCE(urd.shopstore_id, '') shopStoreId,
                COALESCE(urd.user_id,'') userId,
                COALESCE(urd.product_listid, '') productListId,
                COALESCE(urd.group_no, '') groupNo,
                (CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 THEN SUM(urd.given_answerpoints) ELSE 0 END) totalRatingByUser,
                COALESCE(
                    ROUND((CASE WHEN urd.answer_pattern='SELECT' AND urd.given_answerpoints>0 THEN SUM(urd.given_answerpoints) ELSE 0 END)/5, 1)
                , '') avgRatingByUser
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                WHERE 
                urd.status='A' AND qrd.status='A' AND urd.group_no IS NOT NULL 
                AND urd.shopstore_id='$shopStoreId'
                AND urd.user_id='$userId' 
                AND urd.product_listid='$productListId' 
                GROUP BY urd.group_no ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retUserAvgRatingAboutProductDetailsArr = $command->queryAll();
            if($retUserAvgRatingAboutProductDetailsArr!=false 
                && count($retUserAvgRatingAboutProductDetailsArr)>0){
                $retResult =  $retUserAvgRatingAboutProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-06-06
    public static function getUserReviewAndRatingAboutProductDetails($shopStoreId, $productListId, $userId, $groupNo){
        $retResult = false;
        try{
            $connection = Yii::app()->db;
            $sqlFetchQuery = " SELECT 
                COALESCE(urd.shopstore_id, '') shopStoreId,
                COALESCE(urd.user_id, '') userId,
                CONCAT(u.name, '') userName,
                COALESCE(urd.product_listid, '') productListId,
                COALESCE(urd.group_no, '') groupNo,
                COALESCE(qrd.question_title, '') questionTitle,
                COALESCE(qrd.max_points, '') maxPoints,
                COALESCE(qrd.question_answerpattern, '') answerPattern,
                COALESCE(urd.given_answertext, '') answerText
                FROM DK_USER_REVIEWANSWERDETAILS urd
                JOIN DK_REVIEWQESTIONSDETAILS qrd ON qrd.id=urd.question_id
                JOIN DK_USERS u ON u.id=urd.user_id
                WHERE 
                urd.status='A' AND qrd.status='A' AND urd.group_no IS NOT NULL 
                AND urd.shopstore_id='$shopStoreId'
                AND urd.product_listid='$productListId'
                AND urd.user_id='$userId'
                AND urd.group_no = '$groupNo' ";
            $command = $connection->createCommand($sqlFetchQuery);
            $retReviewedAboutProductDetailsArr = $command->queryAll();
            if($retReviewedAboutProductDetailsArr!=false 
                && count($retReviewedAboutProductDetailsArr)>0){
                $retResult =  $retReviewedAboutProductDetailsArr;
            }
        }catch(Exception $ex){}   
        return $retResult;
    }
    
    // CJ defined this function 2016-07-29
    public static function getUnMd5DataOfGivenProductDetails($paramJson=array()){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    ss.id shopStoreId,
                    spa.product_typeid productTypeId,
                    sppc.producttype_categoryid productTypeProductCategoryId,
                    sppl.id productListId,
                    spfd.id productFeatureId
                    FROM DK_SHOPSTORES ss 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.shoptstore_id=ss.id AND spa.status='A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc
                        ON sppc.shopstores_producttype_affiliationid=spa.id AND sppc.status='A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl
                        ON sppl.shopstores_producttype_affiliationid=spa.id
                        AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid
                        AND sppl.status='A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS spfd
                        ON spfd.product_listid=sppl.id AND spfd.status='A'
                    WHERE 1 AND ss.status='A'";
                    // add shopStoreId in where condition
                    if(array_key_exists('shopStoreId', $paramJson)){
                        if(strlen($paramJson['shopStoreId'])==32){
                            $sql.=" AND MD5(ss.id)='".$paramJson['shopStoreId']."' AND MD5(spa.shoptstore_id)='".$paramJson['shopStoreId']."'";
                        } 
                    } 
                    // add productTypeId in where condition
                    if(array_key_exists('productTypeId', $paramJson)){
                        if(strlen($paramJson['productTypeId'])==32){
                            $sql.=" AND MD5(spa.product_typeid)='".$paramJson['productTypeId']."'";
                        } 
                    } 
                    // add productTypeCategoryId in where condition
                    if(array_key_exists('productTypeCategoryId', $paramJson)){
                        if(strlen($paramJson['productTypeCategoryId'])==32){
                            $sql.=" AND MD5(sppc.producttype_categoryid)='".$paramJson['productTypeCategoryId']."'";
                        } 
                    } 
                    // add productListId in where condition
                    if(array_key_exists('productListId', $paramJson)){
                        if(strlen($paramJson['productListId'])==32){
                            $sql.=" AND MD5(sppl.id)='".$paramJson['productListId']."' AND MD5(spfd.product_listid)='".$paramJson['productListId']."'";
                        } 
                    } 
                    // add productFeatureId in where condition
                    if(array_key_exists('productFeatureId', $paramJson)){
                        if(strlen($paramJson['productFeatureId'])==32){
                            $sql.=" AND MD5(spfd.id)='".$paramJson['productFeatureId']."'";
                        } 
                    } 
            $command = $connection->createCommand($sql);
            $retDataArr = $command->queryAll();
            if(count($retDataArr)==1 && $retDataArr!=false){
                $retResult =  $retDataArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    
}
