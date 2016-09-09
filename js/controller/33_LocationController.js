

angular.module('DKAPP').controller('LocationController', LocationController);

function LocationController($scope, $rootScope, LocationServices){
    try{
        
        // loadDeliveryCityList 
        $rootScope.loadDeliveryCityList = function(cityListLoadedOnPage){
            try{
                // get param obj to get delivery city list
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDeliveryCityList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchCityParamJsonObj = {};
                    fetchCityParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    $rootScope.deliveryCityList = false;
                    $rootScope.userSelectedDeliveryCityId = false;
                    $rootScope.userSelectedDeliveryCityDataObj = false;
                    $rootScope.isResetDeliveryCityDependencySessionData = 'Y';
                    // calling LocationServices to get delivery city list
                    LocationServices.getDeliveryCityList(fetchCityParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryCityDetails', retResponseJson);
                                if(arrObj!==false && arrObj!==undefined && arrObj!==''){
                                    if(arrObj.selectedDeliveryCityDetails!==false){
                                        $rootScope.userSelectedDeliveryCityId = arrObj.selectedDeliveryCityDetails['cityId'];
                                        $rootScope.userSelectedDeliveryCityDataObj = arrObj.selectedDeliveryCityDetails;
                                        $rootScope.isResetDeliveryCityDependencySessionData = 'N';
                                    }
                                    $rootScope.deliveryCityList = arrObj.allCityList;
                                }
                            }
                            storeSelectedDeliveryCityDetailsInSessionStorage($rootScope.userSelectedDeliveryCityDataObj, $rootScope.isResetDeliveryCityDependencySessionData);
                            $rootScope.buildDeliveryCityListHtmlSelectControl($rootScope.deliveryCityList, cityListLoadedOnPage);
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadDeliveryCityList ex=>"+ex);
                $rootScope.deliveryCityList = false;
                $rootScope.userSelectedDeliveryCityId = false;
                $rootScope.userSelectedDeliveryCityDataObj = false;
                $rootScope.isResetDeliveryCityDependencySessionData = 'Y';
            }
        };
        
        // buildDeliveryCityListHtmlSelectControl
        $rootScope.buildDeliveryCityListHtmlSelectControl = function(cityList, cityListLoadedOnPage){
            if($('#dkDeliveryCityListSelectCtrlId').length===1){
                // get html element obj 
                var cityListSelectControlElementObj = document.getElementById("dkDeliveryCityListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(cityListSelectControlElementObj).find('option').remove();
                $(cityListSelectControlElementObj).selectpicker('destroy');
                if(cityList.length>0 && cityList!==false){
                    // iterate each city list 
                    for(var eachCityIndex = 0; eachCityIndex<cityList.length; eachCityIndex++){
                        var cityValue = cityList[eachCityIndex]['cityId'];
                        var cityIcon = cityList[eachCityIndex]['cityIcon'];
                        var cityName = cityList[eachCityIndex]['cityName'];
                        var eachOptionStr = "<option data-icon='"+cityIcon+"' value='"+cityValue+"'>"+cityName+"</option>";
                        $(cityListSelectControlElementObj).append(eachOptionStr);
                    }
                }
                // refresh city list select control element 
                $(cityListSelectControlElementObj).selectpicker('refresh');
                // showing default selected delivery city
                $(cityListSelectControlElementObj).selectpicker('val', $rootScope.userSelectedDeliveryCityId);
                // apply change event on delivery city list
                if($(cityListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventDeliveryCityListSelectCtrlElement(cityListSelectControlElementObj, cityListLoadedOnPage);
                }
                // refresh dependency element
                $rootScope.refreshDependencyElementOfDeliveryCityList();
            }
        };
        
        // applyChangeEventDeliveryCityListSelectCtrlElement
        $rootScope.applyChangeEventDeliveryCityListSelectCtrlElement = function(elementObj, cityListLoadedOnPage){
            // city list change by user 
            $(elementObj).on('changed.bs.select', function(e){
                var paramObj = {
                    "cityId":$(elementObj).selectpicker('val'), 
                    "cityName":$(elementObj).find('option:selected').text()
                };
                storeSelectedDeliveryCityDetailsInSessionStorage(paramObj, 'Y');
                $rootScope.userSelectedDeliveryCityId = ($(elementObj).selectpicker('val'));
                // refresh delivery area list, delivery desserts type list
                $rootScope.refreshDependencyElementOfDeliveryCityList(cityListLoadedOnPage, 'Y');
            });
        };
        
        // refreshDependencyElementOfDeliveryCityList
        $rootScope.refreshDependencyElementOfDeliveryCityList = function(cityListLoadedOnPage){
            $rootScope.isUserChangedDeliveryCity = false;
            $rootScope.isUserChangedDeliveryArea = false;
            // refresh dk delivery area list, delivery desserts type list
            if($rootScope.userSelectedDeliveryCityId!=='' 
                && $rootScope.userSelectedDeliveryCityId!==false && $rootScope.userSelectedDeliveryCityId!==undefined){
                $rootScope.isUserChangedDeliveryCity = true;
                // remove existing delivery area list
                if($('#dkDeliveryAreaListWrapperDivId').length===1){
                    $('#dkDeliveryAreaListSelectCtrlId').find('option').remove();
                    $rootScope.loadDeliveryAreaList(cityListLoadedOnPage);
                }
                // remove existing delivery area desserts type list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                }
            }
        };
        
        // loadDeliveryAreaList 
        $rootScope.loadDeliveryAreaList = function(loadAreaListOnPage){
            try{
                if($rootScope.isUserChangedDeliveryCity===true){
                    // get param obj to delivery area list
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDeliveryAreaList();
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var fetchParamJsonObj = {};
                        fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.deliveryAreaList = false;
                        $rootScope.userSelectedDeliveryAreaId = false;
                        $rootScope.userSelectedDeliveryAreaDataObj = false;
                        $rootScope.isResetDeliveryAreaDependencySessionData = 'Y';
                        // calling LocationServices to get delivery area list
                        LocationServices.getDKDeliveryAreaList(fetchParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var arrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaDetails', retResponseJson);
                                    if(arrObj!==false && arrObj!==undefined && arrObj!==''){
                                        if(arrObj.selectedDeliveryAreaDetails!==false){
                                            $rootScope.userSelectedDeliveryAreaId = arrObj.selectedDeliveryAreaDetails['areaId']+"|"+arrObj.selectedDeliveryAreaDetails['ccaId'];
                                            $rootScope.userSelectedDeliveryAreaDataObj = arrObj.selectedDeliveryAreaDetails;
                                            $rootScope.isResetDeliveryAreaDependencySessionData = 'N';
                                        }
                                        $rootScope.deliveryAreaList = arrObj.allAreaList;
                                    }
                                }
                                storeSelectedDeliveryAreaDetailsInSessionStorage($rootScope.userSelectedDeliveryAreaDataObj, $rootScope.isResetDeliveryAreaDependencySessionData);
                                $rootScope.buildDeliveryAreaListHtmlSelectControl($rootScope.deliveryAreaList, loadAreaListOnPage);
                            });
                        });
                    }
                }
            }catch(ex){
                console.log("problem in loadDeliveryAreaList ex=>"+ex);
                $rootScope.deliveryAreaList = false;
                $rootScope.userSelectedDeliveryAreaId = false;
                $rootScope.userSelectedDeliveryAreaDataObj = false;
                $rootScope.isResetDeliveryAreaDependencySessionData = 'Y';
            }
        };
        
        // buildDeliveryAreaListHtmlSelectControl
        $rootScope.buildDeliveryAreaListHtmlSelectControl = function(dkDeliveryAreaList, loadAreaListOnPage){
            if($('#dkDeliveryAreaListSelectCtrlId').length===1){    
                var areaListSelectControlElementObj = document.getElementById("dkDeliveryAreaListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(areaListSelectControlElementObj).find('option').remove();
                $(areaListSelectControlElementObj).selectpicker('destroy');
                if(dkDeliveryAreaList.length>0 && dkDeliveryAreaList!==false){
                    // iterate each area list 
                    for(var eachAreaIndex = 0; eachAreaIndex<dkDeliveryAreaList.length; eachAreaIndex++){
                        var areaValue = dkDeliveryAreaList[eachAreaIndex]['areaId'];
                        var areaIcon = dkDeliveryAreaList[eachAreaIndex]['areaIcon'];
                        var areaName = dkDeliveryAreaList[eachAreaIndex]['areaName'];
                        var areaPincode = dkDeliveryAreaList[eachAreaIndex]['areaPincode'];
                        var ccaIdVaue = dkDeliveryAreaList[eachAreaIndex]['ccaId'];
                        var areaStr = areaPincode + " " +areaName+"</span>";
                        var areaValueStr = areaValue+"|"+ccaIdVaue;
                        var eachOptionStr = "<option data-icon='"+areaIcon+"' value='"+areaValueStr+"'>"+areaStr+"</option>";
                        $(areaListSelectControlElementObj).append(eachOptionStr);
                    }
                }
                // refresh delivery area list select control element 
                $(areaListSelectControlElementObj).selectpicker('refresh');
                // showing default selected delivery area list
                $(areaListSelectControlElementObj).selectpicker('val', $rootScope.userSelectedDeliveryAreaId);
                // apply change event of area list
                if($(areaListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventDeliveryAreaListSelectCtrlElement(areaListSelectControlElementObj, loadAreaListOnPage);
                }
                // refresh dependency element on ui screen
                $rootScope.refreshDependencyElementOfDeliveryAreaList(loadAreaListOnPage);
                LocationServices.showSelectedDeliveryAreaTextHeader();
            }     
        };
        
        // applyChangeEventDeliveryAreaListSelectCtrlElement
        $rootScope.applyChangeEventDeliveryAreaListSelectCtrlElement = function(deliveryAreaElementObj, loadAreaListOnPage){
            $(deliveryAreaElementObj).on('changed.bs.select', function(e){
                var areaNamesStr = '';
                var selectedAreaSplittedArr = ($(deliveryAreaElementObj).find('option:selected').text()).split(" ");
                for(var eachIndx = 1; eachIndx<selectedAreaSplittedArr.length; eachIndx++){
                    areaNamesStr+=selectedAreaSplittedArr[eachIndx]+" ";
                }
                areaNamesStr = (areaNamesStr).trim();
                var selectedDeliveryDataObj = {
                    "areaId":($(deliveryAreaElementObj).selectpicker('val')).split("|")[0], 
                    "areaPincode":selectedAreaSplittedArr[0],
                    "areaName":(areaNamesStr.trim()),
                    "ccaId":($(deliveryAreaElementObj).selectpicker('val')).split("|")[1]
                };
                storeSelectedDeliveryAreaDetailsInSessionStorage(selectedDeliveryDataObj, 'Y');
                $rootScope.userSelectedDeliveryAreaId =  ($(deliveryAreaElementObj).selectpicker('val'));
                // refresh desserts type list based on deilvery area
                $rootScope.refreshDependencyElementOfDeliveryAreaList(loadAreaListOnPage);
                LocationServices.showSelectedDeliveryAreaTextHeader();
            });
        };
        
        // refreshDependencyElementOfDeliveryAreaList
        $rootScope.refreshDependencyElementOfDeliveryAreaList = function(loadAreaListOnPage){
            $rootScope.isUserChangedDeliveryCity = true;
            $rootScope.isUserChangedDeliveryArea = false;
            if($rootScope.userSelectedDeliveryAreaId!=='' && $rootScope.userSelectedDeliveryAreaId!==false){
                $rootScope.isUserChangedDeliveryArea = true;
            }
            // remove existing desserts type list
            if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                $rootScope.loadDeliveryAreaBasedDessertsTypeList($rootScope.isUserChangedDeliveryArea, loadAreaListOnPage);
            }
        };
        
        // loadDeliveryAreaBasedDessertsTypeList 
        $rootScope.loadDeliveryAreaBasedDessertsTypeList = function(isUserChangedDeliveryArea, loadDessertTypeListOnPage){
            try{
                if(isUserChangedDeliveryArea===true && $rootScope.isUserChangedDeliveryArea===true){
                    // get param obj to desserts type list
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDeliveryAreaBasedDessertsTypeList();
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var fetchParamJsonObj = {};
                        fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.deliveryAreaBasedDessertsTypeList = false;
                        // calling LocationServices to get delivery area based desserts type list
                        LocationServices.getDKDeliveryAreaBasedDessertsTypeList(fetchParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaBasedDessertsTypeDetails', retResponseJson);
                                    if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                        storeDefaultDeliveryDessertsTypeDetailsInSessionStorage(false, 'Y');
                                        $rootScope.deliveryAreaBasedDessertsTypeList = arrJsonObj.allDessertsTypeList;
                                    }
                                    $rootScope.buildDeliveryAreaBasedDessertsTypeListHtmlSelectControl($rootScope.deliveryAreaBasedDessertsTypeList, loadDessertTypeListOnPage);
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.deliveryAreaBasedDessertsTypeList = false;
                console.log("problem in loadDKDeliveryAreaBasedDessertsTypeList ex=>"+ex);
            }
        };
        
        // buildDeliveryAreaBasedDessertsTypeListHtmlSelectControl
        $rootScope.buildDeliveryAreaBasedDessertsTypeListHtmlSelectControl = function(allDessertsTypeList, loadDessertTypeListOnPage){
            if($('#dkDeliveryAreaDessertsTypeListSelectCtrlId').length===1){    
                var dessertsTypeListSelectControlElementObj = document.getElementById("dkDeliveryAreaDessertsTypeListSelectCtrlId");
                // all options remove and destroy bootstrap select feature
                $(dessertsTypeListSelectControlElementObj).find('option').remove();
                $(dessertsTypeListSelectControlElementObj).selectpicker('destroy');
                if(allDessertsTypeList.length>0 && allDessertsTypeList!==false){
                    // iterate each product type details 
                    for(var eachDessertsIndex = 0; eachDessertsIndex<allDessertsTypeList.length; eachDessertsIndex++){
                        var dessertstypeValue = allDessertsTypeList[eachDessertsIndex]['dessertsTypeId'];
                        var dessertsIcon = allDessertsTypeList[eachDessertsIndex]['dessertsIcon'];
                        var dessertsTypeTitle = allDessertsTypeList[eachDessertsIndex]['dessertsTypeTitle'];
                        var eachOptionStr = "<option data-icon='"+dessertsIcon+"' value='"+dessertstypeValue+"'>"+dessertsTypeTitle+"</option>";
                        $(dessertsTypeListSelectControlElementObj).append(eachOptionStr);
                        $(dessertsTypeListSelectControlElementObj).prop('disabled', false);
                    }
                }else{
                    var dessertsTypeTitle = "Sorry, we don't serve any desserts in your delivery area !!!";
                    var eachOptionStr = "<option value='NO'>"+dessertsTypeTitle+"</option>";
                    $(dessertsTypeListSelectControlElementObj).append(eachOptionStr);
                }
                // refresh desserts type list select control element 
                $(dessertsTypeListSelectControlElementObj).selectpicker('refresh');
                if(allDessertsTypeList.length===0 || allDessertsTypeList===false){
                    // show default message on screen
                    $(dessertsTypeListSelectControlElementObj).selectpicker('val', 'NO');
                    $(dessertsTypeListSelectControlElementObj).prop('disabled', true);
                }
                // applying change event function
                if($(dessertsTypeListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventDeliveryAreaBasedDessertsTypeListSelectCtrlElement(dessertsTypeListSelectControlElementObj);
                }
            }
        };
        
        // applyChangeEventDeliveryAreaBasedDessertsTypeListSelectCtrlElement
        $rootScope.applyChangeEventDeliveryAreaBasedDessertsTypeListSelectCtrlElement = function(elementObj){
            // desserts type details change by user 
            $(elementObj).on('changed.bs.select', function(e){
                var paramObj = {};
                paramObj['dessertsTypeId'] = ($(elementObj).selectpicker('val'));
                paramObj['dessertsTypeTitle'] = ($(elementObj).find('option:selected').text());
                storeDefaultDeliveryDessertsTypeDetailsInSessionStorage(paramObj, 'Y');
                if((paramObj['dessertsTypeTitle']).toLowerCase()==='cakes'){
                    window.location.href =  globalBaseSitePath+"all-cakes.php";
                }else if((paramObj['dessertsTypeTitle']).toLowerCase()==='chocolates'){
                    window.location.href =  globalBaseSitePath+"all-chocolates.php";
                }
            });
        };
       
        
    }catch(ex){
        console.log("problem in location controller ex=>"+ex);
    }
}
