<?php

/**
* Description of WishListDao
* @author chirag
*/

class WishListDao{
    
    // CJ defined this function 2016-07-30
    public static function createUserWL($paramJson){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('userProfileTypeId', $paramJson)){
            if($paramJson['userProfileTypeId']!=''){
                $sqlColumnNames.=" profile_id,";
                $sqlValues.="'".$paramJson['userProfileTypeId']."',";
            }
        }
        if(array_key_exists('userLoggedId', $paramJson)){
            if($paramJson['userLoggedId']!=''){
                $sqlColumnNames.=" user_id,";
                $sqlValues.="'".$paramJson['userLoggedId']."',";
            }
        }
        if(array_key_exists('title', $paramJson)){
            if($paramJson['title']!=''){
                $sqlColumnNames.=" title,";
                $sqlValues.="'".$paramJson['title']."',";
            }
        }
        if(array_key_exists('is_publicly', $paramJson)){
            if($paramJson['is_publicly']!=''){
                $sqlColumnNames.=" is_publicly,";
                $sqlValues.="'".$paramJson['is_publicly']."',";
            }
        }
        if(array_key_exists('is_defaultsetting', $paramJson)){
            if($paramJson['is_defaultsetting']!=''){
                $sqlColumnNames.=" is_defaultsetting,";
                $sqlValues.="'".$paramJson['is_defaultsetting']."',";
            }
        }
        if(array_key_exists('created_by', $paramJson)){
            if($paramJson['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$paramJson['created_by']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $paramJson['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$paramJson['created_datedtime']."',";
            $sqlQuery = " INSERT INTO DK_WISHLIST " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-07-26
    public static function getUserWLDetails($paramJson=array()){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    wl.id unMd5WLId, 
                    MD5(wl.id) wlId,
                    MD5(wl.user_id) userId,
                    wl.user_id unMd5UserId, 
                    COALESCE(wl.title, '') wlTitle,
                    COALESCE(wl.is_publicly, 'N') isWLPublicly,
                    COALESCE(wl.is_defaultsetting, 'N') isDefaultWLSetting
                    FROM DK_USERS u
                    JOIN DK_USERSPROFILE up ON up.id=u.profile_typeid AND up.status='A'
                    JOIN DK_WISHLIST wl ON wl.user_id=u.id 
                        AND wl.profile_id=u.profile_typeid AND wl.status='A'";  
                    // add userLoggedId in where condition
                    if(array_key_exists('userLoggedId', $paramJson)){
                        if(($paramJson['userLoggedId'])>0 && $paramJson['userLoggedId']!=''){
                            $sql.=" AND wl.user_id='".$paramJson['userLoggedId']."' AND u.id='".$paramJson['userLoggedId']."'";
                        } 
                    } 
                    // add user_id in where condition
                    if(array_key_exists('user_id', $paramJson)){
                        if($paramJson['user_id']!='' && $paramJson['user_id']!=false){
                            $sql.=" AND wl.user_id='".$paramJson['user_id']."' AND u.id='".$paramJson['user_id']."'";
                        } 
                    } 
                    // add userProfileTypeId in where condition
                    if(array_key_exists('userProfileTypeId', $paramJson)){
                        if($paramJson['userProfileTypeId']!='' && ($paramJson['userProfileTypeId'])>0){
                            $sql.=" AND wl.profile_id='".$paramJson['userProfileTypeId']."' AND u.profile_typeid='".$paramJson['userProfileTypeId']."'";
                        } 
                    } 
                    // add wishListId in where condition
                    if(array_key_exists('wishListId', $paramJson)){
                        if($paramJson['wishListId']!='' && ($paramJson['wishListId'])>0){
                            $sql.=" AND wl.id='".$paramJson['wishListId']."'";
                        } 
                    } 
            $sql.=" ORDER BY wl.updated_datedtime DESC, COALESCE(wl.is_defaultsetting, 'N') ";
            $command = $connection->createCommand($sql);
            $retUserWishListDetailsArr = $command->queryAll();
            if(count($retUserWishListDetailsArr)>0 && $retUserWishListDetailsArr!=false){
                $retResult =  $retUserWishListDetailsArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    
    // CJ defined this function 2016-07-26
    public static function getUWLCount($paramJson=array()){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    COUNT(DISTINCT wl.id) wlCount,
                    COUNT(DISTINCT wlm.id) wlmCount
                    FROM DK_WISHLIST wl
                    JOIN DK_WISHLISTITEM wlm ON wlm.wishlist_id=wl.id AND wlm.status='A'
                    JOIN DK_USERS u ON u.id=wl.user_id AND u.status='A'
                    JOIN DK_PRODUCTTYPE pt ON pt.id=wlm.product_typeid AND pt.status='A'
                    JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND pt.status = 'A'
                        AND ppc.id=wlm.product_categoryid AND ppc.status = 'A' 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  
                        AND spa.product_typeid=wlm.product_typeid AND spa.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
                        AND sppc.producttype_categoryid=ppc.id  AND sppc.producttype_categoryid=wlm.product_categoryid
                        AND sppc.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
                        AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid 
                        AND sppl.id=wlm.product_listid AND sppl.status = 'A'
                    JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id  AND ss.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd ON sppfd.product_listid=sppl.id
                        AND sppfd.id=wlm.product_featureid AND sppfd.status = 'A'
                    LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
                        ON ppimg.product_listid=sppl.id AND ppimg.status = 'A' 
                        AND ppimg.is_showcasefile = 'Y'
                    JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
                    JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
                    JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
                    JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
                    WHERE 1 ";  
                    // add userLoggedId in where condition
                    if(array_key_exists('userLoggedId', $paramJson)){
                        if($paramJson['userLoggedId']!='' && $paramJson['userLoggedId']!=false){
                            $sql.=" AND u.id='".$paramJson['user_id']."' AND wl.user_id='".$paramJson['user_id']."'";
                        } 
                    } 
                    // add user_id in where condition
                    if(array_key_exists('user_id', $paramJson)){
                        if($paramJson['user_id']!='' && $paramJson['user_id']!=false){
                            $sql.=" AND u.id='".$paramJson['user_id']."' AND wl.user_id='".$paramJson['user_id']."'";
                        } 
                    } 
                    // add userProfileTypeId in where condition
                    if(array_key_exists('userProfileTypeId', $paramJson)){
                        if($paramJson['userProfileTypeId']!='' && ($paramJson['userProfileTypeId'])>0){
                            $sql.=" AND u.profile_typeid='".$paramJson['userProfileTypeId']."'";
                        } 
                    } 
            $sql.=" HAVING wlCount>0 AND wlmCount>0";        
            $command = $connection->createCommand($sql);
            $retWishListCountArr = $command->queryAll();
            if(count($retWishListCountArr)>0 && $retWishListCountArr!=false){
                $retResult =  $retWishListCountArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-07-26
    public static function getUserAllWLWiseItemDetails($paramJson=array()){
        $retResult = false;
        try{
            $connection = Yii::App()->db;
            $sql= " SELECT 
                    u.id createrUserId, UPPER(CONCAT(u.name)) userName,
                    COALESCE(u.state, '') userState, COALESCE(u.city, '') userCity,
                    wl.id wishListId, COALESCE(wl.title, '') wishListTitle,
                    wlm.id wishListItemId,
                    DATE_FORMAT(wlm.updated_datedtime, '%b %D %a, %Y') productAddedDatedtime,
                    COALESCE(ss.id, '') shopStoreId, ss.shopstore_name shopStoreTitle,
                    COALESCE(wlm.product_typeid, '') productTypeId,
                    COALESCE(wlm.product_categoryid, '') productTypeProductCategoryId, 
                    COALESCE(sppl.name, '') productListTitle, COALESCE(wlm.product_listid,'') productListId,
                    COALESCE(wlm.product_featureid, '') productFeatureId,
                    COALESCE(sppfd.display_measurementtype, '') productFeatureDisplayMeasurementType,
                    COALESCE(sppfd.food_type, '') productFeatureFoodType, 
                    COALESCE(sppfd.taste_type, '') productFeatureTasteType, 
                    COALESCE(sppfd.pattern_type, '') productFeaturePatternType, 
                    COALESCE(sppfd.order_opentime, '') productFeatureOrderOpenTime, 
                    COALESCE(sppfd.order_closetime, '') productFeatureOrderOpenTime, 
                    COALESCE(sppfd.baseprice, '') productFeatureBasePrice,
                    COALESCE(sppfd.product_discount, '') productFeatureDiscount,
                    COALESCE(sppfd.storeprice, '') productFeatureStorPrice,
                    COALESCE(sppfd.online_sellprice, '') productFeatureOnlineSellingPrice,
                    COALESCE(ppimg.is_showcasefile, 'N') isProductImageFileShowCase,
                    COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
                    COALESCE(ppimg.file_path, 'images/') productImageFilePath
                    FROM DK_WISHLIST wl
                    JOIN DK_WISHLISTITEM wlm ON wlm.wishlist_id=wl.id AND wlm.status='A'
                    JOIN DK_USERS u ON u.id=wl.user_id AND u.status='A'
                    JOIN DK_PRODUCTTYPE pt ON pt.id=wlm.product_typeid AND pt.status='A'
                    JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND pt.status = 'A'
                        AND ppc.id=wlm.product_categoryid AND ppc.status = 'A' 
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  
                        AND spa.product_typeid=wlm.product_typeid AND spa.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
                        AND sppc.producttype_categoryid=ppc.id  AND sppc.producttype_categoryid=wlm.product_categoryid
                        AND sppc.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
                        AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid 
                        AND sppl.id=wlm.product_listid AND sppl.status = 'A'
                    JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id  AND ss.status = 'A'
                    JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd ON sppfd.product_listid=sppl.id
                        AND sppfd.id=wlm.product_featureid AND sppfd.status = 'A'
                    LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
                        ON ppimg.product_listid=sppl.id AND ppimg.status = 'A' 
                        AND ppimg.is_showcasefile = 'Y'
                    JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
                    JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
                    JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
                    JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
                    WHERE 1 ";  
                    // add userLoggedId in where condition
                    if(array_key_exists('userLoggedId', $paramJson)){
                        if(($paramJson['userLoggedId'])>0 && $paramJson['userLoggedId']!=''){
                            $sql.=" AND u.id='".$paramJson['userLoggedId']."' AND wl.user_id='".$paramJson['userLoggedId']."'";
                        } 
                    } 
                    // add notUserLoggedId in where condition
                    if(array_key_exists('notUserLoggedId', $paramJson)){
                        if($paramJson['notUserLoggedId']!='' && ($paramJson['notUserLoggedId'])>0){
                            $sql.=" AND u.id!='".$paramJson['notUserLoggedId']."' AND wl.user_id!='".$paramJson['notUserLoggedId']."'";
                        } 
                    } 
                    // add createrUserId in where condition
                    if(array_key_exists('createrUserId', $paramJson)){
                        if($paramJson['createrUserId']!='' && ($paramJson['createrUserId'])>0){
                            $sql.=" AND u.id='".$paramJson['createrUserId']."' AND wl.user_id='".$paramJson['createrUserId']."'";
                        } 
                    } 
                    // add userProfileTypeId in where condition
                    if(array_key_exists('userProfileTypeId', $paramJson)){
                        if($paramJson['userProfileTypeId']!='' && ($paramJson['userProfileTypeId'])>0){
                            $sql.=" AND u.profile_typeid='".$paramJson['userProfileTypeId']."'";
                        } 
                    } 
                    // add user_name in where condition
                    if(array_key_exists('user_name', $paramJson)){
                        if($paramJson['user_name']!='' && strlen($paramJson['user_name'])>0){
                            $userName = $paramJson['user_name'];
                            $sql.=" AND u.name LIKE '%$userName%'";
                        } 
                    } 
                    // add email in where condition
                    if(array_key_exists('email', $paramJson)){
                        if($paramJson['email']!='' && strlen($paramJson['email'])>0){
                            $sql.=" AND u.email='".$paramJson['email']."'";
                        } 
                    } 
                    // add wish list id in where condition
                    if(array_key_exists('wishListId', $paramJson)){
                        if($paramJson['wishListId']!='' && ($paramJson['wishListId'])>0){
                            $sql.=" AND wl.id='".$paramJson['wishListId']."' AND wlm.wishlist_id='".$paramJson['wishListId']."'";
                        } 
                    } 
                    // add wish list item id in where condition
                    if(array_key_exists('wishListItemId', $paramJson)){
                        if($paramJson['wishListItemId']!='' && ($paramJson['wishListItemId'])>0){
                            $sql.=" AND wlm.id='".$paramJson['wishListItemId']."'";
                        } 
                    } 
            $sql.= " ORDER BY wlm.updated_datedtime DESC";
            $command = $connection->createCommand($sql);
            $retWishListItemDetailsArr = $command->queryAll();
            if(count($retWishListItemDetailsArr)>0 && $retWishListItemDetailsArr!=false){
                $retResult =  $retWishListItemDetailsArr;    
            }
        }catch(Exception $ex){}
        return $retResult;
    }
    
    // CJ defined this function 2016-08-05
    public static function addProductToUWL($wishListProductDataParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if(array_key_exists('wishlist_id', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['wishlist_id']!=''){
                $sqlColumnNames.=" wishlist_id,";
                $sqlValues.="'".$wishListProductDataParamDetails['wishlist_id']."',";
            }
        }
        if(array_key_exists('shopstore_id', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['shopstore_id']!=''){
                $sqlColumnNames.=" shopstore_id,";
                $sqlValues.="'".$wishListProductDataParamDetails['shopstore_id']."',";
            }
        }
        if(array_key_exists('product_typeid', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['product_typeid']!=''){
                $sqlColumnNames.=" product_typeid,";
                $sqlValues.="'".$wishListProductDataParamDetails['product_typeid']."',";
            }
        }
        if(array_key_exists('product_categoryid', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['product_categoryid']!=''){
                $sqlColumnNames.=" product_categoryid,";
                $sqlValues.="'".$wishListProductDataParamDetails['product_categoryid']."',";
            }
        }
        if(array_key_exists('product_listid', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['product_listid']!=''){
                $sqlColumnNames.=" product_listid,";
                $sqlValues.="'".$wishListProductDataParamDetails['product_listid']."',";
            }
        }
        if(array_key_exists('product_featureid', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['product_featureid']!=''){
                $sqlColumnNames.=" product_featureid,";
                $sqlValues.="'".$wishListProductDataParamDetails['product_featureid']."',";
            }
        }
        if(array_key_exists('created_by', $wishListProductDataParamDetails)){
            if($wishListProductDataParamDetails['created_by']!=''){
                $sqlColumnNames.=" created_by,";
                $sqlValues.="'".$wishListProductDataParamDetails['created_by']."',";
            }
        }
        if($sqlValues!='' && $sqlColumnNames!=''){
            $wishListProductDataParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$wishListProductDataParamDetails['created_datedtime']."',";
            $sqlQuery = " INSERT INTO DK_WISHLISTITEM " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return $lastInsertedId;
    }
    
    // CJ defined this function 2016-07-29
    public static function removeProductFromUWL($wishListProductDataParamDetails){
        $retStatusProductDeleted = false;
        $sqlQuery = '';
        if(array_key_exists('wishListItemId', $wishListProductDataParamDetails)
            && array_key_exists('updated_by', $wishListProductDataParamDetails)){
            if(strlen($wishListProductDataParamDetails['wishListItemId'])==32 
                && $wishListProductDataParamDetails['updated_by']!=''){
                $sqlQuery.=" UPDATE DK_WISHLISTITEM set status='Z', updated_by='".$wishListProductDataParamDetails['updated_by']."'";
                $sqlQuery.=" WHERE MD5(id)='".$wishListProductDataParamDetails['wishListItemId']."'";
            } 
        } 
        if($sqlQuery!='' && $sqlQuery!=''){
            $connection = Yii::app()->db;
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>0){
                $retStatusProductDeleted = true;
            }
        }
        return $retStatusProductDeleted;
    }
    
    // CJ defined this function 2016-07-30
    public static function moveProductFromUWLToUWL($wishListProductDataParamDetails){
        $retProductDeletedStatus = false;
        $sqlQuery = '';
        if(array_key_exists('moveItemFromWishListId', $wishListProductDataParamDetails)
            && array_key_exists('moveItemToWishListId', $wishListProductDataParamDetails)
            && array_key_exists('moveWishListItemId', $wishListProductDataParamDetails)    
            && array_key_exists('updated_by', $wishListProductDataParamDetails)){
            if(strlen($wishListProductDataParamDetails['moveItemFromWishListId'])==32 
                && strlen($wishListProductDataParamDetails['moveWishListItemId'])==32   
                && $wishListProductDataParamDetails['moveItemToWishListId']!=''
                && $wishListProductDataParamDetails['updated_by']!=''){
                $sqlQuery.=" UPDATE DK_WISHLISTITEM set status='A', updated_by='".$wishListProductDataParamDetails['updated_by']."'";
                $sqlQuery.=" , wishlist_id='".$wishListProductDataParamDetails['moveItemToWishListId']."'";
                $sqlQuery.="  WHERE MD5(id)='".$wishListProductDataParamDetails['moveWishListItemId']."'";
                $sqlQuery.="  AND MD5(wishlist_id)='".$wishListProductDataParamDetails['moveItemFromWishListId']."'";
            } 
        } 
        if($sqlQuery!='' && $sqlQuery!=''){
            $connection = Yii::app()->db;
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>0){
                $retProductDeletedStatus = true;
            }
        }
        return $retProductDeletedStatus;
    }
    
    // CJ defined this function 2016-07-30
    public static function updateUWL($paramJson){
        $connection = Yii::app()->db;
        $dynamicSql = "";
        $retStatus = false;
        if(array_key_exists('profile_id', $paramJson)){
            if($paramJson['profile_id']!=''){
                $dynamicSql.=" profile_id='".$paramJson['profile_id']."',";
            }
        }
        if(array_key_exists('user_id', $paramJson)){
            if($paramJson['user_id']!=''){
                $dynamicSql.=" user_id='".$paramJson['user_id']."',";
            }
        }
        if(array_key_exists('title', $paramJson)){
            if($paramJson['title']!=''){
                $dynamicSql.=" title='".$paramJson['title']."',";
            }
        }
        if(array_key_exists('is_publicly', $paramJson)){
            if($paramJson['is_publicly']!=''){
                $dynamicSql.=" is_publicly='".$paramJson['is_publicly']."',";
            }
        }
        if(array_key_exists('is_defaultsetting', $paramJson)){
            if($paramJson['is_defaultsetting']!=''){
                $dynamicSql.=" is_defaultsetting='".$paramJson['is_defaultsetting']."',";
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
        if($dynamicSql!=''){
            $sqlQuery = " UPDATE DK_WISHLIST SET ".rtrim($dynamicSql, ',');
            $sqlQuery.=" WHERE MD5(id)='".$paramJson['wishListId']."'";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=0){
                $retStatus = true;
            }
        }
        return $retStatus;
    }
    
}
