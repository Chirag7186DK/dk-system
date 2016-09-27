
function initializeDkSessionData(){
    try{
        
        var userSessionObj = {};
        userSessionObj['usersession_starttimestamp'] = (new Date()).getTime();
        userSessionObj['lastupdated_sessiontimestamp'] = '';
        userSessionObj['user_sessionid'] = '';
        userSessionObj['udblogId'] = '';
        userSessionObj['userProfileTypeId'] = '';
        userSessionObj['isUserInfoTrackedAccessingWebsites'] = 'N';

        var userRecentlyViewedProductObj = {};

        var userSelectedDeliveryCityAreaDessertsTypeObj = {};
        userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'] = '1';
        userSelectedDeliveryCityAreaDessertsTypeObj['countryname'] = 'India';
        userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['cityname'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['areapincode'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['areaname'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['dessertsproduct'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['dessertsproducttitle'] = '';
        userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'] = '';

        var userProductObj = {};
        userProductObj['shopstore_value'] = '';
        userProductObj['all_shopstorevalue'] = '';
        userProductObj['shopstore_name'] = '';
        userProductObj['producttype_value'] = '';
        userProductObj['producttype_name'] = '';
        userProductObj['producttype_categoryvalue'] = '';
        userProductObj['producttype_categoryname'] = '';
        userProductObj['producttype_listvalue'] = '';
        userProductObj['producttype_listname'] = '';
        userProductObj['producttype_featurevalue'] = '';
        userProductObj['productviewed_bystatus'] = 'productwise';

        var userPartyOrderObj = {};
        userPartyOrderObj['title'] = '';

        var corporateTieupObj = {};
        corporateTieupObj['title'] = '';

        var customizeOrderObj = {};
        customizeOrderObj['title'] = '';

        var userAccessLastPageFromObj = {"page":""};
        var userOrderItemObj = {};
        var requestedUserAccountSectionNameObj = {};

        var dkParamObj = {};
        dkParamObj['userSession'] = userSessionObj;
        dkParamObj['userSelectedDeliveryCityAreaDessertsType'] = userSelectedDeliveryCityAreaDessertsTypeObj;
        dkParamObj['userProduct'] = userProductObj;
        dkParamObj['partyOrder'] = userPartyOrderObj;
        dkParamObj['corporateTieup'] = corporateTieupObj;
        dkParamObj['customizeOrder'] = customizeOrderObj;
        dkParamObj['userRecentlyProduct'] = userRecentlyViewedProductObj;
        dkParamObj['userAccessLastPageFromObj'] = userAccessLastPageFromObj;
        dkParamObj['userOrderItemObj'] = userOrderItemObj;
        dkParamObj['requestedSectionUserAccountObj'] = requestedUserAccountSectionNameObj;

        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        generateDkUserSessionId();
        return true;
    }catch(ex){
        return false;
    }    
}


function resetDKSessionData(){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            
            // user session data obj will reset
            var userSessionObj = {};
            userSessionObj['usersession_starttimestamp'] = (new Date()).getTime();
            userSessionObj['lastupdated_sessiontime'] = '';
            userSessionObj['user_sessionid'] = '';
            userSessionObj['udblogId'] = '';
            userSessionObj['userProfileTypeId'] = '';
            
            // user product data obj will reset
            var userProductObj = {};
            userProductObj['shopstore_value'] = '';
            userProductObj['all_shopstorevalue'] = '';
            userProductObj['shopstore_name'] = '';
            userProductObj['producttype_value'] = '';
            userProductObj['producttype_name'] = '';
            userProductObj['producttype_categoryvalue'] = '';
            userProductObj['producttype_categoryname'] = '';
            userProductObj['producttype_listvalue'] = '';
            userProductObj['producttype_listname'] = '';
            userProductObj['producttype_featurevalue'] = '';
            userProductObj['productviewed_bystatus'] = 'productwise';
            
            dkParamObj['userSession'] = userSessionObj;
            dkParamObj['userProduct'] = userProductObj;
            dkParamObj['userAccessLastPageFromObj'] = {"page":""};
            dkParamObj['userOrderItemObj'] = {};
            dkParamObj['requestedSectionUserAccountObj'] = {};
            
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        }
    }catch(ex){
        console.log("Problem in resetDKSessionData=>"+ex);
    }
}


function checkDkSessionParamObjExists(){
    var rtStatus = 'FALSE';
    try{
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            rtStatus = 'TRUE';
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}


function checkUnAuthorizedUserSessionParamObjExists(){
    var rtStatus = 'FALSE';
    try{
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                // extract userSession param obj
                var userSessionParamObj = dkParamObj['userSession'];
                if(userSessionParamObj.hasOwnProperty('user_sessionid')===true
                    && userSessionParamObj.hasOwnProperty('udblogId')===true){
                    if((userSessionParamObj['user_sessionid']).length>=20 
                        && (userSessionParamObj['udblogId']).length===0){
                        rtStatus = 'TRUE';
                    }
                }
            }
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}


function getParamDataObjForAddingTrackingUserInfoAccessingWebsitesDetails(fromPageLoad){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                if(dkParamObj['userSession']['user_sessionid']!=='' 
                    && (dkParamObj['userSession']['user_sessionid']).length>=20){
                    paramObj['user_sessionid'] = dkParamObj['userSession']['user_sessionid'];
                    paramObj['usersession_startimestamp'] = dkParamObj['userSession']['usersession_starttimestamp'];
                    // update user session data obj 
                    dkParamObj['userSession']['isUserInfoTrackedAccessingWebsites'] = 'Y';
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                }
            }
        }
        return paramObj;
    }catch(ex){
        return false;
    }
}


function storeTemporaryUserSignUpData(userDataObj){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(userDataObj!==false && userDataObj!==undefined
                && jQuery.isEmptyObject(userDataObj)===false){
                if(userDataObj.hasOwnProperty('name') && userDataObj.hasOwnProperty('email')
                    && userDataObj.hasOwnProperty('mobile')){
                    var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    var userSignUpDataObj = {};
                    userSignUpDataObj['name'] = userDataObj['name'];
                    userSignUpDataObj['email'] = userDataObj['email'];
                    userSignUpDataObj['mobile'] = userDataObj['mobile'];
                    dkParamObj['userSignUpData'] = userSignUpDataObj;
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                }
            }
        }
    }catch(ex){
        console.log("Problem in storeTemporaryUserSignUpData=>"+ex);
    }
}


function getTemporaryUserSignUpDataFromSesion(){
    var userSignupDataObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSignUpData')){
                var dataObj = dkParamObj['userSignUpData'];
                if(dataObj.hasOwnProperty('name') && dataObj.hasOwnProperty('email')
                    && dataObj.hasOwnProperty('mobile')){
                    if((dataObj['name']).length>0 
                        && (dataObj['email']).length>0
                        && (dataObj['mobile']).length===10){
                        userSignupDataObj = dataObj;
                    }
                }
            }
        }
    }catch(ex){
        console.log("Problem in getTemporaryUserSignUpDataFromSesion=>"+ex);
    }
    return userSignupDataObj;
}


function removeTemporaryUserSignUpDataFromSesion(){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSignUpData')===true){
                delete dkParamObj['userSignUpData'];
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        }
    }catch(ex){
        console.log("Problem in removeUserSignUpDataFromTemporarySesion=>"+ex);
    }
}


function storeTemporaryUserSignedInData(userDataObj){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(userDataObj!==false && userDataObj!==undefined
                && jQuery.isEmptyObject(userDataObj)===false){
                if(userDataObj.hasOwnProperty('name') && userDataObj.hasOwnProperty('email')
                    && userDataObj.hasOwnProperty('mobile')){
                    var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    var userSignedInDataObj = {};
                    userSignedInDataObj['name'] = userDataObj['name'];
                    userSignedInDataObj['email'] = userDataObj['email'];
                    userSignedInDataObj['mobile'] = userDataObj['mobile'];
                    userSignedInDataObj['pwd'] = userDataObj['pwd'];
                    dkParamObj['userSignedInData'] = userSignedInDataObj;
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                }
            }
        }
    }catch(ex){
        console.log("Problem in storeTemporaryUserSignedInData=>"+ex);
    }
}


