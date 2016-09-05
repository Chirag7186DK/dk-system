
//////////////////////// DK session related data ////////////////////////

// CJ defined this function 2016-07-28

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

        var dkSelectedDeliveryCityAreaDessertsProductObj = {};
        dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'] = '1';
        dkSelectedDeliveryCityAreaDessertsProductObj['countryname'] = 'India';
        dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['cityname'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['areapincode'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['areaname'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['dessertsproduct'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['dessertsproducttitle'] = '';
        dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'] = '';

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

        var requestedSectionUserAccountObj = {};

        var dkParamObj = {};
        dkParamObj['userSession'] = userSessionObj;
        dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'] = dkSelectedDeliveryCityAreaDessertsProductObj;
        dkParamObj['userProduct'] = userProductObj;
        dkParamObj['partyOrder'] = userPartyOrderObj;
        dkParamObj['corporateTieup'] = corporateTieupObj;
        dkParamObj['customizeOrder'] = customizeOrderObj;
        dkParamObj['userRecentlyProduct'] = userRecentlyViewedProductObj;
        dkParamObj['userAccessLastPageFromObj'] = userAccessLastPageFromObj;
        dkParamObj['userOrderItemObj'] = userOrderItemObj;
        dkParamObj['requestedSectionUserAccountObj'] = requestedSectionUserAccountObj;

        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        generateDkUserSessionId();
        return true;
    }catch(ex){
        return false;
    }    
}

// CJ defined this function 2016-07-28
function resetDKSessionData(){
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check userSession key present or not 
            if(dkParamObj.hasOwnProperty('userSession')===true){
                dkParamObj['userSession']['usersession_starttimestamp'] = (new Date()).getTime();
                dkParamObj['userSession']['lastupdated_sessiontime'] = '';
                dkParamObj['userSession']['user_sessionid'] = '';
                dkParamObj['userSession']['udblogId'] = '';
                dkParamObj['userSession']['userProfileTypeId'] = '';
                dkParamObj['userAccessLastPageFromObj'] = {"page":""};
                dkParamObj['userOrderItemObj'] = {};
                dkParamObj['requestedSectionUserAccountObj'] = {};
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        }
    }catch(ex){
        console.log("Problem in resetDKSessionData=>"+ex);
    }
}


/////////////////////// Tracking user accessing websites info related data //////////////////////////

// CJ defined this function 2016-07-24
function getParamDataObjForAddingTrackingUserInfoAccessingWebsitesDetails(fromPageLoad){
    try{
        var paramObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
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


//////////////////////// Delivery city list related data ////////////////////////////////////


// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDkDeliveryCityList(){
    try{
        var paramObj = {};
        paramObj['country_ids'] = '';
        paramObj['city_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
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


// CJ defined this function 2016-07-10
function storeDefaultDeliveryCityDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            // checking session param
            if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
                if(paramObj.hasOwnProperty('cityId')===true && paramObj.hasOwnProperty('cityName')===true){
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['cityvalue'] = paramObj['cityId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['cityname'] = paramObj['cityName'];
                    if(isResetAllSessionData==='Y'){
                        existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = '';
                        existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = '';
                        existingDkParamObj['userProduct']['shopstore_value'] = '';
                        existingDkParamObj['userProduct']['producttype_value'] = '';
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                        existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                        existingDkParamObj['userProduct']['shopstore_name'] = '';
                        existingDkParamObj['userProduct']['producttype_name'] = '';
                        existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                        existingDkParamObj['userProduct']['producttype_listname'] = '';
                    }
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                }
            }
        }
    }catch(ex){}
}


//////////////////////// Delivery area list related data ////////////////////////////////////

// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDKDeliveryAreaList(){
    try{
        var paramObj = {};
        paramObj['country_ids'] = '1';
        paramObj['city_ids'] = '';
        paramObj['area_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    if(dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue']==='1'){
                        paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue']!==''){
                        paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['areavalue']!==''){
                        paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
                    }
                }
            }
        }
        return paramObj;
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-07-10
function storeDefaultDeliveryAreaDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['areavalue'] = '';
            existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['areaname'] = '';
            existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['ccaId'] = '';
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('areaId')===true && paramObj.hasOwnProperty('areaName')===true){
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['areavalue'] = paramObj['areaId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['areaname'] = paramObj['areaName'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['areapincode'] = paramObj['areaPincode'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['ccaId'] = paramObj['ccaId'];
                    if(isResetAllSessionData==='Y'){
                        existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = '';
                        existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = '';
                        existingDkParamObj['userProduct']['shopstore_value'] = '';
                        existingDkParamObj['userProduct']['producttype_value'] = '';
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                        existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                        existingDkParamObj['userProduct']['shopstore_name'] = '';
                        existingDkParamObj['userProduct']['producttype_name'] = '';
                        existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                        existingDkParamObj['userProduct']['producttype_listname'] = '';
                    }
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
        }
    }catch(ex){}
}


//////////////////////// Delivery area served dessert type list related data /////////////////////////

// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDKDeliveryAreaBasedDessertsTypeList(){
    try{
        var paramObj = {};
        paramObj['country_ids'] = '1';
        paramObj['city_ids'] = '';
        paramObj['area_ids'] = '';
        paramObj['ccaId'] = '';
        paramObj['producttype_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['ccaId']!==''){
                        paramObj['ccaId'] = dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue']!==''){
                        paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['areavalue']!==''){
                        paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproduct')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['dessertsproduct'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['dessertsproduct']!==''){
                        paramObj['producttype_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['dessertsproduct'];
                    }
                }
            }
        }
        return paramObj;
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-07-10
function storeDefaultDeliveryDessertsTypeDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        var storedDataStatus = false;
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = '';
            existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = '';
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('dessertsTypeId')===true && paramObj.hasOwnProperty('dessertsTypeTitle')===true){
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['dessertsTypeId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['dessertsTypeTitle'];
                    if(isResetAllSessionData==='Y'){
                        existingDkParamObj['userProduct']['all_shopstorevalue'] = '';
                        existingDkParamObj['userProduct']['shopstore_value'] = '';
                        existingDkParamObj['userProduct']['shopstore_name'] = '';
                        existingDkParamObj['userProduct']['producttype_value'] = paramObj['dessertsTypeId'];
                        existingDkParamObj['userProduct']['producttype_name'] = paramObj['dessertsTypeTitle'];
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                        existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_listname'] = '';
                        existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                        existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    }
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
            storedDataStatus = true;
        }
        return storedDataStatus;
    }catch(ex){
        return false;
    }
}


