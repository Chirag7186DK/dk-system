

angular.module('DKAPP').controller('LocationController', LocationController);

function LocationController($scope, $rootScope, $http, LocationServices){
    try{
        
        // loadDkDeliveryCityList 
        $rootScope.loadDkDeliveryCityList = function(loadOnPage){
            try{
                // get param obj to get related city details
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDkDeliveryCityDetails();
                // console.log("loadDkDeliveryCityList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var jsonParamBlockUIObject = {};
                    jsonParamBlockUIObject['css'] = {"padding":10};
                    jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                    showHideLoaderBox('show', jsonParamBlockUIObject);
                    
                    var fetchCityParamJsonObj = {};
                    fetchCityParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                    // calling LocationServices to get dk delivery city details
                    LocationServices.getDKDeliveryCityList(fetchCityParamJsonObj).done(function(retResponseJson){
                        // console.log("retResponseJson=>"+JSON.stringify(retResponseJson));
                        $scope.$apply(function(){
                            showHideLoaderBox('hide');
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var retArrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryCityDetails', retResponseJson);
                                // console.log("loadDkDeliveryCityList retResponseJson=>"+JSON.stringify(retArrObj));
                                if(retArrObj!==false && retArrObj!==undefined && retArrObj!==''){
                                    storeDefaultDeliveryCityDetailsInSessionStorage(retArrObj.defaultSelectedDeliveryCityDetails, 'N');
                                    // final all dk delivery city list in variable and default city also
                                    $rootScope.defaultedSelectedDKDeliveryCity = retArrObj.defaultSelectedDeliveryCityDetails['cityId'];
                                    $rootScope.dkDeliveryCityList = retArrObj.allCityList;
                                    $rootScope.buildDKDeliveryCityListlHtmlSelectControl($rootScope.dkDeliveryCityList, loadOnPage);
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadDkDeliveryCityList ex=>"+ex);
                $rootScope.dkDeliveryCityList = false;
                $rootScope.defaultedSelectedDKDeliveryCity = '';
                showHideLoaderBox('hide');
            }
        };
        
        // buildDKDeliveryCityListlHtmlSelectControl
        $rootScope.buildDKDeliveryCityListlHtmlSelectControl = function(cityList, cityDetailsLoadedOnPage){
            // get html element obj 
            var cityListSelectControlElementObj = document.getElementById("dkDeliveryCityListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(cityListSelectControlElementObj).find('option').remove();
            $(cityListSelectControlElementObj).selectpicker('destroy');
            if(cityList.length>0 && cityList!=='' && cityList!==undefined && cityList!==false){
                // iterate each city details 
                for(var eachCityDetailsArrIndex = 0; eachCityDetailsArrIndex<cityList.length; eachCityDetailsArrIndex++){
                    var cityValue = cityList[eachCityDetailsArrIndex]['cityId'];
                    var cityIcon = cityList[eachCityDetailsArrIndex]['cityIcon'];
                    var cityName = cityList[eachCityDetailsArrIndex]['cityName'];
                    var eachOptionStr = "<option class='citySuggestionOptionClass' data-icon='"+cityIcon+"' value='"+cityValue+"'>"+cityName+"</option>";
                    $(cityListSelectControlElementObj).append(eachOptionStr);
                }
            }
            // refresh city list select control element 
            $(cityListSelectControlElementObj).selectpicker('refresh');
            // showing default selected city
            $(cityListSelectControlElementObj).selectpicker('val', $rootScope.defaultedSelectedDKDeliveryCity);
            // apply change event on city list
            if($(cityListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDKDeliveryCityListlHtmlSelectControlOnChangeEvent(cityListSelectControlElementObj, cityDetailsLoadedOnPage);
            }
            // refresh dependency element
            $rootScope.refreshElementDependencyDeliveryCity();
        };
        
        // buildedDKDeliveryCityListlHtmlSelectControlOnChangeEvent
        $rootScope.buildedDKDeliveryCityListlHtmlSelectControlOnChangeEvent = function(elementObj, cityDetailsLoadedOnPage){
            // city details change by user then 
            $(elementObj).on('changed.bs.select', function(e){
                var paramObj = {"cityId":$(elementObj).selectpicker('val'), "cityName":$(elementObj).find('option:selected').text()};
                storeDefaultDeliveryCityDetailsInSessionStorage(paramObj, 'Y');
                $rootScope.defaultedSelectedDKDeliveryCity = ($(elementObj).selectpicker('val'));
                // refresh dk delivery area list, dk delivery city list, delivery desserts product type list
                $rootScope.refreshElementDependencyDeliveryCity(cityDetailsLoadedOnPage, 'Y');
            });
        };
        
        // refreshElementDependencyDeliveryCity
        $rootScope.refreshElementDependencyDeliveryCity = function(cityDetailsLoadedOnPage){
            $rootScope.isDkDeliveryCityChanged = false;
            $rootScope.isDkDeliveryAreaChanged = false;
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
            $rootScope.isDessertsProductTypeProductListLoaded = false;
            // refresh dk delivery area list, dk delivery city list, delivery desserts product type list
            if($rootScope.defaultedSelectedDKDeliveryCity!=='' && $rootScope.defaultedSelectedDKDeliveryCity!==false){
                $rootScope.isDkDeliveryCityChanged = true;
                // remove existing delivery area option list & refresh delivery area options list
                if($('#dkDeliveryAreaListWrapperDivId').length===1){
                    $('#dkDeliveryAreaListSelectCtrlId').find('option').remove();
                    angular.element('#dkDeliveryAreaListWrapperDivId').scope().loadDKDeliveryAreaList(cityDetailsLoadedOnPage);
                }
                // remove existing delivery area desserts product type option list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                }
            }
        };
        
        // loadDKDeliveryAreaList 
        $rootScope.loadDKDeliveryAreaList = function(loadAreaDetailsOnPage){
            try{
                if($rootScope.isDkDeliveryCityChanged===true){
                    // get param obj to dk delivery area details
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaDetails();
                    // console.log("loadDKDeliveryAreaList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling LocationServices to get dk delivery area list
                        LocationServices.getDKDeliveryAreaList(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var retArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaDetails', retResponseJson);
                                    if(retArrJsonObj!==false && retArrJsonObj!==undefined && retArrJsonObj!==''){
                                        storeDefaultDeliveryAreaDetailsInSessionStorage(retArrJsonObj.defaultSelectedDeliveryAreaDetails, 'N');
                                        if(retArrJsonObj.defaultSelectedDeliveryAreaDetails!==false){
                                            $rootScope.defaultedSelectedDKDeliveryArea = retArrJsonObj.defaultSelectedDeliveryAreaDetails['areaId'];
                                        }
                                        $rootScope.dkDeliveryAreaList = retArrJsonObj.allAreaList;
                                        $rootScope.buildDKDeliveryAreaListHtmlSelectControl($rootScope.dkDeliveryAreaList, loadAreaDetailsOnPage);
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.dkDeliveryAreaList = false;
                $rootScope.defaultedSelectedDKDeliveryArea = '';
                showHideLoaderBox('hide');
                console.log("problem in loadDKDeliveryAreaList ex=>"+ex);
            }
        };
        
        // buildDKDeliveryAreaListHtmlSelectControl
        $rootScope.buildDKDeliveryAreaListHtmlSelectControl = function(dkDeliveryAreaList, areaDetailsLoadedOnPage){
            var areaListSelectControlElementObj = document.getElementById("dkDeliveryAreaListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(areaListSelectControlElementObj).find('option').remove();
            $(areaListSelectControlElementObj).selectpicker('destroy');
            if(dkDeliveryAreaList.length>0 && dkDeliveryAreaList!=='' && dkDeliveryAreaList!==undefined && dkDeliveryAreaList!==false){
                // iterate each area details 
                for(var eachAreaDetailsArrIndex = 0; eachAreaDetailsArrIndex<dkDeliveryAreaList.length; eachAreaDetailsArrIndex++){
                    var areaValue = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaId'];
                    var areaIcon = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaIcon'];
                    var areaName = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaName'];
                    var areaPincode = dkDeliveryAreaList[eachAreaDetailsArrIndex]['areaPincode'];
                    var areaStr = areaPincode + " " +areaName;
                    // var areaValueStr = areaValue+"|"+areaName+"|"+areaPincode;
                    var eachOptionStr = "<option class='cityAreaSuggestionOptionClass' data-icon='"+areaIcon+"' value='"+areaValue+"'>"+areaStr+"</option>";
                    $(areaListSelectControlElementObj).append(eachOptionStr);
                }
            }
            // refresh dk delivery area list select control element 
            $(areaListSelectControlElementObj).selectpicker('refresh');
            // showing default selected delivery area list
            $(areaListSelectControlElementObj).selectpicker('val', $rootScope.defaultedSelectedDKDeliveryArea);
            // apply change event of area list
            if($(areaListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDKDeliveryAreaListHtmlSelectControlOnChangeEvent(areaListSelectControlElementObj, areaDetailsLoadedOnPage);
            }
            // refresh dependency element on ui screen
            $rootScope.refreshElementDependencyDeliveryArea(areaDetailsLoadedOnPage);
            LocationServices.showUserSelectedDeliveryAreaTextHeader();
        };
        
        // buildedDKDeliveryAreaListHtmlSelectControlOnChangeEvent
        $rootScope.buildedDKDeliveryAreaListHtmlSelectControlOnChangeEvent = function(elementObj, areaDetailsLoadedOnPage){
            $(elementObj).on('changed.bs.select', function(e){
                var areaNamesStr = '';
                var selectedAreaSplittedArr = ($(elementObj).find('option:selected').text()).split(" ");
                for(var eachIndx = 1; eachIndx<selectedAreaSplittedArr.length; eachIndx++){
                    areaNamesStr+=selectedAreaSplittedArr[eachIndx]+" ";
                }
                var paramObj = {
                    "areaId":$(elementObj).selectpicker('val'), 
                    "areaPincode":selectedAreaSplittedArr[0],
                    "areaName":(areaNamesStr.trim())
                };
                storeDefaultDeliveryAreaDetailsInSessionStorage(paramObj, 'Y');
                $rootScope.defaultedSelectedDKDeliveryArea =  ($('#dkDeliveryCityListSelectCtrlId').selectpicker('val'));
                // refresh desserts product type list based on city, area
                $rootScope.refreshElementDependencyDeliveryArea(areaDetailsLoadedOnPage);
                LocationServices.showUserSelectedDeliveryAreaTextHeader();
            });
        };
        
        // refreshElementDependencyDeliveryArea
        $rootScope.refreshElementDependencyDeliveryArea = function(areaDetailsLoadedOnPage){
            $rootScope.isDkDeliveryCityChanged = true;
            $rootScope.isDkDeliveryAreaChanged = false;
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
            $rootScope.isDessertsProductTypeProductListLoaded = false;
            if($rootScope.defaultedSelectedDKDeliveryArea!=='' && $rootScope.defaultedSelectedDKDeliveryArea!==false){
                $rootScope.isDkDeliveryAreaChanged = true;
                // remove existing desserts product type list and add new one list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                    angular.element('#dkDeliveryAreaDessertsProductListWrapperDivId').scope().loadDKDeliveryAreaBasedProductTypeList($rootScope.isDkDeliveryAreaChanged, areaDetailsLoadedOnPage);
                }
            }
        };
        
        // loadDKDeliveryAreaBasedProductTypeList 
        $rootScope.loadDKDeliveryAreaBasedProductTypeList = function(isDkDeliveryAreaChanged, loadDessertsProductaDetailsOnPage){
            try{
                if(isDkDeliveryAreaChanged===true && $rootScope.isDkDeliveryAreaChanged===true){
                    // get param obj to product type details
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaBasedProductTypeDetails();
                    // console.log("loadDKDeliveryAreaBasedProductTypeList preparedParamJsonObj=>"+JSON.stringify(preparedParamJsonObj));
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var jsonParamBlockUIObject = {};
                        jsonParamBlockUIObject['css'] = {"padding":10};
                        jsonParamBlockUIObject['message'] = "<img src='"+globalBaseSitePath+"images/loading.gif'><br><center>Please wait desserts khazana is loading........</center>";
                        showHideLoaderBox('show', jsonParamBlockUIObject);
                        
                        var fetchAreaParamJsonObj = {};
                        fetchAreaParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;

                        // calling LocationServices to get dk delivery area based product type list
                        LocationServices.getDKDeliveryAreaBasedProductTypeList(fetchAreaParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                showHideLoaderBox('hide');
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    // console.log("getDKDeliveryAreaBasedProductTypeList retResponseJson=>"+JSON.stringify(retResponseJson));
                                    var retArrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaBasedProductTypeDetails', retResponseJson);
                                    if(retArrJsonObj!==false && retArrJsonObj!==undefined && retArrJsonObj!==''){
                                        if(retArrJsonObj.defaultSelectedAreaBasedProductTypeDetails!==false){
                                            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = retArrJsonObj.defaultSelectedAreaBasedProductTypeDetails['matchedProductTypeId'];
                                            $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = retArrJsonObj.defaultSelectedAreaBasedProductTypeDetails['matchedProductTypeTitle'];
                                        }else{
                                            storeDefaultDeliveryDessertsProductTypeDetailsInSessionStorage(false, 'Y');
                                        }
                                        $rootScope.dkDeliveryAreaBasedProductTypeList = retArrJsonObj.allProductTypeList;
                                        $rootScope.buildDKDeliveryAreaBasedProductListHtmlSelectControl($rootScope.dkDeliveryAreaBasedProductTypeList, loadDessertsProductaDetailsOnPage);
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.dkDeliveryAreaBasedProductTypeList = false;
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
                showHideLoaderBox('hide');
                console.log("problem in loadDKDeliveryAreaBasedProductTypeList ex=>"+ex);
            }
        };
        
        // buildDKDeliveryAreaBasedProductListHtmlSelectControl
        $rootScope.buildDKDeliveryAreaBasedProductListHtmlSelectControl = function(allDessertsProductTypeList, loadDessertsProductaDetailsOnPage){
            var productTypeListSelectControlElementObj = document.getElementById("dkDeliveryAreaDessertsProductListSelectCtrlId");
            // all options remove and destroy bootstrap select feature
            $(productTypeListSelectControlElementObj).find('option').remove();
            $(productTypeListSelectControlElementObj).selectpicker('destroy');
            if(allDessertsProductTypeList.length>0 && allDessertsProductTypeList!=='' 
                && allDessertsProductTypeList!==undefined && allDessertsProductTypeList!==false){
                // iterate each product type details 
                for(var eachProductTypeDetailsArrIndex = 0; eachProductTypeDetailsArrIndex<allDessertsProductTypeList.length; eachProductTypeDetailsArrIndex++){
                    var producttypeValue = allDessertsProductTypeList[eachProductTypeDetailsArrIndex]['productTypeId'];
                    var productIcon = allDessertsProductTypeList[eachProductTypeDetailsArrIndex]['productIcon'];
                    var productTypeTitle = allDessertsProductTypeList[eachProductTypeDetailsArrIndex]['productTypeTitle'];
                    var eachOptionStr = "<option class='deliveryAreaBasedProductTypeSuggestionOptionClass' data-icon='"+productIcon+"' value='"+producttypeValue+"'>"+productTypeTitle+"</option>";
                    $(productTypeListSelectControlElementObj).append(eachOptionStr);
                }
            }
            // refresh producttype list select control element 
            $(productTypeListSelectControlElementObj).selectpicker('refresh');
            // showing default selected desserts product type list
            $(productTypeListSelectControlElementObj).selectpicker('val', $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue);
            // applying change event function
            if($(productTypeListSelectControlElementObj).find('option').length>0){
                $rootScope.buildedDKDeliveryAreaBasedProductTypeListlHtmlSelectControlOnChangeEvent(productTypeListSelectControlElementObj);
            }
            // refresh dependency element on ui screen
            $rootScope.refreshElementDependencyDeliveryAreabasedDessertsProductType();
        };
        
        // buildedDKDeliveryAreaBasedProductTypeListlHtmlSelectControlOnChangeEvent
        $rootScope.buildedDKDeliveryAreaBasedProductTypeListlHtmlSelectControlOnChangeEvent = function(elementObj){
            // product type details change by user then 
            $(elementObj).on('changed.bs.select', function(e){
                var productTypeId = ($(elementObj).selectpicker('val'));
                var productTypeTitle = ($(elementObj).find('option:selected').text());
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = productTypeId;
                $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = productTypeTitle;
                // refresh dependency element on ui screen
                $rootScope.refreshElementDependencyDeliveryAreabasedDessertsProductType();
            });
        };
       
        // refreshElementDependencyDeliveryAreabasedDessertsProductType
        $rootScope.refreshElementDependencyDeliveryAreabasedDessertsProductType = function(){
            $rootScope.isDessertsProductTypeProductListLoaded = false;
            if($rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue!==false
                && $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue!==''
                && $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle!==false
                && $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle!==''){  
                var paramObj = {
                    "matchedProductTypeId":$rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue,
                    "matchedProductTypeTitle":$rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle
                };
                storeDefaultDeliveryDessertsProductTypeDetailsInSessionStorage(paramObj, 'Y');
            } 
        };
        
    }catch(ex){
        console.log("problem in location controller ex=>"+ex);
    }
}
