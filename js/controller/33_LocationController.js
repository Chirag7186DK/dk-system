

angular.module('DKAPP').controller('LocationController', LocationController);

function LocationController($scope, $rootScope, $http, LocationServices, OrderCartServices){
    try{
        
        // loadDkDeliveryCityList 
        $rootScope.loadDkDeliveryCityList = function(cityListLoadedOnPage){
            try{
                // get param obj to get delivery city list
                var preparedParamJsonObj = getParamObjFromSessionForLoadingDkDeliveryCityList();
                if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                    var fetchCityParamJsonObj = {};
                    fetchCityParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                    // calling LocationServices to get dk delivery city list
                    LocationServices.getDKDeliveryCityList(fetchCityParamJsonObj).done(function(retResponseJson){
                        $scope.$apply(function(){
                            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                var arrObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryCityDetails', retResponseJson);
                                if(arrObj!==false && arrObj!==undefined && arrObj!==''){
                                    storeDefaultDeliveryCityDetailsInSessionStorage(arrObj.defaultSelectedDeliveryCityDetails, 'N');
                                    $rootScope.userSelectedDeliveryCity = arrObj.defaultSelectedDeliveryCityDetails['cityId'];
                                    $rootScope.dkDeliveryCityList = arrObj.allCityList;
                                    $rootScope.buildDKDeliveryCityListHtmlSelectControl($rootScope.dkDeliveryCityList, cityListLoadedOnPage);
                                }
                            }
                        });
                    });
                }
            }catch(ex){
                console.log("problem in loadDkDeliveryCityList ex=>"+ex);
                $rootScope.dkDeliveryCityList = false;
                $rootScope.userSelectedDeliveryCity = '';
            }
        };
        
        // buildDKDeliveryCityListHtmlSelectControl
        $rootScope.buildDKDeliveryCityListHtmlSelectControl = function(cityList, cityListLoadedOnPage){
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
                $(cityListSelectControlElementObj).selectpicker('val', $rootScope.userSelectedDeliveryCity);
                // apply change event on delivery city list
                if($(cityListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventDkDeliveryCityListSelectCtrlElement(cityListSelectControlElementObj, cityListLoadedOnPage);
                }
                // refresh dependency element
                $rootScope.refreshDependencyElementOfDeliveryCityList();
            }
        };
        
        // applyChangeEventDkDeliveryCityListSelectCtrlElement
        $rootScope.applyChangeEventDkDeliveryCityListSelectCtrlElement = function(elementObj, cityListLoadedOnPage){
            // city list change by user 
            $(elementObj).on('changed.bs.select', function(e){
                var paramObj = {
                    "cityId":$(elementObj).selectpicker('val'), 
                    "cityName":$(elementObj).find('option:selected').text()
                };
                storeDefaultDeliveryCityDetailsInSessionStorage(paramObj, 'Y');
                $rootScope.userSelectedDeliveryCity = ($(elementObj).selectpicker('val'));
                // refresh dk delivery area list, delivery desserts type list
                $rootScope.refreshDependencyElementOfDeliveryCityList(cityListLoadedOnPage, 'Y');
            });
        };
        
        // refreshDependencyElementOfDeliveryCityList
        $rootScope.refreshDependencyElementOfDeliveryCityList = function(cityListLoadedOnPage){
            $rootScope.isUserChangedDeliveryCity = false;
            $rootScope.isUserChangedDeliveryArea = false;
            // refresh dk delivery area list, delivery desserts type list
            if($rootScope.userSelectedDeliveryCity!=='' && $rootScope.userSelectedDeliveryCity!==false){
                $rootScope.isUserChangedDeliveryCity = true;
                // remove existing delivery area list
                if($('#dkDeliveryAreaListWrapperDivId').length===1){
                    $('#dkDeliveryAreaListSelectCtrlId').find('option').remove();
                    $rootScope.loadDKDeliveryAreaList(cityListLoadedOnPage);
                }
                // remove existing delivery area desserts type list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                }
            }
        };
        
        // loadDKDeliveryAreaList 
        $rootScope.loadDKDeliveryAreaList = function(loadAreaListOnPage){
            try{
                if($rootScope.isUserChangedDeliveryCity===true){
                    // get param obj to dk delivery area list
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaList();
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var fetchParamJsonObj = {};
                        fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        // calling LocationServices to get dk delivery area list
                        LocationServices.getDKDeliveryAreaList(fetchParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaDetails', retResponseJson);
                                    if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                        storeDefaultDeliveryAreaDetailsInSessionStorage(arrJsonObj.defaultSelectedDeliveryAreaDetails, 'N');
                                        if(arrJsonObj.defaultSelectedDeliveryAreaDetails!==false){
                                            $rootScope.userSelectedDeliveryArea = arrJsonObj.defaultSelectedDeliveryAreaDetails['areaId']+"|"+arrJsonObj.defaultSelectedDeliveryAreaDetails['ccaId'];
                                        }
                                        $rootScope.dkDeliveryAreaList = arrJsonObj.allAreaList;
                                        $rootScope.buildDKDeliveryAreaListHtmlSelectControl($rootScope.dkDeliveryAreaList, loadAreaListOnPage);
                                    }
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.dkDeliveryAreaList = false;
                $rootScope.userSelectedDeliveryArea = '';
                console.log("problem in loadDKDeliveryAreaList ex=>"+ex);
            }
        };
        
        // buildDKDeliveryAreaListHtmlSelectControl
        $rootScope.buildDKDeliveryAreaListHtmlSelectControl = function(dkDeliveryAreaList, loadAreaListOnPage){
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
                        var areaStr = areaPincode + " " +areaName;
                        var areaValueStr = areaValue+"|"+ccaIdVaue;
                        var eachOptionStr = "<option data-icon='"+areaIcon+"' value='"+areaValueStr+"'>"+areaStr+"</option>";
                        $(areaListSelectControlElementObj).append(eachOptionStr);
                    }
                }
                // refresh dk delivery area list select control element 
                $(areaListSelectControlElementObj).selectpicker('refresh');
                // showing default selected delivery area list
                $(areaListSelectControlElementObj).selectpicker('val', $rootScope.userSelectedDeliveryArea);
                // apply change event of area list
                if($(areaListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventDkDeliveryAreaListSelectCtrlElement(areaListSelectControlElementObj, loadAreaListOnPage);
                }
                // refresh dependency element on ui screen
                $rootScope.refreshDependencyElementOfDeliveryAreaList(loadAreaListOnPage);
                LocationServices.showSelectedDeliveryAreaTextHeader();
            }     
        };
        
        // applyChangeEventDkDeliveryAreaListSelectCtrlElement
        $rootScope.applyChangeEventDkDeliveryAreaListSelectCtrlElement = function(elementObj, loadAreaListOnPage){
            $(elementObj).on('changed.bs.select', function(e, clickedIndex, newValue, oldValue){
                var areaNamesStr = '';
                var selectedAreaSplittedArr = ($(elementObj).find('option:selected').text()).split(" ");
                for(var eachIndx = 1; eachIndx<selectedAreaSplittedArr.length; eachIndx++){
                    areaNamesStr+=selectedAreaSplittedArr[eachIndx]+" ";
                }
                areaNamesStr = (areaNamesStr).trim();
                var paramObj = {
                    "areaId":($(elementObj).selectpicker('val')).split("|")[0], 
                    "areaPincode":selectedAreaSplittedArr[0],
                    "areaName":(areaNamesStr.trim()),
                    "ccaId":($(elementObj).selectpicker('val')).split("|")[1]
                };
                
                var ordercartRequestedItemCount = getOrdercartRequestItemCountFromSession();
                var userSelectedPrevDeliveryAreaDataObj = getUserSelectedPrevDeliveryAreaDetails();
                if(ordercartRequestedItemCount==='111111'){
                    storeDefaultDeliveryAreaDetailsInSessionStorage(paramObj, 'Y');
                    $rootScope.userSelectedDeliveryArea =  ($(elementObj).selectpicker('val'));
                    // refresh desserts type list based on deilvery area
                    $rootScope.refreshDependencyElementOfDeliveryAreaList(loadAreaListOnPage);
                    LocationServices.showSelectedDeliveryAreaTextHeader();
                }else if(userSelectedPrevDeliveryAreaDataObj!==false && areaNamesStr!=='' && ordercartRequestedItemCount>=0){
                    
                    // show alert popup to user for notify him/her order cart all requested item will be clear from cart 
                    var msgStr = "<p style='font-weight:normal;font-size:15px!important;'>If you change delivery location from '"+userSelectedPrevDeliveryAreaDataObj['areaname']+"'";
                    msgStr+= " to '"+areaNamesStr+"' then all added <span class='badge'>"+ 100 +"</span> items in your cart will be removed ?</p>";
                    Lobibox.alert("info", {
                        title:"Warning Information",
                        iconClass: '',
                        msg:msgStr, 
                        draggable:true,
                        closeOnEsc:false,
                        showClass:"customNotifyPopupClass1",
                        buttons:{
                            Yes:{'class': 'btn btn-default',text: 'YES', closeOnClick: true},
                            No: {'class': 'btn btn-default',text: 'NO', closeOnClick: true}
                        },
                        callback: function(lobibox, type){
                            if(type==='Yes'){
                                var rtStatus = OrderCartServices.resetAllItemOrdercart();
                            }
                        }
                    });  
                    
                    
                }
                
            });
        };
        
        // refreshDependencyElementOfDeliveryAreaList
        $rootScope.refreshDependencyElementOfDeliveryAreaList = function(loadAreaListOnPage){
            $rootScope.isUserChangedDeliveryCity = true;
            $rootScope.isUserChangedDeliveryArea = false;
            if($rootScope.userSelectedDeliveryArea!=='' && $rootScope.userSelectedDeliveryArea!==false){
                $rootScope.isUserChangedDeliveryArea = true;
                // remove existing desserts type list
                if($('#dkDeliveryAreaDessertsProductListWrapperDivId').length===1){
                    $('#dkDeliveryAreaDessertsProductListSelectCtrlId').find('option').remove();
                    $rootScope.loadDKDeliveryAreaBasedDessertsTypeList($rootScope.isUserChangedDeliveryArea, loadAreaListOnPage);
                }
            }
        };
        
        // loadDKDeliveryAreaBasedDessertsTypeList 
        $rootScope.loadDKDeliveryAreaBasedDessertsTypeList = function(isUserChangedDeliveryArea, loadDessertTypeListOnPage){
            try{
                if(isUserChangedDeliveryArea===true && $rootScope.isUserChangedDeliveryArea===true){
                    // get param obj to desserts type list
                    var preparedParamJsonObj = getParamObjFromSessionForLoadingDKDeliveryAreaBasedDessertsTypeList();
                    if(preparedParamJsonObj!==false && jQuery.isEmptyObject(preparedParamJsonObj)===false){
                        var fetchParamJsonObj = {};
                        fetchParamJsonObj['dkParamDataArr'] = preparedParamJsonObj;
                        $rootScope.dkDeliveryAreaBasedDessertsTypeList = false;
                        // calling LocationServices to get dk delivery area based desserts type list
                        LocationServices.getDKDeliveryAreaBasedDessertsTypeList(fetchParamJsonObj).done(function(retResponseJson){
                            $scope.$apply(function(){
                                if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                                    var arrJsonObj = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'deliveryAreaBasedDessertsTypeDetails', retResponseJson);
                                    if(arrJsonObj!==false && arrJsonObj!==undefined && arrJsonObj!==''){
                                        storeDefaultDeliveryDessertsTypeDetailsInSessionStorage(false, 'Y');
                                        $rootScope.dkDeliveryAreaBasedDessertsTypeList = arrJsonObj.allDessertsTypeList;
                                    }
                                    $rootScope.buildDKDeliveryAreaBasedDessertsTypeListHtmlSelectControl($rootScope.dkDeliveryAreaBasedDessertsTypeList, loadDessertTypeListOnPage);
                                }
                            });
                        });
                    }
                }
            }catch(ex){
                $rootScope.dkDeliveryAreaBasedDessertsTypeList = false;
                console.log("problem in loadDKDeliveryAreaBasedDessertsTypeList ex=>"+ex);
            }
        };
        
        // buildDKDeliveryAreaBasedDessertsTypeListHtmlSelectControl
        $rootScope.buildDKDeliveryAreaBasedDessertsTypeListHtmlSelectControl = function(allDessertsTypeList, loadDessertTypeListOnPage){
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
                    }
                }else{
                    var dessertsTypeTitle = "Sorry, we don't serve any desserts in your delivery location !!!";
                    var eachOptionStr = "<option value='NO'>"+dessertsTypeTitle+"</option>";
                    $(dessertsTypeListSelectControlElementObj).append(eachOptionStr);
                }
                // refresh desserts type list select control element 
                $(dessertsTypeListSelectControlElementObj).selectpicker('refresh');
                if(allDessertsTypeList.length===0 || allDessertsTypeList===false){
                    // show default message on screen
                    $(dessertsTypeListSelectControlElementObj).selectpicker('val', 'NO');
                }
                // applying change event function
                if($(dessertsTypeListSelectControlElementObj).find('option').length>0){
                    $rootScope.applyChangeEventDkDeliveryAreaBasedDessertsTypeListSelectCtrlElement(dessertsTypeListSelectControlElementObj);
                }
            }
        };
        
        // applyChangeEventDkDeliveryAreaBasedDessertsTypeListSelectCtrlElement
        $rootScope.applyChangeEventDkDeliveryAreaBasedDessertsTypeListSelectCtrlElement = function(elementObj){
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
