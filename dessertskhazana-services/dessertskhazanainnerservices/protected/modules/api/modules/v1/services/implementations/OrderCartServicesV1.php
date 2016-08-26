<?php

/**
* Description of OrderCartServicesV1
* @author CJ defined this service 2016-08-06
*/

class OrderCartServicesV1 implements IOrderCartServicesV1{
    
    // CJ defined this action 2016-08-14
    public function getUserOrdercartDashboardSummaryData($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['orderCartDashboardSummary'] = array(
            "ordercartCount"=>0, 
            "ordercartItemRequestedCount"=>0,
            "subtotalOrderAmt"=>0
        );
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $userId = $userSessionDetailsData['unmd5UserId'];
                // fetch order cart item summary data
                $odrCartDashboardSummaryDataArr = OrderCartDao::getRequestedOrdercartSummary($userId);
                if(count($odrCartDashboardSummaryDataArr)>0 && $odrCartDashboardSummaryDataArr!=false){
                    $rspDetails['orderCartDashboardSummary'] = $odrCartDashboardSummaryDataArr;
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-06
    public function addProductDataInOrdercart($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rspDetails['isProductAddedInOrdercart'] = commonfunction :: prepareProductDataAndAddInOrderCart($dkParamDataArr);
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-14
    public function getOrdercartItemDetails($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                // detect type of item list to fetch based on status
                $ordercartItemListByStatusType = $dkParamDataArr['ordercartItemListByStatusType'];
                $userId = $userSessionDetailsData['unmd5UserId'];
                if($ordercartItemListByStatusType=='R'){
                    $rspDetails['ordercartAllItemDetails'] = commonfunction :: getRequestedOrdercartItemDetails($userId);
                }
                if($ordercartItemListByStatusType=='ZC,ZA'){
                    $rspDetails['ordercartAllItemDetails'] = commonfunction :: getCancelledOrdercartItemDetails($userId);
                }
                if($ordercartItemListByStatusType=='all_ordered'){
                    $rspDetails['ordercartAllItemDetails'] = commonfunction :: getAllOrderedOrdercartItemDetails($userId);
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this action 2016-08-14
    public function updateItemDetailsFromOrdercart($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isItemUpdatedFromOrdercart'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
                $retUpdatedDataStatus = OrderCartDao:: updateItemInOrdercart($dkParamDataArr);
                if($retUpdatedDataStatus==true){
                    $rspDetails['isItemUpdatedFromOrdercart'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
    
    // CJ defined this action 2016-08-14
    public function removeItemDetailsFromOrdercart($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isItemRemovedFromOrdercart'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
                $retRemovedDataStatus = OrderCartDao:: updateItemInOrdercart($dkParamDataArr);
                if($retRemovedDataStatus==true){
                    $rspDetails['isItemRemovedFromOrdercart'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
}
