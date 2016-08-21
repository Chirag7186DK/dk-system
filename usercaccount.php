
<?php
include "Site_config.inc.php";
?>

<!DOCTYPE html>
<html lang="en" ng-app='DESSERTSKHAZANAAPP'>

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

    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('accountSignUpSignIn'); checkInBackgroundDataAvailableForUpdationFromSession('usercaccount');">

        <!-- common SCROLL TOP BUTTON -->
        <a class="scrollToTopBtnClass" ng-show="isShowScrollToTopBtnWebAppPage" href="#" title='Click to scroll up page'>
            <i class="fa fa-angle-up"></i>
        </a>

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
                    <li title="Click here to contact us">
                        <i class="fa fa-comment-o fa-flip-horizontal"></i> Care
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-controller="UsersController" ng-click="toggleUserAccountSectionDropdown('home')">
                        <i class="fa fa-user accountSignUpSignInIconClass"></i> Hello, {{loggedUserName}}
                        <!-- user account showing different section label to access -->
                        <div class="userAccountAllSectionListDropdownDivClass" ng-if='isUserLoggedInSession==true'>
                            <div title="Click here to see more details about yourself" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('personalinfo');">
                                Personal Info
                            </div>
                            <div title="Click here to see your orders details" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('ordercart');">
                                Your Orders
                            </div>
                            <div title="Click here to see your customize orders details" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('customizeorder');">
                                Customize Orders
                            </div>
                            <div title="Click here to see your wishlist" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('wishlist');">
                                Your WishList
                            </div>
                            <div class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('shareoffers');">
                                Share Offers
                            </div>
                            <div class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('myoffers');">
                                My offers
                            </div>
                            <div class='userAccountEachSectionListDropdownDivClass' ng-click="signOutUser()" ng-controller="UsersController" title="Click here to log out from desserts khazana account">
                                Log Out
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

        <!-- my-account body content-->
        <div ng-show="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_bodyDivClass">

            <!-- customer bread crumb -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ma_userBreadcrumbDivClass">
                <ul class="ma_userBreadcrumbULClass list-inline">
                    <li class='wl_userBreadcrumbHomeTitleLIClass'>
                        <a href="<?php echo $BaseSitePath; ?>">
                            Home
                        </a>
                    </li>
                    <li class='ma_userBreadcrumbMyAccountTitleLIClass'>
                        |&nbsp; {{loggedUserName}}
                    </li>
                    <li class='ma_userBreadcrumbMyAccountTitleLIClass'>
                        |&nbsp; {{displayedSectionName}}
                    </li>
                </ul>
            </div>

            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

            <!-- order cart section details with each tab level -->
            <div ng-if="requestedSectionName==='ordercart'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartSectionContainerDivClass">

                <!-- order cart summary info -->
                <p class='uca_ordercartSectionMsgPClass'>
                    <i class="fa fa-shopping-basket ordercartRequestedItemShoppingBagIconClass"></i> 
                    Your shopping bags contains (Items: {{ordercartItemRequestedCount}}, Subtotal Rs: {{subtotalOrderAmt}})
                </p>

                <!-- order cart all section header title -->
                <div scroll-horizontally-ordercart-allsectionheader-directive id='uca_ordercartAllSectionHeaderContainerDivId' class='uca_ordercartAllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_toggleOrdercartSectionList('requestitem');" title='Click to view all shopping item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId1' class='uca_ordercartEachTabLabelSectionContainerLIClass uca_ordercartSelectedTabLabelSectionContainerLIClass'>
                        Shopping Items
                    </li>
                    <li ng-click="uca_toggleOrdercartSectionList('allordered');" title='Click to view all ordered item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId2' class='uca_ordercartEachTabLabelSectionContainerLIClass'>
                        All Orders
                    </li>
                    <li ng-click="uca_toggleOrdercartSectionList('cancelledordered');" title='Click to view all ordered item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId3' class='uca_ordercartEachTabLabelSectionContainerLIClass'>
                        Cancelled Orders
                    </li>
                </div>

                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

                <!-- requested order cart each section tabs info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='requestitem'" ng-controller="UCustomerController" ng-init="populateOrdercartRequestedItemList('R')" id='uca_ordercartRequestedAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedAllItemListSectionDivClass'>
                    <!-- requesting order item will be filtering -->
                    <div ng-if="ordercartRequestedAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextOrdercartRequestedItemDivClass">
                        <label class="searchTextOrdercartItemRequestedLblClass">Use for filtering and access fast requesting shopping item !</label>
                        <input ng-model="searchTextOrdercartItemRequested" type="text" class="form-control" placeholder="Find requested items across in current order cart !">
                    </div>
                    <!-- each order item will display -->
                    <div ng-repeat="ordercartRequestedEachItemDetailsArrObj in ordercartRequestedAllItemDetailsArrObj| filter:searchTextOrdercartItemRequested:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedEachItemSectionContainerDivClass">
                        <div class='col-xs-3 col-sm-1 col-md-1 col-lg-1 ordercartRequestedEachItemImageDivClass'>
                            <img style='width:100%;' class='ordercartRequestedEachItemImageClass' ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
                        </div>
                        <div class='col-xs-9 col-sm-11 col-md-11 col-lg-11 ordercartRequestedEachItemDetailsDivClass'>
                            <p class="ordercartRequestedEachItemSellerNamePClass">
                                Seller: {{ordercartRequestedEachItemDetailsArrObj.shopStoreName}}
                            </p>
                            <p class="ordercartRequestedEachItemNamePClass">
                                {{ordercartRequestedEachItemDetailsArrObj.productListTitle}}
                            </p>
                            <p class="ordercartRequestedEachItemSizePClass">
                                Size: {{ordercartRequestedEachItemDetailsArrObj.itemMeasurementType}}
                            </p>
                            <p class='ordercartRequestedEachItemPriceDetailsPClass'> 
                                <span class='ordercartRequestedEachItemDiscountPercentTextSClass'>
                                    10%
                                </span>
                                <span class='ordercartRequestedEachItemCutPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> 2000
                                </span>
                                <span class='ordercartRequestedEachItemPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> {{ordercartRequestedEachItemDetailsArrObj.itemPerpriceIncart}}
                                </span>
                            </p>
                            <p class="ordercartRequestedEachItemQtyPClass">
                                Qty
                                <input order-productqtyinput-directive type='text' ng-value="{{ordercartRequestedEachItemDetailsArrObj.itemQty}}" class='form-control ordercartRequestedEachItemInputQtyClass'>
                            </p>
                            <p class="ordercartRequestedEachItemOperationPClass">
                                <button ng-click="updateItemOrdercart(ordercartRequestedEachItemDetailsArrObj);" class='btn ordercartRequestedEachItemUpdateBtnClass'>UPDATE</button>
                                <button ng-click="removeItemOrdercart(ordercartRequestedEachItemDetailsArrObj);" class='btn ordercartRequestedEachItemRemoveBtnClass'>REMOVE</button>
                                <button ng-click="removeItemOrdercart(ordercartRequestedEachItemDetailsArrObj);" class='btn ordercartRequestedEachItemCheckoutBtnClass'>CHECKOUT</button>
                            </p>
                        </div>
                    </div>
                    <!-- payment checkout button -->
                    <div ng-if="ordercartRequestedAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCheckoutBtnDivClass">
                        <button class='btn uca_ordercartCheckoutBtnClass'>Proceed to Checkout</button>
                    </div>
                    <!-- no order requested item  found message div -->
                    <div ng-hide="ordercartRequestedAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCheckoutBtnDivClass">
                        <p class="shoppingBagsEmptyPClass">Your Shopping Bags is Empty !</p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>
                
                <!-- canceled order cart each section tabs info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='cancelledordered'" ng-controller="OrderCartController" ng-init="populateOrdercartCancelledItemList('ZC,ZA')" id='uca_ordercartCancelledAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledAllItemListSectionDivClass'>
                    <!-- canceled order item will be filtering -->
                    <div ng-if="ordercartCancelledAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextOrdercartCancelledItemDivClass">
                        <label class="searchTextOrdercartItemRequestedLblClass">
                            Use for filtering and access fast canceled item !
                        </label>
                        <input ng-model="searchTextOrdercartItemCancelled" type="text" class="form-control" placeholder="Find requested items across in current order cart !">
                    </div>
                    <!-- each order item will display -->
                    <div ng-repeat="ordercartCancelledEachItemDetailsArrObj in ordercartCancelledAllItemDetailsArrObj | filter:searchTextOrdercartItemCancelled:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledEachItemSectionContainerDivClass">
                        <div class='col-xs-3 col-sm-1 col-md-1 col-lg-1 ordercartCancelledEachItemImageDivClass'>
                            <img style='width:100%;' class='ordercartCancelledEachItemImageClass' ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
                        </div>
                        <div class='col-xs-9 col-sm-11 col-md-11 col-lg-11 ordercartCancelledEachItemDetailsDivClass'>
                            <p class="ordercartCancelledEachItemSellerNamePClass">
                                Seller: {{ordercartCancelledEachItemDetailsArrObj.shopStoreName}}
                            </p>
                            <p class="ordercartCancelledEachItemNamePClass">
                                {{ordercartCancelledEachItemDetailsArrObj.productListTitle}}
                            </p>
                            <p class="ordercartCancelledEachItemSizePClass">
                                Size: {{ordercartCancelledEachItemDetailsArrObj.itemMeasurementType}}
                            </p>
                            <p class='ordercartCancelledEachItemPriceDetailsPClass'> 
                                <span class='ordercartCancelledEachItemDiscountPercentTextSClass'>
                                    10%
                                </span>
                                <span class='ordercartCancelledEachItemCutPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> 2000
                                </span>
                                <span class='ordercartCancelledEachItemPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> {{ordercartCancelledEachItemDetailsArrObj.itemPerpriceIncart}}
                                </span>
                            </p>
                            <p class="ordercartCancelledEachItemQtyPClass">
                                Qty: {{ordercartCancelledEachItemDetailsArrObj.itemQty}}
                            </p>
                        </div>
                    </div>
                    <div ng-hide="ordercartCancelledAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartNoCancelledItemFoundDivClass">
                        <p class="orderCancelledItemEmptyPClass">Your Shopping Bags is Empty !</p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>

            </div>


        </div>    

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <!-- checking user account is active in session or not -->
        <div ng-controller="UsersController" ng-init="checkUserCAccountIsActiveInSession()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- checking which section is requested by end user for showing purpose  -->
        <div ng-controller="UCustomerController" ng-init="checkRequestedSectionAvailableToAccessInUserCAccount()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php
        include "loadAllJsCssFile.php";
        ?>

    </body>

</html>


