
(function(){

    angular.module('DKAPP').factory('RatingReviewServices', RatingReviewServices);

    // CJ defined this function 2016-04-22
    function RatingReviewServices(LoaderServices){
        try{

            var ratingReviewDetails = {};

            ratingReviewDetails.addUserRatingReviewProduct = function(apiParamJsonObj){
                LoaderServices.showLoader();
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/UserRatingReviewProduct", 'apiFile', 'POST', '', apiParamJsonObj).done(function(retResponseJson){
                    LoaderServices.hideLoader();
                });
                return promiseObject;
            };

            ratingReviewDetails.getStoreRatingReviewQuestions = function(apiParamJsonObj){
                LoaderServices.showLoader();
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreRatingReviewQuestions", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    LoaderServices.hideLoader();
                });
                return promiseObject;
            };

            ratingReviewDetails.getStoreAllUserRatingReviewed = function(apiParamJsonObj){
                LoaderServices.showLoader();
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreAllUserRating", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    LoaderServices.hideLoader();
                });
                return promiseObject;
            };

            ratingReviewDetails.getAllUserRatingReviewProduct = function(apiParamJsonObj){
                LoaderServices.showLoader();
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AllUserRatingReviewProduct", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    LoaderServices.hideLoader();
                });
                return promiseObject;
            };

            ratingReviewDetails.getMaxRatingReviewProduct = function(apiParamJsonObj){
                LoaderServices.showLoader();
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/MaxRatingReviewProduct", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    LoaderServices.hideLoader();
                });
                return promiseObject;
            };

            ratingReviewDetails.getAverageRatingReviewProduct = function(apiParamJsonObj){
                LoaderServices.showLoader();
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AverageRatingReviewProduct", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    LoaderServices.hideLoader();
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