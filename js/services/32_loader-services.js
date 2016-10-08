
(function(){
    
    angular.module('DKAPP').factory('LoaderServices', LoaderServices);

    function LoaderServices(){
        try{
            
            var loaderDetails = {};
            
            loaderDetails.showLoader = function(){
                var msgStr = "<img src='"+globalBaseSitePath+"images/loading.gif'><br>";
                msgStr+= "<center>Please wait desserts khazana is loading........</center>";
                var blockUIObj = {};
                blockUIObj['css'] = {"padding":10, "border":"0px!important;"};
                blockUIObj['message'] = msgStr;
                showHideLoaderBox('show', blockUIObj);
            };
            
            loaderDetails.hideLoader = function(){
                showHideLoaderBox('hide');
            };
            
            return loaderDetails;
            
        }catch(ex){
            console.log("problem in LocationServices ex=>"+ex);
            return false;
        }
    }
    
})();
