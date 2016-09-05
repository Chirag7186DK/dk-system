
<?php 
    include "Site_config.inc.php"; 
?>

<!DOCTYPE html>
<html lang="en" ng-app='DKAPP'>
    
    <!-- head section start here -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title><?php echo $SiteTitle;?></title>
        <link rel="shortcut icon" href="images/dk/dklogo/fevicon.ico">
        <style>
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak{
                display:none !important;
            }
        </style>
    </head>

    <!-- body start here -->
    <body ng-cloak class="ng-cloak" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('chocolates-product');">
        
        <!-- first header -->
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
                    <li show-userselecteddeliveryareatextheader-directive class="showUserSelectedDeliveryAreaTextHeaderLIClass" title="Click here to change delivery location">
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

        <!-- view specific requested product details -->
        <div ng-controller="ProductController" ng-init="loadProductTypeProductCategoryProductDetails()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_containerDivClass activateHeaderOnwindowScroll">
            
            <!-- customer bread crumb -->
            <div customer-breadcrumb-directive class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_userBreadcrumbDivClass">
                <ul class="vpd_userBreadcrumbULClass list-inline">
                    <li class='userBreadcrumbHomeLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            {{customerBreadCrumbOnWebApp.homeTitle}}
                        </a>
                    </li>
                    <li class='userBreadcrumbProductTypeCategoryTypeLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.shopStoreTitle}}</a>
                    </li>
                    <li class='userBreadcrumbProductTypeLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.productTypeTitle}}</a>
                    </li>
                    <li class='userBreadcrumbProductTypeCategoryTypeLIClass'>
                        |&nbsp; <a href="#">{{customerBreadCrumbOnWebApp.productCategoryTitle}}</a>
                    </li>
                    <li class='vpd_userBreadcrumbProductTypeCategoryTypeProductListLIClass'>
                        |&nbsp; {{customerBreadCrumbOnWebApp.productListTitle}}
                    </li>
                </ul>
            </div>
            
            <!-- store serve other desserts type listed -->
            <div ng-controller="ShopStoreController" ng-init="loadDKDeliveryAreaBasedDessertsTypeList()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_shopStoreServedAllDessertsProductContainerDivClass">
                
                <li class="vpd_storeServedDessertsProductNoteLIClass">
                    <i class='fa fa-smile-o'></i> 
                    Hey you ordering from '{{customerBreadCrumbOnWebApp.shopStoreTitle}}' to deliver product at 
                    '{{userSelectedDeliveryAreaTextHeader}}' area !!!
                </li>
                
                <!-- display all desserts type can served by store in selected delivery area -->
                <div id="vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_shopStoreServedAllDessertsProductScrollerWrapperDivClass'>
                    
                    <!-- iterate each desserts type info display as horizontally scrolling -->
                    <div ng-repeat="eachDessertsTypeDetails in dkDeliveryAreaBasedDessertsTypeList | orderBy : '-isRequestedProductTypeIdMatched'" title='Click to view all {{eachDessertsTypeDetails.dessertsTypeTitle}} desserts all products' class='vpd_shopStoreServedEachDessertsProductScrollerWrapperDivClass' scroll-horizontally-dessertsproducttypelist-viewproductlevel>
                        <p class="dessertsProductIconPClass">
                            <i class="{{eachDessertsTypeDetails.dessertsIcon}} dessertsProductIconClass"></i>
                        </p>
                        <h2 class="dessertsProductTitleHClass">
                            {{eachDessertsTypeDetails.dessertsTypeTitle}}
                        </h2>
                        <p ng-click="storeDessertsTypeDataDetailsInSessionStorageToViewCStoreAllProductList(eachDessertsTypeDetails)" class="viewDessertsProductPClass">
                            View desserts
                        </p>
                    </div>
                    
                </div>
                
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- show product images -->
            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 vpd_productImagesContainerDivClass">
                <p class='vpd_productImagesDetailsLabelPClass'>
                    IMAGES
                </p>
                <hr class="vpd_horizontalLineClass">
                <img style='width:100%;' class='preloadProductImagesClass' data-original="{{vAllPDetails[0]['productImageFilePath']+vAllPDetails[0]['productImageFileName']}}" ng-src="<?php echo $BaseSitePath;?>images/productphotoback.png">
            </div>
            
            <!-- show product details -->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 vpd_productDetailsContainerDivClass">
                <p class='vpd_productDetailsLabelPClass'>
                    <i class='fa fa-birthday-cake'></i> PRODUCT
                </p>
                <hr class="vpd_horizontalLineClass">
                <p class='vpd_productStoreNameContainerPClass'>
                    <span class="vpd_productStoreLabelNameSpanClass">Seller: </span> 
                    <span class="vpd_productStoreNameSpanClass">{{customerBreadCrumbOnWebApp.shopStoreTitle}}</span>
                </p>
                <p class='vpd_productNamePClass'>
                    {{vAllPDetails[0]['productListTitle']}}
                </p>
                <p ng-controller='RatingReviewController' ng-init="loadAverageRatingReviewedAboutProduct()" class='vpd_productReviewAndRatingPClass' ng-show="avgRatingReviewedAboutProductDetails.isUserRatedAndReviewAbtProduct" title="To see detailed reviewed / rating about this item please scroll down page to rating / review section">
                    {{avgRatingReviewedAboutProductDetails.totalUserRatingAbtProduct}} reviewed,
                    {{avgRatingReviewedAboutProductDetails.totalUserRatingAbtProduct}} ratings,   
                    {{avgRatingReviewedAboutProductDetails.totalAvgRatingAbtProduct}} 
                    <i class="fa fa-star faa-tada animated vpd_productAvgRatedIconClass"></i> average rated based on (Quality/Taste, Delivery Services, Price)
                </p>
                <p ng-hide="avgRatingReviewedAboutProductDetails.isUserRatedAndReviewAbtProduct">
                    No rating & review from customer yet !!!
                </p>
                <hr>
                <p class='vpd_productSelectMeasurementLabelPClass'> 
                    Select Size
                    <select class='form-control' id="productMeasurementSelectCtrlId" title="This item is also available in another size">
                        <option ng-repeat="eachProductMeasurementDetails in vAllPDetails | orderBy : '-isRequestedProductDetailsMatched'" data-shopstore_id='{{eachProductMeasurementDetails.shopStoreId}}' data-product_typeid='{{eachProductMeasurementDetails.productTypeId}}' data-product_categoryid='{{eachProductMeasurementDetails.productTypeProductCategoryId}}' data-product_listid='{{eachProductMeasurementDetails.productListId}}' data-productfeatureid='{{eachProductMeasurementDetails.productFeatureId}}' data-productprice='{{eachProductMeasurementDetails.productFeatureOnlineSellingPrice}}' value="{{eachProductMeasurementDetails.productFeatureDisplayMeasurementType}}">
                            {{eachProductMeasurementDetails.productFeatureDisplayMeasurementType}}
                        </option>
                    </select>
                </p>
                <p class='viewProductPricePClass' title="Item price varies based on size/weight"> 
                    <span class='viewProductCutPriceTextSClass' ng-if="vAllPDetails[0]['productFeatureDiscount']">
                        <i class="fa fa-rupee"></i> {{vAllPDetails[0]['productFeatureBasePrice']}}
                    </span>
                    <span class='vpd_productPayBlgPriceTextSClass'>
                        <i class="fa fa-rupee faa-tada animated"></i> 
                        <i class='onlineProductSellingPriceTextClass'>{{vAllPDetails[0]['productFeatureOnlineSellingPrice']}}</i>
                    </span>
                    <span class='vpd_productDiscountPercentTextSClass' ng-if="vAllPDetails[0]['productFeatureDiscount']!==''">
                        ({{vAllPDetails[0]['productFeatureDiscount']}}% Off)
                    </span>
                </p>
                <p class='vpd_productQtyPClass'> 
                    <input view-productqtyinput-directive type='text' class='form-control vpd_productQtyInputClass' placeholder="Type Qty" title="Type Qty" value='1'>
                </p>
                <p class='vpd_productCommentBoxPClass' ng-if="vAllPDetails[0]['isShowProductCommentBox']=='Y'" title="Type 40 characters only & not allowed any special characters"> 
                    Message On Cake
                    <textarea view-productmsginput-directive class="form-control" placeholder="Type 40 characters only & not allowed any special characters"></textarea>
                </p>
                <p class='vpd_productAddToCartBtnPClass'> 
                    <button title="Click to add {{customerBreadCrumbOnWebApp.productListTitle}} item in order cart" ng-controller='OrderCartController' ng-click="checkProductDataToAddInOrdercart(false, 'vpd_productDetailsContainerDivClass', 'viewproduct')" class="vpd_specificProductAddBtnClass btn">
                        <i class="fa fa-shopping-cart"></i> ADD
                    </button>
                </p>
            </div>
            
            <!-- order summary details details -->
            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 vpd_orderSummaryContainerDivClass">
                <p class='vpd_orderSummaryLabelPClass'> 
                    <i class='fa fa-credit-card'></i> ORDER SUMMARY
                </p>
                <hr class="vpd_horizontalLineClass">
                <p class='vpd_orderSummaryTotalProductPricePClass'> 
                    Total Item(s) : {{ordercartItemRequestedCount}}
                </p>
                <p class='vpd_orderSummaryTotalProductAmtPClass'>
                    <i class="fa fa-rupee"></i> Subtotal Amount : {{subtotalOrderAmt}}
                </p>
                <p ng-if='ordercartItemRequestedCount>0' class='vpd_orderSummaryCheckoutBtnWrapperPClass'> 
                    <button class="vpd_orderSummaryCheckoutBtnClass btn">Checkout to Pay Rs: {{subtotalOrderAmt}}</button>
                </p>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

            <!-- product description details -->
            <div ng-show="isProductDescriptionDetailsFound" ng-controller='ProductController' ng-init="loadProductDescriptionDetails()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_featuresContainerDivClass">
                <div class="panel vpd_productDescriptionPanelContainerDivClass">
                    <div class="panel-heading vpd_productDescriptionPanelHeadingDivClass">
                        <h5 class='vpd_productDescriptionLabelHClass'>
                            <i class='fa fa-file-text-o'></i> DESCRIPTION
                        </h5>
                    </div>
                    <div id="vpd_productDescriptionPanelBodyContainerDivId" class="vpd_productDescriptionPanelBodyContainerDivClass">
                        <ul ng-repeat="eachDescriptionTitleAndPoints in productDescriptionDetailsArr" class="vpd_productDescriptionTitleULClass">
                            <li class='vpd_productDescriptionTitleLIClass'>{{eachDescriptionTitleAndPoints.descriptionTitle}}</li>
                            <ul class="vpd_productDescriptionULClass">
                                <li ng-repeat="eachPoints in eachDescriptionTitleAndPoints.descriptionPointsArr">{{eachPoints}}</li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
            
            <!-- product rating & reviews details -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_productRatingReviewDetailsContainerDivClass">
                <div class="panel vpd_productRatingReviewPanelContainerDivClass">
                    <div class="panel-heading vpd_productRatingReviewPanelHeadingDivClass">
                        <h5 class='vpd_productRatingReviewLabelHClass'>
                            <i class='fa fa-comment-o'></i> RATINGS & REVIEW
                        </h5>
                    </div>
                    <div id="vpd_productRatingReviewPanelBodyContainerDivId" class="vpd_productRatingReviewPanelBodyContainerDivClass">
                        <!-- rating and review summary about product -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_summaryReviewRatingDetailsContainerDivClass" ng-show="avgRatingReviewedAboutProductDetails.isUserRatedAndReviewAbtProduct">
                            <span class='vpd_summaryReviewRatingDetailsLabelSpanClass'>
                                {{avgRatingReviewedAboutProductDetails.totalUserRatingAbtProduct}} customer(s) reviewed,  
                                {{avgRatingReviewedAboutProductDetails.totalAvgRatingAbtProduct}} 
                                <i class="fa fa-star vpd_productAvgRatedIconClass"></i> average rated about product based on 
                            </span>
                            <div ng-controller='RatingReviewController' ng-init="loadMaxAverageRatingReviewedAboutProduct()" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_allMaxRatingQuestionSummaryReviewRatingDetailsDivClass'>
                                <div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 vpd_eachMaxRatingQuestionSummaryReviewRatingDetailsDivClass' ng-repeat="eachMaxRatingAndReviewedTypeDetails in maxRatingAndReviewedTypeDetailsArr">
                                    <h5 class='vpd_maxRatingAboutQuestionTitleHClass'>
                                        {{eachMaxRatingAndReviewedTypeDetails.ratingQuestionTitle}}
                                    </h5>
                                    <span class='vpd_maxRatingAboutQuestionAnswerDetailsHClass'>
                                        Highest {{eachMaxRatingAndReviewedTypeDetails.maxRating}} 
                                        <i class="fa fa-star"></i> rated from {{eachMaxRatingAndReviewedTypeDetails.userCount}} user(s)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- write review form details about product -->
                        <div ng-show="ratingReviewQuestionAboutProductByShopStoresDetails" ng-controller='RatingReviewController' ng-init="loadRatingReviewQuestionsAboutProductByShopStores()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_takeUserReviewRatingAboutProductContainerDivClass">
                            <p class='vpd_takeUserReviewRatingAboutProductLabelPClass'>
                                Write a review and rating about product ?
                            </p>
                            <div ng-repeat="eachReviewRatingTypeAboutProductDetails in ratingReviewQuestionAboutProductByShopStoresDetails" ng-if="'SELECT'===eachReviewRatingTypeAboutProductDetails.questionPattern" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_eachTakeUserReviewRatingTypeAboutProductContainerDivClass'>
                                <div class='col-xs-12 col-sm-12 col-md-2 col-lg-2 vpd_eachReviewRatingTypeTitleDivClass'>
                                    {{eachReviewRatingTypeAboutProductDetails.questionTitle}}
                                </div>
                                <div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                    <select class='form-control vpd_ratingAboutProductSelectCtrlClass'>
                                        <option data-productlistid="{{vPDetails.productDetails[0]['productListId']}}"  data-maxpoints='{{eachReviewRatingTypeAboutProductDetails.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeAboutProductDetails.questionPattern}}' data-shopstoreid='{{eachReviewRatingTypeAboutProductDetails.shopStoreId}}' data-questionid='{{eachReviewRatingTypeAboutProductDetails.reviewQuestionId}}' value='1'>1 Star</option>
                                        <option data-productlistid="{{vPDetails.productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeAboutProductDetails.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeAboutProductDetails.questionPattern}}' data-shopstoreid='{{eachReviewRatingTypeAboutProductDetails.shopStoreId}}' data-questionid='{{eachReviewRatingTypeAboutProductDetails.reviewQuestionId}}' value='2'>2 Star</option>
                                        <option data-productlistid="{{vPDetails.productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeAboutProductDetails.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeAboutProductDetails.questionPattern}}' data-shopstoreid='{{eachReviewRatingTypeAboutProductDetails.shopStoreId}}' data-questionid='{{eachReviewRatingTypeAboutProductDetails.reviewQuestionId}}' value='3'>3 Star</option>
                                        <option data-productlistid="{{vPDetails.productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeAboutProductDetails.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeAboutProductDetails.questionPattern}}' data-shopstoreid='{{eachReviewRatingTypeAboutProductDetails.shopStoreId}}' data-questionid='{{eachReviewRatingTypeAboutProductDetails.reviewQuestionId}}' value='4'>4 Star</option>
                                        <option data-productlistid="{{vPDetails.productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeAboutProductDetails.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeAboutProductDetails.questionPattern}}' data-shopstoreid='{{eachReviewRatingTypeAboutProductDetails.shopStoreId}}' data-questionid='{{eachReviewRatingTypeAboutProductDetails.reviewQuestionId}}' value='5'>5 Star</option>
                                    </select>
                                </div>
                            </div>
                            <div ng-repeat="eachReviewRatingTypeAboutProductDetails in ratingReviewQuestionAboutProductByShopStoresDetails" ng-if="'TEXTAREA'===eachReviewRatingTypeAboutProductDetails.questionPattern" class='col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_eachTakeUserReviewRatingTypeAboutProductContainerDivClass'>
                                <div class='col-xs-12 col-sm-12 col-md-2 col-lg-2 vpd_eachReviewRatingTypeTitleDivClass'>
                                    {{eachReviewRatingTypeAboutProductDetails.questionTitle}}
                                </div>
                                <div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                    <TEXTAREA data-productlistid="{{vPDetails.productDetails[0]['productListId']}}" data-maxpoints='{{eachReviewRatingTypeAboutProductDetails.maxPoints}}' data-questionpattern='{{eachReviewRatingTypeAboutProductDetails.questionPattern}}' data-shopstoreid='{{eachReviewRatingTypeAboutProductDetails.shopStoreId}}' data-questionid='{{eachReviewRatingTypeAboutProductDetails.reviewQuestionId}}' class='form-control watchProductReviewCommentInputElementLoadedInDom' placeholder="Write in your own words, max 500 characters"></TEXTAREA>
                                </div>
                            </div>
                            <div class='vpd_submitReviewBtnWrapperDivClass col-xs-12 col-sm-12 col-md-12 col-lg-12' ng-show='isRatingReviewQuestionDetailsFound'>
                                <div class='col-xs-12 col-sm-12 col-md-2 col-lg-2'></div>
                                <div ng-controller='RatingReviewController' class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                    <button ng-show='isEnableRatingReviewSubmitButton' ng-click="collectDataToAddRatingReviewAboutProduct('vpd_takeUserReviewRatingAboutProductContainerDivClass')" class='vpd_submitRatingReviewAboutProductBtnClass btn' title='Click to submit rating & review about product'>
                                        SUBMIT A REVIEW
                                    </button> 
                                    <span class='vpd_infoAbtToEnableSubmitRatingReviewBtnSClass' ng-hide='isEnableRatingReviewSubmitButton'>
                                        You can't post a review because you are not logged as a customer
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- displaying all user reviewed and rating details -->
                        <div ng-controller='RatingReviewController' ng-init="loadAllUserRatingReviewAboutProductDetails()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_displayAllUserReviewAboutProductContainerDivClass" ng-show="avgRatingReviewedAboutProductDetails.isUserRatedAndReviewAbtProduct">
                            <span class="vpd_allUserReviewRatingDetailsLabelSpanClass">
                                Displaying {{(allUserRatingReviewAboutProductDetailsArr).length}} customer(s) posted reviewed and ratings about product
                            </span>
                            <div ng-repeat="eachUserReviewedRatingDetails in allUserRatingReviewAboutProductDetailsArr" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 vpd_displayEachUserReviewAboutProductContainerDivClass">
                                <div class="col-xs-12 col-sm-12 col-md-11 col-lg-11 vpd_eachUserReviewedRatingRightSideDivClass">
                                    <p class="vpd_eachUserNameRatedReviewAbtProductPClass">
                                        reviewed & rated by {{eachUserReviewedRatingDetails.userName}} - {{eachUserReviewedRatingDetails.dated}}
                                    </p>
                                    <p ng-repeat="eachReviewedRatingTypeDetails in eachUserReviewedRatingDetails.allRatingReviewTypeDetails" ng-if="'SELECT'===eachReviewedRatingTypeDetails.answerPattern" class='vpd_eachUserRatedAbtProductPClass'>
                                        {{eachReviewedRatingTypeDetails.questionTitle}} : 
                                        <span class="vpd_ratedQuestionAboutProductSClass">{{eachReviewedRatingTypeDetails.givenAnswerPoints}} <i class="fa fa-star"></i></span>
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
        
        </div>
        
        <!-- refresh web application data -->
        <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
        
        <!-- load all css & js file-->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>
        
    </body>
    
</html>


