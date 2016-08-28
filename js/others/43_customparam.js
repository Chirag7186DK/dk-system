
//////////////////////// DK session related data ////////////////////////

// CJ defined this function 2016-07-28

function initializeDkSessionData(){
    try{
        var userSessionObj = {};
        userSessionObj['user_sessionstarttime'] = (new Date()).getTime();
        userSessionObj['user_sessionid'] = '';
        userSessionObj['udblogId'] = '';
        userSessionObj['userProfileTypeId'] = '';
        userSessionObj['isUserInfoTrackedAccessingWebsites'] = 'N';

        var userRecentlyViewedProductObj = {};

        var dkDeliveryCityAreaDessertsProductObj = {};
        dkDeliveryCityAreaDessertsProductObj['countryvalue'] = '1';
        dkDeliveryCityAreaDessertsProductObj['cityvalue'] = '';
        dkDeliveryCityAreaDessertsProductObj['areavalue'] = '';
        dkDeliveryCityAreaDessertsProductObj['dessertsproduct'] = '';
        dkDeliveryCityAreaDessertsProductObj['countryname'] = 'India';
        dkDeliveryCityAreaDessertsProductObj['cityname'] = '';
        dkDeliveryCityAreaDessertsProductObj['areaname'] = '';
        dkDeliveryCityAreaDessertsProductObj['dessertsproducttitle'] = '';

        var userProductObj = {};
        userProductObj['shopstore_value'] = '';
        userProductObj['producttype_value'] = '';
        userProductObj['producttype_categoryvalue'] = '';
        userProductObj['producttype_listvalue'] = '';
        userProductObj['producttype_featurevalue'] = '';
        userProductObj['productviewed_bystatus'] = 'productwise';
        userProductObj['shopstore_name'] = '';
        userProductObj['producttype_name'] = '';
        userProductObj['producttype_categoryname'] = '';
        userProductObj['producttype_listname'] = '';

        var userPartyOrderObj = {};
        userPartyOrderObj['title'] = '';

        var corporateTieupObj = {};
        corporateTieupObj['title'] = '';

        var customizeOrderObj = {};
        customizeOrderObj['title'] = '';

        var userWishListObj = {};
    
        var userAccessLastPageFromObj = {"page":""};

        var userOrderItemObj = {};

        var requestedSectionUserAccountObj = {};

        var dkParamObj = {};
        dkParamObj['userSession'] = userSessionObj;
        dkParamObj['dkDeliveryCityAreaDessertsProduct'] = dkDeliveryCityAreaDessertsProductObj;
        dkParamObj['userProduct'] = userProductObj;
        dkParamObj['partyOrder'] = userPartyOrderObj;
        dkParamObj['corporateTieup'] = corporateTieupObj;
        dkParamObj['customizeOrder'] = customizeOrderObj;
        dkParamObj['wishList'] = userWishListObj;
        dkParamObj['userRecentlyProduct'] = userRecentlyViewedProductObj;
        dkParamObj['userAccessLastPageFromObj'] = userAccessLastPageFromObj;
        dkParamObj['userOrderItemObj'] = userOrderItemObj;
        dkParamObj['requestedSectionUserAccountObj'] = requestedSectionUserAccountObj;

        sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        generateDkUserSessionId();
        addTrackingUserInfoAccessingWebsitesDetails('home');
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
                dkParamObj['userSession']['user_sessionstarttime'] = (new Date()).getTime();
                dkParamObj['userSession']['user_sessionid'] = '';
                dkParamObj['userSession']['udblogId'] = '';
                dkParamObj['userSession']['userProfileTypeId'] = '';
                dkParamObj['userAccessLastPageFromObj'] = {"page":""};
                dkParamObj['userOrderItemObj'] = {};
                dkParamObj['requestedSectionUserAccountObj'] = {};
                dkParamObj['wishList'] = {};
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        }
    }catch(ex){
        console.log("Problem in resetDKSessionData=>"+ex);
    }
}


/////////////////////// Tracking user accessing websites info related data //////////////////////////


