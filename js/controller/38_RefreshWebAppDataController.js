
angular.module('DKAPP').controller('RefreshWebAppDataController', RefreshWebAppDataController);

function RefreshWebAppDataController($scope, $rootScope, $http, UsersServices, OrderCartServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            // var userDashboardSummaryDataObj = UsersServices.refreshUserDashboardSummaryDataDetails();
            // var userOrdercartDashboardSummaryDataObj = OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            // var addItemOrdercartDataOBj = OrderCartServices.addProductDataInOrdercartFromSession(false, false, 'session');
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
}
