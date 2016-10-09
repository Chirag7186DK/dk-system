
angular.module('DKAPP').controller('RefreshWebAppDataController', RefreshWebAppDataController);

function RefreshWebAppDataController($rootScope, UsersServices, CommonServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            UsersServices.refreshUserDashboardSummaryDataDetails();
            CommonServices.refreshUserOrdercartDashboardSummaryDataDetails();
            CommonServices.addProductDataInOrdercartFromSession(false, 'session');
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
}
