
//////////////////////// DK session related data ////////////////////////////////////

// CJ defined this function 2016-07-28
function initializeDkSessionData(){
    
    var userSessionObj = {};
    userSessionObj['user_sessionstarttime'] = (new Date()).getTime();
    userSessionObj['user_sessionid'] = '';
    userSessionObj['udblogId'] = '';
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
}

// CJ defined this function 2016-07-28
function resetDKSessionData(){
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
            dkParamObj['userAccessLastPageFromObj'] = {"page":""};
            dkParamObj['userOrderItemObj'] = {};
            dkParamObj['requestedSectionUserAccountObj'] = {};
            dkParamObj['wishList'] = {};
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        }
    }
}

// CJ defined this function 2016-07-24
function checkIsUserInfoTrackedAccessingWebsitesDetails(){
    var retStatus = false;
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
    return retStatus;
}

// CJ defined this function 2016-07-24
function getParamDataObjForAddingTrackingUserInfoAccessingWebsitesDetails(fromPageLoad){
    var retParamObj = {};
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
    return retParamObj;
}


// CJ defined this function 2016-07-10
function storeDefaultDeliveryCityDetailsInSessionStorage(paramObj, isResetAllSessionData){
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
}

// CJ defined this function 2016-07-10
function storeDefaultDeliveryAreaDetailsInSessionStorage(paramObj, isResetAllSessionData){
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
}

// CJ defined this function 2016-07-10
function storeDefaultDeliveryDessertsProductTypeDetailsInSessionStorage(paramObj, isResetAllSessionData){
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
}

// CJ defined this function 2016-07-10
function storeDefaultDessertsProductTypeDetailsDashboardLevelInSessionStorage(paramObj){
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
    if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
        if(paramObj.hasOwnProperty('productTypeId')===true
            && paramObj.hasOwnProperty('productTypeTitle')===true){
            if(paramObj['productTypeId']!=='' && paramObj['productTypeId']!==false
                && paramObj['productTypeId']!==null && paramObj['productTypeTitle']!==''){
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
    return retStatus;
}


// CJ defined this function 2016-07-10
function checkAllParamToViewProductDetails(paramObj){
    var retStatus = false;
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
            if((paramObj['shopStoreId']).length===32 
                && (paramObj['productTypeId']).length===32 
                && (paramObj['productTypeProductCategoryId']).length===32
                && (paramObj['productListId']).length===32
                && (paramObj['productFeatureId']).length===32
                && paramObj['shopStoreTitle']!==''
                && paramObj['productTypeTitle']!==''
                && paramObj['productTypeProductCategoryTitle']!==''
                && paramObj['productListTitle']!==''){
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
    return retStatus;
}

// CJ defined this function 2016-07-11
function checkAllParamToViewAllProducts(paramObj){
    var retStatus = false;
    if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
        if(paramObj.hasOwnProperty('productTypeId')===true
            && paramObj.hasOwnProperty('productTypeTitle')===true){
            if((paramObj['productTypeId']).length===32
                && paramObj['productTypeTitle']!==''){
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
    return retStatus;
}

// CJ defined this function 2016-07-10
function checkAllParamToViewCShopStore(paramObj){
    var retStatus = false;
    if(paramObj!==false && paramObj!=='' && jQuery.isEmptyObject(paramObj)===false){
        if(paramObj.hasOwnProperty('productTypeId')===true 
            && paramObj.hasOwnProperty('productTypeTitle')===true
            && paramObj.hasOwnProperty('shopStoreTitle')===true){
            if((paramObj['shopStoreId']).length===32 
                && (paramObj['productTypeId']).length===32 
                && paramObj['shopStoreTitle']!==''
                && paramObj['productTypeTitle']!==''){
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
    return retStatus;
}


// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDkDeliveryCityDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
        }
    }
    if(returnParamObj['country_ids']==='1'){
        return returnParamObj;
    }else{
        return false;
    }
    
}

// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDKDeliveryAreaDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
    }
    if(returnParamObj['country_ids']==='1'){
        return returnParamObj;
    }else{
        return false;
    }
    
}

// CJ defined this function 2016-06-05
function getParamObjFromSessionForLoadingDKDeliveryAreaBasedProductTypeDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['producttype_ids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproduct')===true){
                returnParamObj['producttype_ids'] = dkDeliveryCityAreaDessertsProductObj['dessertsproduct'];
            }
        }
    }
    
    if(returnParamObj['country_ids']==='1' && returnParamObj['city_ids']!==false 
        && returnParamObj['city_ids']!=='' && returnParamObj['city_ids']!==null 
        && returnParamObj['area_ids']!==false && returnParamObj['area_ids']!=='' 
        && returnParamObj['area_ids']!==null){
        return returnParamObj;
    }else{
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
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['product_typesids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('dessertsproduct')===true){
                returnParamObj['product_typesids'] = dkDeliveryCityAreaDessertsProductObj['dessertsproduct'];
            }
        }
    }
    if(returnParamObj['country_ids']==='1' && returnParamObj['city_ids']!==false 
        && returnParamObj['city_ids']!=='' && returnParamObj['city_ids']!==null 
        && returnParamObj['area_ids']!==false && returnParamObj['area_ids']!=='' 
        && returnParamObj['area_ids']!==null && returnParamObj['product_typesids']!==false 
        && returnParamObj['product_typesids']!=='' && returnParamObj['product_typesids']!==null){
        return returnParamObj;
    }else{
        return false;
    }
    
}

