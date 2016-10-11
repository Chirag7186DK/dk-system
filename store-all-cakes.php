
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('store-all-cakes');">

    <!-- view store details like menu, information, rating/review from customer side -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeDetailsBodyWrapperDivClass">

        <!-- customer bread crumb -->
        <ul class="customerBreadcrumbULClass list-inline">
            <li class='customerBreadcrumbLIClass'>
                <a ui-sref="/">
                    Home
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
            <div ng-if="storeDeliveryAreaBasedDessertsTypeList.length>=1" class='storeDessertsMenuSummaryInfoDivClass'>
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
            <div ng-if="storeDeliveryAreaBasedDessertsTypeList.length>=1" id='storeCanServeDessertsTypeListScrollableWrapperDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 storeCanServeDessertsTypeListScrollableWrapperDivClass'>
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
        <div ng-show="productTypeAllProductCategoryList.length>=1" ng-controller="StoreController" ng-init="loadProductTypeAllProductCategoryListStore()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductTypeAllCategoryWrapperDivClass">
            <div ng-if="productTypeAllProductCategoryList.length>=1" id='storeProductTypeAllCategoryContainerDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductTypeAllCategoryContainerDivClass">
                <li horizontally-scrollable-producttype-productcategorylist-storelevel id="storeEachProductCategoryContainerLIId_{{$index}}" ng-click="toggleStoreProductTypeProductCategoryElementClass('storeEachProductCategoryContainerLIId_'+$index, 'storeProductTypeAllCategoryContainerDivClass'); storeProductTypeProductCategoryDataInSessionStore(eachProductCategoryDetails)" ng-repeat="eachProductCategoryDetails in productTypeAllProductCategoryList | orderBy : '-isRequestedProductCategoryMatched'" class='storeEachProductCategoryContainerLIClass'>
                    {{eachProductCategoryDetails.productTypeProductCategoryTitle + '\n(' + eachProductCategoryDetails.totalProductCount + ')'}}
                </li>
            </div>
        </div>

        <!-- product filter operation -->
        <div ng-show="productTypeAllProductCategoryList.length>=1" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductFilterOperationWrapperDivClass">
            <!-- info / tips about product filtering operation -->
            <p class='storeTipAbtProductFilterPClass'>
                Tip *: Use filter to find products more easy & quickly !
                <button ng-click="toggleStoreAllProductFilterContainer()" class="btn storeToggleProductFilterBtnClass">
                    <i class="fa fa-filter"></i> {{toggleStoreProductFilterBtnLabel}}
                </button>
            </p>
            <div ng-show="isShowStoreAllProductFilter" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 {{storeProductFilterPopupDivClass}}">
                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductFilterPopupBodyDivClass'>    
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductCountInfMsgPopupDivClass'>
                        <i class="fa fa-birthday-cake"></i> {{storeDefaultSelectProductCategoryTitle}} (Found {{storeTotalProductCount}} Items)
                    </div>
                    <!-- by price -->
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 storePriceFilterOperationDivClass'>
                        <p class='storePriceFilterLblPClass'>By price</p>
                        <select id='allProductPriceFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Price" multiple data-selected-text-format="count>1"></select>
                    </div>
                    <!-- by size -->
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 storeProductSizeFilterOperationDivClass'>
                        <p class='storeProductSizeFilterLblPClass'>By size</p>
                        <select id='allProductSizeFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Size" multiple data-selected-text-format="count>1"></select>
                    </div>
                    <!-- by discount -->
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-7 storeDiscountFilterOperationDivClass'>
                        <p class='storeDiscountFilterLblPClass'>By discount</p>
                        <select id='allProductDiscountFilterListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Discount" multiple data-selected-text-format="count>1"></select>
                    </div>
                </div>
            </div>
        </div>

        <!-- store all product list will be loaded here -->
        <div ng-controller="StoreController" ng-show="storeAllProductDetailsList" id='storeAllProductDetailsBodyWrapperDivId' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeAllProductDetailsBodyWrapperDivClass">

            <!-- found products count info display -->
            <div ng-show='storeAllProductDetailsList.length' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductFounCountInfoMsgDivClass'>
                <i class="fa fa-birthday-cake"></i> {{storeDefaultSelectProductCategoryTitle}} (Showing {{storeTotalProductCount}} Items)
            </div>

            <!-- each product details iterate for displaying purpose -->
            <div ng-repeat="eachProductDetails in storeAllProductDetailsList" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 storeProductBoxDivClass">
                <img class='preloadProductImagesClass' data-original="{{eachProductDetails.productImageFilePath}}" ng-src="images/productphotoback.png">
                <div class='col-xm-12 col-sm-12 col-md-12 col-lg-12 storeProductBoxDividerLineDivClass'></div>
                <p class='storeProductNamePClass'>
                    {{eachProductDetails.productListTitle}}
                </p>
                <p class='storeProductSizePClass'>
                    Size : {{eachProductDetails.productFeatureDisplayMeasurementType}}
                    <span ng-if="eachProductDetails.productAvailableSizeCount>1">
                        (more size available)
                    </span>
                    <span ng-if="eachProductDetails.productFeatureFoodType=='Eggless'"  class="pull-right">
                        <i class="fa fa-square storeProductVegIconClass"></i>
                    </span>
                    <span ng-if="eachProductDetails.productFeatureFoodType=='Egg'" class="pull-right storeProductVegIconClass">
                        <i class="fa fa-square storeProductVegIconClass"></i>
                    </span>
                </p>
                <p class='storeProductDeliveryTimePClass'>
                    <i class="fa fa-bus"></i> Est. delivery in {{eachProductDetails.individualProductDeliveryTime}}
                </p>
                <p class='storeProductPricePClass'> 
                    <span class='storeProductOnlineSellingPriceTextSClass'>
                        <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureOnlineSellingPrice}}
                    </span>
                    <span class='storeProductPriceCutTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                        <i class="fa fa-rupee"></i> {{eachProductDetails.productFeatureBasePrice}}
                    </span>
                    <span class='storeProductDiscountPercentTextSClass' ng-if="eachProductDetails.productFeatureDiscount !== ''">
                        ({{eachProductDetails.productFeatureDiscount}}% Off)
                    </span>
                </p>
                <p class='storeProductBtnWrapperPClass'> 
                    <button ng-controller='ProductController' ng-click='viewProductDetails(eachProductDetails)' class="storeViewProductDetailsBtnClass btn">
                        ORDER NOW
                    </button>
                </p>
            </div>

        </div>

        <!-- not found product show message div -->
        <div ng-hide='storeAllProductDetailsList.length' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeProductNotFoundMsgDivClass">
            {{storeProductNotFoundMsgStr}}
        </div>
        
        <!-- displaying all user reviewed rating details -->
        <div ng-show="isShowStoreRatingReviewDetails" ng-controller='StoreController' ng-init="loadStoreAllUserRatingReviewed()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeAllUserReviewedRatingContainerDivClass">
            <span ng-if="allUserRatingReviewDetails.length>0" class="storeAllUserReviewedRatingLblSClass">
                Displaying {{(allUserRatingReviewDetails).length}} customers reviewed and ratings about us
            </span>
            <div ng-repeat="eachUserReviewedRatingDetails in allUserRatingReviewDetails" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeDisplayEachUserReviewedRatingContainerDivClass">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <p class="storeEachUserNameRatedReviewPClass">
                        reviewed & rated by {{eachUserReviewedRatingDetails.userName}} - {{eachUserReviewedRatingDetails.dated}}
                    </p>
                    <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'SELECT' === eachReviewedRatingTypeDetails.answerPattern" class='storeEachUserRatedReviewPClass'>
                        {{eachReviewedRatingTypeDetails.questionTitle}} : 
                        <span class="storeEachUserRatingReviewQuestionAnswerSClass">{{eachReviewedRatingTypeDetails.givenAnswerPoints}} <i class="fa fa-star"></i></span>
                    </p>
                    <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'TEXTAREA' === eachReviewedRatingTypeDetails.answerPattern" class='cshopstore_eachUserReviewedCommentAbtProductPClass'>
                        {{eachReviewedRatingTypeDetails.answerText}}
                    </p>
                    <p class="storeEachUserAvgRatedReviewPClass">
                        Avg Rating : {{eachUserReviewedRatingDetails.avgRated}} OUT OF 5
                    </p>
                </div>
            </div>
            <div ng-hide='allUserRatingReviewDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeReviewRatingNotFoundMsgDivClass">
                No any customers reviewed & ratings yet about us !!!
            </div>
        </div>

        <!-- store working style -->
        <div ng-show='isShowStoreWorkingStyleDetails' ng-controller='StoreController' ng-init="loadStoresWorkingStyle()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeWorkingStyleWrapperDivClass">
            <div ng-show='storeWorkingStyleDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeWorkingStyleWrapperContainerDivClass">
                <p class='storeWorkingStyleHeaderPClass'>
                    Our Working Hours <i class="fa fa-clock-o faa-tada animated storeWorkingStyleTimeIconClass"></i>
                </p>
                <p class='storeWorkingStyleBodyPClass'>
                    <p ng-repeat="eachWorkingScheduleDetails in storeWorkingStyleDetails" class="storeWorkingEachDaySchedulePClass {{(eachWorkingScheduleDetails.isTodayDayMatched=='Y')?'storeWorkingTodayDaySchedulePClass':''}}">
                        <span>
                            {{eachWorkingScheduleDetails.dayName}} ({{eachWorkingScheduleDetails.openTime + "-" + eachWorkingScheduleDetails.closeTime}})
                        </span>
                    </p>
                </p>
            </div>
            <div ng-hide='storeWorkingStyleDetails' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeWorkingStyleNotFoundMsgDivClass">
                No working hours defined by '{{storeInfo.shopStoreNameInCaps}}' store !
            </div>
        </div>

    </div>

    <!-- create horizontally space div between -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

    <!-- refresh web application data -->
    <div id='refreshUserWebAppDataDivId' ng-init="CommonServicesObj.refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
   
</div>
