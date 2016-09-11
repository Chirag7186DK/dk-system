<?php

/**
* Description of OrderCartDao
* @author chirag
*/

class OrderCartDao{
    
    // CJ defined this function 2016-08-09
    public static function generateMaxOrderCartId(){
        $maxOrdercardId = 0;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT COALESCE(MAX(uoc.id), 0) orderCartId
                FROM DK_ORDERCART uoc
                WHERE 1";
            $command = $connection->createCommand($sql);
            $ordercartDetailsArr = $command->queryAll();
            if(count($ordercartDetailsArr)==1 && $ordercartDetailsArr!=false){
                $maxOrdercardId =  $ordercartDetailsArr[0]['orderCartId'];    
            }
        }catch(Exception $ex){}
        return $maxOrdercardId;
    }
    
    // CJ defined this function 2016-07-26
    public static function getRequestedOrdercartIdUsingUserId($user_id){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT
                uoc.id ordercartId,
                COALESCE(uoc.order_cartid, '') humanReadableOrdercartId,
                COALESCE(uoc.user_id, '') orderedUserId,
                COALESCE(uoc.user_sessionid, '') userSessionId
                FROM DK_ORDERCART uoc
                WHERE 1 AND uoc.status='R' 
                AND uoc.order_cartid IS NOT NULL
                AND uoc.user_sessionid IS NOT NULL
                AND uoc.user_id='$user_id'
                GROUP BY uoc.user_id";
            $command = $connection->createCommand($sql);
            $ordercartDetailsArr = $command->queryAll();
            if(count($ordercartDetailsArr)==1 && $ordercartDetailsArr!=false){
                $result =  $ordercartDetailsArr[0];    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-08-06
    public static function addEntryInOrdercart($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('user_sessionid', $paramJson)){
            if($paramJson['user_sessionid']!=''){
                $sqlColumnNames.=" user_sessionid,";
                $sqlValues.="'".$paramJson['user_sessionid']."',";
            }
        }
        if(array_key_exists('user_id', $paramJson)){
            if($paramJson['user_id']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$paramJson['user_id']."',";
            }
        }
        if(array_key_exists('order_cartid', $paramJson)){
            if($paramJson['order_cartid']!=''){
                $sqlColumnNames.=" order_cartid,";
                $sqlValues.="'".$paramJson['order_cartid']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if(array_key_exists('created_datedtime', $paramJson)){
            if($paramJson['created_datedtime']!=''){
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$paramJson['created_datedtime']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_ORDERCART " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-09
    public static function updateUserIdInOrdercart($paramJson){
        $connection = Yii::app()->db;
        $dynamicSql = "";
        $retStatus = false;
        if(array_key_exists('user_id', $paramJson)){
            if($paramJson['user_id']!=''){
                $dynamicSql.=" user_id='".$paramJson['user_id']."',";
            }
        }
        if(array_key_exists('updated_by', $paramJson)){
            if($paramJson['updated_by']!=''){
                $dynamicSql.=" updated_by='".$paramJson['updated_by']."',";
            }
        }
        if($dynamicSql!=''){
            $sqlQuery = " UPDATE DK_ORDERCART SET ".rtrim($dynamicSql, ',');
            $sqlQuery.=" WHERE id='".$paramJson['id']."' AND order_cartid='".$paramJson['order_cartid']."'";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=0){
                $retStatus = true;
            }
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-08-06
    public static function updateEntryInOrdercart($paramJson){
        $connection = Yii::app()->db;
        $dynamicSql = "";
        $retStatus = false;
        if(array_key_exists('user_sessionid', $paramJson)){
            if($paramJson['user_sessionid']!=''){
                $dynamicSql.=" user_sessionid='".$paramJson['user_sessionid']."',";
            }
        }
        if(array_key_exists('updated_by', $paramJson)){
            if($paramJson['updated_by']!=''){
                $dynamicSql.=" updated_by='".$paramJson['updated_by']."',";
            }
        }
        if($dynamicSql!=''){
            $sqlQuery = " UPDATE DK_ORDERCART SET ".rtrim($dynamicSql, ',');
            $sqlQuery.=" WHERE id='".$paramJson['id']."'";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>0){
                $retStatus = true;
            }
        }
        return $retStatus;
    }
    
    
    // CJ defined this function 2016-09-09
    public static function getRequestedOrdercartStoreIdUsingOrdrcartIdStoreIdCCAId($ordercartId, $storeId, $ccaId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                odrs.id ordercartStoreId
                FROM DK_ORDERCARTSTORE odrs
                WHERE 
                odrs.ordercart_id='$ordercartId'
                AND odrs.store_id='$storeId'
                AND odrs.deliveryCountryCityAreaId='$ccaId'
                AND odrs.status='R'";
            $command = $connection->createCommand($sql);
            $ordercartStoreDetailsArr = $command->queryAll();
            if(count($ordercartStoreDetailsArr)==1 && $ordercartStoreDetailsArr!=false){
                $result =  $ordercartStoreDetailsArr[0]['ordercartStoreId'];    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-09-9
    public static function addEntryInOrdercartStore($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('ordercart_id', $paramJson)){
            if($paramJson['ordercart_id']!=''){
                $sqlColumnNames.=" ordercart_id,";
                $sqlValues.="'".$paramJson['ordercart_id']."',";
            }
        }
        if(array_key_exists('store_id', $paramJson)){
            if($paramJson['store_id']!=''){
                $sqlColumnNames.=" store_id,";
                $sqlValues.="'".$paramJson['store_id']."',";
            }
        }
        if(array_key_exists('ccaId', $paramJson)){
            if($paramJson['ccaId']!=''){
                $sqlColumnNames.=" deliveryCountryCityAreaId,";
                $sqlValues.="'".$paramJson['ccaId']."',";
            }
        }
        if(array_key_exists('address', $paramJson)){
            if($paramJson['address']!=''){
                $sqlColumnNames.=" address,";
                $sqlValues.="'".$paramJson['address']."',";
            }
        }
        if(array_key_exists('deliveryfee', $paramJson)){
            if($paramJson['deliveryfee']!=''){
                $sqlColumnNames.=" deliveryfee,";
                $sqlValues.="'".$paramJson['deliveryfee']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if(array_key_exists('created_datedtime', $paramJson)){
            if($paramJson['created_datedtime']!=''){
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$paramJson['created_datedtime']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_ORDERCARTSTORE " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-06
    public static function addProductInOrdercartStoreItemDetails($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('ordercart_storeid', $paramJson)){
            if($paramJson['ordercart_storeid']!=''){
                $sqlColumnNames.=" ordercart_storeid,";
                $sqlValues.="'".$paramJson['ordercart_storeid']."',";
            }
        }
        if(array_key_exists('featureid', $paramJson)){
            if($paramJson['featureid']!=''){
                $sqlColumnNames.=" featureid,";
                $sqlValues.="'".$paramJson['featureid']."',";
            }
        }
        if(array_key_exists('size', $paramJson)){
            if($paramJson['size']!=''){
                $sqlColumnNames.=" size,";
                $sqlValues.="'".$paramJson['size']."',";
            }
        }
        if(array_key_exists('price', $paramJson)){
            if($paramJson['price']!=''){
                $sqlColumnNames.=" price,";
                $sqlValues.="'".$paramJson['price']."',";
            }
        }
        if(array_key_exists('qty', $paramJson)){
            if($paramJson['qty']!=''){
                $sqlColumnNames.=" qty,";
                $sqlValues.="'".$paramJson['qty']."',";
            }
        }
        if(array_key_exists('totalamount', $paramJson)){
            if($paramJson['totalamount']!=''){
                $sqlColumnNames.=" totalamount,";
                $sqlValues.="'".$paramJson['totalamount']."',";
            }
        }
        if(array_key_exists('description', $paramJson)){
            if($paramJson['description']!=''){
                $sqlColumnNames.=" description,";
                $sqlValues.="'".$paramJson['description']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if(array_key_exists('created_datedtime', $paramJson)){
            if($paramJson['created_datedtime']!=''){
                $sqlColumnNames.=" created_datedtime,";
                $sqlValues.="'".$paramJson['created_datedtime']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO DK_ORDERCARTSTORE_ITEMDETAILS " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-08-12
    public static function getRequestedOrdercartSummary($userid){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                COALESCE(COUNT(DISTINCT odr.id), 0) ordercartCount,
                COALESCE(COUNT(DISTINCT odrsim.id), 0) ordercartItemRequestedCount,
                COALESCE(
                    COALESCE(SUM(odrsim.totalamount), 0) - COALESCE(SUM(odrs.deliveryfee), 0)
                ) subtotalOrderAmt
                FROM DK_ORDERCART odr
                JOIN DK_ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                JOIN DK_ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
                WHERE 
                odr.status='R' AND odrs.status='R' AND odrsim.status='R'
                AND odr.user_id='$userid'
                HAVING ordercartCount>0";
            $command = $connection->createCommand($sql);
            $ordercartSummaryCountDetailsArr = $command->queryAll();
            if(count($ordercartSummaryCountDetailsArr)==1 && $ordercartSummaryCountDetailsArr!=false){
                $result =  $ordercartSummaryCountDetailsArr[0];    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-09-11
    public static function getRequestedOrdercartStoreSummary($userid, $store_id, $ccaId){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                COALESCE(COUNT(DISTINCT odr.id), 0) ordercartCount,
                COALESCE(COUNT(DISTINCT odrsim.id), 0) ordercartItemRequestedCount,
                COALESCE(SUM(odrs.deliveryfee)) storeDeliveryFee,
                COALESCE(
                    COALESCE(SUM(odrsim.totalamount), 0) - COALESCE(SUM(odrs.deliveryfee), 0)
                ) subtotalOrderAmtIncludingDeliveryFee,
                COALESCE(SUM(odrsim.totalamount), 0) subtotalOrderAmtNotIncludingDeliveryFee
                FROM DK_ORDERCART odr
                JOIN DK_ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                JOIN DK_ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
                WHERE 1
                AND odr.user_id='$userid'
                AND odrs.store_id='$store_id'
                AND odrs.deliveryCountryCityAreaId='$ccaId'
                AND odr.status='R'
                AND odrs.status='R'
                AND odrsim.status='R'";
            $command = $connection->createCommand($sql);
            $ordercartStoreSummaryDataArr = $command->queryAll();
            if(count($ordercartStoreSummaryDataArr)==1 && $ordercartStoreSummaryDataArr!=false){
                $result =  $ordercartStoreSummaryDataArr[0];    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-08-14
    public static function getRequestedOrdercartItemDetails($userid){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    uoc.id ordercartId,
                    uocim.id ordercartItemId, 
                    COALESCE(ss.shopstore_name, '') shopStoreName,
                    COALESCE(pt.name, '') productType, COALESCE(sppl.name, '') productListTitle,
                    COALESCE(uocim.product_featuresize, '') itemMeasurementType,
                    COALESCE(uocim.product_featuresprice, 0) itemPerpriceIncart,
                    COALESCE(uocim.product_featuresqty, 0) itemQty,
                    COALESCE(uocim.product_features_totalamount, 0) itemTotalAmt,
                    COALESCE(uocim.product_description,'') itemDescriptionIncart,
                    COALESCE(sppfd.baseprice, '') productFeatureBasePrice,
                    COALESCE(sppfd.product_discount, '') productFeatureDiscount,
                    COALESCE(sppfd.storeprice, '') productFeatureStorPrice,
                    COALESCE(sppfd.online_sellprice, '') productFeatureOnlineSellingPrice
                    FROM DK_USERORDERCART uoc 
                    JOIN DK_USERORDERCART_ITEMDETAILS uocim ON uocim.order_cartid=uoc.id
                    JOIN DK_PRODUCTTYPE pt ON pt.id=uocim.product_typeid AND pt.status='A'
                    JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.id=uocim.product_categoryid 
                        AND ppc.status = 'A' AND pt.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.shoptstore_id=uocim.shopstore_id 
                        AND spa.status = 'A' 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
                        AND sppc.producttype_categoryid=ppc.id AND uocim.product_categoryid=sppc.producttype_categoryid 
                        AND sppc.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
                        AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.id=uocim.product_listid 
                        AND sppl.status = 'A'
                    JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id AND ss.id=uocim.shopstore_id AND ss.status = 'A' 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd 
                        ON sppfd.product_listid=sppl.id AND sppfd.id=uocim.product_featureid AND sppfd.status = 'A'
                    WHERE 
                    uoc.status='R'
                    AND uocim.status='R'
                    AND uoc.user_id='$userid'
                    ORDER BY uoc.updated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $ordercartAllItemDetailsArr = $command->queryAll();
            if(count($ordercartAllItemDetailsArr)>0 && $ordercartAllItemDetailsArr!=false){
                $result =  $ordercartAllItemDetailsArr;    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-08-15
    public static function getCancelledOrdercartItemDetails($userid){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    uoc.id ordercartId, uocim.id ordercartItemId, 
                    COALESCE(uoc.order_cartid, '') ordercartNo,
                    COALESCE(pt.id, '') productTypeId, COALESCE(pt.name, '') productTypeTitle, 
                    COALESCE(UPPER(pt.name), '') productTypeTitleInCaps, 
                    COALESCE(ppc.id, '') productTypeProductCategoryId, COALESCE(ppc.name, '')  productTypeProductCategoryTitle,
                    COALESCE(spa.shoptstore_id, '') shopStoreId, COALESCE(ss.shopstore_name, '') shopStoreTitle,
                    COALESCE(sppl.id, '') productListId, COALESCE(sppl.name, '') productListTitle,
                    COALESCE(sppfd.id, '') productFeatureId, 
                    COALESCE(sppfd.display_measurementtype, '') productFeatureDisplayMeasurementType,
                    COALESCE(sppfd.food_type, '') productFeatureFoodType, 
                    COALESCE(sppfd.taste_type, '') productFeatureTasteType, 
                    COALESCE(sppfd.pattern_type, '') productFeaturePatternType, 
                    COALESCE(sppfd.order_opentime, '') productFeatureOrderOpenTime, 
                    COALESCE(sppfd.order_closetime, '') productFeatureOrderOpenTime, 
                    COALESCE(sppfd.baseprice, '') productFeatureBasePrice,
                    COALESCE(sppfd.product_discount, '') productFeatureDiscount,
                    COALESCE(sppfd.online_sellprice, '') productFeatureOnlineSellingPrice,
                    COALESCE(ppimg.is_showcasefile, 'N') isProductImageFileShowCase,
                    COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
                    COALESCE(ppimg.file_path, 'images/') productImageFilePath,
                    COALESCE(uocim.product_featuresize, '') itemMeasurementType,
                    COALESCE(uocim.product_featuresprice, 0) itemPerpriceIncart,
                    COALESCE(uocim.product_featuresqty, 0) itemQty,
                    COALESCE(uocim.product_features_totalamount, 0) itemTotalAmt,
                    COALESCE(uocim.product_description,'') itemDescriptionIncart,
                    'N' isCancelledItemAvailable
                    FROM DK_USERORDERCART uoc 
                    JOIN DK_USERORDERCART_ITEMDETAILS uocim ON uocim.order_cartid=uoc.id
                    JOIN DK_PRODUCTTYPE pt ON pt.id=uocim.product_typeid
                    JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.id=uocim.product_categoryid 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.shoptstore_id=uocim.shopstore_id 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
                        AND sppc.producttype_categoryid=ppc.id AND uocim.product_categoryid=sppc.producttype_categoryid 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
                        AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.id=uocim.product_listid 
                    JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id AND ss.id=uocim.shopstore_id
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd 
                        ON sppfd.product_listid=sppl.id AND sppfd.id=uocim.product_featureid
                    LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
                        ON ppimg.product_listid=sppl.id
                        AND ppimg.is_showcasefile = 'Y'    
                    WHERE 1
                    AND (uoc.status='ZC' OR uoc.status='ZA' OR uoc.status='R')
                    AND (uocim.status='ZC' OR uocim.status='ZA')
                    AND uoc.user_id='$userid'
                    ORDER BY uoc.order_cartid ASC, uoc.updated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $ordercartAllItemDetailsArr = $command->queryAll();
            if(count($ordercartAllItemDetailsArr)>0 && $ordercartAllItemDetailsArr!=false){
                $result =  $ordercartAllItemDetailsArr;    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    // CJ defined this function 2016-08-21
    public static function getAllOrderedOrdercartItemDetails($userid){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    uoc.id ordercartId, uocim.id ordercartItemId, 
                    COALESCE(uoc.order_cartid, '') ordercartNo,
                    COALESCE(pt.id, '') productTypeId, COALESCE(pt.name, '') productTypeTitle, 
                    COALESCE(UPPER(pt.name), '') productTypeTitleInCaps, 
                    COALESCE(ppc.id, '') productTypeProductCategoryId, COALESCE(ppc.name, '')  productTypeProductCategoryTitle,
                    COALESCE(spa.shoptstore_id, '') shopStoreId, COALESCE(ss.shopstore_name, '') shopStoreTitle,
                    COALESCE(sppl.id, '') productListId, COALESCE(sppl.name, '') productListTitle,
                    COALESCE(sppfd.id, '') productFeatureId, 
                    COALESCE(sppfd.display_measurementtype, '') productFeatureDisplayMeasurementType,
                    COALESCE(sppfd.food_type, '') productFeatureFoodType, 
                    COALESCE(sppfd.taste_type, '') productFeatureTasteType, 
                    COALESCE(sppfd.pattern_type, '') productFeaturePatternType, 
                    COALESCE(sppfd.order_opentime, '') productFeatureOrderOpenTime, 
                    COALESCE(sppfd.order_closetime, '') productFeatureOrderOpenTime, 
                    COALESCE(sppfd.baseprice, '') productFeatureBasePrice,
                    COALESCE(sppfd.product_discount, '') productFeatureDiscount,
                    COALESCE(sppfd.online_sellprice, '') productFeatureOnlineSellingPrice,
                    COALESCE(ppimg.is_showcasefile, 'N') isProductImageFileShowCase,
                    COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
                    COALESCE(ppimg.file_path, 'images/') productImageFilePath,
                    COALESCE(uocim.product_featuresize, '') itemMeasurementType,
                    COALESCE(uocim.product_featuresprice, 0) itemPerpriceIncart,
                    COALESCE(uocim.product_featuresqty, 0) itemQty,
                    COALESCE(uocim.product_features_totalamount, 0) itemTotalAmt,
                    COALESCE(uocim.product_description,'') itemDescriptionIncart,
                    (CASE 
                        WHEN uocim.status='O' THEN 'Ordered'
                        WHEN uocim.status='P' THEN 'Processing'
                        WHEN uocim.status='W' THEN 'On the Way'
                        WHEN uocim.status='D' THEN 'Delivered'
                        WHEN uocim.status='PF' THEN 'Payment Failed'
                        ELSE 'Call customer care to know status'
                    END) orderedItemStatus,
                    'N' isOrderedItemAvailable
                    FROM DK_USERORDERCART uoc 
                    JOIN DK_USERORDERCART_ITEMDETAILS uocim ON uocim.order_cartid=uoc.id
                    JOIN DK_PRODUCTTYPE pt ON pt.id=uocim.product_typeid
                    JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.id=uocim.product_categoryid 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.shoptstore_id=uocim.shopstore_id 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
                        AND sppc.producttype_categoryid=ppc.id AND uocim.product_categoryid=sppc.producttype_categoryid 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
                        AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.id=uocim.product_listid 
                    JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id AND ss.id=uocim.shopstore_id
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd 
                        ON sppfd.product_listid=sppl.id AND sppfd.id=uocim.product_featureid
                    LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
                        ON ppimg.product_listid=sppl.id
                        AND ppimg.is_showcasefile = 'Y'    
                    WHERE 1
                    AND (
                        uocim.status='O' OR uocim.status='P' OR uocim.status='W'
                        OR uocim.status='D' OR uocim.status='PF'
                    )
                    AND (uoc.status='R' OR uoc.status='A')
                    AND uoc.user_id='$userid'
                    ORDER BY uoc.order_cartid ASC, uoc.updated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $ordercartAllItemDetailsArr = $command->queryAll();
            if(count($ordercartAllItemDetailsArr)>0 && $ordercartAllItemDetailsArr!=false){
                $result =  $ordercartAllItemDetailsArr;    
            }
        }catch(Exception $ex){}
        return $result;
    }
    
    
    // CJ defined this function 2016-08-26
    public static function updateItemInOrdercart($paramJson){
        $connection = Yii::app()->db;
        $dynamicSql = "";
        $retStatus = false;
        if(array_key_exists('product_featuresqty', $paramJson)){
            if($paramJson['product_featuresqty']!='' && ($paramJson['product_featuresqty'])>0){
                $dynamicSql.=" product_featuresqty='".$paramJson['product_featuresqty']."',";
            }
        }
        if(array_key_exists('product_features_totalamount', $paramJson)){
            if($paramJson['product_features_totalamount']!='' && ($paramJson['product_features_totalamount'])>0){
                $dynamicSql.=" product_features_totalamount='".$paramJson['product_features_totalamount']."',";
            }
        }
        if(array_key_exists('status', $paramJson)){
            if($paramJson['status']!='' && strlen($paramJson['status'])>=1){
                $dynamicSql.=" status='".$paramJson['status']."',";
            }
        }
        if(array_key_exists('reason', $paramJson)){
            if($paramJson['reason']!='' && ($paramJson['reason'])>0){
                $dynamicSql.=" reason='".$paramJson['reason']."',";
            }
        }
        if(array_key_exists('updated_by', $paramJson)){
            if($paramJson['updated_by']!='' && ($paramJson['updated_by'])>0){
                $dynamicSql.=" updated_by='".$paramJson['updated_by']."',";
            }
        }
        if($dynamicSql!='' && array_key_exists('ordercart_itemid', $paramJson)==true){
            if($paramJson['ordercart_itemid']!='' && ($paramJson['ordercart_itemid'])>0){
                $sqlQuery = " UPDATE DK_USERORDERCART_ITEMDETAILS SET ".rtrim($dynamicSql, ',');
                $sqlQuery.=" WHERE id='".$paramJson['ordercart_itemid']."'";
                $command = $connection->createCommand($sqlQuery);
                $result = $command->execute();
                if($result>=0){
                    $retStatus = true;
                }
            }
        }
        return $retStatus;
    }
    
    // CJ defined this function 2016-09-05
    public static function resetAllItemOrdercart(){
        $retStatus = 'FALSE';
        try{
            $connection = Yii::App()->db;
            $sql= "";
            $command = $connection->createCommand($sql);
            $result = $command->execute();
            if($result>=0){
                $retStatus = 'TRUE';
            }
        }catch(Exception $ex){}
        return $retStatus;
    }
    
}
