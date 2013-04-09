<?php
// This example will show you how to connect to a REST API, get a dataset and navigate it.

require 'Pest.php';

// Create new object for the dataset using the URL for the DevCa REST API
$pest = new Pest('http://devca.ciudadanointeligente.org/api/rest/dataset');

// GET the namdevco dataset.  
$thing = $pest->get('/namdevco');

// Decode the JSON to an array for standard objects
$result = json_decode($thing);

// These are examples of how to access the standard object
//print_r($result->download_url);
//print_r($result->resources[0]->url);

// You can use cURL to download the CSV file from the CKAN server

$curl_handle=curl_init();
curl_setopt($curl_handle,CURLOPT_URL,$result->resources[0]->url);
curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
$buffer = curl_exec($curl_handle);
curl_close($curl_handle);

// Convert downloaded data to an array

$data_array = array_map("str_getcsv", preg_split('/\r*\n+|\r+/', $buffer));

// Convert the array to JSON
$data_json = json_encode($data_array);

?>

<!-- Start HTML. This examples uses Boostrap -->


<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->

        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Open Data Example</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active"><a href="#">Home</a></li>
                        </ul>
                     </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container">

			<!-- This creates a nested list of some of the properties returned from the REST call. It shows to to access the standard objects that were converted from JSON. -->



			<ul>
			  <li><strong>Author: </strong> <? echo $result->author ?></li>
			  <li><strong>Author Email: </strong> <? echo $result->author_email ?></li>
			  <li><strong>CKAN URL: </strong> <? echo $result->ekan_url ?></li>
			  <li><strong>Download URL: </strong> <? echo $result->download_url ?></li>
			  <li><strong>Notes Rendered: </strong> <? echo $result->notes_rendered ?></li>
			  <li><strong>Resources: </strong> 
			  <ul>
				  <li><strong>Name: </strong> <? echo $result->resources[0]->name ?></li>
				  <li><strong>Format: </strong> <? echo $result->resources[0]->format ?> </li>
				  <li><strong>Description: </strong> <? echo $result->resources[0]->description ?></li>
				  <li><strong>URL: </strong> <? echo $result->resources[0]->url ?></li>
			  </ul>
			  
			  </li>
			  
			  
			</ul>
			<!-- End List -->

			<hr>

			<strong>Display JSON</strong><br/>
			
			<? print_r($data_json); ?>



            <hr>
            <footer>
                <p>Open Data Example by Anil Ramnanan</p>
            </footer>

        </div> <!-- /container -->

      
    </body>
</html>
