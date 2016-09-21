
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
        <div ng-controller="UsersController" ng-init="isUserAlreadySignedInAccountSection()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_bodyDivClass">
            
            <!-- customer bread crumb -->
            <div customer-breadcrumb-directive class="col-xs-12 col-sm-12 col-md-12 col-lg-12 customerBreadcrumbDivClass">
                <ul class="customerBreadcrumbULClass list-inline">
                    <li class='customerBreadcrumbLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            {{customerBreadCrumbOnWebApp.homeTitle}}
                        </a>
                    </li>
                    <li class='customerBreadcrumbLIClass'>
                        |
                    </li>
                    <li class='customerBreadcrumbLIClass'>
                        Sign In / Sign Up
                    </li>
                </ul>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
        
            <!-- display sign-in section info -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInFormInfoWrapperDivClass">
                <!-- display sign-in form info -->
                <div ng-if="displaySignInSignUpSectionAccountName=='signIn'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 ma_userSignInformContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 ma_userSignInEmailContainerDivClass">
                        <p class="ma_userSignInFormfieldLabelPClass">
                            <i class="ma_userSigInFormfieldiconclass fa fa-envelope faa-tada animated"></i> Email-Id
                        </p>
                        <input type="text" id='ma_userSignInEmailInputId' class="form-control ma_userSignInEmailInputClass">
                        <p class="ma_userSignInFormfieldHintPClass">
                            Eg: 9975967186, 9975909090
                        </p>
                        <p class="ma_userSignInEmailInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInpasswordContainerDivClass">
                        <p class="ma_userSignInFormfieldLabelPClass">
                            <i class="ma_userSigInFormfieldiconclass fa fa-key faa-tada animated"></i> Password
                        </p>
                        <input type="password" id='ma_userSignInPasswordInputId' class="form-control ma_userSignInPasswordInputClass">
                        <p class="ma_userSignInFormfieldHintPClass">
                            Eg: 23Sddd
                        </p>
                        <p class="ma_userSignInPasswordInput_ErrorClass"></p>
                    </div>
                    <div ng-show="isShowUserSignInFormContentErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInErrorMsgContainerDivClass">
                        {{userSignInFormContentErrorMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInBtnContainerDivClass">
                        <button ng-click="collectDataUserSignInAuthentication()" class='btn ma_userSigInSubmtBtnClass'>
                            <i class='fa fa-lock'></i> SIGN IN
                        </button>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInBorderDivClass">
                        <span>New to Desserts Khazana ?</span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_redirectForUserSignUpBtnContainerDivClass">
                        <button ng-click="resetSignUpSignInAccountSection('signUp')" class='btn ma_redirectForUserSignUpBtnClass'>
                            Signup with Desserts Khazana
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- display sign-up info section -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpFormInfoWrapperDivClass">
                <!-- sign-up form info -->
                <div ng-if="displaySignInSignUpSectionAccountName=='signUp'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 ma_userSignUpformContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpNameContainerDivClass">
                        <p class="ma_userSignUpFormfieldLabelPClass">
                            <i class="ma_userSignUpFormfieldiconclass fa fa-user faa-tada animated"></i> Name
                        </p>
                        <input attach-validation-nameinput-directive type="text" id='ma_userSignUpNameInputId' class="form-control ma_userSignUpNameInputName">
                        <p class="ma_userSignUpFormfieldHintPClass">
                            Eg: Chirag Jain, Mahesh Gupta, Rahul G
                        </p>
                        <p class="ma_userSignUpNameInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpEmailContainerDivClass">
                        <p class="ma_userSignUpFormfieldLabelPClass">
                            <i class="ma_userSignUpFormfieldiconclass fa fa-envelope faa-tada animated"></i> Email-Id
                        </p>
                        <input type="text" id='ma_userSignUpEmailInputId' class="form-control ma_userSignUpEmailInputClass">
                        <p class="ma_userSignUpFormfieldHintPClass">
                            Eg: chirag.jain@gmail.com
                        </p>
                        <p class="ma_userSignUpEmailInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpMobileContainerDivClass">
                        <p class="ma_userSignUpFormfieldLabelPClass">
                            <i class="ma_userSignUpFormfieldiconclass fa fa-mobile faa-tada animated"></i> Mobile
                        </p>
                        <input attachvalidation-mobileinput-directive type="text" id='ma_userSignUpMobileInputId' class="form-control ma_userSignUpMobileInputClass">
                        <p class="ma_userSignUpFormfieldHintPClass">
                            Eg: 9975967186
                        </p>
                        <p class="ma_userSignUpMobileInput_ErrorClass"></p>
                    </div>
                    <div ng-show="isShowUserSignUpFormContentErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInErrorMsgContainerDivClass">
                        {{userSignUpFormContentErrorMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpBtnContainerDivClass">
                        <button ng-click="collectDataUserSignUpAuthentication()" class='btn ma_userSignUpSubmitBtnClass' id='ma_userSignUpSubmitBtnId'>
                            <i class='fa fa-lock'></i> SIGN UP
                        </button>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpBorderDivClass">
                        <span>Already have an account ?</span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_redirectForUserSignUpBtnContainerDivClass">
                        <button ng-click="resetSignUpSignInAccountSection('signIn')" class='btn ma_redirectForUserSignInBtnClass' id='ma_redirectForUserSignInBtnId'>
                            Sigin with Desserts Khazana
                        </button>
                    </div>
                </div>
                
                <!-- sign-up text code form info -->
                <div ng-if="displaySignInSignUpSectionAccountName=='otpCode'" class="col-xs-12 col-sm-12 col-sm-6 col-lg-6 col-md-offset-3 col-lg-offset-3 ma_userSignUpformContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpOtpCodeContainerDivClass">
                        <p class="ma_userSignUpFormfieldLabelPClass">
                            <i class="ma_userSignUpFormfieldiconclass fa fa-mobile faa-tada animated"></i> OTP Code
                        </p>
                        <input type="text" id='ma_userSignUpOtpCodeInputId' class="form-control ma_userSignUpOtpCodeInputClass">
                        <p class="ma_userSignUpFormfieldHintPClass">
                            Eg: 23Sddd
                        </p>
                        <p class="ma_userSignUpOtpCodeInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpPasswordContainerDivClass">
                        <p class="ma_userSignUpFormfieldLabelPClass">
                            <i class="ma_userSignUpFormfieldiconclass fa fa-key faa-tada animated"></i> Password
                        </p>
                        <input type="password" id='ma_userSignUpPasswordInputId' class="form-control ma_userSignUpPasswordInputClass">
                        <p class="ma_userSignUpFormfieldHintPClass">
                            Eg: 23Sddd
                        </p>
                        <p class="ma_userSignUpPasswordInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpBtnContainerDivClass">
                        <button ng-click="collectDataUserSignUpAuthentication()" class='btn ma_userSignUpSubmitBtnClass'>
                            <i class='fa fa-lock'></i> SIGN UP
                        </button>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignUpBorderDivClass">
                        <span>Already have an account ?</span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_redirectForUserSignUpBtnContainerDivClass">
                        <button ng-click="resetSignUpSignInAccountSection('signIn')" class='btn ma_redirectForUserSignInBtnClass'>
                            Sigin with Desserts Khazana
                        </button>
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


