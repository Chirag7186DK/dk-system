
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('customize-order');">

    <!-- customize order  -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_bodyDivClass">

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
                Customize Order
            </li>
        </ul>

        <!-- customize order video -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_videoCoverageContainerDivClass">
           Customize order video will be come here with full width
        </div>

        <!-- customize order content -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 co_contentContainerDivClass">
            Customize order content will be come here
        </div>

        <!-- if not logged user then sign-up/sign-in button -->
        <div ng-if="isUserLoggedInSession==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 coSignInSignUpContainerDivClass">
            <p class="coSignInSignUpInfoPClass">
                <i class="fa fa-user accountSignUpSignInIconClass"></i> 
                Please Log In / Sign Up to request for customize order
            </p>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 coSignInSignUpBtnDivClass">
                <button ng-click="goToSignUpSignInAccountSection('customizeorder')" class='btn coSignInSignUpBtnClass' id='coSignInSignUpBtnId'>
                    Log In / Sign Up
                </button>
            </div>
        </div>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

    </div>
    
    <!-- refresh web application data -->
    <div id='refreshUserWebAppDataDivId' ng-init="CommonServicesObj.refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
    
</div>