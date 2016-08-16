<?php

/**
* @author CJ defined this function 2016-08-01
*/

interface IWishListServicesV1{
    public function createUserWL($dkInDtoArray);
    public function getUserWL($dkInDtoArray);
    public function deleteUserWL($dkInDtoArray);
    public function updateUWL($dkInDtoArray);
    public function getUserAllWLWiseItemDetails($dkInDtoArray);
    public function moveProductFromUWLToUWL($dkInDtoArray);
    public function removeProductFromUWL($dkInDtoArray);
    public function getUWLItemBySearchParam($dkInDtoArray);
    public function copyProductFromUWLToUWL($dkInDtoArray);
    public function addProductToUWL($dkInDtoArray);
    public function getUserWLDashboardSummary($dkInDtoArray);
}
