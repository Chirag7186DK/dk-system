<?php

/**
* Description of WishListServicesV1
* @author CJ defined this service 2016-08-01
*/

class WishListServicesV1 implements IWishListServicesV1{
    
    // CJ defined this action 2016-07-30 //done
    public function createUserWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isUWLCreated'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                // create wish list
                $dkParamDataArr['created_by'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['userLoggedId'] = $userSessionDetailsData['unmd5UserId'];
                $dkParamDataArr['userProfileTypeId'] = $userSessionDetailsData['unmd5ProfileTypeId'];
                $retLastInsertedWishListId = WishListDao :: createUserWL($dkParamDataArr);
                if($retLastInsertedWishListId>0 && $retLastInsertedWishListId!=false){
                    $rspDetails['isUWLCreated'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-07-30
    public function getUserWL($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            // fetch temp user data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                // fetch user wish list
                $userWLParamData = array();
                $userWLParamData['user_id'] = $userSessionDetailsData['unmd5UserId'];
                $retUserWishListDetailsArr = WishListDao::getUserWLDetails($userWLParamData);
                if(count($retUserWishListDetailsArr)>0 && $retUserWishListDetailsArr!=false){
                    $rspDetails['userAllWL'] = $retUserWishListDetailsArr;
                }  
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-07-31
    public function deleteUserWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isUWLRemoved'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $retStatusWishListRemoved = WishListDao :: updateUWL($dkParamDataArr);
            if($retStatusWishListRemoved==true){
                $rspDetails['isUWLRemoved'] = 'TRUE';
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-02
    public function updateUWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isUWLUpdated'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $retStatusWishListUpdated = WishListDao :: updateUWL($dkParamDataArr);
            if($retStatusWishListUpdated==true){
            }
            $rspDetails['isUWLUpdated'] = 'TRUE';
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-02
    public function getUserAllWLWiseItemDetails($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            // fetch temp user data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $uwlParamData = array();
                $uwlParamData['userLoggedId'] = $userSessionDetailsData['userId'];
                $collectedDataArr = commonfunction :: collectDataForUserAllWLWiseItemDetails($uwlParamData);
                if(count($collectedDataArr)>0 && $collectedDataArr!=false){
                    $rspDetails['userAllWLWiseItemDetails'] = $collectedDataArr;
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-02
    public function moveProductFromUWLToUWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isProductMovedFromUWLToUWL'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            $moveItemToWishListMd5Id = $dkParamDataArr['moveItemToWishListId'];
            // fetch unmd5 user data 
            $unmd5UserDataArr = UsersDao :: getUserDetails($dkParamDataArr);
            // fetch unmd5 user wish list data
            $unmd5UserWishListDataArr = WishListDao :: getUserWLDetails(array("wishListId"=>$moveItemToWishListMd5Id));
            if(count($unmd5UserDataArr)==1 && count($unmd5UserWishListDataArr)==1){
                $toMoveItemWishListDetailsArr = array();
                $toMoveItemWishListDetailsArr['moveItemFromWishListId'] = $dkParamDataArr['moveItemFromWishListId'];
                $toMoveItemWishListDetailsArr['moveItemToWishListId'] = $unmd5UserWishListDataArr[0]['unMd5WLId'];
                $toMoveItemWishListDetailsArr['moveWishListItemId'] = $dkParamDataArr['moveWishListItemId'];
                $toMoveItemWishListDetailsArr['updated_by'] = $unmd5UserDataArr[0]['unmd5UserId'];
                $retStatusProductMovedToWishList = WishListDao :: moveProductFromUWLToUWL($toMoveItemWishListDetailsArr);
                if($retStatusProductMovedToWishList==true){
                    $rspDetails['isProductMovedFromUWLToUWL'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-02
    public function removeProductFromUWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isProductRemovedFromUWL'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            // fetch unmd5 user data 
            $retUnMd5UserDataArr = UsersDao :: getUserDetails($dkParamDataArr);
            if(count($retUnMd5UserDataArr)==1 && $retUnMd5UserDataArr!=false){
                $toDeleteItemWishListDetailsArr = array();
                $toDeleteItemWishListDetailsArr['updated_by'] = $retUnMd5UserDataArr[0]['unmd5UserId'];
                $toDeleteItemWishListDetailsArr['wishListItemId'] = $dkParamDataArr['wishListItemId'];
                $retStatusProductDeleted = WishListDao :: removeProductFromUWL($toDeleteItemWishListDetailsArr);
                if($retStatusProductDeleted==true){
                    $rspDetails['isProductRemovedFromUWL'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-07-30
    public function getUWLItemBySearchParam($dkParamDataArr){
        $rspDetails = array();
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            // show wish list by users detected
            if($dkParamDataArr['wishlistby']=='users'){
                // fetch summary wise
                $allUserWiseWLSummaryDetailsArr = commonfunction :: preparedAllUserwiseWLSummaryData($dkParamDataArr);
                if(count($allUserWiseWLSummaryDetailsArr)>0 && $allUserWiseWLSummaryDetailsArr!=false){
                    $rspDetails['searchedAllUserwiseWLSummary'] = $allUserWiseWLSummaryDetailsArr;
                }
            }else if($dkParamDataArr['wishlistby']=='item'){
                $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
                if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                    $dkParamDataArr['userLoggedId'] = $userSessionDetailsData['userId'];
                    $collectedDataArr = commonfunction :: collectDataForUserAllWLWiseItemDetails($dkParamDataArr, 'Y');
                    if(count($collectedDataArr)>0 && $collectedDataArr!=false){
                        $rspDetails['searchedUserwiseWLAllItem'] = $collectedDataArr;
                    }
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-02
    public function copyProductFromUWLToUWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isProductCopiedFromUWLToUWL'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            $loggedUserWLId = '';
            $createdBy = '';
            $wlItemMd5Id = $dkParamDataArr['copyWishListItemId'];
            $wlMd5Id = $dkParamDataArr['copyItemFromWishListId'];
            // fetch unmd5 user only wish list data
            $copyItemToWishListMd5Id = $dkParamDataArr['copyItemToWishListId'];
            $unmd5UserWishListDataArr = WishListDao :: getUserWLDetails(array("wishListId"=>$copyItemToWishListMd5Id));
            if(count($unmd5UserWishListDataArr)==1 && $unmd5UserWishListDataArr!=false){
                $loggedUserWLId = $unmd5UserWishListDataArr[0]['unMd5WLId'];
            }
            // fetch unmd5 user data 
            $unmd5UserDataArr = UsersDao :: getUserDetails($dkParamDataArr);
            if(count($unmd5UserDataArr)==1 && $unmd5UserDataArr!=false){
                $createdBy = $unmd5UserDataArr[0]['unmd5UserId'];
            }
            // fetch to copy item details from othr wish list
            $wlItemDetailsArr = WishListDao :: getUserAllWLWiseItemDetails(
                array(
                    "wishListId"=>$wlMd5Id,
                    "wishListItemId"=>$wlItemMd5Id
                )    
            );
            if(count($wlItemDetailsArr)==1 && $wlItemDetailsArr!=false
                && $loggedUserWLId>0  && $createdBy>0){
                $addWLItemDataParamDetails = array();
                $addWLItemDataParamDetails['wishlist_id'] = $loggedUserWLId;
                $addWLItemDataParamDetails['shopstore_id'] = $wlItemDetailsArr[0]['unMd5ShopStoreId'];
                $addWLItemDataParamDetails['product_typeid'] = $wlItemDetailsArr[0]['unMd5ProductTypeId'];
                $addWLItemDataParamDetails['product_categoryid'] = $wlItemDetailsArr[0]['unMD5ProductCateogoryId'];
                $addWLItemDataParamDetails['product_listid'] = $wlItemDetailsArr[0]['unMD5ProductListId'];
                $addWLItemDataParamDetails['product_featureid'] = $wlItemDetailsArr[0]['unMd5ProductFeatureId'];
                $addWLItemDataParamDetails['created_by'] = $createdBy;
                $lastWLProductAddedInsertedId = WishListDao :: addProductToWishList($addWLItemDataParamDetails);
                if($lastWLProductAddedInsertedId>0 && $lastWLProductAddedInsertedId!=false){
                    $rspDetails['isProductCopiedFromUWLToUWL'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-05
    public function addProductToUWL($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isProductAddedUWL'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            $toAddWishDataArr = array();
            $retUnMd5DataOfGivenProductDetailsArr = ProductDao :: getUnMd5DataOfGivenProductDetails($dkParamDataArr);
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            $defaultUWLSettingsArr = commonfunction :: collectDataForUserWLDefaultSettingsId($userSessionDetailsData['userId']);
            if(count($retUnMd5DataOfGivenProductDetailsArr)==1 && $retUnMd5DataOfGivenProductDetailsArr!=false
                && count($userSessionDetailsData)>0 && $userSessionDetailsData!=false
                && count($defaultUWLSettingsArr)>0 && $defaultUWLSettingsArr!=false){
                $toAddWishDataArr['wishlist_id'] = $defaultUWLSettingsArr['defaultUnMd5UWLSettingsId'];
                $toAddWishDataArr['shopstore_id'] = $retUnMd5DataOfGivenProductDetailsArr[0]['shopStoreId'];
                $toAddWishDataArr['product_typeid'] = $retUnMd5DataOfGivenProductDetailsArr[0]['productTypeId'];
                $toAddWishDataArr['product_categoryid'] = $retUnMd5DataOfGivenProductDetailsArr[0]['productTypeProductCategoryId'];
                $toAddWishDataArr['product_listid'] = $retUnMd5DataOfGivenProductDetailsArr[0]['productListId'];
                $toAddWishDataArr['product_featureid'] = $retUnMd5DataOfGivenProductDetailsArr[0]['productFeatureId'];
                $toAddWishDataArr['created_by'] = $userSessionDetailsData['unmd5UserId'];
                // adding in db
                $retLastInsertedProductToWishListItemId = WishListDao :: addProductToUWL($toAddWishDataArr);
                if($retLastInsertedProductToWishListItemId>0 && $retLastInsertedProductToWishListItemId!=false){
                    $rspDetails['isProductAddedUWL'] = 'TRUE';
                }
            }
        } 
        return $rspDetails;
    }
    
    // CJ defined this action 2016-08-15
    public function getUserWLDashboardSummary($dkParamDataArr){
        $rspDetails = array("wlDashboardSummary"=>array());
        $rspDetails['wlDashboardSummary']['wlCount'] = 0;
        $rspDetails['wlDashboardSummary']['wlmCount'] = 0;
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!='' && $dkParamDataArr!=false){
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($dkParamDataArr);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unMd5UserId = $userSessionDetailsData['unmd5UserId'];
                // fetch user wish list count summary
                $wlCountSummaryJsonData = commonfunction :: collectDataForWLCountSummary($unMd5UserId);
                if(count($wlCountSummaryJsonData)>0 && $wlCountSummaryJsonData!=false){
                    $rspDetails['wlDashboardSummary']['wlCount'] = $wlCountSummaryJsonData['wlCount'];
                }
                // fetch user wish list item count summary
                $wlItemCountSummaryJsonData = commonfunction :: collectDataForWLItemCountSummary($unMd5UserId);
                if(count($wlItemCountSummaryJsonData)>0 && $wlItemCountSummaryJsonData!=false){
                    $rspDetails['wlDashboardSummary']['wlmCount'] = $wlItemCountSummaryJsonData['wlmCount'];
                }
            }
        } 
        return $rspDetails;
    }
    
}
