<?php 
    
    header("Cache-Control: no-store, no-cache"); 
    clearstatcache();
    
    // CJ define this function to sort files in numberically order
    function sortFilesNumberically($fileString1, $fileString2){
        $substrFileStr1 = substr($fileString1, 0, strpos($fileString1, "_", 0));
        $substrFileStr2 = substr($fileString2, 0, strpos($fileString2, "_", 0));
        return ($substrFileStr1 < $substrFileStr2) ? -1 : 1;
    }
    
    // CJ defined this function to collect files in array
    function collectfiles($dirname, $filetype){
        $dirname = rtrim($dirname, '\\/');
        $outputFileList = array();
        $ffs = scandir($dirname);
        foreach($ffs as $ff) {
            if($ff!='.' && $ff!= '..' && $ff!='.git'){
                if(is_dir($dirname."/".$ff)){
                    $collectedFiles = collectfiles("$dirname/$ff", $filetype);
                    if($collectedFiles!=''){
                       //array_push($outputFileList, $collectedFiles);
                    }
                }else{
                    if(strrpos($ff, '.'.$filetype)==(strlen($ff) - strlen('.' . $filetype))){
                        array_push($outputFileList, $ff);
                    }
                }
            }
        }
        return $outputFileList;
    }
    
    // collect all css files 
    $css_filelist = collectfiles("css", "css");
    if(count($css_filelist)>0 && $css_filelist!=false && $css_filelist!=null){
        $retStatusSortedFiles = usort($css_filelist , 'sortFilesNumberically');
        // iterate each css files to load in dom
        for($count = 0; $count<count($css_filelist); $count++){
            $filename = $css_filelist[$count];
            if(($filename!=".") && ($filename!="..") && ($filename!="")){
                if(strripos($filename, "device")==false){
                    $curTimeStamp = md5(mt_rand());
                    echo "<link rel='stylesheet' type='text/css' href='css/$filename?reload=$curTimeStamp'>";
                }   
            }
        }
    }
    
    // collect all js files
    $jsFileList = collectfiles("js", "js");
    if(count($jsFileList)>0 && $jsFileList!=false && $jsFileList!=null){
        $retStatusSortedFiles = usort($jsFileList , 'sortFilesNumberically');
        //echo "<script src='http://maps.googleapis.com/maps/api/js?libraries=places'></script>";
        for($count = 0; $count<count($jsFileList); $count++){
            $filename = $jsFileList[$count];
            if(($filename!=".") && ($filename!="..") && ($filename!="")){
                $curTimeStamp = md5(mt_rand());
                echo "<script src='js/$filename?reload=$curTimeStamp'></script>";
            }
        } 
    }
    
        
?>  