function getTemporaryUserSignedInDataFromSesion(){
    var userSignedInDataObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSignedInData')){
                var dataObj = dkParamObj['userSignedInData'];
                if(dataObj.hasOwnProperty('name') && dataObj.hasOwnProperty('email')
                    && dataObj.hasOwnProperty('mobile')){
                    if((dataObj['name']).length>0 
                        && (dataObj['email']).length>0
                        && (dataObj['mobile']).length===10
                        && ((dataObj['pwd']).length>=5) && (dataObj['pwd']).length<=10){
                        userSignedInDataObj = dataObj;
                    }
                }
            }
        }
    }catch(ex){
        console.log("Problem in getTemporaryUserSignedInDataFromSesion=>"+ex);
    }
    return userSignedInDataObj;
}


function removeTemporaryUserSignedInDataFromSesion(){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSignedInData')===true){
                delete dkParamObj['userSignedInData'];
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        }
    }catch(ex){
        console.log("Problem in removeTemporaryUserSignedInDataFromSesion=>"+ex);
    }
}

function storeTemporaryUserFrgtPwdData(userDataObj){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(userDataObj!==false && userDataObj!==undefined
                && jQuery.isEmptyObject(userDataObj)===false){
                if(userDataObj.hasOwnProperty('email') && userDataObj.hasOwnProperty('tokenId')){
                    var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    var userFrgtPwdDataObj = {};
                    userFrgtPwdDataObj['email'] = userDataObj['email'];
                    userFrgtPwdDataObj['tokenId'] = userDataObj['tokenId'];
                    dkParamObj['userFrgtPwdData'] = userFrgtPwdDataObj;
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                }
            }
        }
    }catch(ex){
        console.log("Problem in storeTemporaryUserFrgtPwdData=>"+ex);
    }
}

function getTemporaryUserFrgtPwdDataFromSesion(){
    var userFrgtPwdDataObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userFrgtPwdData')){
                var dataObj = dkParamObj['userFrgtPwdData'];
                if(dataObj.hasOwnProperty('email') && dataObj.hasOwnProperty('tokenId')){
                    if((dataObj['email']).length>0 && parseInt(dataObj['tokenId'])>0){
                        userFrgtPwdDataObj = dataObj;
                    }
                }
            }
        }
    }catch(ex){
        console.log("Problem in getTemporaryUserFrgtPwdDataFromSesion=>"+ex);
    }
    return userFrgtPwdDataObj;
}

function removeTemporaryUserFrgtPwdDataFromSesion(){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userFrgtPwdData')===true){
                delete dkParamObj['userFrgtPwdData'];
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        }
    }catch(ex){
        console.log("Problem in removeTemporaryUserFrgtPwdDataFromSesion=>"+ex);
    }
}


function getParamObjFromSessionForLoadingDeliveryCityList(){
    try{
        var paramObj = {};
        paramObj['country_ids'] = '';
        paramObj['city_ids'] = '';
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                }
            }
        }
        if(paramObj['country_ids']==='1'){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function storeSelectedDeliveryCityDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['cityvalue'] = '';
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['cityname'] = '';
            if(paramObj!==false && paramObj!==undefined && paramObj!==''){
                dkParamObj['userSelectedDeliveryCityAreaDessertsType']['cityvalue'] = paramObj['cityId'];
                dkParamObj['userSelectedDeliveryCityAreaDessertsType']['cityname'] = paramObj['cityName'];
            }
            if(isResetAllSessionData==='Y'){
                dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproduct'] = '';
                dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproducttitle'] = '';
                dkParamObj['userProduct']['shopstore_value'] = '';
                dkParamObj['userProduct']['producttype_value'] = '';
                dkParamObj['userProduct']['producttype_categoryvalue'] = '';
                dkParamObj['userProduct']['producttype_listvalue'] = '';
                dkParamObj['userProduct']['producttype_featurevalue'] = '';
                dkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                dkParamObj['userProduct']['shopstore_name'] = '';
                dkParamObj['userProduct']['producttype_name'] = '';
                dkParamObj['userProduct']['producttype_categoryname'] = '';
                dkParamObj['userProduct']['producttype_listname'] = '';
            }
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        }
    }catch(ex){}
}


function getParamObjFromSessionForLoadingDeliveryAreaList(){
    try{
        var paramObj = {};
        paramObj['country_ids'] = '1';
        paramObj['city_ids'] = '';
        paramObj['area_ids'] = '';
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    if(userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue']==='1'){
                        paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
            }
        }
        return paramObj;
    }catch(ex){
        return false;
    }
}


function storeSelectedDeliveryAreaDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areavalue'] = '';
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areaname'] = '';
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areapincode'] = '';
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['ccaId'] = '';
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('areaId')===true && paramObj.hasOwnProperty('areaName')===true){
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areavalue'] = paramObj['areaId'];
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areaname'] = paramObj['areaName'];
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areapincode'] = paramObj['areaPincode'];
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['ccaId'] = paramObj['ccaId'];
                }
            } 
            if(isResetAllSessionData==='Y'){
                dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproduct'] = '';
                dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproducttitle'] = '';
                dkParamObj['userProduct']['shopstore_value'] = '';
                dkParamObj['userProduct']['producttype_value'] = '';
                dkParamObj['userProduct']['producttype_categoryvalue'] = '';
                dkParamObj['userProduct']['producttype_listvalue'] = '';
                dkParamObj['userProduct']['producttype_featurevalue'] = '';
                dkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                dkParamObj['userProduct']['shopstore_name'] = '';
                dkParamObj['userProduct']['producttype_name'] = '';
                dkParamObj['userProduct']['producttype_categoryname'] = '';
                dkParamObj['userProduct']['producttype_listname'] = '';
            }
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        }
    }catch(ex){}
}

function getParamObjFromSessionForLoadingDeliveryAreaBasedDessertsTypeList(){
    try{
        var paramObj = {};
        paramObj['country_ids'] = '1';
        paramObj['city_ids'] = '';
        paramObj['area_ids'] = '';
        paramObj['ccaId'] = '';
        paramObj['producttype_ids'] = '';
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('dessertsproduct')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['dessertsproduct'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['dessertsproduct']!==''){
                        paramObj['producttype_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['dessertsproduct'];
                    }
                }
            }
        }
        return paramObj;
    }catch(ex){
        return false;
    }
}

function storeDefaultDeliveryDessertsTypeDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        var storedDataStatus = false;
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproduct'] = '';
            dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproducttitle'] = '';
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('dessertsTypeId')===true && paramObj.hasOwnProperty('dessertsTypeTitle')===true){
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproduct'] = paramObj['dessertsTypeId'];
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproducttitle'] = paramObj['dessertsTypeTitle'];
                    if(isResetAllSessionData==='Y'){
                        dkParamObj['userProduct']['all_shopstorevalue'] = '';
                        dkParamObj['userProduct']['shopstore_value'] = '';
                        dkParamObj['userProduct']['shopstore_name'] = '';
                        dkParamObj['userProduct']['producttype_value'] = paramObj['dessertsTypeId'];
                        dkParamObj['userProduct']['producttype_name'] = paramObj['dessertsTypeTitle'];
                        dkParamObj['userProduct']['producttype_categoryvalue'] = '';
                        dkParamObj['userProduct']['producttype_categoryname'] = '';
                        dkParamObj['userProduct']['producttype_listvalue'] = '';
                        dkParamObj['userProduct']['producttype_listname'] = '';
                        dkParamObj['userProduct']['producttype_featurevalue'] = '';
                        dkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    }
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            storedDataStatus = true;
        }
        return storedDataStatus;
    }catch(ex){
        return false;
    }
}


function resetUserproductSessionData(){
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            var userProductObj = {};
            userProductObj['shopstore_value'] = '';
            userProductObj['all_shopstorevalue'] = '';
            userProductObj['shopstore_name'] = '';
            userProductObj['producttype_value'] = '';
            userProductObj['producttype_name'] = '';
            userProductObj['producttype_categoryvalue'] = '';
            userProductObj['producttype_categoryname'] = '';
            userProductObj['producttype_listvalue'] = '';
            userProductObj['producttype_listname'] = '';
            userProductObj['producttype_featurevalue'] = '';
            userProductObj['productviewed_bystatus'] = 'productwise';
            dkParamObj['userProduct'] = userProductObj;
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        }
    }catch(ex){
        console.log("Problem in resetUserproductSessionData=>"+ex);
    }
}

