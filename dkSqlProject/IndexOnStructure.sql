
--- Indexes run on

EXPLAIN 

SELECT 
COALESCE(pt.id, '') productTypeId,
COALESCE(pt.name, '') productTypeTitle, 
COALESCE(UPPER(pt.name), '') productTypeTitleInCaps, 
COALESCE(ppc.id, '') productTypeProductCategoryId, 
COALESCE(ppc.name, '') productTypeProductCategoryTitle,
COALESCE(spa.shoptstore_id, '') shopStoreId, 
COALESCE(ss.shopstore_name, '') shopStoreTitle,
COALESCE(ss.shop_storelabel, '') shopStoreLabel, 
COALESCE(ss.shopstore_logofile, '') shopstore_logofile,
COALESCE(ss.shopstore_mobile, '') shopstore_mobile,
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
COALESCE(ccr.country_id, '') countryId, 
COALESCE(ccr.city_id, '') cityId, 
COALESCE(ccr.area_id, '') areaId, 
COALESCE(area.name, '') areaTitle 
FROM DK_PRODUCTTYPE pt
JOIN DK_PRODUCTTYPE_PRODUCTCATEGORY ppc ON pt.id=ppc.product_typeid AND ppc.status = 'A' AND pt.status = 'A'
JOIN DK_SHOPSTORE_PRODUCTTYPE_AFFILIATION spa ON spa.product_typeid=pt.id  AND spa.status = 'A' 
JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTCATEGORY sppc ON sppc.shopstores_producttype_affiliationid=spa.id 
    AND sppc.producttype_categoryid=ppc.id AND sppc.status = 'A'
JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST sppl ON sppl.shopstores_producttype_affiliationid = spa.id
    AND sppl.shopstores_product_categoryid=sppc.producttype_categoryid AND sppl.status = 'A'
JOIN DK_SHOPSTORES ss ON ss.id=spa.shoptstore_id  AND ss.status = 'A'
JOIN DK_COUNTRYCITYAREAAFFILIATION ccr ON ccr.id=ss.country_city_area_affiliationId AND ccr.status='A'
JOIN DK_COUNTRYREACHED country ON country.id=ccr.country_id AND country.status='A'
JOIN DK_CITYREACHED city ON city.id=ccr.city_id AND city.status='A'
JOIN DK_AREAREACHED area ON area.id=ccr.area_id AND area.status='A'
JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_FEATURESDETAILS sppfd 
    ON sppfd.product_listid=sppl.id AND sppfd.status = 'A'
LEFT JOIN DK_SHOPSTORE_PRODUCTTYPE_PRODUCTLIST_IMAGEFILEMAPPING ppimg 
    ON ppimg.product_listid=sppl.id  AND ppimg.status = 'A' 
    AND ppimg.is_showcasefile = 'Y'  AND ppimg.is_showcasefile = 'Y'   
WHERE 1  
AND ss.id IN (1,2) AND spa.shoptstore_id IN (1,2)  
AND ss.country_city_area_affiliationId IN (1) AND ccr.id IN (1)  
AND pt.id IN (1) AND ppc.product_typeid IN (1)  
AND spa.product_typeid IN (1)  
AND sppc.shopstores_producttype_affiliationid = spa.id 
AND sppl.shopstores_producttype_affiliationid = spa.id  
ORDER BY pt.id, ppc.id, spa.product_typeid, 
sppc.producttype_categoryid,sppfd.online_sellprice ASC, sppfd.product_discount ASC