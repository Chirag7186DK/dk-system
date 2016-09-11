
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
                    <li notifyuser-selected-deliveryarea-textheader-directive class="selectedDeliveryAreaTextHeaderLIClass" title="Click here to change delivery location">
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
        <div ng-controller="UsersController" ng-init="isEnableAccountSignUpSignIn()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_bodyDivClass">
            
            <!-- customer bread crumb -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userBreadcrumbDivClass">
                <ul class="ma_userBreadcrumbULClass list-inline">
                    <li class='wl_userBreadcrumbHomeTitleLIClass'>
                        <a href="<?php echo $BaseSitePath; ?>">
                            Home
                        </a>
                    </li>
                    <li class='ma_userBreadcrumbMyAccountTitleLIClass'>
                        |&nbsp; Log In / Sign Up
                    </li>
                </ul>
            </div>
          
            <!-- display customer sign-in form info -->
            <div ng-hide="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInFormInfoWrapperDivClass">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 ma_userSignInformContentWrappperContainerDivClass">
                    <!-- sign-in form content -->
                    <p class="ma_userSignInformHeaderPClass">
                        <i class="fa fa-sign-in wl_userSignInIconClass"></i> Please fill-up form to sign-in with desserts khazana account
                    </p>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInMobileContainerDivClass">
                        <p class="ma_userSignInFormfieldLabelPClass">
                            <i class="ma_userSigInFormfieldiconclass fa fa-phone faa-tada animated"></i>Type Mobile
                        </p>
                        <input autocomplete="on" type="text" id='ma_userSignInMobileInputId' class="form-control ma_userSignInMobileInputClass">
                        <p class="ma_userSignInFormfieldHintPClass">
                            Eg: 9975967186, 9975909090
                        </p>
                        <p class="ma_userSignInMobileInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInpasswordContainerDivClass">
                        <p class="ma_userSignInFormfieldLabelPClass">
                            <i class="ma_userSigInFormfieldiconclass fa fa-key faa-tada animated"></i> Type password
                        </p>
                        <input autocomplete="on" type="password" id='ma_userSignInPasswordInputId' class="form-control ma_userSignInPasswordInputClass">
                        <p class="ma_userSignInFormfieldHintPClass">
                            Eg: 23Sddd
                        </p>
                        <p class="ma_userSignInPasswordInput_ErrorClass"></p>
                    </div>
                    <div ng-show="isShowUserSignInFormContentErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInErrorMsgContainerDivClass">
                        {{userSignInFormContentErrorMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInBtnContainerDivClass">
                        <button ng-click="collectDataUserSignInAuthentication()" class='btn ma_userSigInSubmtBtnClass' id='ma_userSigInSubmtBtnId'>
                            <i class='fa fa-key'></i> SIGN IN
                        </button>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userSignInBorderDivClass">
                        <span>New to Desserts Khazana ?</span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_redirectForUserSignUpBtnContainerDivClass">
                        <button ng-click="toggleWishListUserSignUpFormContent()" class='btn ma_redirectForUserSignUpBtnClass' id='ma_redirectForUserSignUpBtnId'>
                            Signup for Desserts Khazana account
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


