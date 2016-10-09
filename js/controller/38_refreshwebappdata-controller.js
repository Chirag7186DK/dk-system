
angular.module('DKAPP').controller('RefreshWebAppDataController', RefreshWebAppDataController);

function RefreshWebAppDataController($rootScope, CommonServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            CommonServices.refreshUserDashboardSummaryDataDetails();
            CommonServices.refreshUserOrdercartDashboardSummaryDataDetails();
            CommonServices.addProductDataInOrdercartFromSession(false, 'session');
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
}
