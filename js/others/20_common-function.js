
function generateDkUserSessionId(){
    var existingUserSessionId = getUserSessionIdFromUserSession();
    if(existingUserSessionId==='' || existingUserSessionId===false || existingUserSessionId===undefined){
        var fetchedParamJsonObj = {};
        fetchedParamJsonObj['dkParamDataArr'] = {"dummy":"data"};
        communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/GenerateUserSessionId", 'apiFile', 'POST', '', fetchedParamJsonObj).done(function(retResponseJson){
            if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                var userSessionId = extractDataFromReturnAjaxResponse('POST', 'apiFile', 'userSessionId', retResponseJson);
                if(userSessionId!=='' && userSessionId!==false && userSessionId!==undefined){
                    storeUserSessionIdInSession(userSessionId);
                    addTrackingUserInfoAccessingWebsitesDetails('home');
                }
            }
        });
    }
}

function addTrackingUserInfoAccessingWebsitesDetails(fromPageLoad){
    var paramDataObj = getParamDataObjForAddingTrackingUserInfoAccessingWebsitesDetails(fromPageLoad);
    if(paramDataObj!==false && jQuery.isEmptyObject(paramDataObj)===false){
        var fetchAreaParamJsonObj = {};
        fetchAreaParamJsonObj['dkParamDataArr'] = paramDataObj;
        communicationWithAjax("dessertskhazana-services/dessertskhazanainnerservices/?r=api/v1/Users/ManageTrackUserAccessingWebsites", 'apiFile', 'POST', '', fetchAreaParamJsonObj).done(function(retResponseJson){});
    }
}

function getUserSelectedPrevDeliveryAreaDetails(){
    var userSelectedPrevDeliveryAreaDataObj = {};
    userSelectedPrevDeliveryAreaDataObj['areavalue'] = '';
    userSelectedPrevDeliveryAreaDataObj['areaname'] = '';
    userSelectedPrevDeliveryAreaDataObj['ccaId'] = '';
    try{
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
            // extract user suggested city area session data
            var paramDataObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
            if(paramDataObj.hasOwnProperty('areaname')===true){
                if(paramDataObj['areaname']!==''){
                    userSelectedPrevDeliveryAreaDataObj['areavalue'] = paramDataObj['areavalue'];
                    userSelectedPrevDeliveryAreaDataObj['areaname'] = paramDataObj['areaname'];
                    userSelectedPrevDeliveryAreaDataObj['ccaId'] = paramDataObj['ccaId'];
                }
            }
        }
    }catch(ex){
        userSelectedPrevDeliveryAreaDataObj = false;
    }
    return userSelectedPrevDeliveryAreaDataObj;
}

function clearUserpasswordFormFieldInfo(){
    if($('#uca_oldPwdInputId').length===1){
        $('#uca_oldPwdInputId').val('');
    }
    if($('#uca_newPwdInputId').length===1){
        $('#uca_newPwdInputId').val('');
    }
    if($('#uca_newcPwdInputId').length===1){
        $('#uca_newcPwdInputId').val('');
    }
}

function clearPartyOrderRequestFormField(){
    if($('#po_occasionTitleInputId').length===1){
        $('#po_occasionTitleInputId').val('');
    }
    if($('#po_nosPeopleInputId').length===1){
        $('#po_nosPeopleInputId').val('');
    }
    if($('#po_dateInputId').length===1){
        $('#po_dateInputId').val('');
    }
    if($('#po_venueInputId').length===1){
        $('#po_venueInputId').val('');
    }
    if($('#po_messageInputId').length===1){
        $('#po_messageInputId').val('');
    }
}

function clearCustomizeOrderRequestFormField(){
    if($('#co_occasionTitleInputId').length===1){
        $('#co_occasionTitleInputId').val('');
    }
    if($('#co_nosPeopleInputId').length===1){
        $('#co_nosPeopleInputId').val('');
    }
    if($('#co_dateInputId').length===1){
        $('#co_dateInputId').val('');
    }
    if($('#co_venueInputId').length===1){
        $('#co_venueInputId').val('');
    }
    if($('#co_messageInputId').length===1){
        $('#co_messageInputId').val('');
    }
}


////////////////// rating & review form content /////////////////

// CJ define this funcion 2016-08-06
function clearRatingReviewAbtProductFormContent(fcClass){
    if($('.'+fcClass).length===1){
        if($('.'+fcClass).find('textarea').length===1){
            $('.'+fcClass).find('textarea').val('');
        }
    }
}


////////////////// order cart form content /////////////////

function getOrdercartRequestItemCountFromSession(){
    var ordercartRequestedItemCount = 0;
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userOrdercartSummaryObj')===true){
                if(dkParamObj['userOrdercartSummaryObj']['totalRequestedItems']!=='' 
                    && parseInt(dkParamObj['userOrdercartSummaryObj']['totalRequestedItems'])>0){
                    ordercartRequestedItemCount = parseInt(dkParamObj['userOrdercartSummaryObj']['totalRequestedItems']);
                }
            }
        }
    }catch(ex){
        ordercartRequestedItemCount = 0;
    }
    return ordercartRequestedItemCount;
}

// CJ define this funcion 2016-08-06
function clearProductContentAfterAddedProductInOrdercart(fcClass){
    if($('.'+fcClass).length===1){
        if($('.'+fcClass).find('textarea').length===1){
            $('.'+fcClass).find('textarea').val('');
        }
        if($('.'+fcClass).find("input[type='text']").length===1){
            $('.'+fcClass).find("input[type='text']").val('1');
        }
    }
    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
    existingDkParamObj['userOrderItemObj'] = {};
    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
}
