<?php
// This example will show you how to connect to a REST API, get a dataset and navigate it.

require 'Pest.php';

// Create new object for the dataset using the URL for the DevCa REST API
$pest = new Pest('http://devca.ciudadanointeligente.org/api/rest/dataset');

// GET the namdevco dataset.  
$thing = $pest->get($_GET['d']);

// Decode the JSON to an array for standard objects
$result = json_decode($thing);

// These are examples of how to access the standard object
//print_r($result->download_url);
//print_r($result->resources[0]->url);


$curl_handle=curl_init();
curl_setopt($curl_handle,CURLOPT_URL,$result->resources[0]->url);
curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
$buffer = curl_exec($curl_handle);
curl_close($curl_handle);
$data_array = array_map("str_getcsv", preg_split('/\r*\n+|\r+/', $buffer));
$data_json = json_encode($data_array);
print_r($data_json);
?>