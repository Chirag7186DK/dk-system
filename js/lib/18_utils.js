
function communicationWithAjax(readFileUrl, readUrlFrom, requestType, extraJsonParamObjKey, jsonParamObj, fetchJsonDataUsingKey){
    try{
        
        // loader data will be prepare here
        var msgStr = "<img src='"+globalBaseSitePath+"images/loading.gif'><br>";
        msgStr+= "<center>Please wait desserts khazana is loading........</center>";
        var blockUIObj = {};
        blockUIObj['css'] = {"padding":10, "border":"0px!important;"};
        blockUIObj['message'] = msgStr;
        showHideLoaderBox('show', blockUIObj);
                
        var passJsonDataToAjax = false;
        var requestTypeAr = new Array("GET", "POST", "DELETE", "PUT");
        if(jsonParamObj==='' || jsonParamObj===undefined){
            jsonParamObj = {};
            jsonParamObj['dummy'] = "data";
        }
        if(requestType==="GET" || requestType==='' || requestType===undefined){
            requestType = "GET";
            if(extraJsonParamObjKey!=='' && extraJsonParamObjKey!==false && extraJsonParamObjKey!==undefined){
                passJsonDataToAjax = extraJsonParamObjKey+"="+JSON.stringify(jsonParamObj);
            }else{
                passJsonDataToAjax = "data="+JSON.stringify(jsonParamObj);
            }
        }else if(requestTypeAr.indexOf(requestType)>=0 && requestType!=='GET' && requestType!==undefined){
            if(extraJsonParamObjKey!=='' && extraJsonParamObjKey!==false && extraJsonParamObjKey!==undefined){
                passJsonDataToAjax = extraJsonParamObjKey+"="+JSON.stringify(jsonParamObj);
            }else{
                passJsonDataToAjax = JSON.stringify(jsonParamObj);
            }
        }else{
            passJsonDataToAjax = "dummy="+JSON.stringify(jsonParamObj);
        }
        return $.ajax({
            url: globalBaseSitePath+readFileUrl,
            async:true,
            type:requestType,
            data:passJsonDataToAjax,
            beforeSend: function(xhr){xhr.setRequestHeader('hash', apiUrlAccessHashValue);
            },
            success:function(json){
                showHideLoaderBox('hide');
            },
            complete:function(json){
                showHideLoaderBox('hide');
            },
            error:function (jqXHR, textStatus, errorThrown){
                showHideLoaderBox('hide');
            }
        });
    }catch(ex){
        showHideLoaderBox('hide');
        console.log("Problem in communicationWithAjax=>"+ex);
    }
}


