<?php

/**
* @author CJ defined this function 2016-06-24
*/

interface IShopStoreServicesV1{
    public function getDeliveryAreaBasedDessertTypeStoresList($dkInDtoArray);
    public function getDeliveryAreaBasedCStoreConductDessertType($dkInDtoArray);
    public function getCShopStoreSummaryInfo($dkInDtoArray);
    public function getCshopstoreWorkingstyleDetails($dkInDtoArray);
    public function getStoreDeliveryFeeApplicableOnDeliveryArea($dkInDtoArray);
}
