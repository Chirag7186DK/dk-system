
-- delete query 

-- TRUNCATE TABLE  `DK_USERLOG`;
-- TRUNCATE TABLE  `DK_USERSESSION`;
-- TRUNCATE TABLE  `DK_TRACKUSERS_ACCESSWEBSITES`;




 SELECT
dcg.id dcgId, dcg.code dcgCode, dcg.title dcgTitle,
COALESCE(dcg.is_universally, 'N') isUniversallyAccepted,
COALESCE(dcg.is_percentagebased, 'N') isPercentageBased,
COALESCE(dcg.percentage_based, 0) percentageBased,
COALESCE(dcg.is_cashback_based, 'N') isCashbackBased,
COALESCE(dcg.cashback_based, 0) cashbackBased,
COALESCE(dcg.above_orderamount, '') aboveOrderAmt,
COALESCE((CASE WHEN dcg.for_userid IS NULL THEN 'N' ELSE 'Y' END), 'N') isDiscountCouponAvailableForLoggedUser,
COALESCE(dcg.for_userid,'') userId,
COALESCE(dcg.share_limit, 0) shareLimit,
COALESCE(DATE_FORMAT(dcg.end_datedtime,'%b %d %Y %h:%i %p'), '') expiredDateTime
FROM DK_DISCOUNTCOUPONGENERATION dcg
WHERE 1
AND dcg.status='A'
AND NOW() BETWEEN dcg.start_datedtime AND dcg.end_datedtime
AND dcg.for_userid='1'
AND dcg.is_universally='N'
AND ( 
    (dcg.is_percentagebased='Y' AND dcg.percentage_based>0 AND dcg.is_cashback_based='N' )
        OR
    (dcg.is_cashback_based='Y' AND dcg.cashback_based>0 AND dcg.is_percentagebased='N')
)
AND dcg.can_shareit='Y'
AND dcg.share_limit>0


-- SELECT
-- COALESCE(COUNT(*), 0) countUserSharedDiscountCoupon
-- FROM DK_USER_SHARED_DISCOUNTCOUPON usdc 
-- WHERE
-- usdc.user_id='1'
-- AND usdc.discount_couponid='2'
-- AND usdc.status='S'



-- SELECT
-- COALESCE(por.partyorder_no, '') partyOrderNo, 
-- COALESCE(por.occassion_title, '') occassionTitle,
-- COALESCE(por.nos_person, '') nosOfPerson, 
-- COALESCE(por.party_date, '') partyDate, 
-- COALESCE(por.party_venue, '') partyVenue, 
-- COALESCE(por.party_requirements, '') partyRequirements,
-- (CASE 
--     WHEN por.status='R' THEN 'Requested'
--     WHEN por.status='CV' THEN 'Consulting with vendor'
--     WHEN por.status='C' THEN 'Confirmed by you & me'
--     WHEN por.status='PP' THEN 'Payment Pending'
--     WHEN por.status='PF' THEN 'Payment Failed'
--     WHEN por.status='PF' THEN 'Deleted by you'
--     WHEN por.status='ZA' THEN 'Deleted by us'
-- END) portLongStatusMsg,
-- COALESCE(por.status, '') porStatus
-- FROM DK_USERS u 
-- JOIN DK_PARTYORDERS_REQUEST por ON por.user_id=u.id
-- WHERE 
-- u.id='1'
-- AND por.user_id='1'
-- AND u.status='A'