function extractDataFromReturnAjaxResponse(requestType, readUrlFrom, fetchJsonDataUsingKey, json){
    var requestTypeAr = new Array("GET", "POST", "DELETE", "PUT");
    var retJsonDataGivenFileUrl = false;
    try{
        if(requestType==="GET"){
            if(readUrlFrom==='jsonFile'){
                if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                    retJsonDataGivenFileUrl = $.parseJSON(json)[fetchJsonDataUsingKey];
                }else{
                    retJsonDataGivenFileUrl = $.parseJSON(json);
                }
            }else if(readUrlFrom==='ajaxFile'){
                if($.parseJSON(json)['statusMsg']==="SUCCESS"){
                    if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                        retJsonDataGivenFileUrl = $.parseJSON(json)[fetchJsonDataUsingKey];
                    }else{
                        retJsonDataGivenFileUrl = $.parseJSON(json);
                    }
                }else{
                    retJsonDataGivenFileUrl = false;
                }
            }else if(readUrlFrom==='apiFile' && isHeaderExecutingOnServerLevel==='Y'){
                retJsonDataGivenFileUrl = false;
                if((json.collection.response).hasOwnProperty('isRequestParamKeyValid')===true){
                }else if((json.collection.response).hasOwnProperty('isRequestParamKeyDataValid')===true){
                }else if((json.collection.response).hasOwnProperty('isExceptionOccured')===false){
                    if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                        if((json.collection.response).hasOwnProperty(fetchJsonDataUsingKey)===true){
                            retJsonDataGivenFileUrl = json.collection.response[fetchJsonDataUsingKey];
                        }
                    }else{
                        retJsonDataGivenFileUrl = json.collection.response;
                    }
                }else if((json.collection.response).hasOwnProperty('isExceptionOccured')===true){
                    //console.log("Exception occured on server");
                }
            }else if(readUrlFrom==='apiFile' && isHeaderExecutingOnServerLevel==='N'){
                retJsonDataGivenFileUrl = false;
                var responseParseJsonObj = $.parseJSON(json);
                if((responseParseJsonObj.collection.response).hasOwnProperty('isRequestParamKeyValid')===true){
                }else if((responseParseJsonObj.collection.response).hasOwnProperty('isRequestParamKeyDataValid')===true){
                }else if((responseParseJsonObj.collection.response).hasOwnProperty('isExceptionOccured')===false){
                    if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                        if((responseParseJsonObj.collection.response).hasOwnProperty(fetchJsonDataUsingKey)===true){
                            retJsonDataGivenFileUrl = responseParseJsonObj.collection.response[fetchJsonDataUsingKey];
                        }
                    }else{
                        retJsonDataGivenFileUrl = responseParseJsonObj.collection.response;
                    }
                }else if((responseParseJsonObj.collection.response).hasOwnProperty('isExceptionOccured')===true){
                    //console.log("Exception occured on server");
                }
            }
        }else if(requestTypeAr.indexOf(requestType)>=0 && requestType!=='GET'){
            if(readUrlFrom==='jsonFile'){
                retJsonDataGivenFileUrl = $.parseJSON(json)[fetchJsonDataUsingKey];
            }else if(readUrlFrom==='ajaxFile'){
                if($.parseJSON(json)['statusMsg']==="SUCCESS"){
                    if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                        retJsonDataGivenFileUrl = $.parseJSON(json)[fetchJsonDataUsingKey];
                    }else{
                        retJsonDataGivenFileUrl = $.parseJSON(json);
                    }
                }else{
                    retJsonDataGivenFileUrl = false;
                }
            }else if(readUrlFrom==='apiFile' && isHeaderExecutingOnServerLevel==='Y'){
                retJsonDataGivenFileUrl = false;
                if((json.collection.response).hasOwnProperty('isRequestParamKeyValid')===true){
                }else if((json.collection.response).hasOwnProperty('isRequestParamKeyDataValid')===true){
                }else if((json.collection.response).hasOwnProperty('isExceptionOccured')===false){
                    if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                        if((json.collection.response).hasOwnProperty(fetchJsonDataUsingKey)===true){
                            retJsonDataGivenFileUrl = json.collection.response[fetchJsonDataUsingKey];
                        }
                    }else{
                        retJsonDataGivenFileUrl = json.collection.response;
                    }
                }else if((json.collection.response).hasOwnProperty('isExceptionOccured')===true){
                    // console.log("Exception occured on server");
                }
            }else if(readUrlFrom==='apiFile' && isHeaderExecutingOnServerLevel==='N'){
                var responseParseJsonObj = $.parseJSON(json);
                if((responseParseJsonObj.collection.response).hasOwnProperty('isRequestParamKeyValid')===true){
                }else if((responseParseJsonObj.collection.response).hasOwnProperty('isRequestParamKeyDataValid')===true){
                }else if((responseParseJsonObj.collection.response).hasOwnProperty('isExceptionOccured')===false){
                    if(fetchJsonDataUsingKey!==undefined && fetchJsonDataUsingKey!==''){
                        if((responseParseJsonObj.collection.response).hasOwnProperty(fetchJsonDataUsingKey)===true){
                            retJsonDataGivenFileUrl = responseParseJsonObj.collection.response[fetchJsonDataUsingKey];
                        }
                    }else{
                        retJsonDataGivenFileUrl = responseParseJsonObj.collection.response;
                    }
                }else if((responseParseJsonObj.collection.response).hasOwnProperty('isExceptionOccured')===true){
                    // console.log("Exception occured on server");
                }
            }
        }
    }catch(ex){
        //console.log(ex);
        retJsonDataGivenFileUrl = false;
    }
    return retJsonDataGivenFileUrl;
}


function showHideLoaderBox(showHideMethod, jsonParamBlockUI, divLoaderBoxId){
    try{
        if(showHideMethod==='show'){
            if(jQuery.isEmptyObject(jsonParamBlockUI)===false){
                if(divLoaderBoxId!==undefined && divLoaderBoxId!=='' && divLoaderBoxId!==false){
                    if($('#'+divLoaderBoxId).length===1){
                        $('#'+divLoaderBoxId).block(jsonParamBlockUI);
                    }else{
                        $.blockUI(jsonParamBlockUI);
                    }
                }else{
                    $.blockUI(jsonParamBlockUI);
                }
            }else{
                $.blockUI();
            }
        }else{
            if(divLoaderBoxId!==undefined && divLoaderBoxId!=='' && divLoaderBoxId!==false){
                if($('#'+divLoaderBoxId).length===1){
                    $('#'+divLoaderBoxId).unblock();
                }else{
                    $.unblockUI();
                }
            }else{
                $.unblockUI();
            }
        }
    }catch(ex){
        // console.log("loader problem ex=>"+ex);
        $.unblockUI();
    }
}


function removeHtmlStripTagsOfContent(givenContent){
    try{
        if(givenContent==='' || givenContent===undefined || givenContent===false){
            givenContent = '';
        }else{
            givenContent = (givenContent).toString();
        }
        if(givenContent!=='' && givenContent!==undefined && givenContent!==false){
            var regex = /(<([^>]+)>)/ig;
            var htmlStripTagLessContent = givenContent.replace(regex, "");
            return (htmlStripTagLessContent).trim();
        }else{
            return (givenContent).trim();
        }
    }catch(ex){
        return (givenContent).trim();
    }
}


function showNotificationBoxMsg(msgStr, notifyInfoConfigObj){
    var configObj = {};
    if(notifyInfoConfigObj===false || notifyInfoConfigObj===undefined 
        || notifyInfoConfigObj==='' || jQuery.isEmptyObject(notifyInfoConfigObj)===true){
        configObj = {
            icon:false,
            title:false,
            sound:false, 
            size:'normal', 
            msg:msgStr,
            delay:2000,
            width:deviceWidth,
            position:"bottom right" 
        };       
    }else{
        configObj = $.extend(configObj, notifyInfoConfigObj);
        configObj['width'] = deviceWidth;
    }
    Lobibox.notify('info', configObj);
}