///////////// all products level related code ////////////////


// CJ defined this function 2016-09-03
function getParamObjForProductTypeAllProductCategoryList(){
    try{
        var paramObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    if(dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue']==='1'){
                        paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'])>0
                        && dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue']!==''){
                        paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'])>0
                        && dkSelectedDeliveryCityAreaDessertsProductObj['areavalue']!==''){
                        paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'])>0
                        && dkSelectedDeliveryCityAreaDessertsProductObj['ccaId']!==''){
                        paramObj['ccaId'] = dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'];
                    }
                }
            }
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    paramObj['shopstoreids'] = '';
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


// CJ defined this function 2016-09-04
function storeProductTypeProductCategoryDataInSession(productTypeProductCategoryDataObj){
    try{
        var storeDataStatus = false;
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            var userProductObj = {};
            userProductObj['shopstore_value'] = '';
            userProductObj['all_shopstorevalue'] = productTypeProductCategoryDataObj['shopStoreIds'];
            userProductObj['shopstore_name'] = '';
            userProductObj['producttype_value'] = productTypeProductCategoryDataObj['productTypeId'];
            userProductObj['producttype_name'] = productTypeProductCategoryDataObj['productTypeTitle'];
            userProductObj['producttype_categoryvalue'] = productTypeProductCategoryDataObj['productTypeProductCategoryId'];
            userProductObj['producttype_categoryname'] = productTypeProductCategoryDataObj['productTypeProductCategoryTitle'];
            userProductObj['producttype_listvalue'] = '';
            userProductObj['producttype_listname'] = '';
            userProductObj['producttype_featurevalue'] = '';
            userProductObj['productviewed_bystatus'] = 'productwise';
            existingDkParamObj['userProduct'] = userProductObj;
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
            storeDataStatus = true;
        }
        return storeDataStatus;
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-09-03
function getParamObjForProductTypeProductCategoryFilterTypeList(){
    try{
        var paramObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
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
        if(Object.keys(paramObj).length==3){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-06-17
function getParamObjForProductTypeProductCategoryAllProductList(){
    try{
        var paramObj = {};
        paramObj['shopstoreids'] = '';
        paramObj['product_price_filter'] = '';
        paramObj['product_size_filter'] = '';
        paramObj['product_discount_filter'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'])>0
                        && dkSelectedDeliveryCityAreaDessertsProductObj['ccaId']!==''){
                        paramObj['ccaId'] = dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'];
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


// CJ defined this function 2016-06-06
function getParamObjFromSessionForProductTypeProductCategoryProductDetails(){
    try{
        
        var paramObj = {};

        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            
            // extract user suggested city area session data
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    if(dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue']==='1'){
                        paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue']!==''){
                        paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['areavalue']!==''){
                        paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['ccaId']!==''){
                        paramObj['ccaId'] = dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'];
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


// CJ defined this function 2016-06-06
function getParamObjFromSessionForProductDescriptionDetails(){
    try{
        var paramObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
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


// CJ defined this function 2016-07-11
function checkAllParamToViewAllProducts(paramObj){
    var retStatus = false;
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            if(paramObj.hasOwnProperty('productTypeId')===true
                && paramObj.hasOwnProperty('productTypeTitle')===true){
                if(parseInt(paramObj['productTypeId'])>0 && paramObj['productTypeTitle']!==''){
                    // extract dk param obj && reset user product & dkSelectedDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['shopstore_value'] = '';
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['productTypeId'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                    if(paramObj.hasOwnProperty('productTypeCategoryId')===true){
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = paramObj['productTypeCategoryId'];
                    }else if(paramObj.hasOwnProperty('productCategoryId')===true){
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = paramObj['productCategoryId'];
                    }
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = '';
                    existingDkParamObj['userProduct']['producttype_name'] =  paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                    if(paramObj.hasOwnProperty('productTypeProductCategoryTitle')===true){
                        existingDkParamObj['userProduct']['producttype_categoryname'] = paramObj['productTypeProductCategoryTitle'];
                    }else if(paramObj.hasOwnProperty('productCategoryTitle')===true){
                        existingDkParamObj['userProduct']['producttype_categoryname'] = paramObj['productCategoryTitle'];
                    }
                    existingDkParamObj['userProduct']['producttype_listname'] = '';
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    retStatus = true;
                }
            }
        }
    }catch(ex){
        retStatus = false;
    }
    return retStatus;
}


// CJ defined this function 2016-07-10
function checkAllParamToViewProductDetails(paramObj){
    var retStatus = false;
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            if(paramObj.hasOwnProperty('shopStoreId')===true 
                && paramObj.hasOwnProperty('shopStoreTitle')===true
                && paramObj.hasOwnProperty('productTypeId')===true
                && paramObj.hasOwnProperty('productTypeTitle')===true 
                && paramObj.hasOwnProperty('productTypeProductCategoryId')===true 
                && paramObj.hasOwnProperty('productTypeProductCategoryTitle')===true
                && paramObj.hasOwnProperty('productListId')===true
                && paramObj.hasOwnProperty('productListTitle')===true
                && paramObj.hasOwnProperty('productFeatureId')===true ){
                if(parseInt(paramObj['shopStoreId'])>0 && parseInt(paramObj['productTypeId'])>0
                    && parseInt(paramObj['productTypeProductCategoryId'])>0
                    && parseInt(paramObj['productListId'])>0 && parseInt(paramObj['productFeatureId'])>0
                    && paramObj['shopStoreTitle']!=='' && paramObj['productTypeTitle']!==''
                    && paramObj['productTypeProductCategoryTitle']!=='' && paramObj['productListTitle']!==''){
                    
                    // extract dk param obj && reset user product & dkSelectedDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['shopstore_value'] = paramObj['shopStoreId'];
                    existingDkParamObj['userProduct']['shopstore_name'] = paramObj['shopStoreTitle'];
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['productTypeId'];
                    existingDkParamObj['userProduct']['producttype_name'] =  paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = paramObj['productTypeProductCategoryId'];
                    existingDkParamObj['userProduct']['producttype_categoryname'] = paramObj['productTypeProductCategoryTitle'];
                    existingDkParamObj['userProduct']['producttype_listvalue'] = paramObj['productListId'];
                    existingDkParamObj['userProduct']['producttype_listname'] = paramObj['productListTitle'];
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = paramObj['productFeatureId'];
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    retStatus = true;
                }
            }
        }
    }catch(ex){
        retStatus = false;
    }
    return retStatus;
}


// CJ defined this function 2016-07-10
function checkAllParamToViewCShopStore(paramObj){
    // alert(JSON.stringify(paramObj));
    var retStatus = false;
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            if(paramObj.hasOwnProperty('productTypeId')===true 
                && paramObj.hasOwnProperty('productTypeTitle')===true
                && paramObj.hasOwnProperty('shopStoreTitle')===true){
                if(parseInt(paramObj['shopStoreId'])>0 && parseInt(paramObj['productTypeId'])>0
                    && paramObj['shopStoreTitle']!=='' && paramObj['productTypeTitle']!==''){
                    // extract dk param obj && reset user product & dkSelectedDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['shopstore_value'] = paramObj['shopStoreId'];
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['productTypeId'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                    if(paramObj.hasOwnProperty('productTypeProductCategoryId')===true){
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = paramObj['productTypeProductCategoryId'];
                    }
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    if(paramObj.hasOwnProperty('productListId')===true){
                        existingDkParamObj['userProduct']['producttype_listvalue'] = paramObj['productListId'];
                    }
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = paramObj['shopStoreTitle'];
                    existingDkParamObj['userProduct']['producttype_name'] =  paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                    if(paramObj.hasOwnProperty('productTypeProductCategoryTitle')===true){
                        existingDkParamObj['userProduct']['producttype_categoryname'] = paramObj['productTypeProductCategoryTitle'];
                    }    
                    existingDkParamObj['userProduct']['producttype_listname'] = '';
                    sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
                    retStatus = true;
                }
            }
        }
    }catch(ex){
        retStatus = false;
    }
    return retStatus;
}


/////////////////// store level related code ////////////////////////////////


// CJ defined this function 2016-09-04
function getParamObjFromSessionAtDeliveryAreaBasedCStoreServeDessertsTypeList(){
    try{
        var paramObj = {};

        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            
            // extract user suggested city area session data
            if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    if(dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue']==='1'){
                        paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue']!==''){
                        paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['areavalue']!==''){
                        paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
                    }
                }
                if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('ccaId')===true){
                    if(parseInt(dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'])>0 
                        && dkSelectedDeliveryCityAreaDessertsProductObj['ccaId']!==''){
                        paramObj['ccaId'] = dkSelectedDeliveryCityAreaDessertsProductObj['ccaId'];
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

// CJ defined this function 2016-09-04
function storeDessertsTypeDataDetailsInSessionStorageToViewCStoreAllProductList(paramObj){
    try{
        var storedDataStatus = false;
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('dessertsTypeId')===true && paramObj.hasOwnProperty('dessertsTypeTitle')===true){
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['dessertsTypeId'];
                    existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['dessertsTypeTitle'];
                    existingDkParamObj['userProduct'] = {};
                    existingDkParamObj['userProduct']['all_shopstorevalue'] = '';
                    existingDkParamObj['userProduct']['shopstore_value'] = paramObj['shopStoreId'];
                    existingDkParamObj['userProduct']['shopstore_name'] = paramObj['shopStoreTitle'];
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['dessertsTypeId'];
                    existingDkParamObj['userProduct']['producttype_name'] = paramObj['dessertsTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_listname'] = '';
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
            storedDataStatus = true;
        }
        return storedDataStatus;
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-06-24
function getParamObjForCShopStoreSummaryInfo(){
    try{
        var paramObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
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

// CJ defined this function 2016-07-18
function getParamObjForCShopStoreWorkingStyleDetails(){
    try{
        var paramObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                var userProductObj = dkParamObj['userProduct'];
                console.log("getParamObjForCShopStoreWorkingStyleDetails userProductObj=>"+JSON.stringify(userProductObj));
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


// CJ defined this function 2016-07-10
function getInfoUserSelectedDeliveryCityAreaDessertsProductType(){
    try{
        var infoObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(existingDkParamObj!==false && existingDkParamObj!=='' && jQuery.isEmptyObject(existingDkParamObj)===false){
                // extract dkSelectedDeliveryCityAreaDessertsProduct param obj
                if(existingDkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
                    var dkSelectedDeliveryCityAreaDessertsProductObj = existingDkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
                    if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityname')===true 
                        && dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areaname')===true
                        && dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproducttitle')===true){
                        if(dkSelectedDeliveryCityAreaDessertsProductObj['cityname']!=='' 
                            && dkSelectedDeliveryCityAreaDessertsProductObj['areaname']!=='' 
                            && dkSelectedDeliveryCityAreaDessertsProductObj['areapincode']!==''){
                            infoObj['userSelectedCity'] = removeHtmlStripTagsOfContent(dkSelectedDeliveryCityAreaDessertsProductObj['cityname']);
                            infoObj['userSelectedArea'] = removeHtmlStripTagsOfContent(dkSelectedDeliveryCityAreaDessertsProductObj['areaname']);
                            infoObj['userSelectedAreaPincode'] = removeHtmlStripTagsOfContent(dkSelectedDeliveryCityAreaDessertsProductObj['areapincode']);
                            infoObj['userSelectedDesserts'] = removeHtmlStripTagsOfContent(dkSelectedDeliveryCityAreaDessertsProductObj['dessertsproducttitle']);
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


// CJ defined this function 2016-07-10
function getCustomerBreadcrumb(){
    var customerBreadcrumbObj = {};
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(existingDkParamObj!==false && existingDkParamObj!=='' && jQuery.isEmptyObject(existingDkParamObj)===false){
            // extract dk userproduct param obj
            if(existingDkParamObj.hasOwnProperty('userProduct')===true){
                var userProductParamObj = existingDkParamObj['userProduct'];
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
            if(existingDkParamObj.hasOwnProperty('partyOrder')===true){
                var userPartyorderParamObj = existingDkParamObj['partyOrder'];
                if(userPartyorderParamObj!==false && userPartyorderParamObj!==undefined 
                    && jQuery.isEmptyObject(userPartyorderParamObj)===false){
                    customerBreadcrumbObj['partyOrderTitle'] = userPartyorderParamObj['title'];
                }
            } 
            // extract dk customizeOrder param obj
            if(existingDkParamObj.hasOwnProperty('customizeOrder')===true){
                var userCustomizeorderParamObj = existingDkParamObj['customizeOrder'];
                if(userCustomizeorderParamObj!==false && userCustomizeorderParamObj!==undefined 
                    && jQuery.isEmptyObject(userCustomizeorderParamObj)===false){
                    customerBreadcrumbObj['customizeOrderTitle'] = userCustomizeorderParamObj['title'];
                }
            } 
            // extract dk corporateTieup param obj
            if(existingDkParamObj.hasOwnProperty('corporateTieup')===true){
                var userCorporateTieupParamObj = existingDkParamObj['corporateTieup'];
                if(userCorporateTieupParamObj!==false && userCorporateTieupParamObj!==undefined 
                    && jQuery.isEmptyObject(userCorporateTieupParamObj)===false){
                    customerBreadcrumbObj['corporateTieupTitle'] = userCorporateTieupParamObj['title'];
                }
            } 
        }
    }
    return customerBreadcrumbObj;
}


// CJ defined this function 2016-07-16
function checkParamDataToRedirectForRequestPartyOrder(){
    var retStatus = false;
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk partyOrder param obj
        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(existingDkParamObj.hasOwnProperty('partyOrder')===true){
            var userPartyorderParamObj = existingDkParamObj['partyOrder'];
            if(userPartyorderParamObj!==false && userPartyorderParamObj!==undefined 
                && jQuery.isEmptyObject(userPartyorderParamObj)===false){
                userPartyorderParamObj['title'] = 'Party Order';
                existingDkParamObj['partyOrder'] = userPartyorderParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
            }
        } 
        retStatus = true;
    }
    return retStatus;
}

// CJ defined this function 2016-07-16
function checkParamDataToRedirectForRequestCustomizeOrder(){
    var retStatus = false;
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk customize order param obj
        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(existingDkParamObj.hasOwnProperty('customizeOrder')===true){
            var userCustomizeorderParamObj = existingDkParamObj['customizeOrder'];
            if(userCustomizeorderParamObj!==false && userCustomizeorderParamObj!==undefined 
                && jQuery.isEmptyObject(userCustomizeorderParamObj)===false){
                userCustomizeorderParamObj['title'] = 'Customize Order';
                existingDkParamObj['customizeOrder'] = userCustomizeorderParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
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
        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(existingDkParamObj.hasOwnProperty('corporateTieup')===true){
            var userCorporateTieupParamObj = existingDkParamObj['corporateTieup'];
            if(userCorporateTieupParamObj!==false && userCorporateTieupParamObj!==undefined 
                && jQuery.isEmptyObject(userCorporateTieupParamObj)===false){
                userCorporateTieupParamObj['title'] = 'Corporate Tie-up';
                existingDkParamObj['corporateTieup'] = userCorporateTieupParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
            }
        } 
        retStatus = true;
    }
    return retStatus;
}



//////////////////////// party order related code ////////////////////////////

// CJ defined this function 2016-07-20
function getParamDataObjForPartyOrderRequest(){
    try{
        var retParamDataObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('partyOrder')===true){
                // extract party order param obj
                var partyOrderParamObj = dkParamObj['partyOrder'];
                if(partyOrderParamObj.hasOwnProperty('title')!==''){
                    retParamDataObj['user_sessionid'] = dkParamObj['userSession']['user_sessionid'];
                    retParamDataObj['udblogId'] = dkParamObj['userSession']['udblogId'];
                    retParamDataObj['name'] = removeHtmlStripTagsOfContent($('#po_contactPersonNameInputId').val());
                    retParamDataObj['mobile'] = removeHtmlStripTagsOfContent($('#po_contactMobileInputId').val());
                    retParamDataObj['email'] = removeHtmlStripTagsOfContent($('#po_contactEmailInputId').val());
                    retParamDataObj['occassion_title'] = removeHtmlStripTagsOfContent($('#po_occasionTitleInputId').val());
                    retParamDataObj['nos_person'] = removeHtmlStripTagsOfContent($('#po_nosPeopleInputId').val());
                    retParamDataObj['party_date'] = removeHtmlStripTagsOfContent($('#po_dateInputId').val());
                    retParamDataObj['party_venue'] = removeHtmlStripTagsOfContent($('#po_venueInputId').val());
                    retParamDataObj['party_requirements'] = removeHtmlStripTagsOfContent($('#po_messageInputId').val());
                    retParamDataObj['file'] = '';
                }
            }
        }
        if(Object.keys(retParamDataObj).length===11){
            return retParamDataObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-07-24
function getParamDataObjForCustomizeOrderRequest(){
    try{
        var retParamDataObj = {};
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('customizeOrder')===true){
                // extract customize order param obj
                var partyOrderParamObj = dkParamObj['customizeOrder'];
                if(partyOrderParamObj.hasOwnProperty('title')!==''){
                    retParamDataObj['user_sessionid'] = dkParamObj['userSession']['user_sessionid'];
                    retParamDataObj['udblogId'] = dkParamObj['userSession']['udblogId'];
                    retParamDataObj['name'] = removeHtmlStripTagsOfContent($('#co_contactPersonNameInputId').val());
                    retParamDataObj['mobile'] = removeHtmlStripTagsOfContent($('#co_contactMobileInputId').val());
                    retParamDataObj['email'] = removeHtmlStripTagsOfContent($('#co_contactEmailInputId').val());
                    retParamDataObj['event_title'] = removeHtmlStripTagsOfContent($('#co_occasionTitleInputId').val());
                    retParamDataObj['nos_person'] = removeHtmlStripTagsOfContent($('#co_nosPeopleInputId').val());
                    retParamDataObj['event_date'] = removeHtmlStripTagsOfContent($('#co_dateInputId').val());
                    retParamDataObj['event_venue'] = removeHtmlStripTagsOfContent($('#co_venueInputId').val());
                    retParamDataObj['event_requirements'] = removeHtmlStripTagsOfContent($('#co_messageInputId').val());
                    retParamDataObj['file'] = '';
                }
            }
        }
        if(Object.keys(retParamDataObj).length===11){
            return retParamDataObj;
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


/////////////////////////  user related param ////////////////////////////////////////

// CJ defined this function 2016-08-01
function checkUserLoggedInSession(){
    var retUserLoggedInStatus = false;
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check userSession key present or not 
            if(dkParamObj.hasOwnProperty('userSession')===true){
                // extract userSession param obj
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

// CJ defined this function 2016-08-01(Very Imp)
function storeAuthenticatedUserDetailsInSession(paramObj){
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            // checking session param
            if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
                // extract dk param session data
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                // check userSession key present or not 
                if(dkParamObj.hasOwnProperty('userSession')===true){
                    // extract userSession param obj
                    var userSessionParamObj = dkParamObj['userSession'];
                    if(userSessionParamObj.hasOwnProperty('user_sessionid')===true
                        && userSessionParamObj.hasOwnProperty('udblogId')===true){
                        userSessionParamObj['user_sessionid'] = paramObj['user_sessionid'];
                        userSessionParamObj['user_sessionstarttime'] = paramObj['user_sessionstarttime'];
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

// CJ defined this function 2016-08-06
function storeUserSessionIdInSession(user_sessionid){
    try{
        if(user_sessionid!==false && user_sessionid!=='' 
            && user_sessionid!==undefined && (user_sessionid).length>7){
            // checking session param
            if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
                // extract dk param session data
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                // check userSession key present or not 
                if(dkParamObj.hasOwnProperty('userSession')===true){
                    // extract userSession param obj
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

// CJ defined this function 2016-08-01
function getParamDataAuthenticatedUserDetailsFromSession(){
    var paramObj = {};
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check userSession key present or not 
            if(dkParamObj.hasOwnProperty('userSession')===true){
                // extract userSession param obj
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

// CJ defined this function 2016-08-06
function getUserSessionIdFromUserSession(){
    var userSessionId = false;
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check userSession key present or not 
            if(dkParamObj.hasOwnProperty('userSession')===true){
                // extract userSession param obj
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

// CJ defined this function 2016-08-06
function storePageDetailsUserAccessedFrom(fromPageLoad){
    try{
        if(fromPageLoad!==false && fromPageLoad!=='' && fromPageLoad!==undefined){
            // checking session param
            if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
                // extract dk param session data
                var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                // check userAccessLastPageFromObj key present or not 
                if(dkParamObj.hasOwnProperty('userAccessLastPageFromObj')===true){
                    // extract userAccessLastPageFromObj param obj
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

// CJ defined this function 2016-08-06
function getPageDetailsUserAccessedFrom(){
    var fromPageLoad = false;
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check userAccessLastPageFromObj key present or not 
            if(dkParamObj.hasOwnProperty('userAccessLastPageFromObj')===true){
                // extract userAccessLastPageFromObj param obj
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


// CJ defined this function 2016-08-01
function getParamDataForUserSignInAuthentication(){
    var paramObj = {};
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check userSession key present or not 
            if(dkParamObj.hasOwnProperty('userSession')===true){
                // extract userSession param obj
                var userSessionParamObj = dkParamObj['userSession'];
                if(userSessionParamObj.hasOwnProperty('user_sessionid')===true
                    && userSessionParamObj.hasOwnProperty('udblogId')===true){
                    if((userSessionParamObj['user_sessionid']).length>=20 
                        && (userSessionParamObj['udblogId']).length===0){
                        paramObj['user_sessionid'] = removeHtmlStripTagsOfContent(userSessionParamObj['user_sessionid']);
                        paramObj['user_sessionstarttime'] = removeHtmlStripTagsOfContent(userSessionParamObj['user_sessionstarttime']);
                        paramObj['encoded_mobile'] = removeHtmlStripTagsOfContent($('#ma_userSignInMobileInputId').val());
                        paramObj['encoded_password'] = removeHtmlStripTagsOfContent($('#ma_userSignInPasswordInputId').val());
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForUserSignInAuthentication=>"+ex);
        paramObj = {};
    }
    if(Object.keys(paramObj).length===4){
        return paramObj;
    }else{
        return false;
    }
}


// CJ defined this function 2016-08-15
function storeRequestedSectionNameToAccessInUserAccount(requestedSectionNameAccessInUserAccount){
    try{
        if(requestedSectionNameAccessInUserAccount!==false && requestedSectionNameAccessInUserAccount!=='' 
            && requestedSectionNameAccessInUserAccount!==undefined){
            // checking session param
            if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
                // extract dk param session data
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


// CJ defined this function 2016-08-15
function getStoredRequestedSectionNameToAccessInUserAccount(){
    var paramObj = {};
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
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


// CJ defined this function 2016-08-21
function getParamDataToUpdateUserpersonalInfo(){
    var paramObj = {};
    try{
        if($('.editUsernameInputClass').length===1){
            paramObj['name'] = removeHtmlStripTagsOfContent($('.editUsernameInputClass').val());
        }
        if($('.editUseremailInputClass').length===1){
            paramObj['email'] = removeHtmlStripTagsOfContent($('.editUseremailInputClass').val());
        }
        if($('.editUsermobileInputClass').length===1){
            paramObj['mobile'] = removeHtmlStripTagsOfContent($('.editUsermobileInputClass').val());
        }
        if($('.editUserbirthdateInputClass').length===1){
            paramObj['birthdate'] = removeHtmlStripTagsOfContent($('.editUserbirthdateInputClass').val());
        }
        if($('.editUserGenderSelectClass').length===1){
            paramObj['gender'] = removeHtmlStripTagsOfContent($('.editUserGenderSelectClass').find('option:selected').val());
        }
        // fetch user session data
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

// CJ defined this function 2016-08-21
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


///////////////// order cart related code here ///////////////////////////


// CJ defined this function 2016-08-13
function storeUserOrderItemInSession(productDetailsObj, fcontentClass){
    var userOrderItemObj = {};
    try{
        
        // through dashboard/store/all products page
        if(productDetailsObj!==false && productDetailsObj!==undefined 
            && jQuery.isEmptyObject(productDetailsObj)===false){
            if(productDetailsObj.hasOwnProperty('shopStoreId')===true
                && productDetailsObj.hasOwnProperty('productTypeId')===true
                && productDetailsObj.hasOwnProperty('productTypeProductCategoryId')===true
                && productDetailsObj.hasOwnProperty('productListId')===true
                && productDetailsObj.hasOwnProperty('productFeatureId')===true){
                if(parseInt(productDetailsObj['shopStoreId'])>0
                    && parseInt(productDetailsObj['productTypeId'])>0
                    && parseInt(productDetailsObj['productTypeProductCategoryId'])>0
                    && parseInt(productDetailsObj['productListId'])>0
                    && parseInt(productDetailsObj['productFeatureId'])>0){
                    userOrderItemObj['shopstore_id'] = productDetailsObj['shopStoreId'];
                    userOrderItemObj['product_typeid'] = productDetailsObj['productTypeId'];
                    userOrderItemObj['product_categoryid'] = productDetailsObj['productTypeProductCategoryId'];
                    userOrderItemObj['product_listid'] = productDetailsObj['productListId'];
                    userOrderItemObj['product_featureid'] = productDetailsObj['productFeatureId'];
                    userOrderItemObj['product_featuresize'] = productDetailsObj['productFeatureDisplayMeasurementType'];
                    userOrderItemObj['product_featuresprice'] = productDetailsObj['productFeatureOnlineSellingPrice'];
                    userOrderItemObj['product_featuresqty'] = '1';
                    userOrderItemObj['product_features_totalamount'] = productDetailsObj['productFeatureOnlineSellingPrice'];
                    userOrderItemObj['product_description'] = '';
                }
            }
        }
        
        // through view product page
        if(fcontentClass!==undefined && fcontentClass!=='' && fcontentClass!==false){
            if($('.'+fcontentClass).length===1){
                var productPrice = 0;
                if($('.'+fcontentClass).find('textarea').length===1){
                    userOrderItemObj['product_description'] = removeHtmlStripTagsOfContent($('.'+fcontentClass).find('textarea').val());
                }
                if($('.'+fcontentClass).find('select').length===1){
                    var productMeasurementSelectInputObj = $('.'+fcontentClass).find('option:selected');
                    if(productMeasurementSelectInputObj!==undefined && productMeasurementSelectInputObj!=='' && productMeasurementSelectInputObj!==false){
                        productPrice = parseFloat($(productMeasurementSelectInputObj).attr("data-productprice"));
                        userOrderItemObj['shopstore_id'] = $(productMeasurementSelectInputObj).attr("data-shopstore_id");
                        userOrderItemObj['product_typeid'] = $(productMeasurementSelectInputObj).attr("data-product_typeid");
                        userOrderItemObj['product_categoryid'] = $(productMeasurementSelectInputObj).attr("data-product_categoryid");
                        userOrderItemObj['product_listid'] = $(productMeasurementSelectInputObj).attr("data-product_listid");
                        userOrderItemObj['product_featureid'] = $(productMeasurementSelectInputObj).attr("data-productfeatureid");
                        userOrderItemObj['product_featuresize'] = $(productMeasurementSelectInputObj).val();
                    }
                }
                if($('.'+fcontentClass).find("input[type='text']").length===1 && productPrice>0){
                    var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                    var productTotalAmt = (userProductQty * productPrice);
                    userOrderItemObj['product_featuresqty'] = userProductQty;
                    userOrderItemObj['product_featuresprice'] = productPrice;
                    userOrderItemObj['product_features_totalamount'] = productTotalAmt;
                }
            }
        }
    }catch(ex){
        // console.log("problem in storeUserOrderItemInSession ex=>"+ex);
        userOrderItemObj = {};
    }
    if(Object.keys(userOrderItemObj).length===10){
        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        existingDkParamObj['userOrderItemObj'] = userOrderItemObj;
        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
    }
}

// CJ defined this function 2016-08-06
function getParamDataToAddProductInOrdercart(productDetailsObj, fcontentClass, fromSession){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            
            // through dashboard/store/all products page
            if(productDetailsObj!==false && productDetailsObj!==undefined 
                && jQuery.isEmptyObject(productDetailsObj)===false){
                if(productDetailsObj.hasOwnProperty('shopStoreId')===true
                    && productDetailsObj.hasOwnProperty('productTypeId')===true
                    && productDetailsObj.hasOwnProperty('productTypeProductCategoryId')===true
                    && productDetailsObj.hasOwnProperty('productListId')===true
                    && productDetailsObj.hasOwnProperty('productFeatureId')===true){
                    if(parseInt(productDetailsObj['shopStoreId'])>0
                        && parseInt(productDetailsObj['productTypeId'])>0
                        && parseInt(productDetailsObj['productTypeProductCategoryId'])>0
                        && parseInt(productDetailsObj['productListId'])>0
                        && parseInt(productDetailsObj['productFeatureId'])>0){
                        paramObj['shopstore_id'] = productDetailsObj['shopStoreId'];
                        paramObj['product_typeid'] = productDetailsObj['productTypeId'];
                        paramObj['product_categoryid'] = productDetailsObj['productTypeProductCategoryId'];
                        paramObj['product_listid'] = productDetailsObj['productListId'];
                        paramObj['product_featureid'] = productDetailsObj['productFeatureId'];
                        paramObj['product_featuresize'] = productDetailsObj['productFeatureDisplayMeasurementType'];
                        paramObj['product_featuresprice'] = productDetailsObj['productFeatureOnlineSellingPrice'];
                        paramObj['product_featuresqty'] = '1';
                        paramObj['product_features_totalamount'] = productDetailsObj['productFeatureOnlineSellingPrice'];
                        paramObj['product_description'] = '';
                    }
                }
            }
            
            // through view product page
            if(fcontentClass!==undefined && fcontentClass!=='' && fcontentClass!==false){
                if($('.'+fcontentClass).length===1){
                    var productPrice = 0;
                    if($('.'+fcontentClass).find('textarea').length===1){
                        paramObj['product_description'] = removeHtmlStripTagsOfContent($('.'+fcontentClass).find('textarea').val());
                    }
                    if($('.'+fcontentClass).find('select').length===1){
                        var productMeasurementSelectInputObj = $('.'+fcontentClass).find('option:selected');
                        if(productMeasurementSelectInputObj!==undefined && productMeasurementSelectInputObj!=='' && productMeasurementSelectInputObj!==false){
                            productPrice = parseFloat($(productMeasurementSelectInputObj).attr("data-productprice"));
                            paramObj['shopstore_id'] = $(productMeasurementSelectInputObj).attr("data-shopstore_id");
                            paramObj['product_typeid'] = $(productMeasurementSelectInputObj).attr("data-product_typeid");
                            paramObj['product_categoryid'] = $(productMeasurementSelectInputObj).attr("data-product_categoryid");
                            paramObj['product_listid'] = $(productMeasurementSelectInputObj).attr("data-product_listid");
                            paramObj['product_featureid'] = $(productMeasurementSelectInputObj).attr("data-productfeatureid");
                            paramObj['product_featuresize'] = $(productMeasurementSelectInputObj).val();
                        }
                    }
                    if($('.'+fcontentClass).find("input[type='text']").length===1 && productPrice>0){
                        var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                        var productTotalAmt = (userProductQty * productPrice);
                        paramObj['product_featuresqty'] = userProductQty;
                        paramObj['product_featuresprice'] = productPrice;
                        paramObj['product_features_totalamount'] = productTotalAmt;
                    }
                }
            }
            
            // through dk session 
            if(fromSession==='session'){
                var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(existingDkParamObj.hasOwnProperty('userOrderItemObj')===true){
                    var userOrderItemObj = existingDkParamObj['userOrderItemObj'];
                    paramObj = $.extend(paramObj, userOrderItemObj);
                }
            }
        }
        if(Object.keys(paramObj).length===13){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToAddProductInOrdercart ex=>"+ex);
        return false;
    }
}


// CJ defined this function 2016-08-26
function getParamDataToUpdateItemInOrdercart(productDetailsObj, fcontentClass){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            paramObj = $.extend(paramObj, userLoggedDataObj);
            if($('.'+fcontentClass).find("input[type='text']").length===1){
                var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                var productPrice = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").attr('data-itemprice')));
                if(parseInt(userProductQty)>0 && userProductQty!=='' 
                    && parseFloat(productPrice)>0 && productPrice!==''
                    && productDetailsObj!==false && productDetailsObj!==undefined 
                    && jQuery.isEmptyObject(productDetailsObj)===false){
                    if(productDetailsObj.hasOwnProperty('ordercartItemId')===true){
                        if(parseInt(productDetailsObj['ordercartItemId'])>0){
                            var productTotalAmt = (userProductQty * productPrice);
                            paramObj['product_featuresqty'] = userProductQty;
                            paramObj['product_features_totalamount'] = productTotalAmt;
                            paramObj['ordercart_itemid'] = productDetailsObj['ordercartItemId'];
                        }
                    }
                }
            }
        }
        if(Object.keys(paramObj).length>=5){
            return paramObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToUpdateItemInOrdercart ex=>"+ex);
        return false;
    }
}


// CJ defined this function 2016-08-26
function getParamDataToRemoveItemFromOrdercart(productDetailsObj){
    try{
        var paramObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            if(productDetailsObj!==false && productDetailsObj!==undefined 
                && jQuery.isEmptyObject(productDetailsObj)===false){
                if(productDetailsObj.hasOwnProperty('ordercartItemId')===true){
                    if(parseInt(productDetailsObj['ordercartItemId'])>0){
                        paramObj['ordercart_itemid'] = productDetailsObj['ordercartItemId'];
                        paramObj['reason'] = 'Item removed by customer';
                        paramObj['status'] = 'ZC';
                        paramObj = $.extend(paramObj, userLoggedDataObj);
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
        // console.log("problem in getParamDataToRemoveItemFromOrdercart ex=>"+ex);
        paramObj = {};
    }
}


///////////////////////// Rating/Review related code ///////////////////


// CJ defined this function 2016-06-06
function getParamObjFromSessionForRatingReviewDetails(){
    try{
        var paramObj = {};

        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            
            // extract user userProduct session data
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


// CJ defined this function 2016-06-26
function getParamObjFromSessionForShopStoreRatingReviewedDetails(){
    var paramObj = {};
    paramObj['country_ids'] = '';
    paramObj['city_ids'] = '';
    paramObj['area_ids'] = '';
    paramObj['store_ids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkSelectedDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkSelectedDeliveryCityAreaDessertsProductObj = dkParamObj['dkSelectedDeliveryCityAreaDessertsProduct'];
            if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                paramObj['country_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                paramObj['city_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkSelectedDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                paramObj['area_ids'] = dkSelectedDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                paramObj['store_ids'] = userProductObj['shopstore_value'];
            }
        }
    }
    
    if(paramObj['country_ids']==='1' && parseInt(paramObj['city_ids'])>0
        && parseInt(paramObj['area_ids'])>0 && parseInt(paramObj['store_ids'])>0){
        return paramObj;
    }else{
        return false;
    }
    
}


// CJ defined this function 2016-08-06
function getParamDataForAddingUserRatingReviewAbtProduct(fcClass){
    var paramDataObj = {};
    try{
        var userSessionDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userSessionDataObj!==false && userSessionDataObj!==undefined 
            && jQuery.isEmptyObject(userSessionDataObj)===false){
            if($('.'+fcClass).length===1){
                var userAllQuesAnswerRatingReviewAbtProductArr = new Array();
                paramDataObj['user_sessionid'] = userSessionDataObj['user_sessionid'];
                paramDataObj['udblogId'] = userSessionDataObj['udblogId'];
                if($('.'+fcClass).find('textarea').length===1){
                    var userEachQuesAnswerRatingReviewAbtProductObj = {};
                    var commentInputObj = $('.'+fcClass).find('textarea');
                    userEachQuesAnswerRatingReviewAbtProductObj['shopstore_id'] = $(commentInputObj).attr('data-shopstoreid');
                    userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = $(commentInputObj).attr('data-productlistid');
                    userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = $(commentInputObj).attr('data-questionid');
                    userEachQuesAnswerRatingReviewAbtProductObj['given_answertext'] = removeHtmlStripTagsOfContent($(commentInputObj).val());
                    userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = $(commentInputObj).attr('data-questionpattern');
                    var shopstore_id = $(commentInputObj).attr('data-shopstoreid');
                    var product_listid = $(commentInputObj).attr('data-productlistid');
                    var question_id = $(commentInputObj).attr('data-questionid');
                    var given_answerpoints = removeHtmlStripTagsOfContent($(commentInputObj).val());
                    var answer_pattern = $(commentInputObj).attr('data-questionpattern');
                    if(parseInt(shopstore_id)>0 && parseInt(product_listid)>0 
                        && parseInt(question_id)>0 && given_answerpoints!=='' && answer_pattern!==''){
                        userEachQuesAnswerRatingReviewAbtProductObj['shopstore_id'] = shopstore_id;
                        userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = product_listid;
                        userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = question_id;
                        userEachQuesAnswerRatingReviewAbtProductObj['given_answerpoints'] = given_answerpoints;
                        userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = answer_pattern;
                        userAllQuesAnswerRatingReviewAbtProductArr.push(userEachQuesAnswerRatingReviewAbtProductObj);
                    }
                }
                if($('.'+fcClass).find('select').length===3){
                    // iterate each 
                    $('.'+fcClass).find('select').each(function(eachIndex){
                        var selectInputObj = $(this);
                        var points = $(this).find('option:selected').val();
                        var userEachQuesAnswerRatingReviewAbtProductObj = {};
                        var shopstore_id = $(selectInputObj).find('option:selected').attr('data-shopstoreid');
                        var product_listid = $(selectInputObj).find('option:selected').attr('data-productlistid');
                        var question_id = $(selectInputObj).find('option:selected').attr('data-questionid');
                        var given_answerpoints = points;
                        var answer_pattern = $(selectInputObj).find('option:selected').attr('data-questionpattern');
                        if(parseInt(shopstore_id)>0 && parseInt(product_listid)>0 
                            && parseInt(question_id)>0 && given_answerpoints!=='' && answer_pattern!==''){
                            userEachQuesAnswerRatingReviewAbtProductObj['shopstore_id'] = shopstore_id;
                            userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = product_listid;
                            userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = question_id;
                            userEachQuesAnswerRatingReviewAbtProductObj['given_answerpoints'] = given_answerpoints;
                            userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = answer_pattern;
                            userAllQuesAnswerRatingReviewAbtProductArr.push(userEachQuesAnswerRatingReviewAbtProductObj);
                        }
                    });
                }
                if(userAllQuesAnswerRatingReviewAbtProductArr.length===4){
                    paramDataObj['userAllQuesAnwerRatingReviewAbtProductArr'] = userAllQuesAnswerRatingReviewAbtProductArr;
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForAddingUserRatingReviewAbtProduct=>"+ex);
        paramDataObj = {};
    }
    if(Object.keys(paramDataObj).length===3){
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
