
<?php 
    include "Site_config.inc.php"; 
?>

<!DOCTYPE html>
<html lang="en" ng-app='DESSERTSKHAZANAAPP'>
    
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
    
    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='intializeDkSessionController' ng-init="loadDefaultDataInDkSession('customizeorders')">
        
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_bodyDivClass">
            <!-- customer order bread crumb -->
            <div customer-breadcrumb-directive class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_userBreadcrumbDivClass">
                <ul class="co_userBreadcrumbULClass list-inline">
                    <li class='co_userBreadcrumbHomeTitleLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            {{customerBreadCrumbOnWebApp.homeKey}}
                        </a>
                    </li>
                    <li class='co_userBreadcrumbCustomizeTitleLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.customizeOrderTitle}}</a>
                    </li>
                </ul>
            </div>
            <!-- customize order video -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_videoCoverageContainerDivClass">
               Customize order video will be come here with full width
            </div>
            <!-- customize order content -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_contentContainerDivClass">
                Customize order content will be come here
            </div>
            <!-- customize order form content -->
            <div ng-show="isShowCustomizeOrderRequestFormContent" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_formContentWrapperDivClass">
                <p class="co_formHeaderPClass">
                    <i class="fa fa-smile-o co_smileIconClass"></i> Hey please fill-up this form and we will get back within one hours. Customize orders request will be accept only for Pune city.
                </p>
                <div ng-controller="CustomizeOrdersController" ng-init="attachedFieldValidationCustomizeOrdersRequest()" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 co_formContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_contactPersonNameContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-user faa-tada animated"></i> Type contact person name
                        </p>
                        <input autocomplete="on" type="text" id='co_contactPersonNameInputId' class="form-control co_contactPersonNameInputClass">
                        <p class="co_formfieldHintPClass">
                            Eg: Chirag D Jain
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_contactMobileContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-phone faa-tada animated"></i> Type mobile no.s
                        </p>
                        <input autocomplete="on" type="text" id='co_contactMobileInputId' class="form-control co_contactMobileInputClass">
                        <p class="co_formfieldHintPClass">
                            Eg: 9975967186
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_contactEmailContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-envelope faa-tada animated"></i> Type email-id
                        </p>
                        <input autocomplete="on" type="text" id='co_contactEmailInputId' class="form-control co_contactEmailInputClass">
                        <p class="co_formfieldHintPClass">
                            Eg: chirag@satkarinfotech.com
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_occasionContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-heart-o faa-tada animated"></i> Event Title
                        </p>
                        <input autocomplete="on" type="text" id='co_occasionTitleInputId' class="form-control co_occasionTitleInputClass">
                        <p class="co_formfieldHintPClass">
                            Eg: Brother Birthday celebration
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_peopleContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-user faa-tada animated"></i> How many awesome people in event ?
                        </p>
                        <input autocomplete="on" type="text" id='co_nosPeopleInputId' class="form-control co_nosPeopleInputClass">
                        <p class="co_formfieldHintPClass">
                            Eg: 20
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_dateContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-calendar faa-tada animated"></i> Event date (YYYY-MM-DD) ?
                        </p>
                        <input autocomplete="on" type="text" id='co_dateInputId' class="form-control co_dateInputClass">
                        <p class="co_formfieldHintPClass">
                            Eg: <?php echo date('Y-m-d');?>
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_venueContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-map-marker faa-tada animated"></i> Event venue ?
                        </p>
                        <textarea autocomplete="on" class='form-control co_venueInputClass' id='co_venueInputId' rows="5" cols="20"></textarea>
                        <p class="co_formfieldHintPClass">
                            Eg: 421302 Bhiwandi
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_requirementsContainerDivClass">
                        <p class="co_formfieldLabelPClass">
                            <i class="co_formfieldiconclass fa fa-envelope faa-tada animated"></i> Enter Requirements
                        </p>
                        <textarea autocomplete="on" class='form-control co_messageInputClass' id='co_messageInputId' rows="5" cols="20"></textarea>
                        <p class="co_formfieldHintPClass">
                            Eg: some messages...
                        </p>
                    </div>
                    <div ng-show="isShowCustomizeOrderRequestErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_errorMsgContainerDivClass">
                        {{customizeOrderErrorMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_btnContainerDivClass">
                        <button ng-click="addCustomizeOrdersRequest()" class='btn customizeOrderRequestSubmtBtnClass' id='customizeOrderRequestSubmtBtnId'>
                            SEND REQUEST
                        </button>
                    </div>
                </div>
            </div>
            <!-- thank you customize order requested message content -->
            <div ng-show="isShowCustomizeOrderRequestSendThankyouMsg" ng-controller="CustomizeOrdersController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_thankyouContentWrapperDivClass">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 co_thankyouContentWrapperContainerDivClass">
                    <p class="co_thankyoubodyPClass">
                        <i class="fa fa-smile-o co_thankyousmileIconClass"></i> 
                        Hurrah! Your details have been submitted.
                        Let’s begin the customize order preparations.
                    </p>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button ng-click="redirectToViewCustomizeOrderRequest()" class='btn redirectToViewCustomizeOrderRequestBtnClass' id='customizeOrderRequestSubmtBtnId'>
                            Another Customize Order Request
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        
        <!-- logged authenticated user dashboard summary details -->
        <div id='authenticatedUserDashboardSummaryDataDivId' ng-controller="UsersController" ng-init="updateAuthenticatedUserDashboardSummaryDataDetails()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>
        
    </body>
    
</html>


