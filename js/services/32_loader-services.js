
(function(){
    
    angular.module('DKAPP').factory('LoaderServices', LoaderServices);

    function LoaderServices($rootScope){
        try{
        }catch(ex){
            console.log("problem in LocationServices ex=>"+ex);
            return false;
        }
    }
    
})();
