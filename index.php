
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
                            <div title="Click here to see more details about yourself" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('personalinfo');">
                                Personal Info
                            </div>
                            <div title="Click here to see your orders details" class='userAccountEachSectionListDropdownDivClass' ng-click="storeRequestedSectionNameToAccessInUserAccount('requestordercart');">
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
        
        <!-- dk delivery city area desserts product -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dkDeliveryCityAreaDessertsContainerDivClass">
            <!-- desserts khazana tag lines -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dkDeliveryCityAreaDessertsTagLinesContainerDivClass">
                <p class="dkDeliveryCityAreaDessertsTagLinesPClass">
                    Celebrate your <i>CELEBRATIONS</i> with us, we are coming with <i>DESSERTS</i>...
                </p>
            </div>
            <!-- dk delivery city list -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dkDeliveryCityListContainerDivClass">
                <div id="dkDeliveryCityListWrapperDivId" ng-controller="LocationController" ng-init="loadDkDeliveryCityList('home')" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkDeliveryCityListWrapperDivClass">
                    <span class="dkDeliveryCityLblSClass">Type delivery city</span>
                    <select id='dkDeliveryCityListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Type delivery city"></select>
                </div>
            </div>
            <!-- dk delivery area list -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dkDeliveryAreaListContainerDivClass">
                <div id="dkDeliveryAreaListWrapperDivId" ng-controller="LocationController" ng-init="loadDKDeliveryAreaList('home')" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkDeliveryAreaListWrapperDivClass">
                    <span class="dkDeliveryAreaLblSClass">Type delivery area</span>
                    <select id="dkDeliveryAreaListSelectCtrlId" class="selectpicker show-menu-arrow show-tick" data-size="5" data-show-subtext='true' data-width="100%" data-live-search="true" title="Type delivery area"></select>
                </div>
            </div>
            <!-- dk desserts product list -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dkDeliveryAreaDessertsProductListContainerDivClass" ng-show="isDkDeliveryAreaChanged">
                <div id="dkDeliveryAreaDessertsProductListWrapperDivId" ng-controller="LocationController" ng-init="loadDKDeliveryAreaBasedProductTypeList(isDkDeliveryAreaChanged)" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkDeliveryAreaDessertsProductListWrapperDivClass">
                    <span class="dkDeliveryAreaDessertsProductLblSClass">Type desire desserts product</span>
                    <select id="dkDeliveryAreaDessertsProductListSelectCtrlId" class="selectpicker show-menu-arrow show-tick" data-size="5" data-show-subtext='true' data-width="100%" data-live-search="true" title="Type desire desserts product"></select>
                </div>
            </div>
        </div>
        
        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- desserts khazana served desserts product in your selected delivery area -->
        <div id='dl_DeliveryAreabasedDkServedAllDessertsContainerDivId' ng-controller="ProductTypeProductCategoryProductDetailsController" ng-show="isDessertsProductTypeProductListLoaded" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 dl_DeliveryAreabasedDkServedAllDessertsContainerDivClass'>
            
            <!-- display selected desserts product type viewing by customer -->
            <li class='dl_DkServedDessertsProductNoteLIClass'>
                <i class='fa fa-smile-o smileIconClass'></i> 
                Hey you are viewing '{{defaultDKServedDessertsProductType}}' and also we can serve other <span class="badge dashboardDessertsProductTypeCountSClass">{{deliveryAreabasedDkServedDessertsProductTypeList.length}}</span> desserts in your selected delivery area !!!
            </li> 
            
            <div id="dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivClass'>
                <!-- iterate each desserts products info-->  
                <div ng-repeat="eachDessertsProductTypeDetails in deliveryAreabasedDkServedDessertsProductTypeList | orderBy : '-isRequestedProductTypeIdMatched'" title='Click to view all {{eachDessertsProductTypeDetails.productTypeTitle}} desserts' class='dl_DeliveryAreabasedDkServedEachDessertsProductDivClass' scroll-horizontally-dessertsproducttypelist-dashboardlevel>
                    <p class="dessertsProductIconPClass">
                        <i class="{{eachDessertsProductTypeDetails.productIcon}} dessertsProductIconClass"></i>
                    </p>
                    <h2 class="dessertsProductTitleHClass">
                        {{eachDessertsProductTypeDetails.productTypeTitle}}
                    </h2>
                    <p ng-controller="LocationController" ng-click="collectDataToLoadProductTypeAllProductListForDashboarLevel(eachDessertsProductTypeDetails)" class="viewDessertsProductPClass">
                        View desserts
                    </p>
                </div>
            </div>
            
        </div>
        
        <!-- load desserts product type product list for dashboard level -->
        <div id="dashboardLevelAllProductTypeProductListContainerDivId" ng-controller="ProductTypeProductCategoryProductDetailsController" ng-show="isDessertsProductTypeProductListLoaded" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dl_AllProductTypeProductListContainerDivClass">
            
            <!-- each product type, product category iterate -->
            <div ng-repeat="eachProductTypeDetails in allProductTypeProductCategoryProductListForDashBoardLevel track by $index" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dl_EachProductTypeProductListContainerDivClass" scroll-top-when-display-rendering-finished-dessertsproductlist>
                <!-- display each desserts product type, product category title -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 eachProductTypeTitleContainerDivClass">
                    <p>
                        <button class="productTypeTitleBtnClass btn">
                            <i class="fa fa-birthday-cake"></i> {{eachProductTypeDetails.productTypeProductCategoryTitle}}
                        </button>
                        <button ng-click="collectDataToViewDeliveryAreabasedProductTypeAllProductList(eachProductTypeDetails)" class="viewAllProductAboutProductTypeBtnClass btn pull-right" title='Click to view {{eachProductTypeDetails.productCategoryTotalProductCount}} product(s) about {{eachProductTypeDetails.productTypeProductCategoryTitle}} desserts'>
                            VIEW ALL ({{eachProductTypeDetails.productCategoryTotalProductCount}})
                        </button>
                    </p>
                </div>
                <!-- display each desserts product category, all product list -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dl_allProductBoxWidgetContainerDivClass">
                    <div maxheight-productboxwidget-dashboardlevel ng-repeat="eachProductDetails in eachProductTypeDetails.allProductDetails" class="col-xs-6 col-sm-4 col-md-3 col-lg-3 dl_productBoxWidgetDivClass">
                        <img style='width:100%!important;' class='preloadProductImagesClass' data-original="{{eachProductDetails.productImageFilePath+eachProductDetails.productImageFileName}}" ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
                        <div class='col-xm-12 col-sm-12 col-md-12 col-lg-12 dl_productBoxWidgetDividerLineDivClass'></div>
                        <p class='dl_productStoreNameContainerPClass'>
                            <span class="dl_productStoreLabelNameSpanClass">Seller : </span>
                            <span class="dl_productStoreNameSpanClass">{{eachProductDetails.shopStoreTitle}}</span>
                        </p>
                        <p class='dl_productNamePClass'>
                            {{eachProductDetails.productListTitle}}
                        </p>
                        <p class='dl_productPricePClass'> 
                            <span class='productCutPriceTextSClass' ng-if="eachProductDetails.productFeatureDiscount!==''">
                                <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureBasePrice}}
                            </span>
                            <span class='dl_productPayBlgPriceTextSClass'>
                                <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureOnlineSellingPrice}}
                            </span>
                            <span class='dl_productDiscountPercentTextSClass' ng-if="eachProductDetails.productFeatureDiscount!==''">
                                ({{eachProductDetails.productFeatureDiscount}}% Off)
                            </span>
                        </p>
                        <p class='dl_productWeightPClass'>
                            Size : {{eachProductDetails.productFeatureDisplayMeasurementType}}
                        </p>
                        <p class='dl_productDeliveryLocationPClass'> 
                            <!-- CJ need to think about product delivery location to show on screen -->
                            Delivery <i class="fa fa-map-marker"></i> : At 12 area
                        </p>
                        <p class='dl_productBtnWrapperPClass'> 
                            <button ng-controller='WishListController' ng-click="prepareProductDataToAddInUWL(eachProductDetails)" title='Click to add {{eachProductDetails.productListTitle}} item in your default wishlist' class="dl_specificProductAddWishListBtnClass btn">
                                <i class="fa fa-heart"></i>
                            </button>
                            <button ng-controller='OrderCartController' ng-click="checkingProductDataToAddInOrdercart(eachProductDetails, false, 'home')" title='Click to add {{eachProductDetails.productListTitle}} item in order cart' class="dl_specificProductAddBtnClass btn">
                                <i class="fa fa-plus"></i>
                            </button>
                            <button title='Click to view more about {{eachProductDetails.productListTitle}} item details' class="dl_specificProductViewDetailsBtnClass btn" ng-click='viewProductDetails(eachProductDetails)'>
                                <i class="fa fa-list"></i>
                            </button>
                            <button ng-controller='ShopStoreController' ng-click='collectDataToViewCShopstore(eachProductDetails)' title='Click to view this seller store desserts(menu), information, review/rating' class="dl_specificViewStoreDetailsBtnClass btn">
                                STORE
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- not found show msg div -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dashBoardLevelNotFoundProductTypeProductCategoryProductListMsgDivClass">
                {{productTypeProductCategoryProductListNotFoundForDashBoardLevelMsgStr}}
            </div>
            
        </div>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
        
        <!-- what is desserts khazana -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 whatIsDessertsKhazanaMainContainerDivClass">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkPartyOrderContainerDivClass">
                <div class='dkPartyOrderWrapperDivClass'>
                    <img src='#' class='partyOrderImgClass' load-partyorder-images-directive>
                    <p ng-controller="PartyOrdersController" ng-click="redirectToViewPartyOrderRequest()" class='partyOrderPClass' title='Click to request for party orders'>
                        <span>PARTY ORDERS</span>
                    </p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkCustomizeDessertsOrderContainerDivClass">
                <div class='dkCustomizeDessertsOrderWrapperDivClass'>
                    <img src='#' class='customizeOrderImgClass' load-customizeorder-images-directive>
                    <p ng-controller="CustomizeOrdersController" ng-click="redirectToViewCustomizeOrderRequest()" class='customizeOrderPClass' title='Click to request for customize orders'>
                        <span>CUSTOMIZE ORDER</span>
                    </p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkCoperateSpecialOffersContainerDivClass">
                <div class='dkCoperateSpecialOffersWrapperDivClass'>
                    <img src='#' class='coperateOrderImgClass' load-coperatetieup-images-directive>
                    <p ng-controller="CorporateTieupController" ng-click="redirectToViewCorporateTieupRequest()" class='corporateOrderPClass' title='Click to request for corporate tie-up'>
                        <span>CORPORATE TIE-UP</span>
                    </p>
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


