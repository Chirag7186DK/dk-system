<?php 
    
    //header("Cache-Control: no-store, no-cache"); 
    clearstatcache();
    
    // CJ define this function to sort files in numberically order
    function extract_unit($string, $start, $end){
        $pos = strripos($string, $start);
        $str = substr($string, $pos);
        $str_two = substr($str, strlen($start));
        $second_pos = strripos($str_two, $end);
        $str_three = substr($str_two, 0, $second_pos);
        $unit = trim($str_three);
        return $unit;
    }
    
    // CJ define this function to sort files in numberically order
    function sortFilesNumberically($fileNameString1, $fileNameString2){
        $substrFileStr1 = extract_unit($fileNameString1, "/", "_");
        $substrFileStr2 = extract_unit($fileNameString2, "/", "_");
        return ($substrFileStr1 < $substrFileStr2) ? -1 : 1;
    }
    
    // CJ defined this function to collect files in array
    function collectJsCssFiles($givenDirname, $filetype){
        $dirname = rtrim($givenDirname, '\\/');
        $outputFileList = array();
        $ffs = scandir($dirname);
        if(count($ffs)>0 && $ffs!=false){
            foreach($ffs as $ff){
                if($ff!='.' && $ff!= '..' && $ff!='.git'){
                    if(is_dir($dirname."/".$ff)){
                    }else{
                        if(strrpos($ff, '.'.$filetype)==(strlen($ff) - strlen('.' . $filetype))){
                            array_push($outputFileList, $dirname."/".$ff);
                        }
                    }
                }
            }
        }
        return $outputFileList;
    }
    
    // collect all css files 
    $css_filelist = collectJsCssFiles("css", "css");
    if(count($css_filelist)>0 && $css_filelist!=false && $css_filelist!=null){
        $retStatusSortedFiles = usort($css_filelist , 'sortFilesNumberically');
        // iterate each css files to load in dom
        for($count = 0; $count<count($css_filelist); $count++){
            $filename = $css_filelist[$count];
            if(($filename!=".") && ($filename!="..") && ($filename!="")){
                $curTimeStamp = md5(mt_rand());
                echo "<link rel='stylesheet' type='text/css' href='$filename?reload=$curTimeStamp'>";
            }
        }
    }
    
    // collect all js files
    $allJsFileList = array();
    $allLibJsFileList = collectJsCssFiles("js/lib", "js");
    if(count($allLibJsFileList)>0 && $allLibJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allLibJsFileList);
    }
    $allServicesJsFileList = collectJsCssFiles("js/services", "js");
    if(count($allServicesJsFileList)>0 && $allServicesJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allServicesJsFileList);
    }
    $allControllerJsFileList = collectJsCssFiles("js/controller", "js");
    if(count($allControllerJsFileList)>0 && $allControllerJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allControllerJsFileList);
    }
    $allDirectiveJsFileList = collectJsCssFiles("js/directives", "js");
    if(count($allDirectiveJsFileList)>0 && $allDirectiveJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allDirectiveJsFileList);
    }
    $allAppJsFileList = collectJsCssFiles("js/app", "js");
    if(count($allAppJsFileList)>0 && $allAppJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allAppJsFileList);
    }
    if(count($allJsFileList)>0 && $allJsFileList!=false && $allJsFileList!=null){
        $retStatusSortedFiles = usort($allJsFileList , 'sortFilesNumberically');
        for($count = 0; $count<count($allJsFileList); $count++){
            $filename = $allJsFileList[$count];
            if(($filename!=".") && ($filename!="..") && ($filename!="")){
                $curTimeStamp = md5(mt_rand());
                echo "<script src='$filename?reload=$curTimeStamp'></script>";
            }
        } 
    }
    
        
?>  
