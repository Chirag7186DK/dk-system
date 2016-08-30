
angular.module('DKAPP').controller('RefreshWebAppDataController', RefreshWebAppDataController);

function RefreshWebAppDataController($scope, $rootScope, $http, UsersServices, OrderCartServices){
    try{
        // refreshWebAppData
        $rootScope.refreshWebAppData = function(){
            var userDashboardSummaryDataObj = UsersServices.refreshUserDashboardSummaryDataDetails();
            var userOrdercartDashboardSummaryDataObj = OrderCartServices.refreshUserOrdercartDashboardSummaryDataDetails();
            var addItemOrdercartDataOBj = OrderCartServices.addProductDataInOrdercartFromSession(false, false, 'session');
            var infoObj = getInfoUserSelectedDeliveryCityAreaDessertsProductType();
            if(infoObj!==false && infoObj!==undefined 
                && infoObj!=='' && jQuery.isEmptyObject(infoObj)===false){
                alert(JSON.stringify(infoObj));
                var msgStr = "You are at : "+infoObj['userSelectedArea']+" - "+infoObj['userSelectedAreaPincode'];
                var notifyInfoConfigObj = {
                    icon:false,
                    title:false,
                    sound:false, 
                    size:'normal', 
                    msg:"<p style='text-align:center;'>"+msgStr+"</p>",
                    delay:2000,
                    position:"top left" 
                }; 
                showNotificationBoxMsg('', notifyInfoConfigObj);
            }
        };
    }catch(ex){
        console.log("problem in RefreshWebAppDataController ex=>"+ex);
    }
}
