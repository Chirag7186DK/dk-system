<?php

// include site config file
include_once('../../Site_config.inc.php');

if($GLOBALS['DATABASEHOST']==''){
    $dbhost = 'localhost';
}else{
    $dbhost = $GLOBALS['DATABASEHOST'];
}

return array(
    
    'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
    'name'=>'My Web Application',

    // preloading 'log' component
    'preload'=>array('log'),

    // autoloading model and component classes
    'import'=>array(
        //'application.models.*',
        'application.components.*',
        'application.modules.api.*',
        'application.modules.api.modules.*',
        'application.modules.api.modules.v1.*',
        'application.dao.*',
        'application.utils.*',
        'application.customparam.*',
        'application.commonfunction.*',
        'application.validation.*'
    ),

    'modules'=>array(
        // uncomment the following to enable the Gii tool
        'api'=>array(
            'modules'=>array(
                'v1'
            )
        ),
        'gii'=>array(
            'class'=>'system.gii.GiiModule',
            'password'=>'dessertskhazana',
            //If removed, Gii defaults to localhost only. Edit carefully to taste.
            'ipFilters'=>array('127.0.0.1','::1'),
        ),
    ),

    // application components
    'components'=>array(
        'user'=>array(
                // enable cookie-based authentication
                'allowAutoLogin'=>true,
        ),
        'db'=>array(
            'class'=>'CDbConnection',
            'connectionString' => 'mysql:host='.$dbhost.';dbname='.$GLOBALS['DATABASENAME'],
            'emulatePrepare' => true,
            'username' => $GLOBALS['YII_DB_UNAME'],
            'password' => $GLOBALS['YII_DB_PASS'],
            'charset' => 'utf8',
        ),

        'errorHandler'=>array(
            // use 'site/error' action to display errors
            'errorAction'=>'site/error',
        ),
    ),

    // application-level parameters that can be accessed
    // using Yii::app()->params['paramName']
    'params'=>array(
        // this is used in contact page
        'adminEmail'=>'webmaster@example.com',
    ),
);
