
<?php 
    include "Site_config.inc.php"; 
?>

<!DOCTYPE html>
<html lang="en" ng-app='DKAPP'>
    
    <!-- head section start here -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>
            <?php echo $SiteTitle; ?>
        </title>
        <link rel="shortcut icon" href="images/dk/dklogo/fevicon.ico">
        <base href="/dk-system/" />
        <style>
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak{
                display:none!important;
            }
        </style>
    </head>

    <!-- body start here -->
    <body ng-cloak class="ng-cloak" id="dkAppBodyId" id="dkAppBodyClass">
        
        <!-- web logo header --->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 webAppLogoAndMenuIconContainerDivClass">
            <h1 class='webLogoHClass'>
                <img class='dkLogoImgClass' src="#" load-dklogo-images-directive>
            </h1>
        </div>
        
        <!-- top menu bar -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeader_topMenuBarContainerDivClass">
            <ul class="topMenuBarULClass list-inline">
                <li>
                    <i class="fa fa-comment-o fa-flip-horizontal"></i> Care
                </li>
                <li ng-if="isShowSelectedDeliveryAreaTextHeader==true" class="selectedDeliveryAreaTextHeaderLIClass">
                    <i class="fa fa-map-marker"></i> At: {{selectedDeliveryAreaTextHeader}}
                </li>
                <li ng-controller="UsersController" ng-click="ordercartItemRequestedCount>0 && storeRequestedSectionNameToAccessInUserAccount('ordercart');">
                    <i class="fa fa-shopping-basket"></i> (Item: {{ordercartItemRequestedCount}}, Rs: {{subtotalOrderAmt}})
                </li>
                <li ng-if='isUserLoggedInSession==false' ng-click="goToSignUpSignInAccountSection('home')" ng-controller="UsersController">
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
                <li ng-if='isUserLoggedInSession==true' ng-click="signOutUser()" ng-controller="UsersController">
                    <i class="fa fa-sign-out"></i> Log Out
                </li>
            </ul>
        </div>
        
        <!-- header row border div class -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fHeaderRowBorderDivClass"></div>
        
        <!-- dynamically view will be loaded here-->
        <div id="loadingDynamicallyViewDivId" class="loadingDynamicallyViewDivClass" ui-view></div>
          
        <!-- first time will be load all css & js file -->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>
        
    </body>
    
</html>


