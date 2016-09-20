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
                FROM ORDERCART uoc
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
                FROM ORDERCART uoc
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
            $sqlQuery = " INSERT INTO ORDERCART " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
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
            $sqlQuery = " UPDATE ORDERCART SET ".rtrim($dynamicSql, ',');
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
            $sqlQuery = " UPDATE ORDERCART SET ".rtrim($dynamicSql, ',');
            $sqlQuery.=" WHERE id='".$paramJson['id']."'";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>0){
                $retStatus = true;
            }
        }
        return $retStatus;
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
        if(array_key_exists('delivery_areaname', $paramJson)){
            if($paramJson['delivery_areaname']!=''){
                $sqlColumnNames.=" delivery_areaname,";
                $sqlValues.="'".$paramJson['delivery_areaname']."',";
            }
        }
        if(array_key_exists('min_orderamt', $paramJson)){
            $sqlColumnNames.=" min_orderamt,";
            $sqlValues.="'".$paramJson['min_orderamt']."',";
        }
        if(array_key_exists('deliveryfee', $paramJson)){
            $sqlColumnNames.=" deliveryfee,";
            $sqlValues.="'".$paramJson['deliveryfee']."',";
        }
        if(array_key_exists('apply_deliveryfee', $paramJson)){
            $sqlColumnNames.=" apply_deliveryfee,";
            $sqlValues.="'".$paramJson['apply_deliveryfee']."',";
        }
        if(array_key_exists('discountamount', $paramJson)){
            $sqlColumnNames.=" discountamount,";
            $sqlValues.="'".$paramJson['discountamount']."',";
        }
        if(array_key_exists('subtotalamount', $paramJson)){
            $sqlColumnNames.=" subtotalamount,";
            $sqlValues.="'".$paramJson['subtotalamount']."',";
        }
        if(array_key_exists('totalamount', $paramJson)){
            $sqlColumnNames.=" totalamount,";
            $sqlValues.="'".$paramJson['totalamount']."',";
        }
        if(array_key_exists('address', $paramJson)){
            if($paramJson['address']!=''){
                $sqlColumnNames.=" address,";
                $sqlValues.="'".$paramJson['address']."',";
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
            $sqlQuery = " INSERT INTO ORDERCARTSTORE " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-09-11
    public static function updateEntryInOrdercartStore($paramJson){
        $connection = Yii::app()->db;
        $dynamicSql = "";
        $retStatus = false;
        if(array_key_exists('deliveryfee', $paramJson)){
            $dynamicSql.=" deliveryfee='".$paramJson['deliveryfee']."',";
        }
        if(array_key_exists('subtotalamount', $paramJson)){
            $dynamicSql.=" subtotalamount='".$paramJson['subtotalamount']."',";
        }
        if(array_key_exists('apply_deliveryfee', $paramJson)){
            $dynamicSql.=" apply_deliveryfee='".$paramJson['apply_deliveryfee']."',";
        }
        if(array_key_exists('discountamount', $paramJson)){
            $dynamicSql.=" discountamount='".$paramJson['discountamount']."',";
        }
        if(array_key_exists('totalamount', $paramJson)){
            $dynamicSql.=" totalamount='".$paramJson['totalamount']."',";
        }
        if(array_key_exists('address', $paramJson)){
            if($paramJson['address']!='' && strlen($paramJson['address'])>0){
                $dynamicSql.=" address='".$paramJson['address']."',";
            }
        }
        if(array_key_exists('deliverydate', $paramJson)){
            if($paramJson['deliverydate']!=''){
                $dynamicSql.=" deliverydate='".$paramJson['deliverydate']."',";
            }
        }
        if(array_key_exists('updated_by', $paramJson)){
            if($paramJson['updated_by']!=''){
                $dynamicSql.=" updated_by='".$paramJson['updated_by']."',";
            }
        }
        if(array_key_exists('status', $paramJson)){
            if($paramJson['status']!=''){
                $dynamicSql.=" status='".$paramJson['status']."',";
            }
        }
        if(array_key_exists('reason', $paramJson)){
            if($paramJson['reason']!='' && strlen($paramJson['reason'])>0){
                $dynamicSql.=" reason='".$paramJson['reason']."',";
            }
        }
        if($dynamicSql!=''){
            $sqlQuery = " UPDATE ORDERCARTSTORE SET ".rtrim($dynamicSql, ',');
            $sqlQuery.=" WHERE id='".$paramJson['id']."'";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>0){
                $retStatus = true;
            }
        }
        return $retStatus;
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
            $sqlQuery = " INSERT INTO ORDERCARTSTORE_ITEMDETAILS " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
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
                COALESCE(COUNT(DISTINCT odrs.id), 0) totalStores,
                COALESCE(COUNT(DISTINCT odrsim.id), 0) ordercartItemRequestedCount,
                COALESCE(SUM(odrs.subtotalamount), 0) subtotalOrderAmt,
                COALESCE(SUM(odrs.apply_deliveryfee), 0) totalDeliveryFee,
                COALESCE(SUM(odrs.totalamount), 0) totalOrderAmt
                FROM ORDERCART odr
                JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                JOIN ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
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
    public static function getRequestedOrdercartStoreSummary($userid, $store_id, $ccaId, $ordercartId='', $ordercartStoreId=''){
        $result = false;
        try{
            $connection = Yii::App()->db;
            $sql= "SELECT
                COALESCE(odrs.id, '') ordercartStoreId,
                COALESCE(COUNT(DISTINCT odr.id), 0) ordercartCount,
                COALESCE(COUNT(DISTINCT odrsim.id), 0) ordercartItemRequestedCount,
                COALESCE(SUM(odrs.apply_deliveryfee), 0) storeDeliveryFee,
                COALESCE(
                    COALESCE(SUM(odrsim.totalamount), 0) - COALESCE(SUM(odrs.apply_deliveryfee), 0)
                ) subtotalOrderAmtIncludingDeliveryFee,
                COALESCE(SUM(odrsim.totalamount), 0) subtotalOrderAmtNotIncludingDeliveryFee
                FROM ORDERCART odr
                JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                LEFT JOIN ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id AND odrsim.status='R' 
                WHERE 1
                AND odr.user_id='$userid'
                AND odrs.store_id='$store_id'
                AND odrs.deliveryCountryCityAreaId='$ccaId'
                AND odr.status='R'
                AND odrs.status='R'";
                if($ordercartId!='' && $ordercartId>0){
                    $sql.=" AND odr.id='$ordercartId'";
                }
                if($ordercartStoreId!='' && $ordercartStoreId>0){
                    $sql.=" AND odrs.id='$ordercartStoreId'";
                }
            $sql.=" HAVING ordercartCount>0";
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
                    odr.id ordercartId, odr.user_sessionid userSessionId, odr.user_id userId,
                    odrs.id ordercartStoreId, odrs.store_id storeId, COALESCE(ss.name, '') shopStoreTitle,
                    COALESCE(a.name, '') storeLocatedAreaName, COALESCE(odrs.min_orderamt, '0') storeMinOrderAmt, COALESCE(odrs.deliveryfee, '0') deliveryfee,
                    COALESCE(odrs.apply_deliveryFee, '0') apply_deliveryFee,
                    odrs.deliveryCountryCityAreaId, COALESCE(odrs.delivery_areaname, '') delivery_areaname,
                    COALESCE(odrs.address, '') deliveryAddress, COALESCE(odrs.deliverydate, '') deliverydate,
                    COALESCE(odrs.discountamount, '') discountamount,
                    COALESCE(odrs.subtotalamount, '') subtotalamount, COALESCE(odrs.totalamount, '') totalamount,
                    COALESCE(odrsim.id, '') orderStoreItemId, COALESCE(spl.name, '') productListTitle, 
                    COALESCE(odrsim.featureid, '') featureId, COALESCE(odrsim.size, '') productSize, 
                    COALESCE(odrsim.price, '') productPrice, COALESCE(odrsim.qty, '0') productQty, 
                    COALESCE(odrsim.totalamount, '') productTotalAmt, COALESCE(odrsim.description, '') description,
                    COALESCE(splld.baseprice, '') productFeatureBasePrice, 
                    COALESCE(splld.product_discount, '') productFeatureDiscount
                    FROM ORDERCART odr
                    JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                    JOIN ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
                    JOIN STORE_PRODUCTLIST_LOGDETAILS splld ON splld.id=odrsim.featureid AND splld.status='A'
                    JOIN STORE_PRODUCTLIST spl ON spl.id=splld.productlist_id AND spl.status='A'
                    JOIN STORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.id=spl.store_ptpc_affiliationid AND spac.status='A'
                    JOIN STORE_PRODUCTTYPE_AFFILIATION spa ON spa.store_id=odrs.store_id
                        AND spa.id=spac.store_producttype_affiliationid AND spa.status='A'
                    JOIN STORE ss ON ss.id=odrs.store_id AND spa.store_id=ss.id AND ss.status='A'
                    JOIN COUNTRYCITYAREAAFFILIATION cca ON cca.id=ss.country_city_area_affiliationId AND cca.status='A'
                    JOIN CITYREACHED c ON c.id=cca.city_id AND c.status='A' 
                    JOIN AREAREACHED a ON a.id=cca.area_id AND a.status='A'
                    WHERE 1
                    AND odr.user_id='$userid'
                    AND odr.status='R'
                    AND odrs.status='R'
                    AND odrsim.status='R'
                    ORDER BY odrsim.updated_by DESC, odrs.store_id ASC";
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
            $sql= "SELECT 
                odr.id ordercartId, odr.order_cartid humanReadableOrdercartId,
                odrs.store_id storeId, COALESCE(ss.name, '') shopStoreTitle,
                COALESCE(a.name, '') storeLocatedAreaName,
                odrs.deliveryCountryCityAreaId, COALESCE(odrs.delivery_areaname, '') delivery_areaname,
                COALESCE(odrs.address, '') deliveryAddress,
                COALESCE(spl.name, '') productListTitle, 
                COALESCE(odrsim.featureid, '') featureId, COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
                COALESCE(odrsim.size, '') size, 
                COALESCE(odrsim.price, '') price, COALESCE(odrsim.qty, '0') qty, 
                COALESCE(odrsim.totalamount, '') totalamount, COALESCE(odrsim.description, '') description,
                COALESCE(odrsim.reason, '') ordercartStoreItemReason
                FROM ORDERCART odr
                JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                JOIN ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
                JOIN STORE_PRODUCTLIST_LOGDETAILS splld ON splld.id=odrsim.featureid
                JOIN STORE_PRODUCTLIST spl ON spl.id=splld.productlist_id
                JOIN STORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.id=spl.store_ptpc_affiliationid
                JOIN STORE_PRODUCTTYPE_AFFILIATION spa ON spa.store_id=odrs.store_id
                    AND spa.id=spac.store_producttype_affiliationid
                LEFT JOIN STORE_PRODUCTLIST_IMAGEFILEMAPPING ppimg ON ppimg.product_listid=spl.id AND ppimg.is_showcasefile='Y'
                JOIN STORE ss ON ss.id=odrs.store_id AND spa.store_id=ss.id
                JOIN COUNTRYCITYAREAAFFILIATION cca ON cca.id=ss.country_city_area_affiliationId
                JOIN CITYREACHED c ON c.id=cca.city_id
                JOIN AREAREACHED a ON a.id=cca.area_id
                WHERE 1
                AND odr.user_id='$userid'
                AND (odrs.status='ZC' || odrs.status='ZA')
                AND (odrsim.status='ZC' || odrsim.status='ZA')
                ORDER BY odrsim.updated_by DESC, odrs.store_id ASC";
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
            $sql= "SELECT 
                    odr.id ordercartId, odr.order_cartid humanReadableOrdercartId,
                    odrs.store_id storeId, COALESCE(ss.name, '') shopStoreTitle,
                    COALESCE(a.name, '') storeLocatedAreaName,
                    odrs.deliveryCountryCityAreaId, COALESCE(odrs.delivery_areaname, '') delivery_areaname,
                    COALESCE(odrs.address, '') deliveryAddress,
                    COALESCE(spl.name, '') productListTitle, 
                    COALESCE(odrsim.featureid, '') featureId, COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
                    COALESCE(odrsim.size, '') size, 
                    COALESCE(odrsim.price, '') price, COALESCE(odrsim.qty, '0') qty, 
                    COALESCE(odrsim.totalamount, '') totalamount, COALESCE(odrsim.description, '') description,
                    COALESCE(odrs.apply_deliveryFee, '0') apply_deliveryFee, COALESCE(odrs.subtotalamount, '') subtotalamount, 
                    COALESCE(odrs.discountamount, '') discountamount, COALESCE(odrs.totalamount, '') totalamount,
                    (CASE 
                        WHEN odrs.status='O' THEN 'Ordered'
                        WHEN odrs.status='PR' THEN 'Under Processing'
                        WHEN odrs.status='W' THEN 'On the Way'
                        WHEN odrs.status='D' THEN 'Delivered'
                        WHEN odrs.status='PF' THEN 'Payment Failed'
                        ELSE 'Call customer care to know status'
                    END) ordercartStoreStatus,
                    (CASE 
                        WHEN odrsim.status='O' THEN 'Ordered'
                        WHEN odrsim.status='PR' THEN 'Under Processing'
                        WHEN odrsim.status='W' THEN 'On the Way'
                        WHEN odrsim.status='D' THEN 'Delivered'
                        WHEN odrsim.status='PF' THEN 'Payment Failed'
                        ELSE 'Call customer care to know status'
                    END) ordercartStoreItemStatus,
                    COALESCE(odrsim.reason, '') ordercartStoreItemReason
                    FROM ORDERCART odr
                    JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
                    JOIN ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
                    JOIN STORE_PRODUCTLIST_LOGDETAILS splld ON splld.id=odrsim.featureid
                    JOIN STORE_PRODUCTLIST spl ON spl.id=splld.productlist_id
                    JOIN STORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.id=spl.store_ptpc_affiliationid
                    JOIN STORE_PRODUCTTYPE_AFFILIATION spa ON spa.store_id=odrs.store_id
                        AND spa.id=spac.store_producttype_affiliationid
                    LEFT JOIN STORE_PRODUCTLIST_IMAGEFILEMAPPING ppimg ON ppimg.product_listid=spl.id AND ppimg.is_showcasefile='Y'
                    JOIN STORE ss ON ss.id=odrs.store_id AND spa.store_id=ss.id
                    JOIN COUNTRYCITYAREAAFFILIATION cca ON cca.id=ss.country_city_area_affiliationId
                    JOIN CITYREACHED c ON c.id=cca.city_id
                    JOIN AREAREACHED a ON a.id=cca.area_id
                    WHERE 1
                    AND odr.user_id='$userid'
                    AND (odrs.status='O' || odrs.status='PR' || odrs.status='PF' || odrs.status='W' || odrs.status='D')
                    AND (odrsim.status='O' || odrsim.status='PR' || odrsim.status='PF' || odrsim.status='W' || odrsim.status='D')
                    ORDER BY odrsim.updated_by DESC, odrs.store_id ASC";
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
        if(array_key_exists('qty', $paramJson)){
            if($paramJson['qty']!='' && ($paramJson['qty'])>0){
                $dynamicSql.=" qty='".$paramJson['qty']."',";
            }
        }
        if(array_key_exists('totalamount', $paramJson)){
            if($paramJson['totalamount']!='' && ($paramJson['totalamount'])>0){
                $dynamicSql.=" totalamount='".$paramJson['totalamount']."',";
            }
        }
        if(array_key_exists('status', $paramJson)){
            if($paramJson['status']!='' && strlen($paramJson['status'])>=1){
                $dynamicSql.=" status='".$paramJson['status']."',";
            }
        }
        if(array_key_exists('reason', $paramJson)){
            if($paramJson['reason']!='' && strlen($paramJson['reason'])>0){
                $dynamicSql.=" reason='".$paramJson['reason']."',";
            }
        }
        if(array_key_exists('updated_by', $paramJson)){
            if($paramJson['updated_by']!='' && ($paramJson['updated_by'])>0){
                $dynamicSql.=" updated_by='".$paramJson['updated_by']."',";
            }
        }
        if($dynamicSql!='' && array_key_exists('orderStoreItemId', $paramJson)==true){
            if($paramJson['orderStoreItemId']!='' && ($paramJson['orderStoreItemId'])>0){
                $sqlQuery = " UPDATE ORDERCARTSTORE_ITEMDETAILS SET ".rtrim($dynamicSql, ',');
                $sqlQuery.=" WHERE id='".$paramJson['orderStoreItemId']."'";
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
