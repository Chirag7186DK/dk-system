<?php

/**
* InDto Object producer factory class
* Publishes static ::create method that takes in *InDto class name, whose object it creates and returns
* and the 2nd param is an Array (Hashmap) that is used to assign *InDto's various attributes. After creating the object 
* it does validation of *InDto object attributes and verifies <i>all</i> are defined. If any undefined
* attribute found, it throws an exception. All attributes defined = combination of assignments from Array
* and default defined attributes.
* 
* @package	api.v1.components
*/

class InDtoObjectFactory {
	
    private static function validate($obj) {
        foreach($obj as $attr => $val) {
            if(!isset($obj->$attr)) {
                throw new Exception($attr.' not defined!');
            }
        }
    }
	
    public static function create($inDtoClassName, $inArray){
        try{
            $counterRequestedParamDataMatched = 0;
            $obj = new $inDtoClassName;
            foreach ($inArray as $attr => $val){
                if(!property_exists($obj, $attr)){
                    break;
                }else{
                    $obj->$attr = $val;	
                    $counterRequestedParamDataMatched++;
                }
            }
            if(count($inArray)>0 && count($inArray)==$counterRequestedParamDataMatched){
                $obj->isRequestParamKeyValid = 'true';
            }else{
                $obj->isRequestParamKeyValid = 'false';
            }
        }catch(Exception $ex){
            $obj->isRequestParamKeyValid = 'false';
            // throw new Excepti on('Validation failed while creating: '.$inDtoClassName.' : '.$e->getMessage());
        }
        return $obj;
    }
}