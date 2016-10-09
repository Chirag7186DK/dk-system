
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('cakes-product');">

    <!-- view specific requested product details -->
    <div ng-controller="ProductController" ng-init="loadProductTypeProductCategoryProductDetails()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_containerDivClass">

        <!-- customer bread crumb -->
        <ul customer-breadcrumb-directive class="customerBreadcrumbULClass list-inline">
            <li class='customerBreadcrumbLIClass'>
                <a ui-sref="/">
                    Home
                </a>
            </li>
            <li class='customerBreadcrumbLIClass'>
                |
            </li>
            <li class='customerBreadcrumbLIClass'>
                {{customerBreadCrumbOnWebApp.shopStoreTitle}}
            </li>
            <li class='customerBreadcrumbLIClass'>
                |
            </li>
            <li class='customerBreadcrumbLIClass'>
                {{customerBreadCrumbOnWebApp.productTypeTitle}}
            </li>
            <li class='customerBreadcrumbLIClass'>
                |
            </li>
            <li class='customerBreadcrumbLIClass'>
                {{customerBreadCrumbOnWebApp.productCategoryTitle}}
            </li>
            <li class='customerBreadcrumbLIClass'>
                |
            </li>
            <li class='customerBreadcrumbLIClass'>
                {{customerBreadCrumbOnWebApp.productListTitle}}
            </li>
        </ul>

        <!-- store served all desserts type info -->
        <div ng-controller="StoreController" ng-init="loadStoreDeliveryAreaBasedDessertsTypeList()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 storeServeDessertsTypeContainerDivClass">

            <!-- display selected desserts type title ordering by customer -->
            <li ng-if="storeDeliveryAreaBasedDessertsTypeList.length==1" class="storeServingDessertsTypeNoteInfoLIClass">
                <i class='fa fa-smile-o'></i> 
                Hey you are ordering product from '{{customerBreadCrumbOnWebApp.shopStoreTitle}}'  
                to deliver in '{{selectedDeliveryAreaTextHeader}}' area !!!
            </li>
            <li ng-if="storeDeliveryAreaBasedDessertsTypeList.length>1" class="storeServingDessertsTypeNoteInfoLIClass">
                <i class='fa fa-smile-o'></i> 
                Hey you are viewing '{{customerBreadCrumbOnWebApp.shopStoreTitle}}' product and also can serve other 
                    <span class="badge storeCanServeDessertsTypeCountSClass">
                        {{storeDeliveryAreaBasedDessertsTypeList.length}}
                    </span>
                desserts in your '{{selectedDeliveryAreaTextHeader}}' delivery area !!!
            </li>

            <!-- display all desserts type can served by store in your selected delivery area -->
            <div ng-if="storeDeliveryAreaBasedDessertsTypeList.length>1" id='storeCanServeDessertsTypeListScrollableWrapperDivId' class='col-xs-12 col-sm-12 col-md-12 col-lg-12 storeCanServeDessertsTypeListScrollableWrapperDivClass'>
                <!-- iterate each desserts type info display as horizontally scrolling -->
                <div horizontally-scrollable-dessertstypelist-storelevel ng-repeat="eachDessertsTypeDetails in storeDeliveryAreaBasedDessertsTypeList | orderBy: '-isRequestedProductTypeIdMatched'" class='storeCanServeEachDessertsTypeScrollableWrapperDivClass'>
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

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass" style="margin-bottom:0px!important;"></div>

        <!-- showing product images -->
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 vpd_productImagesContainerDivClass">
            <img style='width:100%;' class='preloadProductImagesClass' data-original="{{productDetails[0]['productImageFilePath']+productDetails[0]['productImageFileName']}}" ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
        </div>

        <!-- showing product details -->
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 vpd_productDetailsContainerDivClass">
            <p class='vpd_productNamePClass'>
                <i class='fa fa-birthday-cake'></i> {{productDetails[0]['productListTitle']}}
            </p>
            <hr class="vpd_horizontalLineClass">
            <p class='vpd_productStoreNameContainerPClass'>
                <span class="vpd_productStoreLabelNameSpanClass">
                    Seller: 
                </span> 
                <span class="vpd_productStoreNameSpanClass">
                    {{productDetails[0]['shopStoreTitle']}}
                </span>
            </p>
            <p ng-controller='RatingReviewController' ng-init="loadAverageRatingReviewedProduct()" class='vpd_productReviewAndRatingPClass' ng-show="avgRatingReviewedProductDetails.isUserRatedAndReviewProduct">
                {{avgRatingReviewedProductDetails.totalUserRatingProduct}} reviewed,
                {{avgRatingReviewedProductDetails.totalUserRatingProduct}} ratings,   
                {{avgRatingReviewedProductDetails.totalAvgRatingProduct}} 
                <i class="fa fa-star faa-tada animated vpd_productAvgRatedIconClass"></i> average rated based on (Quality/Taste, Delivery Services, Price)
            </p>
            <p ng-hide="avgRatingReviewedProductDetails.isUserRatedAndReviewProduct">
                No rating & review from customer yet !!!
            </p>
            <hr>
            <p ng-init="loadStoreDeliveryFeeApplicableMsgOnDeliveryArea();" class="vpd_storeDeliveryFromAreaToAreaPClass">
                Order will be deliver from {{productDetails[0]['areaTitle']}} to {{selectedDeliveryAreaTextHeader}}
            </p>
            <p class="vpd_storeDeliveryFeeApplicableMsgPClass">
                {{storeDeliveryFeeApplicableMsg}}
            </p>
            <p class="vpd_estimatedProductDeliveryTimePClass">
                <i class='fa fa-bus'></i> Est. Delivery: 
                <span class="estimatedProductShippingDeliveryTimeSClass">
                    {{productDetails[0]['individualProductDeliveryTime']}}
                </span>
            </p>
            <hr>
            <p class='vpd_productSelectMeasurementLabelPClass'> 
                Select Size
                <select class='form-control' id="productMeasurementSelectCtrlId">
                    <option data-productdata="{{eachMeasurementDetails}}" ng-repeat="eachMeasurementDetails in productDetails" value="{{eachMeasurementDetails.productFeatureDisplayMeasurementType}}">
                        {{eachMeasurementDetails.productFeatureDisplayMeasurementType}}
                    </option>
                </select>
            </p>
            <p class='viewProductPricePClass'> 
                <span class='vpd_productPayBlgPriceTextSClass'>
                    <i class="fa fa-rupee faa-tada animated"></i> 
                    <i class='onlineProductSellingPriceTextClass'>
                        {{productDetails[0]['productFeatureOnlineSellingPrice']}}
                    </i>
                </span>
                <span ng-if="productDetails[0]['productFeatureBasePrice']!==''" class='vpd_productCutPriceTextSClass'>
                    <i class="fa fa-rupee"></i> 
                    {{productDetails[0]['productFeatureBasePrice']}}
                </span>
                <span ng-if="productDetails[0]['productFeatureDiscount']!==''" class='vpd_productDiscountPercentTextSClass'>
                    ({{productDetails[0]['productFeatureDiscount']}}% Off)
                </span>
            </p>
            <p class='vpd_productQtyPClass'>
                Qty
                <input product-qty-input-directive type='text' class='form-control vpd_productQtyInputClass' placeholder="Type Qty" value='1'>
            </p>
            <p class='vpd_productCommentBoxPClass' ng-if="productDetails[0]['isShowProductCommentBox']=='Y'"> 
                Message On Cake
                <textarea product-msgbox-directive class="form-control" placeholder="Type 40 characters only & not allowed any special characters"></textarea>
            </p>
            <p class='vpd_productAddToCartBtnPClass'> 
                <button ng-controller='OrderCartController' ng-click="checkProductDataToAddInOrdercart('vpd_productDetailsContainerDivClass', 'cakes-product')" class="vpd_specificProductAddBtnClass btn">
                    <i class="fa fa-shopping-cart"></i> ADD
                </button>
            </p>
        </div>

        <!-- order summary details details -->
        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 vpd_orderSummaryContainerDivClass">
            <p class='vpd_orderSummaryHeaderLblPClass'> 
                <i class='fa fa-shopping-basket'></i> CART SUMMARY
            </p>
            <hr class="vpd_horizontalLineClass">
            <p class="vpd_totalOrderStorePClass">
                Total Stores: {{totalStores}}
            </p>
            <p class="vpd_totalOrderItemPClass">
                Total Item: {{ordercartItemRequestedCount}}
            </p>
            <p class="vpd_orderSubtotalAmtPClass">
                Subtotal (Rs): {{subtotalOrderAmt}}
            </p>
            <p class="vpd_totalOrderDeliveryFeePClass">
                Total Delivery (Rs): {{totalDeliveryFee}}
            </p>
            <p class="vpd_totalOrderAmtPClass">
                Total (Rs): {{totalOrderAmt}}
            </p>
            <p ng-if='ordercartItemRequestedCount>0' class='vpd_orderSummaryCheckoutBtnWrapperPClass'> 
                <button class="btn vpd_orderSummaryCheckoutBtnClass">
                    CHECKOUT
                </button>
            </p>
        </div>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- product description details -->
        <div ng-if="productDetails[0]['isProductDescriptionAvailable']=='Y'" ng-controller='ProductController' ng-init="loadProductDescriptionDetails();toggleProductDescriptionContent('vpd_productFeaturesBodyContainerDivId');" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_productFeaturesContainerDivClass">
            <p class="vpd_productDescriptionLabelHeaderPClass" ng-click="toggleProductDescriptionContent('vpd_productFeaturesBodyContainerDivId');">
                <i class='fa fa-file-text-o'></i> INFORMATION
                <span class="{{toggleProductDescriptionIconClass}} moreLessProductDescriptionIconClass"></span>
            </p>
            <div id="vpd_productFeaturesBodyContainerDivId" class="vpd_productFeaturesBodyContainerDivClass">
                <ul ng-repeat="eachDescriptionTitleAndPoints in productDescriptionDetailsArr" class="vpd_productDescriptionTitleULClass">
                    <li class='vpd_productDescriptionTitleLIClass'>{{eachDescriptionTitleAndPoints.descriptionTitle}}</li>
                    <ul class="vpd_productDescriptionULClass">
                        <li ng-repeat="eachPoints in eachDescriptionTitleAndPoints.descriptionPointsArr">{{eachPoints}}</li>
                    </ul>
                </ul>
            </div>
        </div>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- product rating/review details -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_ratingReviewProductContainerDivClass" ng-init="toggleRatingReviewProductContent('vpd_ratingReviewProductBodyDivId');">
            <p class="vpd_ratingReviewProductHeaderPClass" ng-click="toggleRatingReviewProductContent('vpd_ratingReviewProductBodyDivId');">
                <i class='fa fa-comment-o'></i> RATINGS & REVIEW
                <span class="{{toggleRatingReviewProductIconClass}} moreLessRatingReviewProductIconClass"></span>
            </p>
            <div id="vpd_ratingReviewProductBodyDivId" class="vpd_ratingReviewProductBodyDivClass">

                <!-- write review form details about product -->
                <div ng-show="storeRatingReviewQuestionDetails" ng-controller='RatingReviewController' ng-init="loadStoreRatingReviewQuestions()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_takeUserReviewRatingProductContainerDivClass">
                    <p class='vpd_takeUserReviewRatingProductLblPClass'>
                        Write a review and rating about product ?
                    </p>
                    <div ng-repeat="eachReviewRatingTypeObj in storeRatingReviewQuestionDetails" ng-if="'SELECT'===eachReviewRatingTypeObj.questionPattern" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_eachTakeUserReviewRatingTypeProductContainerDivClass'>
                        <div class='col-xs-12 col-sm-12 col-md-2 col-lg-2 vpd_eachReviewRatingTypeTitleDivClass'>
                            {{eachReviewRatingTypeObj.questionTitle}}
                        </div>
                        <div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <select class='form-control vpd_ratingProductSelectCtrlClass'>
                                <option data-productlistid="{{productDetails[0]['productListId']}}"  data-maxpoints='{{eachReviewRatingTypeObj.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeObj.questionPattern}}' data-storeid='{{eachReviewRatingTypeObj.shopStoreId}}' data-questionid='{{eachReviewRatingTypeObj.reviewQuestionId}}' value='1'>1 Star</option>
                                <option data-productlistid="{{productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeObj.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeObj.questionPattern}}' data-storeid='{{eachReviewRatingTypeObj.shopStoreId}}' data-questionid='{{eachReviewRatingTypeObj.reviewQuestionId}}' value='2'>2 Star</option>
                                <option data-productlistid="{{productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeObj.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeObj.questionPattern}}' data-storeid='{{eachReviewRatingTypeObj.shopStoreId}}' data-questionid='{{eachReviewRatingTypeObj.reviewQuestionId}}' value='3'>3 Star</option>
                                <option data-productlistid="{{productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeObj.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeObj.questionPattern}}' data-storeid='{{eachReviewRatingTypeObj.shopStoreId}}' data-questionid='{{eachReviewRatingTypeObj.reviewQuestionId}}' value='4'>4 Star</option>
                                <option data-productlistid="{{productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeObj.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeObj.questionPattern}}' data-storeid='{{eachReviewRatingTypeObj.shopStoreId}}' data-questionid='{{eachReviewRatingTypeObj.reviewQuestionId}}' value='5'>5 Star</option>
                            </select>
                        </div>
                    </div>
                    <div ng-repeat="eachReviewRatingTypeObj in storeRatingReviewQuestionDetails" ng-if="'TEXTAREA'===eachReviewRatingTypeObj.questionPattern" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_eachTakeUserReviewRatingTypeProductContainerDivClass'>
                        <div class='col-xs-12 col-sm-12 col-md-2 col-lg-2 vpd_eachReviewRatingTypeTitleDivClass'>
                            {{eachReviewRatingTypeObj.questionTitle}}
                        </div>
                        <div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <TEXTAREA data-productlistid="{{productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeObj.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeObj.questionPattern}}' data-storeid='{{eachReviewRatingTypeObj.shopStoreId}}' data-questionid='{{eachReviewRatingTypeObj.reviewQuestionId}}' class='form-control watchProductReviewCommentInputElementLoadedInDom' placeholder="Write in your own words, max 500 characters"></TEXTAREA>
                        </div>
                    </div>
                    <div class='vpd_submitReviewBtnWrapperDivClass col-xs-12 col-sm-12 col-md-12 col-lg-12' ng-show='isStoreRatingReviewQuestionFound'>
                        <div class='col-xs-12 col-sm-12 col-md-2 col-lg-2'></div>
                        <div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <button ng-show='isEnableRatingReviewSubmitButton' ng-click="collectDataToAddUserRatingReviewProduct('vpd_takeUserReviewRatingProductContainerDivClass')" class='vpd_submitRatingReviewAboutProductBtnClass btn'>
                                SUBMIT A REVIEW
                            </button> 
                            <span class='vpd_infoAbtToEnableSubmitRatingReviewBtnSClass' ng-hide='isEnableRatingReviewSubmitButton'>
                                You can't post a review because you are not logged as a customer
                            </span>
                        </div>
                    </div>
                </div>

                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

                <!-- rating and review summary about product -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_summaryReviewRatingContainerDivClass" ng-if="avgRatingReviewedProductDetails.isUserRatedAndReviewProduct">
                    <span class='vpd_summaryReviewRatingLblSClass'>
                        {{avgRatingReviewedProductDetails.totalUserRatingProduct}} customer(s) reviewed,  
                        {{avgRatingReviewedProductDetails.totalAvgRatingProduct}} 
                        <i class="fa fa-star vpd_productAvgRatedIconClass"></i> average rated about product based on 
                    </span>
                    <div ng-controller='RatingReviewController' ng-init="loadMaxAverageRatingReviewedProduct()" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_allMaxReviewRatingDetailsDivClass'>
                        <div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 vpd_eachQuestionMaxRatingReviewDetailsDivClass' ng-repeat="eachMaxRatingReviewedTypeDetails in maxRatingReviewedTypeDetailsArr">
                            <h5 class='vpd_maxRatingAboutQuestionTitleHClass'>
                                {{eachMaxRatingReviewedTypeDetails.ratingQuestionTitle}}
                            </h5>
                            <span class='vpd_maxRatingAboutQuestionAnswerDetailsHClass'>
                                Highest {{eachMaxRatingReviewedTypeDetails.maxRating}} 
                                <i class="fa fa-star"></i> rated from {{eachMaxRatingReviewedTypeDetails.userCount}} user(s)
                            </span>
                        </div>
                    </div>
                </div>

                <!-- create horizontally space div between -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

                <!-- displaying all user reviewed and rating details -->
                <div ng-controller='RatingReviewController' ng-init="loadAllUserRatingReviewProduct()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_displayAllUserReviewAboutProductContainerDivClass" ng-if="avgRatingReviewedProductDetails.isUserRatedAndReviewProduct">
                    <span class="vpd_allUserReviewRatingDetailsLabelSpanClass">
                        Displaying {{(allUserRatingReviewAboutProductDetailsArr).length}} customer(s) posted reviewed and ratings about product
                    </span>
                    <!-- iterate each user rating/review details -->
                    <div ng-repeat="eachUserReviewedRatingDetails in allUserRatingReviewAboutProductDetailsArr" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_displayEachUserReviewAboutProductContainerDivClass">
                        <div class="col-xs-12 col-sm-12 col-md-11 col-lg-11 vpd_eachUserReviewedRatingRightSideDivClass">
                            <p class="vpd_eachUserNameRatedReviewAbtProductPClass">
                                reviewed & rated by {{eachUserReviewedRatingDetails.userName}} - {{eachUserReviewedRatingDetails.dated}}
                            </p>
                            <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'SELECT'===eachReviewedRatingTypeDetails.answerPattern" class='vpd_eachUserRatedAbtProductPClass'>
                                {{eachReviewedRatingTypeDetails.questionTitle}} : 
                                <span class="vpd_ratedQuestionAboutProductSClass">
                                    {{eachReviewedRatingTypeDetails.givenAnswerPoints}} <i class="fa fa-star"></i>
                                </span>
                            </p>
                            <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'TEXTAREA'===eachReviewedRatingTypeDetails.answerPattern" class='vpd_eachUserReviewedCommentAbtProductPClass'>
                                {{eachReviewedRatingTypeDetails.answerText}}
                            </p>
                            <p class="vpd_eachUserAvgRatedReviewAbtProductPClass">
                                Avg Rating : {{eachUserReviewedRatingDetails.avgRated}} OUT OF 5 
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    
    <!-- refresh web application data -->
    <div id='refreshUserWebAppDataDivId' ng-init="CommonServicesObj.refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
    
</div>
