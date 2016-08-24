
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
}

// CJ defined this function 2016-07-20
function validateParamDataPartyOrderRequest(){
    // checking session param
    var blankFieldValueCount = 0 ;
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('partyOrder')===true){
            // extract party order param obj
            var partyOrderParamObj = dkParamObj['partyOrder'];
            if(partyOrderParamObj.hasOwnProperty('title')!==''){
                // check form field is blank or not for party order request
                if($('#po_occasionTitleInputId').length===1){
                    if($('#po_occasionTitleInputId').val()===''){
                        $('#po_occasionTitleInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#po_occasionTitleInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#po_nosPeopleInputId').length===1){
                    if($('#po_nosPeopleInputId').val()===''){
                        $('#po_nosPeopleInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#po_nosPeopleInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#po_dateInputId').length===1){
                    if($('#po_dateInputId').val()===''){
                        $('#po_dateInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#po_dateInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#po_venueInputId').length===1){
                    if($('#po_venueInputId').val()===''){
                        $('#po_venueInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#po_venueInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#po_messageInputId').length===1){
                    if($('#po_messageInputId').val()===''){
                        $('#po_messageInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#po_messageInputId').css({'border-color':'#ccc'});
                    }
                }
            }
        }
    }
    if(blankFieldValueCount>0){
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
        $('#po_dateInputId').datepicker({
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
}


// CJ defined this function 2016-07-20
function validateParamDataCustomizeOrderRequest(){
    // checking session param
    var blankFieldValueCount = 0 ;
    if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
        && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false)){
        // extract dk param session data
        var dkParamObj = $.parseJSON(sessionStorage.getItem('DKPARAMOBJ'));
        if(dkParamObj.hasOwnProperty('customizeOrder')===true){
            // extract customize order param obj
            var partyOrderParamObj = dkParamObj['customizeOrder'];
            if(partyOrderParamObj.hasOwnProperty('title')!==''){
                // check form field is blank or not for party order request
                if($('#co_occasionTitleInputId').length===1){
                    if($('#co_occasionTitleInputId').val()===''){
                        $('#co_occasionTitleInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#co_occasionTitleInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#co_nosPeopleInputId').length===1){
                    if($('#co_nosPeopleInputId').val()===''){
                        $('#co_nosPeopleInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#co_nosPeopleInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#co_dateInputId').length===1){
                    if($('#co_dateInputId').val()===''){
                        $('#co_dateInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#co_dateInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#co_venueInputId').length===1){
                    if($('#co_venueInputId').val()===''){
                        $('#co_venueInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#co_venueInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#co_messageInputId').length===1){
                    if($('#co_messageInputId').val()===''){
                        $('#co_messageInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#co_messageInputId').css({'border-color':'#ccc'});
                    }
                }
            }
        }
    }
    if(blankFieldValueCount>0){
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
    var blankFieldValueCount = 0 ;
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
                        blankFieldValueCount++;
                    }
                }
                if($('#ct_contactPersonNameInputId').length===1){
                    if($('#ct_contactPersonNameInputId').val()===''){
                        blankFieldValueCount++;
                    }
                }
                if($('#ct_contactMobileInputId').length===1){
                    if($('#ct_contactMobileInputId').val()===''){
                        $('#ct_contactMobileInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
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
                        blankFieldValueCount++;
                    }else if($('#ct_contactEmailInputId').val()!==''){
                        var enteredEmailId = removeHtmlStripTagsOfContent($('#ct_contactEmailInputId').val());
                        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if(!enteredEmailId.match(emailPattern)){
                            $('#ct_contactEmailInputId').css({'border-color':'#f18178'});
                            blankFieldValueCount++;
                        }else{
                            $('#ct_contactEmailInputId').css({'border-color':'#ccc'});
                        }
                    }
                }
                if($('#ct_nosPeopleInputId').length===1){
                    if($('#ct_nosPeopleInputId').val()===''){
                        $('#ct_nosPeopleInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#ct_nosPeopleInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#ct_venueInputId').length===1){
                    if($('#ct_venueInputId').val()===''){
                        $('#ct_venueInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#ct_venueInputId').css({'border-color':'#ccc'});
                    }
                }
                if($('#ct_messageInputId').length===1){
                    if($('#ct_messageInputId').val()===''){
                        $('#ct_messageInputId').css({'border-color':'#f18178'});
                        blankFieldValueCount++;
                    }else{
                        $('#ct_messageInputId').css({'border-color':'#ccc'});
                    }
                }
            }
        }
    }
    if(blankFieldValueCount>0){
        return false;
    }else{
        return true;
    }
}

//////////////////// user related code /////////////////////////////////////////

// CJ defined this fucntion 2016-08-01
function attachedFieldValidationUserSignInFormContent(){
    if($('#ma_userSignInMobileInputId').length===1){
        $('#ma_userSignInMobileInputId').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"10", 
                "allowDecSep":false
            }
        );
        // CJ added code here 2016-07-27
        $('#ma_userSignInMobileInputId').bind("keypress keydown keyup change paste", function(e){
            try{
                var currentTextVal = removeHtmlStripTagsOfContent($(this).val());
                if(currentTextVal!=='' && currentTextVal!==undefined && currentTextVal!==false){
                    if(currentTextVal.charAt(0)<=5){
                        $(this).val('');
                    }
                }
            }catch(ex){
                $(this).val('');
            }
        });
    }
}


// CJ defined this function 2016-08-01
function validateDataUserSignInAuthentication(){
    var blankFieldValueCount = 0;
    if($('#ma_userSignInMobileInputId').length===1){
        if($('#ma_userSignInMobileInputId').val()===''
            || $('#ma_userSignInMobileInputId').val()===false){
            $('#ma_userSignInMobileInputId').css({'border-color':'#f18178'});
            $('.ma_userSignInMobileInput_ErrorClass').empty().append("Please enter 10 digits registered mobile no.s !");
            $('.ma_userSignInMobileInput_ErrorClass').css({'border-color':'#f18178'});
            blankFieldValueCount++;
        }else if($('#ma_userSignInMobileInputId').val()!==''){
            var enterMobileNo = removeHtmlStripTagsOfContent($('#ma_userSignInMobileInputId').val());
            var mobilePattern = /^[6-9]\d{9}$/g;
            if(!enterMobileNo.match(mobilePattern) && (enterMobileNo).length!==10){
                $('#ma_userSignInMobileInputId').css({'border-color':'#f18178'});
                $('.ma_userSignInMobileInput_ErrorClass').empty().append("Please enter valid 10 digits registered mobile no.s !");
                $('.ma_userSignInMobileInput_ErrorClass').css({'color':'#f18178'});
                blankFieldValueCount++;
            }else if(enterMobileNo.match(mobilePattern)===true && (enterMobileNo).length===10){
                $('#ma_userSignInMobileInputId').css({'color':'#ccc'});
                $('.ma_userSignInMobileInput_ErrorClass').empty();
            }
        }
    }
    if($('#ma_userSignInPasswordInputId').length===1){
        if($('#ma_userSignInPasswordInputId').val()==='' 
            || $('#ma_userSignInPasswordInputId').val()===false){
            $('#ma_userSignInPasswordInputId').css({'border-color':'#f18178'});
            $('.ma_userSignInPasswordInput_ErrorClass').empty().append("Please enter password !");
            $('.ma_userSignInPasswordInput_ErrorClass').css({'color':'#f18178'});
            blankFieldValueCount++;
        }else{
            $('#ma_userSignInPasswordInputId').css({'border-color':'#ccc'});
            $('.ma_userSignInPasswordInput_ErrorClass').empty();
        }
    }
    if(blankFieldValueCount>0){
        return false;
    }else{
        return true;
    }
}


//////////////////// wishlist related validation code //////////////////////////////

// CJ defined this function 2016-08-01
function attachedFieldValidationWLCreation(){
    if($('#cwl_titleInputId').length===1){
        $('#cwl_titleInputId').alphanum(
            {
                "disallow":".", 
                "allowNumeric":true, 
                "allowSpace":true
            }
        );
    }
}

// CJ defined this function 2016-07-30
function validateDataUWLCreation(){
    var blankFieldValueCount = 0 ;
    if($('#cwl_titleInputId').length===1){
        if($('#cwl_titleInputId').val()===''
            || $('#cwl_titleInputId').val()===false){
            $('#cwl_titleInputId').css({'border-color':'#f18178'});
            $('.cwl_titleInput_ErrorClass').empty().append();
            blankFieldValueCount++;
        }else{
            $('#cwl_titleInputId').css({'border-color':'#ccc'});
            $('.cwl_titleInput_ErrorClass').empty();
        }
    }
    if(blankFieldValueCount>0){
        return false;
    }else{
        return true;
    }
}

// CJ defined this function 2016-08-02
function validateDataUWLUpdation(fcClass){
    var blankFieldValueCount = 0 ;
    if($('.'+fcClass).length===1){
        if($('.'+fcClass).find('input.wls_wishListTitleInputClass').length===1){
            var inputVal = removeHtmlStripTagsOfContent($('.'+fcClass).find('.wls_wishListTitleInputClass').val());
            if(inputVal==='' || inputVal===false){
                $('.'+fcClass).find('input.wls_wishListTitleInputClass').css({'border-color':'#f18178'});
                $('.'+fcClass).find('input.wld_wlTitleContainer_ErrorClass').empty().append("Please enter your wish list title !");
                blankFieldValueCount++;
            }else{
                $('.'+fcClass).find('input.wls_wishListTitleInputClass').css({'border-color':'#ccc'});
                $('.'+fcClass).find('input.wld_wlTitleContainer_ErrorClass').empty();
            }
        }
    }
    if(blankFieldValueCount>0){
        return false;
    }else{
        return true;
    }
}

////////////////////////// Rating/Review related code /////////////////////


// CJ defined this function 2016-08-06
function validateUserRatingReviewAbtProduct(fcClass){
    var blankFieldValueCount = 0 ;
    if($('.'+fcClass).length===1){
        if($('.'+fcClass).find('textarea').length===1){
            var userCommentRatingReviewAbtProduct = removeHtmlStripTagsOfContent($('.'+fcClass).find('textarea').val());
            if(userCommentRatingReviewAbtProduct==='' 
                || userCommentRatingReviewAbtProduct===false
                || userCommentRatingReviewAbtProduct===undefined){
                $('.'+fcClass).find('textarea').css({'border-color':'#f18178'});
                blankFieldValueCount++;
            }else{
                $('.'+fcClass).find('textarea').css({'border-color':'#ccc'});
            }
        }
    }
    if(blankFieldValueCount>0){
        return false;
    }else{
        return true;
    }
}

////////////////////////// product related code /////////////////////


// CJ defined this function 2016-08-06
function validateProductDataToAddInOrdercart(fcClass){
    var blankFieldValueCount = 0 ;
    if(fcClass!==false && fcClass!=='' && fcClass!==undefined){
        if($('.'+fcClass).length===1){
            if($('.'+fcClass).find('textarea').length===1){
                var userMsgOnProduct = removeHtmlStripTagsOfContent($('.'+fcClass).find('textarea').val());
                if(userMsgOnProduct==='' || userMsgOnProduct===false || userMsgOnProduct===undefined){
                    $('.'+fcClass).find('textarea').css({'border-color':'#f18178'});
                    blankFieldValueCount++;
                }else{
                    $('.'+fcClass).find('textarea').css({'border-color':'#ccc'});
                }
            }
            if($('.'+fcClass).find("input[type='text']").length===1){
                var userProductQty = removeHtmlStripTagsOfContent($('.'+fcClass).find("input[type='text']").val());
                if(userProductQty==='' || userProductQty===false || userProductQty===undefined || parseInt(userProductQty)<0){
                    $('.'+fcClass).find("input[type='text']").css({'border-color':'#f18178'});
                    blankFieldValueCount++;
                }else{
                    $('.'+fcClass).find("input[type='text']").css({'border-color':'#ccc'});
                }
            }
        }
    }
    if(blankFieldValueCount>0){
        return false;
    }else{
        return true;
    }
}

////////////////////////// user personal info /////////////////////


// CJ defined this fucntion 2016-08-21
function attachedFieldValidationUserProfileInfo(){
    if($('.editUsernameInputClass').length===1){
        $('.editUsernameInputClass').alphanum(
            {
                "disallow":".", 
                "allowNumeric":false, 
                "allowSpace":true
            }
        );
    }
    if($('.editUsermobileInputClass').length===1){
        $('.editUsermobileInputClass').numeric(
            {
                "allowMinus":false, 
                "allowThouSep":false, 
                "allowLeadingSpaces":false, 
                "maxDigits":"10", 
                "allowDecSep":false
            }
        );
        // CJ added code here 2016-08-21
        $('.editUsermobileInputClass').bind("keypress keydown keyup change paste", function(e){
            try{
                var currentTextVal = removeHtmlStripTagsOfContent($(this).val());
                if(currentTextVal!=='' && currentTextVal!==undefined && currentTextVal!==false){
                    if(currentTextVal.charAt(0)<=5){
                        $(this).val('');
                    }
                }
            }catch(ex){
                $(this).val('');
            }
        });
    }
    if($('.editUseremailInputClass').length===1){
        $('.editUseremailInputClass').bind("keypress keydown keyup change paste", function(e){
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
                $(this).val('');
            }
        });
    }
    if($('.editUserbirthdateInputClass').length===1){
        var cdate = new Date();
        $('.editUserbirthdateInputClass').datepicker({
            maxDate:cdate,
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        });
    }
}

// CJ defined this fucntion 2016-08-21
function validationUserProfileInfoData(){
    var incorrectFieldDataCounter = 0;
    if($('.editUsernameInputClass').length===1){
        if($('.editUsernameInputClass').val()===''
            || $('.editUsernameInputClass').val()===false){
            $('.editUsernameInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editUsernameInputClass').val()!==''){
            $('.editUsernameInputClass').css({'border-color':'#ccc'});
        }
    }
    if($('.editUseremailInputClass').length===1){
        if($('.editUseremailInputClass').val()===''){
            $('.editUseremailInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editUseremailInputClass').val()!==''){
            var enteredEmailId = removeHtmlStripTagsOfContent($('.editUseremailInputClass').val());
            var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!enteredEmailId.match(emailPattern)){
                $('.editUseremailInputClass').css({'border-color':'#f18178'});
                incorrectFieldDataCounter++;
            }else{
                $('.editUseremailInputClass').css({'border-color':'#ccc'});
            }
        }
    }
    if($('.editUsermobileInputClass').length===1){
        if($('.editUsermobileInputClass').val()===''
            || $('.editUsermobileInputClass').val()===false){
            $('.editUsermobileInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editUsermobileInputClass').val()!==''){
            var enterMobileNo = removeHtmlStripTagsOfContent($('.editUsermobileInputClass').val());
            var mobilePattern = /^[6-9]\d{9}$/g;
            if(!enterMobileNo.match(mobilePattern) && (enterMobileNo).length!==10){
                $('.editUsermobileInputClass').css({'border-color':'#f18178'});
                incorrectFieldDataCounter++;
            }else if(enterMobileNo.match(mobilePattern)===true && (enterMobileNo).length===10){
                $('.editUsermobileInputClass').css({'border-color':'#ccc'});
            }
        }
    }
    if($('.editUserbirthdateInputClass').length===1){
        if($('.editUserbirthdateInputClass').val()===''
            || $('.editUserbirthdateInputClass').val()===false){
            $('.editUserbirthdateInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editUserbirthdateInputClass').val()!==''){
            $('.editUserbirthdateInputClass').css({'border-color':'#ccc'});
        }
    }
    if(incorrectFieldDataCounter>0){
        return false;
    }else{
        return true;
    }
}


// CJ defined this fucntion 2016-08-21
function validationUserChangePasswordInfoData(){
    var incorrectFieldDataCounter = 0;
    if($('.editOldPasswordInputClass').length===1){
        if($('.editOldPasswordInputClass').val()===''
            || $('.editOldPasswordInputClass').val()===false){
            $('.editOldPasswordInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editOldPasswordInputClass').val()!==''){
            $('.editOldPasswordInputClass').css({'border-color':'#ccc'});
        }
    }
    if($('.editNewPasswordInputClass').length===1){
        if($('.editNewPasswordInputClass').val()===''){
            $('.editNewPasswordInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editNewPasswordInputClass').val()!==''){
            $('.editNewPasswordInputClass').css({'border-color':'#ccc'});
        }
    }
    if($('.editNewConfirmPasswordInputClass').length===1){
        if($('.editNewConfirmPasswordInputClass').val()===''){
            $('.editNewConfirmPasswordInputClass').css({'border-color':'#f18178'});
            incorrectFieldDataCounter++;
        }else if($('.editNewConfirmPasswordInputClass').val()!==''){
            $('.editNewConfirmPasswordInputClass').css({'border-color':'#ccc'});
        }
    }
    if((($('.editNewPasswordInputClass').val())!==($('.editNewConfirmPasswordInputClass').val()))
        && $('.editNewPasswordInputClass').val()!=='' && $('.editNewPasswordInputClass').val()!==''){
        incorrectFieldDataCounter++;
    }
    
    if(incorrectFieldDataCounter>0){
        return false;
    }else{
        return true;
    }
}