// CJ defined this function 2016-06-06
function getParamObjFromSessionForLoadingProductTypeProductCategoryProductDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['store_ids'] = '';
    returnParamObj['product_typesids'] = '';
    returnParamObj['product_categoryids'] = '';
    returnParamObj['product_ids'] = '';
    returnParamObj['product_featureids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                returnParamObj['store_ids'] = userProductObj['shopstore_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_value')===true){
                returnParamObj['product_typesids'] = userProductObj['producttype_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                returnParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
            }
            if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                returnParamObj['product_ids'] = userProductObj['producttype_listvalue'];
            }
            if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                returnParamObj['product_featureids'] = userProductObj['producttype_featurevalue'];
            }
        }
    }
    
    if(returnParamObj['country_ids']==='1' && (returnParamObj['city_ids']).length===32
        && (returnParamObj['area_ids']).length===32 && (returnParamObj['store_ids']).length===32
        && (returnParamObj['product_typesids']).length===32 && (returnParamObj['product_categoryids']).length===32
        && (returnParamObj['product_ids']).length===32 && (returnParamObj['product_featureids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
    
}

// CJ defined this function 2016-06-06
function getParamObjFromSessionForLoadingProductDescriptionDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['store_ids'] = '';
    returnParamObj['product_typesids'] = '';
    returnParamObj['product_categoryids'] = '';
    returnParamObj['product_ids'] = '';
    returnParamObj['product_featureids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                returnParamObj['store_ids'] = userProductObj['shopstore_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_value')===true){
                returnParamObj['product_typesids'] = userProductObj['producttype_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                returnParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
            }
            if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                returnParamObj['product_ids'] = userProductObj['producttype_listvalue'];
            }
            if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                returnParamObj['product_featureids'] = userProductObj['producttype_featurevalue'];
            }
        }
    }
    if(returnParamObj['country_ids']==='1' && (returnParamObj['city_ids']).length===32
        && (returnParamObj['area_ids']).length===32 && (returnParamObj['store_ids']).length===32
        && (returnParamObj['product_typesids']).length===32 && (returnParamObj['product_categoryids']).length===32
        && (returnParamObj['product_ids']).length===32 && (returnParamObj['product_featureids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
    
}

// CJ defined this function 2016-06-17
function getParamObjForLoadingProductTypeProductCategoryAllProductList(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['product_typesids'] = '';
    returnParamObj['product_categoryids'] = '';
    returnParamObj['shopstoreids'] = '';
    returnParamObj['product_price_filter'] = '';
    returnParamObj['product_size_filter'] = '';
    returnParamObj['product_discount_filter'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        // extract data from user product
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('producttype_value')===true){
                returnParamObj['product_typesids'] = userProductObj['producttype_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                returnParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
            }
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                returnParamObj['shopstoreids'] = userProductObj['shopstore_value'];
            }
            if(userProductObj.hasOwnProperty('product_price_filter')===true){
                returnParamObj['product_price_filter'] = userProductObj['product_price_filter'];
            }
            if(userProductObj.hasOwnProperty('product_size_filter')===true){
                returnParamObj['product_size_filter'] = userProductObj['product_size_filter'];
            }
            if(userProductObj.hasOwnProperty('product_discount_filter')===true){
                returnParamObj['product_discount_filter'] = userProductObj['product_discount_filter'];
            }
            
        }
    }
    
    if(returnParamObj['country_ids']==='1' && (returnParamObj['city_ids']).length===32
        && (returnParamObj['area_ids']).length===32 && (returnParamObj['product_typesids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
    
}


// CJ defined this function 2016-06-24
function getParamObjForLoadingCShopStoreSummaryInfo(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['shopstoreids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        // extract data from user product
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                returnParamObj['shopstoreids'] = userProductObj['shopstore_value'];
            }
        }
    }
    
    if(returnParamObj['country_ids']==='1' && (returnParamObj['city_ids']).length===32
        && (returnParamObj['area_ids']).length===32 && (returnParamObj['shopstoreids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
    
}


// CJ defined this function 2016-07-18
function getParamObjForLoadingCShopStoreWorkingStyleDetails(){
    var returnParamObj = {};
    returnParamObj['shopstoreids'] = '';
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
                returnParamObj['shopstoreids'] = userProductObj['shopstore_value'];
            }
        }
    }
    if((returnParamObj['shopstoreids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
}

// CJ defined this function 2016-07-18
function getParamObjForLoadingCShopStoreProductDeliveryAreaDetails(){
    var returnParamObj = {};
    returnParamObj['shopstoreids'] = '';
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
                returnParamObj['shopstoreids'] = userProductObj['shopstore_value'];
            }
        }
    }
    if((returnParamObj['shopstoreids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
}


////////////////////////////////// party order related code ////////////////////////////

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
                    retParamDataObj['user_id'] = '';
                    retParamDataObj['is_LoggedInUser'] = 'N';
                    var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
                        && jQuery.isEmptyObject(userLoggedDataObj)===false){
                        retParamDataObj['user_id'] = userLoggedDataObj['userLoggedId'];
                        retParamDataObj['is_LoggedInUser'] = 'Y';
                    }
                    retParamDataObj['profile_id'] = '2';
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
        return retParamDataObj;
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
                    retParamDataObj['user_id'] = '';
                    retParamDataObj['is_LoggedInUser'] = 'N';
                    var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
                    if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
                        && jQuery.isEmptyObject(userLoggedDataObj)===false){
                        retParamDataObj['user_id'] = userLoggedDataObj['userLoggedId'];
                        retParamDataObj['is_LoggedInUser'] = 'Y';
                    }
                    retParamDataObj['profile_id'] = '2';
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
        return retParamDataObj;
    }catch(ex){
        return false;
    }
}

