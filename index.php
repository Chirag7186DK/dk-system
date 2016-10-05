
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
        <base href="/dk-system/" />
        <link rel="shortcut icon" href="images/dk/dklogo/fevicon.ico">
        <style>
            [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak{
                display:none!important;
            }
        </style>
    </head>

    <!-- body start here -->
    <body ng-cloak class="ng-cloak" ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('home');">
        
        <!-- view will be loaded here-->
        <div id="dkSystemUIViewContentDivId" ui-view></div>
          
        <!-- load all css & js file-->
        <?php 
            include "loadAllJsCssFile.php"; 
        ?>
        
    </body>
    
</html>


