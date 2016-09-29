
-- City

-- INSERT INTO `DESSERTSKHAZANA`.`DK_CITYREACHED` (`id`, `name`, `short_name`, `pincode`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) VALUES (NULL, 'Nashik', 'Nashik', '10003', '3', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 21:26:36', 'A');


-- Area

-- INSERT INTO `DESSERTSKHAZANA`.`DK_AREAREACHED` (`id`, `name`, `short_name`, `pincode`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, 'Chandwad', 'Chandwad', '100014', '14', '1', '2016-03-05 00:00:00', NULL, '2016-09-08 21:35:38', 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_AREAREACHED` (`id`, `name`, `short_name`, `pincode`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, 'Jopul', 'Jopul', '100015', '15', '1', '2016-03-05 00:00:00', NULL, '2016-09-08 21:35:38', 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_AREAREACHED` (`id`, `name`, `short_name`, `pincode`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, 'Hati', 'Hati', '100014', '16', '16', '2016-03-05 00:00:00', NULL, '2016-09-08 21:35:38', 'A');

-- CCA

-- INSERT INTO `DESSERTSKHAZANA`.`DK_COUNTRYCITYAREAAFFILIATION` 
-- (`id`, `country_id`, `city_id`, `area_id`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '1', '4', '14', '1', '2016-03-05 00:00:00', NULL, '2016-09-08 21:37:46', 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_COUNTRYCITYAREAAFFILIATION` 
-- (`id`, `country_id`, `city_id`, `area_id`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '1', '4', '15', '1', '2016-03-05 00:00:00', NULL, '2016-09-08 21:37:46', 'A');
-- 
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_COUNTRYCITYAREAAFFILIATION` 
-- (`id`, `country_id`, `city_id`, `area_id`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '1', '4', '16', '1', '2016-03-05 00:00:00', NULL, '2016-09-08 21:37:46', 'A');



-- INSERT INTO `DESSERTSKHAZANA`.`DK_PRODUCTTYPE_PRODUCTCATEGORY` (`id`, `product_typeid`, `name`, `short_name`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '2', 'Delicious', 'Delicious', '3', '1', '2016-09-08 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_PRODUCTTYPE_PRODUCTCATEGORY` (`id`, `product_typeid`, `name`, `short_name`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '2', 'Special', 'Special', '4', '1', '2016-09-08 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');


-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_PRODUCTTYPE_AFFILIATIONCATEGORY` (`id`, `shopstores_producttype_affiliationid`, `producttype_categoryid`, `name`, `short_name`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '1', '2', 'Doll Cakes', 'Doll Cakes', '1', '1', '2016-09-08 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');

-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_PRODUCTLIST` 
-- (`id`, `shopstores_ptpc_affiliationid`, `name`, `short_name`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '2', 'Product1', 'Product1', '4', '1', '2016-09-08 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_PRODUCTLIST` 
-- (`id`, `shopstores_ptpc_affiliationid`, `name`, `short_name`, `sort_order`, `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '2', 'Product2', 'Product2', '5', '1', '2016-09-08 00:00:00', NULL, CURRENT_TIMESTAMP, 'A');


INSERT INTO DK_SHOPSTORE_PRODUCTLIST
(shopstores_ptpc_affiliationid, name, short_name, sort_order, created_by, created_datedtime, status)
SELECT 
'6', name, short_name, sort_order,created_by, created_datedtime, status
FROM DK_SHOPSTORE_PRODUCTLIST
WHERE 
shopstores_ptpc_affiliationid='2'


INSERT INTO DK_SHOPSTORE_PRODUCTLIST_LOGDETAILS
(productlist_id, product_code, food_type, display_measurementtype, 
price_code, storeprice, product_discount, baseprice, online_sellprice, created_by, created_datedtime, status)
SELECT
'18', product_code, food_type, display_measurementtype, 
price_code, storeprice, product_discount, baseprice, online_sellprice, created_by, created_datedtime, status
FROM DK_SHOPSTORE_PRODUCTLIST_LOGDETAILS
WHERE productlist_id='6'


UPDATE DK_SHOPSTORE_PRODUCTLIST
SET name=CONCAT('Product', id), short_name=CONCAT('Product', id)



-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_DELIVERYLOCATIONDETAILS` 
-- (`id`, `shopstore_id`, `country_id`, `city_id`, `area_id`, `is_preorderaccept`,
--  `is_takeawayorderaccept`, `is_cashondeliveryaccept`, `is_onlinepaymentaccept`, 
-- `is_homedeliveryaccept`, `min_orderamount`, `deliveryfee`, `orderdelivery_opentime`, 
-- `orderdelivery_opentime_inhours`, `orderdelivery_closetime`, `orderdelivery_closetime_inhours`, 
-- `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '3', '1', '4', '13', 'Y', 'N', 'N', 'Y', 'Y', NULL, '30.00', NULL, NULL, NULL, NULL, '1', '2016-09-08 00:00:00', NULL, '2016-09-08 22:13:49', 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_DELIVERYLOCATIONDETAILS` 
-- (`id`, `shopstore_id`, `country_id`, `city_id`, `area_id`, `is_preorderaccept`,
--  `is_takeawayorderaccept`, `is_cashondeliveryaccept`, `is_onlinepaymentaccept`, 
-- `is_homedeliveryaccept`, `min_orderamount`, `deliveryfee`, `orderdelivery_opentime`, 
-- `orderdelivery_opentime_inhours`, `orderdelivery_closetime`, `orderdelivery_closetime_inhours`, 
-- `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '3', '1', '4', '14', 'Y', 'N', 'N', 'Y', 'Y', NULL, '30.00', NULL, NULL, NULL, NULL, '1', '2016-09-08 00:00:00', NULL, '2016-09-08 22:13:49', 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_DELIVERYLOCATIONDETAILS` 
-- (`id`, `shopstore_id`, `country_id`, `city_id`, `area_id`, `is_preorderaccept`,
--  `is_takeawayorderaccept`, `is_cashondeliveryaccept`, `is_onlinepaymentaccept`, 
-- `is_homedeliveryaccept`, `min_orderamount`, `deliveryfee`, `orderdelivery_opentime`, 
-- `orderdelivery_opentime_inhours`, `orderdelivery_closetime`, `orderdelivery_closetime_inhours`, 
-- `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '3', '1', '4', '15', 'Y', 'N', 'N', 'Y', 'Y', NULL, '30.00', NULL, NULL, NULL, NULL, '1', '2016-09-08 00:00:00', NULL, '2016-09-08 22:13:49', 'A');
-- 
-- INSERT INTO `DESSERTSKHAZANA`.`DK_SHOPSTORE_DELIVERYLOCATIONDETAILS` 
-- (`id`, `shopstore_id`, `country_id`, `city_id`, `area_id`, `is_preorderaccept`,
--  `is_takeawayorderaccept`, `is_cashondeliveryaccept`, `is_onlinepaymentaccept`, 
-- `is_homedeliveryaccept`, `min_orderamount`, `deliveryfee`, `orderdelivery_opentime`, 
-- `orderdelivery_opentime_inhours`, `orderdelivery_closetime`, `orderdelivery_closetime_inhours`, 
-- `created_by`, `created_datedtime`, `updated_by`, `updated_datedtime`, `status`) 
-- VALUES (NULL, '3', '1', '4', '16', 'Y', 'N', 'N', 'Y', 'Y', NULL, '30.00', NULL, NULL, NULL, NULL, '1', '2016-09-08 00:00:00', NULL, '2016-09-08 22:13:49', 'A');
-- 


INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '6', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');


INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '7', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');


INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '8', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');


INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '9', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');

INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '10', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');


INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '11', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');

INSERT INTO `DESSERTSKHAZANA`.`DK_CCA_CONDUCT_PRODUCTTYPE_SHOPSTORE` 
(`id`, `cca_id`, `product_typeid`, `shopstore_ids`, `totalstores`, `created_by`, `created_datedtime`, 
`updated_by`, `updated_datedtime`, `status`) 
VALUES (NULL, '12', '2', '3', '1', '1', '2016-09-08 00:00:00', NULL, '2016-09-08 23:16:30', 'A');














