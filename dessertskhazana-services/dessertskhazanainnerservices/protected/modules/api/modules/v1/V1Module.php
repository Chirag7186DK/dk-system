<?php

/**
 * The Api Module
 * API services implementation as a web-api services module
 * @author		Sandip Chaudhari, Om Shanker
 * @package		api.v1
 * @copyright	(c) DigitalEdu Pvt Ltd 2013
 */
Yii::import('application.modules.api.modules.v1.components.*',true);
Yii::import('application.modules.api.modules.v1.controllers.*',true);
Yii::import('application.modules.api.modules.v1.dto.*',true);
Yii::import('application.modules.api.modules.v1.dto.in.*',true);
Yii::import('application.modules.api.modules.v1.dto.out.*',true);
Yii::import('application.modules.api.modules.v1.services.*',true);
Yii::import('application.modules.api.modules.v1.services.interfaces.*',true);
Yii::import('application.modules.api.modules.v1.services.implementations.*',true);
Yii::import('application.services.*',true);
Yii::import('application.services.interfaces.*',true);
Yii::import('application.services.implementations.*',true);
class V1Module extends ApiModule {
	
}
