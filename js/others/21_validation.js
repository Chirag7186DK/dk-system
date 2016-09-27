
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
            rtStatus = 'TRUE';
        }
    }catch(ex){
        rtStatus = 'FALSE';
    }
    return rtStatus;
}

function isValidDateBDateFormat(bdateformatContent){
    var rtStatus = 'FALSE';
    try{
        var enteredBDateText = removeHtmlStripTagsOfContent(bdateformatContent);
        if(enteredBDateText!==''){
            var dateRegex = /^\d{4}[/-][0-9]{2}[/-]\d{2}$/;
            if(enteredBDateText.match(dateRegex)===null 
                || enteredBDateText.match(dateRegex)===undefined){
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
            var userSignedInDataObj = getTemporaryUserSignedInDataFromSesion();
            if(userSignedInDataObj!==false && jQuery.isEmptyObject(userSignedInDataObj)===false){
            }else{
                $('.userSignInOtpCodeInput_ErrorClass').append("Incorrect One Time Password has been enteredd !!!");
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
        if(isValidDateBDateFormat($('#userBirthdateInputId').val())==='FALSE'){
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



// CJ defined this fucntion 2016-07-20
function attachedFieldValidationPartyOrdersRequest(){
    if($('#po_occasionTitleInputId').length===1){
        $('#po_occasionTitleInputId').alphanum(
            {
                "disallow":".", 
                "allowNumeric":false, 
                "allowSpace":true
            }
        );
    }
    if($('#po_nosPeopleInputId').length===1){
        $('#po_nosPeopleInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"5", 
                "allowDecSep":false
            }
        );
    }
    if($('#po_dateInputId').length===1){
        var cdate = new Date();
        $('#po_dateInputId').datepicker({
            minDate:cdate,
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        });
    }
    if($('#po_venueInputId').length===1){
//        $("#po_venueInputId").geocomplete({
//            details: ".po_venueContainerDivClass",
//            country: 'IN',
//            types: ["geocode"]
//        });
    }
    if($('#po_budgetAmtInputId').length===1){
        $('#po_budgetAmtInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"5", 
                "allowDecSep":false
            }
        );
    }
}

// CJ defined this function 2016-07-20
function validateParamDataPartyOrderRequest(){
    // checking session param
    var inValidDataCount = 0 ;
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        
        // check form field is blank or not for party order request
        if($('#po_occasionTitleInputId').length===1){
            if($('#po_occasionTitleInputId').val()===''){
                $('#po_occasionTitleInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#po_occasionTitleInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#po_nosPeopleInputId').length===1){
            if($('#po_nosPeopleInputId').val()===''){
                $('#po_nosPeopleInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#po_nosPeopleInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#po_dateInputId').length===1){
            if($('#po_dateInputId').val()===''){
                $('#po_dateInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#po_dateInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#po_venueInputId').length===1){
            if($('#po_venueInputId').val()===''){
                $('#po_venueInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#po_venueInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#po_messageInputId').length===1){
            if($('#po_messageInputId').val()===''){
                $('#po_messageInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#po_messageInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#po_budgetAmtInputId').length===1){
            if($('#po_budgetAmtInputId').val()===''){
                $('#po_budgetAmtInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#po_budgetAmtInputId').css({'border-color':'#ccc'});
            }
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}

// CJ defined this fucntion 2016-07-20
function attachedFieldValidationCustomizeOrdersRequest(){
    if($('#co_occasionTitleInputId').length===1){
        $('#co_occasionTitleInputId').alphanum(
            {
                "disallow":".", 
                "allowNumeric":false, 
                "allowSpace":true
            }
        );
    }
    if($('#co_nosPeopleInputId').length===1){
        $('#co_nosPeopleInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"5", 
                "allowDecSep":false
            }
        );
    }
    if($('#co_dateInputId').length===1){
        var cdate = new Date();
        $('#co_dateInputId').datepicker({
            minDate:cdate,
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        });
    }
    if($('#co_venueInputId').length===1){
//        $("#po_venueInputId").geocomplete({
//            details: ".po_venueContainerDivClass",
//            country: 'IN',
//            types: ["geocode"]
//        });
    }
    if($('#co_budgetAmtInputId').length===1){
        $('#co_budgetAmtInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"5", 
                "allowDecSep":false
            }
        );
    }
}


// CJ defined this function 2016-07-20
function validateParamDataCustomizeOrderRequest(){
    // checking session param
    var inValidDataCount = 0 ;
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // check form field is blank or not for party order request
        if($('#co_occasionTitleInputId').length===1){
            if($('#co_occasionTitleInputId').val()===''){
                $('#co_occasionTitleInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#co_occasionTitleInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#co_nosPeopleInputId').length===1){
            if($('#co_nosPeopleInputId').val()===''){
                $('#co_nosPeopleInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#co_nosPeopleInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#co_dateInputId').length===1){
            if($('#co_dateInputId').val()===''){
                $('#co_dateInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#co_dateInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#co_venueInputId').length===1){
            if($('#co_venueInputId').val()===''){
                $('#co_venueInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#co_venueInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#co_messageInputId').length===1){
            if($('#co_messageInputId').val()===''){
                $('#co_messageInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#co_messageInputId').css({'border-color':'#ccc'});
            }
        }
        if($('#co_budgetAmtInputId').length===1){
            if($('#co_budgetAmtInputId').val()===''){
                $('#co_budgetAmtInputId').css({'border-color':'#f18178'});
                inValidDataCount++;
            }else{
                $('#co_budgetAmtInputId').css({'border-color':'#ccc'});
            }
        }
    }
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


// CJ defined this fucntion 2016-07-24
function attachedFieldValidationCorporateTieupRequest(){
    if($('#ct_corporateNameInputId').length===1){
        $('#ct_corporateNameInputId').alphanum(
            {
                "disallow":".", 
                "allowNumeric":false, 
                "allowSpace":true
            }
        );
    }
    if($('#co_contactPersonNameInputId').length===1){
        $('#co_contactPersonNameInputId').alphanum(
            {
                "disallow":".", 
                "allowNumeric":false, 
                "allowSpace":true
            }
        );
    }
    if($('#co_contactMobileInputId').length===1){
        $('#co_contactMobileInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"10", 
                "allowDecSep":false
            }
        );
        //CJ added code here 2015-10-05
        $('#co_contactMobileInputId').bind("keypress keydown keyup change paste", function(e){
            try{
                var currentTextVal = removeHtmlStripTagsOfContent($(this).val());
                if(currentTextVal!=='' && currentTextVal!==undefined && currentTextVal!==false){
                    if(currentTextVal.charAt(0)<=6){
                        $(this).val('');
                    }
                }
            }catch(ex){
                $(this).val('');
            }
        });
    }
    if($('#co_contactEmailInputId').length===1){
        $('#co_contactEmailInputId').bind("keypress keydown keyup change paste", function(e){
            try{
                var currentTextVal = removeHtmlStripTagsOfContent($(this).val());
                if(currentTextVal!=='' && currentTextVal!==undefined && currentTextVal!==false){
                    var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(!currentTextVal.match(mail)){
                        $(this).css({'border-color':'#f18178'});
                    }else{
                        $(this).css({'border-color':'#ccc'});
                    }
                }
            }catch(ex){
            }
        });
    }
    if($('#co_nosPeopleInputId').length===1){
        $('#co_nosPeopleInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"5", 
                "allowDecSep":false
            }
        );
    }
}

// CJ defined this function 2016-07-20
function validateParamDataCorporateTieupRequest(){
    // checking session param
    var inValidDataCount = 0 ;
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('corporateTieup')===true){
            // extract customize order param obj
            var partyOrderParamObj = dkParamObj['corporateTieup'];
            if(partyOrderParamObj.hasOwnProperty('corporateTieupTitle')!==''){
                // check form field is blank or not for corporate tieup request
                if($('#ct_corporateNameInputId').length===1){
                    if($('#ct_corporateNameInputId').val()===''){
                        inValidDataCount++;
                    }
                }
                if($('#ct_contactPersonNameInputId').length===1){
                    if($('#ct_contactPersonNameInputId').val()===''){
                        inValidDataCount++;
                    }
                }
                if($('#ct_contactMobileInputId').length===1){
                    if($('#ct_contactMobileInputId').val()===''){
                        $('#ct_contactMobileInputId').css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else if($('#ct_contactMobileInputId').val()!==''){
                        var enterMobileNo = removeHtmlStripTagsOfContent($('#ct_contactMobileInputId').val());
                        var mobilePattern = /^[6-9]\d{9}$/g;
                        if(!enterMobileNo.match(mobilePattern) && (enterMobileNo).length!==9){
                            $('#ct_contactMobileInputId').css({'border-color':'#f18178'});
                        }else{
                            $('#ct_contactMobileInputId').css({'border-color':'#ccc'});
                        }
                    }
                }
                if($('#ct_contactEmailInputId').length===1){
                    if($('#ct_contactEmailInputId').val()===''){
                        $('#ct_contactEmailInputId').css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else if($('#ct_contactEmailInputId').val()!==''){
                        var enteredEmailId = removeHtmlStripTagsOfContent($('#ct_contactEmailInputId').val());
                        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if(!enteredEmailId.match(emailPattern)){
                            $('#ct_contactEmailInputId').css({'border-color':'#f18178'});
                            inValidDataCount++;
                        }else{
                            $('#ct_contactEmailInputId').css({'border-color':'#ccc'});
                        }
                    }
                }
                if($('#ct_nosPeopleInputId').length===1){
                    if($('#ct_nosPeopleInputId').val()===''){
                        $('#ct_nosPeopleInputId').css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else{
                        $('#ct_nosPeopleInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#ct_venueInputId').length===1){
                    if($('#ct_venueInputId').val()===''){
                        $('#ct_venueInputId').css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else{
                        $('#ct_venueInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#ct_messageInputId').length===1){
                    if($('#ct_messageInputId').val()===''){
                        $('#ct_messageInputId').css({'border-color':'#f18178'});
                        inValidDataCount++;
                    }else{
                        $('#ct_messageInputId').css({'border-color':'#ccc'});
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
}

//////////////////// user related code /////////////////////////////////////////





////////////////////////// Rating/Review related code /////////////////////


// CJ defined this function 2016-08-06
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

////////////////////////// order cart related code /////////////////////


// CJ defined this function 2016-08-06
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


// CJ defined this function 2016-08-26
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

// CJ defined this function 2016-09-18
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



////////////////////////// user personal info /////////////////////




// CJ defined this fucntion 2016-08-21
function validationUserChangePasswordInfoData(){
    var inValidDataCount = 0;
    if($('.editOldPasswordInputClass').length===1){
        if($('.editOldPasswordInputClass').val()===''
            || $('.editOldPasswordInputClass').val()===false){
            $('.editOldPasswordInputClass').css({'border-color':'#f18178'});
            inValidDataCount++;
        }else if($('.editOldPasswordInputClass').val()!==''){
            $('.editOldPasswordInputClass').css({'border-color':'#ccc'});
        }
    }
    if($('.editNewPasswordInputClass').length===1){
        if($('.editNewPasswordInputClass').val()===''){
            $('.editNewPasswordInputClass').css({'border-color':'#f18178'});
            inValidDataCount++;
        }else if($('.editNewPasswordInputClass').val()!==''){
            $('.editNewPasswordInputClass').css({'border-color':'#ccc'});
        }
    }
    if($('.editNewConfirmPasswordInputClass').length===1){
        if($('.editNewConfirmPasswordInputClass').val()===''){
            $('.editNewConfirmPasswordInputClass').css({'border-color':'#f18178'});
            inValidDataCount++;
        }else if($('.editNewConfirmPasswordInputClass').val()!==''){
            $('.editNewConfirmPasswordInputClass').css({'border-color':'#ccc'});
        }
    }
    if((($('.editNewPasswordInputClass').val())!==($('.editNewConfirmPasswordInputClass').val()))
        && $('.editNewPasswordInputClass').val()!=='' && $('.editNewPasswordInputClass').val()!==''){
        inValidDataCount++;
    }
    
    if(inValidDataCount>0){
        return false;
    }else{
        return true;
    }
}


//////////////// Sharing offers code ////////////////////////////////////


// CJ defined this function 2016-08-28
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
