
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('party-order');">
    
    <!-- party order  -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_bodyDivClass">

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
                Party Order
            </li>
        </ul>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- party order video -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_videoCoverageContainerDivClass">
           Party order video will be come here with full width
        </div>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- party order content -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 po_contentContainerDivClass">
            Party order content will be come here
        </div>

        <!-- if not logged user then sign-up/sign-in button -->
        <div ng-if="isUserLoggedInSession==false" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 poSignInSignUpContainerDivClass">
            <p class="poSignInSignUpInfoPClass">
                <i class="fa fa-user accountSignUpSignInIconClass"></i> 
                Please Log In / Sign Up to request for party order
            </p>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 poSignInSignUpBtnDivClass">
                <button ng-click="goToSignUpSignInAccountSection('partyorder')" class='btn poSignInSignUpBtnClass' id='poSignInSignUpBtnId'>
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