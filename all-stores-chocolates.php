
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
    <body ng-cloak class="ng-cloak" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('allstorecakes');">

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

        <!-- all store wise info body  -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 allStoreInfoBodyWrapperDivClass">
            
            <!-- customer bread crumb -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cshopstore_userBreadcrumbDivClass">
                <ul class="cshopstore_userBreadcrumbULClass list-inline">
                    <li class='userBreadcrumbHomeLIClass'>
                        <a href="<?php echo $BaseSitePath;?>">
                            Home
                        </a>
                    </li>
                    <li class='userBreadcrumbProductTypeLIClass'>
                        |&nbsp; <a href="#">
                            Chocolates
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- create horizontally space div between -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>
        
            <!-- all store wise info container -->
            <div ng-controller="StoreController" ng-init="loadDeliveryAreaBasedDessertsTypeStoresList();" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 allStoreInfoContainerDivClass">
                
                <p ng-if="allStoresInfoList.length>0" class="allStoreInfoNoteHeaderPClass">
                    Order from {{allStoresInfoList.length}} stores delivering to your door
                </p>
            
                <!-- iterate each store info container -->
                <div ng-repeat="eachStoreInfoDataObj in allStoresInfoList" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 eachStoreInfoContainerDivClass">
                    <div class="eachStoreInfoInnerContainerDivClass">    
                        <p class="eachStoreNamePClass">
                            {{eachStoreInfoDataObj.shopStoreTitle}}
                        </p>
                        <p class="eachStoreLocationPClass">
                            <i class="fa fa-map-marker storeLocationMapIconClass"></i> {{eachStoreInfoDataObj.shopStoreOrgLocation}}
                        </p>
                        <hr class="eachStoreHrClass">
                        <p class="eachStoreReviewedRatingPClass" ng-if="eachStoreInfoDataObj.isReviewedRatingFound==='TRUE'">
                            <span class="eachStoreReviewedRatingBoxSClass">
                                {{eachStoreInfoDataObj.avgRatingReviewed}} <i class="fa fa-star"></i> ({{eachStoreInfoDataObj.totalUserRatingReviewed}})
                            </span>
                        </p>
                        <p class="eachStoreNoReviewedRatingPClass" ng-if="eachStoreInfoDataObj.isReviewedRatingFound==='FALSE'">
                            {{eachStoreInfoDataObj.reviewedRatingStr}}
                        </p>
                        <p class="eachStoreServedDessertsTypePClass">
                            <span>Served In: </span> 
                            <span>{{eachStoreInfoDataObj.dessertsTypeServedStr}}</span>
                        </p>
                        <p class="eachStoreServedDessertsTypeTotalProductPClass">
                            <span>Total Products: </span> 
                            <span>{{eachStoreInfoDataObj.totalProduct}}</span>
                        </p>
                        <p class="eachStoreDiscountUptoPClass">
                            Upto {{eachStoreInfoDataObj.discountUpto}} <i class="fa fa-percent eachStoreDiscountUptoIconClass"></i>
                        </p>
                        <p class="eachStoreDeliveryTimePClass">
                            delivers in {{eachStoreInfoDataObj.deliveryTime}}
                        </p>
                        <p class="eachStoreDeliveryFeeMsgPClass">
                            {{eachStoreInfoDataObj.deliveryFeeMsgStr}}
                        </p>
                        <p class="eachStoreOnlineOrderBtnPClass">
                            <button ng-controller='StoreController' ng-click='storeDessertsTypeDataDetailsInSessionStorageToViewStoreAllProductList(eachStoreInfoDataObj)' class="btn eachStoreOnlineOrderBtnClass">
                                ORDER ONLINE
                            </button>
                        </p>
                    </div>
                </div>
                
                <div ng-if="allStoresInfoList<=0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 noStoreFoundInfoMsgContainerDivClass">
                    <i class="fa fa-frown-o"></i> Sorry, we don't served any desserts at '{{selectedDeliveryAreaTextHeader}}' delivery area !!!
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


