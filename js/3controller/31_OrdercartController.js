
// OrderCartController
app.controller('OrderCartController', function($scope, $rootScope, $http, OrderCartServices){
    try{
         
        // checkingProductDataToAddInOrdercart 
        $rootScope.checkingProductDataToAddInOrdercart = function(productDetailsObj, fcontentClass, fromPageLoad){
            try{
                // check is user logged in or not session
                var isUserLoggedInSession = checkUserLoggedInSession();
                if(isUserLoggedInSession===true){
                    // validating product data status
                    var validatedDataStatus = validateProductDataToAddInOrdercart(fcontentClass);
                    if(validatedDataStatus===true && 
                        (productDetailsObj!==false && productDetailsObj!==undefined && jQuery.isEmptyObject(productDetailsObj)===false)){
                        OrderCartServices.addProductDataInOrdercart(productDetailsObj, fcontentClass);
                    }else if(validatedDataStatus===true && 
                        (productDetailsObj===false || productDetailsObj===undefined || jQuery.isEmptyObject(productDetailsObj)===true)){
                        OrderCartServices.addProductDataInOrdercart(false, fcontentClass);
                    }else{
                        var notifyMsgStr = "Please enter product qty / message to add item in order cart !";
                        showNotificationBoxMsg(notifyMsgStr);
                    }
                }else if(isUserLoggedInSession===false){
                    storePageDetailsUserAccessedFrom(fromPageLoad);
                    storeUserOrderItemInSession(productDetailsObj, fcontentClass);
                    window.location.href = globalBaseSitePath+"account-signup-signin.php";
                }
            }catch(ex){
                console.log("problem in checkingProductDataToAddInOrdercart=>"+ex);
            }
        };
        
    }catch(ex){
        console.log("problem in OrdercartController ex=>"+ex);
    }
    
});
