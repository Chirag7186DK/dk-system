
(function(){

    angular.module('DKAPP').factory('RatingReviewServices', RatingReviewServices);

    // CJ defined this function 2016-04-22
    function RatingReviewServices(){
        try{

            var ratingReviewDetails = {};

            ratingReviewDetails.getStoreAllUserRatingReviewed = function(apiParamJsonObj){
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreAllUserRating", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                });
                return promiseObject;
            };

            return ratingReviewDetails;

        }catch(ex){
            console.log("problem in Rating/Review services ex=>"+ex);
            return false;
        }
    }

})();