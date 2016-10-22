
function isProperInputElementContent(inputElementId){
    var rtStatus = 'FALSE';
    try{
        if($('#'+inputElementId).length===1){
            if($('#'+inputElementId).val()==='' || $('#'+inputElementId).val()===false
            || ($('#'+inputElementId).val()).toLowerCase()==='undefined'
            || ($('#'+inputElementId).val()).toLowerCase()==='false'
            || ($('#'+inputElementId).val()).toLowerCase()==='true'){
                rtStatus = 'FALSE';
            }else{
                rtStatus = 'TRUE';
            }
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}

function isValidEmailId(emailIdContent){
    var rtStatus = 'FALSE';
    try{
        var givenEmailId = removeHtmlStripTagsOfContent(emailIdContent);
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!givenEmailId.match(emailPattern)){
            rtStatus = 'FALSE';
        }else{
            rtStatus = 'TRUE';
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}

function isValidMobileNos(mobileContent){
    var rtStatus = 'FALSE';
    try{
        var givenMobileStr = removeHtmlStripTagsOfContent(mobileContent);
        var mob10DigitsPattern = /^[5-9]\d{9}$/g;
        if(givenMobileStr.match(mob10DigitsPattern)===null 
            || givenMobileStr.match(mob10DigitsPattern)===undefined){
            rtStatus = 'FALSE';
        }else if(givenMobileStr.match(mob10DigitsPattern)!==null 
            && givenMobileStr.match(mob10DigitsPattern)!==undefined){
            var digitsRepeatingAtStartingPattern = /^[5-9]{1,7}$/g;
            if(givenMobileStr.match(digitsRepeatingAtStartingPattern)===null 
                || givenMobileStr.match(digitsRepeatingAtStartingPattern)===undefined){
                rtStatus = 'TRUE';
            }
        }else{
            rtStatus = 'TRUE';
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}

function isValidPwd(pwdContent){
    var rtStatus = 'FALSE';
    try{
        var enteredPwdText = removeHtmlStripTagsOfContent(pwdContent);
        if((enteredPwdText).length>=5 && (enteredPwdText).length<=10){
            var pwdPattern = /^[a-z0-9]+$/i;
            if(enteredPwdText.match(pwdPattern)!==null 
                && enteredPwdText.match(pwdPattern)!==undefined){
                rtStatus = 'TRUE';
            }
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}

function isValidBDateFormat(bdateformatContent){
    var rtStatus = 'FALSE';
    try{
        var enteredBDateText = removeHtmlStripTagsOfContent(bdateformatContent);
        if(enteredBDateText!==''){
            var dateRegex = /^\d{4}[/-]\d{2}[/-]\d{2}$/;
            if(enteredBDateText.match(dateRegex)!==null 
                && enteredBDateText.match(dateRegex)!==undefined){
                rtStatus = 'TRUE';
            };
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}


function validateDataUserSignInAuthentication(fromSection){
    var inValidDataCount = 0;
    if(fromSection==='signInSection'){
        $('.userSignInEmailInput_ErrorClass').empty();
        $('.userSignInPwdInput_ErrorClass').empty();
        if(isProperInputElementContent('userSignInEmailInputId')==='FALSE'){
            $('.userSignInEmailInput_ErrorClass').append("Enter your email !!!");
            inValidDataCount++;
        }else{
            if(isValidEmailId($('#userSignInEmailInputId').val())==='FALSE'){
                $('.userSignInEmailInput_ErrorClass').append("Entered email is not in proper format !!!");
                inValidDataCount++;
            }
        }
        if(isProperInputElementContent('userSignInPwdInputId')==='FALSE'){
            $('.userSignInPwdInput_ErrorClass').append("Enter your password !!!");
            inValidDataCount++;
        }else{
            if(isValidPwd($('#userSignInPwdInputId').val())==='FALSE'){
                $('.userSignInPwdInput_ErrorClass').append("Entered password length must be between 5 to 10 any alphanumberic characters only !!!");
                inValidDataCount++;
            }
        }
    }
    if(fromSection==='signInOtpSection'){
        $('.userSignInOtpCodeInput_ErrorClass').empty();
        if(isProperInputElementContent('userSignInOtpCodeInputId')==='FALSE'){
            $('.userSignInOtpCodeInput_ErrorClass').append("Enter your one time password !!!");
            inValidDataCount++;
        }else{
            var enteredOtpcodeStr = ($('#userSignInOtpCodeInputId').val());
            if((enteredOtpcodeStr).length===6){
                var userSignedInDataObj = getTemporaryUserSignedInDataFromSesion();
                if(userSignedInDataObj!==false && jQuery.isEmptyObject(userSignedInDataObj)===false){
                }else{
                    $('.userSignInOtpCodeInput_ErrorClass').append("Incorrect One Time Password has been entered !!!");
                    inValidDataCount++;
                }
            }else{
                $('.userSignInOtpCodeInput_ErrorClass').append("Entered one time password length must be six digits no.s only !!!");
                inValidDataCount++;
            }
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


function validateDataUserSignUpAuthentication(fromSection){
    var inValidDataCount = 0;
    if(fromSection==='signUpSection'){
        $('.userSignUpNameInput_ErrorClass').empty();
        $('.userSignUpEmailInput_ErrorClass').empty();
        $('.userSignUpMobileInput_ErrorClass').empty();
        if(isProperInputElementContent('userSignUpNameInputId')==='FALSE'){
            $('.userSignUpNameInput_ErrorClass').append("Enter your full name !!!");
            inValidDataCount++;
        }else{
            var enteredNameText = removeHtmlStripTagsOfContent($('#userSignUpNameInputId').val());
            if((enteredNameText).length>30){
                $('.userSignUpNameInput_ErrorClass').append("Entered full name length must be less than 30 characters !!!");
                inValidDataCount++;
            }
        }
        if(isProperInputElementContent('userSignUpEmailInputId')==='FALSE'){
            $('.userSignUpEmailInput_ErrorClass').append("Enter your email !!!");
            inValidDataCount++;
        }else{
            if(isValidEmailId($('#userSignUpEmailInputId').val())==='FALSE'){
                $('.userSignUpEmailInput_ErrorClass').append("Entered email is not in proper format !!!");
                inValidDataCount++;
            }
        }
        if(isProperInputElementContent('userSignUpMobileInputId')==='FALSE'){
            $('.userSignUpMobileInput_ErrorClass').append("Enter your mobile no.s !!!");
            inValidDataCount++;
        }else{
            if(isValidMobileNos($('#userSignUpMobileInputId').val())==='FALSE'){
                $('.userSignUpMobileInput_ErrorClass').append("Entered valid mobile no.s !!!");
                inValidDataCount++;
            }
        }
    }
    if(fromSection==='signUpOtpSection'){
        $('.userSignUpOtpCodeInput_ErrorClass').empty();
        $('.userSignUpPwdInput_ErrorClass').empty();
        if(isProperInputElementContent('userSignUpOtpCodeInputId')==='FALSE'){
            $('.userSignUpOtpCodeInput_ErrorClass').append("Enter your one time password !!!");
            inValidDataCount++;
        }else{
            var userSignUpDataObj = getTemporaryUserSignUpDataFromSesion();
            if(userSignUpDataObj!==false && jQuery.isEmptyObject(userSignUpDataObj)===false){
            }else{
                $('.userSignUpOtpCodeInput_ErrorClass').append("Invalid entered one time password !!!");
                inValidDataCount++;
            }
        }
        if(isProperInputElementContent('userSignUpPwdInputId')==='FALSE'){
            $('.userSignUpOtpCodeInput_ErrorClass').append("Enter your password !!!");
            inValidDataCount++;
        }else{
            if(isValidPwd($('#userSignUpPwdInputId').val())==='FALSE'){
                $('.userSignUpOtpCodeInput_ErrorClass').append("Entered password length must be between 5 to 10 any alphanumberic characters only !!!");
                inValidDataCount++;
            }
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


function validateDataUserFrgtPwdAuthentication(fromSection){
    var inValidDataCount = 0;
    if(fromSection==='frgtPwdStep1Section'){
        $('.userFrgtPwdEmailInput_ErrorClass').empty();
        if(isProperInputElementContent('userFrgtPwdEmailInputId')==='FALSE'){
            $('.userFrgtPwdEmailInput_ErrorClass').append("Enter your email !!!");
            inValidDataCount++;
        }else{
            if(isValidEmailId($('#userFrgtPwdEmailInputId').val())==='FALSE'){
                $('.userFrgtPwdEmailInput_ErrorClass').append("Entered email is not in proper format !!!");
                inValidDataCount++;
            }
        }
    }else if(fromSection==='frgtPwdStep2Section'){
        $('.userFrgtPwdOtpCodeInput_ErrorClass').empty();
        if(isProperInputElementContent('userFrgtPwdOtpCodeInputId')==='FALSE'){
            $('.userFrgtPwdOtpCodeInput_ErrorClass').append("Enter your one time password !!!");
            inValidDataCount++;
        }else{
            var userFrgtPwdDataObj = getTemporaryUserFrgtPwdDataFromSesion();
            if(userFrgtPwdDataObj!==false && jQuery.isEmptyObject(userFrgtPwdDataObj)===false){
            }else{
                $('.userFrgtPwdOtpCodeInput_ErrorClass').append("Invalid entered one time password !!!");
                inValidDataCount++;
            }
        }
    }else if(fromSection==='frgtPwdStep3Section'){
        $('.userFrgtPwdInput_ErrorClass').empty();
        $('.userFrgtPwdConfirmInput_ErrorClass').empty();
        if(isProperInputElementContent('userFrgtPwdInputId')==='FALSE'){
            $('.userFrgtPwdInput_ErrorClass').append("Enter your new password !!!");
            inValidDataCount++;
        }else{
            if(isValidPwd($('#userFrgtPwdInputId').val())==='FALSE'){
                $('.userFrgtPwdInput_ErrorClass').append("Entered new password length must be between 5 to 10 any alphanumberic characters only !!!");
                inValidDataCount++;
            }
        }
        if(isProperInputElementContent('userFrgtPwdConfirmInputId')==='FALSE'){
            $('.userFrgtPwdConfirmInput_ErrorClass').append("Enter your confirm password !!!");
            inValidDataCount++;
        }else{
            if(isValidPwd($('#userFrgtPwdConfirmInputId').val())==='FALSE'){
                $('.userFrgtPwdConfirmInput_ErrorClass').append("Entered confirm password length must be between 5 to 10 any alphanumberic characters only !!!");
                inValidDataCount++;
            }
        }
        if(inValidDataCount===0){
            var userFrgtPwdDataObj = getTemporaryUserFrgtPwdDataFromSesion();
            if(userFrgtPwdDataObj!==false && jQuery.isEmptyObject(userFrgtPwdDataObj)===false){
                var userPwdText = removeHtmlStripTagsOfContent($('#userFrgtPwdInputId').val());
                var userCPwdText = removeHtmlStripTagsOfContent($('#userFrgtPwdConfirmInputId').val());
                if(userPwdText!=='' && userCPwdText!=='' && userPwdText!==userCPwdText){
                    $('.userFrgtPwdConfirmInput_ErrorClass').append("New & confirm password must be same between 5 to 10 any alphanumberic characters only !!!");
                    inValidDataCount++;
                }
            }else{
                $('.userFrgtPwdConfirmInput_ErrorClass').append("New & confirm password must be same between 5 to 10 any alphanumberic characters only !!!");
                inValidDataCount++;
            }
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


function validateUserProfileInfoData(){
    var inValidDataCount = 0;
    $('.userFullNameInput_ErrorClass').empty();
    $('.userEmailInput_ErrorClass').empty();
    $('.userMobileInput_ErrorClass').empty();
    $('.userBirthdateInput_ErrorClass').empty();
    if(isProperInputElementContent('userFullNameInputId')==='FALSE'){
        $('.userFullNameInput_ErrorClass').append("Enter your email !!!");
        inValidDataCount++;
    }else{
        var enteredNameText = removeHtmlStripTagsOfContent($('#userFullNameInputId').val());
        if((enteredNameText).length>30){
            $('.userFullNameInput_ErrorClass').append("Entered full name length must be less than 30 characters !!!");
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('userEmailInputId')==='FALSE'){
        $('.userEmailInput_ErrorClass').append("Enter your email !!!");
        inValidDataCount++;
    }else{
        if(isValidEmailId($('#userEmailInputId').val())==='FALSE'){
            $('.userEmailInput_ErrorClass').append("Entered email is not in proper format !!!");
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('userMobileInputId')==='FALSE'){
        $('.userMobileInput_ErrorClass').append("Enter your mobile no.s !!!");
        inValidDataCount++;
    }else{
        if(isValidMobileNos($('#userMobileInputId').val())==='FALSE'){
            $('.userMobileInput_ErrorClass').append("Entered valid mobile no.s !!!");
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('userBirthdateInputId')==='FALSE'){
        $('.userBirthdateInput_ErrorClass').append("Enter your birthdate !!!");
        inValidDataCount++;
    }else{
        if(isValidBDateFormat($('#userBirthdateInputId').val())==='FALSE'){
            $('.userBirthdateInput_ErrorClass').append("Entered valid birthdate !!!");
            inValidDataCount++;
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}

function validationUserChangePasswordInfoData(){
    var inValidDataCount = 0;
    $('.userOldPwdInput_ErrorClass').empty();
    $('.userNewPwdInput_ErrorClass').empty();
    $('.userNewCPwdInput_ErrorClass').empty();
    if(isProperInputElementContent('uca_oldPwdInputId')==='FALSE'){
        $('.userOldPwdInput_ErrorClass').append("Enter your old password !!!");
        inValidDataCount++;
    }else{
        if(isValidPwd($('#uca_oldPwdInputId').val())==='FALSE'){
            $('.userOldPwdInput_ErrorClass').append("Entered old password length must be between 5 to 10 any alphanumberic characters only !!!");
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('uca_newPwdInputId')==='FALSE'){
        $('.userNewPwdInput_ErrorClass').append("Enter your new password !!!");
        inValidDataCount++;
    }else{
        if(isValidPwd($('#uca_newPwdInputId').val())==='FALSE'){
            $('.userNewPwdInput_ErrorClass').append("Entered new password length must be between 5 to 10 any alphanumberic characters only !!!");
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('uca_newcPwdInputId')==='FALSE'){
        $('.userNewCPwdInput_ErrorClass').append("Enter your new confirm password !!!");
        inValidDataCount++;
    }else{
        if(isValidPwd($('#uca_newcPwdInputId').val())==='FALSE'){
            $('.userNewCPwdInput_ErrorClass').append("Entered your new confirm password length must be between 5 to 10 any alphanumberic characters only !!!");
            inValidDataCount++;
        }
    }
    if(isValidPwd($('#uca_newPwdInputId').val())==='TRUE'
        && isValidPwd($('#uca_newcPwdInputId').val())==='FALSE'){
        var userPwdText = removeHtmlStripTagsOfContent($('#uca_newPwdInputId').val());
        var userCPwdText = removeHtmlStripTagsOfContent($('#uca_newcPwdInputId').val());
        if(userPwdText!=='' && userCPwdText!=='' && userPwdText!==userCPwdText){
            $('.userNewCPwdInput_ErrorClass').append("Your new & confirm password must be same between 5 to 10 any alphanumberic characters only !!!");
            inValidDataCount++;
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


function validateParamDataPartyOrderRequest(){
    var inValidDataCount = 0 ;
    if(isProperInputElementContent('po_occasionTitleInputId')==='FALSE'){
        inValidDataCount++;
    }else{
        var enteredTitleText = removeHtmlStripTagsOfContent($('#po_occasionTitleInputId').val());
        if((enteredTitleText).length>60){
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('po_nosPeopleInputId')==='FALSE'){
        inValidDataCount++;
    }else{
        var enteredNos = removeHtmlStripTagsOfContent($('#po_nosPeopleInputId').val());
        if(parseInt(enteredNos)<=0){
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('po_dateInputId')==='FALSE'){
        inValidDataCount++;
    }
    if(isProperInputElementContent('po_venueInputId')==='FALSE'){
        inValidDataCount++;
    }
    if(isProperInputElementContent('po_messageInputId')==='FALSE'){
        inValidDataCount++;
    }
    if(isProperInputElementContent('po_budgetAmtInputId')==='FALSE'){
        inValidDataCount++;
    }else{
        var enteredNos = removeHtmlStripTagsOfContent($('#po_budgetAmtInputId').val());
        if(parseInt(enteredNos)<=0){
            inValidDataCount++;
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}

function validateParamDataCustomizeOrderRequest(){
    var inValidDataCount = 0 ;
    if(isProperInputElementContent('co_occasionTitleInputId')==='FALSE'){
        inValidDataCount++;
    }else{
        var enteredTitleText = removeHtmlStripTagsOfContent($('#co_occasionTitleInputId').val());
        if((enteredTitleText).length>60){
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('co_nosPeopleInputId')==='FALSE'){
        inValidDataCount++;
    }else{
        var enteredNos = removeHtmlStripTagsOfContent($('#co_nosPeopleInputId').val());
        if(parseInt(enteredNos)<=0){
            inValidDataCount++;
        }
    }
    if(isProperInputElementContent('co_dateInputId')==='FALSE'){
        inValidDataCount++;
    }
    if(isProperInputElementContent('co_venueInputId')==='FALSE'){
        inValidDataCount++;
    }
    if(isProperInputElementContent('co_messageInputId')==='FALSE'){
        inValidDataCount++;
    }
    if(isProperInputElementContent('co_budgetAmtInputId')==='FALSE'){
        inValidDataCount++;
    }else{
        var enteredNos = removeHtmlStripTagsOfContent($('#co_budgetAmtInputId').val());
        if(parseInt(enteredNos)<=0){
            inValidDataCount++;
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


function validateDataToAddUserRatingReviewProduct(fcClass){
    var inValidDataCount = 0 ;
    if($('.'+fcClass).length===1){
        if($('.'+fcClass).find('textarea').length===1){
            var userCommentRatingReviewProduct = removeHtmlStripTagsOfContent($('.'+fcClass).find('textarea').val());
            if(userCommentRatingReviewProduct==='' 
                || userCommentRatingReviewProduct===false
                || userCommentRatingReviewProduct===undefined){
                $('.'+fcClass).find('textarea').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('.'+fcClass).find('textarea').css({'border-color':'#ccc'});
            }
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}

function validateProductDataToAddInOrdercart(fcClass){
    try{
        var inValidDataCount = 0 ;
        if(fcClass!==false && fcClass!=='' && fcClass!==undefined){
            if($('.'+fcClass).length===1){
                if($('.'+fcClass).find('textarea').length===1){
                    var userMsgOnProduct = removeHtmlStripTagsOfContent($('.'+fcClass).find('textarea').val());
                    if(userMsgOnProduct==='' || userMsgOnProduct===false || userMsgOnProduct===undefined){
                        $('.'+fcClass).find('textarea').css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else{
                        $('.'+fcClass).find('textarea').css({'border-color':'#ccc'});
                    }
                }
                if($('.'+fcClass).find("input[type='text']").length===1){
                    var userProductQty = removeHtmlStripTagsOfContent($('.'+fcClass).find("input[type='text']").val());
                    if(userProductQty==='' || userProductQty===false || userProductQty===undefined || parseInt(userProductQty)<0){
                        $('.'+fcClass).find("input[type='text']").css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else{
                        $('.'+fcClass).find("input[type='text']").css({'border-color':'#ccc'});
                    }
                }
            }
        }
        if(inValidDataCount>0){
            return false;
        }else{
            return true;
        }
    }catch(ex){
        return false;
    }
}


function validateProductDataToUpdateInOrdercart(fcClass){
    try{
        var inValidDataCount = 0 ;
        if(fcClass!==false && fcClass!=='' && fcClass!==undefined){
            if($('.'+fcClass).length===1){
                if($('.'+fcClass).find("input[type='text']").length===1){
                    var userProductQty = removeHtmlStripTagsOfContent($('.'+fcClass).find("input[type='text']").val());
                    if(userProductQty==='' || userProductQty===false || userProductQty===undefined || parseInt(userProductQty)<0){
                        $('.'+fcClass).find("input[type='text']").css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else{
                        $('.'+fcClass).find("input[type='text']").css({'border-color':'#ccc'});
                    }
                }
            }
        }
        if(inValidDataCount>0){
            return false;
        }else{
            return true;
        }
    }catch(ex){
        return false;
    }
}

function validateOrderDeliveryAddressData(fcClass){
    try{
        var inValidDataCount = 0 ;
        if(fcClass!==false && fcClass!=='' && fcClass!==undefined){
            if($('.'+fcClass).length>0){
                // iterate each form content
                $('.'+fcClass).each(function(){
                    var currentFormContentObj = $(this);
                    if($(currentFormContentObj).find('textarea').length===1){
                        var deliveryAddress = removeHtmlStripTagsOfContent($(currentFormContentObj).find('textarea').val());
                        if(deliveryAddress==='' || deliveryAddress===false || deliveryAddress===undefined){
                            $(currentFormContentObj).find('textarea').css({'border-color':'#f18178'});
                            inValidDataCount++;
                        }else{
                            $(currentFormContentObj).find('textarea').css({'border-color':'#ccc'});
                        }
                    }
                    if($(currentFormContentObj).find("input[type='text']").length===1){
                        var deliveryDate = removeHtmlStripTagsOfContent($(currentFormContentObj).find("input[type='text']").val());
                        if(deliveryDate==='' || deliveryDate===false || deliveryDate===undefined){
                            $(currentFormContentObj).find("input[type='text']").css({'border-color':'#f18178'});
                            inValidDataCount++;
                        }else{
                            $(currentFormContentObj).find("input[type='text']").css({'border-color':'#ccc'});
                        }
                    }
                });
            }
        }
        if(inValidDataCount>0){
            return false;
        }else{
            return true;
        }
    }catch(ex){
        return false;
    }
}



function validateDataToShareOffers(fcClass){
    try{
        var inValidDataCount = 0 ;
        if(fcClass!==false && fcClass!=='' && fcClass!==undefined){
            if($('.'+fcClass).length===1){
                if($('.'+fcClass).find("input[type='text']").length===1){
                    var userMobileInputObj = $('.'+fcClass).find("input[type='text']"); 
                    var userMobileValue = removeHtmlStripTagsOfContent($('.'+fcClass).find("input[type='text']").val());
                    if(userMobileValue==='' || userMobileValue===false){
                        $(userMobileInputObj).css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else if(userMobileValue!=='' && userMobileValue!==false){
                        var mobilePattern = /^[6-9]\d{9}$/g;
                        if(!userMobileValue.match(mobilePattern) && (userMobileValue).length!==10){
                            $(userMobileInputObj).css({'border-color':'#f18178'});
                            inValidDataCount++;
                        }else if(userMobileValue.match(mobilePattern)===true && (userMobileValue).length===10){
                            $(userMobileInputObj).css({'border-color':'#ccc'});
                        }
                    }
                }
            }
        }
        if(inValidDataCount>0){
            return false;
        }else{
            return true;
        }
    }catch(ex){
        return false;
    }
}