// CJ defined this function 2016-07-24
function checkIsUserInfoTrackedAccessingWebsitesDetails(){
    var retStatus = false;
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                // extract userSession param obj
                var userSessionParamDataObj = dkParamObj['userSession'];
                if(userSessionParamDataObj.hasOwnProperty('isUserInfoTrackedAccessingWebsites')==='N'){
                    retStatus = false;
                }else if(userSessionParamDataObj.hasOwnProperty('isUserInfoTrackedAccessingWebsites')==='Y'){
                    retStatus = true;
                }
            }
        }
    }catch(ex){
        retStatus = false;
    }
    return retStatus;
}

// CJ defined this function 2016-07-24
function getParamDataObjForAddingTrackingUserInfoAccessingWebsitesDetails(fromPageLoad){
    var retParamObj = {};
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userSession')===true){
                retParamObj['user_sessionid'] = '';
                retParamObj['page_name'] = fromPageLoad;
                if(dkParamObj['userSession']['user_sessionid']!=='' && (dkParamObj['userSession']['user_sessionid']).length>7){
                    retParamObj['user_sessionid'] = dkParamObj['userSession']['user_sessionid'];
                }
                // update user session 
                dkParamObj['userSession']['isUserInfoTrackedAccessingWebsites'] = 'Y';
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
            }
        }
    }catch(ex){
        retParamObj =  {};
    }
    return retParamObj;
}


//////////////////////// City details ////////////////////////////////////

