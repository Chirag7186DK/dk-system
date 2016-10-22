
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('account-signup-signin');">
        
    <!-- my-account body content-->
    <div ng-controller="UsersController" ng-init="isUserAlreadySignedInAccountSection()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bodyDivClass">
        <!-- customer bread crumb -->
        <ul class="customerBreadcrumbULClass list-inline">
            <li class='customerBreadcrumbLIClass'>
                <a ui-sref="/">
                    Home
                </a>
            </li>
            <li class='customerBreadcrumbLIClass'>
                |
            </li>
            <li class='customerBreadcrumbLIClass'>
                Sign In / Sign Up
            </li>
        </ul>

        <!-- display sign-in section info -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInFormInfoWrapperDivClass">
            <!-- display sign-in form info -->
            <div ng-if="showAccountFormSectionName==='signInSection'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignInFormSectionContainerDivClass">
                <div ng-if="isShowUserSignInNoticeMsg==='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInNoticeMsgContainerDivClass">
                    {{userSignInNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 userSignInEmailContainerDivClass">
                    <input placeholder="Registered Email" type="text" id='userSignInEmailInputId' class="form-control userSignInEmailInputClass">
                    <p class="userSignInFormfieldHintPClass">
                        Eg: chirag.jain@gmail.com
                    </p>
                    <p class="userSignInEmailInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInpasswordContainerDivClass">
                    <input placeholder='Password' attach-validation-pwdinput-directive type="password" id='userSignInPwdInputId' class="form-control userSignInPwdInputClass">
                    <p class="userSignInFormfieldHintPClass">
                        Note: Password length must be between 5 to 10 alphanumeric characters only
                    </p>
                    <p class="userSignInPwdInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInOperationContainerDivClass">
                    <span ng-click="toggleAccountFormSectionName('frgtPwdStep1Section');">
                        Forgot Password / Create Password
                    </span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInBtnContainerDivClass">
                    <button ng-click="collectDataUserSignInAuthentication('signInSection')" class='btn userSigInSubmitBtnClass'>
                        <i class='fa fa-lock'></i> SIGN IN
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signUpSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignUpBtnContainerDivClass">
                    Not registered yet? Register here.
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 signInNoticesPolicyContainerDivClass">
                    By logging in, you agree to Desserts Khazana Terms of Service, Privacy Policy and Content Policies.
                </div>
            </div>
            <!-- sign-in text code form info -->
            <div ng-if="showAccountFormSectionName==='signInOtpSection'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignInFormSectionContainerDivClass">
                <div ng-if="isShowUserSignInOtpNoticeMsg==='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInNoticeOtpMsgContainerDivClass">
                    {{userSignInOtpNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInOtpCodeContainerDivClass">
                    <input placeholder='OTP' attach-validation-otpcodeinput-directive type="text" id='userSignInOtpCodeInputId' class="form-control userSignInOtpCodeInputClass">
                    <p class="userSignInOtpCodeInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInOperationContainerDivClass">
                    <span ng-click="resendOtpcodeClick('signInOtpSection');">Resend OTP</span> / <span>Forgot Password?</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpBtnContainerDivClass">
                    <button ng-click="collectDataUserSignInAuthentication('signInOtpSection')" class='btn userSignUpSubmitBtnClass'>
                        <i class='fa fa-lock'></i> CONTINUE
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signUpSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignUpBtnContainerDivClass">
                    Not registered yet? Register here.
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 signInNoticesPolicyContainerDivClass">
                    By logging in, you agree to Desserts Khazana Terms of Service, Privacy Policy and Content Policies.
                </div>
            </div>
        </div>

        <!-- display forgot password info section -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userForgotFormInfoWrapperDivClass">

            <!-- forgot password step1 info -->
            <div ng-if="showAccountFormSectionName==='frgtPwdStep1Section'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userFrgtPwdFormSectionContainerDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 frgtPwdHeaderSectionDivClass">
                    <h4 class='userFrgtPwdHeaderLblClass'>Forgot Password?</h4>
                    <p class='userFrgtPwdPLblClass'>
                       We will send One Time Password (OTP) to your registered email & mobile with us to reset your password. 
                    </p>
                </div>
                <div ng-if="isShowFrgtPwdNoticeMsgStepNo==='frgtPwdStep1'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdNoticeMsgContainerDivClass">
                    {{userFrgtPwdNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdEmailContainerDivClass">
                    <input placeholder='Registered Email' type="text" id='userFrgtPwdEmailInputId' class="form-control userFrgtPwdEmailInputClass">
                    <p class="userFrgtPwdFormfieldHintPClass">
                        Eg: chirag.jain@gmail.com
                    </p>
                    <p class="userFrgtPwdEmailInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdOperationBtnContainerDivClass">
                    <button ng-click="toggleAccountFormSectionName('signInSection')" class='btn userFrgtPwdCancelSubmitBtnClass'>
                        <i class='fa fa-remove'></i> CANCEL
                    </button>
                    <button ng-click="collectDataUserFrgtPwdAuthentication('frgtPwdStep1Section')" class='btn userFrgtPwdSubmitBtnClass'>
                        <i class='fa fa-key'></i> RESET PASSWORD
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signInSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignInBtnContainerDivClass">
                    Already have an account? SignIn here.
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 signInNoticesPolicyContainerDivClass">
                    By logging in, you agree to Desserts Khazana Terms of Service, Privacy Policy and Content Policies.
                </div>
            </div>

            <!-- forgot password step2 info -->
            <div ng-if="showAccountFormSectionName==='frgtPwdStep2Section'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userFrgtPwdFormSectionContainerDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 frgtPwdHeaderSectionDivClass">
                    <h4 class='userFrgtPwdHeaderLblClass'>Enter One Time Password</h4>
                </div>
                <div ng-if="isShowFrgtPwdNoticeMsgStepNo==='frgtPwdStep2'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdNoticeMsgContainerDivClass">
                    {{userFrgtPwdNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdOtpCodeContainerDivClass">
                    <input placeholder='OTP' attach-validation-otpcodeinput-directive type="text" id='userFrgtPwdOtpCodeInputId' class="form-control userFrgtPwdOtpCodeInputClass">
                    <p class="userFrgtPwdOtpCodeInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdOperationBtnContainerDivClass">
                    <button ng-click="resendOtpcodeClick('frgtPwdOtpSection');" class='btn userFrgtPwdResendOtpSubmitBtnClass'>
                        <i class='fa fa-remove'></i> RESEND OTP
                    </button>
                    <button ng-click="collectDataUserFrgtPwdAuthentication('frgtPwdStep2Section')" class='btn userFrgtPwdVerifyOtpSubmitBtnClass'>
                        <i class='fa fa-key'></i> VERIFY
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signInSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignInBtnContainerDivClass">
                    Already have an account? SignIn here.
                </div>
            </div>

            <!-- forgot password step3 info -->
            <div ng-if="showAccountFormSectionName==='frgtPwdStep3Section'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userFrgtPwdFormSectionContainerDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 frgtPwdHeaderSectionDivClass">
                    <h4 class='userFrgtPwdHeaderLblClass'>Repeat Password</h4>
                </div>
                <div ng-if="isShowFrgtPwdNoticeMsgStepNo==='frgtPwdStep3'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdNoticeMsgContainerDivClass">
                    {{userFrgtPwdNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFgrtPwdInputContainerDivClass">
                    <input placeholder='Create a new Password' attach-validation-pwdinput-directive type="password" id='userFrgtPwdInputId' class="form-control userFrgtPwdInputClass">
                    <p class="userFrgtPwdFormfieldHintPClass">
                        Note: Password length must be between 5 to 10 alphanumeric characters only
                    </p>
                    <p class="userFrgtPwdInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFgrtPwdConfirmInputContainerDivClass">
                    <input placeholder='Confirm Password' attach-validation-pwdinput-directive type="password" id='userFrgtPwdConfirmInputId' class="form-control userFrgtPwdConfirmInputClass">
                    <p class="userFrgtPwdFormfieldHintPClass">
                        Note: Password length must be between 5 to 10 alphanumeric characters only
                    </p>
                    <p class="userFrgtPwdConfirmInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdOperationBtnContainerDivClass">
                    <button ng-click="toggleAccountFormSectionName('signInSection')" class='btn userFrgtPwdCancelSubmitBtnClass'>
                        <i class='fa fa-remove'></i> CANCEL
                    </button>
                    <button ng-click="collectDataUserFrgtPwdAuthentication('frgtPwdStep3Section')" class='btn userFrgtPwdVerifyOtpSubmitBtnClass'>
                        <i class='fa fa-key'></i> UPDATE
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signInSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignInBtnContainerDivClass">
                    Already have an account? SignIn here.
                </div>
            </div>

            <!-- forgot password step4 info -->
            <div ng-if="showAccountFormSectionName==='frgtPwdStep4Section'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userFrgtPwdFormSectionContainerDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 frgtPwdHeaderSectionDivClass">
                    <h4 class='userFrgtPwdHeaderLblClass'>Repeat Password</h4>
                </div>
                <div ng-if="isShowFrgtPwdNoticeMsgStepNo==='frgtPwdStep4'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userFrgtPwdNoticeMsgContainerDivClass">
                    Congratulations Your password is updated. You will be redirected back in 15 seconds.
                </div>
                <div ng-click="toggleAccountFormSectionName('signInSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignInBtnContainerDivClass">
                    Now SignIn here.
                </div>
            </div>

        </div>

        <!-- display sign-up info section -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpFormInfoWrapperDivClass">
            <!-- sign-up form info -->
            <div ng-if="showAccountFormSectionName==='signUpSection'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignUpFormSectionContainerDivClass">
                <div ng-if="isShowUserSignUpNoticeMsg==='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpNoticeMsgContainerDivClass">
                    {{userSignUpNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpNameContainerDivClass">
                    <input placeholder='Full Name' attach-validation-nameinput-directive type="text" id='userSignUpNameInputId' class="form-control userSignUpNameInputClass">
                    <p class="userSignUpFormfieldHintPClass">
                        Eg: Chirag Jain, Mahesh Gupta, Rahul G
                    </p>
                    <p class="userSignUpNameInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpEmailContainerDivClass">
                    <input placeholder='Email' type="text" id='userSignUpEmailInputId' class="form-control userSignUpEmailInputClass">
                    <p class="userSignUpFormfieldHintPClass">
                        Eg: chirag.jain@gmail.com
                    </p>
                    <p class="userSignUpEmailInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpMobileContainerDivClass">
                    <input placeholder='Mobile' attach-validation-mobileinput-directive type="text" id='userSignUpMobileInputId' class="form-control userSignUpMobileInputClass">
                    <p class="userSignUpFormfieldHintPClass">
                        Eg: 9975967186
                    </p>
                    <p class="userSignUpMobileInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpBtnContainerDivClass">
                    <button ng-click="collectDataUserSignUpAuthentication('signUpSection')" class='btn userSignUpSubmitBtnClass' id='userSignUpSubmitBtnId'>
                        <i class='fa fa-lock'></i> SIGN UP
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signInSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignInBtnContainerDivClass">
                    Already have an account? SignIn here.
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 signUpNoticesPolicyContainerDivClass">
                    By creating an account, you agree to Desserts Khazana Terms of Service, Privacy Policy and Content Policies.
                </div>
            </div>
            <!-- sign-up text code form info -->
            <div ng-if="showAccountFormSectionName==='signUpOtpSection'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignUpFormSectionContainerDivClass">
                <div ng-if="isShowUserSignUpOtpNoticeMsg==='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpNoticeOtpMsgContainerDivClass">
                    {{userSignUpOtpNoticeMsgStr}}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpOtpCodeContainerDivClass">
                    <input placeholder='OTP' attach-validation-otpcodeinput-directive type="text" id='userSignUpOtpCodeInputId' class="form-control userSignUpOtpCodeInputClass">
                    <p class="userSignUpOtpCodeInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpPwdContainerDivClass">
                    <input placeholder='Password' attach-validation-pwdinput-directive type="password" id='userSignUpPwdInputId' class="form-control userSignUpPwdInputClass">
                    <p class="userSignUpFormfieldHintPClass">
                        Note: Password length must be between 5 to 10 alphanumeric characters only
                    </p>
                    <p class="userSignUpPwdInput_ErrorClass"></p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpOperationContainerDivClass">
                    <span ng-click="resendOtpcodeClick('signUpOtpSection');">Resend OTP</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpBtnContainerDivClass">
                    <button ng-click="collectDataUserSignUpAuthentication('signUpOtpSection')" class='btn userSignUpSubmitBtnClass'>
                        <i class='fa fa-lock'></i> CONTINUE
                    </button>
                </div>
                <div ng-click="toggleAccountFormSectionName('signInSection')" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 redirectUserSignInBtnContainerDivClass">
                    Already have an account? SignIn here.
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 signUpNoticesPolicyContainerDivClass">
                    By creating an account, you agree to Desserts Khazana Terms of Service, Privacy Policy and Content Policies.
                </div>
            </div>
        </div>

    </div>    
    
    <!-- refresh web application data -->
    <div id='refreshUserWebAppDataDivId' ng-init="CommonServicesObj.refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
    
</div>