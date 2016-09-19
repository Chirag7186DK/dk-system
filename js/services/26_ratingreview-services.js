
(function(){

    angular.module('DKAPP').factory('RatingReviewServices', RatingReviewServices);

    // CJ defined this function 2016-04-22
    function RatingReviewServices(){
        try{

            var ratingReviewDetails = {};

            ratingReviewDetails.addUserRatingReviewProduct = function(apiParamJsonObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/UserRatingReviewProduct", 'apiFile', 'POST', '', apiParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getStoreRatingReviewQuestions = function(apiParamJsonObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreRatingReviewQuestions", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('show');
                });
                return promiseObject;
            };

            ratingReviewDetails.getStoreAllUserRatingReviewed = function(apiParamJsonObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/StoreAllUserRating", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getAllUserRatingReviewProduct = function(apiParamJsonObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AllUserRatingReviewProduct", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getMaxRatingReviewProduct = function(apiParamJsonObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/MaxRatingReviewProduct", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
                    showHideLoaderBox('hide');
                });
                return promiseObject;
            };

            ratingReviewDetails.getAverageRatingReviewProduct = function(apiParamJsonObj){
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10};
                blockUIObj['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                showHideLoaderBox('show', blockUIObj);
                var promiseObject  = communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/RatingReview/AverageRatingReviewProduct", 'apiFile', 'GET', '', apiParamJsonObj).done(function(retResponseJson){
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