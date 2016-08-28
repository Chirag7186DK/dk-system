
// RefreshWebAppDataController
app.controller('RefreshWebAppDataController', function($scope, $rootScope, $http, UsersServices, OrderCartServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            var retUserDashboardSummaryDataObj = UsersServices.refreshUserDashboardSummaryDataDetails();
            var retUserOrdercartDashboardSummaryDataObj = OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            var retAddItemOrdercartDataOBj = OrderCartServices.addProductDataInOrdercartFromSession(false, false, 'session');
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
});
