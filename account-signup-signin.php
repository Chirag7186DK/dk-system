
<?php
    include "Site_config.inc.php";
?>

<!DOCTYPE html>
<html lang="en" ng-app='DKAPP'>

    <!-- head section start here -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title><?php echo $SiteTitle; ?></title>
        <link rel="shortcut icon" href="images/dk/dklogo/fevicon.ico">
        <style>
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak{
                display:none!important;
            }
        </style>
    </head>

    <!-- body start here -->

    <body ng-cloak class="ng-cloak onBodyScrollClass" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('accountSignUpSignIn'); checkInBackgroundDataAvailableForUpdationFromSession('accountSignUpSignIn');">

        <!-- first header -->
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 fHeaderContainerDivClass {{stickNtStickWebAppHeaderClass}}">
            <!-- web log --->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 webAppLogoAndMenuIconContainerDivClass">
                <h1 class='webLogoHClass'>
                    <img class='dkLogoImgClass' src="#" load-dklogo-images-directive>
                </h1>
            </div>
            <!-- top menu bar -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeader_topMenuBarContainerDivClass">
                <ul class="topMenuBarULClass list-inline">
                    <li title="Click here to contact us">
                        <i class="fa fa-comment-o fa-flip-horizontal"></i> Care
                    </li>
                    <li ng-if="selectedDeliveryAreaTextHeader!==''" notifyuser-selected-deliveryarea-textheader-directive class="selectedDeliveryAreaTextHeaderLIClass">
                        <i class="fa fa-map-marker"></i> At: {{selectedDeliveryAreaTextHeader}}
                    </li>
                    <li title="Click here to view your current order cart all item(s)">
                        <i class="fa fa-shopping-basket"></i> (Item: {{ordercartItemRequestedCount}}, Rs: {{subtotalOrderAmt}})
                    </li>
                </ul>
            </div>
        </div>

        <!-- header row border div class -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeaderRowBorderDivClass"></div>

        <!-- my-account body content-->
        <div ng-controller="UsersController" ng-init="isUserAlreadySignedInAccountSection()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bodyDivClass">
            
            <!-- customer bread crumb -->
            <ul class="customerBreadcrumbULClass list-inline">
                <li class='customerBreadcrumbLIClass'>
                    <a href="<?php echo $BaseSitePath;?>">
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
                <div ng-if="showAccountFormSectionName=='signInSection'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignInFormSectionContainerDivClass">
                    <div ng-if="isShowUserSignInNoticeMsg=='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInNoticeMsgContainerDivClass">
                        {{userSignInNoticeMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 userSignInEmailContainerDivClass">
                        <input placeholder="Registered Email" type="text" id='userSignInEmailInputId' class="form-control userSignInEmailInputClass">
                        <p class="userSignInFormfieldHintPClass">
                            Eg: chirag.jain@gmail.com, chirag.jain@rediffmail.com
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
                <div ng-if="showAccountFormSectionName=='signInOtpSection'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignInFormSectionContainerDivClass">
                    <div ng-if="isShowUserSignInOtpNoticeMsg=='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInNoticeOtpMsgContainerDivClass">
                        {{userSignInOtpNoticeMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignInOtpCodeContainerDivClass">
                        <input placeholder='OTP' attach-validation-otpcodeinput-directive type="text" id='userSignInOtpCodeInputId' class="form-control userSignInOtpCodeInputClass">
                        <p class="userSignInOtpCodeInput_ErrorClass"></p>
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
            
            <!-- display sign-up info section -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpFormInfoWrapperDivClass">
                <!-- sign-up form info -->
                <div ng-if="showAccountFormSectionName=='signUpSection'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignUpFormSectionContainerDivClass">
                    <div ng-if="isShowUserSignUpNoticeMsg=='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpNoticeMsgContainerDivClass">
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
                            Eg: chirag.jain@gmail.com, chirag.jain@rediffmail.com
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
                <div ng-if="showAccountFormSectionName=='signUpOtpSection'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 userSignUpFormSectionContainerDivClass">
                    <div ng-if="isShowUserSignUpOtpNoticeMsg=='TRUE'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 userSignUpNoticeOtpMsgContainerDivClass">
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
        
        <!-- logged authenticated user web application data refresh -->
        <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>

    </body>

</html>


