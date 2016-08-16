<?php

/**
* @author CJ defined this function 2016-06-24
*/

interface IShopStoreServicesV1{
    public function getCShopStoreSummaryInfo($dkInDtoArray);
    public function getCShopStoreProductTypeProductCategoryAllProductDetails($dkInDtoArray);
    public function getCshopstoreWorkingstyleDetails($dkInDtoArray);
    public function getCshopstoreProductdeliveryAreaInfo($dkInDtoArray);
}
