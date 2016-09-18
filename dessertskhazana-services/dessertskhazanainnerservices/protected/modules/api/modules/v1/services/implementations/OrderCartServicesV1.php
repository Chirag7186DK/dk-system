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
                    $rspDetails['ordercartRequestedData'] = commonfunction :: getRequestedOrdercartItemDetails($userId);
                    // $rspDetails['ordercartRequestedData'] = false;
                }
                if($ordercartItemListByStatusType=='ZC,ZA'){
                    $rspDetails['ordercartCancelledData'] = commonfunction :: getCancelledOrdercartItemDetails($userId);
                    //$rspDetails['ordercartCancelledData'] = false;
                }
                if($ordercartItemListByStatusType=='all_ordered'){
                    $rspDetails['ordercartOrderedData'] = commonfunction :: getAllOrderedOrdercartItemDetails($userId);
                }
            }
        } 
        return $rspDetails;
    }

    // CJ defined this action 2016-08-14
    public function updateItemDetailsInOrdercart($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isItemUpdatedFromOrdercart'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetching user session data
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                // updating order cart store item details like qty, price etc
                $dkParamDataArr['updated_by'] = $unmd5UserId;
                $retUpdatedDataStatus = OrderCartDao:: updateItemInOrdercart($dkParamDataArr);
                if($retUpdatedDataStatus==true){
                    $rspDetails['isItemUpdatedFromOrdercart'] = 'TRUE';
                    
                    // extract data for order cart store data
                    $ordercartId = $dkParamDataArr['ordercartId'];
                    $ordercartStoreId = $dkParamDataArr['ordercartStoreId'];
                    $storeId = $dkParamDataArr['store_id'];
                    $ccaId = $dkParamDataArr['ccaId'];
                    $storeMinOrderAmt = $dkParamDataArr['minorderamt'];
                    $storeOrderDeliveryFee = $dkParamDataArr['deliveryfee'];
                    
                    // fetching order cart store summary data by giving some param
                    $ordercartStoreDataArr = OrderCartDao :: getRequestedOrdercartStoreSummary($unmd5UserId, $storeId, $ccaId, $ordercartId, $ordercartStoreId);
                    if($ordercartStoreDataArr>0 && $ordercartStoreDataArr!=false){
                        $storeOdrSubTotalAmt = $ordercartStoreDataArr['subtotalOrderAmtNotIncludingDeliveryFee'];
                        $storeOdrTotalAmt = $storeOdrSubTotalAmt;
                        $updateStoreOrderDeliveryFee = $storeOrderDeliveryFee;
                        if($storeOdrSubTotalAmt>0 && $storeMinOrderAmt>0 
                            && $storeOdrSubTotalAmt>=$storeMinOrderAmt){
                            $updateStoreOrderDeliveryFee = '0';
                        }else if($storeOdrSubTotalAmt>0 && $storeMinOrderAmt>0 
                            && $storeOdrSubTotalAmt<$storeMinOrderAmt){
                            $storeOdrTotalAmt = $storeOdrSubTotalAmt + $updateStoreOrderDeliveryFee;
                        }
                        $updateOrdercartStoreDataObj = array(
                            "apply_deliveryfee"=>$updateStoreOrderDeliveryFee, 
                            "subtotalamount"=>$storeOdrSubTotalAmt,
                            "totalamount"=>$storeOdrTotalAmt, 
                            "updated_by"=>$unmd5UserId,
                            "id"=>$ordercartStoreId
                        );
                        // updating order cart store data
                        $updatedStatusOrdrcartStore = OrderCartDao :: updateEntryInOrdercartStore($updateOrdercartStoreDataObj);
                    }
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
            // fetching user session data
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                // updating order cart store item details like qty, price etc
                $dkParamDataArr['updated_by'] = $unmd5UserId;
                $retUpdatedDataStatus = OrderCartDao:: updateItemInOrdercart($dkParamDataArr);
                if($retUpdatedDataStatus==true){
                    $rspDetails['isItemRemovedFromOrdercart'] = 'TRUE';
                    
                    // extract data for order cart store data
                    $ordercartId = $dkParamDataArr['ordercartId'];
                    $ordercartStoreId = $dkParamDataArr['ordercartStoreId'];
                    $storeId = $dkParamDataArr['store_id'];
                    $ccaId = $dkParamDataArr['ccaId'];
                    $storeMinOrderAmt = $dkParamDataArr['minorderamt'];
                    $storeOrderDeliveryFee = $dkParamDataArr['deliveryfee'];
                    
                    // fetching order cart store summary data by giving some param
                    $ordercartStoreDataArr = OrderCartDao :: getRequestedOrdercartStoreSummary($unmd5UserId, $storeId, $ccaId, $ordercartId, $ordercartStoreId);
                    if($ordercartStoreDataArr>0 && $ordercartStoreDataArr!=false){
                        $ordercartItemRequestedCount = $ordercartStoreDataArr['ordercartItemRequestedCount'];
                        $storeOdrSubTotalAmt = $ordercartStoreDataArr['subtotalOrderAmtNotIncludingDeliveryFee'];
                        $storeOdrTotalAmt = $storeOdrSubTotalAmt;
                        $updateStoreOrderDeliveryFee = $storeOrderDeliveryFee;
                        $status = 'R';
                        $reason = '';
                        if($ordercartItemRequestedCount=='' || $ordercartItemRequestedCount<=0){
                            $status = 'ZC';
                            $reason = 'Removed/Deleted by customer';
                        }
                        if($storeOdrSubTotalAmt>0 && $storeMinOrderAmt>0 
                            && $storeOdrSubTotalAmt>=$storeMinOrderAmt){
                            $updateStoreOrderDeliveryFee = '0';
                        }else if($storeOdrSubTotalAmt>0 && $storeMinOrderAmt>0 
                            && $storeOdrSubTotalAmt<$storeMinOrderAmt){
                            $storeOdrTotalAmt = $storeOdrSubTotalAmt + $updateStoreOrderDeliveryFee;
                        }
                        $updateOrdercartStoreDataObj = array(
                            "apply_deliveryfee"=>$updateStoreOrderDeliveryFee, 
                            "subtotalamount"=>$storeOdrSubTotalAmt,
                            "totalamount"=>$storeOdrTotalAmt, 
                            "status"=>$status,
                            "reason"=>$reason,
                            "updated_by"=>$unmd5UserId,
                            "id"=>$ordercartStoreId
                        );
                        // updating order cart store data
                        $updatedStatusOrdrcartStore = OrderCartDao :: updateEntryInOrdercartStore($updateOrdercartStoreDataObj);
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-09-18
    public function getStorewiseOrderSummaryData($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                // detect type of item list to fetch based on status
                $userId = $userSessionDetailsData['unmd5UserId'];
                $rspDetails['storewiseOrderSummaryData'] = commonfunction :: getStorewiseOrderSummaryData($userId);
                // $rspDetails['storewiseOrderSummaryData'] = false;
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-09-05
    public function resetAllItemOrdercart($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isResetAllItemFromOrdercart'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $dkParamDataArr['updated_by'] = $userSessionDetailsData['unmd5UserId'];
//                $retResetDataStatus = OrderCartDao:: resetAllItemOrdercart($dkParamDataArr);
//                if($retResetDataStatus==true){
//                    $rspDetails['isResetAllItemFromOrdercart'] = 'TRUE';
//                }
            }
        } 
        return $rspDetails;
    }
    
}