-- SELECT 
-- uoc.id ordercartId, uocim.id ordercartItemId, 
-- COALESCE(MD5(pt.id), '') productTypeId, COALESCE(pt.id, '') unMD5ProductTypeId, 
-- COALESCE(pt.name, '') productTypeTitle, 
-- COALESCE(UPPER(pt.name), '') productTypeTitleInCaps, 
-- COALESCE(MD5(ppc.id), '') productTypeProductCategoryId, 
-- COALESCE(ppc.id, '') unMD5ProductTypeProductCategoryId, 
-- COALESCE(ppc.name, '')  productTypeProductCategoryTitle,
-- COALESCE(MD5(spa.shoptstore_id), '') shopStoreId, 
-- COALESCE(spa.shoptstore_id, '') unMd5ShopStoreId, 
-- COALESCE(ss.shopstore_name, '') shopStoreTitle,
-- COALESCE(ss.shop_storelabel, '') shopStoreLabel, 
-- COALESCE(ss.shopstore_logofile, '') shopstore_logofile,
-- COALESCE(ss.shopstore_mobile, '') shopstore_mobile,
-- COALESCE(MD5(sppl.id), '') productListId, 
-- COALESCE(sppl.id, '') unMd5ProductListId,
-- COALESCE(sppl.name, '') productListTitle,
-- COALESCE(MD5(sppfd.id), '') productFeatureId, 
-- COALESCE(sppfd.id, '') unMd5ProductFeatureId, 
-- COALESCE(sppfd.display_measurementtype, '') productFeatureDisplayMeasurementType,
-- COALESCE(sppfd.food_type, '') productFeatureFoodType, 
-- COALESCE(sppfd.taste_type, '') productFeatureTasteType, 
-- COALESCE(sppfd.pattern_type, '') productFeaturePatternType, 
-- COALESCE(sppfd.order_opentime, '') productFeatureOrderOpenTime, 
-- COALESCE(sppfd.order_closetime, '') productFeatureOrderOpenTime, 
-- COALESCE(sppfd.baseprice, '') productFeatureBasePrice,
-- COALESCE(sppfd.product_discount, '') productFeatureDiscount,
-- COALESCE(sppfd.online_sellprice, '') productFeatureOnlineSellingPrice,
-- COALESCE(ppimg.is_showcasefile, 'N') isProductImageFileShowCase,
-- COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
-- COALESCE(ppimg.file_path, 'images/') productImageFilePath,
-- COALESCE(uocim.product_featuresize, '') itemMeasurementType,
-- COALESCE(uocim.product_featuresprice, 0) itemPerpriceIncart,
-- COALESCE(uocim.product_featuresqty, 0) itemQty,
-- COALESCE(uocim.product_features_totalamount, 0) itemTotalAmt,
-- COALESCE(uocim.product_description,'') itemDescriptionIncart
-- FROM DK_USERORDERCART uoc 
-- JOIN DK_USERORDERCART_ITEMDETAILS uocim ON uocim.order_cartid=uoc.id
-- JOIN DK_PRODUCTTYPE pt ON pt.id=uocim.product_typeid
-- JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.id=uocim.product_categoryid 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.shoptstore_id=uocim.shopstore_id 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
--     AND sppc.producttype_categoryid=ppc.id AND uocim.product_categoryid=sppc.producttype_categoryid 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.id=uocim.product_listid 
-- JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id AND ss.id=uocim.shopstore_id
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd 
--     ON sppfd.product_listid=sppl.id AND sppfd.id=uocim.product_featureid
-- LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
--     ON ppimg.product_listid=sppl.id  AND ppimg.status = 'A' 
--     AND ppimg.is_showcasefile = 'Y'    
-- WHERE 1
-- AND (uoc.status='ZC' OR uoc.status='ZA' OR uoc.status='R')
-- AND (uocim.status='ZC' OR uocim.status='ZA')
-- AND uoc.user_id='1'
-- ORDER BY uoc.id ASC, uoc.updated_datedtime DESC


-- requested item in order cart

-- SELECT 
-- uoc.id ordercartId,
-- uocim.id ordercartItemId, 
-- COALESCE(ss.shopstore_name, '') shopStoreName,
-- COALESCE(pt.name, '') productType, COALESCE(sppl.name, '') productListTitle,
-- COALESCE(uocim.product_featuresize, '') itemMeasurementType,
-- COALESCE(uocim.product_featuresprice, 0) itemPerpriceIncart,
-- COALESCE(uocim.product_featuresqty, 0) itemQty,
-- COALESCE(uocim.product_features_totalamount, 0) itemTotalAmt,
-- COALESCE(uocim.product_description,'') itemDescriptionIncart
-- FROM DK_USERORDERCART uoc 
-- JOIN DK_USERORDERCART_ITEMDETAILS uocim ON uocim.order_cartid=uoc.id
-- JOIN DK_PRODUCTTYPE pt ON pt.id=uocim.product_typeid AND pt.status='A'
-- JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.id=uocim.product_categoryid 
--     AND ppc.status = 'A' AND pt.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.shoptstore_id=uocim.shopstore_id 
--     AND spa.status = 'A' 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
--     AND sppc.producttype_categoryid=ppc.id AND uocim.product_categoryid=sppc.producttype_categoryid 
--     AND sppc.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.id=uocim.product_listid 
--     AND sppl.status = 'A'
-- JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id AND ss.id=uocim.shopstore_id AND ss.status = 'A' 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd 
--     ON sppfd.product_listid=sppl.id AND sppfd.id=uocim.product_featureid AND sppfd.status = 'A'
-- WHERE 
-- uoc.status='R'
-- AND uocim.status='R'
-- AND uoc.user_id='1'
-- ORDER BY uoc.updated_datedtime DESC


