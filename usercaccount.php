
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
                    <li ng-click="redirectToViewWishList('wishlist')" ng-controller="WishListController" title="Click here to see your all wish list">
                        <i class="fa fa-heart"></i> Wishlist ({{wlmCount}})
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-controller="UsersController" ng-click="toggleUserAccountSectionDropdown('home')">
                        <i class="fa fa-user accountSignUpSignInIconClass"></i> Hello, {{loggedUserName}}
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

            <!-- display user personal info section details -->
            <div ng-if="requestedSectionName==='personalinfo'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_personalInfoSectionContainerDivClass">
                
                <!-- user personal info as text display -->
                <div ng-if="displayPersonalInfoSectionType==='text_personalinfo'" ng-controller="UCustomerController" ng-init="populateUserPersonalInfoInUserCAccount()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_personalInfoTextSectionContainerDivClass">
                    <!-- edit personal info label text -->
                    <p class='uca_editProfileLblPClass pull-right' ng-click="showEditableUserCustomerProfileInfo('edit_personalinfo')">
                        <i class="fa fa-pencil"> Edit Profile</i>
                    </p>
                    <p class="uca_personalInfoTextUserNamePClass">
                        <span class="uca_personalInfoTextUserNameLblSClass">
                            Name
                        </span>
                        <span class="uca_personalInfoTextUserNameValSClass">
                            {{userPersonalDetails.name}}
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserEmailPClass">
                        <span class="uca_personalInfoTextUserEmailLblSClass">
                            Email
                        </span>
                        <span class="uca_personalInfoTextUserEmailValSClass">
                            {{userPersonalDetails.email}}
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserMobilePClass">
                        <span class="uca_personalInfoTextUserMobileLblSClass">
                            Mobile
                        </span>
                        <span class="uca_personalInfoTextUserMobileValSClass">
                            {{userPersonalDetails.mobile}}
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserGenderPClass">
                        <span class="uca_personalInfoTextUserGenderLblSClass">
                            Gender
                        </span>
                        <span class="uca_personalInfoTextUserGenderValSClass">
                            {{userPersonalDetails.gender}}
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserGenderPClass">
                        <span class="uca_personalInfoTextUserBirthdateLblSClass">
                            DOB
                        </span>
                        <span class="uca_personalInfoTextUserBirthdateValSClass">
                            {{userPersonalDetails.birthdate}}
                        </span>
                    </p>
                </div>
                
                <!-- user personal info as editable mode -->
                <div ng-if="displayPersonalInfoSectionType==='edit_personalinfo'" ng-controller="UCustomerController" ng-init="populateUserPersonalInfoInUserCAccount(); attachedFieldValidationUserProfileInfo();" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_personalInfoEditSectionContainerDivClass">
                    <!-- close edit personal info label text -->
                    <p class='uca_closeProfileLblPClass pull-right' ng-click="closeEditableUserCustomerProfileInfo('text_personalinfo')">
                        <i class="fa fa-close"> Close Profile</i>
                    </p>
                    <p class="uca_personalInfoTextUserNamePClass">
                        <span class="uca_personalInfoTextUserNameLblSClass">
                            Name
                        </span>
                        <span class="uca_personalInfoEditUserNameValSClass">
                            <input class='form-control editUsernameInputClass' type='text' value='{{userPersonalDetails.name}}'>
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserEmailPClass">
                        <span class="uca_personalInfoTextUserEmailLblSClass">
                            Email
                        </span>
                        <span class="uca_personalInfoEditUserEmailValSClass">
                            <input class='form-control editUseremailInputClass' type='text' value='{{userPersonalDetails.email}}'>
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserMobilePClass">
                        <span class="uca_personalInfoTextUserMobileLblSClass">
                            Mobile
                        </span>
                        <span class="uca_personalInfoEditUserMobileValSClass">
                            <input class='form-control editUsermobileInputClass' type='text' value='{{userPersonalDetails.mobile}}'>
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserGenderPClass">
                        <span class="uca_personalInfoTextUserGenderLblSClass">
                            Gender
                        </span>
                        <span class="uca_personalInfoEditUserGenderValSClass">
                            <select class='form-control editUserGenderSelectClass' ng-model="userPersonalDetails.gender">
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </span>
                    </p>
                    <p class="uca_personalInfoTextUserGenderPClass">
                        <span class="uca_personalInfoTextUserBirthdateLblSClass">
                            DOB
                        </span>
                        <span class="uca_personalInfoEditUserBirthdateValSClass">
                            <input class='form-control editUserbirthdateInputClass' type='text' value='{{userPersonalDetails.birthdate}}'>
                        </span>
                    </p>
                    <p class="uca_personalInfoUpdateBtnPClass">
                        <button ng-click="checkDataToUpdateUserpersonalnfo()" class='btn uca_personalInfoUpdateBtnClass'>UPDATE</button>
                    </p>
                </div>
                
            </div>
            
            <!-- change password info section details -->
            <div ng-if="requestedSectionName==='changepassword'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_changepasswordInfoSectionContainerDivClass">
                <p class="uca_OldPasswordPClass">
                    <span class="uca_oldpasswordLblSClass">
                        OLD PASSWORD
                    </span>
                    <span class="uca_oldpasswordEditValSClass">
                        <input placeholder='OLD PASSWORD' class='form-control editOldPasswordInputClass' type='password' value=''>
                    </span>
                </p>
                <p class="uca_NewPasswordPClass">
                    <span class="uca_newpasswordLblSClass">
                        NEW PASSWORD
                    </span>
                    <span class="uca_newpasswordEditValSClass">
                        <input placeholder='NEW PASSWORD' class='form-control editNewPasswordInputClass' type='password' value=''>
                    </span>
                </p>
                <p class="uca_NewConfirmPasswordPClass">
                    <span class="uca_newconfirmpasswordLblSClass">
                        CONFIRM PASSWORD
                    </span>
                    <span class="uca_newconfirmpasswordEditValSClass">
                        <input placeholder='CONFIRM PASSWORD' class='form-control editNewConfirmPasswordInputClass' type='password' value=''>
                    </span>
                </p>
                <p class="uca_changePasswordBtnPClass">
                    <button ng-click="checkDataToUpdateUserpasswordInfo()" class='btn uca_changePasswordBtnClass'>
                        SAVE
                    </button>
                </p>
            </div>
            
            <!-- order cart section details with each tab level -->
            <div ng-if="requestedSectionName==='ordercart'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartSectionContainerDivClass">

                <!-- order cart summary info -->
                <p class='uca_ordercartSectionMsgPClass'>
                    <i class="fa fa-shopping-basket ordercartRequestedItemShoppingBagIconClass"></i> 
                    Your shopping bags contains (Items: {{ordercartItemRequestedCount}}, Subtotal Rs: {{subtotalOrderAmt}})
                </p>

                <!-- order cart all section header title -->
                <div scroll-horizontally-ordercart-allsectionheader-directive id='uca_ordercartAllSectionHeaderContainerDivId' class='uca_ordercartAllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_toggleOrdercartSectionList('requestitem', 'uca_ordercartEachTabLabelSectionContainerLIId1', 'uca_ordercartAllSectionHeaderContainerDivClass');" title='Click to view all shopping item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId1' class='uca_ordercartEachTabLabelSectionContainerLIClass uca_ordercartSelectedTabLabelSectionContainerLIClass'>
                        Shopping Items
                    </li>
                    <li ng-click="uca_toggleOrdercartSectionList('cancelledordered', 'uca_ordercartEachTabLabelSectionContainerLIId3', 'uca_ordercartAllSectionHeaderContainerDivClass');" title='Click to view all ordered item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId3' class='uca_ordercartEachTabLabelSectionContainerLIClass'>
                        Cancelled Orders
                    </li>
                    <li ng-click="uca_toggleOrdercartSectionList('allordered', 'uca_ordercartEachTabLabelSectionContainerLIId2', 'uca_ordercartAllSectionHeaderContainerDivClass');" title='Click to view all ordered item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId2' class='uca_ordercartEachTabLabelSectionContainerLIClass'>
                        All Ordered
                    </li>
                </div>

                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

                <!-- requested order cart all items info will be displayed -->
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
                                <span class='ordercartRequestedEachItemDiscountPercentTextSClass' ng-if="ordercartRequestedEachItemDetailsArrObj.productFeatureDiscount!==''">
                                    {{ordercartRequestedEachItemDetailsArrObj.productFeatureDiscount}}%
                                </span>
                                <span class='ordercartRequestedEachItemCutPriceTextSClass' ng-if="ordercartRequestedEachItemDetailsArrObj.productFeatureBasePrice!==''">
                                    <i class="fa fa-rupee"></i> {{ordercartRequestedEachItemDetailsArrObj.productFeatureBasePrice}}
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
                    <div ng-if="ordercartRequestedAllItemDetailsArrObj==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCheckoutBtnDivClass">
                        <p class="shoppingBagsEmptyPClass">Your Shopping Bags is Empty !</p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>
                
                <!-- canceled order cart all items info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='cancelledordered'" ng-controller="OrderCartController" ng-init="populateOrdercartCancelledItemList('ZC,ZA')" id='uca_ordercartCancelledAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledAllItemListSectionDivClass'>
                    
                    <!-- canceled order item will be filtering -->
                    <div ng-if="ordercartCancelledAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextOrdercartCancelledItemDivClass">
                        <label class="searchTextOrdercartItemRequestedLblClass">
                            Use for filtering and access fast canceled item !
                        </label>
                        <input ng-model="searchTextOrdercartItemCancelled" type="text" class="form-control" placeholder="Find canceled items !">
                    </div>
                    
                    <!-- each order item will display -->
                    <div ng-repeat="ordercartCancelledEachItemDetailsArrObj in ordercartCancelledAllItemDetailsArrObj | filter:searchTextOrdercartItemCancelled:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledEachItemSectionContainerDivClass">
                        <div class='col-xs-3 col-sm-1 col-md-1 col-lg-1 ordercartCancelledEachItemImageDivClass'>
                            <img style='width:100%;' class='ordercartCancelledEachItemImageClass' ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
                        </div>
                        <div class='col-xs-9 col-sm-11 col-md-11 col-lg-11 ordercartCancelledEachItemDetailsDivClass'>
                            <p class="ordercartCancelledEachItemNoSClass">
                                Ordered No: {{ordercartCancelledEachItemDetailsArrObj.ordercartNo}}
                            </p>
                            <p class="ordercartCancelledEachItemSellerNamePClass">
                                Seller: {{ordercartCancelledEachItemDetailsArrObj.shopStoreTitle}}
                            </p>
                            <p class="ordercartCancelledEachItemNamePClass">
                                {{ordercartCancelledEachItemDetailsArrObj.productListTitle}}
                            </p>
                            <p class="ordercartCancelledEachItemSizePClass">
                                Size: {{ordercartCancelledEachItemDetailsArrObj.itemMeasurementType}}
                            </p>
                            <p class='ordercartCancelledEachItemPriceDetailsPClass'> 
                                Current Price: 
                                <span class='ordercartCancelledEachItemDiscountPercentTextSClass' ng-if="ordercartCancelledEachItemDetailsArrObj.productFeatureDiscount!==''">
                                    {{ordercartCancelledEachItemDetailsArrObj.productFeatureDiscount}}%
                                </span>
                                <span class='ordercartCancelledEachItemCutPriceTextSClass' ng-if="ordercartCancelledEachItemDetailsArrObj.productFeatureBasePrice!==''">
                                    <i class="fa fa-rupee"></i> {{ordercartCancelledEachItemDetailsArrObj.productFeatureBasePrice}}
                                </span>
                                <span class='ordercartCancelledEachItemPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> {{ordercartCancelledEachItemDetailsArrObj.productFeatureOnlineSellingPrice}}
                                </span>
                            </p>
                            <p class="ordercartCancelledEachItemQtyPClass">
                                Bought Qty: {{ordercartCancelledEachItemDetailsArrObj.itemQty}}
                            </p>
                        </div>
                    </div>
                    
                    <!-- no canceled ordered item found message div -->
                    <div ng-if="ordercartCancelledAllItemDetailsArrObj==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartNoCancelledItemFoundDivClass">
                        <p class="orderCancelledItemEmptyPClass">Your Shopping Bags is Empty !</p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>
                
                <!-- ordered order cart all items info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='allordered'" ng-controller="OrderCartController" ng-init="populateOrdercartAllOrderedItemList('all_ordered')" id='uca_ordercartOrderedAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartOrderedAllItemListSectionDivClass'>
                    
                    <!-- ordered item will be filtering -->
                    <div ng-if="allOrdercartNoAllItemDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextOrdercartOrderedItemDivClass">
                        <label class="searchTextOrdercartItemRequestedLblClass">
                            Use for filtering and access fast ordered item !
                        </label>
                        <input ng-model="searchTextOrdercartItemOrdered" type="text" class="form-control" placeholder="Find ordered items !">
                    </div>
                    
                    <!-- display order cart no wise all items details -->
                    <div ng-repeat="eachOrdercartNoAllItemDetailsArrObj in allOrdercartNoAllItemDetailsArrObj | filter:searchTextOrdercartItemOrdered:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartnoWiseAllItemSectionContainerDivClass">
                        
                        <!-- create horizontally space div between -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
                
                        <p class="uca_ordercartnoWiseAllItemSectionLabelPClass">
                            Showing 
                            <span class="badge uca_ordercartnoAllItemsCountSClass">
                                {{eachOrdercartNoAllItemDetailsArrObj['totalOrderedItems']}}
                            </span> items in ordered no: {{eachOrdercartNoAllItemDetailsArrObj['ordercartNo']}}
                        </p>
                        
                        <!-- each ordered item will display -->
                        <div ng-repeat="ordercartOrderedEachItemDetailsArrObj in eachOrdercartNoAllItemDetailsArrObj['orderedAllItemsDetailsArr'] | filter:searchTextOrdercartItemOrdered:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartOrderedEachItemSectionContainerDivClass">
                            <div class='col-xs-3 col-sm-1 col-md-1 col-lg-1 ordercartOrderedEachItemImageDivClass'>
                                <img style='width:100%;' class='ordercartOrderedEachItemImageClass' ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
                            </div>
                            <div class='col-xs-9 col-sm-11 col-md-11 col-lg-11 ordercartOrderedEachItemDetailsDivClass'>
                                <p class="ordercartOrderedEachItemStatusSClass">
                                    Status: {{ordercartOrderedEachItemDetailsArrObj.orderedItemStatus}}
                                </p>
                                <p class="ordercartOrderedEachItemSellerNamePClass">
                                    Seller: {{ordercartOrderedEachItemDetailsArrObj.shopStoreTitle}}
                                </p>
                                <p class="ordercartOrderedEachItemNamePClass">
                                    {{ordercartOrderedEachItemDetailsArrObj.productListTitle}}
                                </p>
                                <p class="ordercartOrderedEachItemSizePClass">
                                    Size: {{ordercartOrderedEachItemDetailsArrObj.itemMeasurementType}}
                                </p>
                                <p class="ordercartOrderedEachItemPricePClass">
                                    <i class="fa fa-rupee"></i> {{ordercartOrderedEachItemDetailsArrObj.itemPerpriceIncart}}
                                </p>
                                <p class="ordercartOrderedEachItemQtyPClass">
                                    Bought Qty: {{ordercartOrderedEachItemDetailsArrObj.itemQty}}
                                </p>
                                <p class="ordercartOrderedEachItemTotalAmtPClass">
                                    Total Amt: {{ordercartOrderedEachItemDetailsArrObj.itemTotalAmt}}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- no ordered item found message div -->
                    <div ng-if="allOrdercartNoAllItemDetailsArrObj==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartNoOrderedItemFoundDivClass">
                        <p class="orderedItemEmptyPClass">Your Shopping Bags is Empty !</p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>

            </div>
            
            <!-- party order section details with each tab level -->
            <div ng-if="requestedSectionName==='partyorder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_SectionContainerDivClass">
                
                <!-- party order all section header title -->
                <div scroll-horizontally-partyorder-allsectionheader-directive id='po_AllSectionHeaderContainerDivId' class='po_AllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_togglePartyOrderSectionList('createpartyorder', 'po_EachTabLabelSectionContainerLIId1', 'po_AllSectionHeaderContainerDivClass');" title='Click to request new party order' id='po_EachTabLabelSectionContainerLIId1' class='po_EachTabLabelSectionContainerLIClass po_SelectedTabLabelSectionContainerLIClass'>
                        Create
                    </li>
                    <li ng-click="uca_togglePartyOrderSectionList('allorders', 'po_EachTabLabelSectionContainerLIId2', 'po_AllSectionHeaderContainerDivClass');" title='Click to view all orders' id='po_EachTabLabelSectionContainerLIId2' class='po_EachTabLabelSectionContainerLIClass'>
                        All Orders
                    </li>
                    <li ng-click="uca_togglePartyOrderSectionList('partyordermsg', 'po_EachTabLabelSectionContainerLIId3', 'po_AllSectionHeaderContainerDivClass');" title='Click to view all orders' id='po_EachTabLabelSectionContainerLIId3' class='po_EachTabLabelSectionContainerLIClass'>
                        Message
                    </li>
                    <li ng-click="uca_togglePartyOrderSectionList('partyordervideo', 'po_EachTabLabelSectionContainerLIId4', 'po_AllSectionHeaderContainerDivClass');" title='Click to view all orders' id='po_EachTabLabelSectionContainerLIId4' class='po_EachTabLabelSectionContainerLIClass'>
                        Video
                    </li>
                </div>
                
                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
                <!-- requesting new party order content form will be displayed -->
                <div ng-if="displayPartyOrderInfoSectionType==='createpartyorder'" ng-controller="PartyOrdersController" ng-init="attachedFieldValidationPartyOrdersRequest()" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 po_createSectionDivClass'>
                    
                    <!-- party order form content -->
                    <div ng-show="isShowPartyOrderRequestFormContent" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 po_formContentWrappperContainerDivClass">
                        <p class="po_formHeaderPClass">
                            <i class="fa fa-smile-o po_smileIconClass"></i> Hey please fill-up this form and we will get back within one hours. Party orders request will be accept only for Pune city.
                        </p>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_occasionContainerDivClass">
                            <p class="po_formfieldLabelPClass">
                                <i class="po_formfieldiconclass fa fa-heart-o faa-tada animated"></i> What's the occasion ?
                            </p>
                            <input placeholder="What's the occasion" autocomplete="on" type="text" id='po_occasionTitleInputId' class="form-control po_occasionTitleInputClass">
                            <p class="po_formfieldHintPClass">
                                Eg: Brother Birthday celebration, Mom & Dad Anniversary celebration
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_peopleContainerDivClass">
                            <p class="po_formfieldLabelPClass">
                                <i class="po_formfieldiconclass fa fa-user faa-tada animated"></i> How many awesome people to treat ?
                            </p>
                            <input placeholder="How many awesome people to treat" autocomplete="on" type="text" id='po_nosPeopleInputId' class="form-control po_nosPeopleInputClass">
                            <p class="po_formfieldHintPClass">
                                Eg: 20
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_dateContainerDivClass">
                            <p class="po_formfieldLabelPClass">
                                <i class="po_formfieldiconclass fa fa-calendar faa-tada animated"></i> Party date (YYYY-MM-DD) ?
                            </p>
                            <input placeholder="Party date" autocomplete="on" type="text" id='po_dateInputId' class="form-control po_dateInputClass">
                            <p class="po_formfieldHintPClass">
                                Eg: <?php echo date('Y-m-d');?>
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_venueContainerDivClass">
                            <p class="po_formfieldLabelPClass">
                                <i class="po_formfieldiconclass fa fa-map-marker faa-tada animated"></i> Party venue ?
                            </p>
                            <textarea placeholder="Party venue" autocomplete="on" class='form-control po_venueInputClass' id='po_venueInputId' rows="5" cols="20"></textarea>
                            <p class="po_formfieldHintPClass">
                                Eg: 421302 Bhiwandi
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_requirementsContainerDivClass">
                            <p class="po_formfieldLabelPClass">
                                <i class="po_formfieldiconclass fa fa-envelope faa-tada animated"></i> Enter Requirements
                            </p>
                            <textarea placeholder="Party requirements" autocomplete="on" class='form-control po_messageInputClass' id='po_messageInputId' rows="5" cols="20"></textarea>
                            <p class="po_formfieldHintPClass">
                                Eg: Cakes,Chocolates,Sweets,Ice-cream, birthday party etc...
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
                    
                    <!-- thank you party order requested message content -->
                    <div ng-show="isShowPartyOrderRequestSendThankyouMsg" ng-controller="PartyOrdersController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_thankyouContentWrapperDivClass">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 po_thankyouContentWrapperContainerDivClass">
                            <p class="po_thankyoubodyPClass">
                                <i class="fa fa-smile-o po_thankyousmileIconClass"></i> 
                                Hurrah! Your details have been submitted & request party order no: {{requestedPartyOrderNo}}
                                Let’s begin the party order preparations.
                            </p>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <button ng-click="toggleNewPartyOrderRequestFormContent()" class='btn redirectToViewPartyOrderRequestBtnClass' id='partyOrderRequestSubmtBtnId'>
                                    Another Party Order Request
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            

            </div>

        </div>    

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <!-- checking user account is active in session or not -->
        <div ng-controller="UsersController" ng-init="checkUserCAccountIsActiveInSession()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- checking which section is requested by end user for showing purpose  -->
        <div ng-controller="UCustomerController" ng-init="checkRequestedSectionAvailableToAccessInUserCAccount()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- refresh web application data -->
        <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php
        include "loadAllJsCssFile.php";
        ?>

    </body>

</html>


