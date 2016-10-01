
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
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
                display:none !important;
            }
        </style>
    </head>

    <!-- body start here -->
    <body ng-cloak class="ng-cloak" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('checkout');">

        <!-- header -->
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 fHeaderContainerDivClass {{stickNtStickWebAppHeaderClass}}">
            
            <!-- web log header --->
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
            
        </div>

        <!-- header row border div class -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeaderRowBorderDivClass"></div>

        <!-- checkout info body -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 checkoutInfoBodyWrapperDivClass">
            
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
                    Checkout
                </li>
            </ul>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- checkout delivery address section -->
            <div ng-controller="OrderCartController" ng-init="loadStorewiseOrderSummaryForCheckoutProcess();" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_deliveryAddressSectionDivClass">
                <p class='chkout_deliveryAddressHeaderPClass'>
                    <i class="fa fa-bus"></i> DELIVERY ADDRESS
                </p>
                <!-- each store order summary will be display -->
                <div ng-repeat="eachStoreOrderSummaryDataObj in allStorewiseOrderSummaryDataArrObj" data-ordercartstoreid="{{eachStoreOrderSummaryDataObj.ordercartStoreId}}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_eachStoreOrderSummaryDivClass">
                    <p class="chkout_eachStoreBasicInfoLblPClass">
                        <i class="fa fa-smile-o"></i> Hey {{eachStoreOrderSummaryDataObj.shopStoreTitle}} store order 
                        will be deliver from '{{eachStoreOrderSummaryDataObj.storeLocatedAreaName}}' 
                        to '{{eachStoreOrderSummaryDataObj.deliveryAreaname}}' area
                    </p>
                    <p class='chkout_eachStoreOrderDeliveryAddressPClass'> 
                        Your delivery address
                        <textarea class="form-control chkout_deliveryAddressInputBoxClass" placeholder="Type delivery address">{{eachStoreOrderSummaryDataObj.deliveryaddress}}</textarea>                            
                    </p>
                    <p class='chkout_eachStoreOrderDeliveryDatePClass'> 
                        Your delivery date
                        <input order-deliverydate-input-directive type='text' class="form-control chkout_deliveryDateInputBoxClass" placeholder="Type delivery date" value='{{eachStoreOrderSummaryDataObj.deliverydate}}'>                          
                    </p>
                </div>
                <p ng-if="allStorewiseOrderSummaryDataArrObj.length>0" class="chkout_orderDeliveryDetailsSaveBtnPClass">
                    <button ng-click="checkOrderDeliveryAddressDataForUpdate('chkout_eachStoreOrderSummaryDivClass')" class='btn chkout_orderDeliveryDateSaveBtnClass'>
                        SAVE
                    </button>
                </p>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- checkout payment summary section -->
            <div ng-if="ordercartItemRequestedCount>0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_paymentSummarySectionDivClass">
                <p class='chkout_paymentSummaryHeaderPClass'>
                    <i class="fa fa-money"></i> PAYMENT SUMMARY
                </p>
                <div ng-if="ordercartItemRequestedCount>0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_paymentSummaryDivClass">
                    <p>
                        Total Stores : {{totalStores}}
                    </p>
                    <p>
                        Subtotal Amt(Rs) : {{subtotalOrderAmt}}
                    </p>
                    <p>
                        Total Delivery Fee(Rs) : {{totalDeliveryFee}}
                    </p>
                    <p>
                        Total Amt(Rs) : {{totalOrderAmt}}
                    </p>
                    <p class="chkout_makePaymentBtnPClass">
                        <button class='btn chkout_makePaymentBtnClass'>
                            Make Payment
                        </button>
                    </p>
                </div>
            </div>
            
        </div>
        
        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
        
        <!-- refresh web application data -->
        <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php
            include "loadAllJsCssFile.php";
        ?>

    </body>

</html>


