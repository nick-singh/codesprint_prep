// https://fathomless-anchorage-5173.herokuapp.com/ 

(function(document, window, $, _){


	// function gets all the countries data from the server
	// and stores it in a jStorage object to use locally
	function getData(url){		
		$.ajax({
			url: url,
			success:function(response){

				$.jStorage.set('data', response.data);
			},
			error: function(response){
				console.log(response);				
			}
		});		
	}



	// function gets all the countries names from the server
	// and stores it in a jStorage object to use locally
	function getCountries(id, url){
		$.ajax({
			url: url,
			success:function(response){				
				$.each(JSON.parse(response.data), function(index, data){
					$('#'+id).append('<option name = "country">'+data.COUNTRY+'</option>');
				});
				$.jStorage.set('countries', response.data);
			},
			error: function(response){
				console.log(response);
			}
		});
	}


	// function abstracts the plotting using the highcharts framework
	function plot(title,xAxis,yAxis){

		$('#container').highcharts({
	        title: {
	            text: title,
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Quantity by kg',
	            x: -20
	        },
	        xAxis: {
	            categories: xAxis
	        },
	        yAxis: {
	            title: {
	                text: 'Quantity (kg)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: 'kg'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: title,
	            data: yAxis		        
	        }]
	    });
	}


	// functions generates a graph based on the country selected 
	function genGraph(str){
		var quantity = [],
		year = [];
		$.each($.jStorage.get('data'),function(index, d){					
			$.each(JSON.parse(d), function(i, c){					
				if(c.COUNTRY.search(str) != -1){
					quantity.push(parseInt(c.QUANTITY_KG));
					year.push(c.Year);
				}
			});
		});				
		plot(str, year, quantity);
	}

	function country_vals(id){		
		$('#'+id).on('change', function(){			
			var str = $("#countries").val();			
			genGraph(str);
		});
	}



	$(document).ready(function(){
		
		getCountries('countries','/get/countries');

		getData('/get/graph/data');			

		country_vals('country_list');

		var first_country = JSON.parse($.jStorage.get('countries'))[0].COUNTRY;
		genGraph(first_country);

	});


})(this, window, jQuery,_);
