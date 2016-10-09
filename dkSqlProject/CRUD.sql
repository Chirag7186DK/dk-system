
-- UPDATE STORE_PRODUCTLIST spl
-- SET file_path = Replace(file_path, 'vendor_cb1', 'vendor_cb123456789') 
-- WHERE file_path IS NOT NULL AND file_path!=''


-- UPDATE STORE_PRODUCTLIST spl1
-- JOIN (
--     SELECT file_path, name
--     FROM 
--         (
--             SELECT *
--             FROM STORE_PRODUCTLIST spl2
--             WHERE 1 AND spl2.store_ptpc_affiliationid='1'
--         ) AS tempData
--     WHERE tempData.store_ptpc_affiliationid='1'
-- ) tempData1 ON tempData1.name=spl1.name
-- SET spl1.file_path = tempData1.file_path
-- WHERE spl1.store_ptpc_affiliationid='9'


-- INSERT INTO `DESSERTSKHAZANA`.`AREAREACHED` 
-- (`id`, `name`, `short_name`, `pincode`, `sort_order`, `created_by`, `created_datedtime`, 
-- `updated_by`, `updated_datedtime`, `status`) 
-- VALUES 
-- (NULL, 'Banner', 'Banner', '10002', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chinchwad', 'Chinchwad', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Dhange Chowk', 'Dhange Chowk', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Hinjewadi', 'Hinjewadi', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Kalyani Nagar', 'Kalyani Nagar', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Pradhikaran Nigdi', 'Pradhikaran Nigdi', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Wakad', 'Wakad', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Pimple Saudagar', 'Pimple Saudagar', '10003', '1', '1', '2016-09-29 00:00:00', 
-- NULL, CURRENT_TIMESTAMP, 'A'),