// CJ defined this function 2016-07-10
function storeDefaultDeliveryCityDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            // checking session param
            if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
                if(paramObj.hasOwnProperty('cityId')===true && paramObj.hasOwnProperty('cityName')===true){
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['cityvalue'] = paramObj['cityId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['cityname'] = paramObj['cityName'];
                    if(isResetAllSessionData==='Y'){
                        existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = '';
                        existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = '';
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

// CJ defined this function 2016-07-10
function storeDefaultDeliveryAreaDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['areavalue'] = '';
            existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['areaname'] = '';
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('areaId')===true && paramObj.hasOwnProperty('areaName')===true){
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['areavalue'] = paramObj['areaId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['areaname'] = paramObj['areaName'];
                    if(isResetAllSessionData==='Y'){
                        existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = '';
                        existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = '';
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

// CJ defined this function 2016-07-10
function storeDefaultDeliveryDessertsProductTypeDetailsInSessionStorage(paramObj, isResetAllSessionData){
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = '';
            existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = '';
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('matchedProductTypeId')===true && paramObj.hasOwnProperty('matchedProductTypeTitle')===true){
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['matchedProductTypeId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['matchedProductTypeTitle'];
                    if(isResetAllSessionData==='Y'){
                        existingDkParamObj['userProduct']['shopstore_value'] = '';
                        existingDkParamObj['userProduct']['producttype_value'] = paramObj['matchedProductTypeId'];
                        existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                        existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                        existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                        existingDkParamObj['userProduct']['shopstore_name'] = '';
                        existingDkParamObj['userProduct']['producttype_name'] = paramObj['matchedProductTypeTitle'];
                        existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                        existingDkParamObj['userProduct']['producttype_listname'] = '';
                    }
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
        }
    }catch(ex){}
}

// CJ defined this function 2016-07-10
function storeDefaultDessertsProductTypeDetailsDashboardLevelInSessionStorage(paramObj){
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
                if(paramObj.hasOwnProperty('matchedProductTypeId')===true && paramObj.hasOwnProperty('matchedProductTypeTitle')===true){
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['matchedProductTypeId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['matchedProductTypeTitle'];
                    existingDkParamObj['userProduct']['shopstore_value'] = '';
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['matchedProductTypeId'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = '';
                    existingDkParamObj['userProduct']['producttype_name'] = paramObj['matchedProductTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryname'] = '';
                    existingDkParamObj['userProduct']['producttype_listname'] = '';
                }
            } 
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(existingDkParamObj));
        }
    }catch(ex){}
}


// CJ defined this function 2016-07-10
function getCustomerDeliveryCityAreaDessertsProductTypeTextForHeader(){
    var retStr = '';
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(existingDkParamObj!==false && existingDkParamObj!=='' && jQuery.isEmptyObject(existingDkParamObj)===false){
            // extract dkDeliveryCityAreaDessertsProduct param obj
            if(existingDkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                var dkDeliveryCityAreaDessertsProductObj = existingDkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityname')===true 
                    && dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areaname')===true
                    && dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproducttitle')===true){
                    if(dkDeliveryCityAreaDessertsProductObj['cityname']!=='' 
                        && dkDeliveryCityAreaDessertsProductObj['areaname']!=='' && dkDeliveryCityAreaDessertsProductObj['dessertsproducttitle']!==''){
                        retStr = dkDeliveryCityAreaDessertsProductObj['cityname']+" | "+dkDeliveryCityAreaDessertsProductObj['areaname']+" | Ordering "+dkDeliveryCityAreaDessertsProductObj['dessertsproducttitle'];
                    }
                }
            }
        }
    }
    return retStr;
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
                    customerBreadcrumbObj['homeKey'] = 'Home';
                    customerBreadcrumbObj['productTypeKey'] = userProductParamObj['producttype_name'];
                    customerBreadcrumbObj['productTypeCategoryKey'] = userProductParamObj['producttype_categoryname'];
                    customerBreadcrumbObj['shopStoreKey'] = userProductParamObj['shopstore_name']+" Store";
                    customerBreadcrumbObj['productTypeCatgoryListKey'] = userProductParamObj['producttype_listname'];
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


// CJ defined this function 2016-07-10
function checkAllParamToViewDessertsProducTypeProductListDashboardLevel(paramObj){
    var retStatus = false;
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            if(paramObj.hasOwnProperty('productTypeId')===true
                && paramObj.hasOwnProperty('productTypeTitle')===true){
                if(parseInt(paramObj['productTypeId'])>0 && paramObj['productTypeTitle']!==''){
                    // extract dk param obj && reset user product & dkDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['shopstore_value'] = '';
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['productTypeId'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_listvalue'] = '';
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = '';
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = '';
                    existingDkParamObj['userProduct']['producttype_name'] =  paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryname'] = '';
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
                && paramObj.hasOwnProperty('productTypeId')===true
                && paramObj.hasOwnProperty('productTypeProductCategoryId')===true 
                && paramObj.hasOwnProperty('productListId')===true
                && paramObj.hasOwnProperty('productFeatureId')===true 
                && paramObj.hasOwnProperty('shopStoreTitle')===true
                && paramObj.hasOwnProperty('productTypeTitle')===true 
                && paramObj.hasOwnProperty('productTypeProductCategoryTitle')===true
                && paramObj.hasOwnProperty('productListTitle')===true){
                if(parseInt(paramObj['shopStoreId'])>0 && parseInt(paramObj['productTypeId'])>0
                    && parseInt(paramObj['productTypeProductCategoryId'])>0
                    && parseInt(paramObj['productListId'])>0 && parseInt(paramObj['productFeatureId'])>0
                    && paramObj['shopStoreTitle']!=='' && paramObj['productTypeTitle']!==''
                    && paramObj['productTypeProductCategoryTitle']!=='' && paramObj['productListTitle']!==''){
                    // extract dk param obj && reset user product & dkDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['shopstore_value'] = paramObj['shopStoreId'];
                    existingDkParamObj['userProduct']['producttype_value'] = paramObj['productTypeId'];
                    existingDkParamObj['userProduct']['producttype_categoryvalue'] = paramObj['productTypeProductCategoryId'];
                    existingDkParamObj['userProduct']['producttype_listvalue'] = paramObj['productListId'];
                    existingDkParamObj['userProduct']['producttype_featurevalue'] = paramObj['productFeatureId'];
                    existingDkParamObj['userProduct']['productviewed_bystatus'] = 'productwise';
                    existingDkParamObj['userProduct']['shopstore_name'] = paramObj['shopStoreTitle'];
                    existingDkParamObj['userProduct']['producttype_name'] =  paramObj['productTypeTitle'];
                    existingDkParamObj['userProduct']['producttype_categoryname'] = paramObj['productTypeProductCategoryTitle'];
                    existingDkParamObj['userProduct']['producttype_listname'] = paramObj['productListTitle'];
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

// CJ defined this function 2016-07-11
function checkAllParamToViewAllProducts(paramObj){
    var retStatus = false;
    try{
        if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
            if(paramObj.hasOwnProperty('productTypeId')===true
                && paramObj.hasOwnProperty('productTypeTitle')===true){
                if(parseInt(paramObj['productTypeId'])>0 && paramObj['productTypeTitle']!==''){
                    // extract dk param obj && reset user product & dkDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
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
                    // extract dk param obj && reset user product & dkDeliveryCityAreaDessertsProduct data
                    var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproduct'] = paramObj['productTypeId'];
                    existingDkParamObj['dkDeliveryCityAreaDessertsProduct']['dessertsproducttitle'] = paramObj['productTypeTitle'];
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


// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDkDeliveryCityDetails(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
            }
        }
        if(retParamObj['country_ids']==='1'){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDKDeliveryAreaDetails(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
            }
        }
        if(retParamObj['country_ids']==='1'){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDKDeliveryAreaBasedProductTypeDetails(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        retParamObj['producttype_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproduct')===true){
                    retParamObj['producttype_ids'] = dkDeliveryCityAreaDessertsProductObj['dessertsproduct'];
                }
            }
        }
        if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
            && parseInt(retParamObj['area_ids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
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


// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDashboardLevelProduct(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        retParamObj['product_typesids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproduct')===true){
                    retParamObj['product_typesids'] = dkDeliveryCityAreaDessertsProductObj['dessertsproduct'];
                }
            }
        }
        if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
            && parseInt(retParamObj['area_ids'])>0 && parseInt(retParamObj['product_typesids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-06-06
function getParamObjFromSessionForLoadingProductTypeProductCategoryProductDetails(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        retParamObj['store_ids'] = '';
        retParamObj['product_typesids'] = '';
        retParamObj['product_categoryids'] = '';
        retParamObj['product_ids'] = '';
        retParamObj['product_featureids'] = '';

        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
            }
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    retParamObj['store_ids'] = userProductObj['shopstore_value'];
                }
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    retParamObj['product_typesids'] = userProductObj['producttype_value'];
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    retParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                }
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    retParamObj['product_ids'] = userProductObj['producttype_listvalue'];
                }
                if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                    retParamObj['product_featureids'] = userProductObj['producttype_featurevalue'];
                }
            }
        }
        if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
            && parseInt(retParamObj['area_ids'])>0 && parseInt(retParamObj['product_typesids'])>0
            && parseInt(retParamObj['store_ids'])>0 && parseInt(retParamObj['product_categoryids'])>0
            && parseInt(retParamObj['product_ids'])>0 && parseInt(retParamObj['product_featureids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
    
}

// CJ defined this function 2016-06-06
function getParamObjFromSessionForLoadingProductDescriptionDetails(){
    try{
        var retParamObj = {};
        retParamObj['product_ids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    retParamObj['product_ids'] = userProductObj['producttype_listvalue'];
                }
            }
        }
        if(parseInt(retParamObj['product_ids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-06-17
function getParamObjForLoadingProductTypeProductCategoryAllProductList(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        retParamObj['product_typesids'] = '';
        retParamObj['product_categoryids'] = '';
        retParamObj['shopstoreids'] = '';
        retParamObj['product_price_filter'] = '';
        retParamObj['product_size_filter'] = '';
        retParamObj['product_discount_filter'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
            }
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    retParamObj['product_typesids'] = userProductObj['producttype_value'];
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    retParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                }
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    retParamObj['shopstoreids'] = userProductObj['shopstore_value'];
                }
                if(userProductObj.hasOwnProperty('product_price_filter')===true){
                    retParamObj['product_price_filter'] = userProductObj['product_price_filter'];
                }
                if(userProductObj.hasOwnProperty('product_size_filter')===true){
                    retParamObj['product_size_filter'] = userProductObj['product_size_filter'];
                }
                if(userProductObj.hasOwnProperty('product_discount_filter')===true){
                    retParamObj['product_discount_filter'] = userProductObj['product_discount_filter'];
                }

            }
        }
        if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
            && parseInt(retParamObj['area_ids'])>0 && parseInt(retParamObj['product_typesids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-06-24
function getParamObjForLoadingCShopStoreSummaryInfo(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        retParamObj['shopstoreids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
            }
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    retParamObj['shopstoreids'] = userProductObj['shopstore_value'];
                }
            }
        }
        if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
            && parseInt(retParamObj['area_ids'])>0 && parseInt(retParamObj['shopstoreids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}


// CJ defined this function 2016-07-18
function getParamObjForLoadingCShopStoreWorkingStyleDetails(){
    try{
        var retParamObj = {};
        retParamObj['shopstoreids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    retParamObj['shopstoreids'] = userProductObj['shopstore_value'];
                }
            }
        }
        if(parseInt(retParamObj['shopstoreids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-07-18
function getParamObjForLoadingCShopStoreProductDeliveryAreaDetails(){
    try{
        var retParamObj = {};
        retParamObj['shopstoreids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // extract data from user product
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    retParamObj['shopstoreids'] = userProductObj['shopstore_value'];
                }
            }
        }
        if(parseInt(retParamObj['shopstoreids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }
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
    var retParamObj = {};
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('corporateTieup')===true){
            // extract corporateTieup param obj
            var partyOrderParamObj = dkParamObj['corporateTieup'];
            if(partyOrderParamObj.hasOwnProperty('corporateTieupTitle')!==''){
                retParamObj['is_LoggedInUser'] = 'N';
                retParamObj['profile_id'] = '2';
            }
        }
    }
    return retParamObj;
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
    var retParamObj = {};
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
                        retParamObj['udblogId'] = userSessionParamObj['udblogId'];
                        retParamObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                        retParamObj['userProfileTypeId'] = userSessionParamObj['userProfileTypeId'];
                    }
                }
            }
        }
        if(Object.keys(retParamObj).length===3){
            return retParamObj;
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
    var retParamObj = {};
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
                        retParamObj['user_sessionid'] = removeHtmlStripTagsOfContent(userSessionParamObj['user_sessionid']);
                        retParamObj['user_sessionstarttime'] = removeHtmlStripTagsOfContent(userSessionParamObj['user_sessionstarttime']);
                        retParamObj['encoded_mobile'] = removeHtmlStripTagsOfContent($('#ma_userSignInMobileInputId').val());
                        retParamObj['encoded_password'] = removeHtmlStripTagsOfContent($('#ma_userSignInPasswordInputId').val());
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataForUserSignInAuthentication=>"+ex);
        retParamObj = {};
    }
    if(Object.keys(retParamObj).length===4){
        return retParamObj;
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
    var retParamObj = {};
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('requestedSectionUserAccountObj')===true){
                if(jQuery.isEmptyObject(dkParamObj['requestedSectionUserAccountObj'])===false){
                    retParamObj = dkParamObj['requestedSectionUserAccountObj'];
                }
            }
        }
    }catch(ex){
        console.log("problem in getStoredRequestedSectionNameToAccessInUserAccount=>"+ex);
        retParamObj = {};
    } 
    if(Object.keys(retParamObj).length===2){
        return retParamObj;
    }else{
        return false;
    }
}


// CJ defined this function 2016-08-21
function getParamDataToUpdateUserpersonalInfo(){
    var retParamObj = {};
    try{
        if($('.editUsernameInputClass').length===1){
            retParamObj['name'] = removeHtmlStripTagsOfContent($('.editUsernameInputClass').val());
        }
        if($('.editUseremailInputClass').length===1){
            retParamObj['email'] = removeHtmlStripTagsOfContent($('.editUseremailInputClass').val());
        }
        if($('.editUsermobileInputClass').length===1){
            retParamObj['mobile'] = removeHtmlStripTagsOfContent($('.editUsermobileInputClass').val());
        }
        if($('.editUserbirthdateInputClass').length===1){
            retParamObj['birthdate'] = removeHtmlStripTagsOfContent($('.editUserbirthdateInputClass').val());
        }
        if($('.editUserGenderSelectClass').length===1){
            retParamObj['gender'] = removeHtmlStripTagsOfContent($('.editUserGenderSelectClass').find('option:selected').val());
        }
        // fetch user session data
        var userSessionDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userSessionDataObj!==false && userSessionDataObj!==undefined 
            && jQuery.isEmptyObject(userSessionDataObj)===false){
            retParamObj = $.extend(retParamObj, userSessionDataObj);
        }
        if(Object.keys(retParamObj).length===8){
            return retParamObj;
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
    var retParamObj = {};
    try{
        if($('.editOldPasswordInputClass').length===1){
            retParamObj['old_password'] = removeHtmlStripTagsOfContent($('.editOldPasswordInputClass').val());
        }
        if($('.editNewPasswordInputClass').length===1){
            retParamObj['new_password'] = removeHtmlStripTagsOfContent($('.editNewPasswordInputClass').val());
        }
        if($('.editNewConfirmPasswordInputClass').length===1){
            retParamObj['newc_password'] = removeHtmlStripTagsOfContent($('.editNewConfirmPasswordInputClass').val());
        }
        // fetch user session data
        var userSessionDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userSessionDataObj!==false && userSessionDataObj!==undefined 
            && jQuery.isEmptyObject(userSessionDataObj)===false){
            retParamObj = $.extend(retParamObj, userSessionDataObj);
        }
        if(Object.keys(retParamObj).length===6){
            return retParamObj;
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
        var retParamObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            retParamObj = $.extend(retParamObj, userLoggedDataObj);
            
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
                        retParamObj['shopstore_id'] = productDetailsObj['shopStoreId'];
                        retParamObj['product_typeid'] = productDetailsObj['productTypeId'];
                        retParamObj['product_categoryid'] = productDetailsObj['productTypeProductCategoryId'];
                        retParamObj['product_listid'] = productDetailsObj['productListId'];
                        retParamObj['product_featureid'] = productDetailsObj['productFeatureId'];
                        retParamObj['product_featuresize'] = productDetailsObj['productFeatureDisplayMeasurementType'];
                        retParamObj['product_featuresprice'] = productDetailsObj['productFeatureOnlineSellingPrice'];
                        retParamObj['product_featuresqty'] = '1';
                        retParamObj['product_features_totalamount'] = productDetailsObj['productFeatureOnlineSellingPrice'];
                        retParamObj['product_description'] = '';
                    }
                }
            }
            
            // through view product page
            if(fcontentClass!==undefined && fcontentClass!=='' && fcontentClass!==false){
                if($('.'+fcontentClass).length===1){
                    var productPrice = 0;
                    if($('.'+fcontentClass).find('textarea').length===1){
                        retParamObj['product_description'] = removeHtmlStripTagsOfContent($('.'+fcontentClass).find('textarea').val());
                    }
                    if($('.'+fcontentClass).find('select').length===1){
                        var productMeasurementSelectInputObj = $('.'+fcontentClass).find('option:selected');
                        if(productMeasurementSelectInputObj!==undefined && productMeasurementSelectInputObj!=='' && productMeasurementSelectInputObj!==false){
                            productPrice = parseFloat($(productMeasurementSelectInputObj).attr("data-productprice"));
                            retParamObj['shopstore_id'] = $(productMeasurementSelectInputObj).attr("data-shopstore_id");
                            retParamObj['product_typeid'] = $(productMeasurementSelectInputObj).attr("data-product_typeid");
                            retParamObj['product_categoryid'] = $(productMeasurementSelectInputObj).attr("data-product_categoryid");
                            retParamObj['product_listid'] = $(productMeasurementSelectInputObj).attr("data-product_listid");
                            retParamObj['product_featureid'] = $(productMeasurementSelectInputObj).attr("data-productfeatureid");
                            retParamObj['product_featuresize'] = $(productMeasurementSelectInputObj).val();
                        }
                    }
                    if($('.'+fcontentClass).find("input[type='text']").length===1 && productPrice>0){
                        var userProductQty = parseInt(removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val()));
                        var productTotalAmt = (userProductQty * productPrice);
                        retParamObj['product_featuresqty'] = userProductQty;
                        retParamObj['product_featuresprice'] = productPrice;
                        retParamObj['product_features_totalamount'] = productTotalAmt;
                    }
                }
            }
            
            // through dk session 
            if(fromSession==='session'){
                var existingDkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
                if(existingDkParamObj.hasOwnProperty('userOrderItemObj')===true){
                    var userOrderItemObj = existingDkParamObj['userOrderItemObj'];
                    retParamObj = $.extend(retParamObj, userOrderItemObj);
                }
            }
        }
        if(Object.keys(retParamObj).length===13){
            return retParamObj;
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
        var retParamObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            retParamObj = $.extend(retParamObj, userLoggedDataObj);
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
                            retParamObj['product_featuresqty'] = userProductQty;
                            retParamObj['product_features_totalamount'] = productTotalAmt;
                            retParamObj['ordercart_itemid'] = productDetailsObj['ordercartItemId'];
                        }
                    }
                }
            }
        }
        if(Object.keys(retParamObj).length>=5){
            return retParamObj;
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
        var retParamObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            if(productDetailsObj!==false && productDetailsObj!==undefined 
                && jQuery.isEmptyObject(productDetailsObj)===false){
                if(productDetailsObj.hasOwnProperty('ordercartItemId')===true){
                    if(parseInt(productDetailsObj['ordercartItemId'])>0){
                        retParamObj['ordercart_itemid'] = productDetailsObj['ordercartItemId'];
                        retParamObj['reason'] = 'Item removed by customer';
                        retParamObj['status'] = 'ZC';
                        retParamObj = $.extend(retParamObj, userLoggedDataObj);
                    }
                }
            }
        }
        if(Object.keys(retParamObj).length===6){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToRemoveItemFromOrdercart ex=>"+ex);
        retParamObj = {};
    }
}


