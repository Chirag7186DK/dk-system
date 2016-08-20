
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
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
                display:none !important;
            }
        </style>
    </head>

    <!-- body start here -->
    <body ng-cloak scroll-window-directive resize-window-directive class="ng-cloak onBodyScrollClass" ng-controller='userSessionController' ng-init="loadDefaultDataInDkSession('viewstore'); checkInBackgroundDataAvailableForUpdationFromSession('viewstore');">

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
                    <li title="Click here to contact us">
                        <i class="fa fa-comment-o fa-flip-horizontal"></i> Care
                    </li>
                    <li ng-click="redirectToViewWishList('wishlist')" ng-controller="WishListController" title="Click here to see your wish list">
                        <i class="fa fa-heart"></i> Wishlist ({{wlmCount}})
                    </li>
                    <li title="Click here to view your current order cart">
                        <i class="fa fa-shopping-basket"></i> Cart ({{ordercartItemRequestedCount}})
                    </li>
                    <li ng-if='isUserLoggedInSession==false' ng-click="redirectToAccountSignUpSignIn('home')" ng-controller="UsersController" title="Click here to Log In / Sign Up with desserts khazana account">
                        <i class="fa fa-user accountSignUpSignInIconClass"></i> Log In / Sign Up
                    </li>
                    <li ng-if='isUserLoggedInSession==true' ng-controller="UsersController" title="Click here to see more details about yourself">
                        <i class="fa fa-user accountSignUpSignInIconClass"></i> {{loggedUserName}}
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

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstoreBannerDivClass"></div>

        <!-- what is desserts khazana -->
        <div style='display:none;' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 whatIsDessertsKhazanaMainContainerDivClass">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkAllCompleteOffersContainerDivClass">
                <h5>Desserts Khazana Complete Offers Will Come Image/Slider</h5>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkAllSpecialOffersContainerDivClass">
                <h5>Shopstore related Will Come Image/Slider</h5>
            </div>
        </div>

        <!-- view shop store details like menu, information, rating/review from customer side -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstoreDetailsBodyWrapperDivClass">
            
            <!-- customer bread crumb -->
            <div customer-breadcrumb-directive class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_userBreadcrumbDivClass">
                <ul class="cshopstore_userBreadcrumbULClass list-inline">
                    <li class='userBreadcrumbHomeLIClass'>
                        <a href="<?php echo $BaseSitePath; ?>">
                            {{customerBreadCrumbOnWebApp.homeKey}}
                        </a>
                    </li>
                    <li class='userBreadcrumbProductTypeLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.productTypeKey}}</a>
                    </li>
                    <li class='cshopstore_userBreadcrumbProductTypeCategoryTypeLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.productTypeCategoryKey}}</a>
                    </li>
                </ul>
            </div>
            
            <!-- shop store summary(self, rating/review/desserts menu) info -->
            <div scroll-horizontally-cshopstoresummaryinfo id='cshopStoreSummaryInfoWrapperDivId' ng-controller="ShopStoreController" ng-init="loadCShopStoreSummaryInfo()"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopStoreSummaryInfoWrapperDivClass">
                <!-- shop store self info -->
                <div class='cshopsstoreSelfSummaryInfoDivClass' title="Click to show more details about this seller">
                    <p class='cShopStoreNameTextLblPClass'>
                        <span class="cshopstoreNameSClass">
                            {{shopstoreInfo.shopStoreNameInCaps}} STORE
                        </span>
                    </p>
                    <p class='cShopStoreLocatedInfoLblPClass'>
                        Located : {{shopstoreInfo.shopStoreAddress}}
                    </p>
                    <p class='cShopStoreDeliveryInfoLblPClass'>
                        Delivery : {{totalCountDeliveryArea}} areas
                    </p>
                    <p ng-click="toggleShopStoreSelfSummaryInfoDetails()" class='showMoreShopSummaryInfoPClass'>
                        {{toggleShopStoreSelfSummaryInfoLblText}}
                    </p>
                </div>
                <!-- cshopstore summary rating & review info -->
                <div class='cshopsstoreSummaryReviewRatingDivClass' title="Click to show more detailed reviewed / rating about this seller">
                    <p class='cShopStoreReviewRatingTextLblPClass'>
                        REVIEW & RATINGS
                    </p>
                    <p class='cShopStoreReviewdRatingUsercountInfoLblPClass'>
                        {{customersReviewedRatingMsgStr}}
                    </p>
                    <p ng-click="toggleShopStoreRatingReviewDetails()" class='showMoreShopReviewRatingInfoPClass' ng-show="isRatingReviewBasedInfoFound">
                        {{toggleShopStoreRatingReviewSummaryInfoLblText}}
                    </p>
                </div>
                <!-- desserts menu summary info -->
                <div class='cshopsstoreMenuSummaryInfoDivClass' title="Click to show all desserts(menu) about this seller">
                    <p class='cShopStoreMenuTextLblPClass'>
                        OUR MENU
                    </p>
                    <p class='cShopStoreDessertsMenuInfoLblPClass'>
                        {{totalCountDessertsType}} Desserts ({{totalCountAllDessertsTypeProduct}} products)
                    </p>
                    <p ng-click="toggleShopStoreDessertsMenu()" class='showMoreShopMenuSummaryInfoPClass'>
                        {{toggleShopStoreDessertsMenuSummaryInfoLblText}}
                    </p>
                </div>
            </div>

            <!-- shop store serve desserts product -->
            <div ng-show="isToggleShopStoreDessertsMenu" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopStoreServedAllDessertsProductContainerDivClass">
                <li class="cshopstoreServedDessertsProductNoteLIClass">
                    <i class='fa fa-smile-o'></i> 
                    Hey you are viewing '{{shopstoreInfo.shopStoreNameInCaps}}' store desserts and also can serve other 
                        <span class="badge cshopstore_dessertsProductTypeCountSClass">
                            {{allDessertsSummaryInfo.length}}
                        </span>
                    dessert(s) product are as follows :-
                </li>
                <!-- display all desserts product can served by shop store in selected delivery area -->
                <div id='cshopStoreServedAllDessertsProductScrollerWrapperDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopStoreServedAllDessertsProductScrollerWrapperDivClass'>
                    <!-- iterate each desserts products info  -->
                    <div ng-repeat="eachDessertsServedDetailsByStore in allDessertsSummaryInfo" title='Click to view this shopstore all {{eachDessertsServedDetailsByStore.productTypeTitle}} desserts products' class='cshopStoreServedEachDessertsProductScrollerWrapperDivClass' scroll-horizontally-dessertsproducttypelist-cshopstorelevel>
                        <p class="dessertsProductIconPClass">
                            <i class="{{eachDessertsServedDetailsByStore.productIcon}} dessertsProductIconClass"></i>
                        </p>
                        <h2 class="dessertsProductTitleHClass">
                            {{eachDessertsServedDetailsByStore.productTypeTitle}}
                        </h2>
                        <p ng-controller='ShopStoreController' ng-click="collectDataToViewCShopstore(eachDessertsServedDetailsByStore)" class="viewDessertsProductPClass">
                            View desserts
                        </p>
                    </div>
                </div>
            </div>

            <!-- all product list will be loaded here -->
            <div id='cShopStoreViewAllProductDetailsBodyWrapperDivId' ng-show="isLoadCShopStoreProductTypeProductCategoryAllProductList" ng-controller="ShopStoreController" ng-init="loadCShopStoreProductTypeProductCategoryAllProductList()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreViewAllProductDetailsBodyWrapperDivClass">
                <!-- all product category list will be loaded here -->
                <div ng-controller="ProductTypeProductCategoryProductDetailsController" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreProductAllCategoryWrapperDivClass">
                    <p class='infoAbtProductCategoriesPClass'>
                        Info *: <i class="fa fa-smile-o"></i> Hey you are viewing '{{customerBreadCrumbOnWebApp.productTypeCategoryKey}}' products from <span class="badge totalCountProductCategorySClass">{{productCategoryList.length}}</span> categories !
                    </p>
                    <div id='cShopStoreProductAllCategoryContainerDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreProductAllCategoryContainerDivClass">
                        <li ng-click="collectDataToViewCShopstore(eachProductCategoryDetails)" ng-repeat="eachProductCategoryDetails in productCategoryList| orderBy : '-isRequestedProductCategoryMatched'" title='Click here to view all product about {{eachProductCategoryDetails.productCategoryTitle}} desserts' class='cshopstore_eachProductCategoryContainerLIClass' scroll-horizontally-dessertsproducttype-productcategorylist-cshopstorelevel>
                            {{eachProductCategoryDetails.productCategoryTitle + '\n(' + eachProductCategoryDetails.totalProductCount + ')'}}
                        </li>
                    </div>
                </div>
                <!-- product filter operation main container div -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreProductFilterOperationWrapperDivClass">
                    <!-- info / tips about product filtering operation -->
                    <p class='cshopstore_tipAbtFilterProductPClass'>
                        Tip *: Use filter given below to find products more easy & quickly !
                        <button ng-click="toggleCShopStoreAllProductFilterContainer()" class="btn cshopstore_toggleProductFilterBtnClass" title="Click to show/hide product filter">
                            <i class="fa fa-filter"></i> {{toggleCShopstoreProductFilterBtnLabel}}
                        </button>
                    </p>
                    <div ng-show="isShowCShopstoreAllProductFilter" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 {{cShopstoreProductFilterPopupDivClass}}">
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productFilterPopupBodyDivClass'>    
                            <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_allProductInfoAbtProductCategoryProductFoundMsgPopupDivClass'>
                                <i class="fa fa-birthday-cake"></i> {{defaultSelectProductCategoryTitle}} (Found {{allProductDetailsList.length}} Items)
                            </div>
                            <!-- by price -->
                            <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 cshopstore_priceFilterOperationDivClass'>
                                <p class='cshopstore_labelPriceFilterPClass'>By price</p>
                                <select id='allProductPriceFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Price" multiple data-selected-text-format="count>1"></select>
                            </div>
                            <!-- by size -->
                            <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 cshopstore_sizeFilterOperationDivClass'>
                                <p class='cshopstore_labelSizeFilterPClass'>By size</p>
                                <select id='allProductSizeFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Size" multiple data-selected-text-format="count>1"></select>
                            </div>
                            <!-- by discount -->
                            <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 cshopstore_discountFilterOperationDivClass'>
                                <p class='cshopstore_labelDiscountFilterPClass'>By discount</p>
                                <select id='allProductDiscountFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Discount" multiple data-selected-text-format="count>1"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- summary info display -->
                <div ng-show='allProductDetailsList.length' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreInfoAbtProductCategoryProductFoundMsgDivClass'>
                    <i class="fa fa-birthday-cake"></i> {{defaultSelectProductCategoryTitle}} (Showing {{allProductDetailsList.length}} Items)
                </div>
                <!-- each product details iterate for displaying purpose -->
                <div maxheight-productboxwidget-cshopstorelevel ng-repeat="eachProductDetails in allProductDetailsList" class="col-xs-6 col-sm-4 col-md-3 col-lg-3 cshopstore_productBoxWidgetDivClass">
                    <img style='width:100%!important;' class='preloadProductImagesClass' data-original="data/vendor_cb1/dessertsproducttype/cakes/regular/r1_(270x239).png" ng-src="<?php echo $BaseSitePath; ?>images/productphotoback.png">
                    <div class='col-xm-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productBoxWidgetDividerLineDivClass'></div>
                    <p class='cshopstore_productStoreNameContainerPClass'>
                        <span class="cshopstore_productStoreLabelNameSpanClass">From store : </span>
                        <span class="cshopstore_productStoreNameSpanClass">{{eachProductDetails.shopStoreTitle}}</span>
                    </p>
                    <p class='cshopstore_productNamePClass'>
                        {{eachProductDetails.productListTitle}}
                    </p>
                    <p class='cshopstore_productPricePClass'> 
                        <span class='cshopstore_productCutPriceTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                            <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureBasePrice}}
                        </span>
                        <span class='cshopstore_productPayBlgPriceTextSClass'>
                            <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureOnlineSellingPrice}}
                        </span>
                        <span class='cshopstore_productDiscountPercentTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                            ({{eachProductDetails.productFeatureDiscount}}% Off)
                        </span>
                    </p>
                    <p class='cshopstore_productWeightPClass'>
                        Size : {{eachProductDetails.productFeatureDisplayMeasurementType}}
                    </p>
                    <p class='cshopstore_productDeliveryLocationPClass'> 
                        <!-- CJ need to think about product delivery location to show on screen -->
                        Delivery <i class="fa fa-map-marker"></i> : At area 12
                    </p>
                    <p class='cshopstore_productBtnWrapperPClass'> 
                        <button ng-controller='WishListController' ng-click='prepareProductDataToAddInUWL(eachProductDetails)' title='Click to add {{eachProductDetails.productListTitle}} item in your default wishlist' class="cshopstore_specificProductAddWishListBtnClass btn">
                            <i class="fa fa-heart"></i>
                        </button>
                        <button ng-controller='OrderCartController' ng-click="checkingProductDataToAddInOrdercart(eachProductDetails, false, 'viewstoreproducts')" title='Click to add {{eachProductDetails.productListTitle}} item in order cart' class="cshopstore_specificProductAddBtnClass btn">
                            <i class="fa fa-plus"></i>
                        </button>
                        <button title='Click to view more about {{eachProductDetails.productListTitle}} item details' class="cshopstore_specificProductViewDetailsBtnClass btn" ng-click='viewProductDetails(eachProductDetails)'>
                            <i class="fa fa-list"></i>
                        </button>
                    </p>
                </div>
                <!-- not found show msg div -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_notFoundProductMsgDivClass">
                    {{notFoundProductMsgStr}}
                </div>
            </div>

            <!-- displaying all user reviewed rating details -->
            <div ng-show="isShowShopStoreRatingReviewDetails" ng-controller='ShopStoreController' ng-init="loadShopStoreAllUserRatingReviewed()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_allUserReviewAboutProductContainerDivClass">
                <span class="cshopstore_allUserReviewRatingDetailsLabelSpanClass">
                    Displaying {{(allUserRatingReviewDetails).length}} customer(s) reviewed and ratings about product
                </span>
                <div ng-repeat="eachUserReviewedRatingDetails in allUserRatingReviewDetails" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_displayEachUserReviewAboutProductContainerDivClass">
                    <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 cshopstore_eachUserReviewedRatingLeftSideDivClass">
                        <span class="badge cshopstore_userNameIntialLetterRatedReviewedAbtProductSClass">
                            {{eachUserReviewedRatingDetails.userNameIntialLetter}}
                        </span> 
                        <p class="cshopstore_eachUserAvgRatedContainerPClass">
                            <span class='cshopstore_userAvgRatedAboutProductSClass'>{{eachUserReviewedRatingDetails.avgRated}} OUT OF 5 </span>
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-11 col-lg-11 cshopstore_eachUserReviewedRatingRightSideDivClass">
                        <p class="cshopstore_eachUserNameRatedReviewAbtProductPClass">
                            reviewed & rated by {{eachUserReviewedRatingDetails.userName}} - {{eachUserReviewedRatingDetails.dated}}
                        </p>
                        <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'SELECT' === eachReviewedRatingTypeDetails.answerPattern" class='cshopstore_eachUserRatedAbtProductPClass'>
                            {{eachReviewedRatingTypeDetails.questionTitle}} : 
                            <span class="cshopstore_ratedQuestionAboutProductSClass">{{eachReviewedRatingTypeDetails.givenAnswerPoints}} <i class="fa fa-star"></i></span>
                        </p>
                        <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'TEXTAREA' === eachReviewedRatingTypeDetails.answerPattern" class='cshopstore_eachUserReviewedCommentAbtProductPClass'>
                            {{eachReviewedRatingTypeDetails.answerText}}
                        </p>
                    </div>
                </div>
            </div>

            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
        
            <!-- store product delivery area -->
            <div ng-show='isShowCShopStoreProductDeliveryAreaDetails' ng-controller='ShopStoreController' ng-init="loadCShopStoresProductDeliveryArea()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productDeliveryAreaWrapperDivClass">
                <div ng-show='cShopstoreProductDeliveryAreaNames' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productDeliveryAreaWrapperContainerDivClass">
                    <p class='cShopstoreProductDeliveryAreaHeaderPClass'>
                        Our Delivery Area <i class="fa fa-map-marker faa-tada animated cShopstoreProductDeliveryAreaIconClass"></i>
                    </p>
                    <p class='cShopstoreProductDeliveryAreaBodyPClass'>
                        {{cShopstoreProductDeliveryAreaNames}}
                    </p>
                </div>
                <div ng-hide='cShopstoreProductDeliveryAreaNames' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productDeliveryAreaNotFoundMsgDivClass">
                    No product delivery area defined by '{{shopstoreInfo.shopStoreNameInCaps}}' store !
                </div>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- store working style -->
            <div ng-show='isShowCShopStoreWorkingStyleDetails' ng-controller='ShopStoreController' ng-init="loadCShopStoresWorkingStyle()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_workingStyleWrapperDivClass">
                <div ng-show='cShopstoreWorkingstyleDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_workingStyleWrapperContainerDivClass">
                    <p class='cShopstoreWorkingStyleHeaderPClass'>
                        Our Working Hours <i class="fa fa-clock-o faa-tada animated cShopstoreWorkingStyleIconClass"></i>
                    </p>
                    <p class='cShopstoreWorkingStyleBodyPClass'>
                        <p ng-repeat="eachWorkingScheduleDetails in cShopstoreWorkingstyleDetails" class="cShopStoreWorkingEachDaySchedulePClass {{(eachWorkingScheduleDetails.isTodayDayMatched=='Y')?'cShopStoreWorkingTodayDaySchedulePClass':''}}">
                            <span>
                                {{eachWorkingScheduleDetails.dayName}} ({{eachWorkingScheduleDetails.openTime + "-" + eachWorkingScheduleDetails.closeTime}})
                            </span>
                        </p>
                    </p>
                </div>
                <div ng-hide='cShopstoreWorkingstyleDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_workingStyleNotFoundMsgDivClass">
                    No working hours defined by '{{shopstoreInfo.shopStoreNameInCaps}}' store !
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


