<?php

/**
* Description of RatingReviewServicesV1
* @author CJ defined this service 2016-06-06
*/

class RatingReviewServicesV1 implements IRatingReviewServicesV1{
    
    // CJ defined this action 2016-06-06
    public function addUserRatingReviewProduct($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isAddedReviewRatingAbouProduct'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rspDetails['isAddedReviewRatingAbouProduct'] = commonfunction :: addUserRatingReviewProduct($dkParamDataArr);
        }
        return $rspDetails;
    }
    
    // CJ defined this function 2016-06-06
    public function getStoreRatingReviewQuestions($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gShopStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            // fetch product review question details
            $retProductReviewQuestionDetailsArr = RatingReviewDao :: getRatingReviewQuestionsStore($gShopStoreId);
            if(count($retProductReviewQuestionDetailsArr)>0 && $retProductReviewQuestionDetailsArr!=false){
                $rspDetails["isRatingReviewQuestionDetailsFound"] = true;
                $rspDetails["ratingReviewQuestionAboutProductByShopStoresDetails"] = $retProductReviewQuestionDetailsArr;
            }
        }
        return $rspDetails;
    }

    // CJ defined this function 2016-06-26
    public function getStoreAllUserRating($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gShopStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = '';
            // fetch avg rating about product by userwise
            $retAllUserAvgRatedAbtProductDetailsArr = RatingReviewDao :: getUserAvgRatingAboutProductDetails($gShopStoreId, $gproductListId);
            if(count($retAllUserAvgRatedAbtProductDetailsArr)>0 && $retAllUserAvgRatedAbtProductDetailsArr!=false){
                // sorted on group no
                $sortedOnGroupNoDetailsArr =  utils::arraySort($retAllUserAvgRatedAbtProductDetailsArr, array("groupNo"));
                if(count($sortedOnGroupNoDetailsArr)>0 && $sortedOnGroupNoDetailsArr!=false){
                    $allUserRatingReviewAbtProductDetailsArr = array();
                    // iterate each group no
                    foreach($sortedOnGroupNoDetailsArr as $groupNo=>$groupDetailsArr){
                        if($groupNo!=''){
                            $shopStoreId = $groupDetailsArr[0]['shopStoreId'];
                            $userId = $groupDetailsArr[0]['userId'];
                            $productListId = $groupDetailsArr[0]['productListId'];
                            // fetch user review details abt product 
                            $retUserReviewedAndRatedAbtProduct = RatingReviewDao::getUserReviewAndRatingAboutProductDetails($shopStoreId, $productListId, $userId, $groupNo);
                            if(count($retUserReviewedAndRatedAbtProduct)>0 && $retUserReviewedAndRatedAbtProduct!=false){
                                $userNameSplitedOnSpaceArr = str_split($retUserReviewedAndRatedAbtProduct[0]['userName']);
                                array_push($allUserRatingReviewAbtProductDetailsArr, array(
                                       "userNameIntialLetter"=>$userNameSplitedOnSpaceArr[0],
                                       "userName"=>ucwords($retUserReviewedAndRatedAbtProduct[0]['userName']),
                                       "avgRated"=>$groupDetailsArr[0]['avgRatingByUser'],
                                       "dated"=>$retUserReviewedAndRatedAbtProduct[0]['updatedDate'],
                                       "allRatingReviewTypeDetails"=>$retUserReviewedAndRatedAbtProduct
                                    )
                                );
                            }
                        }
                    }
                    // final checking 
                    if(count($allUserRatingReviewAbtProductDetailsArr)>0 && $allUserRatingReviewAbtProductDetailsArr!=false){
                        $rspDetails["allUserRatingReviewAbtProductDetails"] = $allUserRatingReviewAbtProductDetailsArr;
                    }
                }
            }
        }    
        return $rspDetails;
    }

    // CJ defined this function 2016-06-06
    public function getAllUserRatingReviewProduct($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gShopStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            // fetch avg rating about product by userwise
            $retAllUserAvgRatedAbtProductDetailsArr = RatingReviewDao :: getUserAvgRatingAboutProductDetails($gShopStoreId, $gproductListId);
            if(count($retAllUserAvgRatedAbtProductDetailsArr)>0 && $retAllUserAvgRatedAbtProductDetailsArr!=false){
                // sorted on group no
                $sortedOnGroupNoDetailsArr =  utils::arraySort($retAllUserAvgRatedAbtProductDetailsArr, array("groupNo"));
                if(count($sortedOnGroupNoDetailsArr)>0 && $sortedOnGroupNoDetailsArr!=false){
                    $allUserRatingReviewAbtProductDetailsArr = array();
                    // iterate each group no
                    foreach($sortedOnGroupNoDetailsArr as $groupNo=>$groupDetailsArr){
                        if($groupNo!=''){
                            $shopStoreId = $groupDetailsArr[0]['shopStoreId'];
                            $userId = $groupDetailsArr[0]['userId'];
                            $productListId = $groupDetailsArr[0]['productListId'];
                            // fetch user review details abt product 
                            $retUserReviewedAndRatedAbtProduct = RatingReviewDao::getUserReviewAndRatingAboutProductDetails($shopStoreId, $productListId, $userId, $groupNo);
                            if(count($retUserReviewedAndRatedAbtProduct)>0 && $retUserReviewedAndRatedAbtProduct!=false){
                                $userNameSplitedOnSpaceArr = str_split($retUserReviewedAndRatedAbtProduct[0]['userName']);
                                array_push($allUserRatingReviewAbtProductDetailsArr, 
                                    array(
                                       "userNameIntialLetter"=>$userNameSplitedOnSpaceArr[0],
                                       "userName"=>ucwords($retUserReviewedAndRatedAbtProduct[0]['userName']),
                                       "avgRated"=>$groupDetailsArr[0]['avgRatingByUser'],
                                       "dated"=>$retUserReviewedAndRatedAbtProduct[0]['updatedDate'],
                                       "allRatingReviewTypeDetails"=>$retUserReviewedAndRatedAbtProduct
                                    )
                                );
                            }
                        }
                    }
                    // final checking 
                    if(count($allUserRatingReviewAbtProductDetailsArr)>0 && $allUserRatingReviewAbtProductDetailsArr!=false){
                        $rspDetails["allUserRatingReviewAbtProductDetails"] = $allUserRatingReviewAbtProductDetailsArr;
                    }
                }
            }
        }    
        return $rspDetails;
    }

    // CJ defined this function 2016-06-06
    public function getAverageRatingReviewProduct($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gShopStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            // fetch avg rating about product details
            $retAvgRatedAndReviwedByUserAbtProductDetailsArr = RatingReviewDao :: getAvgRatingAboutProductDetails($gShopStoreId, $gproductListId);
            if(count($retAvgRatedAndReviwedByUserAbtProductDetailsArr)>0 && $retAvgRatedAndReviwedByUserAbtProductDetailsArr!=false){
                $rspDetails["avgRatingReviewedAboutProductDetails"] = array(
                    "isUserRatedAndReviewAbtProduct"=>"true",
                    "totalAvgRatingAbtProduct"=>$retAvgRatedAndReviwedByUserAbtProductDetailsArr[0]['totalAvgRatingAbtProduct'],
                    "totalUserRatingAbtProduct"=>$retAvgRatedAndReviwedByUserAbtProductDetailsArr[0]['totalUserRatingAbtProduct']
                );
            }
        }    
        return $rspDetails;
    }

    // CJ defined this function 2016-06-06
    public function getMaxRatingReviewProduct($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gShopStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            $maxRatingAndReviewedTypeDetailsArr = array();
            // fetch max rating & reviewed about product details
            $retRatingReviewDetailsArr = RatingReviewDao :: getMaxRatingAboutProductDetails($gShopStoreId, $gproductListId);
            if(count($retRatingReviewDetailsArr)>0 && $retRatingReviewDetailsArr!=false){
                $sortedOnRatingReviewedTypeQuestionIdsAndUserCountArr = utils::arraySort($retRatingReviewDetailsArr, array("questionId", "countUser"));
                if(count($sortedOnRatingReviewedTypeQuestionIdsAndUserCountArr)>0 && $sortedOnRatingReviewedTypeQuestionIdsAndUserCountArr!=false){
                    //iterate to get max rating and count of user of each rating and reviewed type question ka
                    foreach($sortedOnRatingReviewedTypeQuestionIdsAndUserCountArr as $eachQuestionId=>$userCountBasedOnGivenRatingDetailsArr){
                        if(count($userCountBasedOnGivenRatingDetailsArr)>0 && $userCountBasedOnGivenRatingDetailsArr!=false){
                            $userCount = max(array_keys($userCountBasedOnGivenRatingDetailsArr));
                            if(count($userCount)>0 && $userCount!=false){
                                array_push($maxRatingAndReviewedTypeDetailsArr, 
                                    array(
                                        "ratingQuestionTitle"=>  strtoupper($userCountBasedOnGivenRatingDetailsArr[$userCount][0]['questionTitle']),
                                        "userCount"=>$userCountBasedOnGivenRatingDetailsArr[$userCount][0]['countUser'],
                                        "maxRating"=>$userCountBasedOnGivenRatingDetailsArr[$userCount][0]['givenMaxAnswerPoints']
                                    )
                                );
                            }
                        }
                    }
                }
                $rspDetails["isMaxRatingAndReviewedDetailsFound"] = true;
                $rspDetails["maxRatingAndReviewedTypeDetails"] = $maxRatingAndReviewedTypeDetailsArr;
            }
        }    
        return $rspDetails;
    }

}