///////////////////////// Rating/Review related code ///////////////////


// CJ defined this function 2016-06-06
function getParamObjFromSessionForRatingReviewDetails(){
    try{
        var retParamObj = {};
        retParamObj['country_ids'] = '';
        retParamObj['city_ids'] = '';
        retParamObj['area_ids'] = '';
        retParamObj['store_ids'] = '';
        retParamObj['product_typesids'] = '';
        retParamObj['product_categoryids'] = '';
        retParamObj['product_ids'] = '';
        retParamObj['product_featureids'] = '';
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
                // extract user suggested city area session data
                var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                    retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                    retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
                }
                if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                    retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
                }
            }
            if(dkParamObj.hasOwnProperty('userProduct')===true){
                // extract user userProduct session data
                var userProductObj = dkParamObj['userProduct'];
                if(userProductObj.hasOwnProperty('shopstore_value')===true){
                    retParamObj['store_ids'] = userProductObj['shopstore_value'];
                }
                if(userProductObj.hasOwnProperty('producttype_value')===true){
                    retParamObj['product_typesids'] = userProductObj['producttype_value'];
                }
                if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                    retParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
                }
                if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                    retParamObj['product_ids'] = userProductObj['producttype_listvalue'];
                }
                if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                    retParamObj['product_featureids'] = userProductObj['producttype_featurevalue'];
                }
            }
        }
        if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
            && parseInt(retParamObj['area_ids'])>0 && parseInt(retParamObj['store_ids'])>0
            && parseInt(retParamObj['product_typesids'])>0 && parseInt(retParamObj['product_categoryids'])>0
            && parseInt(retParamObj['product_ids'])>0 && parseInt(retParamObj['product_featureids'])>0){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        return false;
    }    
}


