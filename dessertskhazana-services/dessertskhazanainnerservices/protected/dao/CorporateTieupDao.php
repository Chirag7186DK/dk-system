<?php

/**
* Description of CorporateTieupDao
* @author chirag
*/

class CorporateTieupDao{
   
    // CJ defined this function 2016-07-24
    public static function addCorporateTieupRequest($ctRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if($sqlValues!='' && $sqlColumnNames!=''){
            $sqlQuery = " INSERT INTO  " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return 1;
    }
    
    // CJ defined this function 2016-07-24
    public static function addCorporateTieupRequestLog($coRequestParamDetails){
        $connection = Yii::app()->db;
        $sqlColumnNames = "";
        $sqlValues = "";
        $lastInsertedId = false;
        if($sqlValues!='' && $sqlColumnNames!=''){
            $coRequestParamDetails['created_datedtime'] = date('Y-m-d H:i:s');
            $sqlColumnNames.=" created_datedtime,";
            $sqlValues.="'".$coRequestParamDetails['created_datedtime']."',";
            $sqlQuery = " INSERT INTO  " .rtrim("(".$sqlColumnNames, ',').") ".rtrim(" VALUES(".$sqlValues, ',').")";
            $command = $connection->createCommand($sqlQuery);
            $result = $command->execute();
            if($result>=1){
                $lastInsertedId = $connection->getLastInsertID();
            }
        }
        return 1;
    }
    
    
}
