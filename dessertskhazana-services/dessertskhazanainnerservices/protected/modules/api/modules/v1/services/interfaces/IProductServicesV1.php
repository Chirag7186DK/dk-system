<?php

/**
* @author CJ defined this function 2016-06-06
*/

interface IProductServicesV1{
    public function getDeliveryAreaBasedDessertsTypeList($dkInDtoArray);
    public function getProductTypeAllProductCategoryDetails($dkInDtoArray);
    public function getProductTypeProductCategoryFilterTypeList();
    public function getProductTypeProductCategoryAllProductDetails($dkInDtoArray);
    public function getProductTypeProductCategoryProductDetails($dkInDtoArray);
    public function getProductTypeProductCategoryProductDescriptionDetails($dkInDtoArray);
}
