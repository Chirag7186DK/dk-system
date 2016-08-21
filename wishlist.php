
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
    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('wishlist'); checkInBackgroundDataAvailableForUpdationFromSession('wishlist');">
    
        <!-- common SCROLL TOP BUTTON -->
        <a class="scrollToTopBtnClass" ng-show="isShowScrollToTopBtnWebAppPage" href="#" title='Click to scroll up page'>
            <i class="fa fa-angle-up"></i>
        </a>

        <!-- first header -->
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 fHeaderContainerDivClass {{stickNtStickWebAppHeaderClass}}">
            
            <!-- web logo --->
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
                    <li ng-controller="UsersController" title="Click here to view your current order cart all item(s)" ng-click="ordercartItemRequestedCount>0 && storeRequestedSectionNameToAccessInUserAccount('ordercart');">
                        <i class="fa fa-shopping-basket"></i> (Item: {{ordercartItemRequestedCount}}, Rs: {{subtotalOrderAmt}})
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

        <!-- wish list body content-->
        <div ng-controller="WishListController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wl_bodyDivClass">
            
            <!-- customer bread crumb -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wl_userBreadcrumbDivClass">
                <ul class="wl_userBreadcrumbULClass list-inline">
                    <li class='wl_userBreadcrumbHomeTitleLIClass'>
                        <a href="<?php echo $BaseSitePath; ?>">
                            Home
                        </a>
                    </li>
                    <li class='wl_userBreadcrumbWishListTitleLIClass'>
                        |&nbsp; {{loggedUserName}}
                    </li>
                    <li class='wl_userBreadcrumbWishListTitleLIClass'>
                        |&nbsp; Wishlist
                    </li>
                </ul>
            </div>
            
            <!-- create horizontally space between div -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

            <!-- display wish list setting icon -->
            <div ng-show="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-4 col-lg-3 wld_settingsWLIconContainerDivClass">
                <div ng-click="showUserWL()" class="wld_settingsWLIconDisplayDivClass" title="Click to show your all wish list">
                    <p class="wld_settingsWLIconPClass">
                        <i class="fa fa-cogs wld_settingsWLIconClass"></i>
                    </p>
                    <h2 class="wld_settingsWLIconTitleHClass">
                        SETTINGS ({{wlCount}})
                    </h2>
                </div>
            </div>
            
            <!-- display create wish list icon when he/she is sign-in with authentication details -->
            <div ng-show="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-4 col-lg-3 wld_createWLIconContainerDivClass">
                <div ng-click="toggleUWLCreationFContent()" class="wld_createWLIconDisplayDivClass" title="Click to create new wish list">
                    <p class="wld_createWLIconPClass">
                        <i class="fa fa-plus wld_createWLIconClass"></i>
                    </p>
                    <h2 class="wld_createWLIconTitleHClass">
                        CREATE
                    </h2>
                </div>
            </div>
            
            <!-- display view your wish list icon when he/she is sign-in with authentication details -->
            <div ng-show="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-4 col-lg-3 wld_viewYourWLIconContainerDivClass">
                <div ng-click="showUWLWiseItemDetails()" class="wld_viewYourWLIconDisplayDivClass" title="Click to view all item(s) added in wish list">
                    <p class="wld_viewYourWLIconPClass">
                        <i class="fa fa-list wld_viewYourWLIconClass"></i>
                    </p>
                    <h2 class="wld_viewYourWLIconTitleHClass">
                        ITEM ({{wlmCount}})
                    </h2>
                </div>
            </div>
            
            <!-- display searching window for wish list -->
            <div ng-show="isUserLoggedInSession" class="col-xs-12 col-sm-12 col-md-4 col-lg-3 wld_searchWLFormContentContainerDivClass">
                <div class="wld_searchWLFormContentDisplayDivClass" title="Search your friend/colleagues/family wish list which are publicly avilable">
                    <div class="wld_searchInputDivClass">
                        <input id='searchUWLInput' type="text" class="form-control" placeholder="Type person name or email address"> 
                    </div>
                    <div class="wld_wishListSearchBtnDivClass">
                        <button ng-click="collectDataToSearchUserWLBySearchParam()" class="btn wld_wishListSearchBtnClass">
                            <i class="fa fa-search"></i> SEARCH
                        </button>
                    </div>
                </div>
            </div>

            <!-- user wish list related message div -->
            <div ng-show="isShowWLMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_msgContainerDivClass">
                {{wlMsgStr}}
            </div>
            
            <!-- display logged user wish list settings -->
            <div ng-show="userAllWLArrJsonObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_allWLContainerDivClass">
                <div ng-show="userAllWLArrJsonObj.length>4" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_allWLFilterOperationContainerDivClass">
                    <input ng-model="loggedUserSearchAllWLText" type="text" class="form-control" placeholder="Find items across in your wish list">
                </div>
                <!-- iterate each wish list -->
                <div ng-repeat="userEachWLDataObj in userAllWLArrJsonObj | filter:loggedUserSearchAllWLText:strict" class="col-xs-12 col-sm-12 col-md-3 col-lg-4 wld_eachWLContainerDivClass">
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_eachWLContentDivClass wld_eachWLContentDivClass{{$index}}'>
                        <p class="wld_eachWLSetAsDefaultPClass" ng-if="userEachWLDataObj.isDefaultWLSetting=='Y'">
                            Set as default
                        </p>
                        <p class="wld_eachWLformfieldLabelPClass">
                            Type title
                        </p>
                        <p class="wld_wlTitleContainerPClass">
                            <input title="Change wish list title" type="text" class="form-control wls_wishListTitleInputClass" value="{{userEachWLDataObj.wlTitle}}">
                            <p class='wld_wlTitleContainer_ErrorClass'></p>
                        </p> 
                        <p class="wld_eachWLformfieldLabelPClass">
                            Is default ?
                        </p>
                        <p class="wld_eachWLDefaultSettingsContainerPClass">
                            <select class="btn wld_eachWLDefaultSettingsOptionClass">
                                <option value="N">NO</option>
                                <option value="Y">YES</option>
                            </select>
                        </p> 
                         <p class="wld_eachWLformfieldLabelPClass">
                            Is publicly ?
                        </p>
                        <p class="wld_eachWLPrivacySettingsContainerPClass">
                            <select class="btn wld_eachWLPrivacySettingsOptionClass">
                                <option value="Y">Public</option>
                                <option value="N">Private</option>
                            </select>
                        </p>
                        <p class="wld_eachWLErrorMsgPClass"></p>
                        <p class="wld_redirectToYourWLPClass" ng-click="showUWLWiseItemDetails(userEachWLDataObj)">
                            View your wish list (Item)
                        </p>
                        <p class="wld_eachWLOperationBtnContainerPClass">
                            <button title="Click to apply changes in wish list" ng-click="collectDataUWLUpdation('wld_eachWLContentDivClass'+$index, userEachWLDataObj)" class='btn wld_eachWLSubmitBtnClass' id='wld_eachWLSubmitBtnId'>
                                SUBMIT
                            </button>
                            <button title="Click to remove wish list" ng-click="deleteUserWL(userEachWLDataObj)" class='btn wld_eachWLDeleteBtnClass' id='wld_eachWLDeleteBtnId'>
                                DELETE
                            </button>
                        </p>
                    </div>
                </div> 
            </div>
            
            <!-- create wish list form content display -->
            <div ng-show="isShowCreateUWLFormContent" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cwl_FormContentContainerDivClass">
                <p class="cwl_formHeaderPClass">
                    <i class="fa fa-smile-o cwl_smileIconClass"></i> Hey please fill-up this form to new create wish list !
                </p>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 cwl_formContentWrappperContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cwl_titleContainerDivClass">
                        <p class="cwl_formfieldLabelPClass">
                            <i class="cwl_formfieldiconclass fa fa-user faa-tada animated"></i> Type wish list title
                        </p>
                        <input title='Type wish list which will be helpfull for remembering' autocomplete="on" type="text" id='cwl_titleInputId' class="form-control cwl_titleInputClass">
                        <p class="cwl_formfieldHintPClass">
                            Eg: Regular Cakes List, Doll Cakes List, Birthday Party List
                        </p>
                        <p class="cwl_titleInput_ErrorClass"></p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cwl_contactPersonNameContainerDivClass">
                        <p class="cwl_formfieldLabelPClass">
                            <i class="cwl_formfieldiconclass fa fa-user faa-tada animated"></i> List is public ?
                        </p>
                        <select title="If list is public then it can be shown to other user(s)" class="form-control cwl_privacySettingsOptionClass" id="cwl_privacySettingsOptionId">
                            <option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </div>
                    <div ng-show="isShowUWLCreationErrorMsg" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cwl_errorMsgContainerDivClass">
                        {{uwlCreationErrorMsgStr}}
                    </div>
                    <div title='Click to create wish list' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cwl_btnContainerDivClass">
                        <button ng-click="collectDataUWLCreation()" class='btn cwlSubmtBtnClass' id='cwlSubmtBtnId'>
                            CREATE
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- display your all wish list wise item of logged user-->
            <div ng-show="userAllWLWiseItemArrJsonData" id='wld_yourAllWLContainerDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_yourAllWLContainerDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_yourAllWLFilterOperationContainerDivClass">
                    <input ng-model="loggedUserSearchOwnWLText" type="text" class="form-control" placeholder="Find items across in your wish list">
                </div>
                <!-- display user each wish list-->
                <div ng-repeat="eachWLItemWiseDetails in userAllWLWiseItemArrJsonData | filter:loggedUserSearchOwnWLText:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_yourEachWLContainerDivClass">
                    <p class="wld_yourWLTitlePClass">
                        Showing {{eachWLItemWiseDetails['wlmCount']}} item(s) in {{eachWLItemWiseDetails['wlTitle']}}
                    </p>
                    <!-- display each item  of wish list -->
                    <div ng-repeat="eachWLItemDetails in eachWLItemWiseDetails['wlAllItemDetails'] | filter:loggedUserSearchOwnWLText:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_yourEachWLItemContainerDivClass">
                        <!-- product image display -->
                        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-1 wl_yourEachWLItemImageDivClass">
                            <img style='width:100%;' ng-src="<?php echo $BaseSitePath; ?>images/productphotoback.png">
                        </div>
                        <!-- show wish list item details -->
                        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 wl_yourEachWLItemDetailsDivClass">
                            <p class="wld_yourEachWLProductStoreNameContainerPClass">
                                <span>Seller :</span> 
                                <span>{{eachWLItemDetails.shopStoreTitle}}</span>
                            </p>
                            <p class="wld_yourEachWLProductNamePClass">
                                {{eachWLItemDetails.productListTitle}}
                            </p>
                            <p class='wld_yourEachWLProductReviewAndRatingPClass' ng-show="eachWLItemDetails.isUserRatedAndReviewAbtProduct">
                                {{eachWLItemDetails.totalUserRatingAbtProduct}} reviewed,
                                {{eachWLItemDetails.totalUserRatingAbtProduct}} ratings,   
                                {{eachWLItemDetails.totalAvgRatingAbtProduct}} 
                                <i class="fa fa-star faa-tada animated wld_yourWLItemAvgRatedIconClass"></i> average rated based on (Quality/Taste, Delivery Services, Price)
                            </p>
                            <p class='wld_yourEachWLProductNotReviewAndRatingPClass' ng-hide="eachWLItemDetails.isUserRatedAndReviewAbtProduct">
                                No rating & review from customer yet
                            </p>
                            <p class='wld_yourEachWLProductWeightPClass'>
                                Size : {{eachWLItemDetails.productFeatureDisplayMeasurementType}}
                            </p>
                            <p class='wld_yourEachWLProductPricePClass'> 
                                <span class='wl_productCutPriceTextSClass' ng-if="eachUWLItemDetails['productFeatureDiscount']">
                                    <i class="fa fa-rupee"></i> {{eachWLItemDetails.productFeatureBasePrice}}
                                </span>
                                <span class='wld_yourEachWLProductPayBlgPriceTextSClass'>
                                    <i class="fa fa-rupee faa-tada animated"></i> {{eachWLItemDetails['productFeatureOnlineSellingPrice']}}
                                </span>
                                <span class='wld_yourEachWLProductDiscountPercentTextSClass' ng-if="eachWLItemDetails['productFeatureDiscount']!==''">
                                    ({{eachWLItemDetails['productFeatureDiscount']}}% Off)
                                </span>
                            </p>
                        </div>
                        <!-- wish list item operation details -->
                        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 wld_yourEachWLItemOperationDivClass">
                            <p class='wld_yourEachWLItemAddedDatePClass'>Updated {{eachWLItemDetails.productAddedDatedtime}}</p>
                            <p class='wld_yourEachWLItemOperationBtnWrapperPClass'> 
                                <button title="Click to add {{eachWLItemDetails.productListTitle}} item in order cart" ng-controller='OrderCartController' ng-click="checkingProductDataToAddInOrdercart(eachWLItemDetails, false, 'wishlist')" class="wld_yourEachWLSpecificProductAddBtnClass btn">
                                    <i class="fa fa-shopping-cart"></i> ADD
                                </button>
                                <button ng-click="removeProductFromUWL(eachWLItemDetails)" title='Click to remove item from wish list' class="wld_yourEachWLSpecificProductDeleteBtnClass btn">
                                    <i class="fa fa-remove"></i> DELETE
                                </button>
                                <select title='Move item from current list to another wish list' ng-change="collectDataToMoveProductFromUWLToUWL('wld_yourWLItemMoveSelectionId_'+$id)" ng-model="eachWLItemWiseDetails.wlId1" id='wld_yourWLItemMoveSelectionId_{{$id}}' ng-show="eachWLItemWiseDetails.isShowWLItemMoveOption" class='btn wld_yourWLItemMoveSelectionClass'>
                                    <option value=''>Move To</option>
                                    <option value="{{userEachWLDataObj.wishListId}}" data-userloggedid="{{userEachWLDataObj.userLoggedId}}" data-moveitemid="{{eachWLItemDetails.wishListItemId}}" data-moveitemfromwishlistid="{{eachWLItemWiseDetails.wlId}}" data-moveitemtowishlistid="{{userEachWLDataObj.wishListId}}" ng-repeat="userEachWLDataObj in eachWLItemWiseDetails['userAllWLData']">
                                        {{userEachWLDataObj.wishListTitle}}
                                    </option>
                                </select>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- display searched all user wise wish list summary -->
            <div ng-show="searchedAllUserwiseWLSummaryArrJsonObj" id='wld_searchedAllUserwiseWLSummaryContainerDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_searchedAllUserwiseWLSummaryContainerDivClass">
                <div ng-show="searchedAllUserwiseWLSummaryArrJsonObj.length>4" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_searchedAllUserwiseWLSummaryFilterOperationContainerDivClass">
                    <input ng-model="loggedUserSearchFriendsWLSummaryText" type="text" class="form-control" placeholder="Find items across in your wish lists">
                </div>
                <!-- iterate user wise all wish list summary -->
                <div ng-repeat="eachUserwiseAllWLSummaryDataObj in searchedAllUserwiseWLSummaryArrJsonObj | filter:loggedUserSearchFriendsWLSummaryText:strict" class="col-xs-12 col-sm-12 col-md-3 col-lg-3 wld_searchedEachUserwiseWLSummaryContainerDivClass">
                    <div class='searchedDisplayEachUserwiseWLDetailsDivClass'>
                        <div class='wld_searchedUserDetailsTitleDivClass'>
                            <p class="wld_searchedUserNameRowPClass">
                                <i class='fa fa-smile-o wld_userSmileIconClass'></i> 
                                {{eachUserwiseAllWLSummaryDataObj.userName}}
                            </p>
                            <p class="wld_searchedUserAddressRowPClass">
                                <i class='fa fa-map-marker'></i>
                                {{eachUserwiseAllWLSummaryDataObj.userCity}},
                                {{eachUserwiseAllWLSummaryDataObj.userState}}
                            </p>
                        </div>
                        <hr class="hrClass">
                        <div class='wld_searchedUserAllWLTitleContainerDivClass'>
                            <p ng-click="collectDataToShowSearchedUserWLItemBySearchParam(eachWLSummaryDataObj)"  title="Click to see {{eachUserEachWishListSummaryDataObj.totalItem}} items of {{eachUserwiseWishListSummaryDataObj.userName}} wish list" ng-repeat="eachWLSummaryDataObj in eachUserwiseAllWLSummaryDataObj['allWLSumaryDetails']" class='wld_searchedUserEachWLTitlePClass'>
                                {{eachWLSummaryDataObj.wlTitle}} ({{eachWLSummaryDataObj.totalItem}} items)
                            </p>
                        </div>
                    </div>
                </div>  
            </div>
            
            <!-- display searched user wise all wish list item -->
            <div ng-show="searchedUserwiseWLAllItemArrJsonObj" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_searchedSingleUserwiseAllWLItemWrapperDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_searchedSingleUserwiseAllWLItemFilterOperationContainerDivClass">
                    <input ng-model="loggedUserSearchFriendsWLItemText" type="text" class="form-control" placeholder="Find items across in your wish lists">
                </div>
                <!-- display each wish list-->
                <div ng-repeat="eachUWLWiseDetails in searchedUserwiseWLAllItemArrJsonObj | filter:loggedUserSearchFriendsWLItemText:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_searchedSingleUserwiseAllWLItemContainerDivClass">
                    <p class="wld_searchedSingleUserEachWLTitlePClass">Showing {{eachUWLWiseDetails['wlmCount']}} item(s) in {{eachUWLWiseDetails['wlTitle']}} List</p>
                    <!-- display each item of wish list -->
                    <div ng-repeat="eachUWLItemDetails in eachUWLWiseDetails['wlAllItemDetails'] | filter:loggedUserSearchFriendsWLText:strict" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wld_searchedSingleUserwiseEachWLItemContainerDivClass">
                        <!-- product image display -->
                        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-1 wld_searchedSingleUserwiseEachWLItemImageDivClass">
                            <img style='width:100%;' ng-src="<?php echo $BaseSitePath; ?>images/productphotoback.png">
                        </div>
                        <!-- show wish list item details -->
                        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 wld_searchedSingleUserwiseEachWLItemDetailsDivClass">
                            <p class="wld_searchedSingleUserwiseEachWLItemStoreNameContainerPClass">
                                <span>From Store :</span> 
                                <span>{{eachUWLItemDetails.shopStoreTitle}}</span>
                            </p>
                            <p class="wld_searchedSingleUserwiseEachWLItemNamePClass">
                                {{eachUWLItemDetails.productListTitle}}
                            </p>
                            <p class='wld_searchedSingleUserwiseEachWLItemReviewAndRatingPClass' ng-show="eachUWLItemDetails.isUserRatedAndReviewAbtProduct">
                                {{eachUWLItemDetails.totalUserRatingAbtProduct}} reviewed,
                                {{eachUWLItemDetails.totalUserRatingAbtProduct}} ratings,   
                                {{eachUWLItemDetails.totalAvgRatingAbtProduct}} 
                                <i class="fa fa-star faa-tada animated wld_searchedSingleUserwiseEachWLItemAvgRatedIconClass"></i> average rated based on (Quality/Taste, Delivery Services, Price)
                            </p>
                            <p class='wld_searchedSingleUserwiseEachWLItemNotReviewAndRatingPClass' ng-hide="eachUWLItemDetails.isUserRatedAndReviewAbtProduct">
                                No rating & review from customer yet
                            </p>
                            <p class='wld_searchedSingleUserwiseEachWLItemWeightPClass'>
                                Size : {{eachUWLItemDetails.productFeatureDisplayMeasurementType}}
                            </p>
                            <p class='wld_searchedSingleUserwiseEachWLItemPricePClass'> 
                                <span class='wld_searchedSingleUserwiseEachWLItemCutPriceTextSClass' ng-if="eachUWLItemDetails['productFeatureDiscount']">
                                    <i class="fa fa-rupee"></i> {{eachUWLItemDetails.productFeatureBasePrice}}
                                </span>
                                <span class='wld_searchedSingleUserwiseEachWLItemPayBlgPriceTextSClass'>
                                    <i class="fa fa-rupee faa-tada animated"></i> {{eachUWLItemDetails.productFeatureOnlineSellingPrice}}
                                </span>
                                <span class='wld_searchedSingleUserwiseEachWLItemDiscountPercentTextSClass' ng-if="eachUWLItemDetails['productFeatureDiscount'] !== ''">
                                    ({{eachUWLItemDetails.productFeatureDiscount}}% Off)
                                </span>
                            </p>
                        </div>
                        <!-- wish list item operation details -->
                        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 wld_searchedSingleUserwiseEachWLItemOperationDivClass">
                            <p class='wld_searchedSingleUserwiseEachWLItemAddedDatePClass'>Updated {{eachUWLItemDetails.productAddedDatedtime}}</p>
                            <p class='wld_searchedSingleUserwiseEachWLItemOperationBtnWrapperPClass'> 
                                <button title='Click to add {{eachUWLItemDetails.productListTitle}} item in order cart' ng-controller='OrderCartController' ng-click='preparedProductDataToAddInOrdercart(eachProductDetails)' class="wld_searchedSingleUserwiseEachWLItemAddBtnClass btn">
                                    <i class="fa fa-shopping-cart"></i> ADD
                                </button>
                                <select title='Copy to my wish list' ng-change="collectDataToCopyProductFromUWLToUWL('wl_searchedSingleUserwiseEachWLItemCopySelection_'+$id, eachUWLWiseDetails)" ng-model="userEachWLDataObj.wishListId" id='wl_searchedSingleUserwiseEachWLItemCopySelection_{{$id}}' ng-show="eachUWLWiseDetails.isShowWLItemMoveOption" class='btn wl_searchedSingleUserwiseEachWLItemCopySelectionClass'>
                                    <option value=''>Copy To</option>
                                    <option value="{{userEachWLDataObj.wishListId}}" data-userloggedid="{{userEachWLDataObj.userLoggedId}}" data-copyitemid="{{eachUWLItemDetails.wishListItemId}}" data-copyitemfromwishlistid="{{eachUWLWiseDetails.wlId}}" data-copyitemtowishlistid="{{userEachWLDataObj.wishListId}}" ng-repeat="userEachWLDataObj in eachUWLWiseDetails['userAllWLData']">
                                        {{userEachWLDataObj.wishListTitle}}
                                    </option>
                                </select>
                            </p>
                            <p ng-hide="eachUWLWiseDetails.isShowWLItemMoveOption" class='wld_notYourWLItemMoveSelectionClassFoundPClass'>
                                Please create first wishlist to copy this item !
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>    
        
        <!-- refresh web application data -->
        <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>

    </body>

</html>


