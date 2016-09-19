
angular.module('DKAPP').controller('RefreshWebAppDataController', RefreshWebAppDataController);

function RefreshWebAppDataController($rootScope, UsersServices, OrderCartServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            UsersServices.refreshUserDashboardSummaryDataDetails();
            OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            OrderCartServices.addProductDataInOrdercartFromSession(false, 'session');
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
}
