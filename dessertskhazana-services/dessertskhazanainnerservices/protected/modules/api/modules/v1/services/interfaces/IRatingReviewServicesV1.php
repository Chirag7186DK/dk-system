<?php

/**
* @author CJ defined this function 2016-06-06
*/

interface IRatingReviewServicesV1{
    public function addUserRatingReviewProduct($dessertskhazanaInDtoArray);
    public function getStoreRatingReviewQuestions($dessertskhazanaInDtoArray);
    public function getShopStoreAllUserRating($dessertskhazanaInDtoArray);
    public function getAllUserRatingReviewAboutProduct($dessertskhazanaInDtoArray);
    public function getAverageRatingReviewAboutProduct($dessertskhazanaInDtoArray);
    public function getMaxRatingReviewAboutProduct($dessertskhazanaInDtoArray);
}
