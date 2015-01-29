(function(document, window, $){


	function getData(url){
		$.ajax({
			url: url,
			success:function(response){


				$.each(response.data, function(index, data){
					console.log(data);
				});
			},
			error: function(response){
				console.log(response);
			}
		});
	}


	function getCountries(id, url){
		$.ajax({
			url: url,
			success:function(response){				
				$.each(JSON.parse(response.data), function(index, data){
					$('#'+id).append('<option name = "country">'+data.COUNTRY+'</option>');
				});
			},
			error: function(response){
				console.log(response);
			}
		});
	}



	$(document).ready(function(){
		// getData('/get/graph/data');
		getCountries('countries','/get/countries');
	});


})(this, window, jQuery)
