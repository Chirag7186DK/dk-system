<?php

/**
* @author CJ defined this function 2016-06-06
*/

interface IProductServicesV1{
    public function getDeliveryAreaBasedDessertsTypeList($dessertsKhazanaInDtoArray);
    public function getProductTypeAllProductCategoryDetails($dessertsKhazanaInDtoArray);
    public function getProductTypeProductCategoryAllProductDetails($dessertsKhazanaInDtoArray);
    public function getProductTypeProductCategoryProductDetails($dessertsKhazanaInDtoArray);
    public function getProductTypeProductCategoryProductDescriptionDetails($dessertsKhazanaInDtoArray);
}
