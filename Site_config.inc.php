
<?php

// Developers shall use their own names here

$DATABASENAME = 'DESSERTSKHAZANA';
$DATABASEHOST = "localhost";
$DATABASEUNAME = "dessertskhazanadbuser";
$YII_DB_UNAME = "dessertskhazanadbuser";
$DATABASEPASS = "Satkar123";
$YII_DB_PASS = "Satkar123";

// give path for webroot of libdessertkhazana of this installation
// define("LIB_PATH",'/var/www/html/libdessertskhazana/');
define("LIB_PATH",'/var/www/html/dklib/');

$BaseSitePath = 'http://localhost/dk-system/';
//$BaseSitePath = 'http://192.168.1.108/dk-system/';

// $openSISPath
$openSISPath = dirname(__FILE__).'/';

// defined custom sitetitle
$SiteTitle= 'DESSERTS KHAZANA';

// product started year
$product_versionyear = '2016';

// decide is product in maintainenace mode
$isProductInMaintainanceMode = 'N';

// decide to enable/disable document right click
$isDisableDocumentRightClick = 'N';

// error reporting about generating/resolving
$isSendSmsEmailToAdminOnErrorOccured = 'N';
$SentEmailOnErrorOccured = array("cjain9975@gmail.com");
$SentSmsOnErrorOccured = array("9975967186");

// Business sms details
$SMSUSERNAME = "yogesh.mahajan@digitaledu.net";
$SMSPASSWORD = 'q27d!g!taledu';
$SMSSENDER = 'SCHOOL';
$SMSDOMAIN = 'http://www.businesssms.co.in';

$baseRef = "/dk-system/";

// access api security key
$apiAccessHashkey = 'trr36pdthb9xbhcppyqkgbpkq';

?>