// CJ defined this function 2016-06-26
function getParamObjFromSessionForShopStoreRatingReviewedDetails(){
    var retParamObj = {};
    retParamObj['country_ids'] = '';
    retParamObj['city_ids'] = '';
    retParamObj['area_ids'] = '';
    retParamObj['store_ids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                retParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                retParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                retParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                retParamObj['store_ids'] = userProductObj['shopstore_value'];
            }
        }
    }
    
    if(retParamObj['country_ids']==='1' && parseInt(retParamObj['city_ids'])>0
        && parseInt(retParamObj['area_ids'])>0 && parseInt(retParamObj['store_ids'])>0){
        return retParamObj;
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
        var retParamObj = {};
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            retParamObj = $.extend(retParamObj, userLoggedDataObj);
            if($('.'+fcontentClass).find("input[type='text']").length===1){
                var userMobileVal = removeHtmlStripTagsOfContent($('.'+fcontentClass).find("input[type='text']").val());
                if(userMobileVal!=='' && userMobileVal!==false
                    && sharingOffersDataObj!==false && sharingOffersDataObj!==undefined 
                    && jQuery.isEmptyObject(sharingOffersDataObj)===false){
                    if(sharingOffersDataObj.hasOwnProperty('dcgId')===true){
                        if(parseInt(sharingOffersDataObj['dcgId'])>0){
                            retParamObj['discount_couponid'] = sharingOffersDataObj['dcgId'];
                            retParamObj['shared_onmobile'] = userMobileVal;
                        }
                    }
                }
            }
        }
        if(Object.keys(retParamObj).length===5){
            return retParamObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToUpdateItemInOrdercart ex=>"+ex);
        return false;
    }
}
