// https://fathomless-anchorage-5173.herokuapp.com/ 

(function(document, window, $, _){

	var totals = {};

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

	function aggregation(obj){		
		if (obj.Year && obj.QUANTITY_KG) {
			
	        if (totals[obj.Year]) {
	            totals[obj.Year] += obj.QUANTITY_KG;
	        } else {
	            totals[obj.Year] = obj.QUANTITY_KG;	         
	        }
	    } else {
	        for (var p in obj) {
	            aggregation(obj[p]);	            
	        }
    	}    	
	}


	// functions generates a graph based on the country selected 
	function genGraph(str){
		var quantity = [],
		year = [],
		temp = {};
		$.each($.jStorage.get('data'),function(index, d){					
			$.each(JSON.parse(d), function(i, c){					
				if(c.COUNTRY.search(str) != -1){
					temp['obj'+i] = ({"QUANTITY_KG":parseInt(c.QUANTITY_KG), "Year":c.Year});					
				}
			});
		});				
		aggregation(temp);

		$.each(totals, function(i, c){
			quantity.push(parseInt(c));
			year.push(i);
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
