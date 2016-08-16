<?php

/**
* @author CJ defined this function 2016-08-06
*/

interface IOrderCartServicesV1{
    public function getUserOrdercartDashboardSummaryData($dkInDtoArray);
    public function addProductDataInOrdercart($dkInDtoArray);
    public function getOrdercartItemDetails($dkInDtoArray);
    public function removeItemDetailsFromOrdercart($dkInDtoArray);
    public function updateItemDetailsFromOrdercart($dkInDtoArray);
}