function getParamObjForProductTypeAllProductCategoryList(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                // extract user suggested city area session data
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    if(userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue']==='1'){
                        paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
            }
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                paramObj['shopstoreids'] = '';
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    if(parseInt(userProductObj['producttype_value'])>0
                        && userProductObj['producttype_value']!==''){
                        paramObj['product_typesids'] = userProductObj['producttype_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    paramObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                }
            }
        }
        if(Object.keys(paramObj).length>=5){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

function storeProductTypeProductCategoryDataInSession(paramDataObj, isResetAllData){
    try{
        var storeDataStatus = false;
        if(checkDkSessionParamObjExists()==='TRUE'){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            var userProductObj = dkParamObj['userProduct'];
            userProductObj['shopstore_value'] = paramDataObj['shopStoreIds'];
            userProductObj['all_shopstorevalue'] = paramDataObj['shopStoreIds'];
            userProductObj['shopstore_name'] = '';
            userProductObj['producttype_value'] = paramDataObj['productTypeId'];
            userProductObj['producttype_name'] = paramDataObj['productTypeTitle'];
            userProductObj['producttype_categoryvalue'] = paramDataObj['productTypeProductCategoryId'];
            userProductObj['producttype_categoryname'] = paramDataObj['productTypeProductCategoryTitle'];
            if(isResetAllData==='Y'){
                userProductObj['producttype_listvalue'] = '';
                userProductObj['producttype_listname'] = '';
                userProductObj['producttype_featurevalue'] = '';
            }
            userProductObj['productviewed_bystatus'] = 'productwise';
            dkParamObj['userProduct'] = userProductObj;
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            storeDataStatus = true;
        }
        return storeDataStatus;
    }catch(ex){
        return false;
    }
}


function getParamObjForProductTypeProductCategoryFilterTypeList(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    if(parseInt(userProductObj['producttype_value'])>0
                        && userProductObj['producttype_value']!==''){
                        paramObj['product_typesids'] = userProductObj['producttype_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    if(parseInt(userProductObj['producttype_categoryvalue'])>0
                        && userProductObj['producttype_categoryvalue']!==''){
                        paramObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('all_shopstorevalue')===true){
                    if((userProductObj['all_shopstorevalue']).length>0
                        && userProductObj['all_shopstorevalue']!==''){
                        paramObj['allShopstoreids'] = userProductObj['all_shopstorevalue'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===3){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function storeProductTypeProductCategoryProductDataInSession(paramDataObj){
    try{
        var storeDataStatus = false;
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            var userProductObj = {};
            userProductObj['shopstore_value'] = paramDataObj['shopStoreId'];
            userProductObj['all_shopstorevalue'] = paramDataObj['shopStoreId'];
            userProductObj['shopstore_name'] = paramDataObj['shopStoreTitle'];
            userProductObj['producttype_value'] = paramDataObj['productTypeId'];
            userProductObj['producttype_name'] = paramDataObj['productTypeTitle'];
            userProductObj['producttype_categoryvalue'] = paramDataObj['productTypeProductCategoryId'];
            userProductObj['producttype_categoryname'] = paramDataObj['productTypeProductCategoryTitle'];
            userProductObj['producttype_listvalue'] = paramDataObj['productListId'];
            userProductObj['producttype_listname'] = paramDataObj['productListTitle'];
            userProductObj['producttype_featurevalue'] = paramDataObj['productFeatureId'];
            userProductObj['productviewed_bystatus'] = 'productwise';
            dkParamObj['userProduct'] = userProductObj;
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            storeDataStatus = true;
        }
        return storeDataStatus;
    }catch(ex){
        return false;
    }
}


function getParamObjForProductTypeProductCategoryAllProductList(){
    try{
        var paramObj = {};
        paramObj['productlist_ids'] = '';
        paramObj['product_price_filter'] = '';
        paramObj['product_size_filter'] = '';
        paramObj['product_discount_filter'] = '';
        paramObj['product_featureids'] = '';
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                // extract user suggested city area session data
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
            }
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    if(parseInt(userProductObj['producttype_value'])>0
                        && userProductObj['producttype_value']!==''){
                        paramObj['product_typesids'] = userProductObj['producttype_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    if(parseInt(userProductObj['producttype_categoryvalue'])>0
                        && userProductObj['producttype_categoryvalue']!==''){
                        paramObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    paramObj['shopstoreids'] = '';
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }else if((userProductObj['all_shopstorevalue']).length>0 
                        && userProductObj['all_shopstorevalue']!==''){
                        paramObj['shopstoreids'] = userProductObj['all_shopstorevalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    if(parseInt(userProductObj['producttype_listvalue'])>0 
                        && userProductObj['producttype_listvalue']!==''){
                        paramObj['productlist_ids'] = userProductObj['producttype_listvalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                    if(parseInt(userProductObj['producttype_featurevalue'])>0 
                        && userProductObj['producttype_featurevalue']!==''){
                        paramObj['product_featureids'] = userProductObj['producttype_featurevalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('product_price_filter')===true){
                    paramObj['product_price_filter'] = userProductObj['product_price_filter'];
                }
                if(userProductObj.hasOwnProperty('product_size_filter')===true){
                    paramObj['product_size_filter'] = userProductObj['product_size_filter'];
                }
                if(userProductObj.hasOwnProperty('product_discount_filter')===true){
                    paramObj['product_discount_filter'] = userProductObj['product_discount_filter'];
                }
            }
        }
        if(Object.keys(paramObj).length>=7){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function getParamObjFromSessionForProductTypeProductCategoryProductDetails(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract user suggested city area session data
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    if(userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue']==='1'){
                        paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
            }
            
            // extract user userProduct session data
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    if(parseInt(userProductObj['producttype_value'])>0 
                        && userProductObj['producttype_value']!==''){
                        paramObj['product_typesids'] = userProductObj['producttype_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    if(parseInt(userProductObj['producttype_categoryvalue'])>0 
                        && userProductObj['producttype_categoryvalue']!==''){
                        paramObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    if(parseInt(userProductObj['producttype_listvalue'])>0 
                        && userProductObj['producttype_listvalue']!==''){
                        paramObj['productlist_ids'] = userProductObj['producttype_listvalue'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                    if(parseInt(userProductObj['producttype_featurevalue'])>0 
                        && userProductObj['producttype_featurevalue']!==''){
                        paramObj['product_featureids'] = userProductObj['producttype_featurevalue'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===9){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
    
}


function getParamObjFromSessionForProductDescriptionDetails(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    if(parseInt(userProductObj['producttype_listvalue'])>0 
                        && userProductObj['producttype_listvalue']!==''){
                        paramObj['productlist_ids'] = userProductObj['producttype_listvalue'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===1){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function getParamObjDataFromSessionFetchingDeliveryAreaBasedDessertsTypeStoresList(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract user suggested city area session data
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    if(userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue']==='1'){
                        paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
            }
            // extract user userProduct session data
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    if(parseInt(userProductObj['producttype_value'])>0 
                        && userProductObj['producttype_value']!==''){
                        paramObj['product_typesids'] = userProductObj['producttype_value'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===5){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

function getParamObjFromSessionAtDeliveryAreaBasedStoreServeDessertsTypeList(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract user suggested city area session data
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    if(userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue']==='1'){
                        paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
            }
            
            // extract user userProduct session data
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    if(parseInt(userProductObj['producttype_value'])>0 
                        && userProductObj['producttype_value']!==''){
                        paramObj['product_typesids'] = userProductObj['producttype_value'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===6){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function storeDessertsTypeDataDetailsInSessionStorageToViewStoreAllProductList(paramObj){
    try{
        var storedDataStatus = false;
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('dessertsTypeId')===true && paramObj.hasOwnProperty('dessertsTypeTitle')===true){
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproduct'] = paramObj['dessertsTypeId'];
                    dkParamObj['userSelectedDeliveryCityAreaDessertsType']['dessertsproducttitle'] = paramObj['dessertsTypeTitle'];
                    dkParamObj['userProduct'] = {};
                    dkParamObj['userProduct']['all_shopstorevalue'] = paramObj['shopStoreId'];
                    dkParamObj['userProduct']['shopstore_value'] = paramObj['shopStoreId'];
                    dkParamObj['userProduct']['shopstore_name'] = paramObj['shopStoreTitle'];
                    dkParamObj['userProduct']['producttype_value'] = paramObj['dessertsTypeId'];
                    dkParamObj['userProduct']['producttype_name'] = paramObj['dessertsTypeTitle'];
                    dkParamObj['userProduct']['producttype_categoryvalue'] = '';
                    dkParamObj['userProduct']['producttype_categoryname'] = '';
                    dkParamObj['userProduct']['producttype_listvalue'] = '';
                    dkParamObj['userProduct']['producttype_listname'] = '';
                    dkParamObj['userProduct']['producttype_featurevalue'] = '';
                    dkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            storedDataStatus = true;
        }
        return storedDataStatus;
    }catch(ex){
        return false;
    }
}


function getParamObjForStoreSummaryInfo(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===1){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

function getParamObjForCShopStoreWorkingStyleDetails(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===1){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function getParamObjStoreDeliveryFeeApplicableMsgOnDeliveryArea(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract user suggested city area session data
            if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('countryvalue')===true){
                    if(userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue']==='1'){
                        paramObj['country_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['countryvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue']!==''){
                        paramObj['city_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['cityvalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['areavalue']!==''){
                        paramObj['area_ids'] = userSelectedDeliveryCityAreaDessertsTypeObj['areavalue'];
                    }
                }
                if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'])>0 
                        && userSelectedDeliveryCityAreaDessertsTypeObj['ccaId']!==''){
                        paramObj['ccaId'] = userSelectedDeliveryCityAreaDessertsTypeObj['ccaId'];
                    }
                }
            }
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['store_id'] = userProductObj['shopstore_value'];
                    }
                }
            }
            // get logged user details
            var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(userLoggedDataObj!==false && userLoggedDataObj!==undefined){
                paramObj = $.extend(paramObj, userLoggedDataObj);
            }
        }
        if(Object.keys(paramObj).length>=5){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


function getInfoUserSelectedDeliveryCityAreaDessertsProductType(){
    try{
        var infoObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj!==false && dkParamObj!=='' && jQuery.isEmptyObject(dkParamObj)===false){
                // extract userSelectedDeliveryCityAreaDessertsType param obj
                if(dkParamObj.hasOwnProperty('userSelectedDeliveryCityAreaDessertsType')===true){
                    var userSelectedDeliveryCityAreaDessertsTypeObj = dkParamObj['userSelectedDeliveryCityAreaDessertsType'];
                    if(userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('cityname')===true 
                        && userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('areaname')===true
                        && userSelectedDeliveryCityAreaDessertsTypeObj.hasOwnProperty('dessertsproducttitle')===true){
                        if(userSelectedDeliveryCityAreaDessertsTypeObj['cityname']!=='' 
                            && userSelectedDeliveryCityAreaDessertsTypeObj['areaname']!=='' 
                            && userSelectedDeliveryCityAreaDessertsTypeObj['areapincode']!==''){
                            infoObj['userSelectedCity'] = removeHtmlStripTagsOfContent(userSelectedDeliveryCityAreaDessertsTypeObj['cityname']);
                            infoObj['userSelectedArea'] = removeHtmlStripTagsOfContent(userSelectedDeliveryCityAreaDessertsTypeObj['areaname']);
                            infoObj['userSelectedAreaPincode'] = removeHtmlStripTagsOfContent(userSelectedDeliveryCityAreaDessertsTypeObj['areapincode']);
                            infoObj['userSelectedDesserts'] = removeHtmlStripTagsOfContent(userSelectedDeliveryCityAreaDessertsTypeObj['dessertsproducttitle']);
                        }
                    }
                }
            }
        }
        return infoObj;
    }catch(ex){
        return false;
    }
}


function getCustomerBreadcrumb(){
    var customerBreadcrumbObj = {};
    if(checkDkSessionParamObjExists()==='TRUE'){
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj!==false && dkParamObj!=='' && jQuery.isEmptyObject(dkParamObj)===false){
            // extract dk userproduct param obj
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductParamObj = dkParamObj['userProduct'];
                if(userProductParamObj!==false && userProductParamObj!==undefined 
                    && jQuery.isEmptyObject(userProductParamObj)===false){
                    customerBreadcrumbObj['homeTitle'] = 'Home';
                    customerBreadcrumbObj['productTypeTitle'] = userProductParamObj['producttype_name'];
                    customerBreadcrumbObj['productCategoryTitle'] = userProductParamObj['producttype_categoryname'];
                    customerBreadcrumbObj['shopStoreTitle'] = userProductParamObj['shopstore_name']+" Store";
                    customerBreadcrumbObj['productListTitle'] = userProductParamObj['producttype_listname'];
                }
            } 
            // extract dk partyOrder param obj
            if(dkParamObj.hasOwnProperty('partyOrder')===true){
                var userPartyorderParamObj = dkParamObj['partyOrder'];
                if(userPartyorderParamObj!==false && userPartyorderParamObj!==undefined 
                    && jQuery.isEmptyObject(userPartyorderParamObj)===false){
                    customerBreadcrumbObj['partyOrderTitle'] = userPartyorderParamObj['title'];
                }
            } 
            // extract dk customizeOrder param obj
            if(dkParamObj.hasOwnProperty('customizeOrder')===true){
                var userCustomizeorderParamObj = dkParamObj['customizeOrder'];
                if(userCustomizeorderParamObj!==false && userCustomizeorderParamObj!==undefined 
                    && jQuery.isEmptyObject(userCustomizeorderParamObj)===false){
                    customerBreadcrumbObj['customizeOrderTitle'] = userCustomizeorderParamObj['title'];
                }
            } 
            // extract dk corporateTieup param obj
            if(dkParamObj.hasOwnProperty('corporateTieup')===true){
                var userCorporateTieupParamObj = dkParamObj['corporateTieup'];
                if(userCorporateTieupParamObj!==false && userCorporateTieupParamObj!==undefined 
                    && jQuery.isEmptyObject(userCorporateTieupParamObj)===false){
                    customerBreadcrumbObj['corporateTieupTitle'] = userCorporateTieupParamObj['title'];
                }
            } 
        }
    }
    return customerBreadcrumbObj;
}


function checkParamDataToRedirectForRequestPartyOrder(){
    var retStatus = false;
    if(checkDkSessionParamObjExists()==='TRUE'){
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('partyOrder')===true){
            var userPartyorderParamObj = dkParamObj['partyOrder'];
            if(userPartyorderParamObj!==false && userPartyorderParamObj!==undefined 
                && jQuery.isEmptyObject(userPartyorderParamObj)===false){
                userPartyorderParamObj['title'] = 'Party Order';
                dkParamObj['partyOrder'] = userPartyorderParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        } 
        retStatus = true;
    }
    return retStatus;
}


function checkParamDataToRedirectForRequestCustomizeOrder(){
    var retStatus = false;
    if(checkDkSessionParamObjExists()==='TRUE'){
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('customizeOrder')===true){
            var userCustomizeorderParamObj = dkParamObj['customizeOrder'];
            if(userCustomizeorderParamObj!==false && userCustomizeorderParamObj!==undefined 
                && jQuery.isEmptyObject(userCustomizeorderParamObj)===false){
                userCustomizeorderParamObj['title'] = 'Customize Order';
                dkParamObj['customizeOrder'] = userCustomizeorderParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        } 
        retStatus = true;
    }
    return retStatus;
}

// CJ defined this function 2016-07-16
function checkParamDataToRedirectForRequestCorporateTieup(){
    var retStatus = false;
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk partyOrder param obj
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('corporateTieup')===true){
            var userCorporateTieupParamObj = dkParamObj['corporateTieup'];
            if(userCorporateTieupParamObj!==false && userCorporateTieupParamObj!==undefined 
                && jQuery.isEmptyObject(userCorporateTieupParamObj)===false){
                userCorporateTieupParamObj['title'] = 'Corporate Tie-up';
                dkParamObj['corporateTieup'] = userCorporateTieupParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        } 
        retStatus = true;
    }
    return retStatus;
}


function getParamDataObjForPartyOrderRequest(){
    try{
        var paramDataObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            paramDataObj['user_sessionid'] = dkParamObj['userSession']['user_sessionid'];
            paramDataObj['udblogId'] = removeHtmlStripTagsOfContent(dkParamObj['userSession']['udblogId']);
            paramDataObj['name'] = removeHtmlStripTagsOfContent($('#po_contactPersonNameInputId').val());
            paramDataObj['mobile'] = removeHtmlStripTagsOfContent($('#po_contactMobileInputId').val());
            paramDataObj['email'] = removeHtmlStripTagsOfContent($('#po_contactEmailInputId').val());
            paramDataObj['occassion_title'] = removeHtmlStripTagsOfContent($('#po_occasionTitleInputId').val());
            paramDataObj['nos_person'] = removeHtmlStripTagsOfContent($('#po_nosPeopleInputId').val());
            paramDataObj['party_date'] = removeHtmlStripTagsOfContent($('#po_dateInputId').val());
            paramDataObj['party_venue'] = removeHtmlStripTagsOfContent($('#po_venueInputId').val());
            paramDataObj['party_requirements'] = removeHtmlStripTagsOfContent($('#po_messageInputId').val());
            paramDataObj['file'] = '';
            paramDataObj['estimated_budget'] = removeHtmlStripTagsOfContent($('#po_budgetAmtInputId').val());
        }
        if(Object.keys(paramDataObj).length===12){
            return paramDataObj;
        }else{
            return false;
        }
    }catch(ex){
        console.log("Problem in getParamDataObjForPartyOrderRequest=>"+ex);
        return false;
    }
}


function getParamDataObjForCustomizeOrderRequest(){
    try{
        var paramDataObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            paramDataObj['user_sessionid'] = dkParamObj['userSession']['user_sessionid'];
            paramDataObj['udblogId'] = dkParamObj['userSession']['udblogId'];
            paramDataObj['name'] = removeHtmlStripTagsOfContent($('#co_contactPersonNameInputId').val());
            paramDataObj['mobile'] = removeHtmlStripTagsOfContent($('#co_contactMobileInputId').val());
            paramDataObj['email'] = removeHtmlStripTagsOfContent($('#co_contactEmailInputId').val());
            paramDataObj['event_title'] = removeHtmlStripTagsOfContent($('#co_occasionTitleInputId').val());
            paramDataObj['nos_person'] = removeHtmlStripTagsOfContent($('#co_nosPeopleInputId').val());
            paramDataObj['event_date'] = removeHtmlStripTagsOfContent($('#co_dateInputId').val());
            paramDataObj['event_venue'] = removeHtmlStripTagsOfContent($('#co_venueInputId').val());
            paramDataObj['event_requirements'] = removeHtmlStripTagsOfContent($('#co_messageInputId').val());
            paramDataObj['file'] = '';
            paramDataObj['estimated_budget'] = removeHtmlStripTagsOfContent($('#co_budgetAmtInputId').val());
        }
        if(Object.keys(paramDataObj).length===12){
            return paramDataObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-07-24
function getParamDataObjForCorporateTieupRequest(){
    var paramObj = {};
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('corporateTieup')===true){
            // extract corporateTieup param obj
            var partyOrderParamObj = dkParamObj['corporateTieup'];
            if(partyOrderParamObj.hasOwnProperty('corporateTieupTitle')!==''){
                paramObj['is_LoggedInUser'] = 'N';
                paramObj['profile_id'] = '2';
            }
        }
    }
    return paramObj;
}


function getUserSessionIdFromUserSession(){
    var userSessionId = false;
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                var userSessionParamObj = dkParamObj['userSession'];
                if(userSessionParamObj.hasOwnProperty('user_sessionid')===true){
                    if(userSessionParamObj['user_sessionid']!=='' 
                        && userSessionParamObj['user_sessionid']!==false
                        && (userSessionParamObj['user_sessionid']).length>=20
                        && userSessionParamObj['user_sessionid']!==undefined){
                        userSessionId = userSessionParamObj['user_sessionid'];
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getUserSessionIdFromUserSession=>"+ex);
        userSessionId = false;
    }
    return userSessionId;
}


function storeUserSessionIdInSession(user_sessionid){
    try{
        if(user_sessionid!==false && user_sessionid!=='' 
            && user_sessionid!==undefined && (user_sessionid).length>=20){
            if(checkDkSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(dkParamObj.hasOwnProperty('userSession')===true){
                    var userSessionParamObj = dkParamObj['userSession'];
                    if(userSessionParamObj.hasOwnProperty('user_sessionid')===true){
                        userSessionParamObj['user_sessionid'] = user_sessionid;
                        dkParamObj['userSession'] = userSessionParamObj;
                        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                    }
                }
            }
        }else{
            window.location.href = globalBaseSitePath;
        }
    }catch(ex){
        console.log("problem in storeUserSessionIdInSession=>"+ex);
    }    
}


function checkUserLoggedInSession(){
    var retUserLoggedInStatus = false;
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                var userSessionParamObj = dkParamObj['userSession'];
                if(userSessionParamObj.hasOwnProperty('udblogId')===true
                    && userSessionParamObj.hasOwnProperty('user_sessionid')===true){
                    if((userSessionParamObj['user_sessionid']).length>=20 
                        && (userSessionParamObj['udblogId']).length>=20){
                        retUserLoggedInStatus = true;
                    }
                }
            }
        }
    }catch(ex){
        retUserLoggedInStatus = false;
        console.log("problem in checkUserLoggedInSession=>"+ex);
    }
    return retUserLoggedInStatus;
}


function getParamDataAuthenticatedUserDetailsFromSession(){
    var paramObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                var userSessionParamObj = dkParamObj['userSession'];
                if(userSessionParamObj.hasOwnProperty('user_sessionid')===true
                    && userSessionParamObj.hasOwnProperty('udblogId')===true){
                    if((userSessionParamObj['user_sessionid']).length>=20
                        && (userSessionParamObj['udblogId']).length>=20){
                        paramObj['udblogId'] = userSessionParamObj['udblogId'];
                        paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                        paramObj['userProfileTypeId'] = userSessionParamObj['userProfileTypeId'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===3){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        console.log("problem in getParamDataAuthenticatedUserDetailsFromSession=>"+ex);
        return false;
    }
}


function storeAuthenticatedUserDetailsInSession(paramObj){
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            if(checkDkSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(dkParamObj.hasOwnProperty('userSession')===true){
                    var userSessionParamObj = dkParamObj['userSession'];
                    if(userSessionParamObj.hasOwnProperty('user_sessionid')===true
                        && userSessionParamObj.hasOwnProperty('udblogId')===true){
                        userSessionParamObj['user_sessionid'] = paramObj['user_sessionid'];
                        userSessionParamObj['usersession_starttimestamp'] = paramObj['usersession_starttimestamp'];
                        userSessionParamObj['udblogId'] = paramObj['udblogId'];
                        userSessionParamObj['userProfileTypeId'] = paramObj['userProfileTypeId'];
                        dkParamObj['userSession'] = userSessionParamObj;
                        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in storeAuthenticatedUserDetailsInSession=>"+ex);
    }    
}


function storePageDetailsUserAccessedFrom(fromPageLoad){
    try{
        if(fromPageLoad!==false && fromPageLoad!=='' && fromPageLoad!==undefined){
            if(checkDkSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(dkParamObj.hasOwnProperty('userAccessLastPageFromObj')===true){
                    var userAccessPageDataObj = dkParamObj['userAccessLastPageFromObj'];
                    if(userAccessPageDataObj.hasOwnProperty('page')===true){
                        userAccessPageDataObj['page'] = fromPageLoad;
                        dkParamObj['userAccessLastPageFromObj'] = userAccessPageDataObj;
                        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in storePageDetailsUserAccessedFrom=>"+ex);
    }    
}


function getPageDetailsUserAccessedFrom(){
    var fromPageLoad = false;
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userAccessLastPageFromObj')===true){
                var userAccessPageDataObj = dkParamObj['userAccessLastPageFromObj'];
                if(userAccessPageDataObj.hasOwnProperty('page')===true){
                    if(userAccessPageDataObj['page']!=='' && userAccessPageDataObj['page']!==false
                        && userAccessPageDataObj['page']!==undefined){
                        fromPageLoad = userAccessPageDataObj['page'];
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getPageDetailsUserAccessedFrom=>"+ex);
        fromPageLoad = false;
    }  
    return fromPageLoad;
}


function getParamDataForUserSignInAuthentication(fromSection){
    var paramObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(checkUnAuthorizedUserSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                var userSessionParamObj = dkParamObj['userSession'];
                if(fromSection==='signInSection'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['email'] = removeHtmlStripTagsOfContent($('#userSignInEmailInputId').val());
                    paramObj['pwd'] = removeHtmlStripTagsOfContent($('#userSignInPwdInputId').val());
                    paramObj['isRequestCheckingCreditional'] = 'Y';
                    paramObj['isRequestValidateOtpAndUserSignedIn'] = 'N';
                    if(Object.keys(paramObj).length!==6){
                        paramObj = {};
                    }
                }else if(fromSection==='signInOtpSection'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['otpcode'] = removeHtmlStripTagsOfContent($('#userSignInOtpCodeInputId').val());
                    paramObj['isRequestCheckingCreditional'] = 'N';
                    paramObj['isRequestValidateOtpAndUserSignedIn'] = 'Y';
                    paramObj = $.extend(paramObj, getTemporaryUserSignedInDataFromSesion());
                    if(Object.keys(paramObj).length!==9){
                        paramObj = {};
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForUserSignInAuthentication=>"+ex);
        paramObj = {};
    }
    return paramObj;
}

function getParamDataForUserFrgtPwdAuthentication(fromSection){
    var paramObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(checkUnAuthorizedUserSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                var userSessionParamObj = dkParamObj['userSession'];
                if(fromSection==='frgtPwdStep1Section'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['email'] = removeHtmlStripTagsOfContent($('#userFrgtPwdEmailInputId').val());
                    paramObj['isRequestCheckingCreditional'] = 'Y';
                    paramObj['isRequestValidateOtp'] = 'N';
                    paramObj['isRequestUpdatePwd'] = 'N';
                    if(Object.keys(paramObj).length!==6){
                        paramObj = {};
                    }
                }else if(fromSection==='frgtPwdStep2Section'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['otpcode'] = removeHtmlStripTagsOfContent($('#userFrgtPwdOtpCodeInputId').val());
                    paramObj['isRequestCheckingCreditional'] = 'N';
                    paramObj['isRequestValidateOtp'] = 'Y';
                    paramObj['isRequestUpdatePwd'] = 'N';
                    paramObj = $.extend(paramObj, getTemporaryUserFrgtPwdDataFromSesion());
                    if(Object.keys(paramObj).length!==8){
                        paramObj = {};
                    }
                }else if(fromSection==='frgtPwdStep3Section'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['pwd'] = removeHtmlStripTagsOfContent($('#userFrgtPwdInputId').val());
                    paramObj['cpwd'] = removeHtmlStripTagsOfContent($('#userFrgtPwdConfirmInputId').val());
                    paramObj['isRequestCheckingCreditional'] = 'N';
                    paramObj['isRequestValidateOtp'] = 'N';
                    paramObj['isRequestUpdatePwd'] = 'Y';
                    paramObj = $.extend(paramObj, getTemporaryUserFrgtPwdDataFromSesion());
                    if(Object.keys(paramObj).length!==9){
                        paramObj = {};
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForUserFrgtPwdAuthentication=>"+ex);
        paramObj = {};
    }
    return paramObj;
}


function getParamDataForUserSignUpAuthentication(fromSection){
    var paramObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(checkUnAuthorizedUserSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                var userSessionParamObj = dkParamObj['userSession'];
                if(fromSection==='signUpSection'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['name'] = removeHtmlStripTagsOfContent($('#userSignUpNameInputId').val());
                    paramObj['email'] = removeHtmlStripTagsOfContent($('#userSignUpEmailInputId').val());
                    paramObj['mobile'] = removeHtmlStripTagsOfContent($('#userSignUpMobileInputId').val());
                    paramObj['EmailAuthAndOtpRequest'] = 'Y';
                    paramObj['validateOtpAndCreateAccountRequest'] = 'N';
                    if(Object.keys(paramObj).length!==7){
                        paramObj = {};
                    }
                }else if(fromSection==='signUpOtpSection'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['otpcode'] = removeHtmlStripTagsOfContent($('#userSignUpOtpCodeInputId').val());
                    paramObj['pwd'] = removeHtmlStripTagsOfContent($('#userSignUpPwdInputId').val());
                    paramObj['EmailAuthAndOtpRequest'] = 'N';
                    paramObj['validateOtpAndCreateAccountRequest'] = 'Y';
                    paramObj = $.extend(paramObj, getTemporaryUserSignUpDataFromSesion());
                    if(Object.keys(paramObj).length!==9){
                        paramObj = {};
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForUserSignUpAuthentication=>"+ex);
        paramObj = {};
    }
    return paramObj;
}


function getParamDataForResendOtpcode(fromSection){
    var paramObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            if(checkUnAuthorizedUserSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                var userSessionParamObj = dkParamObj['userSession'];
                if(fromSection==='signInOtpSection'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['purposetype'] = 'resendForSignIn';
                    paramObj = $.extend(paramObj, getTemporaryUserSignedInDataFromSesion());
                    if(Object.keys(paramObj).length!==7){
                        paramObj = {};
                    }
                }
                if(fromSection==='signUpOtpSection'){
                    paramObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    paramObj['usersession_starttimestamp'] = userSessionParamObj['usersession_starttimestamp'];
                    paramObj['purposetype'] = 'resendForSignUp';
                    paramObj = $.extend(paramObj, getTemporaryUserSignUpDataFromSesion());
                    if(Object.keys(paramObj).length!==6){
                        paramObj = {};
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForResendOtpcode=>"+ex);
        paramObj = {};
    }
    return paramObj;
}


function storeRequestedSectionNameToAccessInUserAccount(requestedSectionNameAccessInUserAccount){
    try{
        if(requestedSectionNameAccessInUserAccount!==false && requestedSectionNameAccessInUserAccount!=='' 
            && requestedSectionNameAccessInUserAccount!==undefined){
            if(checkDkSessionParamObjExists()==='TRUE'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(dkParamObj.hasOwnProperty('requestedSectionUserAccountObj')===true){
                    var sectionName = requestedSectionNameAccessInUserAccount;
                    var displaySectionName = requestedSectionNameAccessInUserAccount;
                    if(sectionName==='personalinfo'){
                        displaySectionName = 'Personal Info';
                    }
                    if(sectionName==='changepassword'){
                        displaySectionName = 'Change Password';
                    }
                    if(sectionName==='ordercart'){
                        displaySectionName = 'Order cart';
                    }
                    if(sectionName==='shareoffers'){
                        displaySectionName = 'Share offers';
                    }
                    if(sectionName==='partyorder'){
                        displaySectionName = 'Party Order';
                    }
                    if(sectionName==='customizeorder'){
                        displaySectionName = 'Customize Order';
                    }
                    dkParamObj['requestedSectionUserAccountObj'] = {
                        "requestedSectionName":sectionName,
                        "displaySectionName":displaySectionName
                    };
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                }
            }
        }
    }catch(ex){
        console.log("problem in storeRequestedSectionNameToAccessInUserAccount=>"+ex);
    }    
}


function getStoredRequestedSectionNameToAccessInUserAccount(){
    var paramObj = {};
    try{
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('requestedSectionUserAccountObj')===true){
                if(jQuery.isEmptyObject(dkParamObj['requestedSectionUserAccountObj'])===false){
                    paramObj = dkParamObj['requestedSectionUserAccountObj'];
                }
            }
        }
    }catch(ex){
        console.log("problem in getStoredRequestedSectionNameToAccessInUserAccount=>"+ex);
        paramObj = {};
    } 
    if(Object.keys(paramObj).length===2){
        return paramObj;
    }else{
        return false;
    }
}


function getParamDataToUpdateUserpersonalInfo(){
    var paramObj = {};
    try{
        if($('#userFullNameInputId').length===1){
            paramObj['name'] = removeHtmlStripTagsOfContent($('#userFullNameInputId').val());
        }
        if($('#userEmailInputId').length===1){
            paramObj['email'] = removeHtmlStripTagsOfContent($('#userEmailInputId').val());
        }
        if($('#userMobileInputId').length===1){
            paramObj['mobile'] = removeHtmlStripTagsOfContent($('#userMobileInputId').val());
        }
        if($('#uca_genderSelectCtrlId').length===1){
            paramObj['gender'] = removeHtmlStripTagsOfContent($('#uca_genderSelectCtrlId').find('option:selected').val());
        }
        if($('#userBirthdateInputId').length===1){
            paramObj['birthdate'] = removeHtmlStripTagsOfContent($('#userBirthdateInputId').val());
        }
        var userSessionDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userSessionDataObj!==false && userSessionDataObj!==undefined 
            && jQuery.isEmptyObject(userSessionDataObj)===false){
            paramObj = $.extend(paramObj, userSessionDataObj);
        }
        if(Object.keys(paramObj).length===8){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        console.log("problem in getParamDataToUpdateUserpersonalInfo=>"+ex);
        return false;
    } 
}


function getParamDataToUpdateUserpasswordInfo(){
    var paramObj = {};
    try{
        if($('.editOldPasswordInputClass').length===1){
            paramObj['old_password'] = removeHtmlStripTagsOfContent($('.editOldPasswordInputClass').val());
        }
        if($('.editNewPasswordInputClass').length===1){
            paramObj['new_password'] = removeHtmlStripTagsOfContent($('.editNewPasswordInputClass').val());
        }
        if($('.editNewConfirmPasswordInputClass').length===1){
            paramObj['newc_password'] = removeHtmlStripTagsOfContent($('.editNewConfirmPasswordInputClass').val());
        }
        // fetch user session data
        var userSessionDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userSessionDataObj!==false && userSessionDataObj!==undefined 
            && jQuery.isEmptyObject(userSessionDataObj)===false){
            paramObj = $.extend(paramObj, userSessionDataObj);
        }
        if(Object.keys(paramObj).length===6){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        console.log("problem in getParamDataToUpdateUserpasswordInfo=>"+ex);
        return false;
    } 
}


function storeUserOrderItemInSession(fcontentClass){
    var userOrderItemObj = {};
    try{
        
        // through view cakes/chocolates etc product page
        if(fcontentClass!==undefined && fcontentClass!=='' && fcontentClass!==false){
            if($('.'+fcontentClass).length===1){
                var productPrice = 0;
                userOrderItemObj['description'] = '';
                if($('.'+fcontentClass).find('textarea').length===1){
                    userOrderItemObj['description'] = removeHtmlStripTagsOfContent($('.'+fcontentClass).find('textarea').val());
                }
                if($('.'+fcontentClass).find('select').length===1){
                    var productMeasurementSelectInputObj = $('.'+fcontentClass).find('option:selected');
                    if(productMeasurementSelectInputObj!==undefined && productMeasurementSelectInputObj!=='' && productMeasurementSelectInputObj!==false){
                        productPrice = parseFloat($(productMeasurementSelectInputObj).attr("data-productprice"));
                        userOrderItemObj['store_id'] = $(productMeasurementSelectInputObj).attr("data-shopstore_id");
                        userOrderItemObj['ccaId'] = $(productMeasurementSelectInputObj).attr("data-ccaid");
                        userOrderItemObj['deliveryfee'] = $(productMeasurementSelectInputObj).attr("data-deliveryfee");
                        userOrderItemObj['minorderamt'] = $(productMeasurementSelectInputObj).attr("data-minorderamt");
                        userOrderItemObj['featureid'] = $(productMeasurementSelectInputObj).attr("data-productfeatureid");
                        userOrderItemObj['size'] = $(productMeasurementSelectInputObj).val();
                    }
                }
                if($('.'+fcontentClass).find("input[type='text']").length===1 && productPrice>0){
                    var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                    var productTotalAmt = (userProductQty * productPrice);
                    userOrderItemObj['qty'] = userProductQty;
                    userOrderItemObj['price'] = productPrice;
                    userOrderItemObj['totalamount'] = productTotalAmt;
                }
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(dkParamObj!==false && dkParamObj!==undefined){
                    userOrderItemObj['areaname'] = dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areaname'];
                }
            }
        }
    }catch(ex){
        // console.log("problem in storeUserOrderItemInSession ex=>"+ex);
        userOrderItemObj = {};
    }
    if(Object.keys(userOrderItemObj).length===11){
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        dkParamObj['userOrderItemObj'] = userOrderItemObj;
        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
    }
}

function getParamDataToAddProductInOrdercart(fcontentClass, fromSession){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            
            // through view product page
            if(fcontentClass!==undefined && fcontentClass!=='' && fcontentClass!==false){
                if($('.'+fcontentClass).length===1){
                    var productPrice = 0;
                    paramObj['description'] = '';
                    if($('.'+fcontentClass).find('textarea').length===1){
                        paramObj['description'] = removeHtmlStripTagsOfContent($('.'+fcontentClass).find('textarea').val());
                    }
                    if($('.'+fcontentClass).find('select').length===1){
                        var productMeasurementSelectInputObj = $('.'+fcontentClass).find('option:selected');
                        if(productMeasurementSelectInputObj!==undefined && productMeasurementSelectInputObj!=='' && productMeasurementSelectInputObj!==false){
                            productPrice = parseFloat($(productMeasurementSelectInputObj).attr("data-productprice"));
                            paramObj['store_id'] = $(productMeasurementSelectInputObj).attr("data-shopstore_id");
                            paramObj['ccaId'] = $(productMeasurementSelectInputObj).attr("data-ccaid");
                            paramObj['deliveryfee'] = $(productMeasurementSelectInputObj).attr("data-deliveryfee");
                            paramObj['minorderamt'] = $(productMeasurementSelectInputObj).attr("data-minorderamt");
                            paramObj['featureid'] = $(productMeasurementSelectInputObj).attr("data-productfeatureid");
                            paramObj['size'] = $(productMeasurementSelectInputObj).val();
                        }
                    }
                    if($('.'+fcontentClass).find("input[type='text']").length===1 && productPrice>0){
                        var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                        var productTotalAmt = (userProductQty * productPrice);
                        paramObj['qty'] = userProductQty;
                        paramObj['price'] = productPrice;
                        paramObj['totalamount'] = productTotalAmt;
                    }
                    var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    if(dkParamObj!==false && dkParamObj!==undefined){
                        paramObj['areaname'] = dkParamObj['userSelectedDeliveryCityAreaDessertsType']['areaname'];
                    }
                }
            }
            
            // through dk session 
            if(fromSession==='session'){
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(dkParamObj.hasOwnProperty('userOrderItemObj')===true){
                    var userOrderItemObj = dkParamObj['userOrderItemObj'];
                    paramObj = $.extend(paramObj, userOrderItemObj);
                }
            }
        }
        if(Object.keys(paramObj).length===14){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToAddProductInOrdercart ex=>"+ex);
        return false;
    }
}


function getParamDataToUpdateItemInOrdercart(productDetailsObj, fcontentClass){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false
            && productDetailsObj!==false && productDetailsObj!==undefined 
            && jQuery.isEmptyObject(productDetailsObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            if($('.'+fcontentClass).find("input[type='text']").length===1){
                var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                var productPrice = removeHtmlStripTagsOfContent(productDetailsObj['price']);
                if(parseInt(userProductQty)>0 && userProductQty!=='' 
                    && parseFloat(productPrice)>0 && productPrice!==''){
                    var productTotalAmt = removeHtmlStripTagsOfContent((userProductQty * productPrice));
                    paramObj['ordercartId'] = productDetailsObj['ordercartId'];
                    paramObj['ordercartStoreId'] = productDetailsObj['ordercartStoreId'];
                    paramObj['store_id'] = productDetailsObj['store_id'];
                    paramObj['ccaId'] = productDetailsObj['ccaId'];
                    paramObj['minorderamt'] = productDetailsObj['minorderamt'];
                    paramObj['deliveryfee'] = productDetailsObj['deliveryfee'];
                    paramObj['orderStoreItemId'] = productDetailsObj['orderStoreItemId'];
                    paramObj['qty'] = userProductQty;
                    paramObj['totalamount'] = productTotalAmt;
                }
            }
        }
        if(Object.keys(paramObj).length===12){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToUpdateItemInOrdercart ex=>"+ex);
        return false;
    }
}


function getParamDataToRemoveItemFromOrdercart(productDetailsObj){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false
            && productDetailsObj!==false && productDetailsObj!==undefined 
            && jQuery.isEmptyObject(productDetailsObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            paramObj['ordercartId'] = productDetailsObj['ordercartId'];
            paramObj['ordercartStoreId'] = productDetailsObj['ordercartStoreId'];
            paramObj['store_id'] = productDetailsObj['store_id'];
            paramObj['ccaId'] = productDetailsObj['ccaId'];
            paramObj['minorderamt'] = productDetailsObj['minorderamt'];
            paramObj['deliveryfee'] = productDetailsObj['deliveryfee'];
            paramObj['orderStoreItemId'] = productDetailsObj['orderStoreItemId'];
            paramObj['status'] = 'ZC';
            paramObj['reason'] = 'Removed/Deleted by customer';
        }
        if(Object.keys(paramObj).length===12){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToRemoveItemFromOrdercart ex=>"+ex);
        return false;
    }
}

function getParamDataToUdateOrderDeliveryAddressInOrdercartStore(fcontentClass){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            // through view product page
            if(fcontentClass!==undefined && fcontentClass!=='' && fcontentClass!==false){
                if($('.'+fcontentClass).length>0){
                    paramObj['orderDeliveryDataArr'] = new Array();
                    // iterate each form content
                    $('.'+fcontentClass).each(function(){
                        var currentFormContentObj = $(this);
                        var eachOrderDeliveryDataObj = {};
                        eachOrderDeliveryDataObj['ordercartStoreId'] = removeHtmlStripTagsOfContent($(currentFormContentObj).attr('data-ordercartstoreid'));
                        if($(currentFormContentObj).find('textarea').length===1){
                            var deliveryAddress = removeHtmlStripTagsOfContent($(currentFormContentObj).find('textarea').val());
                            if(deliveryAddress!=='' && deliveryAddress!==false 
                                && deliveryAddress!==undefined){
                                eachOrderDeliveryDataObj['address'] = deliveryAddress;
                            }
                        }
                        if($(currentFormContentObj).find("input[type='text']").length===1){
                            var deliveryDate = removeHtmlStripTagsOfContent($(currentFormContentObj).find("input[type='text']").val());
                            if(deliveryDate!=='' && deliveryDate!==false && deliveryDate!==undefined){
                                eachOrderDeliveryDataObj['deliverydate'] = deliveryDate;
                            }
                        }
                        if(Object.keys(eachOrderDeliveryDataObj).length===3){
                            (paramObj['orderDeliveryDataArr']).push(eachOrderDeliveryDataObj);
                        }
                    });
                }
            }
        }
        if(Object.keys(paramObj).length===4){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        console.log("problem in getParamDataToAddOrderDeliveryAddressInOrdercartStore ex=>"+ex);
        return false;
    }
}


function getParamObjFromSessionForRatingReviewDetails(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    if(parseInt(userProductObj['producttype_listvalue'])>0 
                        && userProductObj['producttype_listvalue']!==''){
                        paramObj['productlist_ids'] = userProductObj['producttype_listvalue'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===2){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }    
}


function getParamObjFromSessionForStoreAllUserRatingReviewedDetails(){
    try{
        var paramObj = {};
        if(checkDkSessionParamObjExists()==='TRUE'){
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    if(parseInt(userProductObj['shopstore_value'])>0 
                        && userProductObj['shopstore_value']!==''){
                        paramObj['shopstoreids'] = userProductObj['shopstore_value'];
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===1){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        
    }   
}


function getParamDataForAddingUserRatingReviewProduct(fcClass){
    var paramDataObj = {};
    try{
        var userSessionDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userSessionDataObj!==false && userSessionDataObj!==undefined 
            && jQuery.isEmptyObject(userSessionDataObj)===false){
            if($('.'+fcClass).length===1){
                paramDataObj = $.extend(paramDataObj, userSessionDataObj);
                var ratingReviewedProductArr = new Array();
                if($('.'+fcClass).find('textarea').length===1){
                    var userEachQuesAnswerRatingReviewAbtProductObj = {};
                    var commentInputObj = $('.'+fcClass).find('textarea');
                    userEachQuesAnswerRatingReviewAbtProductObj['store_id'] = $(commentInputObj).attr('data-storeid');
                    userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = $(commentInputObj).attr('data-productlistid');
                    userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = $(commentInputObj).attr('data-questionid');
                    userEachQuesAnswerRatingReviewAbtProductObj['given_answertext'] = removeHtmlStripTagsOfContent($(commentInputObj).val());
                    userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = $(commentInputObj).attr('data-questionpattern');
                    var store_id = $(commentInputObj).attr('data-storeid');
                    var product_listid = $(commentInputObj).attr('data-productlistid');
                    var question_id = $(commentInputObj).attr('data-questionid');
                    var given_answerpoints = removeHtmlStripTagsOfContent($(commentInputObj).val());
                    var answer_pattern = $(commentInputObj).attr('data-questionpattern');
                    if(parseInt(store_id)>0 && parseInt(product_listid)>0 
                        && parseInt(question_id)>0 && given_answerpoints!=='' && answer_pattern!==''){
                        userEachQuesAnswerRatingReviewAbtProductObj['store_id'] = store_id;
                        userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = product_listid;
                        userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = question_id;
                        userEachQuesAnswerRatingReviewAbtProductObj['given_answerpoints'] = given_answerpoints;
                        userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = answer_pattern;
                        ratingReviewedProductArr.push(userEachQuesAnswerRatingReviewAbtProductObj);
                    }
                }
                if($('.'+fcClass).find('select').length===3){
                    // iterate each 
                    $('.'+fcClass).find('select').each(function(eachIndex){
                        var selectInputObj = $(this);
                        var points = $(this).find('option:selected').val();
                        var userEachQuesAnswerRatingReviewAbtProductObj = {};
                        var store_id = $(selectInputObj).find('option:selected').attr('data-storeid');
                        var product_listid = $(selectInputObj).find('option:selected').attr('data-productlistid');
                        var question_id = $(selectInputObj).find('option:selected').attr('data-questionid');
                        var given_answerpoints = points;
                        var answer_pattern = $(selectInputObj).find('option:selected').attr('data-questionpattern');
                        if(parseInt(store_id)>0 && parseInt(product_listid)>0 
                            && parseInt(question_id)>0 && given_answerpoints!=='' && answer_pattern!==''){
                            userEachQuesAnswerRatingReviewAbtProductObj['store_id'] = store_id;
                            userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = product_listid;
                            userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = question_id;
                            userEachQuesAnswerRatingReviewAbtProductObj['given_answerpoints'] = given_answerpoints;
                            userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = answer_pattern;
                            ratingReviewedProductArr.push(userEachQuesAnswerRatingReviewAbtProductObj);
                        }
                    });
                }
                if(ratingReviewedProductArr.length===4){
                    paramDataObj['ratingReviewedProductArr'] = ratingReviewedProductArr;
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForAddingUserRatingReviewAbtProduct=>"+ex);
        paramDataObj = {};
    }
    if(Object.keys(paramDataObj).length===4){
        return paramDataObj;
    }else{
        return false;
    }
}


/////////////////// sharing offers code ////////////////////////////


// CJ defined this function 2016-08-28
function getParamDataToSharingOffersFromOneUserToOtherUsers(sharingOffersDataObj, fcontentClass){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            if($('.'+fcontentClass).find("input[type='text']").length===1){
                var userMobileVal = removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val());
                if(userMobileVal!=='' && userMobileVal!==false
                    && sharingOffersDataObj!==false && sharingOffersDataObj!==undefined 
                    && jQuery.isEmptyObject(sharingOffersDataObj)===false){
                    if(sharingOffersDataObj.hasOwnProperty('dcgId')===true){
                        if(parseInt(sharingOffersDataObj['dcgId'])>0){
                            paramObj['discount_couponid'] = sharingOffersDataObj['dcgId'];
                            paramObj['shared_onmobile'] = userMobileVal;
                        }
                    }
                }
            }
        }
        if(Object.keys(paramObj).length===5){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToUpdateItemInOrdercart ex=>"+ex);
        return false;
    }
}
