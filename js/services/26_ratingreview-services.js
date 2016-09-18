
(function(){

    angular.module('DKAPP').factory('RatingReviewServices', RatingReviewServices);

    // CJ defined this function 2016-04-22
    function RatingReviewServices($http, $q){
        try{

            var ratingReviewDetails = {};

            ratingReviewDetails.addUserRatingReviewProduct = function(preparedParamJsonObj){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/UserRatingReviewProduct", 'apiFile', 'POST', '', preparedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getStoreRatingReviewQuestions = function(preparedParamJsonObj){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreRatingReviewQuestions", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('show');
                });
                return promiseObject;
            };

            ratingReviewDetails.getStoreAllUserRatingReviewed = function(preparedParamJsonObj){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreAllUserRating", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getAllUserRatingReviewProduct = function(preparedParamJsonObj){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AllUserRatingReviewProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getMaxRatingReviewProduct = function(preparedParamJsonObj){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/MaxRatingReviewProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getAverageRatingReviewProduct = function(preparedParamJsonObj){
                var jsonParamBlockUIObject = {};
                jsonParamBlockUIObject['css'] = {"padding":10};
                jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', jsonParamBlockUIObject);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AverageRatingReviewProduct", 'apiFile', 'GET', '', preparedParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
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