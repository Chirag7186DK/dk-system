
<?php 
    include "Site_config.inc.php"; 
?>

<!DOCTYPE html>
<html lang="en" ng-app='DKAPP'>
    
    <!-- head section start here -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title><?php echo $SiteTitle;?></title>
        <link rel="shortcut icon" href="images/dk/dklogo/fevicon.ico">
        <style>
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak{
                display:none!important;
            }
        </style>
    </head>

    <!-- body start here -->
    
    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='intializeDkController' ng-init="checkLoadedDefaultDataInDkSessionStorage('customizeorders')">
        
        <!-- common SCROLL TOP BUTTON -->
        <a class="scrollToTopBtnClass" ng-show="isShowScrollToTopBtnWebAppPage" href="#" title='Click to scroll up page'>
            <i class="fa fa-angle-up"></i>
        </a>
        <!-- END SCROLL TOP BUTTON -->
        
        <!-- first header -->
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 fHeaderContainerDivClass {{stickNtStickWebAppHeaderClass}}">
            <!-- webAppLogoAndMenuIconContainerDivClass --->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 webAppLogoAndMenuIconContainerDivClass">
                <h1 class='webLogoHClass'>
                    <img class='dkLogoImgClass' src="#" load-dklogo-images-directive>
                </h1>
            </div>
            <!-- top menu bar -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeader_topMenuBarContainerDivClass">
                <ul class="topMenuBarULClass list-inline">
                    <li ng-click="redirectToViewWishList('wishlist')" ng-controller="WishListController" title="Click here to see your wish list">
                        <i class="fa fa-heart"></i> Wishlist ({{wlmCount}})
                    </li>
                    <li title="Click here to show offers">
                        <i class="fa fa-gift"></i> Offers
                    </li>
                    <li title="Click here to contact us">
                        <i class="fa fa-comment-o fa-flip-horizontal"></i> Care
                    </li>
                    <li title="Click here to view your current order cart">
                        <i class="flaticon-shopping66"></i> Cart (0)
                    </li>
                    <li ng-if='isUserLoggedInSession==false' ng-click="redirectToAccountSignUpSignIn('home')" ng-controller="UsersController" title="Click here to Sign In/Sign Up for account details">
                        <i class="fa fa-user"></i> Account
                    </li>
                    <li title="Click here to know about your ordered product history">
                        <i class="fa fa-file-text-o"></i> Order History
                    </li>
                    <li title="Click here to know about your ordered product status">
                        <i class="fa fa-map-marker"></i> Track Order
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-click="signOutUser()" ng-controller="UsersController" title="Click here to Sign In/Sign Up for account details">
                        <i class="fa fa-sign-out"></i> Sign-Out
                    </li>
                </ul>
            </div>
            <!-- show customer delivery city area desserts product type on header as text -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 showCustomerDeliveryCityAreaDessertsProductTypeTextForHeaderDivClass">
                <p ng-show='isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader' class="showCustomerDeliveryCityAreaDessertsProductTypeTextForHeaderPClass">
                    <i class="fa fa-map-marker faa faa-tada animated showCustomerDeliveryCityAreaDessertsProductTypeTextIconClass"></i> {{customerDeliveryCityAreaDessertsProductTypeTextForHeader}}
                </p>
            </div>
        </div>
        
        <!-- header row border div class -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeaderRowBorderDivClass"></div>
        
        <!-- customize order  -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_bodyDivClass">
            <!-- customer order bread crumb -->
            <div customer-breadcrumb-directive class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_userBreadcrumbDivClass">
                <ul class="ct_userBreadcrumbULClass list-inline">
                    <li class='ct_userBreadcrumbHomeTitleLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            {{customerBreadCrumbOnWebApp.homeKey}}
                        </a>
                    </li>
                    <li class='ct_userBreadcrumbCorporateTieupTitleLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.corporateTieupTitle}}</a>
                    </li>
                </ul>
            </div>
            <!-- corporate tie-up video -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_videoCoverageContainerDivClass">
               Corporate tie-up order video will be come here with full width
            </div>
            <!-- corporate tie-up content -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_contentContainerDivClass">
                Corporate tie-up order content will be come here
            </div>
            <!-- corporate tie-up request form content -->
            <div ng-show="isShowCorporateTieupRequestFormContent" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_formContentWrapperDivClass">
                <p class="ct_formHeaderPClass">
                    <i class="fa fa-smile-o ct_smileIconClass"></i> Hey please fill-up this form and we will get back within one hours. Corporate tie-up request will be accept only for Pune city.
                </p>
                <div ng-controller="CorporateTieupController" ng-init="attachedFieldValidationCorporateTieupRequest()" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 ct_formContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_corporateNameContainerDivClass">
                        <p class="ct_formfieldLabelPClass">
                            <i class="ct_formfieldiconclass fa fa-user faa-tada animated"></i> Type corporate name
                        </p>
                        <input autocomplete="on" type="text" id='ct_corporateNameInputId' class="form-control ct_corporateNameInputClass">
                        <p class="ct_formfieldHintPClass">
                            Eg: Satkar Infotech PVT Ltd, Daksh Tutorials, Abhi Hair Saloon, HR Team
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_contactPersonNameContainerDivClass">
                        <p class="ct_formfieldLabelPClass">
                            <i class="ct_formfieldiconclass fa fa-user faa-tada animated"></i> Type contact person name
                        </p>
                        <input autocomplete="on" type="text" id='ct_contactPersonNameInputId' class="form-control ct_contactPersonNameInputClass">
                        <p class="ct_formfieldHintPClass">
                            Eg: Chirag D Jain
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_contactMobileContainerDivClass">
                        <p class="ct_formfieldLabelPClass">
                            <i class="ct_formfieldiconclass fa fa-phone faa-tada animated"></i> Type mobile no.s
                        </p>
                        <input autocomplete="on" type="text" id='ct_contactMobileInputId' class="form-control ct_contactMobileInputClass">
                        <p class="ct_formfieldHintPClass">
                            9975967186
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_contactEmailContainerDivClass">
                        <p class="ct_formfieldLabelPClass">
                            <i class="ct_formfieldiconclass fa fa-envelope faa-tada animated"></i> Type email-id
                        </p>
                        <input autocomplete="on" type="text" id='ct_contactEmailInputId' class="form-control ct_contactEmailInputClass">
                        <p class="ct_formfieldHintPClass">
                            Eg: chirag@satkarinfotech.com
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_venueContainerDivClass">
                        <p class="ct_formfieldLabelPClass">
                            <i class="ct_formfieldiconclass fa fa-map-marker faa-tada animated"></i> Corporate address ?
                        </p>
                        <textarea autocomplete="on" class='form-control ct_venueInputClass' id='ct_venueInputId' rows="5" cols="20"></textarea>
                        <p class="ct_formfieldHintPClass">
                            Eg: 421302 Bhiwandi
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_peopleContainerDivClass">
                        <p class="ct_formfieldLabelPClass">
                            <i class="ct_formfieldiconclass fa fa-user faa-tada animated"></i> Approximate no.s members ?
                        </p>
                        <input autocomplete="on" type="text" id='ct_nosPeopleInputId' class="form-control ct_nosPeopleInputClass">
                        <p class="ct_formfieldHintPClass">
                            Eg: 50
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_requirementsContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-envelope faa-tada animated"></i> Type Message
                        </p>
                        <textarea autocomplete="on" class='form-control ct_messageInputClass' id='ct_messageInputId' rows="5" cols="20"></textarea>
                        <p class="co_formfieldHintPClass">
                            Eg: some hint...
                        </p>
                    </div>
                    <div ng-show="isShowCorporateTieupRequestErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_errorMsgContainerDivClass">
                        {{corporateTieupErrorMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_btnContainerDivClass">
                        <button ng-click="addCorporateTieupRequest()" class='btn corporateTieupRequestSubmtBtnClass' id='corporateTieupRequestSubmtBtnId'>
                            SEND REQUEST
                        </button>
                    </div>
                </div>
            </div>
            <!-- thank you corporate tie-up requested message content -->
            <div ng-show="isShowCorporateTieupRequestSendThankyouMsg" ng-controller="CorporateTieupController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ct_thankyouContentWrapperDivClass">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 ct_thankyouContentWrapperContainerDivClass">
                    <p class="ct_thankyoubodyPClass">
                        <i class="fa fa-smile-o ct_thankyousmileIconClass"></i> 
                        Hurrah! Your details have been submitted.
                        Let’s begin the corporate tie-up preparations.
                    </p>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button ng-click="redirectToViewCorporateTieupRequest()" class='btn redirectToViewCorporateTieupRequestBtnClass' id='redirectToViewCorporateTieupRequestBtnClass'>
                            Another Corporate Tie-up Request
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        
      
        <!-- load all css & js file-->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>
        
    </body>
    
</html>


