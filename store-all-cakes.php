
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
    <body ng-cloak class="ng-cloak" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('store-all-cakes');">

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

        <!-- view store details like menu, information, rating/review from customer side -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeDetailsBodyWrapperDivClass">

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
                        {{storeInfo.shopStoreName}}
                    </li>
                    <li class='customerBreadcrumbLIClass'>
                        |
                    </li>
                    <li class='customerBreadcrumbLIClass'>
                        Cakes
                    </li>
                </ul>
            </div>
            
            <!-- store summary(self,rating/review/desserts menu) info -->
            <div horizontally-scrollable-storeinfo id='horizontallyScrollableStoreInfoDivId' ng-controller="StoreController" ng-init="loadStoreSummaryInfo()"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeSummaryTypeInfoWrapperDivClass">
                
                <!-- store basic info -->
                <div class='storeSelfInfoDivClass'>
                    <p class='storeSelfNameTextLblPClass'>
                        {{storeInfo.shopStoreNameInCaps}}
                    </p>
                    <p class='storeSelfLocatedInfoLblPClass'>
                        <i class="fa fa-map-marker storeSelfLocationIconClass"></i> {{storeInfo.shopStoreAddress}}
                    </p>
                    <p ng-click="toggleStoreSelfSummaryInfoDetails()" class='showMoreStoreSelfInfoPClass'>
                        {{toggleStoreSelfSummaryInfoLblText}}
                    </p>
                </div>
                
                <!-- store rating & review summary info -->
                <div class='storeReviewRatingSummaryDivClass'>
                    <p class='storeReviewRatingTextLblPClass'>
                        REVIEW & RATINGS
                    </p>
                    <p class='storeReviewRatingAllUserCountInfoLblPClass'>
                        {{customersReviewedRatingMsgStr}}
                    </p>
                    <p ng-click="toggleStoreRatingReviewSummaryDetails()" class='showMoreStoreReviewRatingSummaryInfoPClass'>
                        {{toggleStoreRatingReviewSummaryInfoLblText}}
                    </p>
                </div>
                
                <!-- store desserts type menu summary info -->
                <div class='storeDessertsMenuSummaryInfoDivClass'>
                    <p class='storeMenuTextLblPClass'>
                        WE SERVED
                    </p>
                    <p class='storeDessertsMenuInfoLblPClass'>
                        {{storeDeliveryAreaBasedDessertsTypeList.length}} Desserts
                    </p>
                    <p ng-click="toggleStoreDessertsMenu()" class='showMoreStoreMenuSummaryInfoPClass'>
                        {{toggleStoreDessertsMenuSummaryInfoLblText}}
                    </p>
                </div>
                
            </div>


            <!-- store served all desserts type info -->
            <div ng-show="isToggleStoreDessertsMenu" ng-controller="StoreController" ng-init="loadStoreDeliveryAreaBasedDessertsTypeList()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeServeDessertsTypeContainerDivClass">
                
                <!-- display selected desserts type title ordering by customer -->
                <li ng-if="storeDeliveryAreaBasedDessertsTypeList.length>=1" class="storeServingDessertsTypeNoteInfoLIClass">
                    <i class='fa fa-smile-o'></i> 
                    Hey you are viewing '{{storeInfo.shopStoreNameInCaps}}' store desserts and also can serve other 
                        <span class="badge storeCanServeDessertsTypeCountSClass">
                            {{storeDeliveryAreaBasedDessertsTypeList.length}}
                        </span>
                    desserts in your '{{selectedDeliveryAreaTextHeader}}' delivery area !!!
                </li>
                
                <!-- display all desserts type can served by store in your selected delivery area -->
                <div id='storeCanServeDessertsTypeListScrollableWrapperDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 storeCanServeDessertsTypeListScrollableWrapperDivClass'>
                    <!-- iterate each desserts type info display as horizontally scrolling -->
                    <div horizontally-scrollable-dessertstypelist-storelevel ng-repeat="eachDessertsTypeDetails in storeDeliveryAreaBasedDessertsTypeList | orderBy : '-isRequestedProductTypeIdMatched'" class='storeCanServeEachDessertsTypeScrollableWrapperDivClass'>
                        <p class="dessertsTypeIconPClass">
                            <i class="{{eachDessertsTypeDetails.dessertsIcon}} dessertsTypeIconClass"></i>
                        </p>
                        <h2 class="dessertsTypeTitleHClass">
                            {{eachDessertsTypeDetails.dessertsTypeTitle}}
                        </h2>
                        <p ng-controller='StoreController' ng-click="storeDessertsTypeDataDetailsInSessionStorageToViewStoreAllProductList(eachDessertsTypeDetails)" class="viewDessertsTypePClass">
                            Show products
                        </p>
                    </div>
                </div>
                
            </div>
            
            <!-- all product category list will be loaded here -->
            <div ng-show="productTypeAllProductCategoryList.length>1" ng-controller="StoreController" ng-init="loadProductTypeAllProductCategoryListStore()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreProductAllCategoryWrapperDivClass">
                <p ng-if="productTypeAllProductCategoryList.length>1" class='infoAbtProductCategoriesPClass'>
                    Info *: <i class="fa fa-smile-o"></i> Hey you can choose products from 
                    <span class="badge totalCountProductCategorySClass">
                        {{productTypeAllProductCategoryList.length}}
                    </span> categories !
                </p>
                <div ng-if="productTypeAllProductCategoryList.length>1" id='cShopStoreProductAllCategoryContainerDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreProductAllCategoryContainerDivClass">
                    <li id="cshopstore_eachProductCategoryContainerLIId_{{$index}}" ng-click="toggleStoreProductTypeProductCategoryElementClass('cshopstore_eachProductCategoryContainerLIId_'+$index, 'cShopStoreProductAllCategoryContainerDivClass'); storeProductTypeProductCategoryDataInSessionCStore(eachProductCategoryDetails)" ng-repeat="eachProductCategoryDetails in productTypeAllProductCategoryList | orderBy : '-isRequestedProductCategoryMatched'" title='Click here to view all product about {{eachProductCategoryDetails.productCategoryTitle}} desserts' class='cshopstore_eachProductCategoryContainerLIClass' scroll-horizontally-dessertsproducttype-productcategorylist-cshopstorelevel>
                        {{eachProductCategoryDetails.productTypeProductCategoryTitle + '\n(' + eachProductCategoryDetails.totalProductCount + ')'}}
                    </li>
                </div>
            </div>
            
            <!-- product filter operation -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreProductFilterOperationWrapperDivClass">
                <!-- info / tips about product filtering operation -->
                <p class='cshopstore_tipAbtFilterProductPClass'>
                    Tip *: Use filter given below to find products more easy & quickly !
                    <button ng-click="toggleStoreAllProductFilterContainer()" class="btn cshopstore_toggleProductFilterBtnClass" title="Click to show/hide product filter">
                        <i class="fa fa-filter"></i> {{toggleStoreProductFilterBtnLabel}}
                    </button>
                </p>
                <div ng-show="isShowStoreAllProductFilter" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 {{storeProductFilterPopupDivClass}}">
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productFilterPopupBodyDivClass'>    
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_allProductInfoAbtProductCategoryProductFoundMsgPopupDivClass'>
                            <i class="fa fa-birthday-cake"></i> {{storeDefaultSelectProductCategoryTitle}} (Found {{storeTotalProductCount}} Items)
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
            
            <!-- store all product list will be loaded here -->
            <div ng-controller="StoreController" ng-show="storeAllProductDetailsList" id='cShopStoreViewAllProductDetailsBodyWrapperDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreViewAllProductDetailsBodyWrapperDivClass">
                
                <!-- summary info display -->
                <div ng-show='storeAllProductDetailsList.length' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 cShopStoreInfoAbtProductCategoryProductFoundMsgDivClass'>
                    <i class="fa fa-birthday-cake"></i> {{storeDefaultSelectProductCategoryTitle}} (Showing {{storeTotalProductCount}} Items)
                </div>
                
                <!-- each product details iterate for displaying purpose -->
                <div ng-repeat="eachProductDetails in storeAllProductDetailsList" class="col-xs-6 col-sm-4 col-md-3 col-lg-3 cshopstore_productBoxWidgetDivClass">
                    <img style='width:100%!important;' class='preloadProductImagesClass' data-original="data/vendor_cb1/dessertsproducttype/cakes/regular/r1_(270x239).png" ng-src="<?php echo $BaseSitePath; ?>images/productphotoback.png">
                    <div class='col-xm-12 col-sm-12 col-md-12 col-lg-12 cshopstore_productBoxWidgetDividerLineDivClass'></div>
                    <p class='cshopstore_productNamePClass'>
                        {{eachProductDetails.productListTitle}}
                    </p>
                    <p class='cshopstore_productWeightPClass'>
                        Size : {{eachProductDetails.productFeatureDisplayMeasurementType}}
                        <span ng-if="eachProductDetails.productFeatureFoodType=='Eggless'"  class="pull-right">
                            <i class="fa fa-square cshopstore_productVegIconClass"></i>
                        </span>
                        <span ng-if="eachProductDetails.productFeatureFoodType=='Egg'" class="pull-right vap_productNonvegIconClass">
                            <i class="fa fa-square cshopstore_productVegIconClass"></i>
                        </span>
                    </p>
                    <p class='cshopstore_productPricePClass'> 
                        <span class='cshopstore_productPayBlgPriceTextSClass'>
                            <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureOnlineSellingPrice}}
                        </span>
                        <span class='cshopstore_productCutPriceTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                            <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureBasePrice}}
                        </span>
                        <span class='cshopstore_productDiscountPercentTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                            ({{eachProductDetails.productFeatureDiscount}}% Off)
                        </span>
                    </p>
                    <p class='cshopstore_productBtnWrapperPClass'> 
                        <button ng-controller='ProductController' ng-click='viewProductDetails(eachProductDetails)' title='Click to view more about {{eachProductDetails.productListTitle}} item details' class="cshopstore_specificProductViewDetailsBtnClass btn">
                            <i class="fa fa-list"></i> VIEW
                        </button>
                    </p>
                </div>
                
            </div>
            
            <!-- not found product show message div -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_notFoundProductMsgDivClass">
                {{storeNotFoundProductMsgStr}}
            </div>
            
            <!-- displaying all user reviewed rating details -->
            <div ng-show="isShowStoreRatingReviewDetails" ng-controller='StoreController' ng-init="loadStoreAllUserRatingReviewed()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_allUserReviewAboutProductContainerDivClass">
                <span ng-if="allUserRatingReviewDetails.length>0" class="cshopstore_allUserReviewRatingDetailsLabelSpanClass">
                    Displaying {{(allUserRatingReviewDetails).length}} customer(s) reviewed and ratings about product
                </span>
                <div ng-repeat="eachUserReviewedRatingDetails in allUserRatingReviewDetails" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_displayEachUserReviewAboutProductContainerDivClass">
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
                        <p class="cshopstore_eachUserAvgRatedReviewAbtProductPClass">
                            Avg Rating : {{eachUserReviewedRatingDetails.avgRated}} OUT OF 5
                        </p>
                    </div>
                </div>
                <div ng-hide='allUserRatingReviewDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_reviewRatingNotFoundMsgDivClass">
                    No any customer(s) reviewed & ratings yet !!!
                </div>
            </div>

            <!-- store working style -->
            <div ng-show='isShowStoreWorkingStyleDetails' ng-controller='StoreController' ng-init="loadStoresWorkingStyle()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_workingStyleWrapperDivClass">
                <div ng-show='storeWorkingStyleDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_workingStyleWrapperContainerDivClass">
                    <p class='cShopstoreWorkingStyleHeaderPClass'>
                        Our Working Hours <i class="fa fa-clock-o faa-tada animated cShopstoreWorkingStyleIconClass"></i>
                    </p>
                    <p class='cShopstoreWorkingStyleBodyPClass'>
                        <p ng-repeat="eachWorkingScheduleDetails in storeWorkingStyleDetails" class="cShopStoreWorkingEachDaySchedulePClass {{(eachWorkingScheduleDetails.isTodayDayMatched=='Y')?'cShopStoreWorkingTodayDaySchedulePClass':''}}">
                            <span>
                                {{eachWorkingScheduleDetails.dayName}} ({{eachWorkingScheduleDetails.openTime + "-" + eachWorkingScheduleDetails.closeTime}})
                            </span>
                        </p>
                    </p>
                </div>
                <div ng-hide='storeWorkingStyleDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_workingStyleNotFoundMsgDivClass">
                    No working hours defined by '{{storeInfo.shopStoreNameInCaps}}' store !
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


