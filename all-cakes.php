
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
    <body ng-cloak class="ng-cloak" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('allcakes');">
        
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
                    <li show-userselecteddeliveryareatextheader-directive class="showUserSelectedDeliveryAreaTextHeader" title="Click here to change delivery location">
                        <i class="fa fa-map-marker"></i> At: {{userSelectedDeliveryAreaTextHeader}}
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
        
        <!-- view specific desserts type all products list with category wise -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_containerDivClass">
            
            <!-- customer bread crumb -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_userBreadcrumbDivClass">
                <ul class="vap_userBreadcrumbULClass list-inline">
                    <li class='vap_userBreadcrumbHomeLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            Home
                        </a>
                    </li>
                    <li class='vap_userBreadcrumbProductTypeLIClasss'>
                        | &nbsp;&nbsp;<a href="#">Cakes</a>
                    </li>
                </ul>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
        
            <!-- view desserts khazana served all desserts type in your selected delivery area -->
            <div id='vap_deliveryAreabasedDkServedAllDessertsContainerDivId' ng-controller="ProductController" ng-init="loadDKDeliveryAreaBasedDessertsTypeList()" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_deliveryAreabasedDkServedAllDessertsContainerDivClass'>
                <!-- display selected desserts type title ordering by customer -->
                <li ng-if="dkDeliveryAreaBasedDessertsTypeList.length>1" class='vap_dkServedDessertsProductNoteLIClass'>
                    <i class='fa fa-smile-o smileIconClass'></i> 
                    Hey you are viewing 'Cakes' and also we can serve other 
                    <span class="badge vap_dessertsTypeCountSClass">
                        {{dkDeliveryAreaBasedDessertsTypeList.length}}
                    </span> desserts in your '{{userSelectedDeliveryAreaTextHeader}}' delivery area !!!
                </li> 
                <li ng-if="dkDeliveryAreaBasedDessertsTypeList.length==1" class='vap_dkServedDessertsProductNoteLIClass'>
                    <i class='fa fa-smile-o smileIconClass'></i> 
                    Hey you are viewing 'Cakes' desserts at '{{userSelectedDeliveryAreaTextHeader}}' delivery area !!!
                </li> 
                <div ng-if="dkDeliveryAreaBasedDessertsTypeList.length>=1" id="vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivClass'>
                    <!-- iterate each desserts type info display as horizontally scrolling -->
                    <div ng-repeat="eachDessertsTypeDetails in dkDeliveryAreaBasedDessertsTypeList | orderBy : '-isRequestedProductTypeIdMatched'" title='Click to view {{eachDessertsTypeDetails.dessertsTypeTitle}} desserts all products' class='vap_deliveryAreabasedDkServedEachDessertsProductDivClass' scroll-horizontally-dessertsproducttypelist-allproductlevel>
                        <p class="vap_dessertsProductIconPClass">
                            <i class="{{eachDessertsTypeDetails.dessertsIcon}} vap_dessertsProductIconClass"></i>
                        </p>
                        <h2 class="vap_dessertsProductTitleHClass">
                            {{eachDessertsTypeDetails.dessertsTypeTitle}}
                        </h2>
                        <p ng-click="storeDessertsTypeDataDetailsInSessionStorageToViewAllProductList(eachDessertsTypeDetails)" class="vap_viewDessertsProductPClass">
                            View desserts
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- requested desserts type all product category list will be display here -->
            <div ng-show="productTypeAllProductCategoryList.length>1" ng-controller="ProductController" ng-init="loadProductTypeAllProductCategoryList()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_productAllCategoryWrapperDivClass">
                
                <p ng-if="productTypeAllProductCategoryList.length>1" class='vap_productInfoAbtProductCategoryMsgPClass'>
                    Info *: <i class="fa fa-smile-o"></i> Hey you can choose products from 
                    <span class="badge totalCountProductCategorySClass">
                        {{productTypeAllProductCategoryList.length}}
                    </span> categories !
                </p>
                
                <div ng-if="productTypeAllProductCategoryList.length>1" id='vap_productAllCategoryContainerDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_productAllCategoryContainerDivClass">
                    <li id="vap_eachProductCategoryContainerLIId_{{$index}}" ng-click="toggleProductTypeProductCategoryElementClass('vap_eachProductCategoryContainerLIId_'+$index, 'vap_productAllCategoryContainerDivClass'); storeProductTypeProductCategoryDataInSession(eachProductCategoryDetails)" ng-repeat="eachProductCategoryDetails in productTypeAllProductCategoryList | orderBy : '-isRequestedProductCategoryMatched'" title='Click here to view all product about {{eachProductCategoryDetails.productTypeProductCategoryTitle}} desserts' class='vap_eachProductCategoryContainerLIClass' scroll-horizontally-dessertsproducttype-productcategorylist-allproductlevel>
                        {{eachProductCategoryDetails.productTypeProductCategoryTitle+'\n('+eachProductCategoryDetails.totalProductCount+')'}}
                    </li>
                </div>
                
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- product filter operation -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_allProductFilterOperationWrapperDivClass">
                    
                <!-- info / tips about product filtering operation -->
                <p class='vap_tipAbtFilterProductPClass'>
                    Tip *: Use filter to find products more easy & quickly !
                    <button ng-click="toggleViewAllProductFilterContainer()" class="btn vap_toggleProductFilterBtnClass" title="Click to show/hide product filter">
                        <i class="fa fa-filter"></i> {{toggleViewAllProductFilterBtnLabel}}
                    </button>
                </p>
                    
                <div ng-show="isShowViewAllProductFilter" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 {{productViewAllFilterPopDivClass}}">
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_productFilterPopupBodyDivClass'>
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_allProductInfoAbtProductCategoryProductFoundMsgPopupDivClass'>
                            <i class="fa fa-birthday-cake"></i> {{defaultSelectProductCategoryTitle}} (Found {{totalProductCount}} Items)
                        </div>
                        <!-- by store -->
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 vap_shopStoreFilterOperationDivClass'>
                            <p class='vap_labelStoreFilterPClass'>By seller</p>
                            <select id='allShopStoresFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Store" data-selected-text-format="count>1"></select>
                        </div>
                        <!-- by price -->
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 vap_priceFilterOperationDivClass'>
                            <p class='vap_labelPriceFilterPClass'>By price</p>
                            <select id='allProductPriceFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Price" multiple data-selected-text-format="count>1"></select>
                        </div>
                        <!-- by size -->
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 vap_sizeFilterOperationDivClass'>
                            <p class='vap_labelSizeFilterPClass'>By size</p>
                            <select id='allProductSizeFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Size" multiple data-selected-text-format="count>1"></select>
                        </div>
                        <!-- by discount -->
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 vap_discountFilterOperationDivClass'>
                            <p class='vap_labelDiscountFilterPClass'>By discount</p>
                            <select id='allProductDiscountFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Discount" multiple data-selected-text-format="count>1"></select>
                        </div>
                    </div>
                </div>
                    
            </div>
            
            <!-- all product list will be loaded here -->
            <div id='vapWrapperDivId' ng-controller="ProductController" ng-show="allProductDetailsList" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vapWrapperDivClass">
                <!-- summary info display -->
                <div ng-show="allProductDetailsList.length" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_allProductInfoAbtProductCategoryProductFoundMsgDivClass'>
                    <i class="fa fa-birthday-cake"></i> {{defaultSelectProductCategoryTitle}} (Showing {{allProductDetailsList.length}} Items)
                </div>
                <!-- each product details iterate for displaying -->
                <div maxheight-productboxwidget-allproductslevel ng-repeat="eachProductDetails in allProductDetailsList" class="col-xs-6 col-sm-4 col-md-3 col-lg-3 vap_productBoxWidgetDivClass">
                    <img style='width:100%!important;' class='preloadProductImagesClass' data-original="data/vendor_cb1/dessertsproducttype/cakes/regular/r1_(270x239).png" ng-src="<?php echo $BaseSitePath; ?>images/productphotoback.png">
                    <div class='col-xm-12 col-sm-12 col-md-12 col-lg-12 vap_productBoxWidgetDividerLineDivClass'></div>
                    <p class='vap_productStoreNameContainerPClass'>
                        <span class="vap_productStoreLabelNameSpanClass">Seller : </span>
                        <span class="vap_productStoreNameSpanClass">{{eachProductDetails.shopStoreTitle}}</span>
                    </p>
                    <p class='vap_storeNearByPClass'>
                        Nearest by: {{eachProductDetails.areaTitle}}
                    </p>
                    <p class='vap_productNamePClass'>
                        {{eachProductDetails.productListTitle}}
                    </p>
                    <p class='vap_productPricePClass'> 
                        <span class='vap_productCutPriceTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                            <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureBasePrice}}
                        </span>
                        <span class='vap_productPayBlgPriceTextSClass'>
                            <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureOnlineSellingPrice}}
                        </span>
                        <span class='vap_productDiscountPercentTextSClass' ng-if="eachProductDetails.productFeatureDiscount!==''">
                            ({{eachProductDetails.productFeatureDiscount}}% Off)
                        </span>
                    </p>
                    <p class='vap_productWeightPClass'>
                        Size : {{eachProductDetails.productFeatureDisplayMeasurementType}} 
                        <span ng-if="eachProductDetails.productFeatureFoodType=='Eggless'"  class="pull-right vap_productVegIconClass">
                            <i class="fa fa-square"></i>
                        </span>
                        <span ng-if="eachProductDetails.productFeatureFoodType=='Egg'" class="pull-right vap_productNonvegIconClass">
                            <i class="fa fa-square"></i>
                        </span>
                    </p>
                    <p class='vap_productBtnWrapperPClass'> 
                        <button ng-controller='OrderCartController' ng-click="checkProductDataToAddInOrdercart(eachProductDetails, false, 'allproducts')" title='Click to add {{eachProductDetails.productListTitle}} item in order cart' class="vap_specificProductAddBtnClass btn">
                            <i class="fa fa-plus"></i>
                        </button>
                        <button title='Click to view more about {{eachProductDetails.productListTitle}} item details' class="vap_specificProductViewDetailsBtnClass btn" ng-click='viewProductDetails(eachProductDetails)'>
                            <i class="fa fa-list"></i>
                        </button>
                        <button ng-controller='ShopStoreController' ng-click='collectDataToViewCShopstore(eachProductDetails)' title='Click to view this seller store desserts(menu), information, review/rating' class="vap_specificViewStoreDetailsBtnClass btn">
                            STORE
                        </button>
                    </p>
                </div>
            </div>
            
            <!-- not found show message div -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vap_notFoundProductMsgDivClass">
                {{notFoundProductMsgStr}}
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


