<?php

/**
* @author CJ defined this function 2016-06-24
*/

interface IStoresServicesV1{
    public function getDeliveryAreaBasedDessertTypeStoresList($dkInDtoArray);
    public function getDeliveryAreaBasedStoresConductDessertType($dkInDtoArray);
    public function getStoreSummaryInfo($dkInDtoArray);
    public function getStoreWorkingstyleDetails($dkInDtoArray);
    public function getStoreDeliveryFeeApplicableOnDeliveryArea($dkInDtoArray);
}
