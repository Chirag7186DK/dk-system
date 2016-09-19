<?php

/**
* Description of RatingReviewServicesV1
* @author CJ defined this service 2016-06-06
*/

class RatingReviewServicesV1 implements IRatingReviewServicesV1{
    
    // CJ defined this action 2016-06-06
    public function addUserRatingReviewProduct($dkParamDataArr){
        $rspDetails = array();
        $rspDetails['isUserAddedRatingReviewProduct'] = 'FALSE';
        // checking param data length
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $rspDetails['isUserAddedRatingReviewProduct'] = commonfunction :: addUserRatingReviewProduct($dkParamDataArr);
        }
        return $rspDetails;
    }
    
    // CJ defined this function 2016-06-06
    public function getStoreRatingReviewQuestions($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gStoreId = $dkParamDataArr['shopstoreids'];
            // fetch product review question details
            $storeReviewQuestionDetailsArr = RatingReviewDao :: getRatingReviewQuestionsStore($gStoreId);
            if(count($storeReviewQuestionDetailsArr)>0 && $storeReviewQuestionDetailsArr!=false){
                $rspDetails["isStoreRatingReviewQuestionFound"] = true;
                $rspDetails["storeRatingReviewQuestionDetails"] = $storeReviewQuestionDetailsArr;
            }
        }
        return $rspDetails;
    }

    // CJ defined this function 2016-06-26
    public function getStoreAllUserRating($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gStoreId = $dkParamDataArr['shopstoreids'];
            // fetch avg rating about product by userwise
            $allUserAvgRatedProductDetailsArr = RatingReviewDao :: getUserAvgRatingProductDetails($gStoreId, '');
            if(count($allUserAvgRatedProductDetailsArr)>0 && $allUserAvgRatedProductDetailsArr!=false){
                // sorted on group no
                $sortedOnGroupNoDetailsArr =  utils::arraySort($allUserAvgRatedProductDetailsArr, array("groupNo"));
                if(count($sortedOnGroupNoDetailsArr)>0 && $sortedOnGroupNoDetailsArr!=false){
                    $allUserRatingReviewProductDetailsArr = array();
                    // iterate each group no
                    foreach($sortedOnGroupNoDetailsArr as $groupNo=>$groupDetailsArr){
                        if($groupNo!=''){
                            $shopStoreId = $groupDetailsArr[0]['shopStoreId'];
                            $userId = $groupDetailsArr[0]['userId'];
                            $productListId = $groupDetailsArr[0]['productListId'];
                            // fetch user review details abt product 
                            $retUserReviewedAndRatedAbtProduct = RatingReviewDao::getUserReviewRatingProductDetails($shopStoreId, $productListId, $userId, $groupNo);
                            if(count($retUserReviewedAndRatedAbtProduct)>0 && $retUserReviewedAndRatedAbtProduct!=false){
                                $userNameSplitedOnSpaceArr = str_split($retUserReviewedAndRatedAbtProduct[0]['userName']);
                                array_push($allUserRatingReviewProductDetailsArr, array(
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
                    if(count($allUserRatingReviewProductDetailsArr)>0 && $allUserRatingReviewProductDetailsArr!=false){
                        $rspDetails["allUserRatingReviewDetails"] = $allUserRatingReviewProductDetailsArr;
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
            $gStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            // fetch avg rating about product by userwise
            $allUserAvgRatedProductDetailsArr = RatingReviewDao :: getUserAvgRatingProductDetails($gStoreId, $gproductListId);
            if(count($allUserAvgRatedProductDetailsArr)>0 && $allUserAvgRatedProductDetailsArr!=false){
                // sorted on group no
                $sortedOnGroupNoDetailsArr =  utils::arraySort($allUserAvgRatedProductDetailsArr, array("groupNo"));
                if(count($sortedOnGroupNoDetailsArr)>0 && $sortedOnGroupNoDetailsArr!=false){
                    $allUserRatingReviewProductDetailsArr = array();
                    // iterate each group no
                    foreach($sortedOnGroupNoDetailsArr as $groupNo=>$groupDetailsArr){
                        if($groupNo!=''){
                            $shopStoreId = $groupDetailsArr[0]['shopStoreId'];
                            $userId = $groupDetailsArr[0]['userId'];
                            $productListId = $groupDetailsArr[0]['productListId'];
                            // fetch user review details abt product 
                            $retUserReviewedAndRatedAbtProduct = RatingReviewDao::getUserReviewRatingProductDetails($shopStoreId, $productListId, $userId, $groupNo);
                            if(count($retUserReviewedAndRatedAbtProduct)>0 && $retUserReviewedAndRatedAbtProduct!=false){
                                $userNameSplitedOnSpaceArr = str_split($retUserReviewedAndRatedAbtProduct[0]['userName']);
                                array_push($allUserRatingReviewProductDetailsArr, 
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
                    if(count($allUserRatingReviewProductDetailsArr)>0 && $allUserRatingReviewProductDetailsArr!=false){
                        $rspDetails["allUserRatingReviewProductDetails"] = $allUserRatingReviewProductDetailsArr;
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
            $gStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            // fetch avg rating about product details
            $retAvgRatedAndReviwedByUserAbtProductDetailsArr = RatingReviewDao :: getAvgRatingProductDetails($gStoreId, $gproductListId);
            if(count($retAvgRatedAndReviwedByUserAbtProductDetailsArr)>0 && $retAvgRatedAndReviwedByUserAbtProductDetailsArr!=false){
                $rspDetails["avgRatingReviewedProductDetails"] = array(
                    "isUserRatedAndReviewProduct"=>"true",
                    "totalAvgRatingProduct"=>$retAvgRatedAndReviwedByUserAbtProductDetailsArr[0]['totalAvgRatingProduct'],
                    "totalUserRatingProduct"=>$retAvgRatedAndReviwedByUserAbtProductDetailsArr[0]['totalUserRatingProduct']
                );
            }
        }    
        return $rspDetails;
    }

    // CJ defined this function 2016-06-06
    public function getMaxRatingReviewProduct($dkParamDataArr){
        $rspDetails = array();
        if(count($dkParamDataArr)>0 && $dkParamDataArr!=false){
            $gStoreId = $dkParamDataArr['shopstoreids'];
            $gproductListId = $dkParamDataArr['productlist_ids'];
            $maxRatingAndReviewedTypeDetailsArr = array();
            // fetch max rating & reviewed product details
            $ratingReviewDetailsArr = RatingReviewDao :: getMaxRatingProductDetails($gStoreId, $gproductListId);
            if(count($ratingReviewDetailsArr)>0 && $ratingReviewDetailsArr!=false){
                $sortedOnRatingReviewedTypeQuestionIdsAndUserCountArr = utils::arraySort($ratingReviewDetailsArr, array("questionId", "countUser"));
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