-- INSERT INTO `DESSERTSKHAZANA`.`COUNTRYCITYAREAAFFILIATION` 
-- (`id`, `country_id`, `city_id`, `area_id`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES 
-- (NULL, '1', '1', '2', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '3', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '4', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '5', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '6', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '7', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '8', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', '1', '9', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');

-- 
-- INSERT INTO `DESSERTSKHAZANA`.`STORE` 
-- (`id`, `name`, `storelabel`, `mobile`, `landline`, `email`, `logofile`, 
-- `opentimedisplay`, `closetimedisplay`, `address`, `country_city_area_affiliationId`, 
-- `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES 
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'Banner area, pune', '2', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'chinhwad area, pune', '3', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'Dhange chowk area, pune', '4', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'Hinjewadi area, pune', '5', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'Kalyani nagar area, pune', '6', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'nigdi area, pune', '7', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'wakad area, pune', '8', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, 'Chocolate Biclate', 'CB', '9975967186', '9975967186', 'chirag.jain@gmail.com', '', 
-- '9 AM', '9 PM', 'pimple saudagar area, pune', '9', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');


-- INSERT INTO STORE_DELIVERYLOCATIONDETAILS
-- (store_id, country_id, city_id, area_id, is_takeawayorderaccept, is_cashondeliveryaccept, is_onlinepaymentaccept,
-- is_homedeliveryaccept, is_courierdeliveryaccept, min_orderamount, deliveryfee, delivery_time, created_by, created_datedtime, status)
-- SELECT
-- '9', country_id, city_id, area_id, is_takeawayorderaccept, is_cashondeliveryaccept, is_onlinepaymentaccept,
-- is_homedeliveryaccept, is_courierdeliveryaccept, min_orderamount, deliveryfee, delivery_time, created_by, created_datedtime, status
-- FROM STORE_DELIVERYLOCATIONDETAILS 
-- WHERE store_id='1'

-- INSERT INTO `DESSERTSKHAZANA`.`STORE_PRODUCTTYPE_AFFILIATION` 
-- (`id`, `store_id`, `product_typeid`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES 
-- (NULL, '2', '1', '2', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '3', '1', '3', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '4', '1', '4', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '5', '1', '5', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '6', '1', '6', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '7', '1', '7', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '8', '1', '8', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '9', '1', '9', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A')




-- INSERT INTO `DESSERTSKHAZANA`.`STORE_PRODUCTTYPE_AFFILIATIONCATEGORY` 
-- (`id`, `store_producttype_affiliationid`, `producttype_categoryid`, `name`, `short_name`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES 
-- (NULL, '2', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '3', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '4', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '5', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '6', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '7', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '8', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '9', '1', 'Regular Cakes', 'Regular Cakes', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');

















-- INSERT INTO `DESSERTSKHAZANA`.`STORE_PRODUCTLIST` 
-- (`id`, `store_ptpc_affiliationid`, `name`, `short_name`, `file_path`, `image_name`, `sort_order`, 
-- `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES 
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');
-- 
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- (NULL, '1', 'Red Velvet', 'Red Velvet', '', '', '1', '1', '2016-09-29 00:00:00', NULL, CURRENT_TIMESTAMP, 'A'),
-- 

-- INSERT INTO STORE_PRODUCTLIST
-- (store_ptpc_affiliationid, name, short_name, sort_order, created_by, created_datedtime, status)
-- SELECT 
-- '9', name, short_name, sort_order, created_by, created_datedtime, status
-- FROM STORE_PRODUCTLIST
-- WHERE store_ptpc_affiliationid='1'


-- INSERT INTO STORE_PRODUCTLIST_LOGDETAILS
-- (productlist_id, product_code, food_type, display_measurementtype, storeprice, online_sellprice, 
-- created_by, created_datedtime, status)
-- SELECT 
-- '61', product_code, food_type, display_measurementtype, storeprice, online_sellprice, created_by, created_datedtime, status
-- FROM STORE_PRODUCTLIST_LOGDETAILS
-- WHERE productlist_id='31'


-- UPDATE STORE_PRODUCTLIST spl
-- JOIN 
-- (
--     SELECT productlist_id, COUNT( productlist_id ) c
--     FROM STORE_PRODUCTLIST_LOGDETAILS
--     WHERE 1 
--     GROUP BY productlist_id
--     HAVING c >1
-- ) prd ON prd.productlist_id=spl.id
-- SET spl.availablesize=prd.c



-- SELECT
-- COALESCE(COUNT(DISTINCT odr.id), 0) ordercartCount,
-- COALESCE(COUNT(DISTINCT odrs.id), 0) totalStores,
-- COALESCE(itemData.ordercartItemRequestedCount, 0) ordercartItemRequestedCount,
-- COALESCE(SUM(odrs.subtotalamount), 0) subtotalOrderAmt,
-- COALESCE(SUM(odrs.apply_deliveryfee), 0) totalDeliveryFee,
-- COALESCE(SUM(odrs.totalamount), 0) totalOrderAmt
-- FROM ORDERCART odr
-- JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
-- JOIN (
--     SELECT 
--     odrsim.ordercart_storeid ordercartStoreId,
--     COALESCE(COUNT(DISTINCT odrsim.id), 0) ordercartItemRequestedCount
--     FROM ORDERCARTSTORE_ITEMDETAILS odrsim
--     WHERE 
--     odrsim.status='R'
--     GROUP BY odrsim.ordercart_storeid
-- ) itemData ON itemData.ordercartStoreId=odrs.id
-- WHERE 
-- odr.status='R' AND odrs.status='R'
-- AND odr.user_id='1'
-- HAVING ordercartCount>0


-- SELECT 
-- odr.id ordercartId, odr.user_sessionid userSessionId, odr.user_id userId,
-- odrs.id ordercartStoreId, odrs.store_id storeId, COALESCE(ss.name, '') shopStoreTitle,
-- COALESCE(a.name, '') storeLocatedAreaName, 
-- COALESCE(odrs.min_orderamt, '0') storeMinOrderAmt, COALESCE(odrs.deliveryfee, '0') deliveryfee,
-- COALESCE(odrs.apply_deliveryFee, '0') apply_deliveryFee,
-- odrs.deliveryCountryCityAreaId, COALESCE(odrs.delivery_areaname, '') delivery_areaname,
-- COALESCE(odrs.address, '') deliveryAddress, COALESCE(odrs.deliverydate, '') deliverydate,
-- COALESCE(odrs.discountamount, '') discountamount,
-- COALESCE(odrs.subtotalamount, '') subtotalamount, COALESCE(odrs.totalamount, '') totalamount,
-- COALESCE(odrsim.id, '') orderStoreItemId, COALESCE(spl.name, '') productListTitle, 
-- COALESCE(odrsim.featureid, '') featureId, COALESCE(odrsim.size, '') productSize, 
-- COALESCE(odrsim.price, '') productPrice, COALESCE(odrsim.qty, '0') productQty, 
-- COALESCE(odrsim.totalamount, '') productTotalAmt, COALESCE(odrsim.description, '') description,
-- COALESCE(splld.baseprice, '') productFeatureBasePrice, 
-- COALESCE(splld.product_discount, '') productFeatureDiscount
-- FROM ORDERCART odr
-- JOIN ORDERCARTSTORE odrs ON odrs.ordercart_id=odr.id
-- JOIN ORDERCARTSTORE_ITEMDETAILS odrsim ON odrsim.ordercart_storeid=odrs.id
-- JOIN STORE_PRODUCTLIST_LOGDETAILS splld ON splld.id=odrsim.featureid AND splld.status='A'
-- JOIN STORE_PRODUCTLIST spl ON spl.id=splld.productlist_id AND spl.status='A'
-- JOIN STORE_PRODUCTTYPE_AFFILIATIONCATEGORY spac ON spac.id=spl.store_ptpc_affiliationid AND spac.status='A'
-- JOIN STORE_PRODUCTTYPE_AFFILIATION spa ON spa.store_id=odrs.store_id
--     AND spa.id=spac.store_producttype_affiliationid AND spa.status='A'
-- JOIN STORE ss ON ss.id=odrs.store_id AND spa.store_id=ss.id AND ss.status='A'
-- JOIN COUNTRYCITYAREAAFFILIATION cca ON cca.id=ss.country_city_area_affiliationId AND cca.status='A'
-- JOIN CITYREACHED c ON c.id=cca.city_id AND c.status='A' 
-- JOIN AREAREACHED a ON a.id=cca.area_id AND a.status='A'
-- WHERE 1
-- AND odr.user_id='1'
-- AND odr.status='R'
-- AND odrs.status='R'
-- AND odrsim.status='R'
-- ORDER BY odrsim.updated_by DESC, odrs.store_id ASC






























