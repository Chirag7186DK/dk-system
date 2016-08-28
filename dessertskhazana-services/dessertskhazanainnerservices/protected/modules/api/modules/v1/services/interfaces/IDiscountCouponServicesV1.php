<?php

/**
* @author CJ defined this function 2016-08-13
*/

interface IDiscountCouponServicesV1{
    public function getUserSharingDiscountCouponList($dkParamDataArr);
    public function getUserSharedDiscountCouponList($dkParamDataArr);
    public function addSharingOffersFrmOneUserToOtherUser($dkParamDataArr);
}
