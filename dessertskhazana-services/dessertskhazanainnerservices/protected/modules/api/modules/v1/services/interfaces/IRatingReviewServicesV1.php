<?php

/**
* @author CJ defined this function 2016-06-06
*/

interface IRatingReviewServicesV1{
    public function addUserRatingReviewProduct($dessertskhazanaInDtoArray);
    public function getStoreRatingReviewQuestions($dessertskhazanaInDtoArray);
    public function getStoreAllUserRating($dessertskhazanaInDtoArray);
    public function getAllUserRatingReviewProduct($dessertskhazanaInDtoArray);
    public function getAverageRatingReviewProduct($dessertskhazanaInDtoArray);
    public function getMaxRatingReviewProduct($dessertskhazanaInDtoArray);
}