// CJ defined this function 2016-07-24
function getParamDataObjForCorporateTieupRequest(){
    var returnParamObj = {};
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('corporateTieup')===true){
            // extract corporateTieup param obj
            var partyOrderParamObj = dkParamObj['corporateTieup'];
            if(partyOrderParamObj.hasOwnProperty('corporateTieupTitle')!==''){
                returnParamObj['is_LoggedInUser'] = 'N';
                returnParamObj['profile_id'] = '2';
            }
        }
    }
    return returnParamObj;
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
                    if((userSessionParamObj['user_sessionid']).length>7 
                        && (userSessionParamObj['udblogId']).length===32){
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
                    if((userSessionParamObj['user_sessionid']).length>7 
                        && (userSessionParamObj['udblogId']).length===32){
                        retParamObj['udblogId'] = userSessionParamObj['udblogId'];
                        retParamObj['user_sessionid'] = userSessionParamObj['user_sessionid'];
                    }
                }
            }
        }
    }catch(ex){
        console.log("problem in getParamDataAuthenticatedUserDetailsFromSession=>"+ex);
        retParamObj = false;
    }
    if(Object.keys(retParamObj).length===2){
        return retParamObj;
    }else{
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
                        && (userSessionParamObj['user_sessionid']).length>7
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
                    if((userSessionParamObj['user_sessionid']).length>7 
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
function storeRequestedSectionNameToAccessInUserCAccount(requestedSectionNameAccessInUserAccount){
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
                    if(sectionName==='ordercart'){
                        displaySectionName = 'Order cart';
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
        console.log("problem in storeRequestedSectionNameToAccessInUserCAccount=>"+ex);
    }    
}

// CJ defined this function 2016-08-15
function getStoredRequestedSectionNameToAccessInUserCAccount(){
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
        console.log("problem in getStoredRequestedSectionNameToAccessInUserCAccount=>"+ex);
        retParamObj = {};
    } 
    if(Object.keys(retParamObj).length===2){
        return retParamObj;
    }else{
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
            if(productDetailsObj.hasOwnProperty('unMd5ShopStoreId')===true
                && productDetailsObj.hasOwnProperty('unMD5ProductTypeId')===true
                && productDetailsObj.hasOwnProperty('unMD5ProductTypeProductCategoryId')===true
                && productDetailsObj.hasOwnProperty('unMd5ProductListId')===true
                && productDetailsObj.hasOwnProperty('unMd5ProductFeatureId')===true){
                if(parseInt(productDetailsObj['unMd5ShopStoreId'])>0
                    && parseInt(productDetailsObj['unMD5ProductTypeId'])>0
                    && parseInt(productDetailsObj['unMD5ProductTypeProductCategoryId'])>0
                    && parseInt(productDetailsObj['unMd5ProductListId'])>0
                    && parseInt(productDetailsObj['unMd5ProductFeatureId'])>0){
                    userOrderItemObj['shopstore_id'] = productDetailsObj['unMd5ShopStoreId'];
                    userOrderItemObj['product_typeid'] = productDetailsObj['unMD5ProductTypeId'];
                    userOrderItemObj['product_categoryid'] = productDetailsObj['unMD5ProductTypeProductCategoryId'];
                    userOrderItemObj['product_listid'] = productDetailsObj['unMd5ProductListId'];
                    userOrderItemObj['product_featureid'] = productDetailsObj['unMd5ProductFeatureId'];
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
    var retParamObj = {};
    try{
        
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            retParamObj = $.extend(retParamObj, userLoggedDataObj);
            
            // through dashboard/store/all products page
            if(productDetailsObj!==false && productDetailsObj!==undefined 
                && jQuery.isEmptyObject(productDetailsObj)===false){
                if(productDetailsObj.hasOwnProperty('unMd5ShopStoreId')===true
                    && productDetailsObj.hasOwnProperty('unMD5ProductTypeId')===true
                    && productDetailsObj.hasOwnProperty('unMD5ProductTypeProductCategoryId')===true
                    && productDetailsObj.hasOwnProperty('unMd5ProductListId')===true
                    && productDetailsObj.hasOwnProperty('unMd5ProductFeatureId')===true){
                    if(parseInt(productDetailsObj['unMd5ShopStoreId'])>0
                        && parseInt(productDetailsObj['unMD5ProductTypeId'])>0
                        && parseInt(productDetailsObj['unMD5ProductTypeProductCategoryId'])>0
                        && parseInt(productDetailsObj['unMd5ProductListId'])>0
                        && parseInt(productDetailsObj['unMd5ProductFeatureId'])>0){
                        retParamObj['shopstore_id'] = productDetailsObj['unMd5ShopStoreId'];
                        retParamObj['product_typeid'] = productDetailsObj['unMD5ProductTypeId'];
                        retParamObj['product_categoryid'] = productDetailsObj['unMD5ProductTypeProductCategoryId'];
                        retParamObj['product_listid'] = productDetailsObj['unMd5ProductListId'];
                        retParamObj['product_featureid'] = productDetailsObj['unMd5ProductFeatureId'];
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
        
    }catch(ex){
        // console.log("problem in getParamDataToAddProductInOrdercart ex=>"+ex);
        retParamObj = {};
    }
    if(Object.keys(retParamObj).length===12){
        return retParamObj;
    }else{
        return false;
    }
}


// CJ defined this function 2016-08-06
function getParamDataToRemoveItemFromOrdercart(productDetailsObj){
    var retParamObj = {};
    try{
        var userLoggedDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(userLoggedDataObj!==false && userLoggedDataObj!==undefined 
            && jQuery.isEmptyObject(userLoggedDataObj)===false){
            retParamObj = $.extend(retParamObj, userLoggedDataObj);
            
            if(productDetailsObj!==false && productDetailsObj!==undefined 
                && jQuery.isEmptyObject(productDetailsObj)===false){
                if(productDetailsObj.hasOwnProperty('ordercartId')===true
                    && productDetailsObj.hasOwnProperty('ordercartItemId')===true){
                    if(parseInt(productDetailsObj['ordercartId'])>0
                        && parseInt(productDetailsObj['ordercartItemId'])>0){
                        retParamObj['order_cartid'] = productDetailsObj['ordercartId'];
                        retParamObj['ordercart_itemid'] = productDetailsObj['ordercartItemId'];
                        retParamObj['reason'] = 'Item removed by customer';
                        retParamObj['status'] = 'ZC';
                    }
                }
            }
        }
    }catch(ex){
        // console.log("problem in getParamDataToRemoveItemFromOrdercart ex=>"+ex);
        retParamObj = {};
    }
    if(Object.keys(retParamObj).length===6){
        return retParamObj;
    }else{
        return false;
    }
}



/////////////////////// wishlist related param ////////////////////////////////////////


// CJ defined this function 2016-08-01
function getParamDataForWLCreation(){
    var retParamDataObj = {};
    try{
        if($('#cwl_titleInputId').length===1){
            if($('#cwl_titleInputId').val()!==''
                && $('#cwl_titleInputId').val()!==false){
                retParamDataObj['title'] = removeHtmlStripTagsOfContent($('#cwl_titleInputId').val());
            }
        }
        if($('#cwl_privacySettingsOptionId').length===1){
            if($('#cwl_privacySettingsOptionId').find('option:selected').val()!==''){
                retParamDataObj['is_publicly'] = removeHtmlStripTagsOfContent($('#cwl_privacySettingsOptionId').find('option:selected').val());
            }
        }
        var authenticatedUserDataObj = getParamDataAuthenticatedUserDetailsFromSession();
        if(authenticatedUserDataObj!==false && authenticatedUserDataObj!==undefined 
            && jQuery.isEmptyObject(authenticatedUserDataObj)===false){
            retParamDataObj = $.extend(retParamDataObj, authenticatedUserDataObj);
        }
    }catch(ex){
        console.log("problem in getParamDataForWLCreation=>"+ex);
        retParamDataObj = {};
    }
    if(Object.keys(retParamDataObj).length===4){
        return retParamDataObj;
    }else{
        return false;
    }
}

// CJ defined this function 2016-08-01
function getParamDataToDeleteUserWL(wishListDataObj){
    try{
        var returnParamObj = {};
        if(wishListDataObj!==false && jQuery.isEmptyObject(wishListDataObj)===false){
            if(wishListDataObj.hasOwnProperty('unMd5UserId')
                && wishListDataObj.hasOwnProperty('wlId')){
                returnParamObj['updated_by'] = wishListDataObj['unMd5UserId'];
                returnParamObj['wishListId'] = wishListDataObj['wlId'];
                returnParamObj['status'] = 'Z';
            }
        }
        return returnParamObj;
    }catch(ex){
        console.log("problem in getParamDataToDeleteUserWL=>"+ex);
        return false;
    }
}

// CJ defined this function 2016-08-02
function getParamDataForUWLUpdation(fcClass, wishListDataObj){
    try{
        var returnParamObj = {};
        if($('.'+fcClass).length===1 && wishListDataObj!==false 
            && jQuery.isEmptyObject(wishListDataObj)===false){
            if($('.'+fcClass).find('input.wls_wishListTitleInputClass').length===1){
                var inputVal = removeHtmlStripTagsOfContent($('.'+fcClass).find('input.wls_wishListTitleInputClass').val());
                if(inputVal!=='' && inputVal!==false){
                    returnParamObj['title'] = inputVal;
                }
            }
            if($('.'+fcClass).find('select.wld_eachWLDefaultSettingsOptionClass').length===1){
                var inputVal = removeHtmlStripTagsOfContent($('.'+fcClass).find('select.wld_eachWLDefaultSettingsOptionClass').find('option:selected').val());
                if(inputVal!=='' && inputVal!==false){
                    returnParamObj['is_defaultsetting'] = inputVal;
                }
            }
            if($('.'+fcClass).find('select.wld_eachWLPrivacySettingsOptionClass').length===1){
                var inputVal = removeHtmlStripTagsOfContent($('.'+fcClass).find('select.wld_eachWLPrivacySettingsOptionClass').find('option:selected').val());
                if(inputVal!=='' && inputVal!==false){
                    returnParamObj['is_publicly'] = inputVal;
                }
            }
            if(wishListDataObj.hasOwnProperty('unMd5UserId')
                && wishListDataObj.hasOwnProperty('wlId')){
                returnParamObj['updated_by'] = wishListDataObj['unMd5UserId'];
                returnParamObj['wishListId'] = wishListDataObj['wlId'];
            }
        }
        if(Object.keys(returnParamObj).length===5){
            return returnParamObj;
        }else{
            return false;
        }
    }catch(ex){
        console.log("problem in getParamDataToDeleteUserWL=>"+ex);
        return false;
    }
}

// CJ defined this function 2016-08-02
function getParamDataToMoveProductFromUWLToUWL(elementId){
    var retParamDataObj = {};
    try{
        if($('#'+elementId).length>0){
            var currentSelectedValue = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').val());
            if(currentSelectedValue!=='' && currentSelectedValue!==false){
                var moveItemFrmWishListId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-moveitemfromwishlistid'));
                var moveItemToWishListId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-moveitemtowishlistid'));
                var moveWishListItemId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-moveitemid'));
                var userLoggedId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-userloggedid'));
                if(moveItemFrmWishListId!==moveItemToWishListId 
                    && (moveItemFrmWishListId).length===32 && (moveItemToWishListId).length===32
                    && (userLoggedId).length===32 && (moveWishListItemId).length===32){
                    retParamDataObj['moveItemFromWishListId'] = moveItemFrmWishListId;
                    retParamDataObj['moveItemToWishListId'] = moveItemToWishListId;
                    retParamDataObj['moveWishListItemId'] = moveWishListItemId;
                    retParamDataObj['userLoggedId'] = userLoggedId;
                }
            }
        }
    }catch(ex){
        // console.log("problem in getParamDataToMoveProductFromWLToWL=>"+ex);
        retParamDataObj = {};
    }
    if(Object.keys(retParamDataObj).length===4){
        return retParamDataObj;
    }else{
        return false;
    }
}

// CJ defined this function 2016-08-02
function getParamDataToRemoveProductFromUWL(productDataObj){
    var retParamDataObj = {};
    try{
        if(productDataObj!==false && productDataObj!==undefined && jQuery.isEmptyObject(productDataObj)===false){
            if(productDataObj.hasOwnProperty('wishListItemId')===true
                && productDataObj.hasOwnProperty('userLoggedId')===true){
                if((productDataObj['wishListItemId']).length===32 
                    && (productDataObj['wishListItemId']).length===32){
                    retParamDataObj['wishListItemId'] = productDataObj['wishListItemId'];
                    retParamDataObj['userLoggedId'] = productDataObj['userLoggedId'];
                }
            }
        }
    }catch(ex){
        // console.log("problem in getStoredProductDataFromSessionToAddWishList ex=>"+ex);
        retParamDataObj = {};
    }
    return retParamDataObj;
}

// CJ defined this function 2016-07-30
function getParamDataToShowSearchedUserWLItemBySearchParam(userwiseWLSummaryDataObj){
    try{
        var correctParamDataCount = 0;
        var retParamDataObj = {};
        if(userwiseWLSummaryDataObj!==false && userwiseWLSummaryDataObj!==undefined 
            && jQuery.isEmptyObject(userwiseWLSummaryDataObj)===false){
            retParamDataObj['wishlistby'] = 'item';
            var retUserDataParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(userwiseWLSummaryDataObj.hasOwnProperty('userId')===true){
                if((userwiseWLSummaryDataObj['userId']).length===32){
                    retParamDataObj['createrUserId'] = userwiseWLSummaryDataObj['userId'];
                    correctParamDataCount++;
                }
            }
            if(userwiseWLSummaryDataObj.hasOwnProperty('wlId')===true){
                if((userwiseWLSummaryDataObj['wlId']).length===32){
                    retParamDataObj['wishListId'] = userwiseWLSummaryDataObj['wlId'];
                    correctParamDataCount++;
                }
            }
            if(retUserDataParamDataObj!==false && jQuery.isEmptyObject(retUserDataParamDataObj)===false){
                retParamDataObj['user_sessionid'] = retUserDataParamDataObj['user_sessionid'];
                correctParamDataCount++;
            }
        }
        if(correctParamDataCount===3){
            return retParamDataObj;
        }else{
            return false;
        }
    }catch(ex){
        // console.log("problem in getParamDataToShowSearchedUserWLItemBySearchParam=>"+ex);
        return false;
    }
}

// CJ defined this function 2016-08-04
function getParamDataToCopyProductFromUWLToUWL(elementId){
    var retParamDataObj = {};
    try{
        if($('#'+elementId).length>0){
            var currentSelectedValue = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').val());
            if(currentSelectedValue!=='' && currentSelectedValue!==false){
                var copyItemFrmWishListId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-copyitemfromwishlistid'));
                var copyItemToWishListId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-copyitemtowishlistid'));
                var copyWishListItemId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-copyitemid'));
                var userLoggedId = removeHtmlStripTagsOfContent($('#'+elementId).find('option:selected').attr('data-userloggedid'));
                if(copyItemFrmWishListId!==copyItemToWishListId 
                    && (copyItemFrmWishListId).length===32 && (copyItemToWishListId).length===32
                    && (userLoggedId).length===32 && (copyWishListItemId).length===32){
                    retParamDataObj['copyItemFromWishListId'] = copyItemFrmWishListId;
                    retParamDataObj['copyItemToWishListId'] = copyItemToWishListId;
                    retParamDataObj['copyWishListItemId'] = copyWishListItemId;
                    retParamDataObj['userLoggedId'] = userLoggedId;
                }
            }
        }
    }catch(ex){
        // console.log("problem in getParamDataToMoveProductFromWLToWL=>"+ex);
        retParamDataObj = {};
    }
    if(Object.keys(retParamDataObj).length===4){
        return retParamDataObj;
    }else{
        return false;
    }
}

// CJ defined this function 2016-08-05
function storeProductDataInSessionForUWL(paramObj){
    var retStatusDataStored =  false;
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            // check wish list obj exists
            if(dkParamObj.hasOwnProperty('wishList')===true && 
                dkParamObj.hasOwnProperty('userSession')===true){
                // extract wishList param obj
                var wishListParamObj = {};
                wishListParamObj['shopStoreId'] = paramObj['shopStoreId'];
                wishListParamObj['productTypeId'] = paramObj['productTypeId'];
                wishListParamObj['productTypeCategoryId'] = paramObj['productTypeProductCategoryId'];
                wishListParamObj['productListId'] = paramObj['productListId'];
                wishListParamObj['productFeatureId'] = paramObj['productFeatureId'];   
                dkParamObj['wishList'] = wishListParamObj;
                sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
                retStatusDataStored = true;
            }
        }
    }catch(ex){
        console.log("problem in storeProductDataInSessionForUWL=>"+ex);
        retStatusDataStored = false;
    }
    return retStatusDataStored;
}

// CJ defined this function 2016-08-05
function checkProductDataAvailableInSessionToAddUWL(){
    var retStatus = false;
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
                    if((userSessionParamObj['user_sessionid']).length>7 
                        && (userSessionParamObj['udblogId']).length===32){
                        if(dkParamObj.hasOwnProperty('wishList')===true){
                            if(jQuery.isEmptyObject(dkParamObj['wishList'])===false){
                                var wishListDataObj = dkParamObj['wishList'];
                                if((wishListDataObj['productTypeId']).length===32
                                    && (wishListDataObj['productTypeCategoryId']).length===32
                                    && (wishListDataObj['productListId']).length===32
                                    && (wishListDataObj['productFeatureId']).length===32){
                                    retStatus = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }catch(ex){
        // console.log("problem in getStoredProductDataFromSessionToAddUWL ex=>"+ex);
        retStatus = false;
    }
    return retStatus;
}


// CJ defined this function 2016-08-05
function getStoredProductDataFromSessionToAddUWL(){
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
                    if((userSessionParamObj['user_sessionid']).length>7 
                        && (userSessionParamObj['udblogId']).length===32){
                        if(dkParamObj.hasOwnProperty('wishList')===true){
                            if(jQuery.isEmptyObject(dkParamObj['wishList'])===false){
                                var wishListDataObj = dkParamObj['wishList'];
                                if(jQuery.isEmptyObject(wishListDataObj)===false){
                                    if((wishListDataObj['productTypeId']).length===32
                                        && (wishListDataObj['shopStoreId']).length===32
                                        && (wishListDataObj['productTypeCategoryId']).length===32
                                        && (wishListDataObj['productListId']).length===32
                                        && (wishListDataObj['productFeatureId']).length===32){
                                        retParamObj['shopStoreId'] = wishListDataObj['shopStoreId'];
                                        retParamObj['productTypeId'] = wishListDataObj['productTypeId'];
                                        retParamObj['productTypeCategoryId'] = wishListDataObj['productTypeCategoryId'];
                                        retParamObj['productListId'] = wishListDataObj['productListId'];
                                        retParamObj['productFeatureId'] = wishListDataObj['productFeatureId'];   
                                        retParamObj['user_sessionid'] = userSessionParamObj['user_sessionid'];   
                                        retParamObj['udblogId'] = userSessionParamObj['udblogId'];   
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }catch(ex){
        // console.log("problem in getStoredProductDataFromSessionToAddUWL ex=>"+ex);
        retParamObj = {};
    }
    if(Object.keys(retParamObj).length===7){
        return retParamObj;
    }else{
        return false;
    }
}

// CJ defined this function 2016-08-05
function clearStoredProductDataFromSessionForUWL(){
    try{
        // checking session param
        if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
            && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
            // extract dk param session data
            var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
            var wishListParamObj = {};
            dkParamObj['wishList'] = wishListParamObj;
            sessionStorage.setItem('DKPARAMOBJ', JSON.stringify(dkParamObj));
        }
    }catch(ex){
        // console.log("problem in clearStoredProductDataFromSessionForUWL=>"+ex);
    }    
}


/////////////////// Rating/Review related code ///////////////////

// CJ defined this function 2016-06-06
function getParamObjFromSessionForRatingReviewDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['store_ids'] = '';
    returnParamObj['product_typesids'] = '';
    returnParamObj['product_categoryids'] = '';
    returnParamObj['product_ids'] = '';
    returnParamObj['product_featureids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                returnParamObj['store_ids'] = userProductObj['shopstore_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_value')===true){
                returnParamObj['product_typesids'] = userProductObj['producttype_value'];
            }
            if(userProductObj.hasOwnProperty('producttype_categoryvalue')===true){
                returnParamObj['product_categoryids'] = userProductObj['producttype_categoryvalue'];
            }
            if(userProductObj.hasOwnProperty('producttype_listvalue')===true){
                returnParamObj['product_ids'] = userProductObj['producttype_listvalue'];
            }
            if(userProductObj.hasOwnProperty('producttype_featurevalue')===true){
                returnParamObj['product_featureids'] = userProductObj['producttype_featurevalue'];
            }
        }
    }
    
    if(returnParamObj['country_ids']==='1' && (returnParamObj['city_ids']).length===32
        && (returnParamObj['area_ids']).length===32 && (returnParamObj['store_ids']).length===32
        && (returnParamObj['product_typesids']).length===32 && (returnParamObj['product_categoryids']).length===32
        && (returnParamObj['product_ids']).length===32 && (returnParamObj['product_featureids']).length===32){
        return returnParamObj;
    }else{
        return false;
    }
    
}


// CJ defined this function 2016-06-26
function getParamObjFromSessionForShopStoreRatingReviewedDetails(){
    var returnParamObj = {};
    returnParamObj['country_ids'] = '';
    returnParamObj['city_ids'] = '';
    returnParamObj['area_ids'] = '';
    returnParamObj['store_ids'] = '';
    
    // checking session param
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('dkDeliveryCityAreaDessertsProduct')===true){
            // extract user suggested city area session data
            var dkDeliveryCityAreaDessertsProductObj = dkParamObj['dkDeliveryCityAreaDessertsProduct'];
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('countryvalue')===true){
                returnParamObj['country_ids'] = dkDeliveryCityAreaDessertsProductObj['countryvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('cityvalue')===true){
                returnParamObj['city_ids'] = dkDeliveryCityAreaDessertsProductObj['cityvalue'];
            }
            if(dkDeliveryCityAreaDessertsProductObj.hasOwnProperty('areavalue')===true){
                returnParamObj['area_ids'] = dkDeliveryCityAreaDessertsProductObj['areavalue'];
            }
        }
        if(dkParamObj.hasOwnProperty('userProduct')===true){
            // extract user userProduct session data
            var userProductObj = dkParamObj['userProduct'];
            if(userProductObj.hasOwnProperty('shopstore_value')===true){
                returnParamObj['store_ids'] = userProductObj['shopstore_value'];
            }
        }
    }
    
    if(returnParamObj['country_ids']==='1' && (returnParamObj['city_ids']).length===32
        && (returnParamObj['area_ids']).length===32 && (returnParamObj['store_ids']).length===32){
        return returnParamObj;
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
                if($('.'+fcClass).find('textarea').length===1){
                    var userEachQuesAnswerRatingReviewAbtProductObj = {};
                    var commentInputObj = $('.'+fcClass).find('textarea');
                    userEachQuesAnswerRatingReviewAbtProductObj['shopstore_id'] = $(commentInputObj).attr('data-shopstoreid');
                    userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = $(commentInputObj).attr('data-productlistid');
                    userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = $(commentInputObj).attr('data-questionid');
                    userEachQuesAnswerRatingReviewAbtProductObj['given_answertext'] = removeHtmlStripTagsOfContent($(commentInputObj).val());
                    userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = $(commentInputObj).attr('data-questionpattern');
                    
                    userAllQuesAnswerRatingReviewAbtProductArr.push(userEachQuesAnswerRatingReviewAbtProductObj);
                }
                if($('.'+fcClass).find('select').length===3){
                    // iterate each 
                    $('.'+fcClass).find('select').each(function(eachIndex){
                        var selectInputObj = $(this);
                        var points = $(this).find('option:selected').val();
                        var userEachQuesAnswerRatingReviewAbtProductObj = {};
                        userEachQuesAnswerRatingReviewAbtProductObj['shopstore_id'] = $(selectInputObj).find('option:selected').attr('data-shopstoreid');
                        userEachQuesAnswerRatingReviewAbtProductObj['product_listid'] = $(selectInputObj).find('option:selected').attr('data-productlistid');
                        userEachQuesAnswerRatingReviewAbtProductObj['question_id'] = $(selectInputObj).find('option:selected').attr('data-questionid');
                        userEachQuesAnswerRatingReviewAbtProductObj['given_answerpoints'] = points;
                        userEachQuesAnswerRatingReviewAbtProductObj['answer_pattern'] = $(selectInputObj).find('option:selected').attr('data-questionpattern');
                        userAllQuesAnswerRatingReviewAbtProductArr.push(userEachQuesAnswerRatingReviewAbtProductObj);
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
    if(Object.keys(paramDataObj).length===2){
        return paramDataObj;
    }else{
        return false;
    }
}