-- discount coupon available for users

-- SELECT 
-- dcg.id dcgId,
-- dcg.code dcgCode, 
-- dcg.title dcgTitle,
-- COALESCE(dcg.is_universally, 'N') isUniversallyAccepted,
-- COALESCE(dcg.is_percentagebased, 'N') isPercentageBased,
-- COALESCE(dcg.percentage_based, 0) percentageBased,
-- COALESCE(dcg.is_cashback_based, 'N') isCashbackBased,
-- COALESCE(dcg.cashback_based, 0) cashbackBased,
-- COALESCE(dcg.above_orderamount, '') aboveOrderAmt,
-- COALESCE((CASE WHEN dcg.for_userid IS NULL THEN 'N' ELSE 'Y' END), 'N') isDiscountCouponAvailableForLoggedUser,
-- COALESCE(dcg.for_userid, '') userId
-- FROM DK_DISCOUNTCOUPONGENERATION dcg
-- LEFT JOIN DK_USERS u ON u.id=dcg.for_userid AND u.status='A' AND dcg.for_userid=''
-- WHERE 1
-- AND dcg.status='A'
-- AND CURDATE() BETWEEN dcg.start_datedtime AND dcg.end_datedtime



-- user log /session details

-- SELECT 
-- COALESCE(ul.id, '') userLogId,
-- COALESCE(u.id, '') unmd5UserId, 
-- MD5(COALESCE(u.id, '')) userId, 
-- UPPER(COALESCE(u.name, '')) userName,
-- COALESCE(u.email, '') userEmail, 
-- COALESCE(u.mobile, '') userMobile, 
-- MD5(COALESCE(up.id, '')) userProfileTypeId, 
-- COALESCE(up.id, '') unmd5ProfileTypeId,
-- COALESCE(DATE_FORMAT(u.created_datedtime, '%b %D %a, %Y'), '') userSinceFrom,
-- COALESCE(u.status, 'Z') userStatus
-- FROM DK_USERLOG ul
-- JOIN DK_USERS u ON ul.user_id=u.id AND u.status='A' 
-- JOIN DK_USERSPROFILE up ON up.id=u.profile_typeid AND up.status='A'
-- WHERE 
-- ul.temp_userid='121' 
-- AND ul.id='1'



-- get requested ordercart item summary 

-- SELECT 
-- COALESCE(COUNT(DISTINCT uoc.id), 0) ordercartCount,
-- COALESCE(COUNT(DISTINCT uocim.id), 0) ordercartItemRequestedCount,
-- COALESCE(SUM(uocim.product_features_totalamount), 0) subtotalOrderAmt
-- FROM DK_USERORDERCART uoc
-- JOIN DK_USERORDERCART_ITEMDETAILS uocim ON uocim.order_cartid=uoc.id
-- JOIN DK_PRODUCTTYPE pt ON pt.id=uocim.product_typeid AND pt.status='A'
-- JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.id=uocim.product_categoryid 
--     AND ppc.status = 'A' AND pt.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id AND spa.shoptstore_id=uocim.shopstore_id 
--     AND spa.status = 'A' 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
--     AND sppc.producttype_categoryid=ppc.id AND uocim.product_categoryid=sppc.producttype_categoryid 
--     AND sppc.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.id=uocim.product_listid 
--     AND sppl.status = 'A'
-- JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id AND ss.id=uocim.shopstore_id AND ss.status = 'A' 
-- WHERE 
-- uoc.status='A'
-- AND uocim.status='Requested'
-- AND uoc.user_sessionid='SUID71471077847'

                  
-- max user reviewing/rating group no 

