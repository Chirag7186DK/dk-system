
angular.module('DKAPP').factory('RatingReviewServices', RatingReviewServices);

// CJ defined this function 2016-04-22
function RatingReviewServices($http, $q){
    try{
        var ratingReviewDetails = {};
        
        ratingReviewDetails.addRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/UserRatingReviewProduct", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getShopStoreRatingReviewQuestionsAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/ManageShopStoreRatingReviewQuestionsAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getShopStoreAllUserRatingReviewed = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/ShopStoreAllUserRating", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getAllUserRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AllUserRatingReviewAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getMaxRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/MaxRatingReviewAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        ratingReviewDetails.getAverageRatingReviewAboutProduct = function(preparedParamJsonObj){
            var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AverageRatingReviewAboutProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){});
            return promiseObject;
        };
        return ratingReviewDetails;
    }catch(ex){
        console.log("problem in Rating/Review services ex=>"+ex);
        return false;
    }
}
