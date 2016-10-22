<?php

/**
* @author CJ defined this function 2016-06-24
*/

interface IStoreServicesV1{
    public function getStoreListDeliveryAreaBasedDessertType($dkInDtoArray);
    public function getDeliveryAreaBasedStoresConductDessertType($dkInDtoArray);
    public function getStoreSummaryInfo($dkInDtoArray);
    public function getStoreWorkingstyleDetails($dkInDtoArray);
    public function getStoreDeliveryFeeApplicableOnDeliveryArea($dkInDtoArray);
}