-- SELECT MAX(urd.group_no)
-- FROM DK_USER_REVIEWANSWERDETAILS urd
-- WHERE urd.group_no IS NOT NULL
-- HAVING MAX(urd.group_no)>0


-- user wish list summary count

-- SELECT 
-- COUNT(DISTINCT wl.id) wlCount,
-- COUNT(DISTINCT wlm.id) wlmCount
-- FROM DK_WISHLIST wl
-- JOIN DK_WISHLISTITEM wlm ON wlm.wishlist_id=wl.id AND wlm.status='A'
-- JOIN DK_USERS u ON u.id=wl.user_id AND u.status='A'
-- JOIN DK_PRODUCTTYPE pt ON pt.id=wlm.product_typeid AND pt.status='A'
-- JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND pt.status = 'A'
--     AND ppc.id=wlm.product_categoryid AND ppc.status = 'A' 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  
--     AND spa.product_typeid=wlm.product_typeid AND spa.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
--     AND sppc.producttype_categoryid=ppc.id  AND sppc.producttype_categoryid=wlm.product_categoryid
--     AND sppc.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid 
--     AND sppl.id=wlm.product_listid AND sppl.status = 'A'
-- JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id  AND ss.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd ON sppfd.product_listid=sppl.id
--     AND sppfd.id=wlm.product_featureid AND sppfd.status = 'A'
-- LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
--     ON ppimg.product_listid=sppl.id AND ppimg.status = 'A' 
--     AND ppimg.is_showcasefile = 'Y'
-- JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
-- JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
-- JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
-- JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
-- WHERE 1  
-- AND MD5(u.id)='c4ca4238a0b923820dcc509a6f75849b' 
-- AND MD5(wl.user_id)='c4ca4238a0b923820dcc509a6f75849b' 
-- HAVING wlCount>0 AND wlmCount>0


-- SELECT 
-- MD5(u.id) createrUserId,
-- UPPER(CONCAT(u.name)) userName,
-- MD5(wl.id) wishListId,
-- COALESCE(wl.title, '') wishListTitle,
-- MD5(wlm.id) wishListItemId,
-- DATE_FORMAT(wlm.updated_datedtime, '%b %D %a, %Y') productAddedDatedtime,
-- COALESCE(MD5(ss.id), '') shopStoreId, 
-- ss.shopstore_name shopStoreTitle,
-- MD5(wlm.product_typeid) productTypeId,
-- MD5(wlm.product_categoryid) productCateogoryId,
-- COALESCE(sppl.name, '') productListTitle,
-- MD5(wlm.product_listid) productListId,
-- MD5(wlm.product_featureid) productFeatureId,
-- COALESCE(sppfd.display_measurementtype, '') productFeatureDisplayMeasurementType,
-- COALESCE(sppfd.food_type, '') productFeatureFoodType, 
-- COALESCE(sppfd.taste_type, '') productFeatureTasteType, 
-- COALESCE(sppfd.pattern_type, '') productFeaturePatternType, 
-- COALESCE(sppfd.order_opentime, '') productFeatureOrderOpenTime, 
-- COALESCE(sppfd.order_closetime, '') productFeatureOrderOpenTime, 
-- COALESCE(sppfd.baseprice, '') productFeatureBasePrice,
-- COALESCE(sppfd.product_discount, '') productFeatureDiscount,
-- COALESCE(sppfd.storeprice, '') productFeatureStorPrice,
-- COALESCE(sppfd.online_sellprice, '') productFeatureOnlineSellingPrice,
-- COALESCE(ppimg.is_showcasefile, 'N') isProductImageFileShowCase,
-- COALESCE(ppimg.image_filename, 'r1_(270x239).png') productImageFileName,
-- COALESCE(ppimg.file_path, 'images/') productImageFilePath
-- FROM DK_WISHLIST wl
-- JOIN DK_WISHLISTITEM wlm ON wlm.wishlist_id=wl.id AND wlm.status='A'
-- JOIN DK_USERS u ON u.id=wl.user_id AND u.status='A'
-- JOIN DK_PRODUCTTYPE pt ON pt.id=wlm.product_typeid AND pt.status='A'
-- JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND pt.status = 'A'
--     AND ppc.id=wlm.product_categoryid AND ppc.status = 'A' 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  
--     AND spa.product_typeid=wlm.product_typeid AND spa.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
--     AND sppc.producttype_categoryid=ppc.id  AND sppc.producttype_categoryid=wlm.product_categoryid
--     AND sppc.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid 
--     AND sppl.id=wlm.product_listid AND sppl.status = 'A'
-- JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id  AND ss.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd ON sppfd.product_listid=sppl.id
--     AND sppfd.id=wlm.product_featureid AND sppfd.status = 'A'
-- LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
--     ON ppimg.product_listid=sppl.id AND ppimg.status = 'A' 
--     AND ppimg.is_showcasefile = 'Y'
-- JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
-- JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
-- JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
-- JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
-- WHERE 1  ORDER BY wlm.updated_datedtime DESC



