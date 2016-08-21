
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
    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('home'); checkInBackgroundDataAvailableForUpdationFromSession('home');">
        
        <!-- common SCROLL TOP BUTTON -->
        <a class="scrollToTopBtnClass" ng-show="isShowScrollToTopBtnWebAppPage" href="#" title='Click to scroll up page'>
            <i class="fa fa-angle-up"></i>
        </a>
        
        <!-- header -->
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 fHeaderContainerDivClass {{stickNtStickWebAppHeaderClass}}">
            <!-- web logo header --->
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
                    <li ng-click="redirectToViewWishList('wishlist')" ng-controller="WishListController" title="Click here to see your all wish list">
                        <i class="fa fa-heart"></i> Wishlist ({{wlmCount}})
                    </li>
                    <li ng-controller="UsersController" title="Click here to view your current order cart all item(s)" ng-click="ordercartItemRequestedCount>0 && storeRequestedSectionNameToAccessInUserAccount('ordercart');">
                        <i class="fa fa-shopping-basket"></i> (Item: {{ordercartItemRequestedCount}}, Rs: {{subtotalOrderAmt}})
                    </li>
                    <li ng-if='isUserLoggedInSession==false' ng-click="redirectToAccountSignUpSignIn('home')" ng-controller="UsersController" title="Click here to Log In / Sign Up with desserts khazana account">
                        <i class="fa fa-user accountSignUpSignInIconClass"></i> Log In / Sign Up
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-controller="UsersController" ng-click="toggleUserAccountSectionDropdown('home')">
                        <i class="fa fa-user accountSignUpSignInIconClass"></i> {{loggedUserName}}
                        <!-- user account showing different section label to access -->
                        <div class="userAccountAllSectionListDropdownDivClass" ng-if='isUserLoggedInSession==true'>
                            <div ng-repeat="userInfoEachSectionListArrObj in userInfoAllSectionListArrObj" title="{{userInfoEachSectionListArrObj.hoverTitle}}" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount(userInfoEachSectionListArrObj.sectionName);">
                                {{userInfoEachSectionListArrObj.displayTitle}}
                            </div>
                        </div>
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-click="signOutUser()" ng-controller="UsersController" title="Click here to log out from desserts khazana account">
                        <i class="fa fa-sign-out"></i> Log Out
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
        
        <!-- party order  -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_bodyDivClass">
            
            <!-- customer party order bread crumb -->
            <div customer-breadcrumb-directive class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_userBreadcrumbDivClass">
                <ul class="po_userBreadcrumbULClass list-inline">
                    <li class='po_userBreadcrumbHomeTitleLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            {{customerBreadCrumbOnWebApp.homeKey}}
                        </a>
                    </li>
                    <li class='po_userBreadcrumbPartyTitleLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.partyOrderTitle}}</a>
                    </li>
                </ul>
            </div>
            
            <!-- party order video -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_videoCoverageContainerDivClass">
               Party order video will be come here with full width
            </div>
            
            <!-- party order content -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_contentContainerDivClass">
                Party order content will be come here
            </div>
            
            <!-- party order form content -->
            <div ng-show="isShowPartyOrderRequestFormContent" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_formContentWrapperDivClass">
                <p class="po_formHeaderPClass">
                    <i class="fa fa-smile-o po_smileIconClass"></i> Hey please fill-up this form and we will get back within one hours. Party orders request will be accept only for Pune city.
                </p>
                <div ng-controller="PartyOrdersController" ng-init="attachedFieldValidationPartyOrdersRequest()" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 po_formContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_contactPersonNameContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-user faa-tada animated"></i> Type contact person name
                        </p>
                        <input autocomplete="on" type="text" id='po_contactPersonNameInputId' class="form-control po_contactPersonNameInputClass">
                        <p class="po_formfieldHintPClass">
                            Eg: Chirag D Jain
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_contactMobileContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-phone faa-tada animated"></i> Type mobile no.s
                        </p>
                        <input autocomplete="on" type="text" id='po_contactMobileInputId' class="form-control po_contactMobileInputClass">
                        <p class="po_formfieldHintPClass">
                            Eg: 9975967186
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_contactEmailContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-envelope faa-tada animated"></i> Type email-id
                        </p>
                        <input autocomplete="on" type="text" id='po_contactEmailInputId' class="form-control po_contactEmailInputClass">
                        <p class="po_formfieldHintPClass">
                            Eg: chirag@satkarinfotech.com
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_occasionContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-heart-o faa-tada animated"></i> What's the occasion ?
                        </p>
                        <input autocomplete="on" type="text" id='po_occasionTitleInputId' class="form-control po_occasionTitleInputClass">
                        <p class="po_formfieldHintPClass">
                            Eg: Brother Birthday celebration, Mom & Dad Anniversary celebration
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_peopleContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-user faa-tada animated"></i> How many awesome people to treat ?
                        </p>
                        <input autocomplete="on" type="text" id='po_nosPeopleInputId' class="form-control po_nosPeopleInputClass">
                        <p class="po_formfieldHintPClass">
                            Eg: 20
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_dateContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-calendar faa-tada animated"></i> Party date (YYYY-MM-DD) ?
                        </p>
                        <input autocomplete="on" type="text" id='po_dateInputId' class="form-control po_dateInputClass">
                        <p class="po_formfieldHintPClass">
                            Eg: <?php echo date('Y-m-d');?>
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_venueContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-map-marker faa-tada animated"></i> Party venue ?
                        </p>
                        <textarea autocomplete="on" class='form-control po_venueInputClass' id='po_venueInputId' rows="5" cols="20"></textarea>
                        <p class="po_formfieldHintPClass">
                            Eg: 421302 Bhiwandi
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_requirementsContainerDivClass">
                        <p class="po_formfieldLabelPClass">
                            <i class="po_formfieldiconclass fa fa-envelope faa-tada animated"></i> Enter Requirements
                        </p>
                        <textarea autocomplete="on" class='form-control po_messageInputClass' id='po_messageInputId' rows="5" cols="20"></textarea>
                        <p class="po_formfieldHintPClass">
                            Eg: some requriements...
                        </p>
                    </div>
                    <div ng-show="isShowPartyOrderRequestErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_errorMsgContainerDivClass">
                        {{partyOrderErrorMsgStr}}
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_btnContainerDivClass">
                        <button ng-click="addPartyOrdersRequest()" class='btn partyOrderRequestSubmtBtnClass' id='partyOrderRequestSubmtBtnId'>
                            SEND REQUEST
                        </button>
                    </div>
                </div>
            </div>
            <!-- thank you party order requested message content -->
            <div ng-show="isShowPartyOrderRequestSendThankyouMsg" ng-controller="PartyOrdersController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_thankyouContentWrapperDivClass">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 po_thankyouContentWrapperContainerDivClass">
                    <p class="po_thankyoubodyPClass">
                        <i class="fa fa-smile-o po_thankyousmileIconClass"></i> 
                        Hurrah! Your details have been submitted.
                        Let’s begin the party order preparations.
                    </p>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button ng-click="redirectToViewPartyOrderRequest()" class='btn redirectToViewPartyOrderRequestBtnClass' id='partyOrderRequestSubmtBtnId'>
                            Another Party Order Request
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


