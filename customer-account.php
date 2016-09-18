
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
    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('accountSignUpSignIn');">

        <!-- first header -->
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 fHeaderContainerDivClass {{stickNtStickWebAppHeaderClass}}">
           
            <!-- web logo header--->
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
                            <div ng-repeat="userInfoEachSectionListArrObj in userInfoAllSectionListArrObj" title="{{userInfoEachSectionListArrObj.hoverTitle}}" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount(userInfoEachSectionListArrObj.sectionName);">
                                {{userInfoEachSectionListArrObj.displayTitle}}
                            </div>
                        </div>
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-click="signOutUser()" ng-controller="UCustomerController" title="Click here to log out from desserts khazana account">
                        <i class="fa fa-sign-out"></i> Log Out
                    </li>
                </ul>
            </div>
            
        </div>

        <!-- header row border div class -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeaderRowBorderDivClass"></div>

        <!-- my-account body content-->
        <div ng-show="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_bodyDivClass">
            
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
                        {{loggedUserName}}
                    </li>
                    <li class='customerBreadcrumbLIClass'>
                        |
                    </li>
                    <li class='customerBreadcrumbLIClass'>
                        {{displayedSectionName}}
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
                <p ng-if="ordercartItemRequestedCount>0" class='uca_ordercartSectionMsgPClass'>
                    <i class="fa fa-shopping-basket ordercartRequestedItemShoppingBagIconClass"></i> 
                    Your shopping bags contains 
                    (Items: {{ordercartItemRequestedCount}}, Subtotal Rs: {{subtotalOrderAmt}},
                    Total Delivery Rs: {{totalDeliveryFee}}, Total Amt Rs: {{totalOrderAmt}})
                    <button class='btn uca_ordercartSectionCheckoutBtnClass'>
                        CHECKOUT
                    </button>
                </p>
                <p ng-if="ordercartItemRequestedCount<=0" class='uca_ordercartSectionMsgPClass'>
                    <i class="fa fa-shopping-basket ordercartRequestedItemShoppingBagIconClass"></i> 
                    Your shopping bags is empty !!! 
                </p>

                <!-- order cart all section header title -->
                <div horizontally-scrollable-ordercart-allsectionheader-directive id='uca_ordercartAllSectionHeaderContainerDivId' class='uca_ordercartAllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_toggleOrdercartSectionList('requestitem', 'uca_ordercartEachTabLabelSectionContainerLIId1', 'uca_ordercartAllSectionHeaderContainerDivClass');" title='Click to view all shopping item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId1' class='uca_ordercartEachTabLabelSectionContainerLIClass uca_ordercartSelectedTabLabelSectionContainerLIClass'>
                        Shopping Items
                    </li>
                    <li ng-click="uca_toggleOrdercartSectionList('cancelledordered', 'uca_ordercartEachTabLabelSectionContainerLIId3', 'uca_ordercartAllSectionHeaderContainerDivClass');" title='Click to view all ordered item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId3' class='uca_ordercartEachTabLabelSectionContainerLIClass'>
                        Cancelled Ordered
                    </li>
                    <li ng-click="uca_toggleOrdercartSectionList('allordered', 'uca_ordercartEachTabLabelSectionContainerLIId2', 'uca_ordercartAllSectionHeaderContainerDivClass');" title='Click to view all ordered item(s)' id='uca_ordercartEachTabLabelSectionContainerLIId2' class='uca_ordercartEachTabLabelSectionContainerLIClass'>
                        All Ordered
                    </li>
                </div>

                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

                <!-- requested order cart all items info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='requestitem'" ng-controller="UCustomerController" ng-init="populateOrdercartRequestedItemList('R')" id='uca_ordercartRequestedAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedAllStoreWiseSectionDivClass'>
                    <!-- all store with all items display -->
                    <div ng-repeat="eachStoreAllItemDataObj in ordercartRequestedAllStoreWiseData" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedEachStoreWiseSectionDivClass'>
                        <!-- each store basic info display -->
                        <div class="uca_ordercartRequestedEachStoreBasicInfoDivClass">
                            <p class="uca_ordercartRequestedEachStoreNamePClass">
                                Bags Contains 
                                <span class="badge ordercartRequestedEachStoreAllItemCountSClass">{{eachStoreAllItemDataObj.totalItems}}</span> Items
                                from '{{eachStoreAllItemDataObj.shopStoreTitle}}' store
                            </p>
                            <p class="uca_ordercartRequestedEachStoreDeliveryLocationFromToPClass">
                                Order will be deliver from '{{eachStoreAllItemDataObj.storeLocatedAreaName}}' to '{{eachStoreAllItemDataObj.deliveryAreaname}}'
                            </p>
                            <p class="uca_ordercartRequestedEachStoreDeliveryFeePClass">
                                {{eachStoreAllItemDataObj.applicableStoreDeliveryFeeMsg}}
                            </p>
                            <p class="uca_ordercartRequestedEachStoreSubtotalAmtPClass">
                                Subtotal Amt: {{eachStoreAllItemDataObj.subtotalamount}} ({{eachStoreAllItemDataObj.totalItems}} Items)
                            </p>
                            <p class="uca_ordercartRequestedEachStoreApplyDeliveryFeePClass">
                                Delivery Fee: {{eachStoreAllItemDataObj.apply_deliveryFee}}
                            </p>
                            <p class="uca_ordercartRequestedEachStoreTotalAmtPClass">
                                Total Amt: {{eachStoreAllItemDataObj.totalamount}}
                            </p>
                            <p ng-click="uca_toggleOrdercartRequestedStoreItemsList(eachStoreAllItemDataObj);" class="uca_ordercartRequestedEachStoreToggleItemsAddedLblPClass">
                                Show Added Items In Cart 
                                <i class="{{eachStoreAllItemDataObj.isShowItemList===false?'fa fa-chevron-circle-up':'fa fa-chevron-circle-down'}}"></i>
                            </p>
                        </div>
                        <!-- each store all items will be display -->
                        <div ng-show='eachStoreAllItemDataObj.isShowItemList' ng-repeat="eachItemDataObj in eachStoreAllItemDataObj['allItemsData']" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedEachStoreItemDivClass uca_ordercartRequestedEachStoreItemDivClass{{eachItemDataObj.orderStoreItemId}}'>
                            <p class="uca_ordercartRequestedEachStoreItemNamePClass">
                                {{eachItemDataObj.productListTitle}}
                            </p>
                            <p class="uca_ordercartRequestedEachStoreItemSizePClass">
                                Size: {{eachItemDataObj.size}}
                            </p>
                            <p class='uca_ordercartRequestedEachStoreItemPricePClass'> 
                                <span class='uca_ordercartRequestedEachStoreItemPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> {{eachItemDataObj.price}}
                                </span>
                                <span class='uca_ordercartRequestedEachStoreItemCutPriceTextSClass' ng-if="eachItemDataObj.productFeatureBasePrice!==''">
                                    <i class="fa fa-rupee"></i> {{eachItemDataObj.productFeatureBasePrice}}
                                </span>
                                <span class='uca_ordercartRequestedEachStoreItemDiscountPercentTextSClass' ng-if="eachItemDataObj.productFeatureDiscount!==''">
                                    {{eachItemDataObj.productFeatureDiscount}}%
                                </span>
                            </p>
                            <p class="uca_ordercartRequestedEachStoreItemQtyPClass">
                                Qty
                                <input product-qty-input-directive type='text' ng-value="{{eachItemDataObj.qty}}" class='form-control ordercartRequestedEachItemInputQtyClass'>
                            </p>
                            <p class="uca_ordercartRequestedEachStoreItemTotalAmtPClass">
                                Total Amt: {{eachItemDataObj.totalamount}}
                            </p>
                            <p class="uca_ordercartRequestedEachStoreItemOperationPClass">
                                <button ng-click="checkProductDataToUdateInOrdercart(eachItemDataObj, 'uca_ordercartRequestedEachStoreItemDivClass'+eachItemDataObj.orderStoreItemId);" class='btn ordercartRequestedEachItemUpdateBtnClass'>
                                    UPDATE
                                </button>
                                <button ng-click="removeItemOrdercart(eachItemDataObj);" class='btn ordercartRequestedEachItemRemoveBtnClass'>
                                    REMOVE
                                </button>
                                <button class='btn ordercartRequestedEachItemCheckoutBtnClass'>
                                    CHECKOUT
                                </button>
                            </p>
                        </div>
                    </div>
                    <!-- order cart requested summary display -->
                    <div ng-if="ordercartRequestedAllStoreWiseData.length>0" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedSummaryDivClass'>
                        <p class="uca_ordercartRequestedSummaryHeaderPClass">
                            <i class="fa fa-shopping-basket"></i> CART SUMMARY
                        </p>
                        <p class="uca_ordercartRequestedSummaryAllStoreCountLblPClass">
                            Total Stores : {{totalStores}}
                        </p>
                        <p class="uca_ordercartRequestedSummarySubtotalLblPClass">
                            Subtotal Amt(Rs) : {{subtotalOrderAmt}}
                        </p>
                        <p class="uca_ordercartRequestedSummaryDeliveryFeeLblPClass">
                            Total Delivery Fee(Rs) : {{totalDeliveryFee}}
                        </p>
                        <p class="uca_ordercartRequestedSummaryTotalAmtLblPClass">
                            Total Amt(Rs) : {{totalOrderAmt}}
                        </p>
                        <p class="uca_ordercartRequestedSummaryOperationPClass">
                            <button class='btn ordercartRequestedSummaryCheckoutBtnClass'>
                                CHECKOUT
                            </button>
                        </p>
                    </div>
                    <!-- no ordered requested item found message div -->
                    <div ng-if="ordercartRequestedAllStoreWiseData<=0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartRequestedAllStoreNotFoundMsgDivClass">
                        <p class="ordercartEmptyPClass">
                            <i class="fa fa-smile-o"></i> Your Shopping Bags is Empty !!!
                        </p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>
                
                <!-- canceled order cart all items info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='cancelledordered'" ng-controller="OrderCartController" ng-init="populateOrdercartCancelledItemList('ZC,ZA')" id='uca_ordercartCancelledAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledAllItemListSectionDivClass'>
                    <!-- all order cart info display -->
                    <div ng-repeat="eachOrdercartDataObj in allOrdercartWiseCancelledData" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_eachOrdercartWiseCancelledSectionDivClass'>
                        <!-- each order cart info display -->
                        <div class="uca_eachOrdercartWiseCancelledBasicInfoDivClass">
                            <p class="uca_eachOrdercartWiseCancelledHeaderInfoPClass">
                                Order cart '{{eachOrdercartDataObj.humanReadableOrdercartId}}' contains
                                <span class="badge ordercartCancelledAllItemCountSClass">{{eachOrdercartDataObj.totalItems}}</span> cancelled items
                            </p>
                            <p ng-click="uca_toggleOrdercartCancelledItemsList(eachOrdercartDataObj);" class="uca_ordercartToggleCancelledItemsLblPClass">
                                Show Cancelled Items In Cart 
                                <i class="{{eachOrdercartDataObj.isShowItemList===false?'fa fa-chevron-circle-up':'fa fa-chevron-circle-down'}}"></i>
                            </p>
                        </div>
                        <!-- each items will be display -->
                        <div ng-show='eachOrdercartDataObj.isShowItemList' ng-repeat="eachItemDataObj in eachOrdercartDataObj['allItemsData']" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledEachItemDivClass'>
                            <p class="uca_ordercartCancelledItemNamePClass">
                                {{eachItemDataObj.productListTitle}}
                            </p>
                            <p class="uca_ordercartCancelledItemSizePClass">
                                Size: {{eachItemDataObj.size}}
                            </p>
                            <p class='uca_ordercartCancelledItemPricePClass'> 
                                <span class='uca_ordercartCancelledItemPriceTextSClass'>
                                    <i class="fa fa-rupee"></i> {{eachItemDataObj.price}}
                                </span>
                            </p>
                            <p class="uca_ordercartCancelledItemQtyPClass">
                                Bought Qty: {{eachItemDataObj.qty}}
                            </p>
                            <p class="uca_ordercartCancelledItemTotalAmtPClass">
                                Total Amt: {{eachItemDataObj.totalamount}}
                            </p>
                        </div>
                    </div>
                    <!-- no canceled ordered item found message div -->
                    <div ng-if="allOrdercartWiseCancelledData<=0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartCancelledItemNotFoundMsgDivClass">
                        <p class="ordercartEmptyPClass">
                            <i class="fa fa-smile-o"></i> No Cancelled Items Found !!!
                        </p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>
                
                <!-- ordered order cart all items info will be displayed -->
                <div ng-if="displayOrdercartSectionType==='allordered'" ng-controller="OrderCartController" ng-init="populateOrdercartAllOrderedItemList('all_ordered')" id='uca_ordercartOrderedAllItemListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartOrderedAllItemListSectionDivClass'>
                    <!-- all order cart info display -->
                    <div ng-repeat="eachOrdercartDataObj in allOrdercartWiseOrderedData" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_eachOrdercartWiseOrderedSectionDivClass'>
                        <!-- each order cart info display -->
                        <div class="uca_eachOrdercartWiseOrderedBasicInfoDivClass">
                            <p class="uca_eachOrdercartWiseOrderedHeaderInfoPClass">
                                Order cart '{{eachOrdercartDataObj.humanReadableOrdercartId}}' contains
                                <span class="badge ordercartOrderedAllStoreCountSClass">{{eachOrdercartDataObj.totalStores}}</span> stores items
                            </p>
                            <div ng-repeat="eachStoreDataObj in eachOrdercartDataObj['allStoresData']" class="uca_eachOrdercartWiseOrderedStoreBasicInfoDivClass">
                                <p ng-click="uca_toggleOrdercartOrderedItemsList(eachStoreDataObj);" class="uca_ordercartToggleOrderedItemsLblPClass">
                                    <i class='fa fa-arrow-right'></i> {{eachStoreDataObj.shopStoreTitle}} - '{{eachStoreDataObj.deliveryFromToAreaName}}'
                                    <i class="{{eachStoreDataObj.isShowItemList===false?'fa fa-chevron-circle-up':'fa fa-chevron-circle-down'}}"></i>
                                </p>
                                <!-- each items will be display -->
                                <div ng-show='eachStoreDataObj.isShowItemList' ng-repeat="eachItemDataObj in eachStoreDataObj['allItemsData']" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartOrderedEachItemDivClass'>
                                    <p class="uca_ordercartOrderedItemNamePClass">
                                        {{eachItemDataObj.productListTitle}}
                                    </p>
                                    <p class="uca_ordercartOrderedItemSizePClass">
                                        Size: {{eachItemDataObj.size}}
                                    </p>
                                    <p class='uca_ordercartOrderedItemPricePClass'> 
                                        <span class='uca_ordercartOrderedItemPriceTextSClass'>
                                            <i class="fa fa-rupee"></i> {{eachItemDataObj.price}}
                                        </span>
                                    </p>
                                    <p class="uca_ordercartOrderedItemQtyPClass">
                                        Bought Qty: {{eachItemDataObj.qty}}
                                    </p>
                                    <p class="uca_ordercartOrderedItemTotalAmtPClass">
                                        Total Amt: {{eachItemDataObj.totalamount}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- no ordered item found message div -->
                    <div ng-if="allOrdercartWiseOrderedData<=0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_ordercartOrderedItemNotFoundMsgDivClass">
                        <p class="ordercartEmptyPClass">
                            <i class="fa fa-smile-o"></i> Your Shopping Bags is Empty !!!
                        </p>
                        <p>
                            <i class="fa fa-shopping-basket shoppingBagsIconClass"></i>
                        </p>
                        <a class='btn startShoppingBtnClass' href="<?php echo $BaseSitePath;?>">Start Shopping</a>
                    </div>
                </div>

            </div>
            
            
            <!-- share offers section details with each tab level -->
            <div ng-if="requestedSectionName==='shareoffers'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_shareoffersSectionContainerDivClass">
                
                <!-- sharing offers note-->
                <p class='sharingOffersNotePClass'>
                    Note: Offers can be share to your friends/colleague/family members by just typing 10 digits mobile no.s
                </p>
                
                <!-- share offers all section header title -->
                <div scroll-horizontally-shareoffers-allsectionheader-directive id='uca_shareoffersAllSectionHeaderContainerDivId' class='uca_shareoffersAllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_toggleShareoffersSectionList('availableshareoffers', 'uca_shareoffersEachTabLabelSectionContainerLIId1', 'uca_shareoffersAllSectionHeaderContainerDivClass');" title='Click to view all available share offers ' id='uca_shareoffersEachTabLabelSectionContainerLIId1' class='uca_shareoffersEachTabLabelSectionContainerLIClass uca_shareoffersSelectedTabLabelSectionContainerLIClass'>
                        Offers Sharing
                    </li>
                    <li ng-click="uca_toggleShareoffersSectionList('alloffersshared', 'uca_shareoffersEachTabLabelSectionContainerLIId2', 'uca_shareoffersAllSectionHeaderContainerDivClass');" title='Click to view all offers shared by you' id='uca_shareoffersEachTabLabelSectionContainerLIId2' class='uca_shareoffersEachTabLabelSectionContainerLIClass'>
                        Offers Shared 
                    </li>
                </div>

                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

                <!-- all offers can be share info will be displayed -->
                <div ng-if="displayShareOffersSectionType==='availableshareoffers'" ng-controller="UCustomerController" ng-init="populateUserSharingDiscountCouponList()" id='uca_userSharingAllDiscountCouponListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_userSharingAllDiscountCouponListDivClass'>
                    
                    <!-- share offers can be filtering -->
                    <div ng-if="userSharingAllDiscountCouponDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextSharingOffersDivClass">
                        <label class="searchTextSharingoffersILblClass">Use for filtering and access fast offers sharing to your colleagues/friends !</label>
                        <input ng-model="searchTextSharingoffers" type="text" class="form-control" placeholder="Find offers to share with your friends/colleagues !">
                    </div>
                    
                    <!-- each sharing offers will display -->
                    <div ng-repeat="userSharingEachDiscountCouponDetailsArrObj in userSharingAllDiscountCouponDetailsArrObj | filter:searchTextSharingoffers:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_userSharingEachDiscountCouponListDivClass uca_userSharingEachDiscountCouponListDivClass{{$index}}">
                        <p class="sharingOffersMsgPClass">
                            {{userSharingEachDiscountCouponDetailsArrObj.displayDiscountCouponMsg}}
                        </p>
                        <p class="sharingOffersLimitPClass">
                            Sharing Limit: {{userSharingEachDiscountCouponDetailsArrObj.shareLimit}}
                        </p>
                        <p class="sharingOffersRemainingLimitPClass">
                            Limit Remain: {{userSharingEachDiscountCouponDetailsArrObj.remainingShareLimt}}
                        </p>
                        <p class="sharingOffersExpiryDateTimePClass">
                            Limit Expire On: {{userSharingEachDiscountCouponDetailsArrObj.expiredDateTime}}
                        </p>
                        <p class="sharingOffersOperationPClass">
                            <input type='text' class='form-control sharingOffersUsersMobileInputClass' placeholder='Type 10 digits mobile no.s for offers sharing !'>
                            <button ng-click="checkDataToShareOffersToOtherUser(userSharingEachDiscountCouponDetailsArrObj, 'uca_userSharingEachDiscountCouponListDivClass'+$index);" class='btn sharingOffersBtnClass'>
                                SHARE OFFERS
                            </button>
                        </p>
                    </div>
                    
                    <!-- no offers available for sharing purpose -->
                    <div ng-if="userSharingAllDiscountCouponDetailsArrObj==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_noSharingOffersFoundDivClass">
                        <p class="noSharingOffersFoundMsgPClass">
                            No offers available for you or remain to share with your friends/colleagues !
                        </p>
                    </div>
                    
                </div>
                
                <!-- all shared offers info will be displayed -->
                <div ng-if="displayShareOffersSectionType==='alloffersshared'" ng-controller="UCustomerController" ng-init="populateUserSharedDiscountCouponList()" id='uca_sharedOffersListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_allSharedOffersListSectionDivClass'>
                    
                    <!-- shared offers will be filtering -->
                    <div ng-if="userSharedAllDiscountCouponDetailsArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextSharedoffersDivClass">
                        <label class="searchTextSharedOffersLblClass">
                            Use for filtering and access fast shared offers details !
                        </label>
                        <input ng-model="searchTextSharedoffers" type="text" class="form-control" placeholder="Find shared offers !">
                    </div>
                    
                    <!-- display shared offers wise all other users details -->
                    <div ng-repeat="eachUserSharedDiscountCouponAllUserArrObj in userSharedAllDiscountCouponDetailsArrObj| filter:searchTextSharedoffers:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_eachSharedOffersSectionContainerDivClass">
                        
                        <!-- create horizontally space div between -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
                
                        <p class="uca_sharedoffersWiseAllUserListSectionLabelPClass">
                            Promo code '{{eachUserSharedDiscountCouponAllUserArrObj.dcgCode}}' has been shared by you to others   
                            <span class="badge uca_sharedofferwiseAllUsersCountSClass">
                                {{eachUserSharedDiscountCouponAllUserArrObj.countAllUserList}}
                            </span>
                            friends/colleague
                        </p>
                        
                        <!-- each shared offers user info will display -->
                        <div ng-repeat="userDetailsObj in eachUserSharedDiscountCouponAllUserArrObj.sharedOffersAllUserDetails | filter:searchTextSharedoffers:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_sharedOffersWiseEachUserDivClass">
                            <p class='sharedOffersMobilePClass'>
                                On Mobile: {{userDetailsObj.sharedOnMobile}}
                            </p>
                            <p class='sharedOffersDatetimeClass'>
                                Shared Datetime: {{userDetailsObj.sharedOnDateTime}}
                            </p>
                        </div>
                        
                    </div>
                    
                    <!-- not shared any offers by you -->
                    <div ng-if="userSharedAllDiscountCouponDetailsArrObj==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 uca_noSharedOffersFoundDivClass">
                        <p class="noSharedOffersFoundMsgPClass">
                            No shared offers found !
                        </p>
                    </div>
                    
                </div>

            </div>
            
            <!-- party order section details with each tab level -->
            <div ng-if="requestedSectionName==='partyorder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_SectionContainerDivClass">
                
                <!-- party order all section header title -->
                <div horizontally-scrollable-partyorder-allsectionheader-directive id='po_AllSectionHeaderContainerDivId' class='po_AllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_togglePartyOrderSectionList('createpartyorder', 'po_EachTabLabelSectionContainerLIId1', 'po_AllSectionHeaderContainerDivClass');" title='Click to request new party order' id='po_EachTabLabelSectionContainerLIId1' class='po_EachTabLabelSectionContainerLIClass po_SelectedTabLabelSectionContainerLIClass'>
                        Request
                    </li>
                    <li ng-click="uca_togglePartyOrderSectionList('allpartyorders', 'po_EachTabLabelSectionContainerLIId2', 'po_AllSectionHeaderContainerDivClass');" title='Click to view all orders' id='po_EachTabLabelSectionContainerLIId2' class='po_EachTabLabelSectionContainerLIClass'>
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
                            <button ng-click="addPartyOrdersRequest()" class='btn partyOrderRequestSubmitBtnClass' id='partyOrderRequestSubmtBtnId'>
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
                
                <!-- requested order cart all items info will be displayed -->
                <div ng-if="displayPartyOrderInfoSectionType==='allpartyorders'" ng-controller="PartyOrdersController" ng-init="loadPartyOrdersList()" id='allPoListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 allPoListSectionDivClass'>
                    
                    <!-- each party order info will display -->
                    <div ng-repeat="eachPartyOrderDataObj in partyOrderListArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 eachPOListContainerDivClass">
                        <p class="poNoPClass">
                            YOUR PARTY ORDER NO - '{{eachPartyOrderDataObj.partyOrderNo}}'
                        </p>
                        <p class="poStatusPClass">
                            Last Status: {{eachPartyOrderDataObj.porLongStatusMsg}}
                        </p>
                        <p class="poOccassionPClass">
                            Occassion: {{eachPartyOrderDataObj.occassionTitle}}
                        </p>
                        <p class="poPersonPClass">
                            Include Person: {{eachPartyOrderDataObj.nosOfPerson}}
                        </p>
                        <p class="poDatePClass">
                            Date: {{eachPartyOrderDataObj.partyDate}}
                        </p>
                        <p class="poVenuePClass">
                            Venue: {{eachPartyOrderDataObj.partyVenue}}
                        </p>
                        <p class="poRequirementsPClass">
                            Requirements: {{eachPartyOrderDataObj.partyRequirements}}
                        </p>
                        <p class="poEstimatedAmtPClass">
                            Estimated Budget (Rs): {{eachPartyOrderDataObj.estimatedBudget}}
                        </p>
                        <p ng-if="eachPartyOrderDataObj.porStatus=='PP'" class="poRequirementsPClass">
                            <button ng-click="checkProductDataToUdateInOrdercart(ordercartRequestedEachItemDetailsArrObj);" class='btn poPaymentAcceptanceBtnClass'>
                                MAKE PAYMENT (Rs: {{eachPartyOrderDataObj.confirmedAmt}})
                            </button>
                        </p>
                        <p ng-click="togglePOLogList(eachPartyOrderDataObj);" ng-if="eachPartyOrderDataObj.poLogCount!=='0'" class="poLogLblPClass">
                            Show further consveration details 
                            <i class="{{eachPartyOrderDataObj.isShowLogList===false?'fa fa-chevron-circle-up':'fa fa-chevron-circle-down'}}"></i>
                        </p>
                        <hr class='eachPOListHrClass' ng-show="eachPartyOrderDataObj.isShowLogList" ng-if="eachPartyOrderDataObj.poLogCount!=='0'">
                        <!-- party order log details display here -->
                        <div ng-show="eachPartyOrderDataObj.isShowLogList" ng-if="eachPartyOrderDataObj.poLogCount!=='0'" ng-repeat="eachPartyOrderLogDataObj in eachPartyOrderDataObj.poLogDetails" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 eachPOListLogContainerDivClass">
                            {{eachPartyOrderLogDataObj.poLogMemberLabel}}: {{eachPartyOrderLogDataObj.poLogDescription}} - {{eachPartyOrderLogDataObj.lastUpdatedTime}} 
                        </div>
                        
                    </div>
                    
                    <!-- no party order list found message div -->
                    <div ng-if="partyOrderListArrObj<=0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p class="shoppingBagsEmptyPClass">To request party order click on 'Request' tab !</p>
                    </div>
                    
                </div>
                

            </div>
            
            <!-- customize order section details with each tab level -->
            <div ng-if="requestedSectionName==='customizeorder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_SectionContainerDivClass">
                
                <!-- customize order all section header title -->
                <div scroll-horizontally-customizeorder-allsectionheader-directive id='co_AllSectionHeaderContainerDivId' class='co_AllSectionHeaderContainerDivClass'>
                    <li ng-click="uca_toggleCustomizeOrderSectionList('createcustomizeorder', 'co_EachTabLabelSectionContainerLIId1', 'co_AllSectionHeaderContainerDivClass');" title='Click to request new customize order' id='co_EachTabLabelSectionContainerLIId1' class='co_EachTabLabelSectionContainerLIClass co_SelectedTabLabelSectionContainerLIClass'>
                        Create
                    </li>
                    <li ng-click="uca_toggleCustomizeOrderSectionList('allcustomizeorders', 'co_EachTabLabelSectionContainerLIId2', 'co_AllSectionHeaderContainerDivClass');" title='Click to view all orders' id='co_EachTabLabelSectionContainerLIId2' class='co_EachTabLabelSectionContainerLIClass'>
                        All Orders
                    </li>
                    <li ng-click="uca_toggleCustomizeOrderSectionList('customizeordermsg', 'co_EachTabLabelSectionContainerLIId3', 'co_AllSectionHeaderContainerDivClass');" title='Click to view content' id='co_EachTabLabelSectionContainerLIId3' class='co_EachTabLabelSectionContainerLIClass'>
                        Message
                    </li>
                    <li ng-click="uca_toggleCustomizeOrderSectionList('customizeordervideo', 'co_EachTabLabelSectionContainerLIId4', 'co_AllSectionHeaderContainerDivClass');" title='Click to view video' id='co_EachTabLabelSectionContainerLIId4' class='co_EachTabLabelSectionContainerLIClass'>
                        Video
                    </li>
                </div>
                
                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
                <!-- requesting new customize order content form will be displayed -->
                <div ng-if="displayCustomizeOrderInfoSectionType==='createcustomizeorder'" ng-controller="CustomizeOrdersController" ng-init="attachedFieldValidationCustomizeOrdersRequest()" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 co_createSectionDivClass'>
                    
                    <!-- customize order form content -->
                    <div ng-show="isShowCustomizeOrderRequestFormContent" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 co_formContentWrappperContainerDivClass">
                        <p class="co_formHeaderPClass">
                            <i class="fa fa-smile-o co_smileIconClass"></i> Hey please fill-up this form and we will get back within one hours. Customize orders request will be accept only for Pune city.
                        </p>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_occasionContainerDivClass">
                            <p class="co_formfieldLabelPClass">
                                <i class="co_formfieldiconclass fa fa-heart-o faa-tada animated"></i> What's the event ?
                            </p>
                            <input placeholder="What's the event" autocomplete="on" type="text" id='co_occasionTitleInputId' class="form-control co_occasionTitleInputClass">
                            <p class="co_formfieldHintPClass">
                                Eg: Brother Birthday celebration, Mom & Dad Anniversary celebration
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_peopleContainerDivClass">
                            <p class="co_formfieldLabelPClass">
                                <i class="co_formfieldiconclass fa fa-user faa-tada animated"></i> How many awesome people in event ?
                            </p>
                            <input placeholder="How many awesome people in event" autocomplete="on" type="text" id='co_nosPeopleInputId' class="form-control co_nosPeopleInputClass">
                            <p class="co_formfieldHintPClass">
                                Eg: 20
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_dateContainerDivClass">
                            <p class="co_formfieldLabelPClass">
                                <i class="co_formfieldiconclass fa fa-calendar faa-tada animated"></i> Event date (YYYY-MM-DD) ?
                            </p>
                            <input placeholder="Event date" autocomplete="on" type="text" id='co_dateInputId' class="form-control co_dateInputClass">
                            <p class="co_formfieldHintPClass">
                                Eg: <?php echo date('Y-m-d');?>
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_venueContainerDivClass">
                            <p class="co_formfieldLabelPClass">
                                <i class="co_formfieldiconclass fa fa-map-marker faa-tada animated"></i> Event venue ?
                            </p>
                            <textarea placeholder="Event venue" autocomplete="on" class='form-control co_venueInputClass' id='co_venueInputId' rows="5" cols="20"></textarea>
                            <p class="co_formfieldHintPClass">
                                Eg: 421302 Bhiwandi
                            </p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_requirementsContainerDivClass">
                            <p class="co_formfieldLabelPClass">
                                <i class="co_formfieldiconclass fa fa-envelope faa-tada animated"></i> Enter Requirements
                            </p>
                            <textarea placeholder="Event requirements" autocomplete="on" class='form-control co_messageInputClass' id='co_messageInputId' rows="5" cols="20"></textarea>
                            <p class="co_formfieldHintPClass">
                                Eg: Cakes,Chocolates,Sweets,Ice-cream, birthday party etc...
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
                    
                    <!-- thank you customize order requested message content -->
                    <div ng-show="isShowCustomizeOrderRequestSendThankyouMsg" ng-controller="CustomizeOrdersController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_thankyouContentWrapperDivClass">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 co_thankyouContentWrapperContainerDivClass">
                            <p class="co_thankyoubodyPClass">
                                <i class="fa fa-smile-o po_thankyousmileIconClass"></i> 
                                Hurrah! Your details have been submitted & request customize order no: {{requestedCustomizeOrderNo}}
                                Let’s begin the customize order preparations.
                            </p>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <button ng-click="toggleNewCustomizeOrderRequestFormContent()" class='btn redirectToViewCustomizeOrderRequestBtnClass' id='customizeOrderRequestSubmtBtnId'>
                                    Another Customize Order Request
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <!-- requested customize cart all items info will be displayed -->
                <div ng-if="displayCustomizeOrderInfoSectionType==='allcustomizeorders'" ng-controller="CustomizeOrdersController" ng-init="getCustomizeOrdersList()" id='allCoListSectionDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 allCoListSectionDivClass'>
                    
                    <!-- all customizee order will be filtering -->
                    <div ng-if="customizeOrderListArrObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 inputSearchTextPODivClass">
                        <label class="searchTextPOLblClass">Use for filtering and access fast party order details !</label>
                        <input ng-model="searchTextCO" type="text" class="form-control" placeholder="Track party order details !">
                    </div>
                    
                    <!-- each customize order will display -->
                    <div ng-repeat="eachCustomizeOrderDetailsArrObj in customizeOrderListArrObj | filter:searchTextCO:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 eachPOContainerDivClass">
                        <p class="coNoPClass">
                            Order No: {{eachCustomizeOrderDetailsArrObj.customizeOrderNo}}
                        </p>
                        <p class="coStatusPClass">
                            Status: {{eachCustomizeOrderDetailsArrObj.cortLongStatusMsg}}
                        </p>
                        <p class="coOccassionPClass">
                            Event: {{eachCustomizeOrderDetailsArrObj.eventTitle}}
                        </p>
                        <p class="coPersonPClass">
                            Person: {{eachCustomizeOrderDetailsArrObj.nosOfPerson}}
                        </p>
                        <p class="coDatePClass">
                            Date: {{eachCustomizeOrderDetailsArrObj.eventDate}}
                        </p>
                        <p class="coVenuePClass">
                            Venue: {{eachCustomizeOrderDetailsArrObj.eventVenue}}
                        </p>
                        <p class="coRequirementsPClass">
                            Requirements: {{eachCustomizeOrderDetailsArrObj.eventRequirements}}
                        </p>
                        <p class="coEstimatedAmtPClass">
                            Estimated Amt(Rs): {{eachCustomizeOrderDetailsArrObj.estimatedAmt}}
                        </p>
                        <p ng-if="eachCustomizeOrderDetailsArrObj.corStatus=='PP'" class="coRequirementsPClass">
                            <button class='btn ordercartRequestedEachItemUpdateBtnClass'>
                                MAKE PAYMENT (Rs: {{eachCustomizeOrderDetailsArrObj.confirmedAmt}})
                            </button>
                        </p>
                    </div>
                    
                    <!-- no party order found message div -->
                    <div ng-if="customizeOrderListArrObj==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p class="shoppingBagsEmptyPClass">To request customize order click on 'Create' tab !</p>
                    </div>
                </div>
                

            </div>

        </div>    

        
        
        
        
        
        
        
        
        
        
        <!-- refresh web application data -->
        <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- checking which section is requested by end user for showing purpose  -->
        <div ng-controller="UCustomerController" ng-init="checkRequestedSectionAvailableToAccessInUserCAccount()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php
            include "loadAllJsCssFile.php";
        ?>

    </body>

</html>