-- get UnMd5MappingDataForAddingProductInWishList

-- SELECT 
-- ss.id shopStoreId,
-- spa.product_typeid productTypeId,
-- sppc.producttype_categoryid productTypeProductCategoryId,
-- sppl.id productListId,
-- spfd.id productFeatureId
-- FROM DK_SHOPSTORES ss 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.shoptstore_id=ss.id AND spa.status='A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc
--     ON sppc.shopstores_producttype_affiliationid=spa.id
--     AND sppc.status='A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl
--     ON sppl.shopstores_producttype_affiliationid=spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid
--     AND sppl.status='A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS spfd
--     ON spfd.product_listid=sppl.id AND spfd.status='A'
-- WHERE 1 AND ss.status='A'
-- AND ss.id='1'
-- AND spa.product_typeid='1'
-- AND spa.shoptstore_id='1'
-- AND sppc.producttype_categoryid='1'
-- AND sppl.id='1'
-- AND spfd.id='1'
-- AND spfd.product_listid='1'



-- get user wish list details only

-- SELECT 
-- MD5(wl.id) wishListId,
-- COALESCE(wl.title, '') wishListTitle,
-- COALESCE(wl.is_publicly, 'N') isWishListPublicly,
-- COALESCE(wl.is_defaultsetting, 'N') isDefaultWishListSettings
-- FROM DK_WISHLIST wl
-- WHERE
-- wl.user_id='1'
-- AND wl.status='A'
-- AND wl.profile_id='2'



-- get wishlist item count

-- SELECT 
-- COUNT(DISTINCT wl.id) wishListCount,
-- COUNT(DISTINCT wlm.id) wishListItemCount
-- FROM DK_WISHLIST wl
-- JOIN DK_WISHLISTITEM wlm ON wlm.wishlist_id=wl.id AND wlm.status='A'
-- JOIN DK_USERS u ON u.id=wl.user_id AND u.status='A'
-- JOIN DK_PRODUCTTYPE pt ON pt.id=wlm.product_typeid AND pt.status='A'
-- JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND pt.status = 'A'
--     AND ppc.id=wlm.product_categoryid AND ppc.status = 'A' 
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  
--     AND spa.product_typeid=wlm.product_typeid AND spa.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
--     AND sppc.producttype_categoryid=ppc.id  AND sppc.producttype_categoryid=wlm.product_categoryid
--     AND sppc.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
--     AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid 
--     AND sppl.id=wlm.product_listid AND sppl.status = 'A'
-- JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id  AND ss.status = 'A'
-- JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd ON sppfd.product_listid=sppl.id
--     AND sppfd.id=wlm.product_featureid AND sppfd.status = 'A'
-- LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
--     ON ppimg.product_listid=sppl.id AND ppimg.status = 'A' 
--     AND ppimg.is_showcasefile = 'Y'
-- JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
-- JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
-- JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
-- JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
-- WHERE
-- wl.user_id='1'
-- AND u.id='1'
-- AND wl.profile_id='2'
-- AND u.profile_typeid='2'
-- -- GROUP BY wl.id
-- HAVING wishListCount>0 AND wishListItemCount>0